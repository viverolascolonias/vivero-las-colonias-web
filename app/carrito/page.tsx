"use client";

import { useEffect, useState } from "react";
import Container from "@/app/components/ui/Container";
import { Button, LinkButton } from "@/app/components/ui/Button";
import { useCarrito } from "@/app/components/carrito/CarritoContext";
import DatosClienteForm from "@/app/components/carrito/DatosClienteForm";
import { formatCLP } from "@/lib/format";
import { LIMITAR_POR_STOCK } from "@/lib/config";
import { resolverPrecioUnitario } from "@/lib/precios";
import { abrirWhatsApp } from "@/lib/whatsapp";
import {
  construirMensajeWhatsApp,
  generarReferenciaPedido,
  leerDatosClienteGuardados,
  type DatosClienteWeb,
} from "@/lib/pedidoWeb";

type Paso = "carrito" | "datos" | "confirmado";

export default function CarritoPage() {
  const { items, actualizarCantidad, quitarItem, totalEstimado, vaciar } = useCarrito();
  const [paso, setPaso] = useState<Paso>("carrito");
  const [datosGuardados, setDatosGuardados] = useState<DatosClienteWeb | null>(null);
  const [referencia, setReferencia] = useState<string | null>(null);

  useEffect(() => {
    setDatosGuardados(leerDatosClienteGuardados());
  }, []);

  function enviarPedido(datos: DatosClienteWeb) {
    const ref = generarReferenciaPedido();
    const mensaje = construirMensajeWhatsApp(items, datos, ref);
    abrirWhatsApp(mensaje);
    setReferencia(ref);
    setPaso("confirmado");
    vaciar();
  }

  if (paso === "confirmado") {
    return (
      <Container className="py-24 text-center">
        <h1 className="text-3xl font-medium text-[var(--color-forest-dark)]">
          Tu pedido fue enviado por WhatsApp
        </h1>
        <p className="mx-auto mt-3 max-w-md text-[var(--color-ink-soft)]">
          Referencia <span className="font-medium text-[var(--color-forest-dark)]">#{referencia}</span>. En
          breve te contactaremos para confirmar disponibilidad, precio final y forma de despacho. Este
          mensaje todavía no es una compra confirmada.
        </p>
        <LinkButton href="/rosales" className="mt-8">
          Seguir viendo rosales
        </LinkButton>
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container className="py-24 text-center">
        <h1 className="text-3xl font-medium text-[var(--color-forest-dark)]">Tu carrito está vacío</h1>
        <p className="mt-3 text-[var(--color-ink-soft)]">Aún no has agregado rosales ni plantas.</p>
        <LinkButton href="/rosales" className="mt-8">
          Ver rosales
        </LinkButton>
      </Container>
    );
  }

  return (
    <div className="py-16 md:py-20">
      <Container className="max-w-3xl">
        <h1 className="mb-8 text-3xl font-medium text-[var(--color-forest-dark)]">Tu carrito</h1>

        {paso === "carrito" && (
          <>
            <ul className="divide-y divide-[var(--color-border)] rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream-50)]">
              {items.map((item) => {
                const enMaximo = LIMITAR_POR_STOCK && item.cantidad >= item.stock;
                const { precio: precioUnitario, tramo } = resolverPrecioUnitario(item, item.cantidad);
                return (
                  <li key={item.productoId} className="flex items-center gap-4 p-5">
                    <div className="min-w-0 flex-1">
                      <p className="font-[var(--font-heading)] text-[var(--color-forest-dark)]">
                        {item.nombre}
                      </p>
                      {item.subcategoria && (
                        <p className="text-xs text-[var(--color-ink-soft)]">{item.subcategoria}</p>
                      )}
                      <p className="mt-1 text-sm text-[var(--color-ink)]">
                        {precioUnitario != null ? `${formatCLP(precioUnitario)} c/u` : "Consultar precio"}
                        {tramo && (
                          <span className="ml-2 inline-flex items-center rounded-full bg-[var(--color-cream-200)] px-2 py-0.5 text-xs font-medium text-[var(--color-forest-dark)]">
                            {tramo}
                          </span>
                        )}
                      </p>
                      {precioUnitario != null && (
                        <p className="mt-0.5 text-xs text-[var(--color-ink-soft)]">
                          Subtotal: {formatCLP(precioUnitario * item.cantidad)}
                        </p>
                      )}
                      {LIMITAR_POR_STOCK && item.stock <= 5 && (
                        <p className="mt-0.5 text-xs text-[var(--color-earth)]">
                          Quedan {item.stock} disponible{item.stock === 1 ? "" : "s"}.
                        </p>
                      )}
                    </div>

                    <div className="flex items-center rounded-full border border-[var(--color-border)]">
                      <button
                        type="button"
                        className="px-3 py-1.5 text-[var(--color-forest-dark)]"
                        onClick={() => actualizarCantidad(item.productoId, item.cantidad - 1)}
                        aria-label="Restar cantidad"
                      >
                        −
                      </button>
                      <span className="min-w-6 text-center text-sm">{item.cantidad}</span>
                      <button
                        type="button"
                        className="px-3 py-1.5 text-[var(--color-forest-dark)] disabled:opacity-40"
                        onClick={() => actualizarCantidad(item.productoId, item.cantidad + 1)}
                        disabled={enMaximo}
                        aria-label="Sumar cantidad"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => quitarItem(item.productoId)}
                      className="text-sm text-[var(--color-earth)] hover:underline"
                    >
                      Quitar
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex items-center justify-between border-t border-[var(--color-border)] pt-6">
              <span className="text-[var(--color-ink-soft)]">Total estimado</span>
              <span className="text-2xl font-medium text-[var(--color-forest-dark)]">
                {formatCLP(totalEstimado)}
              </span>
            </div>

            <div className="mt-6 space-y-3">
              <Button onClick={() => setPaso("datos")} className="w-full">
                Enviar pedido por WhatsApp
              </Button>
              <p className="text-center text-xs text-[var(--color-ink-soft)]">
                No hay pago en línea. Completas tus datos de entrega y te contactamos por WhatsApp para
                confirmar tu pedido.
              </p>
            </div>
          </>
        )}

        {paso === "datos" && (
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream-50)] p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-[var(--font-heading)] text-xl text-[var(--color-forest-dark)]">
                Tus datos
              </h2>
              <button
                type="button"
                onClick={() => setPaso("carrito")}
                className="text-sm text-[var(--color-ink-soft)] hover:underline"
              >
                Volver al carrito
              </button>
            </div>
            <DatosClienteForm valorInicial={datosGuardados} onCompletado={enviarPedido} />
          </div>
        )}
      </Container>
    </div>
  );
}
