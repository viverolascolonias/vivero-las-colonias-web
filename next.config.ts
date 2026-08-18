import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // resolverImagenPublica agrega ?v=<mtime> a las fotos de /images para
    // que el navegador nunca muestre una versión vieja en caché después de
    // reemplazar una fotografía real -- sin esto next/image rechaza el
    // query string en imágenes locales optimizadas. Sin `search` acá
    // permite cualquier query string (o ninguno), así que también cubre el
    // resto de las imágenes locales servidas desde /public (logo, etc).
    localPatterns: [{ pathname: "/**" }],
  },
};

export default nextConfig;
