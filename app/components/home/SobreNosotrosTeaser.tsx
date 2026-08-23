import Container from "@/app/components/ui/Container";
import ImagenBloque from "@/app/components/ui/ImagenBloque";
import { LinkButton } from "@/app/components/ui/Button";

export default function SobreNosotrosTeaser() {
  return (
    <section className="py-20 md:py-28">
      <Container className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-earth)]">
            Sobre Vivero Las Colonias
          </p>
          <h2 className="text-3xl md:text-4xl font-medium text-[var(--color-forest-dark)]">
            No solo vendemos plantas
          </h2>
          <p className="mt-5 leading-relaxed text-[var(--color-ink-soft)]">
            Entregamos conocimiento, asesoría y acompañamiento a nuestros clientes en cada etapa: desde
            elegir la variedad correcta hasta ver el jardín florecer.
          </p>
          <LinkButton href="/nosotros" variant="secondary" className="mt-7">
            Conócenos
          </LinkButton>
        </div>
        <ImagenBloque
          rutaBase="images/nosotros-teaser"
          alt="Trabajador de Vivero Las Colonias caminando entre hileras de rosales en flor"
          variant="olive"
          className="aspect-[4/5] w-full rounded-2xl"
          imgClassName="object-[64%_center]"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </Container>
    </section>
  );
}
