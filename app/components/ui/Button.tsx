import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "light";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-[var(--color-forest)] text-[var(--color-cream-50)] hover:bg-[var(--color-forest-dark)]",
  secondary:
    "border border-[var(--color-forest)] text-[var(--color-forest)] hover:bg-[var(--color-forest)] hover:text-[var(--color-cream-50)]",
  ghost: "text-[var(--color-forest)] hover:bg-[var(--color-cream-200)]",
  // Para usar sobre fotos o fondos oscuros: fondo claro sólido, no un
  // override de color por className (con Tailwind eso no garantiza qué
  // clase gana en el CSS final).
  light: "bg-[var(--color-cream-50)] text-[var(--color-forest-dark)] hover:bg-[var(--color-cream-200)]",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-200";

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={`${BASE} ${VARIANT_CLASSES[variant]} ${className}`} {...props} />;
}

export function LinkButton({
  href,
  variant = "primary",
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={`${BASE} ${VARIANT_CLASSES[variant]} ${className}`}>
      {children}
    </Link>
  );
}
