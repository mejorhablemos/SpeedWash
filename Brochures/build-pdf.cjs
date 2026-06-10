// Genera PDF del brief de marketing a partir del .md
// Uso: node Brochures/build-pdf.cjs
//
// Deps esperadas (instala con npm install si faltan):
//   - puppeteer-core
//   - marked
//
// Chrome esperado en C:\Program Files\Google\Chrome\Application\chrome.exe

const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer-core");
const { marked } = require("marked");

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const INPUT = path.join(__dirname, "brief-ariel-2026-jun.md");
const OUTPUT = path.join(__dirname, "brief-ariel-2026-jun.pdf");

const md = fs.readFileSync(INPUT, "utf8");
const htmlBody = marked.parse(md);

const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<title>Brief Speed Wash · Lanzamiento Meta Ads · Jun-Jul 2026</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
<style>
  :root {
    --blue:        #00BBFC;
    --blue-bright: #5BD6FF;
    --blue-deep:   #0079B8;
    --orange:      #FF9416;
    --success:     #00D97E;
    --error:       #F04438;
    --black:       #000000;
    --g0:          #08090A;
    --g1:          #101113;
    --g2:          #17181B;
    --g3:          #1F2025;
    --white:       #FFFFFF;
    --wash:        #C9CDD2;
    --grey:        #9A9CA3;
    --grey-2:      #62646B;
    --line:        rgba(0,0,0,.08);
    --line-strong: rgba(0,0,0,.16);
  }

  * { box-sizing: border-box; }

  @page {
    size: A4;
    margin: 18mm 16mm 18mm 16mm;
  }

  html, body {
    margin: 0;
    padding: 0;
    background: var(--white);
    color: var(--g0);
    font-family: "Inter", -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
    font-size: 10.5pt;
    line-height: 1.55;
    -webkit-font-smoothing: antialiased;
  }

  /* Cover page */
  .cover {
    page-break-after: always;
    height: 245mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0;
    color: var(--white);
    background: var(--g0);
    position: relative;
    overflow: hidden;
    margin: -18mm -16mm 0 -16mm;
    padding: 24mm 20mm;
  }

  .cover::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
      radial-gradient(circle at 80% 20%, rgba(0,187,252,.15) 0%, transparent 50%),
      radial-gradient(circle at 10% 90%, rgba(0,187,252,.08) 0%, transparent 40%);
    pointer-events: none;
  }

  .cover::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 18px 18px;
    pointer-events: none;
  }

  .cover-top, .cover-mid, .cover-bot {
    position: relative;
    z-index: 1;
  }

  .cover-eyebrow {
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 8pt;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    color: var(--blue);
    margin: 0 0 16px 0;
  }

  .cover-eyebrow::before {
    content: "";
    display: inline-block;
    width: 28px;
    height: 1px;
    background: var(--blue);
    vertical-align: middle;
    margin-right: 14px;
    margin-bottom: 2px;
  }

  .cover-title {
    font-family: "Space Grotesk", sans-serif;
    font-weight: 600;
    font-size: 44pt;
    line-height: 1.02;
    letter-spacing: -0.04em;
    color: var(--white);
    margin: 0;
  }

  .cover-title em {
    font-style: normal;
    color: var(--blue);
  }

  .cover-sub {
    font-family: "Inter", sans-serif;
    font-weight: 300;
    font-size: 14pt;
    line-height: 1.4;
    color: var(--wash);
    margin: 24px 0 0 0;
    max-width: 130mm;
  }

  .cover-meta {
    display: flex;
    justify-content: space-between;
    gap: 24px;
    padding-top: 24px;
    border-top: 1px solid rgba(255,255,255,.16);
  }

  .cover-meta-block {
    flex: 1;
  }

  .cover-meta-label {
    font-family: "Space Grotesk", sans-serif;
    font-weight: 400;
    font-size: 7.5pt;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--grey);
    margin: 0 0 6px 0;
  }

  .cover-meta-value {
    font-family: "Space Grotesk", sans-serif;
    font-weight: 500;
    font-size: 12pt;
    color: var(--white);
    margin: 0;
  }

  .cover-coord {
    position: absolute;
    bottom: 8mm;
    right: 20mm;
    font-family: "Space Grotesk", sans-serif;
    font-weight: 400;
    font-size: 7pt;
    letter-spacing: 0.18em;
    color: var(--grey);
    z-index: 1;
  }

  /* Content pages */
  h1 {
    font-family: "Space Grotesk", sans-serif;
    font-weight: 600;
    font-size: 22pt;
    line-height: 1.1;
    letter-spacing: -0.03em;
    color: var(--g0);
    margin: 20pt 0 10pt 0;
    padding-bottom: 8pt;
    border-bottom: 1px solid var(--line-strong);
    page-break-after: avoid;
  }

  h2 {
    font-family: "Space Grotesk", sans-serif;
    font-weight: 600;
    font-size: 14pt;
    line-height: 1.2;
    letter-spacing: -0.02em;
    color: var(--g0);
    margin: 24pt 0 8pt 0;
    padding-top: 6pt;
    border-top: 2px solid var(--blue);
    padding-top: 12pt;
    page-break-after: avoid;
  }

  h3 {
    font-family: "Space Grotesk", sans-serif;
    font-weight: 600;
    font-size: 11.5pt;
    line-height: 1.3;
    letter-spacing: -0.01em;
    color: var(--g0);
    margin: 18pt 0 6pt 0;
    page-break-after: avoid;
  }

  h4 {
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 10pt;
    color: var(--blue-deep);
    margin: 12pt 0 4pt 0;
    page-break-after: avoid;
  }

  p {
    margin: 0 0 8pt 0;
    color: var(--g1);
  }

  strong { font-weight: 600; color: var(--g0); }
  em { color: var(--blue-deep); font-style: italic; }

  ul, ol {
    margin: 0 0 10pt 0;
    padding-left: 18pt;
  }

  li {
    margin: 0 0 4pt 0;
    color: var(--g1);
  }

  li::marker { color: var(--blue); }

  a { color: var(--blue-deep); text-decoration: none; border-bottom: 1px solid var(--blue); }

  code {
    font-family: "Space Grotesk", monospace;
    font-size: 9pt;
    background: rgba(0,187,252,.08);
    color: var(--blue-deep);
    padding: 1pt 5pt;
    border-radius: 2px;
    border: 1px solid rgba(0,187,252,.16);
  }

  pre {
    background: var(--g0);
    color: var(--wash);
    padding: 12pt 14pt;
    border-radius: 3px;
    overflow-x: auto;
    font-family: "Space Grotesk", monospace;
    font-size: 8.5pt;
    line-height: 1.5;
    margin: 8pt 0 14pt 0;
    border-left: 3px solid var(--blue);
    page-break-inside: avoid;
  }

  pre code {
    background: transparent;
    border: none;
    color: inherit;
    padding: 0;
  }

  blockquote {
    border-left: 3px solid var(--blue);
    background: rgba(0,187,252,.04);
    padding: 10pt 14pt;
    margin: 12pt 0;
    color: var(--g1);
    font-size: 10pt;
    page-break-inside: avoid;
  }

  blockquote p:last-child { margin-bottom: 0; }
  blockquote strong { color: var(--blue-deep); }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 10pt 0 14pt 0;
    font-size: 9pt;
    page-break-inside: avoid;
  }

  table th {
    background: var(--g0);
    color: var(--white);
    font-family: "Space Grotesk", sans-serif;
    font-weight: 500;
    font-size: 8pt;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    text-align: left;
    padding: 7pt 9pt;
    border-bottom: 2px solid var(--blue);
  }

  table td {
    padding: 7pt 9pt;
    border-bottom: 1px solid var(--line);
    color: var(--g1);
    vertical-align: top;
  }

  table tr:nth-child(even) td {
    background: rgba(0,187,252,.025);
  }

  hr {
    border: none;
    border-top: 1px solid var(--line);
    margin: 20pt 0;
  }

  /* tighter spacing for shot-by-shot tables */
  table td:first-child { font-family: "Space Grotesk", monospace; font-weight: 500; color: var(--blue-deep); white-space: nowrap; }

  /* Page numbers / footer would go via puppeteer headerTemplate */
