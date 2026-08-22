#!/usr/bin/env node
// Exporta el catálogo real del ERP hacia data/productos.json, incluyendo
// la ficha botánica (VariedadRosal) y su fotografía.
//
// Es de SOLO LECTURA respecto de la base del ERP: ejecuta un único SELECT
// contra el archivo dev.db del ERP a través del CLI `sqlite3` y nunca
// escribe, modifica ni migra nada en ese proyecto. Lo único que este script
// escribe es dentro de la propia web (data/productos.json y una copia de
// cada fotografía en public/images/rosales/) -- el ERP sigue siendo la
// única fuente editable; esto es solo una sincronización de lectura.
//
// Uso:
//   npm run sync-erp
//   ERP_DB_PATH=/ruta/al/dev.db npm run sync-erp

import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const DB_PATH =
  process.env.ERP_DB_PATH ?? resolve(ROOT, "..", "ERP vivero las colonias", "dev.db");
const ERP_ROOT = dirname(DB_PATH);
const ERP_UPLOADS_DIR = resolve(ERP_ROOT, "public", "uploads", "rosales");

const OUT_PATH = resolve(ROOT, "data", "productos.json");
const WEB_IMAGES_DIR = resolve(ROOT, "public", "images", "rosales");

const EXTENSIONES_IMAGEN = ["jpg", "jpeg", "png", "webp"];

// Tarifas propias de rosal por subcategoría, fijadas explícitamente por el
// vivero (no vienen de Producto.precioVenta del ERP para estas 3). Este es
// el precio "de partida" (1 unidad) que se muestra en catálogo y ficha; el
// tramo por cantidad de Arbustiva baja se resuelve en vivo en el carrito,
// ver lib/precios.ts (gemelo exacto de estos mismos valores -- este script
// no puede importar ese archivo TypeScript al ser Node plano). NO cambiar
// estos números sin confirmación directa del vivero.
const TARIFA_ARBUSTIVA_BAJA_DETALLE = 5000;
const TARIFA_MEDIO_PIE = 8500;
const TARIFA_TREPADORA = 12000;

// Gemelo de lib/config.ts (LIMITAR_POR_STOCK) -- este script no puede
// importar ese archivo TypeScript directamente al ser Node plano, así que
// se mantiene sincronizado a mano. Con esto en `false`, todo producto
// activo queda "disponible" para poder seleccionarse y agregarse al
// carrito aunque el ERP todavía no tenga stock real cargado; el número de
// stock real se sigue exportando igual (ver más abajo), listo para cuando
// se active el límite.
const LIMITAR_POR_STOCK = false;

