// Constantes SEO centralizadas -- un solo lugar para la URL del sitio y los
// datos de negocio reales que se reutilizan en metadata y datos
// estructurados (Organization, Product, Breadcrumb). Nunca inventar datos
// acá: solo lo que ya está publicado en el sitio (Footer/Contacto).

export const SITE_URL = "https://viverolascolonias.cl";
export const SITE_NAME = "Vivero Las Colonias";
export const SITE_EMAIL = "contacto@viverolascolonias.cl";
export const INSTAGRAM_URL = "https://instagram.com/viverolascoloniaschile";

/**
 * Dirección real del vivero, confirmada explícitamente por el negocio
 * (establecimiento híbrido: atención presencial en esta dirección +
 * despacho a otras regiones). No modificar sin una nueva confirmación
 * igual de explícita -- se usa tal cual en LocalBusiness y en /contacto.
 */
export const SITE_ADDRESS = {
  streetAddress: "Pedro Aguirre Cerda, Las Colonias de Paine, Parcela 17",
  addressLocality: "Paine",
  addressRegion: "Región Metropolitana",
  addressCountry: "CL",
};

/**
 * Horario general de contacto/comunicación (WhatsApp, correo, etc.), no de
 * atención presencial sin aviso -- confirmado explícitamente por el negocio.
 * La visita presencial al vivero siempre requiere coordinación previa
 * (trabajan directamente en el vivero y pueden no estar disponibles), por
 * eso nunca se publica como "horario de local abierto" en el schema.
 */
export const HORARIO_CONTACTO = "Lunes a sábado, 09:00 a 18:00 hrs";

export const NOTA_ATENCION_PRESENCIAL =
  "La atención presencial en el vivero es siempre con cita previa: contáctanos antes de venir para coordinar un horario y asegurarte de que estaremos disponibles.";

/**
 * Recorta un texto a un largo apto para meta description (Google corta
 * alrededor de 155-160 caracteres) sin cortar la oración a la mitad --
 * usa el mismo texto real de la ficha, solo ajustado al límite técnico
 * de la etiqueta, nunca reescrito ni inventado.
 */
export function truncarMetaDescription(texto: string, maxLen = 155): string {
  if (texto.length <= maxLen) return texto;
  const cortado = texto.slice(0, maxLen);
  const ultimoPunto = cortado.lastIndexOf(". ");
  if (ultimoPunto > maxLen * 0.5) return cortado.slice(0, ultimoPunto + 1);
  const ultimoEspacio = cortado.lastIndexOf(" ");
  return `${cortado.slice(0, ultimoEspacio > 0 ? ultimoEspacio : maxLen)}…`;
}

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
 * inventados, porque no existen todavía. `tipoFloracion`/`color`/`aromatica`
 * son la misma ficha botánica que ya se muestra en pantalla (ver
 * FichaBotanica en FichaProducto.tsx) -- acá solo se refleja como
 * `additionalProperty`, nunca se agrega un dato nuevo.
 */
export function productoJsonLd({
  nombre,
  descripcion,
  slug,
  categoria,
  subcategoria,
  precio,
  disponible,
  imagenUrl,
  tipoFloracion,
  color,
  aromatica,
}: {
  nombre: string;
  descripcion?: string;
  slug: string;
  categoria: string;
  subcategoria?: string | null;
  precio: number | null;
  disponible: boolean;
  imagenUrl: string | null;
  tipoFloracion?: string | null;
  color?: string | null;
  aromatica?: boolean | null;
}) {
  const carpeta = categoria === "Rosal" ? "rosales" : "plantas";
  const url = `${SITE_URL}/${carpeta}/${slug}`;

  const additionalProperty = [
    tipoFloracion ? { "@type": "PropertyValue", name: "Tipo de floración", value: tipoFloracion } : null,
    color ? { "@type": "PropertyValue", name: "Color", value: color } : null,
    aromatica == null ? null : { "@type": "PropertyValue", name: "Aromática", value: aromatica ? "Sí" : "No" },
  ].filter((p): p is { "@type": string; name: string; value: string } => p !== null);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: nombre,
    description: descripcion,
    url,
    ...(imagenUrl ? { image: `${SITE_URL}${imagenUrl}` } : {}),
    brand: { "@type": "Brand", name: SITE_NAME },
    category: subcategoria ? `${categoria} > ${subcategoria}` : categoria,
    ...(additionalProperty.length > 0 ? { additionalProperty } : {}),
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

/**
 * Datos estructurados Service para una página de servicio (ej. Paisajismo).
 * `items` son los mismos servicios ya listados en pantalla (ver SERVICIOS
 * en app/paisajismo/page.tsx) -- nunca una lista aparte.
 */
export function serviceJsonLd({
  nombre,
  descripcion,
  url,
  items,
}: {
  nombre: string;
  descripcion: string;
  url: string;
  items: { titulo: string; descripcion: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: nombre,
    name: nombre,
    description: descripcion,
    url,
    provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    areaServed: "CL",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: nombre,
      itemListElement: items.map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: item.titulo, description: item.descripcion },
      })),
    },
  };
}

/**
 * Datos estructurados CollectionPage + ItemList para una página de listado
 * (catálogo de rosales o una de sus categorías). `items` debe ser el mismo
 * arreglo de productos que ya se renderiza en la grilla -- nunca una lista
 * aparte, para que el schema no pueda desalinearse de lo que ve el usuario.
 */
export function collectionPageJsonLd({
  nombre,
  descripcion,
  url,
  items,
}: {
  nombre: string;
  descripcion: string;
  url: string;
  items: { nombre: string; url: string; imagenUrl: string | null }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: nombre,
    description: descripcion,
    url,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: item.url,
        name: item.nombre,
        ...(item.imagenUrl ? { image: `${SITE_URL}${item.imagenUrl}` } : {}),
      })),
    },
  };
}
