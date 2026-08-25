import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/ui/Container";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import JsonLd from "@/app/components/ui/JsonLd";
import { articleJsonLd, faqJsonLd } from "@/lib/seo";
import { GUIAS } from "@/lib/guias";

const GUIA = GUIAS.find((g) => g.slug === "como-cuidar-un-rosal")!;

export const metadata: Metadata = {
  title: GUIA.titulo,
  description: GUIA.resumen,
  alternates: { canonical: `/guias/${GUIA.slug}` },
};

const FAQ = [
  {
    pregunta: "¿Cada cuánto se debe regar un rosal?",
    respuesta:
      "Depende del clima y el suelo, pero como referencia general: riego profundo 1-2 veces por semana en verano, espaciando más en otoño e invierno. Es preferible un riego profundo y espaciado que riegos cortos y frecuentes, que favorecen raíces superficiales.",
  },
  {
    pregunta: "¿Cuándo fertilizar un rosal?",
    respuesta:
      "La fertilización principal es a inicios de primavera, cuando el rosal retoma su crecimiento activo, y se puede repetir después de cada ciclo de floración durante la temporada cálida. No se fertiliza en invierno, mientras la planta está en reposo.",
  },
  {
    pregunta: "¿Por qué a mi rosal le salen hojas con manchas negras o amarillas?",
    respuesta:
      "Son los síntomas más comunes de hongos foliares (como el mildiu o la mancha negra), favorecidos por poca circulación de aire y follaje que permanece mojado. Regar la base y no el follaje, y mantener el rosal despejado de ramas cruzadas, ayuda a prevenirlo.",
  },
];

export default function ComoCuidarUnRosalPage() {
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
            Un rosal ya establecido no pide mucho: sol, riego regular y un par de intervenciones puntuales
            al año. Esta guía cubre lo esencial para mantenerlo sano una vez que ya está plantado y
            arraigado —si todavía no lo plantaste, revisa primero{" "}
            <Link href="/guias/como-plantar-un-rosal" className="text-[var(--color-forest)] underline">
              cómo plantar un rosal
            </Link>
            .
          </p>

          <h2 className="pt-2 font-[var(--font-heading)] text-2xl text-[var(--color-forest-dark)]">Riego</h2>
          <p>
            Los rosales prefieren riego profundo y espaciado por sobre riegos cortos y frecuentes: un riego
            que moje bien la zona de la raíz favorece raíces profundas y una planta más resistente a la
            sequía. Como referencia, 1-2 veces por semana en los meses cálidos suele ser suficiente,
            espaciando en otoño e invierno. Es preferible regar la base de la planta y no el follaje, para
            reducir el riesgo de hongos.
          </p>

          <h2 className="pt-2 font-[var(--font-heading)] text-2xl text-[var(--color-forest-dark)]">
            Fertilización
          </h2>
          <p>
            La fertilización principal se hace a inicios de primavera, cuando el rosal retoma su crecimiento
            activo después del reposo invernal. Se puede repetir después de cada ciclo de floración durante
            la temporada cálida, con un abono orgánico o uno formulado para rosas. No es necesario ni
            recomendable fertilizar en invierno.
          </p>

          <h2 className="pt-2 font-[var(--font-heading)] text-2xl text-[var(--color-forest-dark)]">
            Problemas comunes
          </h2>
          <p>
            Las manchas negras o amarillas en las hojas suelen ser hongos foliares, favorecidos por poca
            circulación de aire y follaje húmedo por tiempo prolongado. Mantener el centro del rosal
            despejado de ramas cruzadas y regar la base en vez del follaje ayuda a prevenirlos. Los pulgones
            son la plaga más frecuente en brotes nuevos; en general se controlan con un chorro de agua a
            presión o jabón potásico, sin necesidad de recurrir a químicos fuertes salvo que la infestación
            sea severa.
          </p>

          <h2 className="pt-2 font-[var(--font-heading)] text-2xl text-[var(--color-forest-dark)]">Poda</h2>
          <p>
            La poda es una intervención puntual, no algo que se hace en cada riego. Tiene su propia época y
            técnica —revisa{" "}
            <Link href="/guias/cuando-podar-rosales" className="text-[var(--color-forest)] underline">
              cuándo podar rosales
            </Link>{" "}
            para hacerlo en el momento correcto.
          </p>

          <p>
            Si estás eligiendo qué rosal plantar, revisa las diferencias entre{" "}
            <Link href="/guias/tipos-de-rosales" className="text-[var(--color-forest)] underline">
              rosales arbustivos, trepadores y medio pie
            </Link>{" "}
            o directamente{" "}
            <Link href="/rosales" className="text-[var(--color-forest)] underline">
              nuestro catálogo de variedades
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
