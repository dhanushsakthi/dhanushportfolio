import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Dhanush S | Web Developer & AI Specialist",
  description: "Portfolio of Dhanush S - Full-Stack Web Developer & B.Tech Artificial Intelligence & Data Science Student. Explore client projects, CMS solutions, and AI systems.",
  keywords: ["Dhanush S", "Portfolio", "Web Developer", "Full Stack", "Artificial Intelligence", "Data Science", "React", "Next.js"],
  authors: [{ name: "Dhanush S" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-cyan-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
