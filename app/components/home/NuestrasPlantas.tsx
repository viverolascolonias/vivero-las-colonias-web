import Container from "@/app/components/ui/Container";
import SectionHeading from "@/app/components/ui/SectionHeading";
import CategoriaPlantaCard from "@/app/components/catalogo/CategoriaPlantaCard";
import { LinkButton } from "@/app/components/ui/Button";
import { CATEGORIAS_PLANTAS, getPlantas } from "@/lib/productos";

export default function NuestrasPlantas() {
  const plantas = getPlantas();

  return (
    <section className="bg-[var(--color-cream-100)] py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Nuestro catálogo"
          title="Plantas para tu espacio"
          subtitle="Ornamentales, árboles, arbustos y plantas de interior — tan parte de Vivero Las Colonias como nuestros rosales."
        />
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5 md:gap-6">
          {CATEGORIAS_PLANTAS.map((c, i) => (
            <CategoriaPlantaCard
              key={c.valor}
              valor={c.valor}
              label={c.label}
              descripcion={c.descripcion}
              href={`/plantas?categoria=${c.valor}`}
              cantidad={plantas.filter((p) => p.categoria === c.valor).length}
              indice={i}
            />
          ))}
        </div>
        <div className="mt-12 text-center">
          <LinkButton href="/plantas" variant="secondary">
            Ver plantas
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
