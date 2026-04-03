import type { Metadata } from "next";

export async function obtenerMetadataHome(): Promise<Metadata> {
  const descripcion =
    "Entrená Brazilian Jiu-Jitsu en Coral BJJ Studio. Clases para todos los niveles, comunidad premium y tienda oficial.";

  return {
    title: "Coral BJJ Studio | Academia y Tienda Oficial",
    description: descripcion,
    applicationName: "Coral BJJ Studio",
    keywords: [
      "Brazilian Jiu-Jitsu",
      "BJJ",
      "Coral BJJ Studio",
      "academia de jiujitsu",
      "kimono bjj",
    ],
    openGraph: {
      title: "Coral BJJ Studio",
      description: descripcion,
      locale: "es_AR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Coral BJJ Studio",
      description: descripcion,
    },
  };
}
