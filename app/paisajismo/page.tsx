import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/ui/Container";
import ImagenBloque from "@/app/components/ui/ImagenBloque";
import ImagenFondo from "@/app/components/ui/ImagenFondo";
import SectionHeading from "@/app/components/ui/SectionHeading";
import Badge from "@/app/components/ui/Badge";
import WhatsAppButton from "@/app/components/ui/WhatsAppButton";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import JsonLd from "@/app/components/ui/JsonLd";
import { serviceJsonLd, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Paisajismo y diseño de jardines",
  description: "Diseño, instalación, mantención y asesoría de jardines en Chile por Vivero Las Colonias.",
  alternates: { canonical: "/paisajismo" },
};

// Estilos de paisajismo que ofrece el vivero, cada uno con su fotografía
// propia. Cada `rutaBase` sigue el mismo mecanismo que el resto del sitio
// (ImagenBloque -> resolverImagenPublica): para reemplazar una foto más
// adelante alcanza con subir un archivo con el mismo nombre a esa ruta en
// /public, sin tocar este componente.
const ESTILOS = [
  {
    rutaBase: "images/paisajismo/estilos/moderno-naturalista",
    alt: "Jardín de paisajismo moderno naturalista con gramíneas y flores perennes",
    titulo: "Paisajismo moderno naturalista",
    descripcion:
      "Diseños contemporáneos con estructura clara, senderos, gramíneas ornamentales y flores perennes como salvias, equináceas y milenrama. Utilizamos especies de bajo consumo hídrico, áridos y vegetación adaptada para lograr jardines atractivos, sostenibles y de fácil mantención.",
    etiquetas: ["Bajo consumo hídrico", "Bajo mantenimiento"],
  },
  {
    rutaBase: "images/paisajismo/estilos/mediterraneo-florido",
    alt: "Jardín de paisajismo mediterráneo florido con olivos y lavandas",
    titulo: "Paisajismo mediterráneo florido",
    descripcion:
      "Jardines cálidos y resistentes, inspirados en el paisaje mediterráneo. Integramos olivos, lavandas, romero, salvias, gramíneas y flores perennes, combinados con grava y piedra natural. Es una solución de bajo riego, colorida y adecuada para climas secos.",
    etiquetas: ["Bajo consumo hídrico", "Flora perenne"],
  },
  {
    rutaBase: "images/paisajismo/estilos/tropical-eficiente",
    alt: "Jardín de paisajismo tropical eficiente con palmeras y aves del paraíso",
    titulo: "Paisajismo tropical eficiente",
    descripcion:
      "Composiciones de follaje, color y textura para climas cálidos. Combina palmeras, aves del paraíso, lantanas, salvias y gramíneas, organizadas en capas para mantener una apariencia exuberante pero ordenada. Selecciona plantas resistentes al calor y de consumo hídrico controlado.",
    etiquetas: ["Bajo consumo hídrico"],
  },
  {
    rutaBase: "images/paisajismo/estilos/minimalista-florido",
    alt: "Jardín de paisajismo minimalista florido con olivo, grava y lavandas",
    titulo: "Paisajismo minimalista florido",
    descripcion:
      "Un estilo sobrio y elegante que mantiene espacios despejados, materiales naturales y plantaciones definidas. Combina olivos, grava, rocas, lavandas, salvias, flores perennes y gramíneas ornamentales para aportar color, movimiento y bajo mantenimiento sin perder la simplicidad visual.",
    etiquetas: ["Flora perenne", "Bajo mantenimiento"],
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
  const jsonLd = serviceJsonLd({
    nombre: "Paisajismo",
    descripcion: "Diseño, instalación, mantención y asesoría de jardines en Chile por Vivero Las Colonias.",
    url: `${SITE_URL}/paisajismo`,
    items: SERVICIOS,
  });

  return (
    <div>
      <JsonLd data={jsonLd} />
      <Container className="pt-6">
        <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Paisajismo" }]} />
      </Container>

      <section className="relative flex h-[62vh] min-h-[440px] items-center overflow-hidden">
        {/* La foto es la protagonista: ocupa prácticamente todo el hero.
            Está compuesta con espacio libre a la izquierda para el texto.
            En pantallas angostas, object-position se corre hacia el centro
            para no perder el sendero y las flores (que en el recorte por
            defecto quedarían fuera de cuadro). */}
        <ImagenFondo
          rutaBase="images/paisajismo/banner"
          alt="Jardín naturalista con sendero de grava, lavandas, gramíneas y flores perennes de bajo consumo hídrico"
          variant="olive"
          priority
          imgClassName="object-[54%_66%] md:object-[center_60%]"
        />
        {/* Overlay sutil: solo lo necesario para que el texto blanco sea
            legible, sin oscurecer la fotografía en el resto del hero. */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-ink)]/50 via-[var(--color-ink)]/15 to-transparent" />

        <Container className="relative z-10">
          <div className="max-w-md text-left">
            {/* Una sola etiqueta <h1> semántica: antes "Paisajismo" (la
                keyword) era un <p> suelto separado del <h1>. Mismo diseño
                visual, mismas clases, solo se fusiona en un único encabezado. */}
            <h1 className="text-[var(--color-cream-50)]">
              <span className="block mb-3 text-xs font-medium tracking-[0.2em] uppercase">Paisajismo</span>
              <span className="block text-4xl md:text-5xl font-medium">Diseñamos espacios que cobran vida</span>
            </h1>
            <p className="mt-4 text-[var(--color-cream-100)]">
              Proyectos personalizados de diseño, instalación, mantención y asesoría.
            </p>
            <WhatsAppButton
              mensaje="Hola, quiero conocer más sobre su servicio de paisajismo."
              className="mt-6 shadow-lg shadow-black/30"
            >
              Conoce nuestro servicio
            </WhatsAppButton>
          </div>
        </Container>
      </section>

      <Container className="py-16 md:py-20">
        <SectionHeading
          eyebrow="Estilos de paisajismo"
          title="Encuentra el estilo para tu jardín"
          subtitle="Diseños pensados para distintos climas y espacios, con foco en bajo consumo hídrico, bajo mantenimiento y flora perenne."
        />

        <div className="grid gap-8 md:grid-cols-2">
          {ESTILOS.map((estilo) => (
            <div
              key={estilo.rutaBase}
              className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream-50)]"
            >
              <div className="relative">
                <ImagenBloque
                  rutaBase={estilo.rutaBase}
                  alt={estilo.alt}
                  variant="sage"
                  className="aspect-[4/3] w-full"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--color-ink)]/75 to-transparent px-5 pb-4 pt-14">
                  <h3 className="font-[var(--font-heading)] text-xl text-[var(--color-cream-50)]">
                    {estilo.titulo}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-3 flex flex-wrap gap-2">
                  {estilo.etiquetas.map((etiqueta) => (
                    <Badge key={etiqueta} tone="sage">
                      {etiqueta}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-[var(--color-ink-soft)]">{estilo.descripcion}</p>
              </div>
            </div>
          ))}
        </div>

        <SectionHeading
          eyebrow="Qué hacemos"
          title="Nuestros servicios de paisajismo"
          subtitle="Del diseño a la mantención, con asesoría en cada etapa del proyecto."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
        <p className="mt-6 text-center text-sm text-[var(--color-ink-soft)]">
          Cada proyecto se arma con variedades de nuestro propio catálogo de{" "}
          <Link href="/rosales" className="text-[var(--color-forest)] underline">
            rosales
          </Link>{" "}
          y{" "}
          <Link href="/plantas" className="text-[var(--color-forest)] underline">
            plantas
          </Link>
          .
        </p>

        <div className="mt-16 rounded-2xl bg-[var(--color-forest)] px-8 py-12 text-center">
          <h2 className="font-[var(--font-heading)] text-2xl md:text-3xl text-[var(--color-cream-50)]">
            ¿Tienes un proyecto en mente?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[var(--color-cream-100)]">
            Cuéntanos tu idea y te ayudamos a llevarla a cabo, desde el diseño hasta la mantención.
          </p>
          <WhatsAppButton
            mensaje="Hola, quiero conversar sobre un proyecto de paisajismo."
            variant="light"
            className="mt-6"
          >
            Conversemos por WhatsApp
          </WhatsAppButton>
        </div>
      </Container>
    </div>
  );
}
