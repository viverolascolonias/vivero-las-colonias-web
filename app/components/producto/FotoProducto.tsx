import Image from "next/image";
import PlaceholderImage from "@/app/components/ui/PlaceholderImage";
import { obtenerClaseObjectPosition, obtenerEstiloZoom } from "@/lib/encuadreImagen";
import type { Producto } from "@/lib/types";

// Todas las fotos llenan por completo su marco (object-cover, sin dejar
// espacio vacío ni fondo de la tarjeta a la vista). El recorte que exige
// eso se ajusta por variedad en lib/encuadreImagen.ts cuando el centrado
// por defecto no queda bien encuadrado. Las trepadoras nunca llevan zoom
// (`scale`) ahí -- solo un posible desplazamiento de encuadre
// (`objectPosition`) -- para conservar la mayor parte posible de la foto
// original y que se aprecie la extensión del rosal, no solo una flor.
// Se usa dentro de un contenedor "relative" con tamaño ya definido por el
// padre (aspect-square, h-16 w-16, etc).
export default function FotoProducto({
  producto,
  imagen,
  sizes,
  hoverZoom = false,
  placeholderVariant = "olive",
}: {
  producto: Producto;
  imagen: string | null;
  sizes: string;
  /** Microinteracción de zoom leve al pasar el mouse (requiere `group` en un ancestro). */
  hoverZoom?: boolean;
  placeholderVariant?: "olive" | "sand" | "sage";
}) {
  const hoverClase = hoverZoom ? "transition-transform duration-500 group-hover:scale-[1.03]" : "";
  const alt =
    producto.categoria === "Rosal" && producto.subcategoria
      ? `Rosa ${producto.nombre} — rosal ${producto.subcategoria.toLowerCase()}, Vivero Las Colonias`
      : `${producto.nombre}, Vivero Las Colonias`;

  if (!imagen) {
    return <PlaceholderImage variant={placeholderVariant} className={`h-full w-full ${hoverClase}`} />;
  }

  return (
    <div className="absolute inset-0" style={obtenerEstiloZoom(producto.slug)}>
      <div className={`absolute inset-0 ${hoverClase}`}>
        <Image
          src={imagen}
          alt={alt}
          fill
          sizes={sizes}
          className={`object-cover ${obtenerClaseObjectPosition(producto.slug)}`}
        />
      </div>
    </div>
  );
}
