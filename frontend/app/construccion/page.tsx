import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Coral BJJ Studio",
  description: "Sitio en construcción.",
};

export default function ConstruccionPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-black px-6">
      <Image
        alt="Coral BJJ Studio - Under Construction"
        className="h-auto w-full max-w-2xl"
        height={670}
        priority
        src="/under-construction.png"
        width={1600}
      />
    </main>
  );
}
