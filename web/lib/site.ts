// Datos de marca y contacto de Speed Wash Funes.
// NOTA: email e Instagram confirmados por el cliente.
// WhatsApp sigue siendo placeholder — falta el número real.

export const site = {
  name: "Speed Wash",
  fullName: "Speed Wash Funes",
  domain: "speedwash.com.ar",
  tagline: "Tu auto listo en minutos",
  slogan: "Tecnología · Innovación · Comunidad · 24 hs",
  location: "Funes, Santa Fe — Argentina",
  ecosystem: "Calmo Funes",
  // Contacto
  email: "info@speedwash.com.ar",
  whatsapp: "3410123456", // PLACEHOLDER — reemplazar por el número real
  whatsappDisplay: "341 012-3456", // PLACEHOLDER
  instagram: "speedwash.funes",
  instagramUrl: "https://instagram.com/speedwash.funes",
  // Coordenadas aproximadas de Funes (microtexto tech)
  coords: "-32.9176, -60.9314",
  // Datos societarios para páginas legales y facturación. El CUIT está
  // pendiente de carga — buscar en grep por "pendiente de carga" para
  // reemplazar cuando esté disponible.
  legalName: "Fuxio S.R.L.",
  cuit: "pendiente de carga",
  jurisdiction: "Tribunales ordinarios de Rosario, provincia de Santa Fe",
  fiscalAddress: "Calmo Funes, Funes, provincia de Santa Fe, Argentina",
};

export const nav = [
  { label: "El Lavadero", href: "/#lavadero" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Membresías", href: "/#membresias" },
  { label: "Partners", href: "/#partners" },
  { label: "Lista de apertura", href: "/#lista" },
];

// ── Canal de contacto ─────────────────────────────────────────────
// Mientras no esté cargado el WhatsApp real, todos los CTAs caen al DM
// de Instagram (canal real y vivo). Cuando exista el número, poner el
// valor real en `site.whatsapp` y cambiar este flag a true: se propaga
// solo a los 8 CTAs del sitio.
export const WHATSAPP_READY = false;

/** Link de contacto. Usa WhatsApp (con mensaje pre-cargado) si está listo,
 *  o el DM de Instagram como fallback. */
export function contactHref(message?: string): string {
  if (WHATSAPP_READY) {
    const q = message ? `?text=${encodeURIComponent(message)}` : "";
    return `https://wa.me/54${site.whatsapp}${q}`;
  }
  return `https://ig.me/m/${site.instagram}`;
}

/** Etiqueta del canal activo, para los textos de los botones. */
export const CONTACT_CHANNEL = WHATSAPP_READY ? "WhatsApp" : "Instagram";

export type Pack = {
  id: string;
  name: string;
  washes: string;
  price: string;
  priceCompare?: string;
  perWash?: string;
  discount?: string;
  expiry?: string;
  note: string;
  featured?: boolean;
};

// URL de la app de compra (fuente de verdad de precios y packs).
export const BUY_APP_URL = "https://lavar.speedwash.com.ar/home";

// Precio del lavado individual (se paga al escanear la máquina en la app).
export const SINGLE_WASH_PRICE_FROM = "$23.000";

// Pack destacado de preventa Founders (primeros 50). Card aparte, full-width.
export const foundersPack: Pack = {
  id: "speed-12-founders",
  name: "Speed 12 Founders",
  washes: "12 lavados",
  price: "$220.000",
  priceCompare: "$240.000",
  perWash: "$18.333 / lavado",
  discount: "27% OFF",
  expiry: "Vence a 180 días",
  note: "Precio especial de preventa. Solo 50 cupos.",
  featured: true,
};

// Stock Founders. Estático por ahora; conectar a backend cuando exista.
export const FOUNDERS_TOTAL_SEATS = 50;
export const FOUNDERS_SEATS_LEFT = 47;

export const foundersPerks: string[] = [
  "Precio fundador para siempre en renovaciones",
  "Acceso prioritario a futuras sedes Speed Wash",
  "Tu nombre en el Muro de Fundadores del local",
  "Atención preferencial vía WhatsApp directo",
  "Primer lavado de inauguración bonificado",
];

// Packs regulares — fuente de verdad: app lavar.speedwash.com.ar.
export const packs: Pack[] = [
  {
    id: "speed-4",
    name: "Speed 4",
    washes: "4 lavados",
    price: "$95.000",
    perWash: "$23.750 / lavado",
    discount: "5% OFF",
    expiry: "Vence a 60 días",
    note: "Ideal para probar el sistema.",
  },
  {
    id: "speed-8",
    name: "Speed 8",
    washes: "8 lavados",
    price: "$180.000",
    perWash: "$22.500 / lavado",
    discount: "10% OFF",
    expiry: "Vence a 180 días",
    note: "Para uso regular mensual.",
  },
  {
    id: "speed-12",
    name: "Speed 12",
    washes: "12 lavados",
    price: "$240.000",
    perWash: "$20.000 / lavado",
    discount: "20% OFF",
    expiry: "Vence a 180 días",
    note: "El plan más elegido.",
    featured: true,
  },
];
