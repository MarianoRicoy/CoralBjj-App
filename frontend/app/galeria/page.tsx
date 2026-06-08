import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galería",
  description: "Galería de Coral BJJ Studio.",
};

export default function GaleriaPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 md:px-8 md:py-12" />
  );
}
