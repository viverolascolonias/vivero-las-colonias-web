import type { Metadata } from "next";
import Container from "@/app/components/ui/Container";
import ImagenBloque from "@/app/components/ui/ImagenBloque";
import SectionHeading from "@/app/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Nosotros — Vivero Las Colonias",
  description: "Conoce a Vivero Las Colonias: conocimiento, asesoría y acompañamiento en cada jardín.",
};

const VALORES = [
  { titulo: "Especialización", texto: "Nos enfocamos en rosales y variedades poco comunes, con un conocimiento profundo de cada una." },
  { titulo: "Asesoría personalizada", texto: "Acompañamos a cada cliente en la elección correcta para su espacio y clima." },
  { titulo: "Calidad y presentación", texto: "Cada planta que sale del vivero cumple un estándar de cuidado y presentación." },
  { titulo: "Cercanía", texto: "Precios accesibles y trato directo, sin perder la calidez de un vivero de barrio." },
];

export default function NosotrosPage() {
  return (
    <div>
      <Container className="py-16 md:py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-earth)]">
              Sobre nosotros
            </p>
            <h1 className="text-4xl md:text-5xl font-medium text-[var(--color-forest-dark)]">
              No solo vendemos plantas
            </h1>
            <p className="mt-6 leading-relaxed text-[var(--color-ink-soft)]">
              Entregamos conocimiento, asesoría y acompañamiento a cada persona que quiere crear un
              espacio único. Nuestra especialidad son los rosales y las variedades poco comunes, pero
              también trabajamos con plantas ornamentales, árboles y proyectos completos de paisajismo.
            </p>
            <p className="mt-4 leading-relaxed text-[var(--color-ink-soft)]">
              Detrás de cada rosal hay años de experiencia y cuidado — creemos que un buen jardín se
              construye con conocimiento, no solo con plantas.
            </p>
          </div>
          <ImagenBloque
            rutaBase="images/nosotros/foto"
            alt="Vivero Las Colonias"
            variant="sand"
            className="aspect-[4/5] w-full rounded-2xl"
          />
        </div>
      </Container>

      <div className="bg-[var(--color-cream-100)] py-16 md:py-20">
        <Container>
          <SectionHeading eyebrow="Lo que nos guía" title="Nuestros valores" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALORES.map((v) => (
              <div key={v.titulo} className="rounded-2xl bg-[var(--color-cream-50)] p-6">
                <h3 className="font-[var(--font-heading)] text-lg text-[var(--color-forest-dark)]">
                  {v.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">{v.texto}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}
