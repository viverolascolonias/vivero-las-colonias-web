import Container from "@/app/components/ui/Container";
import PlaceholderImage from "@/app/components/ui/PlaceholderImage";

const VARIANTES = ["olive", "sand", "sage", "olive", "sand", "sage"] as const;

export default function InstagramFeed() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-earth)]">
            Síguenos
          </p>
          <h2 className="text-3xl md:text-4xl font-medium text-[var(--color-forest-dark)]">
            <a
              href="https://instagram.com/viverolascoloniaspaine"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-forest)]"
            >
              @viverolascoloniaspaine
            </a>
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
          {VARIANTES.map((v, i) => (
            <a
              key={i}
              href="https://instagram.com/viverolascoloniaspaine"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <PlaceholderImage variant={v} className="aspect-square w-full rounded-lg" />
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
