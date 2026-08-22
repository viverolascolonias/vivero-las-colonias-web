"use client";

import { Button } from "@/app/components/ui/Button";
import { formatCLP } from "@/lib/format";
import { useCompraRapida } from "./useCompraRapida";
import type { Producto } from "@/lib/types";

// Selector de cantidad + agregar al carrito para la ficha de producto. La
// lógica de compra vive en useCompraRapida, compartida con el modal de
// compra rápida del catálogo.
export default function SelectorCompra({ producto }: { producto: Producto }) {
  const { cantidad, restar, sumar, agregado, agregar, stockMaximo, enMaximo, precioUnitario, tramo } =
    useCompraRapida(producto);

  if (!producto.disponible) {
    return (
      <Button variant="secondary" disabled className="w-full opacity-60 cursor-not-allowed">
        Sin stock por ahora
      </Button>
    );
  }

  return (
    <div>
      {precioUnitario != null && (
        <p className="mb-2 text-sm text-[var(--color-ink)]">
          {formatCLP(precioUnitario)} c/u
          {tramo && (
            <span className="ml-2 inline-flex items-center rounded-full bg-[var(--color-cream-200)] px-2 py-0.5 text-xs font-medium text-[var(--color-forest-dark)]">
              {tramo}
            </span>
          )}
        </p>
      )}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center rounded-full border border-[var(--color-border)]">
          <button
            type="button"
            className="px-3 py-2 text-[var(--color-forest-dark)]"
            onClick={restar}
            aria-label={`Restar cantidad de ${producto.nombre}`}
          >
            −
          </button>
          <span className="min-w-6 text-center text-sm">{cantidad}</span>
          <button
            type="button"
            className="px-3 py-2 text-[var(--color-forest-dark)] disabled:opacity-40"
            onClick={sumar}
            disabled={enMaximo}
            aria-label={`Sumar cantidad de ${producto.nombre}`}
          >
            +
          </button>
        </div>
        <Button onClick={agregar} className="flex-1">
          {agregado ? "Agregado ✓" : "Agregar al carrito"}
        </Button>
      </div>
      {stockMaximo <= 5 && (
        <p className="mt-1.5 text-xs text-[var(--color-earth)]">
          Quedan {stockMaximo} disponible{stockMaximo === 1 ? "" : "s"}.
        </p>
      )}
    </div>
  );
}
