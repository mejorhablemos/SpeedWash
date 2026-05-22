# Speed Wash Funes — Contexto del Proyecto

> **Para empezar una nueva sesión:** decile a Claude *"leé `CONTEXTO.md`"*. Este
> documento tiene todo lo que necesita saber sobre el negocio, el plan, los
> archivos del repo, el sistema de diseño y cómo generar los PDFs.

---

## 1 · El negocio en una frase

**Speed Wash Funes** es el **primer lavadero automático digitalizado de la región**,
ubicado en Funes (Santa Fe, Argentina), dentro del ecosistema comercial
**Calmo Funes**. Servicio touchless de lavado exterior 24 hs + aspirado
self-service. **Abre el 1 de julio de 2026.**

- 2 lavadoras automáticas · capacidad máxima 12 autos/h · ciclo 7–10 min.
- Sin contacto, automatizado, premium.
- Operación: automática 24 hs + personal en horario diurno.

## 2 · La marca

- Dominio: **speedwash.com.ar** (live, hosteado en Vercel)
- Instagram: **@speedwash.funes**
- Email comercial: **info@speedwash.com.ar**
- WhatsApp: 🔴 **pendiente — todavía no tienen número**
- Logo nuevo: wordmark "SpeedWash" en azul + gris + spark naranja, S-mark azul.
- Posicionamiento: tecnología premium, estética Tesla / Porsche / Linear.

## 3 · La estrategia (premisa central)

> **"Nadie compra lo que no probó."**
> No se vende una membresía, un pack o un Founders Club de un servicio que
> nadie experimentó. El plan se ordena: **primero prueba, después recurrencia.**

**Embudo:** `CONOCÉ → PROBÁ → REPETÍ → MEMBRESÍA → FOUNDERS`

**4 fases del lanzamiento:**
- **A · Expectativa** (22 may – 30 jun) — Lista de Apertura gratuita, sin venta de packs.
- **B · Mes de Prueba** (julio) — promo de apertura fuerte, objetivo: prueba masiva.
- **C · Repetición & Conversión** (ago–sep) — **acá** arranca la venta de packs y abre el Founders Club.
- **D · Escala** (oct–dic) — base recurrente consolidada, empuje B2B.

## 4 · Números clave del plan (en USD)

| Variable | Valor |
|---|---|
| Inversión total (all-in) | **USD 193.000** (equipo 103k + obra/branding/cap. trabajo 90k) |
| Costos fijos | **USD 6.480/mes** (gerente 1.714 · sueldo 1.086 · comercial 1.000 · varios 500 · alquiler 1.400 · servicios 380) |
| Costo variable por lavado | **USD 0,76** (cera, shampoo, energía) |
| Impuestos sobre facturación | ~3,7% (IIBB 2,5% + DREI 1,2%) |
| Precios | Lavado USD 15 · Abono 4 USD 54 · Abono 8 USD 96 · Aspirado USD 4 |
| Punto de equilibrio | **~15 autos/día** a precio pleno |
| Rampa de volumen jul–dic | 36 / 42 / 48 / 54 / 58 / 64 autos/día |
| EBITDA jul–dic 2026 | **~USD 78.700** · margen ~60% |
| Recupero total | **~12 meses** (~mediados 2027) |

**El insight más fuerte del plan:** regalar/abaratar un primer lavado cuesta solo
USD 0,76 de insumos. La prueba es el marketing más barato y poderoso que existe.

## 5 · Sistema de diseño (estética premium tech)

Aplica a todas las piezas visuales: brochures, presentación del plan, sitio web.

### Paleta
```
--blue:        #00BBFC   /* azul LED principal · acentos y CTAs */
--blue-bright: #5BD6FF   /* highlight */
--blue-deep:   #0079B8   /* sombras/gradientes */
--orange:      #FF9416   /* spark · uso mínimo (acento puntual) */

--black:  #000000
--g0:     #08090A   /* fondo casi negro de slides */
--g1:     #101113
--g2:     #17181B   /* cards */
--g3:     #1F2025

--white:  #FFFFFF
--wash:   #C9CDD2   /* gris claro · texto secundario fuerte */
--grey:   #9A9CA3   /* texto secundario */
--grey-2: #62646B   /* microtexto / labels apagados */

--line:        rgba(255,255,255,.085)
--line-strong: rgba(255,255,255,.16)
```

