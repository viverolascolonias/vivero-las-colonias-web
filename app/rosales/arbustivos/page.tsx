import type { Metadata } from "next";
import CategoriaRosalSeccion from "@/app/components/catalogo/CategoriaRosalSeccion";

export const metadata: Metadata = {
  title: "Rosales arbustivos",
  description:
    "Rosales arbustivos en Chile: variedades de porte bajo, ideales para macizos y bordes de jardín. Catálogo con disponibilidad y despacho de Vivero Las Colonias.",
  alternates: { canonical: "/rosales/arbustivos" },
};

export default function RosalesArbustivosPage() {
  return (
    <CategoriaRosalSeccion
      subcategoria="Arbustiva baja"
      eyebrow="Rosales arbustivos"
      titulo="Rosales arbustivos"
      descripcion="Rosales de porte bajo y floración abundante, ideales para macizos, bordes y jardines de cualquier tamaño."
    />
  );
}
