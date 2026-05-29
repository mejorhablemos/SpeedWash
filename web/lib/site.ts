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
  perWash?: string;
  discount?: string;
  expiry?: string;
  note: string;
  featured?: boolean;
};

export const packs: Pack[] = [
  {
    id: "speed-one",
    name: "Speed One",
    washes: "1 lavado",
    price: "$22.000",
    note: "Ideal para probar el servicio.",
  },
  {
    id: "speed-4",
    name: "Speed 4",
    washes: "4 lavados",
    price: "$79.000",
    perWash: "$19.750 / lavado",
    discount: "10% OFF",
    expiry: "Vence a 60 días",
    note: "Para uso mensual constante.",
  },
  {
    id: "speed-8",
    name: "Speed 8",
    washes: "8 lavados",
    price: "$145.000",
    perWash: "$18.125 / lavado",
    discount: "18% OFF",
    expiry: "Vence a 90 días",
    note: "Para quienes mantienen su auto impecable.",
  },
  {
    id: "speed-12",
    name: "Speed 12",
    washes: "12 lavados",
    price: "$198.000",
    perWash: "$16.500 / lavado",
    discount: "25% OFF",
    expiry: "Vence a 120 días",
    note: "El plan founders por excelencia.",
    featured: true,
  },
];
