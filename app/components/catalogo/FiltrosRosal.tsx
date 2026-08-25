import Link from "next/link";
import { SUBCATEGORIAS_ROSAL } from "@/lib/productos";

// Rutas propias por categoría (mejor para SEO que un filtro por
// query-string: cada una tiene su propio título, meta description y URL
// indexable). Mantener sincronizado con app/rosales/{arbustivos,
// trepadores,medio-pie}/page.tsx.
const RUTA_POR_SUBCATEGORIA: Record<string, string> = {
  "Arbustiva baja": "/rosales/arbustivos",
  Trepadora: "/rosales/trepadores",
  "Medio pie": "/rosales/medio-pie",
};

export default function FiltrosRosal({ activo }: { activo?: string }) {
  const opciones = [{ label: "Todas", valor: undefined }, ...SUBCATEGORIAS_ROSAL.map((s) => ({ label: s, valor: s }))];

  return (
    <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
      {opciones.map((op) => {
        const esActivo = activo === op.valor || (!activo && !op.valor);
        const href = op.valor ? RUTA_POR_SUBCATEGORIA[op.valor] : "/rosales";
        return (
          <Link
            key={op.label}
            href={href}
            className={`rounded-full border px-5 py-2 text-sm transition-colors ${
              esActivo
                ? "border-[var(--color-forest)] bg-[var(--color-forest)] text-[var(--color-cream-50)]"
                : "border-[var(--color-border)] text-[var(--color-ink-soft)] hover:border-[var(--color-forest)] hover:text-[var(--color-forest)]"
            }`}
          >
            {op.label}
          </Link>
        );
      })}
    </div>
  );
}
