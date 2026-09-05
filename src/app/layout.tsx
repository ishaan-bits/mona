import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Premiere Square | Mona 70MM & Elphinstone, Patna",
  description:
    "Patna's most iconic cinema destination. Over a century of cinematic heritage meets world-class technology. Dolby Atmos, 70MM, premium luxury seating.",
  keywords:
    "The Premiere Square, Mona 70MM, Elphinstone, Patna cinema, Dolby Atmos, Bihar cinema, heritage theatre",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} antialiased`}>
      <body className="min-h-screen bg-background text-foreground">
        <div className="film-grain" />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