function exportarDesdeErp() {
  if (!existsSync(DB_PATH)) {
    throw new Error(
      `No se encontró el dev.db del ERP en "${DB_PATH}". ` +
        `Indica la ruta con la variable de entorno ERP_DB_PATH.`
    );
  }

  const query =
    "SELECT p.id, p.nombre, p.categoria, p.subcategoria, p.precioVenta, p.stockActual, " +
    "p.fotoUrl AS productoFotoUrl, " +
    "v.tipoFloracion AS tipoFloracion, v.color AS color, v.aromatica AS aromatica, v.resumen AS resumen " +
    "FROM Producto p LEFT JOIN VariedadRosal v ON v.id = p.variedadRosalId " +
    "WHERE p.estado = 'Activo' ORDER BY p.nombre, p.subcategoria;";

  const salida = execFileSync("sqlite3", ["-json", DB_PATH, query], {
    encoding: "utf-8",
  });

  const filas = JSON.parse(salida || "[]");

  // Tramos de precio por cantidad (ej. +50 unidades = $4.200). Hoy la tabla
  // está vacía en el ERP -- se deja lista para cuando el usuario cargue
  // tramos reales ahí, sin que este script necesite cambiar.
  const escalasQuery = "SELECT productoId, cantidadMinima, precio FROM PrecioPorCantidad ORDER BY cantidadMinima;";
  const escalasSalida = execFileSync("sqlite3", ["-json", DB_PATH, escalasQuery], { encoding: "utf-8" });
  const escalasFilas = JSON.parse(escalasSalida || "[]");
  const escalasPorProducto = new Map();
  for (const e of escalasFilas) {
    const lista = escalasPorProducto.get(e.productoId) ?? [];
    lista.push({ cantidadMinima: e.cantidadMinima, precio: Math.round(Number(e.precio) || 0) });
    escalasPorProducto.set(e.productoId, lista);
  }

  let fotosSincronizadas = 0;

  const productos = filas.map((fila) => {
    const slug = slugify(`${fila.nombre}${fila.subcategoria ? "-" + fila.subcategoria : ""}`);
    if (sincronizarFoto(slug, fila.productoFotoUrl)) fotosSincronizadas++;

    const stock = Math.max(0, Math.round(Number(fila.stockActual) || 0));

    return {
      id: fila.id,
      slug,
      nombre: fila.nombre,
      categoria: fila.categoria,
      subcategoria: fila.subcategoria ?? null,
      precio: resolverPrecioPublico(fila),
      escalasPrecio: escalasPorProducto.get(fila.id) ?? [],
      // Stock real del ERP -- se exporta siempre, independientemente de si
      // el límite está activo, para que la estructura esté lista de
      // antemano. `disponible` solo se deriva del stock cuando
      // LIMITAR_POR_STOCK está activo; mientras esté en `false`, cualquier
      // producto activo del catálogo queda disponible para agregarse al
      // carrito aunque su stock real todavía sea 0.
      stock,
      disponible: LIMITAR_POR_STOCK ? stock > 0 : true,
      imagen: null,
      tipoFloracion: fila.tipoFloracion ?? null,
      color: fila.color ?? null,
      aromatica: fila.aromatica === null || fila.aromatica === undefined ? null : Boolean(fila.aromatica),
      descripcion: fila.resumen ?? undefined,
    };
  });

  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, JSON.stringify(productos, null, 2) + "\n", "utf-8");

  console.log(`Exportados ${productos.length} productos reales desde el ERP -> ${OUT_PATH}`);
  console.log(`Fotografías sincronizadas desde el ERP: ${fotosSincronizadas}`);
}

/**
 * Copia la fotografía de UNA forma de cultivo puntual (Producto.fotoUrl,
 * ej. "Cocktail · Trepadora") desde public/uploads/rosales del ERP hacia
 * public/images/rosales de la web, con el nombre de archivo que espera
 * resolverImagenPublica (slug.ext) -- el slug ya incluye la subcategoría,
 * así que cada forma se sincroniza de forma independiente. Si el ERP
 * todavía no tiene foto para esa forma puntual, no toca nada -- así se
 * conserva cualquier fotografía cargada manualmente antes de que existiera
 * esta conexión.
 */
function sincronizarFoto(slug, fotoUrlErp) {
  if (!fotoUrlErp) return false;

  const nombreArchivoErp = basename(fotoUrlErp);
  const rutaOrigen = resolve(ERP_UPLOADS_DIR, nombreArchivoErp);
  if (!existsSync(rutaOrigen)) return false;

  const ext = (nombreArchivoErp.split(".").pop() || "jpg").toLowerCase();
  mkdirSync(WEB_IMAGES_DIR, { recursive: true });

  // Limpia otras extensiones del mismo slug para que resolverImagenPublica
  // no encuentre una versión vieja ambigua junto a la nueva.
  for (const otraExt of EXTENSIONES_IMAGEN) {
    if (otraExt === ext) continue;
    const rutaVieja = resolve(WEB_IMAGES_DIR, `${slug}.${otraExt}`);
    if (existsSync(rutaVieja)) rmSync(rutaVieja);
  }

  copyFileSync(rutaOrigen, resolve(WEB_IMAGES_DIR, `${slug}.${ext}`));
  return true;
}

function resolverPrecioPublico(fila) {
  if (fila.subcategoria === "Arbustiva baja") return TARIFA_ARBUSTIVA_BAJA_DETALLE;
  if (fila.subcategoria === "Medio pie") return TARIFA_MEDIO_PIE;
  if (fila.subcategoria === "Trepadora") return TARIFA_TREPADORA;
  const precio = Math.round(Number(fila.precioVenta) || 0);
  return precio > 0 ? precio : null; // null => "Consultar precio" en la web
}

function slugify(texto) {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

exportarDesdeErp();
