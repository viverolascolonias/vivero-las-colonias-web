import { notFound } from "next/navigation";
import type { Metadata } from "next";
import FichaProducto from "@/app/components/producto/FichaProducto";
import { getProductoBySlug, getPlantas } from "@/lib/productos";

export function generateStaticParams() {
  return getPlantas().map((p) => ({ slug: p.slug }));
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
    title: `${producto.nombre} — Vivero Las Colonias`,
    description: producto.descripcion,
  };
}

export default async function PlantaDetallePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const producto = getProductoBySlug(slug);
  if (!producto || producto.categoria === "Rosal") notFound();

  return <FichaProducto producto={producto} />;
}
