"use client";

// Carrito preparado a nivel de UI/estado únicamente. No hay checkout ni
// pago real todavía -- eso es una etapa posterior, explícitamente fuera de
// alcance por ahora. Persiste en localStorage solo para que la revisión
// visual se sienta completa (agregar, cambiar cantidad, quitar).

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type ItemCarrito = {
  productoId: string;
  slug: string;
  nombre: string;
  subcategoria: string | null;
  precio: number | null;
  cantidad: number;
};

type CarritoContextValue = {
  items: ItemCarrito[];
  agregarItem: (item: Omit<ItemCarrito, "cantidad">, cantidad?: number) => void;
  actualizarCantidad: (productoId: string, cantidad: number) => void;
  quitarItem: (productoId: string) => void;
  vaciar: () => void;
  cantidadTotal: number;
  totalEstimado: number;
};

const CarritoContext = createContext<CarritoContextValue | null>(null);

const STORAGE_KEY = "vlc-carrito";

export function CarritoProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ItemCarrito[]>([]);
  const [hidratado, setHidratado] = useState(false);

  useEffect(() => {
    try {
      const guardado = window.localStorage.getItem(STORAGE_KEY);
      if (guardado) setItems(JSON.parse(guardado));
    } catch {
      // localStorage no disponible o corrupto: seguimos con carrito vacío.
    }
    setHidratado(true);
  }, []);

  useEffect(() => {
    if (!hidratado) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hidratado]);

  function agregarItem(item: Omit<ItemCarrito, "cantidad">, cantidad = 1) {
    setItems((prev) => {
      const existe = prev.find((i) => i.productoId === item.productoId);
      if (existe) {
        return prev.map((i) =>
          i.productoId === item.productoId ? { ...i, cantidad: i.cantidad + cantidad } : i
        );
      }
      return [...prev, { ...item, cantidad }];
    });
  }

  function actualizarCantidad(productoId: string, cantidad: number) {
    setItems((prev) =>
      prev.map((i) => (i.productoId === productoId ? { ...i, cantidad: Math.max(1, cantidad) } : i))
    );
  }

  function quitarItem(productoId: string) {
    setItems((prev) => prev.filter((i) => i.productoId !== productoId));
  }

  function vaciar() {
    setItems([]);
  }

  const cantidadTotal = useMemo(() => items.reduce((acc, i) => acc + i.cantidad, 0), [items]);
  const totalEstimado = useMemo(
    () => items.reduce((acc, i) => acc + (i.precio ?? 0) * i.cantidad, 0),
    [items]
  );

  return (
    <CarritoContext.Provider
      value={{ items, agregarItem, actualizarCantidad, quitarItem, vaciar, cantidadTotal, totalEstimado }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  const ctx = useContext(CarritoContext);
  if (!ctx) throw new Error("useCarrito debe usarse dentro de <CarritoProvider>.");
  return ctx;
}
