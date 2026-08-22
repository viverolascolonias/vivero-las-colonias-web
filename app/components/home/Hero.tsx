import ImagenFondo from "@/app/components/ui/ImagenFondo";
import { LinkButton } from "@/app/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative flex h-[86vh] min-h-[560px] items-center justify-center overflow-hidden">
      <ImagenFondo rutaBase="images/hero-inicio" alt="Vivero Las Colonias" variant="olive" priority />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/45 via-[var(--color-ink)]/10 to-transparent" />

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <p className="mb-4 text-xs font-medium tracking-[0.3em] uppercase text-[var(--color-cream-50)]">
          Rosales, plantas y paisajismo
        </p>
        <h1 className="font-[var(--font-heading)] text-5xl md:text-6xl italic text-[var(--color-cream-50)]">
          Vivero Las Colonias
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-[var(--color-cream-100)]">
          Rosales, plantas y vida para crear espacios únicos.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <LinkButton href="/rosales" className="shadow-lg shadow-black/30">
            Ver rosales
          </LinkButton>
          <LinkButton
            href="/plantas"
            variant="secondary"
            className="border-[var(--color-cream-50)]/80 bg-[var(--color-cream-50)]/90 text-[var(--color-forest-dark)] shadow-lg shadow-black/20 backdrop-blur-sm hover:border-[var(--color-forest-dark)] hover:bg-[var(--color-forest-dark)] hover:text-[var(--color-cream-50)]"
          >
            Ver plantas
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
