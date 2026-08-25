import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/ui/Container";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import JsonLd from "@/app/components/ui/JsonLd";
import { articleJsonLd, faqJsonLd } from "@/lib/seo";
import { GUIAS } from "@/lib/guias";

const GUIA = GUIAS.find((g) => g.slug === "tipos-de-rosales")!;

export const metadata: Metadata = {
  title: GUIA.titulo,
  description: GUIA.resumen,
  alternates: { canonical: `/guias/${GUIA.slug}` },
};

const FAQ = [
  {
    pregunta: "¿Cuál es la diferencia entre un rosal arbustivo y uno trepador?",
    respuesta:
      "El rosal arbustivo crece como un arbusto compacto, con un porte definido que no necesita soporte. El trepador, en cambio, desarrolla tallos largos y flexibles que hay que guiar sobre un muro, pérgola o enrejado para que cubra la estructura.",
  },
  {
    pregunta: "¿Qué es un rosal medio pie?",
    respuesta:
      "Es un rosal injertado sobre un tronco de aproximadamente 60 a 90 cm de altura, de modo que la copa florece a media altura en vez de a ras de suelo. Se usa para dar volumen vertical sin llegar a la altura de un rosal estándar de pie alto.",
  },
  {
    pregunta: "¿Puedo combinar los tres tipos en un mismo jardín?",
    respuesta:
      "Sí, es una de las combinaciones más usadas en diseño de jardines: arbustivos en macizos y bordes, medio pie como puntos focales o en hileras, y trepadores sobre muros o pérgolas.",
  },
];

export default function TiposDeRosalesPage() {
  return (
    <div className="py-12 md:py-16">
      <JsonLd
        data={articleJsonLd({
          titulo: GUIA.titulo,
          descripcion: GUIA.resumen,
          slug: GUIA.slug,
          fechaPublicacion: GUIA.fechaPublicacion,
        })}
      />
      <JsonLd data={faqJsonLd(FAQ)} />

      <Container className="max-w-2xl">
        <Breadcrumbs
          items={[{ label: "Inicio", href: "/" }, { label: "Guías", href: "/guias" }, { label: GUIA.titulo }]}
        />

        <h1 className="text-3xl md:text-4xl font-medium text-[var(--color-forest-dark)]">{GUIA.titulo}</h1>

        <div className="mt-8 space-y-6 leading-relaxed text-[var(--color-ink)]">
          <p>
            En Vivero Las Colonias cultivamos rosales en tres formas de cultivo distintas. No es solo una
            clasificación de catálogo: cada una responde a una necesidad diferente en el jardín, y elegir la
            correcta antes de comprar evita frustraciones después.
          </p>

          <h2 className="pt-2 font-[var(--font-heading)] text-2xl text-[var(--color-forest-dark)]">
            Rosales arbustivos
          </h2>
          <p>
            Es la forma más común: el rosal crece como un arbusto de porte bajo, entre 40 y 80 cm de altura
            según la variedad, sin necesidad de guía ni soporte. Es la opción más versátil para macizos,
            bordes de camino o jardines donde se busca color a baja altura. La mayoría de nuestras
            variedades —como{" "}
            <Link href="/rosales/black-magic-arbustiva-baja" className="text-[var(--color-forest)] underline">
              Black Magic
            </Link>{" "}
            — están disponibles en esta forma.
          </p>
          <p>
            <Link href="/rosales/arbustivos" className="text-[var(--color-forest)] underline">
              Ver todos los rosales arbustivos →
            </Link>
          </p>

          <h2 className="pt-2 font-[var(--font-heading)] text-2xl text-[var(--color-forest-dark)]">
            Rosales trepadores
          </h2>
          <p>
            Desarrollan tallos largos y flexibles que no se sostienen solos: hay que guiarlos y atarlos sobre
            un muro, pérgola, enrejado o cerco. Son la opción indicada cuando se quiere cubrir una estructura
            vertical con floración, no solo decorar un macizo. Variedades como{" "}
            <Link href="/rosales/texas-trepadora" className="text-[var(--color-forest)] underline">
              Texas
            </Link>{" "}
            están disponibles en esta forma.
          </p>
          <p>
            <Link href="/rosales/trepadores" className="text-[var(--color-forest)] underline">
              Ver todos los rosales trepadores →
            </Link>
          </p>

          <h2 className="pt-2 font-[var(--font-heading)] text-2xl text-[var(--color-forest-dark)]">
            Rosales medio pie
          </h2>
          <p>
            Se obtienen injertando la variedad sobre un tronco recto de entre 60 y 90 cm de altura
            aproximadamente, de modo que la copa florece a media altura en vez de a ras de suelo. Aportan
            estructura vertical y funcionan bien como punto focal individual o repetidos en hilera, sin
            llegar a la altura de un rosal de pie alto tradicional.
          </p>
          <p>
            <Link href="/rosales/medio-pie" className="text-[var(--color-forest)] underline">
              Ver todos los rosales medio pie →
            </Link>
          </p>

          <p>
            Si todavía no sabes cuál te conviene, revisa nuestra guía para{" "}
            <Link href="/guias/como-elegir-un-rosal" className="text-[var(--color-forest)] underline">
              elegir el rosal ideal para tu jardín
            </Link>
            . Una vez que elijas el tipo, revisa cómo{" "}
            <Link href="/guias/como-plantar-un-rosal" className="text-[var(--color-forest)] underline">
              plantarlo
            </Link>{" "}
            y{" "}
            <Link href="/guias/como-cuidar-un-rosal" className="text-[var(--color-forest)] underline">
              cuidarlo
            </Link>
            .
          </p>

          <h2 className="pt-2 font-[var(--font-heading)] text-2xl text-[var(--color-forest-dark)]">
            Preguntas frecuentes
          </h2>
          <dl className="space-y-5">
            {FAQ.map((f) => (
              <div key={f.pregunta}>
                <dt className="font-medium text-[var(--color-forest-dark)]">{f.pregunta}</dt>
                <dd className="mt-1 text-[var(--color-ink-soft)]">{f.respuesta}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </div>
  );
}
