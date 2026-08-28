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
      ruta="/rosales/arbustivos"
      migas={[{ label: "Inicio", href: "/" }, { label: "Rosales", href: "/rosales" }, { label: "Rosales arbustivos" }]}
      subcategoria="Arbustiva baja"
      eyebrow="Rosales arbustivos"
      titulo="Rosales arbustivos"
      descripcion="Rosales de porte bajo y floración abundante, ideales para macizos, bordes y jardines de cualquier tamaño."
      parrafoExtra="Crecen como un arbusto compacto, entre 40 y 80 cm de altura según la variedad, sin necesitar guía ni soporte: es la forma de cultivo más versátil para macizos, bordes de camino o cualquier jardín sin estructura vertical."
      guiaRelacionada={{ href: "/guias/tipos-de-rosales", texto: "¿Dudas entre arbustivo, trepador o medio pie? Revisa las diferencias →" }}
    />
  );
}
