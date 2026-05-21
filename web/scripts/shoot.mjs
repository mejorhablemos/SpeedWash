import puppeteer from "puppeteer";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE || "http://localhost:3210";
const OUT = "./shots/";
mkdirSync(OUT, { recursive: true });

const shots = [
  { name: "home-desktop", path: "/", w: 1440, h: 900, full: true },
  { name: "home-mobile", path: "/", w: 390, h: 844, full: true },
];

const browser = await puppeteer.launch({ headless: true });
for (const s of shots) {
  const page = await browser.newPage();
  await page.setViewport({ width: s.w, height: s.h, deviceScaleFactor: 2 });
  await page.goto(BASE + s.path, { waitUntil: "networkidle0" });
  // las animaciones reveal se fuerzan visibles para la captura
  await page.addStyleTag({
    content: ".reveal{opacity:1!important;transform:none!important}",
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: OUT + s.name + ".png", fullPage: s.full });
  console.log("shot ->", s.name);
  await page.close();
}
await browser.close();
