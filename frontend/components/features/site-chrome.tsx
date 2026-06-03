"use client";

import { usePathname } from "next/navigation";

import { CoralMarquee } from "@/components/features/coral-marquee";
import { SiteFooter } from "@/components/features/site-footer";
import { SiteNavbar } from "@/components/features/site-navbar";

const RUTAS_SIN_CHROME = ["/construccion"];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const ocultarChrome = RUTAS_SIN_CHROME.includes(pathname);

  if (ocultarChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteNavbar />
      {children}
      <CoralMarquee />
      <SiteFooter />
    </>
  );
}
