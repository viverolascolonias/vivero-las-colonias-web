import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/ui/Container";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import JsonLd from "@/app/components/ui/JsonLd";
import { articleJsonLd, faqJsonLd } from "@/lib/seo";
import { GUIAS } from "@/lib/guias";

const GUIA = GUIAS.find((g) => g.slug === "como-plantar-un-rosal")!;

export const metadata: Metadata = {
  title: GUIA.titulo,
  description: GUIA.resumen,
  alternates: { canonical: `/guias/${GUIA.slug}` },
};

const FAQ = [
  {
    pregunta: "¿Cuándo plantar un rosal en Chile?",
    respuesta:
      "La mejor época es durante el reposo invernal del rosal, entre otoño y fines de invierno (aproximadamente de mayo a agosto), antes de que retome su crecimiento activo en primavera. Plantar en esta ventana reduce el estrés de la planta y favorece el arraigo.",
  },
  {
    pregunta: "¿Qué significa un rosal a raíz desnuda?",
    respuesta:
      "Es un rosal que se comercializa sin sustrato alrededor de la raíz, en estado de reposo (sin hojas). Se planta directo en el hoyo definitivo durante la temporada de reposo invernal, y una vez plantado se comporta igual que cualquier otro rosal.",
  },
  {
    pregunta: "¿Cuánto se debe regar un rosal recién plantado?",
    respuesta:
      "Riego abundante al momento de plantar para asentar la tierra alrededor de la raíz, y luego riego regular las primeras semanas mientras arraiga, evitando encharcar el sustrato. Una vez establecido, el rosal tolera riegos más espaciados y profundos.",
  },
];

export default function ComoPlantarUnRosalPage() {
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
            Un rosal bien plantado arraiga más rápido, sufre menos y florece antes. La mayoría de los
            problemas que vemos con rosales recién comprados no son de la variedad, sino de cómo y cuándo se
            plantaron. Esta guía cubre lo esencial.
          </p>

          <h2 className="pt-2 font-[var(--font-heading)] text-2xl text-[var(--color-forest-dark)]">
            Cuándo plantar
          </h2>
          <p>
            En Chile, la mejor época para plantar un rosal es durante su reposo invernal, entre otoño y
            fines de invierno (aproximadamente de mayo a agosto). En esta ventana la planta no está gastando
            energía en sostener hojas ni flores, así que toda su energía va a establecer raíz antes de que
            llegue la primavera. Es también la temporada en que se venden los rosales{" "}
            <strong>a raíz desnuda</strong>: sin sustrato alrededor de la raíz, listos para ir directo al
            hoyo definitivo.
          </p>

          <h2 className="pt-2 font-[var(--font-heading)] text-2xl text-[var(--color-forest-dark)]">
            Elegir el lugar
          </h2>
          <p>
            Los rosales necesitan sol directo al menos 6 horas al día para florecer bien; a media sombra
            crecen más débiles y florecen menos. Conviene también un lugar con buen drenaje —el agua no debe
            quedar empozada— y con algo de circulación de aire, que ayuda a prevenir hongos en el follaje.
          </p>

          <h2 className="pt-2 font-[var(--font-heading)] text-2xl text-[var(--color-forest-dark)]">
            Preparar el hoyo y plantar
          </h2>
          <p>
            El hoyo debe ser lo suficientemente grande para que la raíz quede extendida sin doblarse, en
            general unos 40-50 cm de ancho y profundidad. Mezclar la tierra de extracción con materia
            orgánica (compost o guano bien descompuesto) ayuda al arraigue. El punto de injerto —el
            engrosamiento donde la variedad fue injertada sobre el pie— debe quedar a nivel del suelo o
            apenas por debajo, no enterrado profundo ni expuesto al aire. Después de plantar, regar
            abundante para asentar la tierra alrededor de la raíz y eliminar bolsones de aire.
          </p>

          <h2 className="pt-2 font-[var(--font-heading)] text-2xl text-[var(--color-forest-dark)]">
            Primeras semanas
          </h2>
          <p>
            Mientras arraiga, mantener riego regular sin encharcar. No es necesario fertilizar de inmediato
            —el rosal recién plantado todavía no tiene raíz activa para aprovecharlo— conviene esperar a que
            empiecen a brotar hojas nuevas antes de la primera fertilización de primavera.
          </p>

          <p>
            Una vez que elegiste dónde y cuándo plantar, el siguiente paso es elegir la forma de cultivo que
            mejor se adapta al espacio:{" "}
            <Link href="/guias/tipos-de-rosales" className="text-[var(--color-forest)] underline">
              arbustivo, trepador o medio pie
            </Link>
            , y revisar{" "}
            <Link href="/rosales" className="text-[var(--color-forest)] underline">
              nuestro catálogo de variedades disponibles
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
