// Estos tipos reflejan intencionalmente el modelo Producto del ERP
// (categoria, subcategoria, precio) para que el día que la fuente de datos
// pase de data/productos.json a la API del ERP, ningún componente visual
// necesite cambiar de forma.

// "Interior" (Plantas de interior) todavía no existe como categoría en el
// ERP -- se agrega aquí solo para poder darle protagonismo en la web desde
// ya. Cuando se cataloguen plantas de interior reales en el ERP, agregar
// "Interior" a su enum de categorías para que el export deje de omitirlas.
export type CategoriaProducto = "Rosal" | "Ornamental" | "Arbol" | "Arbusto" | "Interior" | "Otra";

export type SubcategoriaRosal = "Arbustiva baja" | "Trepadora" | "Medio pie";

export type TipoFloracion = "Botonera" | "Floribunda" | "Grandiflora";

/** Un tramo de precio por cantidad, ej. "+50 unidades = $4.200" — viene tal
 * cual de PrecioPorCantidad en el ERP vía `npm run sync-erp`. */
export type EscalaPrecio = { cantidadMinima: number; precio: number };

export type Producto = {
  /** Mismo id que en el ERP (Producto.id) — clave para el futuro cruce de datos. */
  id: string;
  /** Identificador único y legible en URL, derivado de nombre + subcategoría. */
  slug: string;
  nombre: string;
  categoria: CategoriaProducto;
  subcategoria: SubcategoriaRosal | string | null;
  /** null = "Consultar precio" (todavía no tiene precio público definido en el ERP). */
  precio: number | null;
  /** Tramos de precio por cantidad configurados en el ERP (PrecioPorCantidad).
   * Vacío si el ERP no tiene tramos cargados para este producto todavía. */
  escalasPrecio: EscalaPrecio[];
  /** Stock real (Producto.stockActual en el ERP) al momento de la última
   * sincronización — no es en vivo, se actualiza cada vez que se sincroniza
   * el catálogo desde el ERP. */
  stock: number;
  /** Derivado de `stock > 0` en la sincronización — ya no es un mock. */
  disponible: boolean;
  /** Ruta de imagen; null muestra el placeholder botánico de marca. */
  imagen: string | null;
  /**
   * Ficha botánica (solo Rosal): viene de VariedadRosal en el ERP vía
   * `npm run sync-erp` -- nunca se completa a mano en la web. null/undefined
   * = todavía no confirmado en el ERP, no mostrar nada inventado.
   */
  tipoFloracion?: TipoFloracion | null;
  color?: string | null;
  aromatica?: boolean | null;
  descripcion?: string;
  caracteristicas?: string[];
  cuidados?: string[];
};
