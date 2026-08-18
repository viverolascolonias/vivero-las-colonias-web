# Imágenes reales — dónde subirlas

Este documento es la lista exacta de archivos que hay que subir a `public/images/`
para reemplazar los placeholders actuales. No es necesario tocar ningún archivo de
código: apenas el archivo con el nombre correcto existe en la carpeta, la web lo
usa automáticamente y deja de mostrar el placeholder para ese lugar.

**Formato de archivo:** `.jpg`, `.jpeg`, `.png` o `.webp` (cualquiera de los
cuatro funciona; si hay más de uno con el mismo nombre, se usa el primero que
encuentre en ese orden). El nombre del archivo debe ser **exactamente** el que
se indica abajo (sin espacios, sin mayúsculas, tal como está escrito).

Si el archivo no existe todavía, esa foto sigue mostrando el placeholder actual
(fondo con el isotipo) — no hay que hacer nada más para eso, es automático.

---

## 1. Hero de Inicio (foto de fondo completa)

```
public/images/hero-inicio.jpg
```

## 2. Sección Paisajismo del Inicio (foto de fondo)

```
public/images/paisajismo-teaser.jpg
```

## 3. Sección Nosotros del Inicio (foto retrato)

```
public/images/nosotros-teaser.jpg
```

## 4. Página /paisajismo (banner superior)

```
public/images/paisajismo/banner.jpg
```

## 5. Página /nosotros (foto retrato)

```
public/images/nosotros/foto.jpg
```

## 6. Cada variedad de rosal (tarjeta del catálogo + ficha de producto)

Carpeta: `public/images/rosales/`

El nombre de archivo es el **slug** del rosal (se ve en la URL de su ficha:
`/rosales/{slug}`). La misma foto se usa tanto en la tarjeta del catálogo
como en la ficha de detalle — no hace falta subir dos versiones.

| Archivo a subir | Variedad |
|---|---|
| `amarilla-boton-arbustiva-baja.jpg` | Amarilla Botón |
| `angelica-arbustiva-baja.jpg` | Angélica |
| `big-purple-arbustiva-baja.jpg` | Big Purple |
| `black-magic-arbustiva-baja.jpg` | Black Magic |
| `charles-de-gaulle-arbustiva-baja.jpg` | Charles de Gaulle |
| `chicago-pieces-arbustiva-baja.jpg` | Chicago Pieces |
| `choking-blue-arbustiva-baja.jpg` | Choking Blue |
| `clavel-arbustiva-baja.jpg` | Clavel |
| `cocktail-arbustiva-baja.jpg` | Cocktail (arbustiva baja) |
| `cocktail-trepadora.jpg` | Cocktail (trepadora) |
| `confeti-medio-pie.jpg` | Confeti |
| `copito-de-nieve-arbustiva-baja.jpg` | Copito de Nieve |
| `corazon-purpura-arbustiva-baja.jpg` | Corazón Púrpura |
| `da-vinci-arbustiva-baja.jpg` | Da Vinci (arbustiva baja) |
| `da-vinci-medio-pie.jpg` | Da Vinci (medio pie) |
| `da-vinci-trepadora.jpg` | Da Vinci (trepadora) |
| `diva-de-divas-arbustiva-baja.jpg` | Diva de Divas |
| `fire-arbustiva-baja.jpg` | Fire |
| `flaming-2-0-arbustiva-baja.jpg` | Flaming 2.0 |
| `flaming-pieces-arbustiva-baja.jpg` | Flaming Pieces (arbustiva baja) |
| `flaming-pieces-trepadora.jpg` | Flaming Pieces (trepadora) |
| `freedom-arbustiva-baja.jpg` | Freedom (arbustiva baja) |
| `freedom-medio-pie.jpg` | Freedom (medio pie) |
| `fresia-arbustiva-baja.jpg` | Fresia |
| `grand-gala-arbustiva-baja.jpg` | Grand Gala |
| `iceberg-arbustiva-baja.jpg` | Iceberg (arbustiva baja) |
| `iceberg-medio-pie.jpg` | Iceberg (medio pie) |
| `maria-callas-arbustiva-baja.jpg` | María Callas |
| `oceano-arbustiva-baja.jpg` | Océano |
| `oklahoma-arbustiva-baja.jpg` | Oklahoma |
| `payaso-arbustiva-baja.jpg` | Payaso |
| `perla-negra-arbustiva-baja.jpg` | Perla Negra |
| `red-panther-arbustiva-baja.jpg` | Red Panther |
| `rock-and-roll-arbustiva-baja.jpg` | Rock and Roll (arbustiva baja) |
| `rock-and-roll-medio-pie.jpg` | Rock and Roll (medio pie) |
| `rock-and-roll-trepadora.jpg` | Rock and Roll (trepadora) |
| `salmon-angy-arbustiva-baja.jpg` | Salmón Angy |
| `santa-fe-arbustiva-baja.jpg` | Santa Fe |
| `sensacion-naranja-arbustiva-baja.jpg` | Sensación Naranja |
| `sevillana-arbustiva-baja.jpg` | Sevillana (arbustiva baja) |
| `sevillana-medio-pie.jpg` | Sevillana (medio pie) |
| `sevillana-trepadora.jpg` | Sevillana (trepadora) |
| `sorina-arbustiva-baja.jpg` | Sorina |
| `texas-trepadora.jpg` | Texas |
| `tigre-arbustiva-baja.jpg` | Tigre |
| `tineke-arbustiva-baja.jpg` | Tineke |
| `valentin-heart-medio-pie.jpg` | Valentín Heart |
| `whisky-arbustiva-baja.jpg` | Whisky |

> Esta tabla se genera a partir de `data/productos.json`. Si el catálogo del
> ERP cambia (se agregan o quitan variedades), esta lista debe actualizarse.

## 7. Categorías de Plantas (tarjetas de categoría)

Carpeta: `public/images/plantas/`

| Archivo a subir | Categoría |
|---|---|
| `ornamental.jpg` | Ornamentales |
| `arbol.jpg` | Árboles |
| `arbusto.jpg` | Arbustos |
| `interior.jpg` | Plantas de interior |
| `otra.jpg` | Otras |

(Cuando existan variedades de plantas reales en el ERP, cada una usará el
mismo esquema que los rosales: `public/images/plantas/{slug}.jpg`.)

---

## Cómo funciona técnicamente

- `lib/images.ts` — `resolverImagenPublica()` busca el archivo real en
  `/public` (Server Component, no se puede usar en componentes "use client").
- `app/components/ui/ImagenFondo.tsx` — imagen de fondo a pantalla completa
  (Hero, banners). Usa el placeholder de marca como único fallback.
- `app/components/ui/ImagenBloque.tsx` — imagen en bloque normal (tarjetas,
  retratos). Mismo fallback.
- Las tarjetas de producto (`ProductoCard`, `ModalCompraRapida`) son
  componentes de cliente: reciben la imagen ya resuelta como prop desde
  `GridProductos`, que es quien consulta el filesystem.

No hay que modificar ningún componente para agregar una foto — solo subir el
archivo con el nombre exacto indicado arriba.
