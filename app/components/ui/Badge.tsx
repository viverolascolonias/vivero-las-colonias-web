type Tone = "sage" | "sand" | "earth" | "outline";

const TONE_CLASSES: Record<Tone, string> = {
  sage: "bg-[var(--color-sage-light)] text-[var(--color-forest-dark)]",
  sand: "bg-[var(--color-sand)]/25 text-[var(--color-earth)]",
  earth: "bg-[var(--color-earth)] text-[var(--color-cream-50)]",
  outline: "border border-[var(--color-border)] text-[var(--color-ink-soft)]",
};

export default function Badge({
  children,
  tone = "sage",
  className = "",
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase ${TONE_CLASSES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
