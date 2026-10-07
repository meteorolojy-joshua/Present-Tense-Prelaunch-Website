import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Present Tense — Make room for yourself",
  description: "Stay connected to yourself under pressure, and bring what you feel and want into everyday situations and decisions. Present Tense is in development. Join the waitlist.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
