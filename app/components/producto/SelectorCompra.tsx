"use client";

import { Button } from "@/app/components/ui/Button";
import { useCompraRapida } from "./useCompraRapida";
import type { Producto } from "@/lib/types";

// Selector de cantidad + agregar al carrito para la ficha de producto. La
// lógica de compra vive en useCompraRapida, compartida con el modal de
// compra rápida del catálogo.
export default function SelectorCompra({ producto }: { producto: Producto }) {
  const { cantidad, restar, sumar, agregado, agregar } = useCompraRapida(producto);

  if (!producto.disponible) {
    return (
      <Button variant="secondary" disabled className="w-full opacity-60 cursor-not-allowed">
        Sin stock por ahora
      </Button>
    );
  }

  return (
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
          className="px-3 py-2 text-[var(--color-forest-dark)]"
          onClick={sumar}
          aria-label={`Sumar cantidad de ${producto.nombre}`}
        >
          +
        </button>
      </div>
      <Button onClick={agregar} className="flex-1">
        {agregado ? "Agregado ✓" : "Agregar al carrito"}
      </Button>
    </div>
  );
}
