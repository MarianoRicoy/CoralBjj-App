/**
 * Configuración centralizada de información pública de Coral BJJ Studio.
 * 
 * NOTA IMPORTANTE / PLACEHOLDERS:
 * Los datos de contacto que figuran a continuación fueron unificados a partir de valores
 * dispersos encontrados en formularios y pie de página. Están marcados explícitamente
 * como TODO / PLACEHOLDER hasta que sean confirmados oficialmente por el dueño del estudio.
 */

export const siteConfig = {
  name: "Coral BJJ Studio",
  shortName: "Coral BJJ",
  description:
    "Academia premium de Brazilian Jiu-Jitsu con propuesta técnica de alto nivel y tienda oficial.",
  
  // URL base pública: toma la variable de entorno o usa fallback seguro para desarrollo local
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",

  contact: {
    // TODO: [PLACEHOLDER] Confirmar email oficial definitivo (se usaba info@coralbjj.com en formulario y hola@coralbjj.com en footer)
    email: "info@coralbjj.com",

    whatsapp: {
      // TODO: [PLACEHOLDER] Confirmar número de WhatsApp real de atención
      display: "+54 11 1234 5678",
      // TODO: [PLACEHOLDER] Confirmar enlace de WhatsApp directo real
      url: "https://wa.me/541112345678",
    },

    instagram: {
      // TODO: [PLACEHOLDER] Confirmar handle oficial de Instagram
      handle: "@coralbjjstudio",
      // TODO: [PLACEHOLDER] Confirmar URL oficial de la cuenta
      url: "https://instagram.com/coralbjjstudio",
    },

    location: {
      // TODO: [PLACEHOLDER] Confirmar dirección exacta o referencia del estudio
      address: "Chapadmalal, Provincia de Buenos Aires",
      // TODO: [PLACEHOLDER] Confirmar link exacto de ubicación en Google Maps
      mapsUrl: "https://maps.google.com/?q=Chapadmalal,+Provincia+de+Buenos+Aires",
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
