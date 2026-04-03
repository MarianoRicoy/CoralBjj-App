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
import { useCarrito } from "@/hooks/use-carrito";
import { iniciarCheckout } from "@/services/checkout.service";

const contactoSchema = z.object({
  nombre: z.string().min(2, "Ingresá tu nombre"),
  email: z.email("Ingresá un email válido"),
  mensaje: z.string().min(10, "Contanos un poco más"),
});

const checkoutSchema = z.object({
  nombreCompleto: z.string().min(3, "Nombre incompleto"),
  email: z.email("Email inválido"),
  telefono: z.string().min(8, "Teléfono inválido"),
  direccion: z.string().min(5, "Dirección inválida"),
  ciudad: z.string().min(2, "Ciudad inválida"),
  provincia: z.string().min(2, "Provincia inválida"),
  codigoPostal: z.string().min(3, "Código postal inválido"),
});

type ContactoData = z.infer<typeof contactoSchema>;
type CheckoutData = z.infer<typeof checkoutSchema>;

export function FormulariosSection() {
  const { items, totalMonto } = useCarrito();
  const [mensajeContacto, setMensajeContacto] = useState<string>("");
  const [mensajeCheckout, setMensajeCheckout] = useState<string>("");

  const contactoForm = useForm<ContactoData>({
    resolver: zodResolver(contactoSchema),
    defaultValues: { nombre: "", email: "", mensaje: "" },
  });

  const checkoutForm = useForm<CheckoutData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      nombreCompleto: "",
      email: "",
      telefono: "",
      direccion: "",
      ciudad: "",
      provincia: "",
      codigoPostal: "",
    },
  });

  async function onEnviarContacto(data: ContactoData) {
    setMensajeContacto(`Gracias ${data.nombre}, recibimos tu consulta correctamente.`);
    contactoForm.reset();
  }

  async function onEnviarCheckout(data: CheckoutData) {
    if (!items.length) {
      setMensajeCheckout("Tu carrito está vacío. Agregá productos para continuar.");
      return;
    }

    const resultado = await iniciarCheckout(data, items);
    setMensajeCheckout(`${resultado.mensaje} Referencia: ${resultado.referencia}`);
    checkoutForm.reset();
  }

  return (
    <section aria-labelledby="formularios" className="space-y-6">
      <div className="space-y-2">
        <h2 id="formularios" className="text-3xl font-primary text-white md:text-4xl">
          Contacto y checkout
        </h2>
        <p className="text-sm text-zinc-400 md:text-base">
          Gestión inicial de leads y compra online con validación robusta.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
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

        <Card className="border-white/10 bg-zinc-900/60">
          <CardHeader>
            <CardTitle className="text-white">Checkout inicial</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-3" onSubmit={checkoutForm.handleSubmit(onEnviarCheckout)}>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-1">
                  <Label htmlFor="nombreCompleto">Nombre completo</Label>
                  <Input id="nombreCompleto" {...checkoutForm.register("nombreCompleto")} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="checkoutEmail">Email</Label>
                  <Input id="checkoutEmail" type="email" {...checkoutForm.register("email")} />
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-1">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input id="telefono" {...checkoutForm.register("telefono")} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="direccion">Dirección</Label>
                  <Input id="direccion" {...checkoutForm.register("direccion")} />
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <Input placeholder="Ciudad" {...checkoutForm.register("ciudad")} />
                <Input placeholder="Provincia" {...checkoutForm.register("provincia")} />
                <Input placeholder="Código postal" {...checkoutForm.register("codigoPostal")} />
              </div>
              <p className="text-sm text-zinc-300">Total estimado: ${totalMonto.toLocaleString("es-AR")}</p>
              <Button type="submit">Iniciar checkout</Button>
              {mensajeCheckout ? <p className="text-sm text-cyan-100">{mensajeCheckout}</p> : null}
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
