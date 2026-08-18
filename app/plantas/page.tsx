import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/ui/Container";
import GridProductos from "@/app/components/catalogo/GridProductos";
import CategoriaPlantaCard from "@/app/components/catalogo/CategoriaPlantaCard";
import { getPlantas, CATEGORIAS_PLANTAS } from "@/lib/productos";
import type { Producto } from "@/lib/types";

export const metadata: Metadata = {
  title: "Plantas — Vivero Las Colonias",
  description:
    "Ornamentales, árboles, arbustos y plantas de interior de Vivero Las Colonias: tan parte del vivero como nuestros rosales.",
};

export default async function PlantasPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  const categoriaActiva = categoria as Exclude<Producto["categoria"], "Rosal"> | undefined;
  const productos = getPlantas(categoriaActiva);
  const categoriaInfo = CATEGORIAS_PLANTAS.find((c) => c.valor === categoriaActiva);

  return (
    <div className="py-16 md:py-20">
      <Container>
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-earth)]">
            Nuestro catálogo
          </p>
          <h1 className="text-4xl md:text-5xl font-medium text-[var(--color-forest-dark)]">Plantas</h1>
          <p className="mx-auto mt-4 max-w-xl text-[var(--color-ink-soft)] leading-relaxed">
            Ornamentales, árboles, arbustos y plantas de interior: tan parte de Vivero Las Colonias
            como nuestros rosales.
          </p>
        </div>

        <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/plantas"
            className={`rounded-full border px-5 py-2 text-sm transition-colors ${
              !categoriaActiva
                ? "border-[var(--color-forest)] bg-[var(--color-forest)] text-[var(--color-cream-50)]"
                : "border-[var(--color-border)] text-[var(--color-ink-soft)] hover:border-[var(--color-forest)] hover:text-[var(--color-forest)]"
            }`}
          >
            Todas
          </Link>
          {CATEGORIAS_PLANTAS.map((c) => (
            <Link
              key={c.valor}
              href={`/plantas?categoria=${c.valor}`}
              className={`rounded-full border px-5 py-2 text-sm transition-colors ${
                categoriaActiva === c.valor
                  ? "border-[var(--color-forest)] bg-[var(--color-forest)] text-[var(--color-cream-50)]"
                  : "border-[var(--color-border)] text-[var(--color-ink-soft)] hover:border-[var(--color-forest)] hover:text-[var(--color-forest)]"
              }`}
            >
              {c.label}
            </Link>
          ))}
        </div>

        {categoriaActiva ? (
          // Categoría específica: si ya tiene variedades reales, la grilla de
          // productos (misma que Rosales); si no, una tarjeta de esa
          // categoría puntual en vez de un mensaje genérico.
          productos.length > 0 ? (
            <GridProductos productos={productos} />
          ) : (
            <div className="mx-auto max-w-sm">
              {categoriaInfo && (
                <CategoriaPlantaCard
                  valor={categoriaInfo.valor}
                  label={categoriaInfo.label}
                  descripcion={categoriaInfo.descripcion}
                  href={`/plantas?categoria=${categoriaInfo.valor}`}
                  cantidad={0}
                />
              )}
              <p className="mt-6 text-center text-sm text-[var(--color-ink-soft)] leading-relaxed">
                Todavía no tenemos variedades cargadas en esta categoría. Ya está preparada en la web y
                aparecerá automáticamente apenas se incorpore al catálogo.
              </p>
            </div>
          )
        ) : (
          <>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5 md:gap-6">
              {CATEGORIAS_PLANTAS.map((c, i) => (
                <CategoriaPlantaCard
                  key={c.valor}
                  valor={c.valor}
                  label={c.label}
                  descripcion={c.descripcion}
                  href={`/plantas?categoria=${c.valor}`}
                  cantidad={productos.filter((p) => p.categoria === c.valor).length}
                  indice={i}
                />
              ))}
            </div>

            {productos.length > 0 && (
              <div className="mt-16">
                <h2 className="mb-6 text-xl font-medium text-[var(--color-forest-dark)]">
                  Todas las plantas
                </h2>
                <GridProductos productos={productos} />
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
}
