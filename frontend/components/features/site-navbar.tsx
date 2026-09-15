"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useCarritoStore } from "@/store/use-carrito-store";

const LINKS_HOME = [
  { label: "Nosotros", href: "/nosotros" },
  { label: "Embajadores", href: "/embajadores" },
  { label: "Staff Coral", href: "/staff-coral" },
  { label: "Horarios", href: "/#horarios" },
  { label: "Galería", href: "/#galeria" },
  { label: "Tienda", href: "/tienda" },
  { label: "Contacto", href: "/#formularios" },
];

export function SiteNavbar() {
  const pathname = usePathname();
  const esHome = pathname === "/";
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [colapsado, setColapsado] = useState(false);
  const totalItems = useCarritoStore((state) =>
    state.items.reduce((acc, item) => acc + item.cantidad, 0),
  );

  const linksNavbar = esHome
    ? LINKS_HOME
    : [{ label: "Inicio", href: "/" }, ...LINKS_HOME];

  const obtenerHrefLink = (link: { label: string; href: string }) => {
    if (link.label === "Galería") {
      return esHome ? "/#galeria" : "/?abrirGaleria=true#galeria";
    }
    return link.href;
  };

  const manejarClickLink = (link: { label: string; href: string }, evento: React.MouseEvent) => {
    setMenuAbierto(false);
    if (link.label === "Galería" && esHome) {
      evento.preventDefault();
      const el = document.getElementById("galeria");
      el?.scrollIntoView({ behavior: "smooth" });
      window.dispatchEvent(new CustomEvent("coral:abrir-galeria"));
    }
  };

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

        <div className="flex items-center gap-4 lg:gap-6">
          <ul
            className={`items-center gap-3 text-2xl font-titulos font-medium text-zinc-100 lg:gap-5 ${
              colapsado ? "hidden" : "hidden md:flex"
            }`}
          >
            {linksNavbar.map((link) => (
              <li key={link.label}>
                <Link
                  className="group inline-flex items-center gap-2 rounded-xl border border-transparent px-3 py-1.5 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.10] hover:text-white hover:backdrop-blur-md hover:shadow-lg hover:shadow-black/25 active:bg-white/[0.16]"
                  href={obtenerHrefLink(link)}
                  onClick={(evento) => manejarClickLink(link, evento)}
                >
                  <span aria-hidden="true" className="text-zinc-400 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] transition-colors group-hover:text-white/80">
                    |
                  </span>
                  <span className="drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] transition-colors group-hover:text-white">
                    {link.label}
                  </span>
                  <span aria-hidden="true" className="text-zinc-400 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] transition-colors group-hover:text-white/80">
                    |
                  </span>
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
              <Image
                alt="Cerrar menú"
                className="h-16 w-16 object-contain"
                height={64}
                src="/Xhuesos.png"
                width={64}
              />
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

          {/* Carrito en la barra superior: solo visible en desktop expandido cuando no se muestran los huesos */}
          <Link
            aria-label="Ir a carrito"
            className={`group relative shrink-0 rounded-xl border border-transparent p-2 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.10] hover:backdrop-blur-md hover:shadow-lg hover:shadow-black/25 active:bg-white/[0.16] ${
              colapsado ? "hidden" : "hidden md:inline-flex"
            }`}
            href="/carrito"
          >
            <Image
              alt="Carrito"
              className="h-16 w-16 object-contain transition-transform duration-200 group-hover:scale-105"
              height={64}
              src="/icons/custom/coral_cart_skull@128.png"
              width={64}
            />
            {totalItems > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#f2685d] px-1 text-[11px] font-bold text-white shadow-md">
                {totalItems}
              </span>
            ) : null}
          </Link>
        </div>
      </nav>

      {menuAbierto ? (
        <div className="ml-auto mr-4 mt-1 w-72 rounded-xl border border-white/10 bg-black/50 px-5 py-4 shadow-2xl shadow-black/40 backdrop-blur-xl md:mr-12">
          <ul className="space-y-1 text-3xl font-titulos text-zinc-100">
            {linksNavbar.map((link) => (
              <li key={link.label}>
                <Link
                  className="block rounded-lg border border-transparent px-3 py-1.5 transition-all duration-200 hover:border-white/15 hover:bg-white/[0.08] hover:text-white hover:backdrop-blur-sm active:bg-white/[0.14]"
                  href={obtenerHrefLink(link)}
                  onClick={(evento) => manejarClickLink(link, evento)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Carrito integrado estéticamente al final del menú desplegable */}
          <div className="mt-3 flex justify-center border-t border-white/10 pt-2.5">
            <Link
              aria-label="Ir a carrito"
              className="group relative inline-flex items-center justify-center rounded-xl border border-transparent p-2 transition-all duration-200 hover:border-white/15 hover:bg-white/[0.08] hover:backdrop-blur-sm active:bg-white/[0.14]"
              href="/carrito"
              onClick={() => setMenuAbierto(false)}
            >
              <Image
                alt="Carrito"
                className="h-14 w-14 object-contain transition-transform duration-200 group-hover:scale-110 active:scale-95"
                height={56}
                src="/icons/custom/coral_cart_skull@128.png"
                width={56}
              />
              {totalItems > 0 ? (
                <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#f2685d] px-1 text-[11px] font-bold text-white shadow-md">
                  {totalItems}
                </span>
              ) : null}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
