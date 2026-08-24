import productosData from "@/data/productos.json";
import type { Producto, SubcategoriaRosal } from "@/lib/types";
import { SLUGS_AGOTADOS } from "@/lib/config";

// Capa de datos del catálogo. HOY lee data/productos.json (una fotografía
// de solo lectura del ERP, generada por scripts/sync-erp-catalog.mjs).
// MAÑANA, cuando exista la API del ERP, solo esta función cambia de
// implementación (fetch en vez de import) — ningún componente ni página
// que consuma getProductos()/getProductoBySlug() necesita modificarse.

const PRODUCTOS = productosData as Producto[];

export const SUBCATEGORIAS_ROSAL: SubcategoriaRosal[] = ["Arbustiva baja", "Trepadora", "Medio pie"];

// Fuente única para las categorías de Plantas: la usan tanto la página
// /plantas como la sección de inicio, para que nunca queden desalineadas.
export const CATEGORIAS_PLANTAS: {
  valor: Exclude<Producto["categoria"], "Rosal">;
  label: string;
  descripcion: string;
}[] = [
  {
    valor: "Ornamental",
    label: "Ornamentales",
    descripcion: "Follajes y flores para dar color y textura a cualquier rincón del jardín.",
  },
  {
    valor: "Arbol",
    label: "Árboles",
    descripcion: "Especies que dan estructura, sombra y carácter al paisaje.",
  },
  {
    valor: "Arbusto",
    label: "Arbustos",
    descripcion: "Formas y volúmenes que dan cuerpo y definen espacios en el jardín.",
  },
  {
    valor: "Interior",
    label: "Plantas de interior",
    descripcion: "Verde para living, oficinas y espacios cerrados, fácil de cuidar.",
  },
  {
    valor: "Otra",
    label: "Otras",
    descripcion: "Especies adicionales que vamos incorporando al catálogo.",
  },
];

// Aplica la lista manual de agotados (SLUGS_AGOTADOS) antes que nada más,
// independiente de LIMITAR_POR_STOCK/del stock sincronizado desde el ERP.
function conDisponibilidadManual(producto: Producto): Producto {
  if (!SLUGS_AGOTADOS.includes(producto.slug)) return producto;
  return { ...producto, disponible: false, stock: 0 };
}

function conContenidoGenerico(productoOriginal: Producto): Producto {
  const producto = conDisponibilidadManual(productoOriginal);
  if (producto.categoria !== "Rosal") return producto;
  return {
    ...producto,
    descripcion:
      producto.descripcion ??
      `${producto.nombre} es una variedad de rosal cultivada por Vivero Las Colonias, ` +
        `seleccionada por su carácter y presencia en jardín. Descripción detallada disponible próximamente.`,
    caracteristicas: producto.caracteristicas ?? [
      producto.subcategoria ? `Hábito: ${producto.subcategoria}` : "Rosal",
      "Cultivado en Vivero Las Colonias",
    ],
    cuidados: producto.cuidados ?? [
      "Sol directo al menos 6 horas al día",
      "Riego regular, evitando encharcar el sustrato",
      "Poda de mantención a fines de invierno",
      "Fertilización orgánica en primavera",
    ],
  };
}

export function getProductos(): Producto[] {
  return PRODUCTOS.map(conContenidoGenerico);
}

export function getProductoBySlug(slug: string): Producto | undefined {
  const producto = PRODUCTOS.find((p) => p.slug === slug);
  return producto ? conContenidoGenerico(producto) : undefined;
}

export function getRosales(subcategoria?: SubcategoriaRosal): Producto[] {
  return getProductos().filter(
    (p) => p.categoria === "Rosal" && (!subcategoria || p.subcategoria === subcategoria)
  );
}

export function getRosalesDestacados(cantidad = 4): Producto[] {
  return getRosales().slice(0, cantidad);
}

export function getPlantas(categoria?: Exclude<Producto["categoria"], "Rosal">): Producto[] {
  return getProductos().filter((p) => p.categoria !== "Rosal" && (!categoria || p.categoria === categoria));
}
