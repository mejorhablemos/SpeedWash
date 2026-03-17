# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SpeedWash is a mobile-first car wash service PWA built with Vue 3 (Composition API + `<script setup>`), targeting the Argentine market. Users can scan washing machines, pay via Mercado Pago or wallet balance, track orders, manage VIP memberships, and find stores on a map. The app supports English and Simplified Chinese.

## Build & Dev Commands

```bash
pnpm dev              # Dev server with HTTPS + HMR
pnpm build            # Production build
pnpm build-staging    # Staging build (uses .env.staging)
pnpm preview          # Preview production build
```

Package manager: **pnpm** (>=8.0.0). Node.js >=16.0.0.

## Environment Variables

```
VITE_API_BASE_URL      # Backend API base URL
VITE_GOOGLE_MAPS_KEY   # Google Maps API key
```

## Architecture

### API Layer (`src/api/index.js`)
All API modules use a `createApi(baseUrl)` factory built on `@vueuse/core`'s `createFetch`. The factory auto-injects `token` and `lang` headers, handles auth expiry (code 999 → redirect to /login), and unwraps the `{code, data, msg}` response envelope. Each API function returns a chainable `.post(data).json()` call.

12 API modules: `washApi`, `orderApi`, `vipCardApi`, `smsApi`, `topUpApi`, `myPageApi`, `membershipApi`, `loginApi`, `inviteRewardApi`, `indexApi`, `fileApi`, `storeApi`.

### Composables (`src/composables/`)
Reusable logic extracted via Vue composition functions. Key ones:
- `useApi` — the `createApi` factory itself
- `useAuth` — login/register form logic, SMS countdown, validation
- `usePayment` — payment orchestration across wash orders, VIP cards, top-ups
- `usePaymentCheck` — polls payment status and machine readiness with timeout
- `useGoogleMap` — Google Maps with Singapore bounds config
- `useOrder` — order list management

### State Management (`src/stores/modules/`)
Pinia stores with localStorage persistence:
- `useUserStore` — token, userInfo, guestId, login/logout actions
- `useMembershipStore` — identity verification, membership applications
- `useGuestUserStore` — anonymous user tracking

### Routing (`src/router/index.js`)
30+ routes with lazy-loaded page components. Auth guard in `src/modules/router.js` protects all routes except public pages (home, scan, map, login, register, invite, forgot-password). Route meta controls: `titleKey`, `showTabbar`, `gradientBg`, `hideNavBar`.

### Layout (`src/layouts/default.vue`)
Single layout wrapper with Vant NavBar (gradient support), bottom Tabbar (Home/Scan/Profile), and safe area insets.

### UI Framework
- **Vant 4** — mobile component library, auto-imported via `unplugin-vue-components`
- **UnoCSS** — atomic CSS with custom theme colors: primary `#FD5C57`, secondary `#2ecc71`, background `#F5F7FA`. Custom responsive `vw`-based unit rules for mobile sizing.

### i18n (`locales/`)
Vue I18n with `en.json` and `zh-CN.json`. Locale detection in `src/utils/locale.js`. API sends `lang` header as `CN` or `EN`.

### Path Aliases (vite.config.js)
`@` → `src/`, `@components`, `@pages`, `@assets`, `@router`, `@store`, `@utils`, `~i18n` → `locales/`

## Key Patterns

- All Vue components use `<script setup>` with Composition API
- Vant components and Vue/VueUse composables are auto-imported (no manual imports needed)
- Payment flow: create order → Mercado Pago checkout or balance deduction → poll status via `usePaymentCheck`
- Currency math uses `decimal.js` for precision
- Barcode scanning via `@zxing/library` in `src/components/barcode-scanner.vue`
- Constants (timeouts, payment statuses, methods, sources) defined in `src/constants/index.js`
