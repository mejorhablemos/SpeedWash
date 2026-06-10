# Product Marketing Context — Speed Wash Funes

*Last updated: 2026-06-10*
*Fuente principal: `CONTEXTO.md` (raíz del repo, v2.0 · 10 jun 2026) + copy del sitio `web/` + brochures.*
*App como **fuente de verdad de precios** (lavar.speedwash.com.ar). El sitio web debe reflejarla siempre.*

---

## Product Overview

**One-liner:** El primer lavadero automático digitalizado de la región — touchless, 24 hs, en Funes.

**Tagline operativo:** *"Sin turnos. Sin esperas. En minutos."*

**What it does:** Lavadero automático con 2 máquinas (1 rodillo soft-touch + 1 touchless sin contacto), aspirado self-service y operación 24 hs. El usuario llega, escanea la máquina desde la PWA (o la cámara lee la patente y arranca solo si tiene activación automática), paga (Mercado Pago o saldo wallet/pack) y el lavado arranca. **Ciclo real ~8 minutos · se comunica como "en menos de 10 minutos"** (regla: nunca prometer 7 min). Capacidad 110–140 autos/día con ambas máquinas. **Solo lavado exterior**: el interior no se toca — vos aspirás vos mismo en el self-service.

**Product category:** Lavadero automático / car wash automatizado. La gente lo busca como "lavadero de autos en Funes", "lavadero automático", "lavadero 24 hs". El reposicionamiento es: *no es un lavadero, es otra categoría* (tech premium, no servicio tradicional).

**Product type:** Servicio físico (local) + capa digital (PWA Vue 3 + sitio Next.js + sistema de packs prepagos y Founders Club). Ubicación física en ecosistema comercial Calmo Funes.

**Apertura:** 10 julio 2026 (interno) · "julio 2026" (público hasta confirmar fecha).

**Estructura societaria:**
- **Fuxio S.R.L.** — sociedad operadora del lavadero (Papu + Matías + Germán socio gerente).
- **Rosario Tech S.R.L.** — propietaria del inmueble, alquila a Fuxio (contrato 20 años, dólar libre Ámbito).

**Business model:**
- **Lavados individuales (precio único, no diferencia por tamaño de auto):**
  - **Plus** — $23.000 (doble shampoo + prelavado).
  - **Premium** — $25.000 (Plus + capa de cera SpeedWash Premium).
  - Gancho comercial: *"Una Hilux paga lo mismo que un Onix"* (camioneteros ahorran 60–70% vs lavadero a mano).
- **Packs prepagos (todos Premium con cera) — en venta YA desde la app:**
  - **Speed 4** — $95.000 ($23.750/lav · 5% off · 60 días · sin cupo).
  - **Speed 8** — $180.000 ($22.500/lav · 10% off · 180 días · sin cupo).
  - **Speed 12** — $240.000 ($20.000/lav · 20% off · 180 días · sin cupo).
  - **Speed 12 Founders** — **$220.000** ($18.333/lav · **27% off** · 180 días · **50 cupos limitados**).
- **Flexibilidad de pack:** 1 pack = 1 patente asociada (opcional) o se usa logueado en app desde cualquier auto. Se puede compartir en familia. **No** se mezclan lavados entre packs ni se asocian múltiples patentes a un mismo pack (limitación backend chino, fase 2).
- **B2B (Speed Corporate):** flotas, hoteles, concesionarias — a consultar. Empuje fuerte fase D (oct–dic).
- **Pago:** 100% blanqueado vía MercadoPago en app. Pago en efectivo en local físico posible (flag `SHOW_CASH_OFFER` hoy en `false`, decisión comercial abierta sobre 10% off por efectivo).
- **Inversión total:** USD 193k all-in · costos fijos USD 6.480/mes · costo variable USD 0,76 por lavado · break-even ~12 autos/día · EBITDA jul–dic 2026 ~USD 103k · recupero ~10 meses.

---

## Target Audience

**Target geográfico (priorizado):**
- **Primario:** Funes (~40.000 hab · ~15.500 autos) + Roldán (~25.000 hab · ~7.500–8.500 autos). Total: ~23.000–24.000 autos.
- **Secundario:** Fisherton / zona oeste de Rosario.
- **Targeting Meta Ads:** Funes + Roldán + Fisherton, **radio 8–10 km**.

**Tamaño de mercado direccionable:** ~23.000–24.000 autos en target primario.

