import Link from "next/link";
import Container from "@/app/components/ui/Container";
import FiltrosRosal from "@/app/components/catalogo/FiltrosRosal";
import GridProductos from "@/app/components/catalogo/GridProductos";
import { getRosales } from "@/lib/productos";
import type { SubcategoriaRosal } from "@/lib/types";

// Cuerpo compartido de /rosales y de sus 3 categorías con URL propia
// (/rosales/arbustivos, /trepadores, /medio-pie) -- mismo componente,
// distinto encabezado/copy según la categoría activa.
export default function CategoriaRosalSeccion({
  subcategoria,
  eyebrow,
  titulo,
  descripcion,
  guiaRelacionada,
}: {
  subcategoria?: SubcategoriaRosal;
  eyebrow: string;
  titulo: string;
  descripcion: string;
  /** Enlace de vuelta a la guía más relevante para esta categoría --
   * enlazado interno real, no relleno: la guía ya menciona esta categoría. */
  guiaRelacionada?: { href: string; texto: string };
}) {
  const productos = getRosales(subcategoria);

  return (
    <div className="py-16 md:py-20">
      <Container>
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-earth)]">
            {eyebrow}
          </p>
          <h1 className="text-4xl md:text-5xl font-medium text-[var(--color-forest-dark)]">{titulo}</h1>
          <p className="mx-auto mt-4 max-w-xl text-[var(--color-ink-soft)] leading-relaxed">{descripcion}</p>
        </div>

        <FiltrosRosal activo={subcategoria} />
        <GridProductos productos={productos} />

        {guiaRelacionada && (
          <p className="mt-14 text-center text-sm text-[var(--color-ink-soft)]">
            <Link href={guiaRelacionada.href} className="text-[var(--color-forest)] underline">
              {guiaRelacionada.texto}
            </Link>
          </p>
        )}
      </Container>
    </div>
  );
}
