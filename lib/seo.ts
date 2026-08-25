// Constantes SEO centralizadas -- un solo lugar para la URL del sitio y los
// datos de negocio reales que se reutilizan en metadata y datos
// estructurados (Organization, Product, Breadcrumb). Nunca inventar datos
// acá: solo lo que ya está publicado en el sitio (Footer/Contacto).

export const SITE_URL = "https://viverolascolonias.cl";
export const SITE_NAME = "Vivero Las Colonias";
export const SITE_EMAIL = "contacto@viverolascolonias.cl";
export const INSTAGRAM_URL = "https://instagram.com/viverolascoloniaschile";

/** Datos estructurados Article para una guía/artículo educativo. */
export function articleJsonLd({
  titulo,
  descripcion,
  slug,
  fechaPublicacion,
}: {
  titulo: string;
  descripcion: string;
  slug: string;
  fechaPublicacion: string; // YYYY-MM-DD
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: titulo,
    description: descripcion,
    url: `${SITE_URL}/guias/${slug}`,
    datePublished: fechaPublicacion,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
  };
}

/** Datos estructurados FAQPage -- usar solo con preguntas y respuestas
 * reales, nunca inventadas para rellenar. */
export function faqJsonLd(preguntas: { pregunta: string; respuesta: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: preguntas.map((p) => ({
      "@type": "Question",
      name: p.pregunta,
      acceptedAnswer: { "@type": "Answer", text: p.respuesta },
    })),
  };
}

/**
 * Datos estructurados Product (schema.org) para una ficha de producto.
 * Solo usa datos ya confirmados del producto -- sin rating ni reviews
 * inventados, porque no existen todavía.
 */
export function productoJsonLd({
  nombre,
  descripcion,
  slug,
  categoria,
  precio,
  disponible,
  imagenUrl,
}: {
  nombre: string;
  descripcion?: string;
  slug: string;
  categoria: string;
  precio: number | null;
  disponible: boolean;
  imagenUrl: string | null;
}) {
  const carpeta = categoria === "Rosal" ? "rosales" : "plantas";
  const url = `${SITE_URL}/${carpeta}/${slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: nombre,
    description: descripcion,
    url,
    ...(imagenUrl ? { image: `${SITE_URL}${imagenUrl}` } : {}),
    brand: { "@type": "Brand", name: SITE_NAME },
    ...(precio != null
      ? {
          offers: {
            "@type": "Offer",
            url,
            priceCurrency: "CLP",
            price: precio,
            availability: disponible ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          },
        }
      : {}),
  };
}
