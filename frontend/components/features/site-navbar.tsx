"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const LINKS_HOME = [
  { label: "Nosotros", href: "/nosotros" },
  { label: "Horarios", href: "/#horarios" },
  { label: "Galería", href: "/galeria" },
  { label: "Tienda", href: "/tienda" },
  { label: "Contacto", href: "/#formularios" },
];

export function SiteNavbar() {
  const pathname = usePathname();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const linksNavbar =
    pathname === "/"
      ? LINKS_HOME
      : [
          { label: "Inicio", href: "/" },
          ...LINKS_HOME,
        ];

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
          {linksNavbar.map((link) => (
            <li key={link.label}>
              <Link className="inline-flex items-center gap-2 transition-colors hover:text-white" href={link.href}>
                <span aria-hidden="true">|</span>
                <span>{link.label}</span>
                <span aria-hidden="true">|</span>
              </Link>
            </li>
          ))}
          <li>
            <Link
              aria-label="Ir a carrito"
              className="inline-flex transition-opacity hover:opacity-80"
              href="/carrito"
            >
              <Image alt="Carrito" height={64} src="/icons/custom/coral_cart_skull@128.png" width={64} />
            </Link>
          </li>
        </ul>
      </nav>

      {menuAbierto ? (
        <div className="border-t border-white/10 px-4 py-4 md:hidden">
          <ul className="space-y-3 text-base font-tertiary text-zinc-100">
            {linksNavbar.map((link) => (
              <li key={link.label}>
                <Link className="block py-1" href={link.href} onClick={() => setMenuAbierto(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                aria-label="Ir a carrito"
                className="mt-2 inline-flex"
                href="/carrito"
                onClick={() => setMenuAbierto(false)}
              >
                <Image alt="Carrito" height={64} src="/icons/custom/coral_cart_skull@128.png" width={64} />
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
