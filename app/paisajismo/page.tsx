import type { Metadata } from "next";
import Container from "@/app/components/ui/Container";
import ImagenBloque from "@/app/components/ui/ImagenBloque";
import WhatsAppButton from "@/app/components/ui/WhatsAppButton";

export const metadata: Metadata = {
  title: "Paisajismo — Vivero Las Colonias",
  description: "Diseño, instalación, mantención y asesoría de jardines por Vivero Las Colonias.",
};

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
