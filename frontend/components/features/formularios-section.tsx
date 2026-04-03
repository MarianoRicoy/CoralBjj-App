"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const contactoSchema = z.object({
  nombre: z.string().min(2, "Ingresá tu nombre"),
  email: z.email("Ingresá un email válido"),
  mensaje: z.string().min(10, "Contanos un poco más"),
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
  }

  return (
    <section aria-labelledby="formularios" className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 id="formularios" className="text-3xl font-primary text-white md:text-4xl">
          Contacto
        </h2>
        <p className="text-sm text-zinc-400 md:text-base">
          Escribinos y te respondemos a la brevedad para ayudarte con tu consulta.
        </p>
      </div>

      <Card className="border-white/10 bg-zinc-900/60">
        <CardHeader>
          <CardTitle className="text-white">Formulario de contacto</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-3" onSubmit={contactoForm.handleSubmit(onEnviarContacto)}>
            <div className="space-y-1">
              <Label htmlFor="nombre">Nombre</Label>
              <Input id="nombre" {...contactoForm.register("nombre")} />
              <p className="text-xs text-red-300">{contactoForm.formState.errors.nombre?.message}</p>
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...contactoForm.register("email")} />
              <p className="text-xs text-red-300">{contactoForm.formState.errors.email?.message}</p>
            </div>
            <div className="space-y-1">
              <Label htmlFor="mensaje">Mensaje</Label>
              <Textarea id="mensaje" rows={4} {...contactoForm.register("mensaje")} />
              <p className="text-xs text-red-300">{contactoForm.formState.errors.mensaje?.message}</p>
            </div>
            <Button type="submit">Enviar consulta</Button>
            {mensajeContacto ? <p className="text-sm text-cyan-100">{mensajeContacto}</p> : null}
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
