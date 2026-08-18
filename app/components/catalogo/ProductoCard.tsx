"use client";

import { useState } from "react";
import Link from "next/link";
import type { Producto } from "@/lib/types";
import { formatCLP } from "@/lib/format";
import Badge from "@/app/components/ui/Badge";
import ModalCompraRapida from "@/app/components/producto/ModalCompraRapida";
import FotoProducto from "@/app/components/producto/FotoProducto";
import PieVariedadRosal from "./PieVariedadRosal";

// `imagen` llega ya resuelta desde GridProductos (Server Component, el
// único lugar que puede consultar el filesystem) -- este componente es
// "use client" y solo decide qué renderizar según ese valor.
export default function ProductoCard({ producto, imagen }: { producto: Producto; imagen: string | null }) {
  const href = producto.categoria === "Rosal" ? `/rosales/${producto.slug}` : `/plantas/${producto.slug}`;
  const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <div className="group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream-50)] transition-shadow hover:shadow-lg hover:shadow-[var(--color-forest)]/10">
      <div className="relative">
        <Link href={href} className="block" aria-label={`Ver ${producto.nombre}`}>
          <div className="relative aspect-square w-full overflow-hidden">
            <FotoProducto
              producto={producto}
              imagen={imagen}
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              hoverZoom
            />
          </div>
        </Link>

        <button
          type="button"
          onClick={() => setModalAbierto(true)}
          disabled={!producto.disponible}
          aria-label={producto.disponible ? `Agregar ${producto.nombre} al carrito` : "Sin stock"}
          className={`absolute bottom-3 right-3 z-10 flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-cream-50)] text-[var(--color-forest-dark)] shadow-md transition-colors ${
            producto.disponible ? "hover:bg-[var(--color-cream-200)]" : "cursor-not-allowed opacity-50"
          }`}
        >
          <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path
              d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L20 8H6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="10" cy="21" r="1.2" />
            <circle cx="17" cy="21" r="1.2" />
          </svg>
        </button>
      </div>

      <Link href={href} className="block p-5">
        <div className="mb-2 flex items-center justify-between gap-2">
          {producto.subcategoria && <Badge tone="sage">{producto.subcategoria}</Badge>}
          {!producto.disponible && (
            <Badge tone="outline" className="normal-case">
              Sin stock
            </Badge>
          )}
        </div>
        <h3 className="font-[var(--font-heading)] text-lg text-[var(--color-forest-dark)] transition-colors group-hover:text-[var(--color-forest)]">
          {producto.nombre}
        </h3>
        <PieVariedadRosal producto={producto} />
        <p className="mt-2 text-sm text-[var(--color-ink)]">
          {producto.precio != null ? formatCLP(producto.precio) : "Consultar precio"}
        </p>
      </Link>

      {modalAbierto && (
        <ModalCompraRapida producto={producto} imagen={imagen} onClose={() => setModalAbierto(false)} />
      )}
    </div>
  );
}
