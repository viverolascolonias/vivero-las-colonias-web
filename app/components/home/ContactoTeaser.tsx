import Container from "@/app/components/ui/Container";
import { LinkButton } from "@/app/components/ui/Button";

const CANALES = [
  {
    label: "WhatsApp",
    valor: "+56 9 2365 2575",
    href: "https://wa.me/56923652575",
    icono: (
      <path
        d="M7 3.5h2.2l1.2 4-2 1.4a10 10 0 0 0 4.7 4.7l1.4-2 4 1.2V15a2 2 0 0 1-2 2C10.6 17 4.9 11.3 4.9 5.5a2 2 0 0 1 2-2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Correo",
    valor: "contacto@viverolascolonias.cl",
    href: "mailto:contacto@viverolascolonias.cl",
    icono: (
      <>
        <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
        <path d="M4.5 6.5l7.5 6 7.5-6" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    label: "Instagram",
    valor: "@viverolascoloniaschile",
    href: "https://instagram.com/viverolascoloniaschile",
    icono: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17" cy="7" r="0.8" fill="currentColor" stroke="none" />
      </>
    ),
  },
];

export default function ContactoTeaser() {
  return (
    <section className="pb-20 md:pb-28">
      <Container>
        <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-cream-100)] px-8 py-14 text-center">
          <h2 className="text-3xl md:text-4xl font-medium text-[var(--color-forest-dark)]">
            ¿Tienes dudas o quieres más información?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[var(--color-ink-soft)]">
            Escríbenos por WhatsApp, correo o Instagram, te asesoramos con gusto.
          </p>

          <div className="mx-auto mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
            {CANALES.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream-50)] px-4 py-5 transition-colors hover:border-[var(--color-forest)]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cream-200)] text-[var(--color-forest-dark)]">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
                    {c.icono}
                  </svg>
                </span>
                <span className="text-sm font-medium text-[var(--color-forest-dark)]">{c.label}</span>
                <span className="break-all text-xs text-[var(--color-ink-soft)]">{c.valor}</span>
              </a>
            ))}
          </div>

          <LinkButton href="/contacto" className="mt-10">
            Contáctanos
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
