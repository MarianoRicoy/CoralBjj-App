import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductoDetalle } from "@/components/features/producto-detalle";
import { PLACEHOLDER_BASE64 } from "@/lib/media";
import { obtenerProductoPorSlugDesdeApi } from "@/services/productos.service";

export const dynamic = "force-dynamic";

type ProductoPageParams = {
  slug: string;
};

type ProductoPageProps = {
  params: Promise<ProductoPageParams>;
};

export async function generateMetadata({ params }: ProductoPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const producto = await obtenerProductoPorSlugDesdeApi(slug);

    if (!producto) {
      return {
        title: "Producto no encontrado",
      };
    }

    return {
      title: `${producto.nombre} | Tienda Coral BJJ`,
      description: producto.descripcion,
    };
  } catch {
    return {
      title: "Tienda Coral BJJ",
    };
  }
}

export default async function ProductoPage({ params }: ProductoPageProps) {
  const { slug } = await params;
  let producto = null;

  try {
    producto = await obtenerProductoPorSlugDesdeApi(slug);
  } catch {
    producto = null;
  }

  if (!producto) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 md:px-8 md:py-12">
      <Link
        className="inline-flex text-sm text-zinc-300 transition-colors hover:text-white"
        href="/tienda"
      >
        ← Volver a tienda
      </Link>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
        <article className="relative min-h-[380px] overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/80 md:min-h-[520px]">
          <Image
            alt={producto.nombre}
            blurDataURL={PLACEHOLDER_BASE64}
            className="h-full w-full object-contain p-5"
            fill
            placeholder="blur"
            priority
            sizes="(max-width: 1024px) 100vw, 56vw"
            src={producto.imagen}
          />
        </article>

        <ProductoDetalle producto={producto} />
      </section>
    </main>
  );
}