**Target customer (B2C):**
- Dueños de auto en Funes/Roldán/Fisherton que valoran su tiempo, su auto y la conveniencia.
- Perfil mid-high income, **edad 28–58**, sensible a estética premium (Tesla/Porsche), early adopters de servicios digitales.
- Usan auto a diario, quieren mantenerlo impecable sin perder tiempo en lavaderos tradicionales (esperas, turnos, charla forzada).
- **Camioneteros** son sub-segmento clave: en el lavadero a mano pagan 30–35% más por SUV/Hilux; acá pagan lo mismo que un Onix. Ahorro tangible y argumento de copy fuerte.

**Target customer (B2B — Speed Corporate):**
- **Flotas corporativas** (logística, sales, servicios).
- **Hoteles** (autos de huéspedes, vehículos propios).
- **Concesionarias** (lavado de stock, entregas).
- Comercios con flota o autos de cortesía.

**Primary use case:** "Quiero el auto limpio rápido, sin trámite y a cualquier hora — y nadie tiene por qué meterse adentro de mi auto."

**Jobs to be done:**
1. **Funcional:** Lavar el auto en menos de 10 minutos sin pedir turno ni hablar con nadie.
2. **Emocional:** Sentir que cuido mi auto con tecnología premium (no con un trapo y manguera) y que mi interior es mi espacio privado.
3. **Social:** Estar entre los primeros en usar algo nuevo y diferente en Funes ("founders"). Mostrar en redes "el lavadero del 2026" vs el del 2010.
4. **B2B:** Resolver lavado de flota con facturación A y control por vehículo, sin coordinar logística manual.

**Use cases:**
- Después del trabajo / antes de una reunión.
- Sábado a la noche / domingo temprano (cuando los lavaderos están cerrados).
- Lavado de mantenimiento semanal con pack prepago.
- Día después de lluvia (todos quieren lavar, ahí pegamos retargeting).
- Camioneta/SUV/Pickup: ahorro fuerte vs lavadero a mano (precio único).
- Flota corporativa con rotación programada.
- Hotel que ofrece "auto lavado" como amenity.

---

## Personas

| Persona | Cares about | Challenge | Value we promise |
|---|---|---|---|
| **Conductor premium B2C** | Su tiempo, la estética de su auto, no perder el sábado en un lavadero | Lavaderos lentos, con turnos, calidad inconsistente, cierran cuando él tiene tiempo | "Tu auto listo en minutos, 24 hs, sin contacto, sin esperas" |
| **Camionetero / SUV** | Pagar lo justo, no que le cobren más por el tamaño | El lavadero a mano cobra 30–35% más por SUV/Hilux | "Una Hilux paga lo mismo que un Onix" — 60–70% de ahorro real |
| **Comprador de pack (Speed 12)** | Ahorro + conveniencia recurrente | Pagar precio pleno cada vez, olvidarse de lavar el auto | "Lavá más, pagá menos" — 20–27% off + cera incluida en todos los lavados |
| **Founder (Speed 12 Founders)** | Ser de los primeros, mejor precio, pertenecer | Los 50 cupos se llenan y se queda afuera | "27% off · 50 cupos · acceso prioritario · foto épica F1" |
| **Decisor B2B (gerente operaciones)** | Costo por unidad, facturación A, control, escalabilidad | Coordinar lavado de flota es un dolor logístico | "Speed Corporate — packs por flota, facturación A, panel por vehículo" |
| **Mami/papi obsesivo con la privacidad** | Que nadie meta mano adentro del auto | Lavadero a mano = un tercero entra al auto (cosas, sillita del nene, papeles) | "Vos lavás, vos aspirás, nadie toca tu interior" |

---

## Problems & Pain Points

**Core problem:** *Lavar el auto en Funes es ineficiente, lento, inconsistente y atado a horarios comerciales.*

**Why alternatives fall short:**
- **Lavaderos manuales tradicionales:** Esperas largas, turnos por WhatsApp, calidad variable según quién esté de turno, cierran de noche y los domingos, riesgo de marcar la pintura con trapos sucios.
- **Lavado en casa:** Manguera + balde + tiempo + ensucia la vereda. Resultado pobre. Insostenible en agua.
- **No lavar:** El auto se deteriora estéticamente y técnicamente (suciedad ácida, contaminación, etc.).
- **Lavadero de estación de servicio:** Calidad muy baja, no respeta detalles, daña pintura con cepillos duros.

