import type { Metadata } from "next";

import { FormulariosSection } from "@/components/features/formularios-section";
import { GaleriaPro } from "@/components/features/galeria-pro";
import { HeroSection } from "@/components/features/hero-section";
import { HorariosGrid } from "@/components/features/horarios-grid";
import { TiendaSection } from "@/components/features/tienda-section";
import { obtenerMetadataHome } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return obtenerMetadataHome();
}

export default function Home() {
  return (
    <>
      <section className="w-full px-3 py-4 md:px-6 md:py-6">
        <HeroSection />
      </section>

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-14 px-4 py-6 md:px-8 md:py-10">
        <HorariosGrid />
        <GaleriaPro />
        <TiendaSection />
        <FormulariosSection />
      </main>
    </>
  );
}
