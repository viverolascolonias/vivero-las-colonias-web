import type { Metadata } from "next";
import Container from "@/app/components/ui/Container";
import WhatsAppButton from "@/app/components/ui/WhatsAppButton";
import ContactoForm from "@/app/components/contacto/ContactoForm";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import { SITE_ADDRESS, HORARIO_CONTACTO, NOTA_ATENCION_PRESENCIAL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Visítanos en el vivero en Paine, Región Metropolitana, con cita previa, o coordina despacho a otras regiones de Chile. Escríbenos por WhatsApp o Instagram.",
  alternates: { canonical: "/contacto" },
};

const DIRECCION_COMPLETA = `${SITE_ADDRESS.streetAddress}, ${SITE_ADDRESS.addressLocality}, ${SITE_ADDRESS.addressRegion}, Chile`;
const MAPS_HREF = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(DIRECCION_COMPLETA)}`;

export default function ContactoPage() {
  return (
    <div className="py-16 md:py-20">
      <Container>
        <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Contacto" }]} />
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-earth)]">
            Hablemos
          </p>
          <h1 className="text-4xl md:text-5xl font-medium text-[var(--color-forest-dark)]">Contacto</h1>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-cream-200)] text-[var(--color-forest-dark)]">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path
                    d="M12 21s-6.5-5.6-6.5-10.5A6.5 6.5 0 0 1 12 4a6.5 6.5 0 0 1 6.5 6.5C18.5 15.4 12 21 12 21Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="10.5" r="2.2" />
                </svg>
              </div>
              <div>
                <h2 className="font-[var(--font-heading)] text-lg text-[var(--color-forest-dark)]">
                  Visita al vivero
                </h2>
                <p className="text-sm text-[var(--color-ink-soft)]">
                  {SITE_ADDRESS.streetAddress}
                  <br />
                  {SITE_ADDRESS.addressLocality}, {SITE_ADDRESS.addressRegion}
                </p>
                <a
                  href={MAPS_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm font-medium text-[var(--color-forest)] hover:underline"
                >
                  Ver en Google Maps →
                </a>
                <p className="mt-3 text-sm font-medium text-[var(--color-forest-dark)]">
                  Atención presencial solo con cita previa
                </p>
                <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
                  {NOTA_ATENCION_PRESENCIAL}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-cream-200)] text-[var(--color-forest-dark)]">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path
                    d="M7 3.5h2.2l1.2 4-2 1.4a10 10 0 0 0 4.7 4.7l1.4-2 4 1.2V15a2 2 0 0 1-2 2C10.6 17 4.9 11.3 4.9 5.5a2 2 0 0 1 2-2z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h2 className="font-[var(--font-heading)] text-lg text-[var(--color-forest-dark)]">WhatsApp</h2>
                <p className="text-sm text-[var(--color-ink-soft)]">+56 9 2365 2575</p>
                <p className="mt-1 text-sm text-[var(--color-ink-soft)]">Horario de contacto: {HORARIO_CONTACTO}</p>
                <WhatsAppButton className="mt-3">Escríbenos</WhatsAppButton>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-cream-200)] text-[var(--color-forest-dark)]">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
                  <path d="M4.5 6.5l7.5 6 7.5-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <h2 className="font-[var(--font-heading)] text-lg text-[var(--color-forest-dark)]">Correo</h2>
                <a
                  href="mailto:contacto@viverolascolonias.cl"
                  className="text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-forest)]"
                >
                  contacto@viverolascolonias.cl
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-cream-200)] text-[var(--color-forest-dark)]">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17" cy="7" r="0.8" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div>
                <h2 className="font-[var(--font-heading)] text-lg text-[var(--color-forest-dark)]">Instagram</h2>
                <a
                  href="https://instagram.com/viverolascoloniaschile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-forest)]"
                >
                  @viverolascoloniaschile
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream-50)] p-6 md:p-8">
            <h2 className="mb-5 font-[var(--font-heading)] text-lg text-[var(--color-forest-dark)]">
              Déjanos un mensaje
            </h2>
            <ContactoForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