**What it costs them:**
- **Tiempo:** 45–90 min por lavado en lavadero tradicional (incluyendo viaje + espera).
- **Plata:** Precios sin escala / sin descuento por recurrencia.
- **Imagen:** Auto sucio o mal lavado afecta percepción (especialmente para uso profesional / clientes).
- **Frustración:** Tener ganas/tiempo un domingo y no encontrar nada abierto.

**Emotional tension:**
- "Quiero cuidar mi auto pero no tengo tiempo de perder en esto."
- "Pagué un fierro y no quiero que un trapo sucio le marque la pintura."
- "Los lavaderos son una experiencia incómoda. No quiero estar ahí."

---

## Competitive Landscape

> **Regla operativa (no negociable):** **nunca** nombrar a la competencia en piezas públicas. Funes es pueblo chico. Posicionarse por **contraste implícito** ("el lavadero del 2010 vs el del 2026"), no por ataque directo.

**Direct (mismo problema, misma solución — lavar auto):**

- **Espacio SÍ (@espaciosi.ar — Sarmiento 1418, Funes · 2.312 seguidores).** Service center multiservicio: seguros + alarmas + lavadero a mano + baterías + Bosch service + detailing. **El lavadero es solo una pata más de su negocio.** Precios (lavado a mano completo ext + int, jun 2026):

  | Tipo | Tradicional final | Premium final |
  |---|---|---|
  | Auto | $26.620 | $30.250 |
  | SUV | $29.040 | $32.670 |
  | Camioneta | $31.460 | $35.090 |
  | Camioneta XL | $36.300 | $39.930 |

  Falla en (huecos a explotar sin nombrarlo):
  1. Turno previo obligatorio.
  2. +1 hora del cliente (dejar + buscar).
  3. Falta de privacidad del interior (un tercero entra al auto).
  4. Lavado manual inconsistente (depende de quién esté de turno).
  5. Horarios limitados (no opera 24 hs).
  6. Comunicación dispersa entre 6 productos distintos.
  7. Cobra por tamaño del auto (SUV y XL pagan 9–37% más que un auto chico).

- **Otros lavaderos manuales en Funes/Roldán/Fisherton.** Falla en: velocidad, horarios, consistencia, experiencia, estética.

- **Lavaderos automáticos en estaciones de servicio (Axion, YPF, etc.).** Falla en: calidad baja, daño potencial a la pintura, sin sistema de packs, sin canal digital, no es destino, es secundario.

**Secondary (mismo problema, distinta solución):**
- **Detailing premium "a domicilio" (mobile detailing).** Falla en: precio alto, agendamiento, no es para uso recurrente.
- **Lavado en casa con manguera.** Falla en: tiempo, calidad, sustentabilidad.

**Indirect (no lavar / aceptar suciedad):**
- **Postergación crónica.** Falla en: deterioro estético y mecánico del auto.

**Vacío del mercado:** No existe en Funes/Roldán/Fisherton un lavadero **automático digitalizado**, con packs prepagos, operación 24 hs y activación automática por patente. Speed Wash es el primero.

---

## Differentiation

**Key differentiators (ordenados por impacto):**

1. **⭐ Activación automática por patente** — la cámara lee la patente y arranca el lavado solo, sin tocar la app. **Nivel Tesla.** Diferencial más fuerte y sub-explotado a la fecha — debería protagonizar el copy.
2. **Privacidad total del interior** — nadie toca tu auto adentro. Vos lavás, vos aspirás. Diferencial fuerte vs lavadero a mano (donde un tercero entra al auto).
3. **24 hs sin turnos · sin esperas** — autoservicio total. Lavás un domingo a las 3 AM si querés.
4. **Precio único por auto** (no por tamaño) — "una Hilux paga lo mismo que un Onix". Ahorro fuerte para camionetas/SUV.
5. **Menos de 10 minutos por lavado** — ciclo real ~8 min. Métrica verificable.
6. **Sistema digital integrado** — PWA para escanear, pagar, ver historial, gestionar packs y saldo. Mercado Pago + wallet.
7. **Packs prepagos con descuentos progresivos** — hasta 20% off (Speed 12) y **27% off + 50 cupos** (Speed 12 Founders).
8. **2 máquinas complementarias** — rodillo soft-touch (limpieza profunda) + touchless (sin contacto físico para los más cuidadosos).
9. **Estética premium tech** — diseño Tesla/Porsche/Linear, cero "estética lavadero".
10. **Founders Club / comunidad** — pertenencia, foto épica F1, presencia de marca.
11. **B2B (Speed Corporate)** — facturación A, control por vehículo, dirigido a flotas/hoteles/concesionarias.
12. **Sustentabilidad** — uso eficiente del agua. *(Estimación "60% menos agua que un lavado manual" pendiente de confirmación del fabricante.)*

