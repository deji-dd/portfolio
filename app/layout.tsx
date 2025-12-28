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

export const metadata: Metadata = {
  title: "Ayodeji B. | Systems Architect",
  description:
    "Systems Engineer & Next.js Architect building high-performance digital infrastructure.",
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
