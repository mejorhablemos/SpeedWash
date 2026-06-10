# Changelog — Speed Wash app (lavar.speedwash.com.ar)

Este changelog documenta cambios aplicados al frontend de la PWA Vue (carpeta
`src/`) **y** las acciones pendientes que requieren intervención del backend
(mantenido por el proveedor en China). El sitio institucional Next.js
(carpeta `web/`) no está incluido — se versiona por separado.

Branch: `fix/app-lavar-cleanup`
Fecha: 2026-06-09

---

## 1. Cambios aplicados en el frontend (Vue) — no requieren backend

### 1.1 Branding · logo KIREI eliminado de "Crear cuenta"
**Archivo:** `src/pages/register-page.vue` (líneas 92-103 → 92-99)
**Cambio:** se reemplazó el bloque del logo. Antes mostraba
`@/assets/logo_trans.png` dentro de un contenedor cuadrado blanco
(`w-150 aspect-ratio-1 bg-white rounded-lg`) — ese asset es el logo
KIREI Car Wash heredado.

```diff
- <div class="py-10 text-center">
-   <div class="w-150 aspect-ratio-1 mx-auto bg-white rounded-lg flex-center shadow-sm overflow-clip">
-     <img src="@/assets/logo_trans.png" alt="logo" class="w-full aspect-ratio-1" />
-   </div>
- </div>
+ <div class="py-10 text-center">
+   <img src="@/assets/speedwash-logo.png" alt="Speed Wash" class="mx-auto h-80px w-auto" />
+ </div>
```

El asset `src/assets/speedwash-logo.png` ya existía. **Nota:** el asset
`src/assets/logo_trans.png` queda sin referencias en el frontend y puede
eliminarse en una limpieza posterior, junto con `src/assets/logo.jpg`.

### 1.2 Bug: "Continuar como invitado" devolvía a home en loop al comprar pack
**Archivos:** `src/pages/login-page.vue`, `locales/es-AR.json`, `locales/en.json`

El botón ahora se oculta cuando el usuario aterriza en `/login?redirect=...`
viniendo de una ruta que requiere cuenta real (no funciona con `guestId`):
`/vip`, `/vouchers`, `/wallet*`. En su lugar se muestra el mensaje:
> "Para comprar un pack necesitás registrarte. Es gratis y toma 30 segundos."

**Detalle login-page.vue:**
- Líneas 9-17: nueva constante `PURCHASE_PATHS` y computed `isPurchaseFlow`.
- Líneas 102-110: bloque del botón ahora con `v-if="!isPurchaseFlow"` y
  mensaje alternativo (`v-else`).

**Detalle locales:**
- `locales/es-AR.json` línea 76: nueva key
  `routes.login.purchaseRequiresAccount`.
- `locales/en.json` línea 75: misma key en inglés (mantenido como fallback).

### 1.3 Username autogenerado — atajo a editar nombre desde "Mi cuenta"
**Archivo:** `src/pages/mine-page.vue` (líneas 25-28 → 25-31; 145-151 → 145-157)

El backend devuelve `nickName` como un código tipo `b9xN3842` cuando el usuario
no eligió uno. La pantalla de edición ya existía (`/settings/nickname`) pero no
era descubrible. Se agregó un ícono de lápiz al lado del nombre que linkea
directo:

```diff
- <div class="mine-user-info">
-   <h2 class="mine-user-name">{{ userInfo?.nickName || 'Usuario' }}</h2>
-   <p class="mine-user-phone">{{ userInfo?.phoneNum || '' }}</p>
- </div>
+ <div class="mine-user-info">
+   <router-link to="/settings/nickname" class="mine-user-name-row">
+     <h2 class="mine-user-name">{{ userInfo?.nickName || 'Usuario' }}</h2>
+     <van-icon name="edit" size="14" color="rgba(255,255,255,0.5)" />
+   </router-link>
+   <p class="mine-user-phone">{{ userInfo?.phoneNum || '' }}</p>
+ </div>
```

Se sumó la regla CSS `.mine-user-name-row` (líneas 145-151) para el layout
inline del nombre + ícono.

### 1.4 "Pagá en efectivo y ahorrá más" oculto hasta confirmar operatoria
**Archivo:** `src/pages/washer/index.vue` (líneas 1-9 y 277-291)

El bloque promocional de pago en efectivo se ocultó detrás de un feature flag
local con default `false`. No se sabe aún el porcentaje real de descuento ni
la operatoria. Cuando el equipo de operaciones lo confirme, basta con cambiar
`SHOW_CASH_OFFER` a `true` y completar el texto en
`routes.washer.cashOffer.subtitle` con el porcentaje exacto.

```diff
+ // Feature flag — pasar a true cuando RR.PP. confirme % de descuento
+ // por pago en efectivo y la operatoria en sucursal. Default off al lanzamiento.
+ const SHOW_CASH_OFFER = false;
```

```diff
- <div class="px-4 py-3">
+ <div v-if="SHOW_CASH_OFFER" class="px-4 py-3">
```

### 1.5 String hardcodeado en pantalla de packs vacíos
**Archivos:** `src/pages/voucher/index.vue`, `locales/es-AR.json`

El botón "Ver planes disponibles" del empty state estaba hardcodeado en el
template. Se movió al sistema de i18n:

- `voucher/index.vue:77`: `{{ t('routes.voucher.viewPlans') }}` reemplaza el
  literal.