**Cláusula importante:** **NO lavamos interior.** Esto es un feature, no una limitación — se comunica como privacidad ("nadie toca tu interior") + autoservicio de aspirado.

**How we do it differently:** Donde el resto vende un servicio transaccional ("lavá tu auto"), nosotros vendemos una experiencia tech premium con capa digital, comunidad y recurrencia. La marca y la estética son parte de la propuesta de valor, no decoración. **El cliente nunca interactúa con un humano** — eso es el feature, no una falla.

**Why that's better:**
- Para el cliente: ahorrás tiempo, cuidás el auto, lo hacés cuando querés, lo hacés con orgullo, mantenés tu privacidad.
- Para el negocio: recurrencia (packs), brand love (founders), márgenes (variable USD 0,76 vs precio ~USD 22 = ~97% bruto).

**Why customers choose us:** "Porque no es un lavadero. Es otra categoría." (Tagline central.)
**Tagline operativo de campañas:** *"Sin turnos. Sin esperas. En minutos."*

---

## Objections

| Objection | Response |
|---|---|
| "¿Me daña la pintura?" | Touchless real (sin contacto) + rodillo soft-touch en la otra máquina. Cuida la pintura y los detalles más delicados. Elegís cuál. |
| "¿Vale la pena pagar un pack?" | Speed 12: $240.000 = **$20.000/lavado vs $25.000 precio pleno Premium** → ahorrás 20% + tenés cera incluida en todos. Recuperás en ~5 lavados. **Speed 12 Founders ($220.000) ahorra 27% y son solo 50 cupos.** |
| "¿No es muy caro $23–25k por lavado?" | Lavado a mano cerca: $26.620 (auto chico) hasta $39.930 (Camioneta XL). Acá pagás lo mismo independiente del tamaño + es en 10 min sin turno. Una Hilux ahorra ~$15.000 por lavado. |
| "¿Cuánto tarda?" | Menos de 10 minutos (ciclo real ~8). Tiempo verificable. |
| "¿Y si llueve / hace frío?" | Para eso es 24 hs y sin personal — venís cuando quieras, no dependés de horarios. Lluvia = al otro día, cuando todos quieren lavar, vos ya estás listo. |
| "¿Funciona realmente a las 3 AM?" | Sí — sistema 100% automatizado, autoservicio, sin personal nocturno. Lavás cuando vos podés, no cuando ellos abren. |
| "¿Y si pago y no anda la máquina?" | Sistema digital con detección de estado de máquina, devolución automática a saldo wallet si hay falla. |
| "¿Aspira por dentro?" | **No — y eso es justamente el feature.** Nadie toca tu interior. Tenés aspirado self-service en el local para hacerlo vos mismo cuando quieras. |
| "¿Y si compré el pack y se llena de gente?" | El cuello no es la fila de espera (es automático): es la capacidad de máquina. Te avisamos en la app si hay demora real. |
| "Soy escéptico — nunca probé un automático" | El primer lavado bonificado de la apertura es justamente para eso. Premisa interna: *"nadie compra lo que no probó"*. |

**Anti-persona:**
- Quien valora la conversación con el lavandero (parte de la rutina social).
- Quien quiere detailing premium con cera + cuidado de cuero + interior profundo — no es nuestro servicio.
- Quien lava el auto 1 vez al año (no le rinde el pack, igual puede ser usuario one-shot).
- Quien quiere que le laven el interior — no es nuestro servicio, y comunicarlo claro evita decepción.
- Quien desconfía profundamente de pagar por adelantado (puede comprar lavados individuales sin pack).

---

## Switching Dynamics

**Push (lo aleja del lavadero actual):**
- Esperas largas / turnos / "vení más tarde".
- Calidad inconsistente / arañazos de cepillos / trapo sucio.
- Cerrados los domingos a la tarde o de noche, justo cuando él tiene tiempo.
- Pagar siempre el mismo precio sin beneficio por recurrencia.

