"use client";

import { usePathname } from "next/navigation";

import { BrandIntro } from "@/components/features/brand-intro";
import { CoralMarquee } from "@/components/features/coral-marquee";
import { SiteFooter } from "@/components/features/site-footer";
import { SiteNavbar } from "@/components/features/site-navbar";

const RUTAS_SIN_CHROME = ["/construccion"];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const ocultarChrome = RUTAS_SIN_CHROME.includes(pathname);
  const esHome = pathname === "/";

  if (ocultarChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <BrandIntro />
      <SiteNavbar />
      {esHome ? children : <div className="pt-32 md:pt-40">{children}</div>}
      {esHome ? <CoralMarquee /> : null}
      <SiteFooter />
    </>
  );
}
