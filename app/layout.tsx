import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { CarritoProvider } from "./components/carrito/CarritoContext";

const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Vivero Las Colonias — Rosales, plantas y paisajismo",
  description:
    "Vivero especializado en rosales y variedades poco comunes. Plantas ornamentales, árboles y servicios de paisajismo con asesoría personalizada.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${fraunces.variable} ${inter.variable} antialiased`}>
        <CarritoProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CarritoProvider>
      </body>
    </html>
  );
}
