/**
 * Configuración centralizada de información pública de Coral BJJ Studio.
 * Datos oficiales confirmados por la dirección del estudio.
 */

export const siteConfig = {
  name: "Coral BJJ Studio",
  shortName: "Coral BJJ",
  description:
    "Academia premium de Brazilian Jiu-Jitsu con propuesta técnica de alto nivel y tienda oficial.",
  
  // URL base pública: toma la variable de entorno o usa fallback seguro para desarrollo local
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",

  contact: {
    email: "coralstudio.adm@gmail.com",

    whatsapp: {
      display: "+54 9 223 422 3818",
      url: "https://wa.me/5492234223818",
      reservarClaseUrl:
        "https://wa.me/5492234223818?text=Hola%20Coral%20BJJ%20Studio%2C%20quisiera%20consultar%20por%20una%20clase.",
    },

    instagram: {
      handle: "@coralbjjstudio",
      url: "https://instagram.com/coralbjjstudio",
    },

    location: {
      address: "Coral BJJ Studio, Chapadmalal",
      mapsUrl: "https://maps.app.goo.gl/uwq9HFrZRgeVeindA",
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