**Pull (lo atrae a Speed Wash):**
- "Sin turnos. Sin esperas. En minutos." (velocidad tangible)
- 24 hs (libertad de horario — lavás un domingo 3 AM)
- Activación automática por patente (la cámara te reconoce y arranca solo — momento Tesla)
- Touchless o rodillo soft-touch (cuidado del auto, elegís cuál)
- Privacidad total del interior (nadie entra a tu auto)
- Precio único por tamaño (camionetera ahorra ~$15k vs lavadero a mano)
- Estética premium (orgullo de uso)
- Packs con ahorro real (20% off Speed 12 · 27% off Founders)
- Ser de los 50 Founders limitados (escasez real, no inventada)

**Habit (lo mantiene en lo viejo):**
- Hábito: ya conoce al del lavadero de siempre.
- Locación: lavadero cerca de su casa/oficina.
- "Total, ya está, no voy a cambiar."
- Pereza de aprender un sistema nuevo (PWA, escanear, packs).
- "Me hablan del estado del auto al pasar el trapo" — vínculo informativo difícil de igualar.

**Anxiety (le da miedo del cambio):**
- "¿Y si la máquina me daña el auto?" (touchless + soft-touch + se elige cuál — responde)
- "¿Y si pago un pack de $240k y la empresa cierra?" → mostrar trayectoria, equipo, inversión real (USD 193k), contrato 20 años con el inmueble. Founders es opt-in para los más entusiastas; el resto puede empezar con lavado suelto.
- "¿Sabré usar la app?" (UX simple + personal en horario diurno + activación por patente = no necesitás app después del primer setup)
- "¿Es realmente premium o me están vendiendo humo?" (estética + experiencia tienen que matchear — riesgo de marca alto si falla)
- "¿Me cobran ‘premium’ por algo automático sin atención?" → exhibir el ahorro concreto vs a-mano y los features (cera, touchless, 24 hs).

---

## Customer Language

**How they describe the problem (hipótesis, validar en fase A–B):**
- "No tengo tiempo de bancarme un lavadero."
- "Los lavaderos son una pérdida de sábado."
- "El último me rayó la pintura."
- "Lo lavo cuando puedo, y nunca puedo."
- "En Funes no hay nada bueno cerca."

**How they describe us (apuntar a estas frases en testimonios fase B):**
- "Es otra cosa. No es un lavadero."
- "Lo dejé y en 8 minutos estaba listo, brillaba."
- "Lo uso de noche cuando vuelvo del laburo. Es un golazo."
- "Pasa la cámara, lee la patente, arranca solo. Posta de Tesla."
- "Ya tengo el Founders, lavo cuando quiero y nunca pago precio pleno."
- "Tengo Hilux y antes pagaba el doble — acá es lo mismo que un Onix."

**Words to use:**
- Touchless, automático, 24 hs, packs, Founders, premium, en minutos, sin esperas, sin turnos, sin contacto, sin turno, activación por patente, comunidad, autoservicio, brillo, acabado, cera, soft-touch, tecnología, digitalizado, privacidad.
- Imperativos cortos: "Llegás, lavás y seguís." "Sumate a la lista." "Sumate a los Founders." "Lavá más, pagá menos." "Una Hilux paga lo mismo que un Onix."

**Words to avoid:**
- ❌ "Burbujas", "espuma divertida", "agua brillante", "destellos" → estética cursi prohibida.
- ❌ "Lavadero tradicional" como descriptor de nosotros (somos otra categoría).
- ❌ "Económico" / "barato" → premium, no low-cost.
- ❌ "Cepillos" sin más → connota daño; usar "rodillos de microfibra" o "soft-touch".
- ❌ "Servicio" como única palabra → es experiencia, tecnología, comunidad.
- ❌ "7 minutos" → **regla**: comunicar "menos de 10 minutos" o "8 minutos". El ciclo real es ~8.
- ❌ Nombrar a la competencia (Espacio SÍ, etc.).
- ❌ "KIREI" o cualquier branding del white-label original (queda en algún SMS, hay que limpiarlo).
- ❌ Anglicismos vacíos sin función.

**Glossary:**

