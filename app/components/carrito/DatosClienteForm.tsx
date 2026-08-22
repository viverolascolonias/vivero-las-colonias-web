"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/Button";
import { regionPorComuna } from "@/lib/comunas";
import {
  guardarDatosCliente,
  LABEL_TIPO_ENTREGA,
  type DatosClienteWeb,
  type TipoEntregaWeb,
} from "@/lib/pedidoWeb";

const CAMPO =
  "w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-cream-50)] px-4 py-2.5 text-sm outline-none focus:border-[var(--color-forest)]";
const LABEL = "mb-1.5 block text-sm text-[var(--color-ink-soft)]";

const VACIO: DatosClienteWeb = {
  nombre: "",
  telefono: "",
  email: "",
  region: "",
  comuna: "",
  tipoEntrega: "despacho",
  direccion: "",
  empresaTransporte: "",
  sucursal: "",
};

// Datos de contacto y entrega antes de enviar el pedido por WhatsApp. Sigue
// el mismo patrón que ContactoForm (formulario simple, sin backend propio),
// pero acá los datos se guardan en localStorage para no pedirlos de nuevo
// la próxima vez que la persona compre.
export default function DatosClienteForm({
  valorInicial,
  onCompletado,
}: {
  valorInicial: DatosClienteWeb | null;
  onCompletado: (datos: DatosClienteWeb) => void;
}) {
  const [datos, setDatos] = useState<DatosClienteWeb>(valorInicial ?? VACIO);

  function actualizarComuna(comuna: string) {
    setDatos((prev) => ({ ...prev, comuna, region: regionPorComuna(comuna) ?? prev.region }));
  }

  const puedeContinuar =
    datos.nombre.trim() !== "" &&
    datos.telefono.trim() !== "" &&
    datos.comuna.trim() !== "" &&
    (datos.tipoEntrega !== "despacho" || datos.direccion?.trim()) &&
    (datos.tipoEntrega !== "retiro" || datos.sucursal?.trim()) &&
    (datos.tipoEntrega !== "transporte" || (datos.empresaTransporte?.trim() && datos.sucursal?.trim()));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!puedeContinuar) return;
    guardarDatosCliente(datos);
    onCompletado(datos);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={LABEL} htmlFor="nombre">
            Nombre completo
          </label>
          <input
            id="nombre"
            required
            value={datos.nombre}
            onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
            className={CAMPO}
            placeholder="Tu nombre"
          />
        </div>
        <div>
          <label className={LABEL} htmlFor="telefono">
            Teléfono
          </label>
          <input
            id="telefono"
            required
            inputMode="tel"
            value={datos.telefono}
            onChange={(e) => setDatos({ ...datos, telefono: e.target.value })}
            className={CAMPO}
            placeholder="+56 9 1234 5678"
          />
        </div>
        <div>
          <label className={LABEL} htmlFor="email">
            Correo (opcional)
          </label>
          <input
            id="email"
            type="email"
            value={datos.email}
            onChange={(e) => setDatos({ ...datos, email: e.target.value })}
            className={CAMPO}
          />
        </div>
        <div>
          <label className={LABEL} htmlFor="comuna">
            Comuna
          </label>
          <input
            id="comuna"
            required
            value={datos.comuna}
            onChange={(e) => actualizarComuna(e.target.value)}
            className={CAMPO}
            placeholder="Ej: Providencia"
          />
        </div>
        <div>
          <label className={LABEL} htmlFor="region">
            Región
          </label>
          <input
            id="region"
            value={datos.region}
            onChange={(e) => setDatos({ ...datos, region: e.target.value })}
            className={CAMPO}
            placeholder="Se completa según la comuna"
          />
        </div>
        <div>
          <label className={LABEL} htmlFor="tipoEntrega">
            Tipo de entrega
          </label>
          <select
            id="tipoEntrega"
            value={datos.tipoEntrega}
            onChange={(e) => setDatos({ ...datos, tipoEntrega: e.target.value as TipoEntregaWeb })}
            className={CAMPO}
          >
            {(Object.keys(LABEL_TIPO_ENTREGA) as TipoEntregaWeb[]).map((valor) => (
              <option key={valor} value={valor}>
                {LABEL_TIPO_ENTREGA[valor]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {datos.tipoEntrega === "despacho" && (
        <div>
          <label className={LABEL} htmlFor="direccion">
            Dirección de despacho
          </label>
          <input
            id="direccion"
            required
            value={datos.direccion}
            onChange={(e) => setDatos({ ...datos, direccion: e.target.value })}
            className={CAMPO}
            placeholder="Calle, número, depto/casa"
          />
        </div>
      )}

      {datos.tipoEntrega === "retiro" && (
        <div>
          <label className={LABEL} htmlFor="sucursalRetiro">
            Sucursal de retiro
          </label>
          <input
            id="sucursalRetiro"
            required
            value={datos.sucursal}
            onChange={(e) => setDatos({ ...datos, sucursal: e.target.value })}
            className={CAMPO}
          />
        </div>
      )}

      {datos.tipoEntrega === "transporte" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={LABEL} htmlFor="empresaTransporte">
              Empresa de transporte
            </label>
            <input
              id="empresaTransporte"
              required
              value={datos.empresaTransporte}
              onChange={(e) => setDatos({ ...datos, empresaTransporte: e.target.value })}
              className={CAMPO}
            />
          </div>
          <div>
            <label className={LABEL} htmlFor="sucursalTransporte">
              Sucursal de destino
            </label>
            <input
              id="sucursalTransporte"
              required
              value={datos.sucursal}
              onChange={(e) => setDatos({ ...datos, sucursal: e.target.value })}
              className={CAMPO}
            />
          </div>
        </div>
      )}

      <Button type="submit" disabled={!puedeContinuar} className="w-full disabled:opacity-50">
        Continuar
      </Button>
    </form>
  );
}
