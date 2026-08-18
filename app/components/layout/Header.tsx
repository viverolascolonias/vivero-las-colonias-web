"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Container from "@/app/components/ui/Container";
import { useCarrito } from "@/app/components/carrito/CarritoContext";

const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/rosales", label: "Rosales" },
  { href: "/plantas", label: "Plantas" },
  { href: "/paisajismo", label: "Paisajismo" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export default function Header() {
  const [abierto, setAbierto] = useState(false);
  const { cantidadTotal } = useCarrito();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-cream-50)]/90 backdrop-blur">
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 md:gap-3 min-w-0" aria-label="Vivero Las Colonias — Inicio">
          <Image
            src="/logo-vivero-las-colonias-verde.png"
            alt="Vivero Las Colonias"
            width={1024}
            height={1024}
            priority
            className="h-9 w-9 md:h-14 md:w-14 shrink-0"
          />
          <span className="flex min-w-0 flex-col leading-none">
            <span className="font-[var(--font-heading)] text-base md:text-xl font-medium text-[var(--color-forest-dark)] whitespace-nowrap">
              Vivero Las Colonias
            </span>
            <span className="mt-1 text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.25em] uppercase text-[var(--color-ink-soft)] whitespace-nowrap">
              Rosales &amp; Paisajismo
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-[var(--color-ink)] hover:text-[var(--color-forest)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/carrito"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-forest-dark)] hover:bg-[var(--color-cream-200)]"
            aria-label="Ver carrito"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L20 8H6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="10" cy="21" r="1.2" />
              <circle cx="17" cy="21" r="1.2" />
            </svg>
            {cantidadTotal > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-earth)] text-[10px] font-medium text-[var(--color-cream-50)]">
                {cantidadTotal}
              </span>
            )}
          </Link>

          <button
            type="button"
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-forest-dark)]"
            aria-label="Abrir menú"
            onClick={() => setAbierto((v) => !v)}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
              {abierto ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {abierto && (
        <nav className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-cream-50)]">
          <Container className="flex flex-col py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setAbierto(false)}
                className="py-3 text-sm text-[var(--color-ink)] border-b border-[var(--color-border)] last:border-none"
              >
                {item.label}
              </Link>
            ))}
          </Container>
        </nav>
      )}
    </header>
  );
}
