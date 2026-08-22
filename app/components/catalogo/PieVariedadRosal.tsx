import type { Producto } from "@/lib/types";

// Pie de foto breve con la ficha botánica de la variedad (tipo de
// floración, color, aroma). Los datos vienen del ERP (VariedadRosal) vía
// `npm run sync-erp` -- nunca se completan a mano acá. Si una variedad
// todavía no tiene ningún dato confirmado, este componente no renderiza
// nada (nunca se inventa ni se deja un renglón vacío).
//
// La descripción larga NO va acá a propósito: el catálogo debe quedar
// limpio y recorrible de un vistazo, y la descripción completa vive en la
// ficha individual de cada variedad (FichaProducto.tsx) -- ver ese
// componente, que ya la muestra íntegra. No se pierde información, solo
// cambia dónde se ve.
export default function PieVariedadRosal({ producto }: { producto: Producto }) {
  if (producto.categoria !== "Rosal") return null;

  const lineaFloracion = producto.tipoFloracion ? `${producto.subcategoria} · ${producto.tipoFloracion}` : null;

  const partesColorAroma = [
    producto.color ?? null,
    producto.aromatica === null || producto.aromatica === undefined
      ? null
      : producto.aromatica
        ? "Aromática"
        : "No aromática",
  ].filter((parte): parte is string => Boolean(parte));
  const lineaColorAroma = partesColorAroma.length > 0 ? partesColorAroma.join(" · ") : null;

  if (!lineaFloracion && !lineaColorAroma) return null;

  return (
    <div className="mt-1.5 space-y-0.5 text-xs leading-relaxed text-[var(--color-ink-soft)]">
      {lineaFloracion && <p>{lineaFloracion}</p>}
      {lineaColorAroma && <p>{lineaColorAroma}</p>}
    </div>
  );
}
