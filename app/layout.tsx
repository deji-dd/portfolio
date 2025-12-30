import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { ScanlineOverlay } from "@/components/ui/scanline-overlay";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const urlString = "https://ayodejib.dev";
const imgString = "/og-image.png";
const descString = "Systems Engineer & Next.js Architect building high-performance digital infrastructure."
const titleString = "Ayodeji B. | Systems Architect"

export const metadata: Metadata = {
  title: {
    default: titleString,
    template: "%s | Ayodeji B.",
  },
  description:
    descString,
  metadataBase: new URL(urlString),
  keywords: [
    "Systems Engineer",
    "Next.js Architect",
    "DevOps",
    "React",
    "TypeScript",
    "TailwindCSS",
    "Cloud Infrastructure",
    "Software Engineering",
  ],
  authors: [{ name: "Ayodeji B.", url: urlString }],
  creator: "Ayodeji B.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: urlString,
    siteName: "Ayodeji B. Portfolio",
    title: titleString,
    description:
      descString,
    images: [
      {
        url: imgString,
        width: 1200,
        height: 630,
        alt: "Ayodeji B. Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: titleString,
    description:
      descString,
    creator: "@deji__dd",
    images: [imgString],
  },
  other: {
    "color-scheme": "dark",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0f1a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <head></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <SpeedInsights />
        <Analytics />
        <ScanlineOverlay />
        <LoadingOverlay>{children}</LoadingOverlay>
        <Toaster richColors position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}
