import Link from "next/link";
import { SITE_URL } from "@/lib/seo";

export type MigaPan = { label: string; href?: string };

// Breadcrumb visible + su propio BreadcrumbList (JSON-LD) -- generado acá
// mismo a partir de las mismas migas, para que nunca queden desalineados.
export default function Breadcrumbs({ items }: { items: MigaPan[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Miga de pan" className="mb-6 text-xs text-[var(--color-ink-soft)]">
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-1.5">
              {item.href ? (
                <Link href={item.href} className="hover:text-[var(--color-forest)]">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-[var(--color-ink)]">
                  {item.label}
                </span>
              )}
              {i < items.length - 1 && <span aria-hidden="true">/</span>}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
