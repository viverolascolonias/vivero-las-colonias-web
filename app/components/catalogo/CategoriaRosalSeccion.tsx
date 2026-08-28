import Link from "next/link";
import Container from "@/app/components/ui/Container";
import FiltrosRosal from "@/app/components/catalogo/FiltrosRosal";
import GridProductos from "@/app/components/catalogo/GridProductos";
import Breadcrumbs, { type MigaPan } from "@/app/components/ui/Breadcrumbs";
import JsonLd from "@/app/components/ui/JsonLd";
import { getRosales } from "@/lib/productos";
import { resolverImagenPublica } from "@/lib/images";
import { collectionPageJsonLd, SITE_URL } from "@/lib/seo";
import type { SubcategoriaRosal } from "@/lib/types";

// Cuerpo compartido de /rosales y de sus 3 categorías con URL propia
// (/rosales/arbustivos, /trepadores, /medio-pie) -- mismo componente,
// distinto encabezado/copy según la categoría activa.
export default function CategoriaRosalSeccion({
  ruta,
  migas,
  subcategoria,
  eyebrow,
  titulo,
  descripcion,
  parrafoExtra,
  guiaRelacionada,
}: {
  /** Ruta de esta página (ej. "/rosales/arbustivos") -- para el canonical
   * del CollectionPage y el breadcrumb, siempre coincide con `alternates.canonical`
   * definido en el page.tsx correspondiente. */
  ruta: string;
  migas: MigaPan[];
  subcategoria?: SubcategoriaRosal;
  eyebrow: string;
  titulo: string;
  descripcion: string;
  /** Segundo párrafo opcional con contenido único de la categoría (no
   * relleno): mismos hechos ya publicados en la guía "Tipos de rosales",
   * redactados aparte para esta página en vez de duplicar el texto literal. */
  parrafoExtra?: string;
  /** Enlace de vuelta a la guía más relevante para esta categoría --
   * enlazado interno real, no relleno: la guía ya menciona esta categoría. */
  guiaRelacionada?: { href: string; texto: string };
}) {
  const productos = getRosales(subcategoria);

  const jsonLd = collectionPageJsonLd({
    nombre: titulo,
    descripcion,
    url: `${SITE_URL}${ruta}`,
    items: productos.map((p) => ({
      nombre: p.nombre,
      url: `${SITE_URL}/rosales/${p.slug}`,
      imagenUrl: resolverImagenPublica(`images/rosales/${p.slug}`),
    })),
  });

  return (
    <div className="py-16 md:py-20">
      <JsonLd data={jsonLd} />
      <Container>
        <Breadcrumbs items={migas} />
      </Container>
      <Container>
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-earth)]">
            {eyebrow}
          </p>
          <h1 className="text-4xl md:text-5xl font-medium text-[var(--color-forest-dark)]">{titulo}</h1>
          <p className="mx-auto mt-4 max-w-xl text-[var(--color-ink-soft)] leading-relaxed">{descripcion}</p>
          {parrafoExtra && (
            <p className="mx-auto mt-3 max-w-xl text-sm text-[var(--color-ink-soft)] leading-relaxed">
              {parrafoExtra}
              {subcategoria &&
                ` Hoy tenemos ${productos.length} ${productos.length === 1 ? "variedad disponible" : "variedades disponibles"} en esta categoría.`}
            </p>
          )}
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
