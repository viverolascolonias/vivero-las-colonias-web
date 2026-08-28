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
      ruta="/rosales/medio-pie"
      migas={[{ label: "Inicio", href: "/" }, { label: "Rosales", href: "/rosales" }, { label: "Rosales medio pie" }]}
      subcategoria="Medio pie"
      eyebrow="Rosales medio pie"
      titulo="Rosales medio pie"
      descripcion="Rosales injertados en tronco, que aportan altura y estructura al diseño del jardín, ideales como punto focal o en hileras."
      parrafoExtra="Se obtienen injertando la variedad sobre un tronco de entre 60 y 90 cm de altura aproximadamente, de modo que la copa florece a media altura en vez de a ras de suelo, sin llegar a la altura de un rosal de pie alto tradicional."
      guiaRelacionada={{ href: "/guias/como-plantar-un-rosal", texto: "Cómo plantar correctamente un rosal recién comprado →" }}
    />
  );
}
