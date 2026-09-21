import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { obtenerProductosDesdeApi } from "@/services/productos.service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.baseUrl.replace(/\/+$/, "");

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/nosotros`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/staff-coral`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/embajadores`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tienda`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  let productos: Array<{ slug: string }> = [];
  try {
    productos = await obtenerProductosDesdeApi();
  } catch {
    // Si la API está temporalmente inaccesible en build time, sitemap se genera con rutas estáticas
    productos = [];
  }

  const productRoutes: MetadataRoute.Sitemap = productos.map((producto) => ({
    url: `${baseUrl}/tienda/${producto.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}