| Término | Significado |
|---|---|
| **Touchless** | Lavado sin contacto físico con la carrocería, alta presión + químicos. Ciclo ~8 min. |
| **Rodillo soft-touch** | Lavado con rodillos de microfibra de baja agresividad. Ciclo ~8 min. (Antes "Roller".) |
| **Plus** | Lavado individual: doble shampoo + prelavado. $23.000. |
| **Premium** | Lavado individual: Plus + capa de cera SpeedWash Premium. $25.000. Todos los packs son Premium. |
| **Speed Pack** | Pack prepago de lavados con descuento progresivo (Speed 4/8/12). |
| **Speed 12 Founders** | Variante limitada del pack Speed 12: $220.000 · 27% off · **50 cupos**. En venta YA. |
| **Speed Corporate** | Servicio B2B para flotas/hoteles/concesionarias. Facturación A, panel por vehículo. |
| **Founders Club** | Los 50 que compraron Speed 12 Founders. Comunidad + foto épica F1. |
| **Lista de Apertura** | Lista gratuita previa a apertura. Recibe lavado bonificado de inauguración. |
| **Activación automática por patente** | La cámara lee la patente y arranca el lavado sin tocar app. *El diferencial más fuerte.* |
| **Fase A/B/C/D** | A = expectativa (jun) · B = apertura (julio) · C = repetición/conversión (ago–sep) · D = escala (oct–dic). |
| **PWA / app** | La app `lavar.speedwash.com.ar` (Vue 3) — escanear, pagar, ver saldo, gestionar pack. |
| **Sitio** | `speedwash.com.ar` (Next.js) — landing institucional + B2B + captura de lista. |
| **S-mark** | Logo S azul (símbolo aislado). |
| **Wordmark** | "SpeedWash" — azul + gris + spark naranja. |

---

## Brand Voice

**Tone:**
- **Confiado, directo, premium** — no se disculpa, no sobreexplica.
- **Cálido sin ser cursi** — hablamos como un argentino joven profesional, no como un robot.
- **Imperativo amigable** — "Llegás, lavás y seguís." No mandones, pero claros.

**Style:**
- Frases cortas. Mucho aire en el copy (como en el diseño).
- Cero jerga corporativa. Cero "Take it to the next level".
- Voseo argentino, registro neutro-profesional ("vos" y no "tú", "lavá" y no "lava").
- La PWA está disponible en ES-AR + EN + ZH-CN (herencia del fork backend chino). El sitio y los brochures: solo español argentino.
- **Nunca atacar competencia por nombre.** Pueblo chico — el contraste se construye por afirmación de lo nuestro, no por destrucción de lo ajeno.
- **Reels y contenido visual NO deben sentirse "lavadero".** Estética industrial/cinematográfica, no comercial de jabón.

**Personality (5 adjetivos):**
1. **Tech** (Tesla / Linear / Vercel — moderno, ingenieril)
2. **Premium** (Porsche — cuidado, detalle, orgullo)
3. **Directo** (no vende humo, los números están a la vista)
4. **Cercano** (es Funes, hablamos como vecinos)
5. **Pionero** (somos los primeros, lo decimos sin pedir permiso)

**Visuales (sistema de diseño, no negociable):**
- Negro `#08090A` protagonista en fondos.
- Azul LED `#00BBFC` como acento.
- Naranja spark `#FF9416` mínimo (acento puntual).
- Display: Space Grotesk · Body: Inter.
- Detalles: malla de puntos, líneas LED, microtexto técnico en esquinas.
- Sin Material Design, sin sombras blandas. Radius ≤ 4px.
- Hero shots a sangre. Estética: Tesla configurator · Porsche 911 landing · Apple · Linear · Vercel.

---

## Proof Points

**Metrics duros (públicos, usar en copy):**
- **~8 min · "menos de 10"** — ciclo de lavado (real ~8, comunicado <10).
- **110–140 autos/día** — capacidad máxima con ambas máquinas.
- **24 hs · 7 días** — operación.
- **2 máquinas** — rodillo soft-touch + touchless sin contacto.
- **Precio único** — no importa el tamaño del auto.
- **20% OFF** — Speed 12.
- **27% OFF · 50 cupos** — Speed 12 Founders.
- **100%** — proceso automatizado.
- **1°** — único digitalizado de la región.
- **Activación automática por patente** — feature técnico verificable.
- **Pago 100% blanqueado** — MercadoPago integrado.

