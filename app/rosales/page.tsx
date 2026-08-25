import type { Metadata } from "next";
import CategoriaRosalSeccion from "@/app/components/catalogo/CategoriaRosalSeccion";

export const metadata: Metadata = {
  title: "Rosales en Chile — Arbustivos, trepadores y medio pie",
  description:
    "Compra rosales online en Chile: más de 40 variedades entre arbustivos, trepadores y medio pie, cultivadas por Vivero Las Colonias. Consulta disponibilidad y despacho.",
  alternates: { canonical: "/rosales" },
};

export default function RosalesPage() {
  return (
    <CategoriaRosalSeccion
      eyebrow="Nuestra especialidad"
      titulo="Rosales"
      descripcion="Variedades cultivadas y seleccionadas por Vivero Las Colonias, desde clásicas hasta poco comunes."
      guiaRelacionada={{ href: "/guias/como-elegir-un-rosal", texto: "¿No sabes cuál elegir? Te ayudamos a decidir →" }}
    />
  );
}
