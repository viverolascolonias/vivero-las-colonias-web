import type { Metadata } from "next";
import CategoriaRosalSeccion from "@/app/components/catalogo/CategoriaRosalSeccion";
import Container from "@/app/components/ui/Container";
import JsonLd from "@/app/components/ui/JsonLd";
import { faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Rosales en Chile — Arbustivos, trepadores y medio pie",
  description:
    "Compra rosales online en Chile: más de 40 variedades entre arbustivos, trepadores y medio pie, cultivadas por Vivero Las Colonias. Consulta disponibilidad y despacho.",
  alternates: { canonical: "/rosales" },
};

// Confirmado por el negocio: sí venden a raíz desnuda, pero solo durante la
// temporada de invernación del rosal -- nunca afirmar disponibilidad todo
// el año. Vive acá (no en CategoriaRosalSeccion) porque es información del
// catálogo general, no específica de una forma de cultivo.
const FAQ = [
  {
    pregunta: "¿Venden rosales a raíz desnuda?",
    respuesta:
      "Sí, pero solo durante la temporada de invernación del rosal (reposo invernal), cuando la planta no tiene hojas activas -- no es una forma de venta disponible todo el año. Revisa nuestra guía de cómo plantar un rosal para más detalle sobre esta forma de venta y cuándo corresponde.",
  },
];

export default function RosalesPage() {
  return (
    <>
      <CategoriaRosalSeccion
        ruta="/rosales"
        migas={[{ label: "Inicio", href: "/" }, { label: "Rosales" }]}
        eyebrow="Nuestra especialidad"
        titulo="Rosales"
        descripcion="Variedades cultivadas y seleccionadas por Vivero Las Colonias, desde clásicas hasta poco comunes."
        guiaRelacionada={{ href: "/guias/como-elegir-un-rosal", texto: "¿No sabes cuál elegir? Te ayudamos a decidir →" }}
      />

      <JsonLd data={faqJsonLd(FAQ)} />
      <Container className="max-w-2xl pb-16 md:pb-20">
        <h2 className="mb-5 text-xl font-medium text-[var(--color-forest-dark)]">Preguntas frecuentes</h2>
        <dl className="space-y-5">
          {FAQ.map((f) => (
            <div key={f.pregunta}>
              <dt className="font-medium text-[var(--color-forest-dark)]">{f.pregunta}</dt>
              <dd className="mt-1 text-sm text-[var(--color-ink-soft)] leading-relaxed">{f.respuesta}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </>
  );
}
