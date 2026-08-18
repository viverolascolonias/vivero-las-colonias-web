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

// Tarifa pública base para Rosal/Arbustiva baja (clasificación "Cliente
// detalle" en el ERP). Para esta subcategoría el precio real no vive en la
// columna precioVenta del catálogo -- se resuelve automáticamente según el
// cliente -- así que usamos la misma tarifa base que ya aplica el ERP para
// cualquier comprador sin clasificación especial.
const TARIFA_ARBUSTIVA_BAJA_DETALLE = 5000;

function exportarDesdeErp() {
  if (!existsSync(DB_PATH)) {
    throw new Error(
      `No se encontró el dev.db del ERP en "${DB_PATH}". ` +
        `Indica la ruta con la variable de entorno ERP_DB_PATH.`
    );
  }

  const query =
    "SELECT p.id, p.nombre, p.categoria, p.subcategoria, p.precioVenta, p.fotoUrl AS productoFotoUrl, " +
    "v.tipoFloracion AS tipoFloracion, v.color AS color, v.aromatica AS aromatica, v.resumen AS resumen " +
    "FROM Producto p LEFT JOIN VariedadRosal v ON v.id = p.variedadRosalId " +
    "WHERE p.estado = 'Activo' ORDER BY p.nombre, p.subcategoria;";

  const salida = execFileSync("sqlite3", ["-json", DB_PATH, query], {
    encoding: "utf-8",
  });

  const filas = JSON.parse(salida || "[]");

  let fotosSincronizadas = 0;

  const productos = filas.map((fila) => {
    const slug = slugify(`${fila.nombre}${fila.subcategoria ? "-" + fila.subcategoria : ""}`);
    if (sincronizarFoto(slug, fila.productoFotoUrl)) fotosSincronizadas++;

    return {
      id: fila.id,
      slug,
      nombre: fila.nombre,
      categoria: fila.categoria,
      subcategoria: fila.subcategoria ?? null,
      precio: resolverPrecioPublico(fila),
      // Disponibilidad mock: el ERP todavía no tiene stock inicial cargado
      // para estas variedades, así que no se debe mostrar como si fuera
      // real. Se deja como disponible por defecto para poder maquetar la
      // web; se reemplaza por el stock real cuando exista la conexión.
      disponible: true,
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
