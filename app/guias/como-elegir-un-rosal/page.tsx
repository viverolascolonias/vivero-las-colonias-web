import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/ui/Container";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import JsonLd from "@/app/components/ui/JsonLd";
import { articleJsonLd } from "@/lib/seo";
import { GUIAS } from "@/lib/guias";

const GUIA = GUIAS.find((g) => g.slug === "como-elegir-un-rosal")!;

export const metadata: Metadata = {
  title: GUIA.titulo,
  description: GUIA.resumen,
  alternates: { canonical: `/guias/${GUIA.slug}` },
};

export default function ComoElegirUnRosalPage() {
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

      <Container className="max-w-2xl">
        <Breadcrumbs
          items={[{ label: "Inicio", href: "/" }, { label: "Guías", href: "/guias" }, { label: GUIA.titulo }]}
        />

        <h1 className="text-3xl md:text-4xl font-medium text-[var(--color-forest-dark)]">{GUIA.titulo}</h1>

        <div className="mt-8 space-y-6 leading-relaxed text-[var(--color-ink)]">
          <p>
            Con más de 40 variedades en catálogo, la pregunta que más nos hacen no es "qué rosal es más
            lindo" sino "cuál me sirve para mi espacio". Estas son las preguntas que realmente ayudan a
            decidir.
          </p>

          <h2 className="pt-2 font-[var(--font-heading)] text-2xl text-[var(--color-forest-dark)]">
            1. ¿Qué espacio tienes?
          </h2>
          <p>
            Es la pregunta que más determina la elección. Si buscas cubrir bordes, macizos o cualquier
            jardín sin estructura vertical, un{" "}
            <Link href="/rosales/arbustivos" className="text-[var(--color-forest)] underline">
              rosal arbustivo
            </Link>{" "}
            es la opción más versátil. Si tienes un muro, pérgola o cerco que quieres cubrir con floración,
            necesitas un{" "}
            <Link href="/rosales/trepadores" className="text-[var(--color-forest)] underline">
              rosal trepador
            </Link>
            . Si quieres un punto focal con altura sin llegar a un árbol, un{" "}
            <Link href="/rosales/medio-pie" className="text-[var(--color-forest)] underline">
              rosal medio pie
            </Link>{" "}
            aporta esa estructura vertical sin ocupar tanto espacio en el suelo. Puedes revisar la{" "}
            <Link href="/guias/tipos-de-rosales" className="text-[var(--color-forest)] underline">
              comparación completa entre los tres tipos
            </Link>
            .
          </p>

          <h2 className="pt-2 font-[var(--font-heading)] text-2xl text-[var(--color-forest-dark)]">
            2. ¿Qué color buscas?
          </h2>
          <p>
            Nuestro catálogo cubre prácticamente toda la paleta: desde tonos clásicos como el blanco de{" "}
            <Link href="/rosales/copito-de-nieve-arbustiva-baja" className="text-[var(--color-forest)] underline">
              Copito de Nieve
            </Link>{" "}
            o el amarillo de{" "}
            <Link href="/rosales/amarilla-boton-arbustiva-baja" className="text-[var(--color-forest)] underline">
              Amarilla Botón
            </Link>
            , hasta tonos más intensos como el púrpura de{" "}
            <Link href="/rosales/big-purple-arbustiva-baja" className="text-[var(--color-forest)] underline">
              Big Purple
            </Link>{" "}
            o el naranja albaricoque de{" "}
            <Link href="/rosales/angelica-arbustiva-baja" className="text-[var(--color-forest)] underline">
              Angélica
            </Link>
            . Cada ficha de variedad indica su color confirmado, así que puedes filtrar visualmente
            recorriendo{" "}
            <Link href="/rosales" className="text-[var(--color-forest)] underline">
              el catálogo completo
            </Link>
            .
          </p>

          <h2 className="pt-2 font-[var(--font-heading)] text-2xl text-[var(--color-forest-dark)]">
            3. ¿Te importa el aroma?
          </h2>
          <p>
            No todas las variedades de rosal son igual de aromáticas —algunas priorizan tamaño y color de
            flor por sobre el perfume. Si el aroma es importante para ti, revisa el dato de "aromática /
            no aromática" en cada ficha antes de comprar: variedades como{" "}
            <Link href="/rosales/oklahoma-arbustiva-baja" className="text-[var(--color-forest)] underline">
              Oklahoma
            </Link>{" "}
            o{" "}
            <Link href="/rosales/big-purple-arbustiva-baja" className="text-[var(--color-forest)] underline">
              Big Purple
            </Link>{" "}
            están confirmadas como aromáticas.
          </p>

          <h2 className="pt-2 font-[var(--font-heading)] text-2xl text-[var(--color-forest-dark)]">
            4. ¿Cuánta mantención quieres darle?
          </h2>
          <p>
            Todos los rosales piden sol directo y riego regular, pero el tiempo real de mantención depende
            más de la forma de cultivo que de la variedad: un arbustivo es la opción más simple de mantener,
            un trepador exige guiarlo sobre su soporte a medida que crece, y un medio pie necesita revisar
            que el punto de injerto se mantenga sano con los años. Revisa nuestra guía de{" "}
            <Link href="/guias/como-cuidar-un-rosal" className="text-[var(--color-forest)] underline">
              cuidados generales
            </Link>{" "}
            para más detalle.
          </p>

          <p>
            Con estas cuatro respuestas ya puedes filtrar bastante el catálogo. Si igual tienes dudas,{" "}
            <Link href="/contacto" className="text-[var(--color-forest)] underline">
              escríbenos
            </Link>{" "}
            y te ayudamos a elegir.
          </p>
        </div>
      </Container>
    </div>
  );
}
