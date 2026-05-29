import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF primero (Next por defecto solo sirve WebP): ~30-50% menos peso en mobile.
    formats: ["image/avif", "image/webp"],
    // Los renders son estáticos: cachealos agresivo en el optimizador.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
