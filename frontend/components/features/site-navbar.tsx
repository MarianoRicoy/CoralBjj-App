"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

const LINKS_HOME = [
  { label: "Nosotros", href: "/nosotros" },
  { label: "Horarios", href: "#horarios" },
  { label: "Galería", href: "#galeria" },
  { label: "Tienda", href: "#tienda" },
  { label: "Contacto", href: "#formularios" },
];

export function SiteNavbar() {
  const pathname = usePathname();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const links = useMemo(() => {
    if (pathname === "/") {
      return LINKS_HOME;
    }

    return [{ label: "Inicio", href: "/" }, ...LINKS_HOME].map((link) => {
      if (link.href.startsWith("#")) {
        return { ...link, href: `/${link.href}` };
      }

      return link;
    });
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/85 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link className="font-primary text-lg tracking-wide text-white md:text-2xl" href="/">
          Coral BJJ Studio
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

        <ul className="hidden items-center gap-6 text-sm font-medium text-zinc-100 md:flex">
          {links.map((link) => (
            <li key={link.label}>
              <Link className="transition-colors hover:text-cyan-200" href={link.href}>
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              className="rounded-full border border-cyan-300/40 bg-cyan-300/10 px-4 py-2 text-cyan-100 transition-colors hover:bg-cyan-300/20"
              href={pathname === "/" ? "#formularios" : "/#formularios"}
            >
              Clase de prueba
            </Link>
          </li>
        </ul>
      </nav>

      {menuAbierto ? (
        <div className="border-t border-white/10 px-4 py-4 md:hidden">
          <ul className="space-y-3 text-sm text-zinc-100">
            {links.map((link) => (
              <li key={link.label}>
                <Link className="block py-1" href={link.href} onClick={() => setMenuAbierto(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                className="mt-2 inline-flex rounded-full border border-cyan-300/40 bg-cyan-300/10 px-4 py-2 text-cyan-100"
                href={pathname === "/" ? "#formularios" : "/#formularios"}
                onClick={() => setMenuAbierto(false)}
              >
                Clase de prueba
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
