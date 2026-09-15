"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const contactoSchema = z.object({
  nombre: z.string().min(2, "Ingresá tu nombre"),
  email: z.string().email("Ingresá un email válido"),
  mensaje: z.string().min(10, "Contanos un poco más sobre tu consulta"),
});

type ContactoData = z.infer<typeof contactoSchema>;

export function FormulariosSection() {
  const [mensajeContacto, setMensajeContacto] = useState<string>("");

  const contactoForm = useForm<ContactoData>({
    resolver: zodResolver(contactoSchema),
    defaultValues: { nombre: "", email: "", mensaje: "" },
  });

  async function onEnviarContacto(data: ContactoData) {
    setMensajeContacto(`Gracias ${data.nombre}, recibimos tu consulta correctamente.`);
    contactoForm.reset();
    setTimeout(() => setMensajeContacto(""), 5000);
  }

  return (
    <section id="formularios" aria-labelledby="contacto-titulo" className="scroll-mt-32 w-full py-10 md:py-16">
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
                ¿Querés entrenar con nosotros? Escribinos.
              </p>
            </div>

            <div className="space-y-5 font-tertiary">
              <div className="space-y-1">
                <p className="font-coralbold text-xs uppercase tracking-widest text-zinc-500">
                  Email
                </p>
                <a
                  href="mailto:info@coralbjj.com"
                  className="block text-base text-zinc-200 transition-colors hover:text-white"
                >
                  info@coralbjj.com
                </a>
              </div>

              <div className="space-y-1">
                <p className="font-coralbold text-xs uppercase tracking-widest text-zinc-500">
                  WhatsApp
                </p>
                <a
                  href="https://wa.me/541112345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-base text-zinc-200 transition-colors hover:text-white"
                >
                  +54 11 1234 5678
                </a>
              </div>

              <div className="space-y-1">
                <p className="font-coralbold text-xs uppercase tracking-widest text-zinc-500">
                  Ubicación
                </p>
                <p className="text-base text-zinc-200">
                  Chapadmalal, Provincia de Buenos Aires
                </p>
                <a
                  href="https://maps.google.com/?q=Chapadmalal,+Provincia+de+Buenos+Aires"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-[#f2685d] transition-colors hover:text-[#ff766a]"
                >
                  Cómo llegar ↗
                </a>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Formulario */}
          <div className="lg:col-span-7">
            <form
              className="space-y-5"
              onSubmit={contactoForm.handleSubmit(onEnviarContacto)}
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="nombre"
                    className="font-tertiary text-xs font-medium uppercase tracking-wider text-zinc-300"
                  >
                    Nombre
                  </Label>
                  <Input
                    id="nombre"
                    placeholder="Tu nombre"
                    className="h-11 rounded-lg border border-white/15 bg-black/40 px-3.5 text-sm font-tertiary text-white placeholder:text-zinc-500 transition-all focus:border-[#f2685d] focus:outline-none focus:ring-1 focus:ring-[#f2685d]"
                    {...contactoForm.register("nombre")}
                  />
                  {contactoForm.formState.errors.nombre && (
                    <p className="font-tertiary text-xs text-[#f2685d]">
                      {contactoForm.formState.errors.nombre.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="font-tertiary text-xs font-medium uppercase tracking-wider text-zinc-300"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    className="h-11 rounded-lg border border-white/15 bg-black/40 px-3.5 text-sm font-tertiary text-white placeholder:text-zinc-500 transition-all focus:border-[#f2685d] focus:outline-none focus:ring-1 focus:ring-[#f2685d]"
                    {...contactoForm.register("email")}
                  />
                  {contactoForm.formState.errors.email && (
                    <p className="font-tertiary text-xs text-[#f2685d]">
                      {contactoForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="mensaje"
                  className="font-tertiary text-xs font-medium uppercase tracking-wider text-zinc-300"
                >
                  Mensaje
                </Label>
                <Textarea
                  id="mensaje"
                  placeholder="¿En qué te podemos ayudar?"
                  rows={4}
                  className="min-h-[120px] resize-y rounded-lg border border-white/15 bg-black/40 p-3.5 text-sm font-tertiary text-white placeholder:text-zinc-500 transition-all focus:border-[#f2685d] focus:outline-none focus:ring-1 focus:ring-[#f2685d]"
                  {...contactoForm.register("mensaje")}
                />
                {contactoForm.formState.errors.mensaje && (
                  <p className="font-tertiary text-xs text-[#f2685d]">
                    {contactoForm.formState.errors.mensaje.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-start justify-between gap-4 pt-2 sm:flex-row sm:items-center">
                <Button
                  type="submit"
                  className="h-11 w-full rounded-lg border-none bg-[#f2685d] px-8 text-xs font-coralbold uppercase tracking-widest text-white shadow-none transition-colors hover:bg-[#ff766a] sm:w-auto"
                >
                  Enviar mensaje
                </Button>

                {mensajeContacto && (
                  <p
                    role="status"
                    aria-live="polite"
                    className="font-tertiary text-sm text-emerald-400"
                  >
                    {mensajeContacto}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