### Tipografía (Google Fonts)
- **Display:** `Space Grotesk` (weights 500–700, `letter-spacing: -.04em`)
- **Body:** `Inter` (weights 300–600)
- **Supra labels:** Inter 600, 9px, `letter-spacing: .26em`, uppercase, azul
- **Microtexto técnico:** Space Grotesk 400, 8px, `letter-spacing: .18em`, uppercase, grey-2

### Principios visuales
- Negro como protagonista (fondos), azul LED como acento.
- Mucho aire. Padding generoso.
- Detalles tech: malla de puntos (`grid-dots`), líneas LED finas, numeración dashboard (`01 / N`), microtexto en esquinas (coordenadas, sectores).
- Hero shots a sangre.
- Sin sombras blandas (Material). Si hay elevación, es por contraste de luz/color.
- CTAs con bordes rectos o radius mínimo (≤ 4px).
- Cero estética "lavadero" (burbujas, agua brillante, destellos cursis).

### Referentes
Tesla configurator · Porsche 911 landing · Apple product pages · Linear · Vercel.

## 6 · Assets de marca (rutas)

```
web/public/brand/
  logo-wordmark.png      # SpeedWash wordmark
  logo-mark.png          # S-mark
  icon-square.png

Brochures/assets/        # copias para los PDF + renders procesados
Plan/assets/             # copias para la presentación

Graficas/                # manual de marca original
  Speed Wash.pdf         # 11 lockups oficiales
  Logo/                  # PNGs por variante
```

## 7 · Renders del local (5 generados con IA · Nano Banana)

| Archivo | Qué muestra |
|---|---|
| `exterior.jpg` | Fachada nocturna del local con logo S iluminado, 2 bahías, autos |
| `lavado.jpg` | Porsche en bahía de lavado con arco LED azul y mist |
| `detalle.jpg` | Close-up del frente del auto con gotas y LED azul |
| `autoservicio.jpg` | Terminal digital + vacuum self-service |
| `interior.jpg` | Interior del auto con S logo visible en parabrisas |

Ubicaciones:
- Versión optimizada para web: `web/public/renders/*.jpg`
- Versión brochure (alta res, sin watermark): `Brochures/assets/r-*.jpg`
- Versión presentación del plan: `Plan/assets/r-*.jpg`

Para regenerar/agregar renders: ver `Brochures/IMAGE-PROMPTS.md` (prompts y
herramienta recomendada: **Nano Banana** = Gemini 2.5 Flash Image).

## 8 · Estructura del repositorio

```
b:\Dev\SpeedWash\
├── src/                       PWA Vue 3 móvil (app original con backend chino)
├── web/                       SITIO NEXT.JS → speedwash.com.ar
│   ├── app/                   (page.tsx, b2b, institucional)
│   ├── components/            Header, Footer, Reveal
│   ├── lib/site.ts            datos del sitio (contacto, packs)
│   ├── public/renders/        5 imágenes optimizadas (jpg)
│   ├── public/brand/          logos
│   └── scripts/
│       └── optimize-assets.mjs    procesa PNGs raw → JPGs optimizados
│
├── Brochures/                 3 BROCHURES COMERCIALES (HTML → PDF)
│   ├── institucional.html     8 págs A4 horizontal · partners/sponsors
│   ├── membresias.html        10 págs A4 horizontal · membresías y Founders Club
│   ├── onepager-b2b.html      1 pág A4 vertical · propuesta B2B
│   ├── shared/styles.css      sistema de diseño compartido
│   ├── assets/                logos + renders procesados + QR
│   ├── output/                PDFs finales (los 3)
│   ├── export-pdf.js          genera los 3 PDFs (puppeteer-core + Chrome)
│   ├── make-qr.js             genera QR a speedwash.com.ar
│   ├── process-images.js      recorta watermark de los renders raw
│   └── IMAGE-PROMPTS.md       prompts IA para nuevos renders
│
├── Plan/                      PLAN DE NEGOCIO
│   ├── Plan-Lanzamiento-y-Negocio-2026.md     documento markdown completo
│   ├── presentacion-negocio.html               23 slides A4 horizontal
│   ├── build-pdf.cjs                           genera el PDF (reusa puppeteer)
│   ├── assets/                                 logos + renders
│   └── SpeedWash-Plan-de-Negocio-2026.pdf      PDF final
│
├── Graficas/                  Manual de marca, logos originales
├── Temp/
│   └── Lavdero USD.xlsx       Excel financiero original (USD, modelo viejo)
│
├── CLAUDE.md                  Config Claude Code · referencia este documento
└── CONTEXTO.md                Este archivo
```

