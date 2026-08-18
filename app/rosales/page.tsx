import type { Metadata } from "next";
import Container from "@/app/components/ui/Container";
import FiltrosRosal from "@/app/components/catalogo/FiltrosRosal";
import GridProductos from "@/app/components/catalogo/GridProductos";
import { getRosales } from "@/lib/productos";
import type { SubcategoriaRosal } from "@/lib/types";

export const metadata: Metadata = {
  title: "Rosales — Vivero Las Colonias",
  description: "Catálogo de rosales y variedades poco comunes de Vivero Las Colonias.",
};

export default async function RosalesPage({
  searchParams,
}: {
  searchParams: Promise<{ subcategoria?: string }>;
}) {
  const { subcategoria } = await searchParams;
  const productos = getRosales(subcategoria as SubcategoriaRosal | undefined);

  return (
    <div className="py-16 md:py-20">
      <Container>
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-earth)]">
            Nuestra especialidad
          </p>
          <h1 className="text-4xl md:text-5xl font-medium text-[var(--color-forest-dark)]">Rosales</h1>
          <p className="mx-auto mt-4 max-w-xl text-[var(--color-ink-soft)] leading-relaxed">
            Variedades cultivadas y seleccionadas por Vivero Las Colonias, desde clásicas hasta poco
            comunes.
          </p>
        </div>

        <FiltrosRosal activo={subcategoria} />
        <GridProductos productos={productos} />
      </Container>
    </div>
  );
}
