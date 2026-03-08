import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
  title: {
    default: "Jason Capshaw",
    template: "%s — Jason Capshaw",
  },
  description:
    "Practitioner writing on B2B distribution, digital commerce architecture, enterprise systems, and AI that survives contact with reality.",
  metadataBase: new URL("https://jcapshaw.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        <main className="page-container">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
