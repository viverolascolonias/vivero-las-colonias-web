import Container from "@/app/components/ui/Container";
import ImagenFondo from "@/app/components/ui/ImagenFondo";
import { LinkButton } from "@/app/components/ui/Button";

export default function PaisajismoTeaser() {
  return (
    <section className="relative py-28 md:py-36">
      <ImagenFondo rutaBase="images/paisajismo-teaser" alt="Paisajismo Vivero Las Colonias" variant="sand" />
      <div className="absolute inset-0 bg-[var(--color-ink)]/35" />
      <Container className="relative z-10 text-center">
        <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-cream-50)]">
          Paisajismo
        </p>
        <h2 className="text-3xl md:text-4xl font-medium text-[var(--color-cream-50)]">
          Diseñamos espacios que cobran vida
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-[var(--color-cream-100)]">
          Proyectos personalizados de diseño, instalación, mantención y asesoría.
        </p>
        <LinkButton
          href="/paisajismo"
          className="mt-8 bg-[var(--color-cream-50)] text-[var(--color-forest-dark)] hover:bg-[var(--color-cream-200)]"
        >
          Conoce nuestro servicio
        </LinkButton>
      </Container>
    </section>
  );
}
