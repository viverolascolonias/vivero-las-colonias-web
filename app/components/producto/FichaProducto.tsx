import Container from "@/app/components/ui/Container";
import Badge from "@/app/components/ui/Badge";
import GaleriaProducto from "./GaleriaProducto";
import Disponibilidad from "./Disponibilidad";
import BotonComprar from "./BotonComprar";
import WhatsAppButton from "@/app/components/ui/WhatsAppButton";
import { formatCLP } from "@/lib/format";
import type { Producto } from "@/lib/types";

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

export default function FichaProducto({ producto }: { producto: Producto }) {
  return (
    <div className="py-12 md:py-16">
      <Container className="grid gap-12 md:grid-cols-2 md:items-start">
        <GaleriaProducto producto={producto} />

        <div>
          <div className="mb-3 flex items-center gap-2">
            <Badge tone="sage">{producto.categoria}</Badge>
            {producto.subcategoria && <Badge tone="sand">{producto.subcategoria}</Badge>}
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
    </div>
  );
}
