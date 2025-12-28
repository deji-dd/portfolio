import { Resend } from "resend";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import rateLimit from "@/lib/rate-limit";

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  throw new Error(
    "RESEND_API_KEY environment variable is not set. Please configure it before using the email API route."
  );
}

const resend = new Resend(resendApiKey);

const limiter = rateLimit({
  interval: 60 * 60 * 1000, // 1 hour
  uniqueTokenPerInterval: 500, // Max 500 users per hour
});
const LIMIT_PER_HOUR = 3;

const contactSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(5000, { message: "Message must be at most 5000 characters" }),
});

export async function POST(req: NextRequest) {
  try {
    // Rate Limiting
    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
    try {
      await limiter.check(NextResponse.next(), LIMIT_PER_HOUR, ip);
    } catch {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { email, message } = result.data;

    // Sanitize email for subject to prevent header injection (though Zod covers most cases)
    const safeEmail = email.replace(/[\r\n]/g, "");

    const data = await resend.emails.send({
      from: "Portfolio Contact <contact@mail.ayodejib.dev>",
      to: ["ayodeji@ayodejib.dev"],
      replyTo: email,
      subject: `New Signal from Portfolio: ${safeEmail}`,
      text: `Sender: ${email}\n\nMessage:\n${message}`,
    });

    if (data.error) {
      console.error("Resend API Error:", data.error);
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Internal Contact API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
