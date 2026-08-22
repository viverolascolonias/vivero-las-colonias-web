// Tarifas públicas de rosales, tal como las definió el vivero. NO se
// derivan de Producto.precioVenta del ERP para estas 3 subcategorías --
// son precios propios de cada una, fijados explícitamente. No modificar
// estos valores sin confirmación directa del vivero.
//
// - Arbustiva baja: por tramo de cantidad (aplica al pedido completo, no
//   por unidad marginal): 1-49 → $5.000, 50-99 → $4.200, 100+ → $3.800.
// - Medio pie: $8.500 fijo, sin tramos.
// - Trepadora: $12.000 fijo, sin tramos.
//
// Cualquier otra categoría/subcategoría (Ornamental, Arbol, Arbusto,
// Interior, Otra) sigue usando el precio plano que ya trae desde el ERP
// (Producto.precioVenta vía sync-erp) -- esta tabla no las toca.

const TRAMOS_ARBUSTIVA_BAJA = [
  { cantidadMinima: 100, precio: 3800 },
  { cantidadMinima: 50, precio: 4200 },
  { cantidadMinima: 1, precio: 5000 },
] as const;

const PRECIO_MEDIO_PIE = 8500;
const PRECIO_TREPADORA = 12000;

export type ProductoParaPrecio = {
  subcategoria: string | null;
  /** Precio plano tal como viene del ERP -- se usa como está para
   * cualquier subcategoría fuera de las 3 con tarifa propia. */
  precio: number | null;
};

/** Nombre del tramo aplicado, solo informativo (ej. para mostrar "Mayorista
 * +50" junto al precio) -- null cuando no aplica tramo (precio fijo o plano). */
export type PrecioResuelto = { precio: number | null; tramo: string | null };

export function resolverPrecioUnitario(producto: ProductoParaPrecio, cantidad: number): PrecioResuelto {
  if (producto.subcategoria === "Arbustiva baja") {
    const tramo = TRAMOS_ARBUSTIVA_BAJA.find((t) => cantidad >= t.cantidadMinima)!;
    return {
      precio: tramo.precio,
      tramo: tramo.cantidadMinima >= 100 ? "Mayorista +100" : tramo.cantidadMinima >= 50 ? "Mayorista +50" : null,
    };
  }
  if (producto.subcategoria === "Medio pie") {
    return { precio: PRECIO_MEDIO_PIE, tramo: null };
  }
  if (producto.subcategoria === "Trepadora") {
    return { precio: PRECIO_TREPADORA, tramo: null };
  }
  return { precio: producto.precio, tramo: null };
}

/** Precio base (1 unidad) de una subcategoría con tarifa propia -- usado
 * para el precio "de partida" que se muestra en catálogo y ficha, donde
 * todavía no hay una cantidad elegida. */
export function precioBase(producto: ProductoParaPrecio): number | null {
  return resolverPrecioUnitario(producto, 1).precio;
}
