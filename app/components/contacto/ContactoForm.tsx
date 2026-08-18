"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/Button";

const WHATSAPP_NUMERO = "56923652575";

// Sin backend propio todavía: arma un mensaje de WhatsApp prellenado con lo
// que la persona escribió, para no dejar el formulario como una pantalla
// muerta mientras no exista un canal de envío real.
export default function ContactoForm() {
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");

  const puedeEnviar = nombre.trim() !== "" && mensaje.trim() !== "";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!puedeEnviar) return;
    const texto = `Hola, soy ${nombre}. ${mensaje}`;
    window.open(`https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`, "_blank");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm text-[var(--color-ink-soft)]" htmlFor="nombre">
          Nombre
        </label>
        <input
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-cream-50)] px-4 py-2.5 text-sm outline-none focus:border-[var(--color-forest)]"
          placeholder="Tu nombre"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm text-[var(--color-ink-soft)]" htmlFor="mensaje">
          Mensaje
        </label>
        <textarea
          id="mensaje"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-cream-50)] px-4 py-2.5 text-sm outline-none focus:border-[var(--color-forest)]"
          placeholder="Cuéntanos qué necesitas…"
        />
      </div>
      <Button type="submit" disabled={!puedeEnviar} className="w-full disabled:opacity-50">
        Enviar por WhatsApp
      </Button>
    </form>
  );
}
