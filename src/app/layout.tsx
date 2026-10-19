import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import SearchOverlay from "@/components/SearchOverlay";
import TweaksPanel from "@/components/TweaksPanel";
import HoverPreview from "@/components/HoverPreview";
import TweaksBoot from "@/components/TweaksBoot";
import { siteConfig } from "@/lib/site";
import "./globals.css";

// Fonts are self-hosted from src/app/fonts (see the README there). This
// avoids the build-time fetch from Google Fonts, which failed intermittently
// under Turbopack.
const spectral = localFont({
  variable: "--font-serif",
  display: "swap",
  src: [
    { path: "./fonts/spectral-300.woff2", weight: "300", style: "normal" },
    { path: "./fonts/spectral-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/spectral-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/spectral-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/spectral-300-italic.woff2", weight: "300", style: "italic" },
    { path: "./fonts/spectral-400-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/spectral-500-italic.woff2", weight: "500", style: "italic" },
    { path: "./fonts/spectral-600-italic.woff2", weight: "600", style: "italic" },
  ],
});

const jetbrainsMono = localFont({
  variable: "--font-mono",
  display: "swap",
  src: [
    {
      path: "./fonts/jetbrains-mono-variable.woff2",
      weight: "100 800",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": `${siteConfig.url}/rss.xml`,
      "application/atom+xml": `${siteConfig.url}/atom.xml`,
      "application/feed+json": `${siteConfig.url}/feed.json`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  other: {
    "theme-color": "#0a0908",
    "color-scheme": "dark light",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spectral.variable} ${jetbrainsMono.variable}`}>
        <TweaksBoot />
        <a href="#main" className="skip-link">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <SearchOverlay />
        <TweaksPanel />
        <HoverPreview />
        <Analytics />
      </body>
    </html>
  );
}
