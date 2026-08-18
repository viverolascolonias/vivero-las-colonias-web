import Image from "next/image";
import PlaceholderImage from "./PlaceholderImage";
import { resolverImagenPublica } from "@/lib/images";

// Imagen de bloque en flujo normal (tarjetas, retratos, galerías). Server
// Component: resuelve el archivo real en /public en el servidor y cae al
// placeholder de marca si todavía no existe. `className` define el tamaño
// (aspect ratio, ancho, bordes) igual que antes con PlaceholderImage. Ver
// IMAGENES.md para la ruta exacta que espera cada `rutaBase`.
export default function ImagenBloque({
  rutaBase,
  alt,
  variant = "olive",
  className = "",
  sizes = "100vw",
}: {
  rutaBase: string;
  alt: string;
  variant?: "olive" | "sand" | "sage";
  className?: string;
  sizes?: string;
}) {
  const src = resolverImagenPublica(rutaBase);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      ) : (
        <PlaceholderImage variant={variant} className="h-full w-full" />
      )}
    </div>
  );
}
