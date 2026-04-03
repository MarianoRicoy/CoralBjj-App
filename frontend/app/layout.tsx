import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { SiteFooter } from "@/components/features/site-footer";
import { SiteNavbar } from "@/components/features/site-navbar";

const coralPrimary = localFont({
  src: "../public/fonts/Psyche-Wide-Regular.otf",
  variable: "--font-coral-primary",
  display: "swap",
});

const coralSecondary = localFont({
  src: "../public/fonts/Post.otf",
  variable: "--font-coral-secondary",
  display: "swap",
});

const coralTertiary = localFont({
  src: "../public/fonts/Satoshi-Light.otf",
  variable: "--font-coral-tertiary",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Coral BJJ Studio",
    template: "%s | Coral BJJ Studio",
  },
  description:
    "Academia premium de Brazilian Jiu-Jitsu con propuesta técnica de alto nivel y tienda oficial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-AR"
      className={`${coralPrimary.variable} ${coralSecondary.variable} ${coralTertiary.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-secondary">
        <SiteNavbar />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