</style>
</head>
<body>
  <section class="cover">
    <div class="cover-top">
      <p class="cover-eyebrow">Brief · Speed Wash · Lanzamiento</p>
    </div>
    <div class="cover-mid">
      <h1 class="cover-title">Meta Ads<br/><em>Junio—Julio 2026</em></h1>
      <p class="cover-sub">Awareness pura modo teaser. Tres piezas de video, grid IG, contenido orgánico y copy de ads para construir presencia en Funes, Roldán, Fisherton y Pérez antes de la apertura.</p>
    </div>
    <div class="cover-bot">
      <div class="cover-meta">
        <div class="cover-meta-block">
          <p class="cover-meta-label">Fecha</p>
          <p class="cover-meta-value">10 jun 2026</p>
        </div>
        <div class="cover-meta-block">
          <p class="cover-meta-label">Versión</p>
          <p class="cover-meta-value">v1</p>
        </div>
        <div class="cover-meta-block">
          <p class="cover-meta-label">Para</p>
          <p class="cover-meta-value">Ariel + diseñadora</p>
        </div>
        <div class="cover-meta-block">
          <p class="cover-meta-label">Período campaña</p>
          <p class="cover-meta-value">16 jun—9 jul</p>
        </div>
      </div>
    </div>
    <p class="cover-coord">FUNES · -32.91° / -60.81° · SECTOR 01</p>
  </section>

  ${htmlBody}
</body>
</html>`;

(async () => {
  console.log("Lanzando Chrome…");
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: ["load", "networkidle0"] });

  console.log("Generando PDF…");
  await page.pdf({
    path: OUTPUT,
    format: "A4",
    printBackground: true,
    margin: { top: "18mm", right: "16mm", bottom: "18mm", left: "16mm" },
    displayHeaderFooter: true,
    headerTemplate: `<div style="font-family: 'Space Grotesk', sans-serif; font-size: 7pt; letter-spacing: 0.18em; color: #9A9CA3; width: 100%; padding: 0 16mm; display: flex; justify-content: space-between;">
      <span>SPEED WASH · BRIEF META ADS</span>
      <span>JUN-JUL 2026</span>
    </div>`,
    footerTemplate: `<div style="font-family: 'Space Grotesk', sans-serif; font-size: 7pt; letter-spacing: 0.18em; color: #9A9CA3; width: 100%; padding: 0 16mm; display: flex; justify-content: space-between;">
      <span>FUNES · -32.91° / -60.81°</span>
      <span><span class="pageNumber"></span> / <span class="totalPages"></span></span>
    </div>`,
  });

  await browser.close();
  console.log("✓ PDF generado: " + OUTPUT);
})();
