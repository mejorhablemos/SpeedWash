/* Optimiza los renders IA para el sitio: recorta el watermark, redimensiona y
   comprime a JPG. Ejecutar desde web/:  node scripts/optimize-assets.mjs       */
import sharp from "sharp";

const DIR = "./public/renders/";
const CROP_BOTTOM = 0.12; // recorta el watermark de la esquina inferior derecha

const jobs = [
  { in: "speedwast exterior render.png",   out: "exterior.jpg",     w: 2400 },
  { in: "Speedwash car with cawrwash.png", out: "lavado.jpg",       w: 2000 },
  { in: "Speedwash Car detail.png",        out: "detalle.jpg",      w: 1800 },
  { in: "Speedwash vacuum machine.png",    out: "autoservicio.jpg", w: 1800 },
  { in: "interior car speedwash.png",      out: "interior.jpg",     w: 2200 },
];

for (const j of jobs) {
  const src = DIR + j.in;
  const meta = await sharp(src).metadata();
  const h = Math.round(meta.height * (1 - CROP_BOTTOM));
  await sharp(src)
    .extract({ left: 0, top: 0, width: meta.width, height: h })
    .resize({ width: j.w, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(DIR + j.out);
  console.log("ok ->", j.out);
}
