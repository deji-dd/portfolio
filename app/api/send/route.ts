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
    // Robust IP Extraction for Rate Limiting
    let ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";

    // Handle multiple IPs in x-forwarded-for (take the first one)
    if (ip.includes(",")) {
      ip = ip.split(",")[0].trim();
    }

    // Prioritize Cloudflare or Real-IP headers if they exist
    const cfIp = req.headers.get("cf-connecting-ip");
    const realIp = req.headers.get("x-real-ip");
    if (cfIp) ip = cfIp;
    else if (realIp) ip = realIp;

    try {
      await limiter.check(LIMIT_PER_HOUR, ip);
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

    // Defense-in-depth: Sanitize email to prevent header injection
    // (Even though Zod validates email format, this adds an extra safety layer)
    const safeEmail = email.replace(/[\r\n]/g, "");

    // Sanitize message: Remove null bytes and other non-printable control characters
    // (keeping \n, \r, \t allowed)
    // Range \x00-\x08 matches null to backspace
    // Range \x0B-\x0C matches vertical tab and form feed
    // Range \x0E-\x1F matches shift out/in and other commands
    // \x7F is delete
    const safeMessage = message.replace(
      /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g,
      ""
    );

    const data = await resend.emails.send({
      from: "Portfolio Contact <contact@mail.ayodejib.dev>",
      to: ["ayodeji@ayodejib.dev"],
      replyTo: safeEmail,
      subject: `New Signal from Portfolio: ${safeEmail}`,
      text: `Sender: ${safeEmail}\n\nMessage:\n${safeMessage}`,
    });

    if (data.error) {
      console.error("Resend API Error:", data.error);
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 500 }
      );
    }

    // Return minimal success response to avoid leaking internal IDs or metadata
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Internal Contact API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
