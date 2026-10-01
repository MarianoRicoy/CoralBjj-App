import { getImageProps } from "next/image";

interface BrandLoadingScreenProps {
  id?: string;
  className?: string;
}

export function BrandLoadingScreen({
  id,
  className = "",
}: BrandLoadingScreenProps) {
  const common = {
    alt: "Cargando contenido de Coral BJJ Studio",
    width: 403,
    height: 306,
    unoptimized: true,
  };

  const {
    props: { src: staticSrc },
  } = getImageProps({
    ...common,
    src: "/coral-loading-julia-static.webp",
  });

  const {
    props: { src: animatedSrc, ...restAnimated },
  } = getImageProps({
    ...common,
    preload: true,
    src: "/coral-loading-julia.webp",
  });

  return (
    <div
      id={id}
      role="status"
      aria-live="polite"
      aria-label="Cargando contenido"
      className={`fixed inset-0 z-[9999] flex h-dvh w-screen items-center justify-center bg-black overflow-hidden ${className}`}
    >
      <picture className="flex items-center justify-center">
        <source
          media="(prefers-reduced-motion: reduce)"
          srcSet={staticSrc}
        />
        <img
          {...restAnimated}
          alt={common.alt}
          src={animatedSrc}
          className="h-auto w-[290px] max-w-[85vw] sm:w-[320px] md:w-[360px] select-none"
        />
      </picture>
    </div>
  );
}
