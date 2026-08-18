import Link from "next/link";
import Image from "next/image";
import Container from "@/app/components/ui/Container";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--color-border)] bg-[var(--color-cream-100)]">
      <Container className="grid gap-10 py-14 md:grid-cols-3">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-vivero-las-colonias-verde.png"
              alt="Vivero Las Colonias"
              width={1024}
              height={1024}
              className="h-10 w-10 shrink-0"
            />
            <span className="font-[var(--font-heading)] text-xl font-medium text-[var(--color-forest-dark)]">
              Vivero Las Colonias
            </span>
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--color-ink-soft)]">
            Especialistas en rosales y variedades poco comunes. Plantas, árboles y paisajismo, con
            asesoría personalizada en cada etapa.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-earth)]">
            Explorar
          </h3>
          <ul className="space-y-2.5 text-sm text-[var(--color-ink)]">
            <li><Link href="/rosales" className="hover:text-[var(--color-forest)]">Rosales</Link></li>
            <li><Link href="/plantas" className="hover:text-[var(--color-forest)]">Plantas</Link></li>
            <li><Link href="/paisajismo" className="hover:text-[var(--color-forest)]">Paisajismo</Link></li>
            <li><Link href="/nosotros" className="hover:text-[var(--color-forest)]">Nosotros</Link></li>
            <li><Link href="/contacto" className="hover:text-[var(--color-forest)]">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-earth)]">
            Contacto
          </h3>
          <ul className="space-y-2.5 text-sm text-[var(--color-ink)]">
            <li>
              <a
                href="https://wa.me/56923652575"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-forest)]"
              >
                +56 9 2365 2575
              </a>
            </li>
            <li>
              <a href="mailto:contacto@viverolascolonias.cl" className="hover:text-[var(--color-forest)]">
                contacto@viverolascolonias.cl
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/viverolascoloniaschile"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-forest)]"
              >
                @viverolascoloniaschile
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-[var(--color-border)] py-6">
        <Container>
          <p className="text-xs text-[var(--color-ink-soft)]">
            © {new Date().getFullYear()} Vivero Las Colonias. Todos los derechos reservados.
          </p>
        </Container>
      </div>
    </footer>
  );
}
