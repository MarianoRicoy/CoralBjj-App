"use client";

import { useEffect, useState } from "react";
import { BrandLoadingScreen } from "@/components/ui/brand-loading-screen";

const CLAVE_SESSION_INTRO = "coral_intro_vista";
const DURACION_INTRO_MS = 1300;

export function BrandIntro() {
  const [desmontado, setDesmontado] = useState(false);
  const [desvaneciendo, setDesvaneciendo] = useState(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const forzarIntro =
        process.env.NODE_ENV !== "production" &&
        params.get("intro") === "true";
      const yaVista = sessionStorage.getItem(CLAVE_SESSION_INTRO);

      if (yaVista && !forzarIntro) {
        document.documentElement.classList.remove("coral-intro-active");
        const quickTimer = setTimeout(() => setDesmontado(true), 0);
        return () => clearTimeout(quickTimer);
      }

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const timer = setTimeout(() => {
        if (prefersReducedMotion) {
          document.documentElement.classList.remove("coral-intro-active");
          sessionStorage.setItem(CLAVE_SESSION_INTRO, "true");
          setDesmontado(true);
        } else {
          setDesvaneciendo(true);
          const fadeTimer = setTimeout(() => {
            document.documentElement.classList.remove("coral-intro-active");
            sessionStorage.setItem(CLAVE_SESSION_INTRO, "true");
            setDesmontado(true);
          }, 300);

          return () => clearTimeout(fadeTimer);
        }
      }, DURACION_INTRO_MS);

      return () => clearTimeout(timer);
    } catch {
      setTimeout(() => setDesmontado(true), 0);
    }
  }, []);

  if (desmontado) {
    return null;
  }

  return (
    <BrandLoadingScreen
      id="coral-brand-intro"
      className={`transition-opacity duration-300 ${
        desvaneciendo ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    />
  );
}
