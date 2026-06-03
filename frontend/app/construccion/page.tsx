import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Coral BJJ Studio",
  description: "Sitio en construcción.",
};

export default function ConstruccionPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-black px-6">
      <Image
        alt="Coral BJJ Studio"
        className="h-40 w-auto md:h-56"
        height={512}
        priority
        src="/Isologo_Blanco.png"
        width={512}
      />
      <p className="font-primary text-center text-xl uppercase tracking-[0.3em] text-white md:text-3xl">
        Under Construction
      </p>
    </main>
  );
}
