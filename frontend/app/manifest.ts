import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#090909",
    theme_color: "#f2685d",
    lang: "es-AR",
    icons: [
      {
        src: "/icon-dark.png",
        sizes: "998x998",
        type: "image/png",
      },
      {
        src: "/icon-light.png",
        sizes: "998x998",
        type: "image/png",
      },
    ],
  };
}
