import { notFound } from "next/navigation";
import type { Metadata } from "next";
import FichaProducto from "@/app/components/producto/FichaProducto";
import type { MigaPan } from "@/app/components/ui/Breadcrumbs";
import { getProductoBySlug, getPlantas, CATEGORIAS_PLANTAS } from "@/lib/productos";
import { truncarMetaDescription } from "@/lib/seo";

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
    title: producto.nombre,
    description: producto.descripcion ? truncarMetaDescription(producto.descripcion) : undefined,
    alternates: { canonical: `/plantas/${producto.slug}` },
  };
}

export default async function PlantaDetallePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const producto = getProductoBySlug(slug);
  if (!producto || producto.categoria === "Rosal") notFound();

  const categoriaInfo = CATEGORIAS_PLANTAS.find((c) => c.valor === producto.categoria);
  const migas: MigaPan[] = [
    { label: "Inicio", href: "/" },
    { label: "Plantas", href: "/plantas" },
    ...(categoriaInfo ? [{ label: categoriaInfo.label, href: `/plantas?categoria=${categoriaInfo.valor}` }] : []),
    { label: producto.nombre },
  ];

  return <FichaProducto producto={producto} migas={migas} />;
}
