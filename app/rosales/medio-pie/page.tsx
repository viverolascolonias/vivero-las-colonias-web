import type { Metadata } from "next";
import CategoriaRosalSeccion from "@/app/components/catalogo/CategoriaRosalSeccion";

export const metadata: Metadata = {
  title: "Rosales medio pie",
  description:
    "Rosales medio pie en Chile: injertados en tronco, aportan altura y estructura al jardín. Catálogo con disponibilidad y despacho de Vivero Las Colonias.",
  alternates: { canonical: "/rosales/medio-pie" },
};

export default function RosalesMedioPiePage() {
  return (
    <CategoriaRosalSeccion
      subcategoria="Medio pie"
      eyebrow="Rosales medio pie"
      titulo="Rosales medio pie"
      descripcion="Rosales injertados en tronco, que aportan altura y estructura al diseño del jardín, ideales como punto focal o en hileras."
      guiaRelacionada={{ href: "/guias/como-plantar-un-rosal", texto: "Cómo plantar correctamente un rosal recién comprado →" }}
    />
  );
}
