import Image from "next/image";
import PlaceholderImage from "./PlaceholderImage";
import { resolverImagenPublica } from "@/lib/images";

// Imagen de fondo a pantalla completa (Hero, secciones tipo banner). Server
// Component: resuelve el archivo real en /public en el servidor y cae al
// placeholder de marca si todavía no existe. Ver IMAGENES.md para la ruta
// exacta que espera cada `rutaBase`.
export default function ImagenFondo({
  rutaBase,
  alt,
  variant = "olive",
  priority = false,
  imgClassName = "",
}: {
  rutaBase: string;
  alt: string;
  variant?: "olive" | "sand" | "sage";
  priority?: boolean;
  /** Clases extra para la <Image> (ej. object-position responsivo cuando el
   * encuadre por defecto no deja visible lo importante en pantallas angostas). */
  imgClassName?: string;
}) {
  const src = resolverImagenPublica(rutaBase);

  return (
    <div className="absolute inset-0 h-full w-full">
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className={`object-cover ${imgClassName}`}
        />
      ) : (
        <PlaceholderImage variant={variant} className="h-full w-full" />
      )}
    </div>
  );
}
