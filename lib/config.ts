/**
 * Activa el límite real de stock en el catálogo y el carrito. Hoy está en
 * `false` porque el ERP todavía no tiene cargadas las cantidades reales de
 * plantas/rosales -- toda la estructura ya existe (Producto.stock,
 * escalasPrecio, el tope de cantidad del carrito, el mensaje "Quedan N
 * disponibles") y sigue viva, simplemente no se aplica todavía.
 *
 * Cuando el ERP tenga stock real cargado (ver "Cargar stock real" en
 * /rosales del ERP), activar acá pasando esto a `true` -- eso alcanza para
 * que el catálogo, el carrito y el checkout empiecen a respetar el stock
 * real sin tocar ningún otro archivo.
 *
 * IMPORTANTE: existe un valor gemelo en scripts/sync-erp-catalog.mjs (no
 * puede importar este archivo TypeScript directamente al ser un script
 * Node plano) -- mantenerlos sincronizados.
 */
export const LIMITAR_POR_STOCK = false;

/**
 * Variedades marcadas manualmente como agotadas, independiente del stock
 * real del ERP (que hoy no está cargado del todo -- ver LIMITAR_POR_STOCK
 * arriba). Se aplica en lib/productos.ts, así que sobrevive a la próxima
 * corrida de `npm run sync-erp` en vez de perderse.
 *
 * Usa el `slug` del producto (visible en la URL, ej. "/rosales/<slug>").
 * Para volver a poner una variedad disponible, sacarla de esta lista.
 */
export const SLUGS_AGOTADOS: string[] = [
  "clavel-arbustiva-baja",
  "payaso-arbustiva-baja",
  "diva-de-divas-arbustiva-baja",
  "fire-arbustiva-baja",
];
