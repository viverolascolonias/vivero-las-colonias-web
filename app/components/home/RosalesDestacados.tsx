import Container from "@/app/components/ui/Container";
import SectionHeading from "@/app/components/ui/SectionHeading";
import GridProductos from "@/app/components/catalogo/GridProductos";
import { LinkButton } from "@/app/components/ui/Button";
import { getRosalesDestacados } from "@/lib/productos";

export default function RosalesDestacados() {
  const destacados = getRosalesDestacados(4);

  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Nuestra especialidad"
          title="Nuestros Rosales"
          subtitle="Una muestra de nuestras variedades, incluyendo algunas poco comunes."
        />
        <GridProductos productos={destacados} />
        <div className="mt-12 text-center">
          <LinkButton href="/rosales" variant="secondary">
            Ver todos los rosales
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
