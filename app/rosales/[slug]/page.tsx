import { notFound } from "next/navigation";
import type { Metadata } from "next";
import FichaProducto from "@/app/components/producto/FichaProducto";
import type { MigaPan } from "@/app/components/ui/Breadcrumbs";
import { getProductoBySlug, getRosales } from "@/lib/productos";
import type { SubcategoriaRosal } from "@/lib/types";

const RUTA_POR_SUBCATEGORIA: Record<string, string> = {
  "Arbustiva baja": "/rosales/arbustivos",
  Trepadora: "/rosales/trepadores",
  "Medio pie": "/rosales/medio-pie",
};

export function generateStaticParams() {
  return getRosales().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const producto = getProductoBySlug(slug);
  if (!producto) return {};
  return {
    title: producto.subcategoria ? `Rosa ${producto.nombre} — Rosal ${producto.subcategoria}` : producto.nombre,
    description: producto.descripcion,
    alternates: { canonical: `/rosales/${producto.slug}` },
  };
}

export default async function RosalDetallePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const producto = getProductoBySlug(slug);
  if (!producto || producto.categoria !== "Rosal") notFound();

  const migas: MigaPan[] = [
    { label: "Inicio", href: "/" },
    { label: "Rosales", href: "/rosales" },
    ...(producto.subcategoria && RUTA_POR_SUBCATEGORIA[producto.subcategoria]
      ? [{ label: producto.subcategoria, href: RUTA_POR_SUBCATEGORIA[producto.subcategoria] }]
      : []),
    { label: producto.nombre },
  ];

  const relacionados = getRosales(producto.subcategoria as SubcategoriaRosal | undefined)
    .filter((p) => p.id !== producto.id)
    .slice(0, 4);

  return <FichaProducto producto={producto} migas={migas} relacionados={relacionados} />;
}
