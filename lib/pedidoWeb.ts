import { formatCLP } from "@/lib/format";
import type { ItemCarrito } from "@/app/components/carrito/CarritoContext";

export type TipoEntregaWeb = "despacho" | "retiro" | "transporte";

export const LABEL_TIPO_ENTREGA: Record<TipoEntregaWeb, string> = {
  despacho: "Despacho a domicilio",
  retiro: "Retiro en el vivero",
  transporte: "Envío por empresa de transporte",
};

export type DatosClienteWeb = {
  nombre: string;
  telefono: string;
  email: string;
  region: string;
  comuna: string;
  tipoEntrega: TipoEntregaWeb;
  /** Solo si tipoEntrega es "despacho". */
  direccion?: string;
  /** Solo si tipoEntrega es "transporte". */
  empresaTransporte?: string;
  /** Sucursal de retiro (tipoEntrega "retiro") o de destino (tipoEntrega "transporte"). */
  sucursal?: string;
};

const STORAGE_KEY_DATOS_CLIENTE = "vlc-datos-cliente";

/** Recuerda los datos de contacto/entrega en este navegador para no
 * pedirlos de nuevo en la próxima visita — mismo patrón que ya usa el
 * carrito (localStorage, sin backend). */
export function guardarDatosCliente(datos: DatosClienteWeb): void {
  try {
    window.localStorage.setItem(STORAGE_KEY_DATOS_CLIENTE, JSON.stringify(datos));
  } catch {
    // localStorage no disponible: no es crítico, simplemente no se recuerda.
  }
}

export function leerDatosClienteGuardados(): DatosClienteWeb | null {
  try {
    const guardado = window.localStorage.getItem(STORAGE_KEY_DATOS_CLIENTE);
    return guardado ? (JSON.parse(guardado) as DatosClienteWeb) : null;
  } catch {
    return null;
  }
}

/**
 * Código de referencia legible (ej. "VL-260822-1830-K7") para que el
 * cliente y el personal del vivero puedan ubicar este pedido en la
 * conversación de WhatsApp. NO es el número oficial de Pedido del ERP —
 * ese lo asigna crearPedido() recién cuando el personal lo registra ahí.
 */
export function generarReferenciaPedido(): string {
  const ahora = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const fecha = `${pad(ahora.getFullYear() % 100)}${pad(ahora.getMonth() + 1)}${pad(ahora.getDate())}`;
  const hora = `${pad(ahora.getHours())}${pad(ahora.getMinutes())}`;
  const sufijo = Math.random().toString(36).slice(2, 4).toUpperCase();
  return `VL-${fecha}-${hora}-${sufijo}`;
}

function lineaPrecio(item: ItemCarrito): string {
  if (item.precio == null) return `${item.cantidad} x A confirmar`;
  return `${item.cantidad} x ${formatCLP(item.precio)} = ${formatCLP(item.precio * item.cantidad)}`;
}

/** Arma el texto del pedido para enviar por WhatsApp — el cliente nunca
 * tiene que escribirlo a mano. Deja explícito que el total es estimado y
 * que el pedido queda pendiente de confirmación del vivero. */
export function construirMensajeWhatsApp(
  items: ItemCarrito[],
  datos: DatosClienteWeb,
  referencia: string
): string {
  const totalEstimado = items.reduce((acc, i) => acc + (i.precio ?? 0) * i.cantidad, 0);
  const hayPreciosPorConfirmar = items.some((i) => i.precio == null);

  const lineasProductos = items
    .map((i) => `🌹 ${i.nombre}${i.subcategoria ? ` (${i.subcategoria})` : ""} — ${lineaPrecio(i)}`)
    .join("\n");

  const lineasEntrega = [`Tipo: ${LABEL_TIPO_ENTREGA[datos.tipoEntrega]}`];
  if (datos.tipoEntrega === "despacho" && datos.direccion) {
    lineasEntrega.push(`Dirección: ${datos.direccion}`);
  }
  if (datos.tipoEntrega === "transporte") {
    if (datos.empresaTransporte) lineasEntrega.push(`Empresa de transporte: ${datos.empresaTransporte}`);
    if (datos.sucursal) lineasEntrega.push(`Sucursal de destino: ${datos.sucursal}`);
  }
  if (datos.tipoEntrega === "retiro" && datos.sucursal) {
    lineasEntrega.push(`Sucursal de retiro: ${datos.sucursal}`);
  }

  return [
    `🌹 *Nuevo pedido — Vivero Las Colonias* 🌹`,
    `Referencia: #${referencia}`,
    ``,
    `*Datos del cliente*`,
    `Nombre: ${datos.nombre}`,
    `Teléfono: ${datos.telefono}`,
    datos.email ? `Email: ${datos.email}` : null,
    `Región: ${datos.region}`,
    `Comuna: ${datos.comuna}`,
    ``,
    `*Entrega*`,
    ...lineasEntrega,
    ``,
    `*Pedido*`,
    lineasProductos,
    ``,
    `*Total estimado: ${formatCLP(totalEstimado)}*`,
    ``,
    `⚠️ Este es un pedido preliminar${hayPreciosPorConfirmar ? ", con precios por confirmar" : ""}. El total, el stock disponible y la forma de despacho quedan sujetos a confirmación del vivero. Nos pondremos en contacto a la brevedad para confirmar tu pedido — este mensaje no constituye una compra confirmada.`,
  ]
    .filter((linea) => linea !== null)
    .join("\n");
}