- `locales/es-AR.json:74`: nueva key `routes.voucher.viewPlans`.

---

## 2. Pendientes que requieren intervención del backend (proveedor en China)

Estos items NO se pueden resolver desde el frontend. Documentados acá para
que el proveedor los aplique en la próxima ventana de release.

### 2.1 SMS de verificación dice "Kirei Car Wash"
**Prioridad:** ALTA (afecta percepción de marca en cada registro/login).
**Endpoint involucrado:** `POST /user/sms/regedit` y `POST /user/sms/resetPwd`
(template del SMS gateway).
**Acción solicitada:** reemplazar el texto del template del SMS de:
> "[Kirei Car Wash] Your verification code is XXXXXX"

por:
> "[Speed Wash] Tu código de verificación es XXXXXX. Vence en 5 minutos."

(o equivalente en inglés si el SMS gateway no soporta UTF-8 con tildes; en
ese caso: "Speed Wash: your verification code is XXXXXX. Expires in 5 min.")

### 2.2 Mensaje en chino: "未登录或登录已失效"
**Prioridad:** MEDIA.
**Contexto:** este texto fue reportado por el usuario apareciendo en la
pantalla de login entre los botones de "Crear cuenta nueva | Olvidé mi
contraseña" y "Continuar como invitado". No aparece en ninguna parte del
código del frontend Vue revisado (`src/`). La hipótesis es que viene del
backend como mensaje de respuesta a `code === 999` (sesión expirada / no
autenticado), renderizado por algún manejador genérico.
**Acción solicitada:**
1. Verificar dónde se origina ese string en el backend. Es probable que sea
   el `msg` de la respuesta `{ code: 999, msg: "未登录或登录已失效" }`.
2. Reemplazar por (español rioplatense): "Tu sesión expiró. Iniciá sesión
   de nuevo." — o bien devolver solo el code y dejar que el frontend mapee
   el mensaje localizado.

### 2.3 Mensaje en inglés: "This cell phone number is not yet registered"
**Prioridad:** MEDIA.
**Contexto:** aparece como respuesta del backend al intentar login con un
número no registrado. Tampoco está en el frontend Vue.
**Acción solicitada:** traducir el `msg` de respuesta a:
> "Este número no está registrado. ¿Querés crear una cuenta?"

Ideal: devolver código de error tipificado (ej. `code: 1004` =
`PHONE_NOT_REGISTERED`) y dejar que el frontend renderice el mensaje
localizado desde i18n. Eso evita futuras traducciones manuales.

### 2.4 Username autogenerado tipo "b9xN3842"
**Prioridad:** BAJA.
**Contexto:** al registrarse, el backend devuelve `nickName` como un código
aleatorio. El frontend ya permite editarlo desde `/settings/nickname` (y
ahora hay un atajo desde "Mi cuenta" — ver punto 1.3).
**Acción solicitada (opcional):** considerar usar como `nickName` por
defecto los últimos 4 dígitos del teléfono ("Usuario 5482") o pedir nombre
durante el registro. Es UX, no bloqueante.

### 2.5 Strings residuales en chino dentro del payload del backend
**Prioridad:** BAJA.
**Contexto:** no se detectaron strings en chino en archivos Vue/JS del
frontend que sean visibles al usuario (los caracteres chinos encontrados
están en comentarios JSDoc del código y en el archivo de documentación
`src/api/阿根廷_用户.md`, ninguno se renderiza).
**Acción solicitada:** auditar los `msg` de respuesta del backend con
`lang: ES` y traducir los que aún devuelvan chino. Se recomienda revisar
los mensajes de error de:
- `washApi.calPrice` (cálculo de precio)
- `washApi.newOrder` (creación de orden)
- `orderApi.refundApply` (solicitud de reembolso)
- `myPageApi.setPwd` / `setMyInfo` (configuración)

---

## 3. Auditoría de marca KIREI (grep -ri "kirei")

Se ejecutó búsqueda case-insensitive en todo el repositorio. Resultado:

| Archivo | Línea | Contenido | Acción |
|---|---|---|---|
| `package-lock.json` | 2 | `"name": "kirei-car-wash"` | Coordinar con `package.json` y regenerar lockfile (`pnpm install`). |
| `src/assets/logo_trans.png` | — | Asset binario | Ya no referenciado desde el código tras el cambio 1.1. Puede eliminarse en limpieza. |
| `src/assets/logo.jpg` | — | Asset binario | Verificar usos restantes antes de borrar. |

**Acción recomendada para el lockfile:** revisar `package.json` (campo
`name`) en una limpieza separada — cambiarlo a `speedwash-app` y regenerar
`package-lock.json` / `pnpm-lock.yaml`. No se hizo en esta branch para
mantener el alcance acotado.

**Logo KIREI en SMS y backend:** ver puntos 2.1 y 2.5.

---

## 4. Resumen de archivos modificados

```
locales/en.json             |  3 ++-
locales/es-AR.json          |  4 +++-
src/pages/login-page.vue    | 17 +++++++++++++++--
src/pages/mine-page.vue     | 15 +++++++++++++--
src/pages/register-page.vue | 16 ++++++----------
src/pages/voucher/index.vue |  2 +-
src/pages/washer/index.vue  | 11 +++++++++--
7 files changed, 49 insertions(+), 19 deletions(-)
```

Ningún cambio toca el contrato de API. Todo lo aplicado es seguro para
deployar en frontend sin coordinar con el backend.
