import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/ui/Container";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import JsonLd from "@/app/components/ui/JsonLd";
import { articleJsonLd, faqJsonLd } from "@/lib/seo";
import { GUIAS } from "@/lib/guias";

const GUIA = GUIAS.find((g) => g.slug === "rosales-en-primavera")!;

export const metadata: Metadata = {
  title: GUIA.titulo,
  description: GUIA.resumen,
  alternates: { canonical: `/guias/${GUIA.slug}` },
};

const FAQ = [
  {
    pregunta: "¿Todavía puedo plantar un rosal a raíz desnuda en primavera?",
    respuesta:
      "La ventana se cierra apenas la planta empieza a brotar: una vez que el rosal ya tiene hojas activas, trasplantarlo a raíz desnuda es mucho más riesgoso. Si estás recién a inicios de la temporada, todavía alcanzas; si ya avanzó bastante, es más seguro esperar a un ejemplar en contenedor.",
  },
  {
    pregunta: "No alcancé a podar en invierno, ¿qué hago?",
    respuesta:
      "Si el rosal ya está brotando, evita una poda drástica: limítate a sacar madera muerta o dañada y deja la poda de renovación completa para el próximo invierno. Podar fuerte justo cuando la planta está gastando energía en brotar nuevo la debilita más de lo que ayuda.",
  },
];

export default function RosalesEnPrimaveraPage() {
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
            Entre fines de invierno y el arranque de la primavera es la época de más movimiento en un
            jardín de rosales: se cierra la ventana para plantar, se termina la poda y arrancan los primeros
            brotes. Esto es lo que conviene revisar ahora.
          </p>

          <h2 className="pt-2 font-[var(--font-heading)] text-2xl text-[var(--color-forest-dark)]">
            Últimos días para plantar a raíz desnuda
          </h2>
          <p>
            Si todavía tienes pensado agregar rosales nuevos al jardín, esta es la recta final de la
            temporada de reposo invernal, la mejor ventana para plantar. Una vez que la planta retoma su
            crecimiento activo, trasplantar se vuelve más delicado. Si estás por decidir qué variedad
            agregar, revisa{" "}
            <Link href="/guias/como-elegir-un-rosal" className="text-[var(--color-forest)] underline">
              cómo elegir el rosal ideal para tu espacio
            </Link>{" "}
            y{" "}
            <Link href="/rosales" className="text-[var(--color-forest)] underline">
              nuestro catálogo disponible
            </Link>
            , o el detalle completo en{" "}
            <Link href="/guias/como-plantar-un-rosal" className="text-[var(--color-forest)] underline">
              cómo plantar un rosal
            </Link>
            .
          </p>

          <h2 className="pt-2 font-[var(--font-heading)] text-2xl text-[var(--color-forest-dark)]">
            ¿Ya podaste?
          </h2>
          <p>
            Si todavía no le hiciste la poda de invierno a tus rosales existentes, es el último momento para
            hacerla antes de que la planta invierta toda su energía en los brotes nuevos. Repasa{" "}
            <Link href="/guias/cuando-podar-rosales" className="text-[var(--color-forest)] underline">
              cuándo y cómo podar
            </Link>{" "}
            si no alcanzaste a hacerlo todavía.
          </p>

          <h2 className="pt-2 font-[var(--font-heading)] text-2xl text-[var(--color-forest-dark)]">
            Primera fertilización de la temporada
          </h2>
          <p>
            Cuando empiecen a verse los primeros brotes nuevos es el momento de la primera fertilización del
            año —antes, la planta todavía no tiene raíz activa para aprovecharla. Más detalle en{" "}
            <Link href="/guias/como-cuidar-un-rosal" className="text-[var(--color-forest)] underline">
              cómo cuidar un rosal
            </Link>
            .
          </p>

          <h2 className="pt-2 font-[var(--font-heading)] text-2xl text-[var(--color-forest-dark)]">
            Qué esperar en las próximas semanas
          </h2>
          <p>
            Con temperaturas más cálidas, los rosales entran en su etapa de mayor crecimiento del año:
            brotes nuevos, follaje fresco y las primeras flores de la temporada. Es también cuando más se
            nota si a un rosal le falta sol o riego, así que es buen momento para revisar su ubicación antes
            de que llegue el calor fuerte del verano.
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
