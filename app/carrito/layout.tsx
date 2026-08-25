import type { Metadata } from "next";

// El carrito es una página transaccional sin contenido propio que indexar
// (varía por visitante, vía localStorage) -- se excluye de Google acá y en
// robots.txt.
export const metadata: Metadata = {
  title: "Carrito",
  robots: { index: false, follow: true },
};

export default function CarritoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
