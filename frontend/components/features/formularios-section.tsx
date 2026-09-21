import { ArrowUpRight, Mail, MapPin, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function FormulariosSection() {
  return (
    <section
      id="formularios"
      aria-labelledby="contacto-titulo"
      className="scroll-mt-32 w-full py-10 md:py-16"
    >
      <div className="rounded-3xl border border-white/10 bg-black/60 p-8 md:p-12 lg:p-14 backdrop-blur-md">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Columna Izquierda: Información de contacto */}
          <div className="space-y-8 lg:col-span-5">
            <div className="space-y-3">
              <h2
                id="contacto-titulo"
                className="font-primary text-3xl uppercase tracking-tight text-white md:text-4xl lg:text-5xl"
              >
                Contactanos
              </h2>
              <p className="font-tertiary text-base text-zinc-300 md:text-lg">
                ¿Querés entrenar con nosotros? Escribinos directamente para coordinar tu clase o despejar cualquier duda.
              </p>
            </div>

            <div className="space-y-5 font-tertiary">
              <div className="space-y-1">
                <p className="font-coralbold text-xs uppercase tracking-widest text-zinc-500">
                  WhatsApp
                </p>
                <a
                  href={siteConfig.contact.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-base text-zinc-200 transition-colors hover:text-[#f2685d]"
                >
                  <MessageCircle className="h-4 w-4 text-[#f2685d]" />
                  <span>{siteConfig.contact.whatsapp.display}</span>
                </a>
              </div>

              <div className="space-y-1">
                <p className="font-coralbold text-xs uppercase tracking-widest text-zinc-500">
                  Email
                </p>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="inline-flex items-center gap-2 text-base text-zinc-200 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 text-zinc-400" />
                  <span>{siteConfig.contact.email}</span>
                </a>
              </div>

              <div className="space-y-1">
                <p className="font-coralbold text-xs uppercase tracking-widest text-zinc-500">
                  Instagram
                </p>
                <a
                  href={siteConfig.contact.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-base text-zinc-200 transition-colors hover:text-[#f2685d]"
                >
                  <InstagramIcon className="h-4 w-4 text-[#f2685d]" />
                  <span>{siteConfig.contact.instagram.handle}</span>
                </a>
              </div>

              <div className="space-y-1">
                <p className="font-coralbold text-xs uppercase tracking-widest text-zinc-500">
                  Ubicación
                </p>
                <p className="flex items-center gap-2 text-base text-zinc-200">
                  <MapPin className="h-4 w-4 shrink-0 text-zinc-400" />
                  <span>{siteConfig.contact.location.address}</span>
                </p>
                <a
                  href={siteConfig.contact.location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 pt-1 text-sm font-medium text-[#f2685d] transition-colors hover:text-[#ff766a]"
                >
                  <span>Cómo llegar</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Canales directos de contacto */}
          <div className="space-y-6 lg:col-span-7">
            {/* Tarjeta Principal: WhatsApp / Reserva */}
            <div className="relative overflow-hidden rounded-2xl border border-[#f2685d]/30 bg-gradient-to-br from-black/70 via-black/50 to-[#f2685d]/10 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#f2685d]/60 md:p-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-[#f2685d] animate-pulse" />
                  <span className="font-coralbold text-xs uppercase tracking-wider text-[#f2685d]">
                    Atención Inmediata & Reservas
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-primary text-xl uppercase tracking-wide text-white md:text-2xl">
                    Coordiná tu clase en Coral
                  </h3>
                  <p className="font-tertiary text-sm leading-relaxed text-zinc-300 md:text-base">
                    Escribinos directamente por WhatsApp para consultar días, horarios disponibles y reservar tu lugar en el tatami con Agustín Celesia.
                  </p>
                </div>

                <div className="pt-2">
                  <a
                    href={siteConfig.contact.whatsapp.reservarClaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-lg bg-[#f2685d] px-8 text-xs font-coralbold uppercase tracking-widest text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ff766a] hover:shadow-lg hover:shadow-[#f2685d]/20 sm:w-auto"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Reservar clase por WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Tarjeta Secundaria: Email Institucional */}
            <div className="rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/25 md:p-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="font-coralbold text-xs uppercase tracking-wider text-zinc-400">
                    Administración & Propuestas
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-primary text-xl uppercase tracking-wide text-white md:text-2xl">
                    Canal Institucional
                  </h3>
                  <p className="font-tertiary text-sm leading-relaxed text-zinc-300 md:text-base">
                    Para trámites administrativos, colaboraciones institucionales o si preferís comunicarte formalmente por correo electrónico.
                  </p>
                </div>

                <div className="pt-2">
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="inline-flex h-11 w-full items-center justify-center gap-2.5 rounded-lg border border-white/20 bg-white/5 px-6 text-xs font-tertiary uppercase tracking-wider text-zinc-100 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10 sm:w-auto"
                  >
                    <Mail className="h-4 w-4 text-zinc-300" />
                    <span>Enviar correo a {siteConfig.contact.email}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
