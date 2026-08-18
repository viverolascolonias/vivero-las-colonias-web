"use client";

import { useState } from "react";
import { useCarrito } from "@/app/components/carrito/CarritoContext";
import type { Producto } from "@/lib/types";

// Estado y lógica de compra (cantidad + agregar al carrito) compartidos
// entre el selector de la ficha de producto y el modal de compra rápida del
// catálogo, para no duplicar la integración con el carrito.
//
// `sincronizarConCarrito` (usado por el modal de compra rápida) hace que la
// cantidad inicial refleje lo que ya existe en el carrito para ese producto
// -- y que "agregar" fije esa cantidad exacta en vez de sumarla a lo
// existente. La ficha de producto no la usa: siempre parte en 1 y suma
// unidades al carrito, igual que antes.
export function useCompraRapida(producto: Producto, options?: { sincronizarConCarrito?: boolean }) {
  const { items, agregarItem, actualizarCantidad } = useCarrito();
  const sincronizar = options?.sincronizarConCarrito ?? false;
  const itemEnCarrito = items.find((i) => i.productoId === producto.id);

  const [cantidad, setCantidad] = useState(sincronizar ? (itemEnCarrito?.cantidad ?? 1) : 1);
  const [agregado, setAgregado] = useState(false);

  function restar() {
    setCantidad((c) => Math.max(1, c - 1));
  }

  function sumar() {
    setCantidad((c) => c + 1);
  }

  function agregar() {
    if (sincronizar && itemEnCarrito) {
      actualizarCantidad(producto.id, cantidad);
    } else {
      agregarItem(
        {
          productoId: producto.id,
          slug: producto.slug,
          nombre: producto.nombre,
          subcategoria: producto.subcategoria,
          precio: producto.precio,
        },
        cantidad
      );
    }
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2000);
  }

  return { cantidad, restar, sumar, agregado, agregar };
}
