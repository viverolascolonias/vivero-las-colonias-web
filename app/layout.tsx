import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { CarritoProvider } from "./components/carrito/CarritoContext";
import {
  SITE_URL,
  SITE_NAME,
  SITE_EMAIL,
  INSTAGRAM_URL,
  SITE_ADDRESS,
  HORARIO_CONTACTO,
  NOTA_ATENCION_PRESENCIAL,
} from "@/lib/seo";
import { WHATSAPP_NUMERO_VIVERO } from "@/lib/whatsapp";

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

const TITULO_SITIO = "Vivero Las Colonias | Rosales y plantas ornamentales en Chile";
const DESCRIPCION_SITIO =
  "Vivero especializado en rosales: arbustivos, trepadores y medio pie, más de 40 variedades. Plantas ornamentales, árboles y paisajismo, con despacho en Chile.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITULO_SITIO, template: `%s — ${SITE_NAME}` },
  description: DESCRIPCION_SITIO,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: SITE_NAME,
    title: TITULO_SITIO,
    description: DESCRIPCION_SITIO,
    url: SITE_URL,
    // Foto real del vivero (recorte apaisado de public/images/hero-inicio.jpg,
    // el mismo hero de portada) -- imagen por defecto para cualquier página
    // que no defina la suya propia al compartir en WhatsApp/redes.
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rosales en flor cultivados por Vivero Las Colonias",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Establecimiento híbrido, confirmado por el negocio: atención
  // presencial en la dirección real de abajo, más despacho a otras
  // regiones de Chile (areaServed). GardenStore es el tipo más específico
  // de schema.org para un vivero -- ya incluye todas las propiedades de
  // LocalBusiness/Organization, así que reemplaza el bloque Organization
  // genérico que había antes en vez de convivir con él.
  //
  // Deliberadamente NO se declara openingHoursSpecification: el negocio
  // trabaja directamente en el vivero y la visita presencial siempre
  // requiere coordinación previa, así que publicar un horario de "local
  // abierto" haría creer que se puede llegar sin avisar. El horario real
  // (de contacto/comunicación) y la aclaración de cita previa quedan en
  // `description`, que sí es un campo de texto libre.
  const negocioJsonLd = {
    "@context": "https://schema.org",
    "@type": "GardenStore",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo-vivero-las-colonias-verde.png`,
    email: SITE_EMAIL,
    description: `${NOTA_ATENCION_PRESENCIAL} Horario de contacto: ${HORARIO_CONTACTO}.`,
    sameAs: [INSTAGRAM_URL],
    address: {
      "@type": "PostalAddress",
      ...SITE_ADDRESS,
    },
    areaServed: "CL",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+${WHATSAPP_NUMERO_VIVERO}`,
      contactType: "customer service",
      areaServed: "CL",
      availableLanguage: "Spanish",
    },
  };

  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(negocioJsonLd) }}
        />
      </head>
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
