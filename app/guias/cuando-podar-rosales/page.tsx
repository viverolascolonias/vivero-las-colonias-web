import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/ui/Container";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import JsonLd from "@/app/components/ui/JsonLd";
import { articleJsonLd, faqJsonLd } from "@/lib/seo";
import { GUIAS } from "@/lib/guias";

const GUIA = GUIAS.find((g) => g.slug === "cuando-podar-rosales")!;

export const metadata: Metadata = {
  title: GUIA.titulo,
  description: GUIA.resumen,
  alternates: { canonical: `/guias/${GUIA.slug}` },
};

const FAQ = [
  {
    pregunta: "¿Cuándo se poda un rosal en Chile?",
    respuesta:
      "La poda principal se hace a fines de invierno, justo antes de que el rosal retome su crecimiento de primavera (aproximadamente agosto en la mayoría del país). Podar demasiado temprano expone los cortes a heladas; podar demasiado tarde le quita a la planta parte del crecimiento que ya invirtió energía en producir.",
  },
  {
    pregunta: "¿Qué pasa si no podo mi rosal?",
    respuesta:
      "El rosal sigue creciendo y floreciendo, pero con los años tiende a formar un centro leñoso y congestionado, con menos flores nuevas y más susceptibilidad a enfermedades por falta de circulación de aire. La poda anual renueva la planta y concentra su energía en brotes nuevos y vigorosos.",
  },
  {
    pregunta: "¿Los rosales trepadores se podan igual que los arbustivos?",
    respuesta:
      "No exactamente: en los arbustivos se poda para renovar la estructura general de la planta. En los trepadores se conserva la estructura principal de tallos largos ya guiada sobre el soporte, y se podan sobre todo los brotes laterales que salen de esa estructura.",
  },
];

export default function CuandoPodarRosalesPage() {
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
            La poda es la intervención que más diferencia hace en la floración y la salud de un rosal, y
            también la que más se hace en el momento equivocado. La época importa tanto como la técnica.
          </p>

          <h2 className="pt-2 font-[var(--font-heading)] text-2xl text-[var(--color-forest-dark)]">
            La época correcta
          </h2>
          <p>
            En Chile, la poda principal se hace a fines de invierno, mientras el rosal todavía está en
            reposo pero ya se acerca la primavera —en la práctica, alrededor de agosto en la mayoría del
            país, ajustando según la zona y si todavía hay riesgo de heladas fuertes. Podar en esta ventana
            estimula brotes nuevos justo cuando la planta retoma su crecimiento activo, en vez de gastar esa
            energía en madera vieja.
          </p>

          <h2 className="pt-2 font-[var(--font-heading)] text-2xl text-[var(--color-forest-dark)]">
            Cómo hacer un corte de poda básico
          </h2>
          <p>
            Usar siempre tijeras de podar limpias y afiladas —un corte limpio cicatriza mejor que uno
            aplastado. El corte se hace en diagonal, justo por encima de una yema que mire hacia afuera de
            la planta (así el brote nuevo crece hacia afuera, no hacia el centro). Como regla general, se
            eliminan primero las ramas muertas, dañadas o muy delgadas, y luego se acortan los tallos
            principales sanos para renovar la estructura, dejando la planta más abierta en el centro para
            que circule el aire.
          </p>

          <h2 className="pt-2 font-[var(--font-heading)] text-2xl text-[var(--color-forest-dark)]">
            Según el tipo de rosal
          </h2>
          <p>
            En los{" "}
            <Link href="/rosales/arbustivos" className="text-[var(--color-forest)] underline">
              rosales arbustivos
            </Link>{" "}
            la poda es más drástica: se busca renovar toda la estructura de la planta cada año. En los{" "}
            <Link href="/rosales/trepadores" className="text-[var(--color-forest)] underline">
              rosales trepadores
            </Link>{" "}
            se conserva la estructura principal ya guiada sobre el soporte, y se podan sobre todo los
            brotes laterales. Los{" "}
            <Link href="/rosales/medio-pie" className="text-[var(--color-forest)] underline">
              rosales medio pie
            </Link>{" "}
            siguen el mismo criterio que los arbustivos, pero sobre la copa injertada en altura.
          </p>

          <p>
            Para el resto del año, revisa nuestra guía de{" "}
            <Link href="/guias/como-cuidar-un-rosal" className="text-[var(--color-forest)] underline">
              cuidados generales
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