## 9 · Pipelines de generación de PDF

Todos basados en **HTML + CSS → Chrome (puppeteer-core o headless) → PDF**.

### Brochures (3 PDFs)
```bash
cd Brochures
node export-pdf.js
# salida: Brochures/output/SpeedWash-{Institucional,Membresias,OnePager-B2B}.pdf
```
Pasos auxiliares (solo si entra material nuevo):
```bash
node make-qr.js          # si cambia la URL del QR
node process-images.js   # si llegan nuevos renders a web/public/renders/
```

### Presentación del plan (23 slides)
```bash
cd Plan
node build-pdf.cjs
# salida: Plan/SpeedWash-Plan-de-Negocio-2026.pdf
```

### Imágenes del sitio web
```bash
cd web
node scripts/optimize-assets.mjs
# entrada: web/public/renders/*.png (raw)
# salida:  web/public/renders/*.jpg (optimizado, watermark recortado)
```

### Dependencias y requisitos
- Node 24+
- Chrome instalado en `C:\Program Files\Google\Chrome\Application\chrome.exe`
- `Brochures/node_modules/` ya tiene: `puppeteer-core`, `sharp`, `qrcode`, `xlsx`
- `Plan/build-pdf.cjs` reusa puppeteer-core de Brochures via path relativo
- `web/node_modules/` (Next.js + sharp) — instalar con `npm install` en `web/`

## 10 · Sitio web (Vercel)

- **Repo:** `github.com/mejorhablemos/SpeedWash`
- **Branch de deploy:** `main`
- **Proyecto Vercel:** `speed-wash` → dominio `speedwash.com.ar`
- **Páginas:** `/` (home), `/b2b`, `/institucional`
- Stack: **Next.js 16** (Turbopack) · React · Tailwind · `next/image` para optimización.
- Datos del sitio centralizados en `web/lib/site.ts`.

Deploy automático: cualquier push a `main` redespliega.

## 11 · Estado actual (cosas terminadas)

- ✅ Rebrand completo aplicado en sitio y brochures.
- ✅ Sitio web live en speedwash.com.ar con los 5 renders nuevos.
- ✅ 3 brochures comerciales en PDF (institucional 8p, membresías 10p, one-pager 1p).
- ✅ Plan de negocio escrito y presentación PDF de 23 slides.
- ✅ Excel financiero original (`Temp/Lavdero USD.xlsx`) procesado y reflejado.
- ✅ Datos de contacto reales (Instagram + email) actualizados en el sitio y brochures.
- ✅ Memorias guardadas: `.claude/projects/b--Dev-SpeedWash/memory/`.

## 12 · Pendientes y decisiones abiertas 🔴

- **WhatsApp:** todavía no hay número. `web/lib/site.ts` tiene placeholder
  `341 012-3456` que aparece live en el sitio (Header, packs, Contacto, Footer,
  B2B, Institucional). Definir si se cambia por Instagram, email o por el
  número real cuando esté.
- **Litros por ciclo del equipo:** el "60% menos agua que un lavado manual"
  del institucional es una estimación; falta el dato exacto del fabricante.
- **Brochure de Membresías** dice "preventa exclusiva" — con la lógica nueva
  del plan (prueba primero, packs después), conviene ajustar el texto a algo
  como "sumate después de probarlo".

## 13 · Cómo retomar en una nueva sesión

En una sesión nueva de Claude (Code o claude.ai), decí:

> Estoy trabajando en Speed Wash Funes en `b:\Dev\SpeedWash`. Leé `CONTEXTO.md`
> en la raíz para todo el contexto del proyecto.

Eso es suficiente: Claude carga este documento y queda con todo el contexto
(negocio, plan, números, archivos, sistema de diseño, pipelines de PDF).

`CLAUDE.md` también referencia este documento, así que sesiones de Claude Code
en este repo lo cargan automáticamente.

---

### Tip final

Para cualquier nueva pieza visual (otro brochure, otro documento, un mailing),
**copiá la estructura de `Plan/presentacion-negocio.html` o
`Brochures/institucional.html`**. Tienen el sistema de diseño completo, fonts,
slides A4 horizontales, gráficos, tablas — todo listo para reutilizar.
