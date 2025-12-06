import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hafal.ai – SPM Prediction & Study",
  description: "SPM prediction and gamified study with funny Reveal mode. Master Sejarah and other subjects with AI-powered answers, audio, and comic strips.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-background`}
      >
        <ConvexClientProvider>
          <Navbar />
          <main className="flex-1 container mx-auto px-4 py-8 max-w-lg md:max-w-xl lg:max-w-2xl">
            {children}
          </main>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
