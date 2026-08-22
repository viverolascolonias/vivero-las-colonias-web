import type { Metadata } from "next";
import Container from "@/app/components/ui/Container";
import ImagenBloque from "@/app/components/ui/ImagenBloque";
import SectionHeading from "@/app/components/ui/SectionHeading";
import WhatsAppButton from "@/app/components/ui/WhatsAppButton";

export const metadata: Metadata = {
  title: "Paisajismo — Vivero Las Colonias",
  description: "Diseño, instalación, mantención y asesoría de jardines por Vivero Las Colonias.",
};

// Imágenes de referencia (no son fotografías propias de Vivero Las
// Colonias todavía) que muestran el tipo de jardín y paisajismo que se
// puede realizar. Cada `rutaBase` sigue el mismo mecanismo que el resto
// del sitio (ImagenBloque -> resolverImagenPublica): para reemplazar una
// por una foto real de un proyecto propio, basta con subir el archivo con
// el mismo nombre a esa ruta en /public -- no hace falta tocar este
// componente ni rediseñar la sección.
const GALERIA = [
  {
    rutaBase: "images/paisajismo/galeria/rosales",
    alt: "Paisajismo con rosales como protagonistas",
    caption: "Paisajismo con rosales",
  },
  {
    rutaBase: "images/paisajismo/galeria/jardin-residencial",
    alt: "Jardín residencial con macizos de flores",
    caption: "Jardines residenciales",
  },
  {
    rutaBase: "images/paisajismo/galeria/macizo-flores",
    alt: "Macizo de flores de temporada",
    caption: "Macizos de flores",
  },
  {
    rutaBase: "images/paisajismo/galeria/entrada-casa",
    alt: "Entrada de casa con jardín y accesos ajardinados",
    caption: "Entradas y accesos",
  },
  {
    rutaBase: "images/paisajismo/galeria/jardin-moderno",
    alt: "Jardín moderno y elegante",
    caption: "Jardines modernos",
  },
  {
    rutaBase: "images/paisajismo/galeria/arbustos-flores",
    alt: "Combinación de arbustos y flores en un sendero de jardín",
    caption: "Arbustos y flores",
  },
];

const SERVICIOS = [
  {
    titulo: "Diseño de jardines",
    descripcion: "Proyectos a medida que combinan rosales, plantas y estructura del espacio.",
  },
  {
    titulo: "Instalación",
    descripcion: "Ejecución completa del proyecto, desde la preparación del terreno hasta la plantación.",
  },
  {
    titulo: "Mantención",
    descripcion: "Cuidado periódico para que el jardín se mantenga sano y en su mejor forma.",
  },
  {
    titulo: "Asesoría",
    descripcion: "Acompañamiento para elegir las variedades correctas según clima, luz y espacio.",
  },
  {
    titulo: "Proyectos personalizados",
    descripcion: "Espacios únicos, pensados junto a cada cliente de principio a fin.",
  },
];

export default function PaisajismoPage() {
  return (
    <div>
      <div className="relative">
        <ImagenBloque
          rutaBase="images/paisajismo/banner"
          alt="Paisajismo Vivero Las Colonias"
          variant="olive"
          className="h-[46vh] w-full"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-ink)]/20">
          <Container className="text-center">
            <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-cream-50)]">
              Paisajismo
            </p>
            <h1 className="text-4xl md:text-5xl font-medium text-[var(--color-cream-50)]">
              Espacios que crecen contigo
            </h1>
          </Container>
        </div>
      </div>

      <Container className="py-16 md:py-20">
        <SectionHeading
          eyebrow="Referencias de proyectos"
          title="El estilo de jardín que podemos crear"
          subtitle="Una muestra del tipo de paisajismo y composición que trabajamos: desde macizos de flores hasta jardines donde el rosal es el protagonista."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GALERIA.map((item) => (
            <div
              key={item.rutaBase}
              className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)]"
            >
              <ImagenBloque
                rutaBase={item.rutaBase}
                alt={item.alt}
                variant="sage"
                className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--color-ink)]/70 to-transparent px-4 pb-3 pt-10">
                <p className="text-sm font-medium text-[var(--color-cream-50)]">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICIOS.map((s) => (
            <div
              key={s.titulo}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream-50)] p-6"
            >
              <h3 className="font-[var(--font-heading)] text-xl text-[var(--color-forest-dark)]">
                {s.titulo}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-soft)]">{s.descripcion}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-[var(--color-forest)] px-8 py-12 text-center">
          <h2 className="font-[var(--font-heading)] text-2xl md:text-3xl text-[var(--color-cream-50)]">
            ¿Tienes un proyecto en mente?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[var(--color-cream-100)]">
            Cuéntanos tu idea y te ayudamos a llevarla a cabo, desde el diseño hasta la mantención.
          </p>
          <WhatsAppButton
            mensaje="Hola, quiero conversar sobre un proyecto de paisajismo."
            className="mt-6 bg-[var(--color-cream-50)] text-[var(--color-forest-dark)] hover:bg-[var(--color-cream-200)]"
          >
            Conversemos por WhatsApp
          </WhatsAppButton>
        </div>
      </Container>
    </div>
  );
}
