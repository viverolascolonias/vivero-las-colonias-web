"use client";

import Link from "next/link";
import Container from "@/app/components/ui/Container";
import { Button, LinkButton } from "@/app/components/ui/Button";
import { useCarrito } from "@/app/components/carrito/CarritoContext";
import { formatCLP } from "@/lib/format";

export default function CarritoPage() {
  const { items, actualizarCantidad, quitarItem, totalEstimado } = useCarrito();

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

        <ul className="divide-y divide-[var(--color-border)] rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream-50)]">
          {items.map((item) => (
            <li key={item.productoId} className="flex items-center gap-4 p-5">
              <div className="min-w-0 flex-1">
                <p className="font-[var(--font-heading)] text-[var(--color-forest-dark)]">{item.nombre}</p>
                {item.subcategoria && (
                  <p className="text-xs text-[var(--color-ink-soft)]">{item.subcategoria}</p>
                )}
                <p className="mt-1 text-sm text-[var(--color-ink)]">
                  {item.precio != null ? formatCLP(item.precio) : "Consultar precio"}
                </p>
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
                  className="px-3 py-1.5 text-[var(--color-forest-dark)]"
                  onClick={() => actualizarCantidad(item.productoId, item.cantidad + 1)}
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
          ))}
        </ul>

        <div className="mt-8 flex items-center justify-between border-t border-[var(--color-border)] pt-6">
          <span className="text-[var(--color-ink-soft)]">Total estimado</span>
          <span className="text-2xl font-medium text-[var(--color-forest-dark)]">
            {formatCLP(totalEstimado)}
          </span>
        </div>

        <div className="mt-6 space-y-3">
          <Button disabled className="w-full cursor-not-allowed opacity-50">
            Ir a pagar (próximamente)
          </Button>
          <p className="text-center text-xs text-[var(--color-ink-soft)]">
            El pago en línea todavía no está disponible. Mientras tanto, puedes
            {" "}
            <Link href="/contacto" className="underline hover:text-[var(--color-forest)]">
              coordinar tu pedido por WhatsApp
            </Link>
            .
          </p>
        </div>
      </Container>
    </div>
  );
}