**Metrics internos (NO publicar):**
- **USD 0,76** — costo variable por lavado.
- **USD 193k** — inversión total.
- **USD 6.480/mes** — costos fijos.
- **~12 autos/día** — break-even.
- **USD 103k** — EBITDA jul–dic 2026 proyectado.
- **~67%** — margen.
- **~10 meses** — recupero (~principios 2027).

**Customers:** ⚠️ Cero customers a la fecha — apertura 10 julio 2026. **Lista de Apertura** (gratis) + **50 cupos Founders** (preventa pagada) son los lead assets.

**Testimonials:** ⚠️ Pendientes — generar en fase B (julio). Acción concreta: prompt post-primer-lavado en la PWA pidiendo review.

**Logos B2B:** ⚠️ Pendientes — concesionarias / hoteles / flotas son lead targets fase C–D.

**Value themes:**

| Theme | Proof / Soporte |
|---|---|
| Velocidad | "Menos de 10 minutos" + ciclo ~8 min documentado. |
| Activación por patente | Cámara que lee patente y arranca solo — "nivel Tesla". *Diferencial hero más sub-explotado.* |
| Privacidad del interior | "Vos lavás, vos aspirás, nadie toca tu interior." Aspirado self-service como feature. |
| Cuidado del auto | Touchless sin contacto + rodillo soft-touch. Elegís cuál. |
| Disponibilidad | "24 hs · 7 días" + sistema 100% autoservicio. |
| Precio único (anti-tamaño) | "Una Hilux paga lo mismo que un Onix" + tabla comparativa vs lavadero a mano. |
| Ahorro recurrente | Tabla packs con % off (5/10/20/27%). |
| Tecnología digital | PWA + escaneo + MercadoPago + wallet + tracking de saldo y pack. |
| Sustentabilidad | "Uso eficiente del agua" *(cifra exacta pendiente — fabricante)*. |
| Categoría nueva | "No es un lavadero. Es otra categoría." + "1° digitalizado de la región." |
| Comunidad / escasez | Speed 12 Founders: solo 50 cupos · foto épica F1. |

**Proof points pendientes (gaps a llenar):**
- Litros por ciclo exactos (para sostener el "60% menos agua" del brochure).
- Certificación de equipo / fabricante (si aplica).
- Garantía explícita en caso de falla de máquina (devolución a wallet — documentar).
- WhatsApp oficial (hoy placeholder `341 012-3456` en sitio).
- Testimoniales reales (fase B).
- Casos B2B (fase C–D).

---

## Goals

**Business goal (2026):**
- Llegar a **~64 autos/día en diciembre 2026** (rampa jul–dic: 36 / 42 / 48 / 54 / 58 / 64).
- EBITDA jul–dic ~USD 103k · margen ~67%.
- Recupero total en ~10 meses (~principios 2027).

**Conversion actions por fase (revisado jun 2026):**

| Fase | Período | Conversion action principal | KPI |
|---|---|---|---|
| **A · Expectativa** | junio | (1) Sumarse a **Lista de Apertura** gratis → lavado gratis de inauguración. (2) **Preventa Speed 12 Founders** (50 cupos) — esto es nuevo, antes era fase C. | # en lista · # cupos vendidos / 50 |
| **B · Apertura** | julio | **Probar el lavado** (primer lavado bonificado para lista) + packs ya en venta. | # pruebas únicas · % conversión a pack |
| **C · Repetición & Conversión** | ago–sep | Comprar **Speed Pack** (4/8/12) — base de recurrencia consolidada. | % de probadores que compran pack · # packs activos |
| **D · Escala** | oct–dic | Renovación de packs + cerrar **contratos B2B (Speed Corporate)** + posible 2ª sede. | MRR · # contratos B2B |

**Nota importante (cambio vs estrategia original):** la lógica vieja era *"primero prueba, packs después de C"*. **Se ajustó.** La app ya tiene packs en venta desde el día 1, **incluido el Speed 12 Founders con 50 cupos en preventa desde fase A.** El "primer lavado gratis/bonificado" sigue siendo el gancho central, pero los Founders no esperan a fase C.

**Current metrics:** ⚠️ Pre-launch (jun 2026). KPIs vivos: (1) tamaño Lista de Apertura, (2) # Speed 12 Founders vendidos / 50.

**Plan de campañas Meta Ads pre-lanzamiento (plan original CONTEXTO.md):**

