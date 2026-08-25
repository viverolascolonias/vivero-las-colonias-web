import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { CarritoProvider } from "./components/carrito/CarritoContext";
import { SITE_URL, SITE_NAME, SITE_EMAIL, INSTAGRAM_URL } from "@/lib/seo";
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

const TITULO_SITIO = "Vivero Las Colonias — Rosales en Chile";
const DESCRIPCION_SITIO =
  "Vivero especializado en rosales: arbustivos, trepadores y medio pie, más de 40 variedades. Plantas ornamentales, árboles y paisajismo, con despacho en Chile.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITULO_SITIO, template: `%s — ${SITE_NAME}` },
  description: DESCRIPCION_SITIO,
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: SITE_NAME,
    title: TITULO_SITIO,
    description: DESCRIPCION_SITIO,
    url: SITE_URL,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizacionJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo-vivero-las-colonias-verde.png`,
    email: SITE_EMAIL,
    sameAs: [INSTAGRAM_URL],
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizacionJsonLd) }}
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
