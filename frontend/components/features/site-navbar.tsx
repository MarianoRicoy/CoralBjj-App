"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const LINKS_HOME = [
  { label: "Nosotros", href: "/nosotros" },
  { label: "Horarios", href: "/#horarios" },
  { label: "Galería", href: "/#galeria" },
  { label: "Tienda", href: "/#tienda" },
  { label: "Contacto", href: "/#formularios" },
];

export function SiteNavbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-transparent">
      <nav className="mt-2 flex w-full items-center justify-between px-6 py-1 md:px-12 md:py-1.5">
        <Link aria-label="Coral BJJ Studio" className="shrink-0" href="/">
          <Image
            alt="Coral BJJ Studio"
            className="h-[108px] w-auto md:h-[132px]"
            height={192}
            priority
            src="/logo-coral.png"
            width={660}
          />
        </Link>

        <button
          aria-expanded={menuAbierto}
          aria-label="Abrir menú"
          className="rounded-lg border border-white/20 p-2 text-white md:hidden"
          onClick={() => setMenuAbierto((prev) => !prev)}
          type="button"
        >
          {menuAbierto ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <ul className="hidden items-center gap-9 text-base font-tertiary font-medium text-zinc-100 md:flex">
          {LINKS_HOME.map((link) => (
            <li key={link.label}>
              <Link className="inline-flex items-center gap-2 transition-colors hover:text-cyan-200" href={link.href}>
                <span aria-hidden="true">|</span>
                <span>{link.label}</span>
                <span aria-hidden="true">|</span>
              </Link>
            </li>
          ))}
          <li>
            <Link
              aria-label="Ir a tienda"
              className="transition-opacity hover:opacity-80"
              href="/#tienda"
            >
              <Image alt="Carrito" height={48} src="/icons/custom/coral_cart_skull@128.png" width={48} />
            </Link>
          </li>
        </ul>
      </nav>

      {menuAbierto ? (
        <div className="border-t border-white/10 px-4 py-4 md:hidden">
          <ul className="space-y-3 text-base font-tertiary text-zinc-100">
            {LINKS_HOME.map((link) => (
              <li key={link.label}>
                <Link className="block py-1" href={link.href} onClick={() => setMenuAbierto(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                aria-label="Ir a tienda"
                className="mt-2 inline-flex"
                href="/#tienda"
                onClick={() => setMenuAbierto(false)}
              >
                <Image alt="Carrito" height={48} src="/icons/custom/coral_cart_skull@128.png" width={48} />
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
