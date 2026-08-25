import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/ui/Container";
import { GUIAS } from "@/lib/guias";

export const metadata: Metadata = {
  title: "Guías de rosales",
  description: "Guías prácticas de Vivero Las Colonias sobre cómo elegir, plantar y cuidar rosales.",
  alternates: { canonical: "/guias" },
};

export default function GuiasPage() {
  return (
    <div className="py-16 md:py-20">
      <Container>
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-earth)]">
            Aprende con nosotros
          </p>
          <h1 className="text-4xl md:text-5xl font-medium text-[var(--color-forest-dark)]">
            Guías de rosales
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[var(--color-ink-soft)] leading-relaxed">
            Lo que sabemos sobre rosales, escrito desde nuestra experiencia cultivándolos día a día.
          </p>
        </div>

        <div className="mx-auto grid max-w-2xl gap-6">
          {GUIAS.map((g) => (
            <Link
              key={g.slug}
              href={`/guias/${g.slug}`}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream-50)] p-6 transition-colors hover:border-[var(--color-forest)]"
            >
              <h2 className="font-[var(--font-heading)] text-xl text-[var(--color-forest-dark)]">
                {g.titulo}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">{g.resumen}</p>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
