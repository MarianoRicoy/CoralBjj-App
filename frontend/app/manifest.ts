import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Coral BJJ Studio",
    short_name: "Coral BJJ",
    description:
      "Academia premium de Brazilian Jiu-Jitsu con landing informativa, tienda online y experiencia optimizada.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a101c",
    theme_color: "#0ea5b7",
    lang: "es-AR",
    icons: [
      {
        src: "/icons/custom/coral-mark.svg",
        type: "image/svg+xml",
        sizes: "any",
      },
    ],
  };
}
