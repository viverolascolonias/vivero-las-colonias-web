export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-2xl ${alignClass} mb-10 md:mb-14`}>
      {eyebrow && (
        <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-earth)]">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-medium text-[var(--color-forest-dark)]">{title}</h2>
      {subtitle && <p className="mt-4 text-[var(--color-ink-soft)] leading-relaxed">{subtitle}</p>}
    </div>
  );
}