| Semana | Fechas | $/día | Total | Foco |
|---|---|---|---|---|
| 1 | 10–16 jun | $0 | $0 | Setup + filmación + edición Ariel |
| 2 | 17–23 jun | $20 | $140 | Video views, audiencia amplia |
| 3 | 24–30 jun | $30 | $210 | Validación + empuje preventa Founders |
| 4 | 1–7 jul | $50 | $350 | Empuje fuerte preventa Founders |
| 5 | 8–14 jul | $40 | $280 | Apertura + retargeting |
| **TOTAL** | | | **~USD 980** | |

Estructura sugerida: **Reproducciones de Video** en semanas 2–3 (warmear audiencia + dataset), **Conversiones** a landing Founders / Lista en semanas 3–5.

---

## Jugadas de ambush marketing (CONTEXTO.md §11)

Disponibles para sumar al mix orgánico/pago. No reemplazan campañas, las apalancan:

1. **"El cronómetro"** — video con cronómetro corriendo: tiempo lavadero tradicional vs Speed Wash. Sin mostrar competidores reales.
2. **Vallas con cuenta regresiva** — solo logo + número de días en zonas estratégicas.
3. **WhatsApp Status coordinado** — equipo + partners + amigos posteando lo mismo el mismo día.
4. **Convenios con concesionarias** — voucher de lavado gratis al retirar 0km.
5. **Calcomanías "multa fake"** — bajo limpiaparabrisas en estacionamientos de countries (creativa, no agresiva).
6. **Días de lluvia** — ads agresivos al día siguiente, cuando todos quieren lavar.
7. **Foto épica de los 100 Founders** — formación tipo paddock F1 fin de julio, viralidad orgánica.

---

## Pendientes y decisiones abiertas que afectan al marketing

🔴 **WhatsApp:** sin número real. Placeholder `341 012-3456` aparece live en sitio (Header, packs, Contacto, Footer, B2B, Institucional). Decisión: ¿se reemplaza por Instagram/email, o se espera al número real?

🔴 **Litros por ciclo:** "60% menos agua que un lavado manual" en brochure institucional es estimación. Falta dato exacto del fabricante para proof point hard.

🔴 **Brochure Membresías:** dice "preventa exclusiva" — desactualizado vs estrategia actual (packs en venta desde día 1). Alinear copy.

🔴 **Testimoniales:** plan para capturarlos en fase B (julio). Definir mecanismo en la PWA (¿prompt post-lavado? ¿email automatizado?).

🔴 **SMS de verificación PWA:** firma "Kirei Car Wash" (white-label viejo). Pendiente de cambio del proveedor chino.

🔴 **Render real del local:** la foto de sucursal en la app es genérica. Reemplazar por render real cuando esté listo.

🔴 **Tema 10% off por efectivo:** decisión comercial abierta. Hoy oculto en app detrás de flag `SHOW_CASH_OFFER = false`.

🟡 **Marca registrada:** verificar Speed Wash en INPI clase 37 antes de escalar campañas grandes.

🟡 **Contrato Fuxio/Rosario Tech:** 2 cláusulas pendientes (ICL vs dólar + rescisión) — sin impacto directo en marketing pero define narrativa de "negocio sólido".

---

## Stack de medición Meta (estado actual jun 2026)

- **Business Manager:** Wifix Argentina - DOER (`128339574629190`) — provisorio, transferible a Fuxio SRL cuando tenga CUIT/BM.
- **Ad account:** Wifix (`726543328913808`) — temporal, factura a Wifix. No transferible.
- **Página:** SpeedWash (`1109822955547265`) — propia.
- **Dataset / Píxel:** **Speed Wash** (`3272202676285159`) — propio del BM, **transferible a Fuxio SRL** cuando exista. Es el activo crítico de aprendizaje.
- **Píxel instalado en:** sitio Next ✅ + PWA ✅ (commit en repo, esperando deploy del chino).
- **Eventos activos hoy:** `PageView` (auto en ambos), `Lead` (LeadForm en sitio), `InitiateCheckout` (CTAs hacia app en sitio).
- **Eventos pendientes:** `CompleteRegistration`, `AddToCart`, `Purchase` en la PWA.
- **Dominio verificado en BM:** `speedwash.com.ar` ✅ · `lavar.speedwash.com.ar` ⏳ (pendiente deploy chino).
- **Conversions API (server-side):** habilitado en el dataset, implementación pendiente fase 2.
