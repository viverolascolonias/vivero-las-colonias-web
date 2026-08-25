import type { MetadataRoute } from "next";
import { getProductos } from "@/lib/productos";
import { GUIAS } from "@/lib/guias";
import { SITE_URL } from "@/lib/seo";

// Se regenera en cada build/request (force-dynamic más abajo) a partir del
// catálogo real -- nunca hay que actualizar este archivo a mano cuando se
// agrega o retira una variedad.
export const dynamic = "force-dynamic";

const PAGINAS_ESTATICAS: { ruta: string; prioridad: number; frecuencia: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { ruta: "", prioridad: 1, frecuencia: "weekly" },
  { ruta: "/rosales", prioridad: 0.9, frecuencia: "weekly" },
  { ruta: "/rosales/arbustivos", prioridad: 0.8, frecuencia: "weekly" },
  { ruta: "/rosales/trepadores", prioridad: 0.8, frecuencia: "weekly" },
  { ruta: "/rosales/medio-pie", prioridad: 0.8, frecuencia: "weekly" },
  { ruta: "/plantas", prioridad: 0.7, frecuencia: "weekly" },
  { ruta: "/guias", prioridad: 0.6, frecuencia: "monthly" },
  { ruta: "/paisajismo", prioridad: 0.6, frecuencia: "monthly" },
  { ruta: "/nosotros", prioridad: 0.5, frecuencia: "monthly" },
  { ruta: "/contacto", prioridad: 0.5, frecuencia: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();

  const estaticas: MetadataRoute.Sitemap = PAGINAS_ESTATICAS.map((p) => ({
    url: `${SITE_URL}${p.ruta}`,
    lastModified: ahora,
    changeFrequency: p.frecuencia,
    priority: p.prioridad,
  }));

  const productos: MetadataRoute.Sitemap = getProductos().map((p) => ({
    url: `${SITE_URL}/${p.categoria === "Rosal" ? "rosales" : "plantas"}/${p.slug}`,
    lastModified: ahora,
    changeFrequency: "weekly",
    priority: p.categoria === "Rosal" ? 0.7 : 0.5,
  }));

  const guias: MetadataRoute.Sitemap = GUIAS.map((g) => ({
    url: `${SITE_URL}/guias/${g.slug}`,
    lastModified: g.fechaPublicacion,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...estaticas, ...productos, ...guias];
}
