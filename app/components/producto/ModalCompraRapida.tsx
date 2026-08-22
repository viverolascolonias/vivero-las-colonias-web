"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { formatCLP } from "@/lib/format";
import FotoProducto from "@/app/components/producto/FotoProducto";
import { useCompraRapida } from "./useCompraRapida";
import type { Producto } from "@/lib/types";

// Panel de compra rápida: se abre desde la tarjeta del catálogo para elegir
// cantidad y agregar al carrito sin tener que abrir la ficha del producto.
// `imagen` llega ya resuelta desde ProductoCard (que a su vez la recibió de
// GridProductos, el único punto que consulta el filesystem).
export default function ModalCompraRapida({
  producto,
  imagen,
  onClose,
}: {
  producto: Producto;
  imagen: string | null;
  onClose: () => void;
}) {
  const { cantidad, restar, sumar, agregado, agregar, stockMaximo, enMaximo } = useCompraRapida(producto, {
    sincronizarConCarrito: true,
  });

  useEffect(() => {
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previo;
    };
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!agregado) return;
    const t = setTimeout(onClose, 700);
    return () => clearTimeout(t);
  }, [agregado, onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[var(--color-ink)]/40 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Agregar ${producto.nombre} al carrito`}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-t-3xl bg-[var(--color-cream-50)] p-6 shadow-xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
              <FotoProducto producto={producto} imagen={imagen} sizes="64px" />
            </div>
            <div>
              {producto.subcategoria && (
                <p className="text-xs font-medium tracking-wide uppercase text-[var(--color-earth)]">
                  {producto.subcategoria}
                </p>
              )}
              <h3 className="font-[var(--font-heading)] text-lg text-[var(--color-forest-dark)]">
                {producto.nombre}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="shrink-0 rounded-full p-1.5 text-[var(--color-ink-soft)] transition-colors hover:bg-[var(--color-cream-200)]"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <p className="mt-4 text-sm text-[var(--color-ink-soft)]">
          {producto.precio != null ? `${formatCLP(producto.precio)} por unidad` : "Consultar precio"}
        </p>

        {producto.disponible ? (
          <>
            <div className="mt-5">
              <p className="mb-2 text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-ink-soft)]">
                Cantidad
              </p>
              <div className="inline-flex items-center rounded-full border border-[var(--color-border)]">
                <button
                  type="button"
                  className="px-4 py-2.5 text-[var(--color-forest-dark)]"
                  onClick={restar}
                  aria-label={`Restar cantidad de ${producto.nombre}`}
                >
                  −
                </button>
                <span className="min-w-10 text-center text-sm">{cantidad}</span>
                <button
                  type="button"
                  className="px-4 py-2.5 text-[var(--color-forest-dark)] disabled:opacity-40"
                  onClick={sumar}
                  disabled={enMaximo}
                  aria-label={`Sumar cantidad de ${producto.nombre}`}
                >
                  +
                </button>
              </div>
              {stockMaximo <= 5 && (
                <p className="mt-1.5 text-xs text-[var(--color-earth)]">
                  Quedan {stockMaximo} disponible{stockMaximo === 1 ? "" : "s"}.
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={agregar}
              className="mt-6 w-full rounded-full bg-[var(--color-forest)] py-3.5 text-sm font-medium tracking-wide text-[var(--color-cream-50)] transition-colors hover:bg-[var(--color-forest-dark)]"
            >
              {agregado ? "Agregado ✓" : "Agregar al carrito"}
            </button>
          </>
        ) : (
          <p className="mt-5 rounded-full border border-[var(--color-border)] py-3 text-center text-sm text-[var(--color-ink-soft)]">
            Sin stock por ahora
          </p>
        )}
      </div>
    </div>,
    document.body
  );
}
