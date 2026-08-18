import type { Producto } from "@/lib/types";
import { resolverImagenPublica } from "@/lib/images";
import ProductoCard from "./ProductoCard";

export default function GridProductos({ productos }: { productos: Producto[] }) {
  if (productos.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-[var(--color-ink-soft)]">
        No hay productos disponibles en esta categoría por ahora.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
      {productos.map((p) => {
        const carpeta = p.categoria === "Rosal" ? "rosales" : "plantas";
        const imagen = resolverImagenPublica(`images/${carpeta}/${p.slug}`);
        return <ProductoCard key={p.id} producto={p} imagen={imagen} />;
      })}
    </div>
  );
}
