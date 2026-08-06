import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AnimatedBackdrop from "@/components/AnimatedBackdrop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Component Lab",
  description: "The AI-first playground for frontend components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full dark" lang="en">
      <body
        className={`h-full ${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        {/* Background ─ drifting radial orbs */}
        {/* <AnimatedBackdrop /> */}
        <div
          className="fixed inset-0 pointer-events-none bg-black/70"
          style={{ zIndex: 0 }}
        >
          <div
            style={{
              position: "absolute",
              top: "-5%",
              right: "0%",
              width: 700,
              height: 700,
              background:
                "radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 65%)",
              animation: "orb 5s ease-in-out infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "5%",
              left: "8%",
              width: 600,
              height: 600,
              background:
                "radial-gradient(circle, rgba(232,121,249,0.07) 0%, transparent 65%)",
              animation: "orb 18s ease-in-out infinite reverse",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "45%",
              left: "40%",
              width: 500,
              height: 500,
              background:
                "radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 60%)",
            }}
          />
        </div>
        {children}
      </body>
    </html>
  );
}
