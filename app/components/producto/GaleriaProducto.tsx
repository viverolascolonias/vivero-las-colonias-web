import { resolverImagenPublica } from "@/lib/images";
import FotoProducto from "@/app/components/producto/FotoProducto";
import type { Producto } from "@/lib/types";

export default function GaleriaProducto({ producto }: { producto: Producto }) {
  const carpeta = producto.categoria === "Rosal" ? "rosales" : "plantas";
  const rutaBase = `images/${carpeta}/${producto.slug}`;
  const imagen = resolverImagenPublica(rutaBase);

  return (
    <div className="w-full">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
        <FotoProducto
          producto={producto}
          imagen={imagen}
          sizes="(min-width: 768px) 50vw, 100vw"
          placeholderVariant="sage"
        />
      </div>
      {!imagen && (
        <p className="mt-2 text-center text-xs text-[var(--color-ink-soft)]">
          Fotografía de {producto.nombre} próximamente
        </p>
      )}
    </div>
  );
}
