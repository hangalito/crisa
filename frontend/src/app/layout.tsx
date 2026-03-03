import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";

import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crisa — Conversational Intelligence",
  description: "Discover Crisa, your Creative, Reasonable, Interactive and Supportive AI Agent.",
  keywords: ["Crisa AI", "Conversational AI", "Assistant", "Portuguese AI"],
  openGraph: {
    title: "Crisa — Conversational Intelligence",
    description: "Talk to Crisa, an AI agent designed for personalized, safe, and supportive conversations.",
    type: "website",
    locale: "pt_PT", // Portuguese AI
    siteName: "Crisa",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crisa — Conversational Intelligence",
    description: "Talk to Crisa, an AI agent designed for personalized, safe, and supportive conversations.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} ${spaceGrotesk.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
