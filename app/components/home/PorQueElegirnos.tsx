import Container from "@/app/components/ui/Container";
import SectionHeading from "@/app/components/ui/SectionHeading";

const RAZONES = [
  {
    titulo: "Especialistas en rosales",
    texto: "Conocimiento profundo de variedades clásicas y poco comunes.",
  },
  {
    titulo: "Asesoría personalizada",
    texto: "Te acompañamos a elegir lo correcto para tu espacio y clima.",
  },
  {
    titulo: "Calidad y presentación",
    texto: "Cada planta sale del vivero lista para lucir en tu jardín.",
  },
  {
    titulo: "Precios accesibles",
    texto: "Calidad premium, sin precios fuera de alcance.",
  },
];

export default function PorQueElegirnos() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow="Por qué elegirnos" title="Conocimiento, cuidado y cercanía" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {RAZONES.map((r) => (
            <div key={r.titulo} className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-sage-light)]">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--color-forest-dark)" strokeWidth="1.4">
                  <path d="M12 3c4 0 7 3 7 7 0 5-7 10-7 10S5 15 5 10c0-4 3-7 7-7z" />
                </svg>
              </div>
              <h3 className="font-[var(--font-heading)] text-lg text-[var(--color-forest-dark)]">
                {r.titulo}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">{r.texto}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
