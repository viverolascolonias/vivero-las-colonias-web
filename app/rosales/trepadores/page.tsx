import type { Metadata } from "next";
import CategoriaRosalSeccion from "@/app/components/catalogo/CategoriaRosalSeccion";

export const metadata: Metadata = {
  title: "Rosales trepadores",
  description:
    "Rosales trepadores en Chile: variedades vigorosas para muros, pérgolas y cercos. Catálogo con disponibilidad y despacho de Vivero Las Colonias.",
  alternates: { canonical: "/rosales/trepadores" },
};

export default function RosalesTrepadoresPage() {
  return (
    <CategoriaRosalSeccion
      subcategoria="Trepadora"
      eyebrow="Rosales trepadores"
      titulo="Rosales trepadores"
      descripcion="Rosales de crecimiento vigoroso, pensados para cubrir muros, pérgolas, cercos y estructuras verticales del jardín."
      guiaRelacionada={{ href: "/guias/cuando-podar-rosales", texto: "Cómo y cuándo podar un rosal trepador →" }}
    />
  );
}
