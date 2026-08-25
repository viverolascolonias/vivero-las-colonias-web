import Link from "next/link";
import Container from "@/app/components/ui/Container";
import Badge from "@/app/components/ui/Badge";
import Breadcrumbs, { type MigaPan } from "@/app/components/ui/Breadcrumbs";
import GridProductos from "@/app/components/catalogo/GridProductos";
import GaleriaProducto from "./GaleriaProducto";
import Disponibilidad from "./Disponibilidad";
import BotonComprar from "./BotonComprar";
import WhatsAppButton from "@/app/components/ui/WhatsAppButton";
import { formatCLP } from "@/lib/format";
import { resolverImagenPublica } from "@/lib/images";
import { productoJsonLd } from "@/lib/seo";
import type { Producto } from "@/lib/types";

// Enlaza la categoría de rosal a su página propia (/rosales/arbustivos,
// etc.) -- mismo mapeo que FiltrosRosal, coordinado a mano porque uno vive
// en un Server Component y el otro es un componente compartido simple.
const RUTA_POR_SUBCATEGORIA: Record<string, string> = {
  "Arbustiva baja": "/rosales/arbustivos",
  Trepadora: "/rosales/trepadores",
  "Medio pie": "/rosales/medio-pie",
};

// Ficha botánica (floración, color, aroma): viene del ERP vía
// `npm run sync-erp`, nunca se completa a mano acá. Si una variedad no
// tiene ningún dato confirmado todavía, no se muestra nada.
function FichaBotanica({ producto }: { producto: Producto }) {
  if (producto.categoria !== "Rosal") return null;

  const partes = [
    producto.tipoFloracion ? `${producto.subcategoria} · ${producto.tipoFloracion}` : null,
    producto.color ?? null,
    producto.aromatica === null || producto.aromatica === undefined
      ? null
      : producto.aromatica
        ? "Aromática"
        : "No aromática",
  ].filter((parte): parte is string => Boolean(parte));

  if (partes.length === 0) return null;

  return (
    <p className="mt-3 text-sm text-[var(--color-ink-soft)]">{partes.join(" · ")}</p>
  );
}

export default function FichaProducto({
  producto,
  migas,
  relacionados = [],
}: {
  producto: Producto;
  migas: MigaPan[];
  relacionados?: Producto[];
}) {
  const carpeta = producto.categoria === "Rosal" ? "rosales" : "plantas";
  const imagenUrl = resolverImagenPublica(`images/${carpeta}/${producto.slug}`);
  const jsonLd = productoJsonLd({
    nombre: producto.nombre,
    descripcion: producto.descripcion,
    slug: producto.slug,
    categoria: producto.categoria,
    precio: producto.precio,
    disponible: producto.disponible,
    imagenUrl,
  });
  const rutaSubcategoria = producto.subcategoria ? RUTA_POR_SUBCATEGORIA[producto.subcategoria] : undefined;

  return (
    <div className="py-12 md:py-16">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container>
        <Breadcrumbs items={migas} />
      </Container>
      <Container className="grid gap-12 md:grid-cols-2 md:items-start">
        <GaleriaProducto producto={producto} />

        <div>
          <div className="mb-3 flex items-center gap-2">
            <Badge tone="sage">{producto.categoria}</Badge>
            {producto.subcategoria && rutaSubcategoria ? (
              <Link href={rutaSubcategoria}>
                <Badge tone="sand">{producto.subcategoria}</Badge>
              </Link>
            ) : (
              producto.subcategoria && <Badge tone="sand">{producto.subcategoria}</Badge>
            )}
          </div>

          <h1 className="font-[var(--font-heading)] text-3xl md:text-4xl text-[var(--color-forest-dark)]">
            {producto.nombre}
          </h1>

          <div className="mt-4 flex items-center gap-4">
            <span className="text-2xl text-[var(--color-ink)]">
              {producto.precio != null ? formatCLP(producto.precio) : "Consultar precio"}
            </span>
            <Disponibilidad disponible={producto.disponible} />
          </div>

          <FichaBotanica producto={producto} />

          {producto.descripcion && (
            <p className="mt-6 leading-relaxed text-[var(--color-ink-soft)]">{producto.descripcion}</p>
          )}

          <div className="mt-8">
            <BotonComprar producto={producto} />
            <WhatsAppButton
              mensaje={`Hola, me interesa ${producto.nombre}. ¿Me pueden dar más información?`}
              className="mt-3 w-full"
            >
              Consultar por WhatsApp
            </WhatsAppButton>
          </div>

          {producto.caracteristicas && producto.caracteristicas.length > 0 && (
            <div className="mt-10 border-t border-[var(--color-border)] pt-6">
              <h2 className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-earth)]">
                Características
              </h2>
              <ul className="space-y-1.5 text-sm text-[var(--color-ink)]">
                {producto.caracteristicas.map((c) => (
                  <li key={c} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-[var(--color-forest)]" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {producto.cuidados && producto.cuidados.length > 0 && (
            <div className="mt-8 border-t border-[var(--color-border)] pt-6">
              <h2 className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-earth)]">
                Cuidados
              </h2>
              <ul className="space-y-1.5 text-sm text-[var(--color-ink)]">
                {producto.cuidados.map((c) => (
                  <li key={c} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-[var(--color-forest)]" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Container>

      {relacionados.length > 0 && (
        <Container className="mt-16 border-t border-[var(--color-border)] pt-12">
          <h2 className="mb-6 text-xl font-medium text-[var(--color-forest-dark)]">
            Otras variedades {producto.subcategoria ? producto.subcategoria.toLowerCase() : ""}
          </h2>
          <GridProductos productos={relacionados} />
        </Container>
      )}
    </div>
  );
}
