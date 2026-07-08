"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

const LINKS_HOME = [
  { label: "Nosotros", href: "/nosotros" },
  { label: "Embajadores", href: "/embajadores" },
  { label: "Staff Coral", href: "/staff-coral" },
  { label: "Horarios", href: "/#horarios" },
  { label: "Galería", href: "/galeria" },
  { label: "Tienda", href: "/tienda" },
  { label: "Contacto", href: "/#formularios" },
];

export function SiteNavbar() {
  const pathname = usePathname();
  const esHome = pathname === "/";
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [colapsado, setColapsado] = useState(false);
  const linksNavbar = esHome
    ? LINKS_HOME
    : [{ label: "Inicio", href: "/" }, ...LINKS_HOME];

  useEffect(() => {
    function alScrollear() {
      const limite = esHome ? window.innerHeight * 0.85 : 24;
      const debeColapsar = window.scrollY > limite;
      setColapsado(debeColapsar);
      if (!debeColapsar) {
        setMenuAbierto(false);
      }
    }

    alScrollear();
    window.addEventListener("scroll", alScrollear, { passive: true });
    return () => window.removeEventListener("scroll", alScrollear);
  }, [esHome]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
      <nav
        className="mt-2 flex w-full items-center justify-between px-6 py-1 md:px-12 md:py-1.5"
      >
        <Link
          aria-label="Coral BJJ Studio"
          className="shrink-0"
          href="/"
          onClick={(evento) => {
            if (esHome) {
              evento.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <Image
            alt="Coral BJJ Studio"
            className="h-[108px] w-auto md:h-[132px]"
            height={192}
            priority
            src="/logo-coral.png"
            width={660}
          />
        </Link>

        <div className="flex items-center gap-6">
          <ul
            className={`items-center gap-9 text-2xl font-titulos font-medium text-zinc-100 ${
              colapsado ? "hidden" : "hidden md:flex"
            }`}
          >
            {linksNavbar.map((link) => (
              <li key={link.label}>
                <Link className="inline-flex items-center gap-2 transition-colors hover:text-white" href={link.href}>
                  <span aria-hidden="true">|</span>
                  <span>{link.label}</span>
                  <span aria-hidden="true">|</span>
                </Link>
              </li>
            ))}
          </ul>

          <button
            aria-expanded={menuAbierto}
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
            className={`items-center justify-center text-white transition-opacity hover:opacity-80 ${
              colapsado ? "flex" : "flex md:hidden"
            }`}
            onClick={() => setMenuAbierto((prev) => !prev)}
            type="button"
          >
            {menuAbierto ? (
              <X className="h-9 w-9" />
            ) : (
              <Image
                alt="Menú"
                className="h-16 w-16 object-contain"
                height={64}
                src="/menu-huesos-white.png"
                width={64}
              />
            )}
          </button>

          <Link
            aria-label="Ir a carrito"
            className="inline-flex shrink-0 transition-opacity hover:opacity-80"
            href="/carrito"
          >
            <Image alt="Carrito" height={64} src="/icons/custom/coral_cart_skull@128.png" width={64} />
          </Link>
        </div>
      </nav>

      {menuAbierto ? (
        <div className="ml-auto mr-4 mt-1 w-72 rounded-xl border border-white/10 bg-black/50 px-6 py-5 shadow-2xl shadow-black/40 backdrop-blur-xl md:mr-12">
          <ul className="space-y-3 text-3xl font-titulos text-zinc-100">
            {linksNavbar.map((link) => (
              <li key={link.label}>
                <Link
                  className="block py-1 transition-colors hover:text-white"
                  href={link.href}
                  onClick={() => setMenuAbierto(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
