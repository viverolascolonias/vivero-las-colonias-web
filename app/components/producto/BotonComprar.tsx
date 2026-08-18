import SelectorCompra from "./SelectorCompra";
import type { Producto } from "@/lib/types";

// La lógica de cantidad + agregar al carrito vive en SelectorCompra, para
// que la ficha de producto y las tarjetas de catálogo la compartan.
export default function BotonComprar({ producto }: { producto: Producto }) {
  return <SelectorCompra producto={producto} />;
}
