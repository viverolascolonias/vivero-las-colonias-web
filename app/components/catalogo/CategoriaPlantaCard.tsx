import Link from "next/link";
import ImagenBloque from "@/app/components/ui/ImagenBloque";
import Badge from "@/app/components/ui/Badge";

const VARIANTES = ["olive", "sand", "sage"] as const;

export default function CategoriaPlantaCard({
  valor,
  label,
  descripcion,
  href,
  cantidad,
  indice = 0,
}: {
  valor: string;
  label: string;
  descripcion: string;
  href: string;
  cantidad: number;
  indice?: number;
}) {
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream-50)] transition-shadow hover:shadow-lg hover:shadow-[var(--color-forest)]/10"
    >
      <ImagenBloque
        rutaBase={`images/plantas/${valor.toLowerCase()}`}
        alt={label}
        variant={VARIANTES[indice % VARIANTES.length]}
        className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div className="p-5">
        <div className="mb-2">
          {cantidad > 0 ? (
            <Badge tone="sage">
              {cantidad} {cantidad === 1 ? "variedad" : "variedades"}
            </Badge>
          ) : (
            <Badge tone="outline" className="normal-case">
              Próximamente
            </Badge>
          )}
        </div>
        <h3 className="font-[var(--font-heading)] text-lg text-[var(--color-forest-dark)]">{label}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-ink-soft)]">{descripcion}</p>
      </div>
    </Link>
  );
}
