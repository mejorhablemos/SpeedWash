import sharp from "sharp";
import { mkdirSync } from "node:fs";

const G = "../Graficas/";
const OUT = "./public/renders/";
mkdirSync(OUT, { recursive: true });

const jobs = [
  // Render diurno del local (4K) -> hero / proyecto
  { in: G + "Presentacion de Marca/Recursos/mejor resolucion.jpg", out: "local.jpg", w: 2560, q: 82 },
  // Mockups premium oscuros -> mosaico experiencia
  { in: G + "Mockups/3.2.png", out: "banner.jpg", w: 1600, q: 80 },
  { in: G + "Mockups/4.2.png", out: "merch.jpg", w: 1600, q: 80 },
  { in: G + "Mockups/5.2.png", out: "cards.jpg", w: 1600, q: 80 },
  { in: G + "Mockups/Banner.jpg", out: "billboard.jpg", w: 1600, q: 80 },
];

for (const j of jobs) {
  await sharp(j.in)
    .resize({ width: j.w, withoutEnlargement: true })
    .jpeg({ quality: j.q, mozjpeg: true })
    .toFile(OUT + j.out);
  console.log("ok ->", j.out);
}
