// Ajustes de encuadre por variedad -- SOLO afectan cómo se recorta/posiciona
// la fotografía dentro de su contenedor cuadrado (CSS puro: object-position,
// scale, transform-origin). Nunca tocan el archivo original en /public.
//
// La mayoría de las variedades no necesita entrada acá: el recorte centrado
// por defecto (object-fit: cover, object-position: center) ya deja la flor
// bien encuadrada. Solo se agregan entradas para las fotos donde ese
// recorte por defecto dejaba la flor protagonista descentrada, cortada, o
// -- en fotos tomadas de lejos, con varias flores pequeñas -- sin ningún
// protagonismo visual.
export type AjusteEncuadre = {
  /** object-position del contenedor, ej. "50% 85%". Alcanza cuando la foto
   * ya tiene margen de recorte (no es cuadrada) y solo hay que desplazar
   * el recuadro dentro de ese margen. */
  objectPosition?: string;
  /** Factor de zoom (ej. 1.4). Necesario cuando la foto no tiene margen de
   * recorte propio (ya es cuadrada) o cuando ninguna flor individual tiene
   * presencia suficiente al recorte por defecto. Requiere `origin`. */
  scale?: number;
  /** transform-origin del zoom, ej. "45% 58%" -- el punto de la foto sobre
   * el que se centra el zoom. */
  origin?: string;
};

// Nota: las variedades Trepadora nunca llevan `scale` -- solo pueden usar
// `objectPosition` (desplaza cuál parte del recorte-mínimo-necesario se ve,
// sin recortar más de lo que exige llenar el marco cuadrado). Así se
// conserva la mayor extensión posible de la foto para apreciar cómo crece
// el rosal, en vez de hacer zoom sobre una sola flor.
export const ENCUADRES_ROSALES: Record<string, AjusteEncuadre> = {
  // Foto ya cuadrada (sin margen de recorte propio): la rosa principal
  // quedaba desplazada arriba-izquierda. Zoom centrado en la rosa del
  // frente para que quede protagonista.
  "choking-blue-arbustiva-baja": { scale: 1.4, origin: "45% 58%" },

  // El recorte centrado por defecto cortaba a la mitad la rosa superior.
  // Se desplaza el encuadre hacia el conjunto inferior, completo y nítido.
  "salmon-angy-arbustiva-baja": { objectPosition: "50% 88%" },

  // El recorte por defecto ya mostraba ambas rosas; se desplaza levemente
  // hacia abajo para que la rosa inferior (más nítida, con estambres
  // visibles) quede mejor encuadrada. Mismo total de imagen visible.
  "sevillana-trepadora": { objectPosition: "50% 68%" },

  // La flor quedaba con demasiado espacio vacío de pérgola arriba; se
  // recentra sin recortar más de lo necesario para llenar el marco.
  "flaming-pieces-trepadora": { objectPosition: "58% 68%" },
};

/** Clase de object-position para aplicar directamente sobre el <Image>. No
 * choca con ninguna otra clase/transform existente. */
export function obtenerClaseObjectPosition(slug: string): string {
  const ajuste = ENCUADRES_ROSALES[slug];
  if (!ajuste?.objectPosition) return "";
  return `object-[${ajuste.objectPosition.replace(/\s+/g, "_")}]`;
}

/** Estilo de zoom (scale + transform-origin) para aplicar sobre un div
 * envoltorio DEDICADO -- nunca sobre el mismo elemento que ya tenga un
 * scale por Tailwind (ej. el hover de las tarjetas), porque ambos
 * escriben la misma propiedad `transform` y uno pisaría al otro. Al
 * anidarlo en un elemento propio, los transforms se combinan sin chocar. */
export function obtenerEstiloZoom(slug: string): { transform: string; transformOrigin: string } | undefined {
  const ajuste = ENCUADRES_ROSALES[slug];
  if (!ajuste?.scale) return undefined;
  return {
    transform: `scale(${ajuste.scale})`,
    transformOrigin: ajuste.origin ?? "center",
  };
}
