// Datos de marca y contacto de Speed Wash Funes.
// NOTA: los datos de contacto provienen del manual de marca y pueden ser
// placeholders — confirmar con el cliente antes de publicar.

export const site = {
  name: "Speed Wash",
  fullName: "Speed Wash Funes",
  domain: "speedwash.com.ar",
  tagline: "Tu auto listo en minutos",
  slogan: "Tecnología · Innovación · Comunidad · 24 hs",
  location: "Funes, Santa Fe — Argentina",
  ecosystem: "Calmo Funes",
  // Contacto — confirmar datos reales
  email: "speedwash@gmail.com",
  whatsapp: "3410123456",
  whatsappDisplay: "341 012-3456",
  instagram: "speedwash",
  instagramUrl: "https://instagram.com/speedwash",
  // Coordenadas aproximadas de Funes (microtexto tech)
  coords: "-32.9176, -60.9314",
};

export const nav = [
  { label: "El Lavadero", href: "/#lavadero" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Membresías", href: "/#membresias" },
  { label: "Partners", href: "/#partners" },
  { label: "Contacto", href: "/#contacto" },
];

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
