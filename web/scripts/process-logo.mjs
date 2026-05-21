import sharp from "sharp";
import { mkdirSync } from "node:fs";

const G = "../Graficas/Logo/";
const OUT = "./public/brand/";
mkdirSync(OUT, { recursive: true });

// Recorta el borde transparente y exporta a ancho fijo (alta densidad).
async function trimExport(src, out, width) {
  await sharp(G + src)
    .trim({ threshold: 10 })
    .resize({ width, withoutEnlargement: false })
    .png()
    .toFile(OUT + out);
  const m = await sharp(OUT + out).metadata();
  console.log("->", out, m.width + "x" + m.height);
}

// Muestrea un pixel (en proporciones 0..1) de una imagen ya recortada.
async function sample(src, fx, fy) {
  const buf = sharp(G + src).trim({ threshold: 10 });
  const { data, info } = await buf
    .raw()
    .toBuffer({ resolveWithObject: true });
  const x = Math.floor(fx * info.width);
  const y = Math.floor(fy * info.height);
  const i = (y * info.width + x) * info.channels;
  const hex =
    "#" +
    [data[i], data[i + 1], data[i + 2]]
      .map((v) => v.toString(16).padStart(2, "0"))
      .join("");
  return hex;
}

// --- Assets web ---
await trimExport("Speed Wash-29.png", "logo-wordmark.png", 1400); // wordmark Speed+Wash
await trimExport("Speed Wash-38.png", "logo-mark.png", 640); // monograma S azul
await trimExport("Speed Wash-39.png", "icon-square.png", 512); // S en cuadro azul (favicon)

// --- Muestreo de paleta de marca ---
console.log("\nPaleta muestreada:");
console.log("  azul (S monograma) :", await sample("Speed Wash-38.png", 0.5, 0.4));
console.log("  azul (Speed)       :", await sample("Speed Wash-29.png", 0.12, 0.55));
console.log("  gris (Wash)        :", await sample("Speed Wash-29.png", 0.85, 0.55));
