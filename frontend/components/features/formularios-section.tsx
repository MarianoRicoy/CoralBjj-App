"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
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
  academia: z.string().optional(),
  mensaje: z.string().min(10, "Contanos un poco más"),
});

type ContactoData = z.infer<typeof contactoSchema>;

export function FormulariosSection() {
  const [mensajeContacto, setMensajeContacto] = useState<string>("");

  const contactoForm = useForm<ContactoData>({
    resolver: zodResolver(contactoSchema),
    defaultValues: { nombre: "", email: "", academia: "", mensaje: "" },
  });

  async function onEnviarContacto(data: ContactoData) {
    setMensajeContacto(`Gracias ${data.nombre}, recibimos tu consulta correctamente.`);
    contactoForm.reset();
    setTimeout(() => setMensajeContacto(""), 5000);
  }

  return (
    <section aria-labelledby="contacto-titulo" className="w-full py-12 md:py-20">
      <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-white/10 bg-zinc-950 shadow-2xl min-h-[850px] flex flex-col">
        {/* MAPA DE FONDO (Chapadmalal) */}
        <div className="absolute inset-0 z-0">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3198.8576483546734!2d-57.6534591!3d-38.1678241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9584e037f481a62d%3A0x6734281f62c5950d!2sChapadmalal%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1711123456789!5m2!1ses!2sar&style=feature:all|element:all|invert_lightness:true|hue:0x000000|saturation:-100"
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2) brightness(0.4)' }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full object-cover"
          />
          {/* Overlay gradiente para asegurar legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-transparent to-zinc-950/90" />
        </div>

        {/* CONTENIDO OVERLAY */}
        <div className="relative z-10 flex flex-col flex-1 p-8 md:p-16 justify-between gap-12">
          
          {/* PARTE SUPERIOR: Información */}
          <div className="max-w-4xl space-y-8">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-zinc-900/80 border border-white/20 backdrop-blur-md shadow-2xl">
              <Mail className="h-7 w-7 text-[#f2685d]" />
            </div>
            
            <div className="space-y-4">
              <h2 id="contacto-titulo" className="text-5xl font-primary tracking-tight text-white md:text-8xl uppercase leading-none">
                Contactanos
              </h2>
              <p className="max-w-2xl text-xl text-zinc-100 leading-relaxed font-bold uppercase tracking-wider">
                ESTAMOS PARA AYUDARTE. ENVIANOS TU CONSULTA SOBRE CLASES, SEMINARIOS O EQUIPAMIENTO Y TE RESPONDEREMOS A LA BREVEDAD.
              </p>
            </div>

            <div className="flex flex-wrap gap-x-10 gap-y-4 text-sm md:text-base font-bold text-white uppercase tracking-[0.2em]">
              <div className="flex items-center gap-3 bg-black/40 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-[#f2685d] shadow-[0_0_8px_#f2685d]" />
                <span>info@coralbjj.com</span>
              </div>
              <div className="flex items-center gap-3 bg-black/40 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-[#f2685d] shadow-[0_0_8px_#f2685d]" />
                <span>+54 11 1234 5678</span>
              </div>
              <div className="flex items-center gap-3 bg-black/40 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-[#f2685d] shadow-[0_0_8px_#f2685d]" />
                <span>Chapadmalal, Argentina</span>
              </div>
            </div>
          </div>

          {/* PARTE INFERIOR: Formulario Horizontal */}
          <div className="w-full">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-black/55 p-8 md:p-10 shadow-2xl">
              {/* FONDO IGUAL AL FOOTER (Calaveras) */}
              <div className="pointer-events-none absolute inset-0 bg-black/52" aria-hidden="true" />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.095]"
                style={{
                  backgroundImage: "url('/Forro%20calaveras.png'), url('/Forro%20calaveras.png')",
                  backgroundPosition: "0 0, 170px 170px",
                  backgroundRepeat: "repeat, repeat",
                  backgroundSize: "340px 340px, 340px 340px",
                }}
              />
              
              <form className="relative z-10 space-y-8" onSubmit={contactoForm.handleSubmit(onEnviarContacto)}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="nombre" className="text-sm font-bold text-white uppercase tracking-[0.2em]">Nombre Completo</Label>
                    <Input 
                      id="nombre" 
                      placeholder="TU NOMBRE" 
                      className="h-14 border-white/20 bg-zinc-950/80 text-white placeholder:text-zinc-500 focus:border-white/40 focus:ring-0 transition-all text-lg font-medium"
                      {...contactoForm.register("nombre")} 
                    />
                    {contactoForm.formState.errors.nombre && (
                      <p className="text-[10px] font-bold text-[#f2685d] uppercase tracking-tighter">{contactoForm.formState.errors.nombre.message}</p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-bold text-white uppercase tracking-[0.2em]">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="TU@EMAIL.COM" 
                      className="h-14 border-white/20 bg-zinc-950/80 text-white placeholder:text-zinc-500 focus:border-white/40 focus:ring-0 transition-all text-lg font-medium"
                      {...contactoForm.register("email")} 
                    />
                    {contactoForm.formState.errors.email && (
                      <p className="text-[10px] font-bold text-[#f2685d] uppercase tracking-tighter">{contactoForm.formState.errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="academia" className="text-sm font-bold text-white uppercase tracking-[0.2em]">Company / Academy</Label>
                    <Input 
                      id="academia" 
                      placeholder="NOMBRE DE TU ACADEMIA" 
                      className="h-14 border-white/20 bg-zinc-950/80 text-white placeholder:text-zinc-500 focus:border-white/40 focus:ring-0 transition-all text-lg font-medium"
                      {...contactoForm.register("academia")} 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 items-end">
                  <div className="md:col-span-3 space-y-3">
                    <Label htmlFor="mensaje" className="text-sm font-bold text-white uppercase tracking-[0.2em]">Message</Label>
                    <Textarea 
                      id="mensaje" 
                      placeholder="ESCRIBÍ TU MENSAJE AQUÍ..." 
                      rows={1}
                      className="min-h-[60px] md:min-h-[56px] border-white/20 bg-zinc-950/80 text-white placeholder:text-zinc-500 focus:border-white/40 focus:ring-0 transition-all resize-none font-bold tracking-widest py-4"
                      {...contactoForm.register("mensaje")} 
                    />
                    {contactoForm.formState.errors.mensaje && (
                      <p className="text-[10px] font-bold text-[#f2685d] uppercase tracking-tighter">{contactoForm.formState.errors.mensaje.message}</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="h-14 w-full bg-[#f2685d] hover:bg-[#d9534f] text-white font-bold uppercase tracking-widest transition-all shadow-lg shadow-[#f2685d]/20 border-none"
                  >
                    ENVIAR MENSAJE
                  </Button>
                </div>
                
                {mensajeContacto && (
                  <div className="absolute inset-x-0 bottom-0 bg-[#f2685d] py-3 animate-in slide-in-from-bottom-full">
                    <p className="text-xs text-white text-center font-bold uppercase tracking-[0.3em]">{mensajeContacto}</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
