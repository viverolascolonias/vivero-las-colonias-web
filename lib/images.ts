import fs from "node:fs";
import path from "node:path";

// Resuelve imágenes reales servidas desde /public, con el placeholder de
// marca como único fallback. Solo se puede usar en Server Components (usa
// `fs`, que no existe en el bundle de cliente) -- los componentes "use
// client" (ProductoCard, ModalCompraRapida) reciben la ruta ya resuelta
// como prop desde su padre.
const EXTENSIONES = [".jpg", ".jpeg", ".png", ".webp"] as const;

/**
 * Busca en /public un archivo real para `rutaBase` (sin extensión, p. ej.
 * "images/rosales/amarilla-boton-arbustiva-baja"), probando .jpg, .jpeg,
 * .png y .webp en ese orden. Devuelve la ruta pública (con extensión) si
 * existe, o `null` si la imagen real todavía no fue subida -- en ese caso
 * el componente que llama debe mostrar el placeholder de marca.
 */
export function resolverImagenPublica(rutaBase: string): string | null {
  for (const ext of EXTENSIONES) {
    const rutaDisco = path.join(process.cwd(), "public", `${rutaBase}${ext}`);
    try {
      const stat = fs.statSync(rutaDisco);
      // `npm run sync-erp` reemplaza el archivo (mismo nombre) cuando se
      // reemplaza una fotografía en el ERP -- sin esto el navegador podría
      // seguir mostrando la imagen vieja desde caché, ya que la URL no
      // cambiaría. mtime cambia en cada reemplazo real.
      return `/${rutaBase}${ext}?v=${Math.round(stat.mtimeMs)}`;
    } catch {
      // No existe con esta extensión (o sin acceso al filesystem) --
      // seguimos probando el resto antes de rendirnos al placeholder.
    }
  }
  return null;
}
