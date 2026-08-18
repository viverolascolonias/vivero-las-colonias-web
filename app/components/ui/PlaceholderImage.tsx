// Marcador visual botánico mientras no tenemos fotografías reales del
// vivero. Pensado para reemplazarse 1:1 por <Image> apenas existan los
// activos — mantiene la misma proporción y esquina redondeada que usará
// la foto real.
export default function PlaceholderImage({
  className = "",
  variant = "olive",
}: {
  className?: string;
  variant?: "olive" | "sand" | "sage";
}) {
  const gradientes: Record<string, string> = {
    olive: "from-[var(--color-olive)]/25 via-[var(--color-cream-200)] to-[var(--color-sage)]/20",
    sand: "from-[var(--color-sand)]/30 via-[var(--color-cream-200)] to-[var(--color-earth)]/15",
    sage: "from-[var(--color-sage)]/30 via-[var(--color-cream-100)] to-[var(--color-moss)]/20",
  };

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${gradientes[variant]} ${className}`}
    >
      <svg
        viewBox="0 0 64 64"
        width="34%"
        height="34%"
        className="text-[var(--color-forest)]/30"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <path d="M32 8c6 0 11 5 11 11 0 8-11 16-11 16S21 27 21 19c0-6 5-11 11-11z" />
        <circle cx="32" cy="19" r="4.5" />
        <path d="M32 35v21M32 44c-6 0-10-4-10-4M32 50c6 0 10-4 10-4" />
      </svg>
    </div>
  );
}
