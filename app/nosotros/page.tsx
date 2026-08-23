import type { Metadata } from "next";
import Container from "@/app/components/ui/Container";
import ImagenBloque from "@/app/components/ui/ImagenBloque";
import SectionHeading from "@/app/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Quiénes somos — Vivero Las Colonias",
  description:
    "Producimos rosales, asesoramos y acompañamos a cada cliente para crear áreas verdes que realmente funcionen.",
};

const PILARES = [
  { titulo: "Pasión", texto: "Amamos lo que hacemos y se nota en cada detalle." },
  { titulo: "Asesoría", texto: "Te orientamos para que puedas tomar las mejores decisiones para tu jardín." },
  { titulo: "Apoyo", texto: "Te acompañamos antes, durante y después de tu compra." },
  { titulo: "Áreas verdes", texto: "Creamos y ayudamos a desarrollar espacios verdes pensados para cada entorno." },
];

const COMPROMISO = [
  {
    titulo: "Producción propia",
    texto: "Cultivamos nuestros rosales con dedicación, cuidando cada etapa del proceso.",
  },
  {
    titulo: "Calidad",
    texto: "Seleccionamos variedades y plantas pensando en su salud, adaptación y desarrollo.",
  },
  {
    titulo: "Atención cercana",
    texto: "Nos importa cada cliente y cada proyecto. Buscamos entregar una asesoría real y personalizada.",
  },
  {
    titulo: "Experiencia y conocimiento",
    texto: "Nuestra experiencia en rosales y áreas verdes nos permite entregar recomendaciones prácticas y honestas.",
  },
];

export default function NosotrosPage() {
  return (
    <div>
      <Container className="py-16 md:py-20">
        {/* Foto y texto conviven en la primera pantalla, sin necesidad de
            hacer scroll para ver todo. En mobile la foto va primero (más
            baja) y el texto debajo; en desktop quedan lado a lado. */}
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <ImagenBloque
            rutaBase="images/nosotros/foto"
            alt="Trabajador de Vivero Las Colonias caminando entre hileras de rosales en flor"
            variant="sage"
            className="order-1 aspect-[3/2] w-full rounded-2xl md:order-2 md:aspect-[4/5]"
            imgClassName="object-[60%_center]"
            sizes="(min-width: 768px) 50vw, 100vw"
          />

          <div className="order-2 md:order-1">
            <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-earth)]">
              Quiénes somos
            </p>
            <h1 className="text-4xl md:text-5xl font-medium text-[var(--color-forest-dark)]">
              Cultivamos mucho más que plantas
            </h1>
            <div className="mt-6 space-y-4 leading-relaxed text-[var(--color-ink-soft)]">
              <p>
                En Vivero Las Colonias, las rosas son nuestra pasión y nuestro propósito. Producimos
                rosales de calidad, seleccionando cada variedad para que florezca con fuerza, belleza y
                salud en cada jardín.
              </p>
              <p>
                Pero no solo producimos rosales: asesoramos, acompañamos y ayudamos a nuestros clientes a
                crear áreas verdes únicas, pensadas para durar y disfrutarse. Cada proyecto es distinto, y
                una buena elección de plantas puede transformar por completo un espacio.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-10 border-t border-[var(--color-border)] pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {PILARES.map((p) => (
            <div key={p.titulo}>
              <h3 className="font-[var(--font-heading)] text-lg text-[var(--color-forest-dark)]">
                {p.titulo}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">{p.texto}</p>
            </div>
          ))}
        </div>
      </Container>

      <div className="bg-[var(--color-cream-100)] py-16 md:py-20">
        <Container>
          <SectionHeading title="Calidad, confianza y dedicación en todo lo que hacemos" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {COMPROMISO.map((c) => (
              <div key={c.titulo} className="rounded-2xl bg-[var(--color-cream-50)] p-6">
                <h3 className="font-[var(--font-heading)] text-lg text-[var(--color-forest-dark)]">
                  {c.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">{c.texto}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}
