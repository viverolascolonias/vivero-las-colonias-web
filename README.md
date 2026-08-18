# Vivero Las Colonias — Web

Sitio web público de Vivero Las Colonias (catálogo de rosales y plantas,
paisajismo, contacto). **Proyecto completamente separado del ERP** — vive en
otra carpeta, con su propio `package.json` y `node_modules`. No modifica ni
depende de que el ERP esté corriendo para funcionar.

## Cómo correrlo localmente

```bash
export PATH="$HOME/dev-tools/node/bin:$PATH"   # el mismo Node que usa el ERP
npm install                                     # solo la primera vez
npm run dev
```

Abre **http://localhost:3001** (puerto 3001, para no chocar con el ERP que
usa el 3000).

## De dónde vienen los productos

El catálogo (`data/productos.json`) es una **fotografía de solo lectura** del
ERP, generada por `scripts/sync-erp-catalog.mjs`. Ese script:

- Ejecuta un único `SELECT` contra el `dev.db` del ERP con el CLI `sqlite3`.
- Nunca escribe, modifica ni migra nada en el ERP.
- Para "Arbustiva baja" usa la tarifa pública base ($5.000, la misma que el
  ERP aplica automáticamente a "Cliente detalle"), porque esa subcategoría
  no tiene un precio propio en el catálogo — su precio siempre se resuelve
  según el cliente.
- Para "Trepadora"/"Medio pie" usa el precio de venta cargado en el ERP; si
  no hay uno cargado todavía, el producto se muestra como "Consultar precio"
  en vez de inventar un número.
- El campo `disponible` es **mock** (`true` para todos): el ERP todavía no
  tiene stock inicial real cargado para estas variedades, así que no se debe
  mostrar como si fuera stock real. Se actualizará solo cuando exista la
  conexión en vivo con el ERP.

Para refrescar el catálogo con el estado actual del ERP:

```bash
npm run sync-erp
```

(Requiere que `sqlite3` esté disponible en el PATH — ya lo está en esta Mac.
Si el ERP se mueve de carpeta, pasa la ruta con
`ERP_DB_PATH=/ruta/al/dev.db npm run sync-erp`.)

## Cómo está preparada la conexión futura con el ERP

Ningún componente ni página importa `data/productos.json` directamente.
Todos pasan por `lib/productos.ts` (`getProductos()`, `getProductoBySlug()`,
`getRosales()`, `getPlantas()`). El día que exista una API del ERP, **solo
esas funciones cambian** — de leer el JSON a hacer `fetch` — y ninguna
página o componente visual necesita tocarse.

`lib/types.ts` refleja a propósito la forma del modelo `Producto` del ERP
(`categoria`, `subcategoria`, `precio`) para que ese reemplazo sea directo.

## Qué falta (fuera de alcance de esta etapa, a propósito)

- Fotografías reales — hoy se usa un marcador botánico (`PlaceholderImage`)
  en todo el sitio.
- Descripciones y cuidados reales por variedad — hoy hay un texto genérico
  por defecto (`lib/productos.ts`), fácil de reemplazar por contenido real
  variedad por variedad.
- Checkout y pago real — el carrito (`/carrito`) funciona a nivel visual y de
  estado (localStorage), pero el botón de pago está deshabilitado a propósito.
- Conexión en vivo con el ERP (stock y precio real, pedidos que impacten el
  ERP) — etapa aparte, pendiente de aprobación.
