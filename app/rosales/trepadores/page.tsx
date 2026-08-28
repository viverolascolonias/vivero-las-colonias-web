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
      ruta="/rosales/trepadores"
      migas={[{ label: "Inicio", href: "/" }, { label: "Rosales", href: "/rosales" }, { label: "Rosales trepadores" }]}
      subcategoria="Trepadora"
      eyebrow="Rosales trepadores"
      titulo="Rosales trepadores"
      descripcion="Rosales de crecimiento vigoroso, pensados para cubrir muros, pérgolas, cercos y estructuras verticales del jardín."
      parrafoExtra="Desarrollan tallos largos y flexibles que no se sostienen solos: hay que guiarlos y atarlos sobre la estructura que quieras cubrir. Es la opción indicada cuando se busca floración sobre una superficie vertical, no solo color en un macizo."
      guiaRelacionada={{ href: "/guias/cuando-podar-rosales", texto: "Cómo y cuándo podar un rosal trepador →" }}
    />
  );
}
