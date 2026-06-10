# Brand Audit — PWA Vue (`src/`) vs Sistema de diseño Speed Wash

> Diagnóstico de alineación de la app (`lavar.speedwash.com.ar`) con la paleta
> y tipografía oficiales documentadas en `CONTEXTO.md §12`.
> **Fecha:** 10 jun 2026 · **Sin cambios aplicados — solo diagnóstico.**

## TL;DR

La base ya está **mayormente alineada**: la migración Kirei→Speed Wash se hizo
a nivel de tokens (UnoCSS + CSS vars + tema oscuro de Vant). El `primary
#00BBFC`, los fondos negros, las fuentes Space Grotesk + Inter y el tema dark
de Vant **están bien**.

Lo que falta es **afinado de matices** (los grises/azules secundarios no son
exactamente los del manual) y **limpiar colores hardcodeados sueltos** que
quedaron del template chino o que se metieron ad-hoc (verdes, rosas, amarillos,
rojos de error). Nada de esto es bloqueante para el lanzamiento, salvo 2-3
puntos visibles.

---

## 1 · Variables de color

**Dónde viven:** [uno.config.js](uno.config.js#L19-L35) (tokens UnoCSS) +
[src/styles/variables.css](src/styles/variables.css#L1-L49) (CSS vars + overrides
de Vant). Las dos fuentes están **sincronizadas entre sí** (bien).

### ✅ Alineado
- `primary` = **#00BBFC** ✅ (azul LED oficial) — [variables.css:3](src/styles/variables.css#L3)
- Fondo negro + tema dark de Vant vía `van-config-provider theme="dark"` ✅ — [layouts/default.vue:48](src/layouts/default.vue#L48)
- Utilities tech on-brand: `.led-line`, `.led-glow`, `.tech-grid`, `.tech-dots`, `.spark-glow` ✅ — [main.css:56-82](src/styles/main.css#L56-L82)
- Overrides de Vant (cell, navbar, tabbar, botones) mapeados a las vars ✅ — [variables.css:24-49](src/styles/variables.css#L24-L49)

### ⚠️ Parcialmente alineado (mismo concepto, valor distinto al manual)

| Token | Valor actual | Valor oficial (§12) | Archivo |
|---|---|---|---|
| Naranja spark | `#FF8C00` + light `#FFAB40` | **`#FF9416`** (single, uso mínimo) | [variables.css:6-7](src/styles/variables.css#L6-L7), [uno.config.js:23-24](uno.config.js#L23) |
| Surface (cards) | `#141418` | **`#17181B`** (g2) | [variables.css:11](src/styles/variables.css#L11) |
| Surface-2 (elevado) | `#1B1B20` | **`#1F2025`** (g3) | [variables.css:12](src/styles/variables.css#L12) |
| Hairline | `#232328` (sólido) | **`rgba(255,255,255,.085)`** + `.16` (alpha) | [variables.css:14](src/styles/variables.css#L14) |
| Azul highlight | `#5ED2FD` | **`#5BD6FF`** | [variables.css:5](src/styles/variables.css#L5) |
| Azul deep | `#0090CC` | **`#0079B8`** | [variables.css:4](src/styles/variables.css#L4) |
| Texto secundario | `#ACACB6` | **`#C9CDD2`** (wash) / `#9A9CA3` (grey) | [variables.css:17](src/styles/variables.css#L17) |
| Texto dim | `#6B6B73` | **`#62646B`** (grey-2) | [variables.css:18](src/styles/variables.css#L18) |
| Graphite/base | `#0B0B0D` + `#000000` | **`#08090A`** (g0) / `#101113` (g1) | [variables.css:9-10,13](src/styles/variables.css#L9-L13) |

> El manual define una **escala de 4 grises** (g0–g3) y **líneas en alpha
> blanco**; la app colapsó eso a 3 valores sólidos. Diferencias sutiles, pero
> visibles si se comparan lado a lado con el sitio web.

### ❌ Desalineado — colores hardcodeados fuera de paleta

**Restos Kirei (rojo/rosa del template chino):**
- `#FD5C57` y familia (`#FD7C78`, `#FECCCB`, `#FE8F8B`, `#FED5D4`, `#FFDFDE`) → [src/assets/icons/scan.svg](src/assets/icons/scan.svg) — **⚠️ asset MUERTO**, no se importa en ningún componente. Solo limpieza.
- `#FFC1B9` (rosa) → underline en [invite-group-header.vue:27](src/components/invite/invite-group-header.vue#L27)
- `#FF6B6B` (rojo Kirei) → `colorPrimary` del form de Stripe en [sr-checkout-form.vue:47](src/components/payment/sr-checkout-form.vue#L47) — **debería ser `#00BBFC`**

**Verdes ad-hoc (el manual NO tiene verde):**
- `#34D339`/`#34D399` (emerald) → estado "Abierto" en [shop-list-item.vue:192,198](src/components/shop-list-item.vue#L192), [status-tag.vue:34](src/components/status-tag.vue#L34), [home-page.vue:433](src/pages/home-page.vue#L433), [store/index.vue:239,245](src/pages/store/index.vue#L239) — semántico (success), pero off-brand
- `#2ecc71` (verde Kirei) → ícono "passed" en [mine-page.vue:83](src/pages/mine-page.vue#L83) y bg en [register-page.vue:306](src/pages/register-page.vue#L306)
- `#18C686` → pin de tienda en el mapa [map/index.vue:84](src/pages/map/index.vue#L84)
- `#4CD263` (verde) y `#6B7FF7` (índigo) → badges de rol en [mine/identity.vue:18-19](src/pages/mine/identity.vue#L18-L19)

**Amarillo fuera de paleta:**
- `#FFF1AD` → color de botón en [invite-header.vue:22](src/components/invite/invite-header.vue#L22) e [invite/rewards.vue:103](src/pages/invite/rewards.vue#L103)

**Grises sueltos (no son los greys oficiales):**
- `#969799`, `#999999`, `#C0C4C8`, `#9FB0CB` → varios ([settings/index.vue:46](src/pages/settings/index.vue#L46), [mine-page.vue:100](src/pages/mine-page.vue#L100), [voucher/index.vue:68](src/pages/voucher/index.vue#L68), [coupon-card.vue:59](src/components/coupon-card.vue#L59), [invite-group.vue:31](src/components/invite/invite-group.vue#L31), [payment/result.vue:117](src/pages/payment/result.vue#L117))
- `#001016` (casi negro custom) → [shop-list-item.vue:146](src/components/shop-list-item.vue#L146), [washer/index.vue:440](src/pages/washer/index.vue#L440)

**Rojo de error sin token:**
- `#E74C3C` → reembolsos/errores en [order-item.vue:21](src/components/order/order-item.vue#L21), [refund/index.vue:127,130](src/pages/order/refund/index.vue#L127) — el manual no define un rojo de error; habría que sumarlo como token.

**Brand de terceros (legítimos, dejar como están):**
- `#635BFF` (Stripe blurple) → assets de Stripe — OK, es branding de Stripe.
- `#4285F4` (Google blue) → marcador de ubicación actual en Google Maps [useGoogleMap.js:55](src/composables/useGoogleMap.js#L55), [map/index.vue:112](src/pages/map/index.vue#L112) — OK.
- `vue.svg` (#41B883/#35495E) → asset del template Vite, **muerto**, se puede borrar.

---

## 2 · Tipografía

### ✅ Alineado
- **Space Grotesk + Inter** se cargan desde Google Fonts — [main.css:2](src/styles/main.css#L2). (El CSP que limitaría `font-src` está **comentado** en [index.html](index.html#L17-L31), así que cargan sin problema.)
- `body` usa **Inter** (`--font-sans`) y `--font-display` = **Space Grotesk** ✅ — [main.css:8-24](src/styles/main.css#L8-L24)
- No hay fallback a Roboto/Arial/PingFang hardcodeado (grep limpio) ✅

### ⚠️ Parcialmente alineado

| Item | Actual | Oficial (§12) | Archivo |
|---|---|---|---|
| `letter-spacing` display | `-0.02em` | **`-0.04em`** | [main.css:39](src/styles/main.css#L39) |
| Supra/eyebrow labels | Space Grotesk, `.72rem`, `ls .3em` | **Inter 600, 9px, `ls .26em`** | [main.css:42-49](src/styles/main.css#L42-L49) |

- No existe el estilo **"microtexto técnico"** (Space Grotesk 400, 8px, ls .18em) del manual — si se quiere ese detalle dashboard, hay que crearlo.

---

## 3 · Componentes

| Componente | Estado | Notas |
|---|---|---|
| Botón primario | ✅ | Gradiente `#00BBFC → #0090CC` vía token Vant — [variables.css:43](src/styles/variables.css#L43) |
| Botón naranja (Escanear / packs) | ⚠️ | Usa `#FF8C00` (naranja incorrecto vs `#FF9416`); además gradiente naranja+light, el manual pide naranja **single y mínimo** — [home-page.vue:230](src/pages/home-page.vue#L230) |
| Inputs / fields | ✅ | Heredan tema dark de Vant |
| Cards | ⚠️ | Estructura OK (border + radius), pero fondo `#141418` ≠ g2 `#17181B` |
| Bottom tabbar | ✅ | Activo = `primary #00BBFC` — [variables.css:48](src/styles/variables.css#L48) |
| NavBar | ✅ | Gradiente de marca + texto `#F4F4F6` — [layouts/default.vue:23-34](src/layouts/default.vue#L23-L34) |
| **Radius de CTAs** | ⚠️ filosófico | El manual pide **bordes rectos / radius ≤4px** (estética Tesla/Linear). La app usa `round` y `rounded-2xl` (14–18px) en todos los CTAs/cards. Divergencia de criterio — quizá intencional para app mobile, pero **no matchea** el sitio web. |

---

## 4 · Iconografía

- **Mix Vant + SVG custom.** La mayoría son íconos **built-in de Vant** (`scan`,
  `award-o`, `arrow`, `location-o`, `info-o`, `wap-home-o`…) — monoline,
  consistentes, coloreados vía tokens. ✅
- SVGs custom **en uso:** `flashlight.svg`, `picture-album.svg` (scanner),
  `stripe.svg`, `stash--payment-link.svg`. Consistentes. ✅
- SVGs custom **muertos** (no importados): `scan.svg` (con rojo Kirei),
  `map.svg`, `vue.svg`. → limpieza.
- ⚠️ Algunos íconos colorean hardcodeado fuera de paleta (`#2ecc71` en
  [mine-page.vue:83](src/pages/mine-page.vue#L83), `#C0C4C8` en varios).

---

## Priorización sugerida — Launch (10 jul) vs Etapa 2

### 🔴 Pre-launch (visible, bajo esfuerzo)
1. **Naranja**: unificar `#FF8C00`/`#FFAB40` → `#FF9416` en tokens (1 cambio en `variables.css` + `uno.config.js` propaga a todo).
2. **Form de Stripe** `#FF6B6B` → `#00BBFC` ([sr-checkout-form.vue:47](src/components/payment/sr-checkout-form.vue#L47)) — rojo Kirei a la vista en el checkout.
3. **Verde "passed"** `#2ecc71` → token verde único, y definir si el verde de "Abierto" (`#34D399`) es el verde oficial de success (el manual no lo tiene → **decisión de marca pendiente**).

### 🟡 Etapa 2 (afinado fino, no se nota en demo)
4. Ajustar grises/azules secundarios a los valores exactos del manual (surface `#17181B`, líneas en alpha, texto `#C9CDD2`/`#9A9CA3`, etc.).
5. `letter-spacing` display `-0.04em` + eyebrow a Inter 9px.
6. Limpiar assets muertos (`scan.svg`, `map.svg`, `vue.svg`) y grises sueltos.
7. Definir tokens faltantes: rojo de error, verde de success, microtexto técnico.

### 🟢 Decisión de criterio (no es bug)
8. **Radius de CTAs**: el sitio usa bordes ~rectos (manual); la app usa `round`.
   Decidir si la app adopta el radius mínimo o si mantiene el estilo redondeado
   mobile. Afecta coherencia app↔web.

---

*Generado como diagnóstico. Próximo paso: confirmar prioridades y abrir branch
`fix/brand-colors` para los puntos 🔴.*
