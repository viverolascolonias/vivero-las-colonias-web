import { linkWhatsApp } from "@/lib/whatsapp";

export default function WhatsAppButton({
  mensaje = "Hola, me gustaría más información sobre sus rosales.",
  className = "",
  children = "Escríbenos por WhatsApp",
}: {
  mensaje?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const href = linkWhatsApp(mensaje);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-forest)] px-6 py-3 text-sm font-medium text-[var(--color-cream-50)] tracking-wide transition-colors duration-200 hover:bg-[var(--color-forest-dark)] ${className}`}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.51 2 12.04 2zm5.8 14.1c-.24.68-1.4 1.3-1.93 1.36-.5.06-1.02.27-3.42-.71-2.9-1.18-4.76-4.1-4.9-4.29-.14-.19-1.17-1.56-1.17-2.97 0-1.41.74-2.1 1-2.39.26-.28.57-.35.76-.35h.55c.18 0 .42-.07.65.5.24.58.8 2 .87 2.15.07.14.12.31.02.5-.1.19-.15.31-.3.48-.14.17-.3.37-.43.5-.14.14-.29.29-.13.57.17.28.75 1.24 1.61 2.01 1.1.99 2.03 1.29 2.31 1.44.28.14.44.12.6-.07.17-.19.72-.84.91-1.12.19-.29.38-.24.64-.14.26.09 1.66.79 1.94.93.28.14.47.21.53.33.07.12.07.68-.17 1.36z" />
      </svg>
      {children}
    </a>
  );
}
