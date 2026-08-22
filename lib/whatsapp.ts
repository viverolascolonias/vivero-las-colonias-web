// Número de WhatsApp del vivero, único en todo el proyecto. Antes estaba
// duplicado a mano en WhatsAppButton, ContactoForm, ContactoTeaser y
// Footer -- cualquier cambio de número exige tocar un solo lugar ahora.
export const WHATSAPP_NUMERO_VIVERO = "56923652575"; // +56 9 2365 2575

/** Link de wa.me con el texto ya codificado, listo para un <a href> o window.open. */
export function linkWhatsApp(mensaje: string): string {
  return `https://wa.me/${WHATSAPP_NUMERO_VIVERO}?text=${encodeURIComponent(mensaje)}`;
}

/** Abre WhatsApp (app o web) con el mensaje prellenado, en una pestaña nueva. */
export function abrirWhatsApp(mensaje: string): void {
  window.open(linkWhatsApp(mensaje), "_blank");
}
