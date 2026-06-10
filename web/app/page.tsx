import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import LeadForm from "@/components/LeadForm";
import BuyAppLink from "@/components/BuyAppLink";
import {
  packs,
  foundersPack,
  foundersPerks,
  site,
  contactHref,
  CONTACT_CHANNEL,
  SINGLE_WASH_PRICE_FROM,
  FOUNDERS_SEATS_LEFT,
  FOUNDERS_TOTAL_SEATS,
} from "@/lib/site";

/* ---------------------------------------------------------------- */

const pilares = [
  { k: "24 HS", v: "Autoservicio sin horarios" },
  { k: "7 MIN", v: "Lavado touchless completo" },
  { k: "100%", v: "Proceso automatizado" },
  { k: "1ERO", v: "Digitalizado de la región" },
];

const servicios = [
  {
    code: "S—01",
    name: "Touchless",
    time: "7 minutos",
    img: "/renders/detalle.jpg",
    desc: "Lavado contactless de alta presión. Sin contacto físico con la carrocería: cuida la pintura y los detalles más delicados.",
    points: ["Sin contacto", "Alta presión", "Secado integral"],
  },
  {
    code: "S—02",
    name: "Roller",
    time: "8 minutos",
    img: "/renders/autoservicio.jpg",
    desc: "Lavado con rodillos de microfibra de última generación. Arrastre profundo de suciedad con un acabado impecable.",
    points: ["Microfibra premium", "Limpieza profunda", "Brillo final"],
  },
];

const partnerTiers = [
  { tier: "Comunidad", perk: "Canje 100% en servicios · mapa de partners" },
  { tier: "Silver", perk: "15% OFF mutuo · presencia en folletería" },
  { tier: "Gold", perk: "20% OFF mutuo · activaciones y co-branding" },
  { tier: "Black", perk: "30% OFF · sponsor oficial y exclusividad de rubro" },
];

/* ---------------------------------------------------------------- */

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* ===================== HERO ===================== */}
        <section className="relative flex min-h-svh flex-col justify-start overflow-hidden lg:justify-center">
          <div className="absolute inset-0">
            <Image
              src="/renders/exterior.jpg"
              alt="Speed Wash Funes — fachada de noche"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            {/* grado cinematográfico oscuro */}
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
            <div className="absolute inset-0 mix-blend-color bg-led-deep/20" />
            <div className="tech-grid absolute inset-0 opacity-60" />
          </div>

          {/* microtexto esquinas */}
          <div className="pointer-events-none absolute inset-0 z-10">
            <span className="micro absolute left-6 top-28 hidden lg:block lg:left-10">
              01 — Speed Wash Funes
            </span>
            <span className="micro absolute right-6 top-28 hidden lg:block lg:right-10">
              {site.coords}
            </span>
            <span className="micro absolute bottom-7 right-6 hidden lg:block lg:right-10">
              Funes · Santa Fe · Argentina
            </span>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-28 lg:px-10">
            <Reveal>
              <div className="mb-7 flex items-center gap-4">
                <span className="led-line h-px w-12" />
                <span className="eyebrow">Lavadero automático · Funes</span>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="display text-[3.4rem] leading-[0.92] sm:text-7xl lg:text-[7.2rem]">
                Tu auto listo
                <br />
                <span className="text-led text-glow">en minutos.</span>
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-mist lg:text-lg">
                El primer lavadero automático digitalizado de la región.
                Tecnología internacional, autoservicio 24 horas y una
                experiencia premium — en el corazón de {site.ecosystem}.
              </p>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="#lista"
                  className="group flex items-center justify-center gap-2.5 bg-led px-8 py-4 font-display text-sm font-semibold tracking-wide text-black transition-all hover:bg-led-bright"
                >
                  Sumate a la lista
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
                <a
                  href="#servicios"
                  className="flex items-center justify-center gap-2.5 border border-line bg-white/[0.03] px-8 py-4 font-display text-sm font-medium tracking-wide text-snow backdrop-blur-sm transition-colors hover:border-led/60 hover:text-led"
                >
                  Cómo funciona
                </a>
                <BuyAppLink
                  source="hero"
                  className="group flex items-center justify-center gap-2.5 border border-gold/50 bg-gold/10 px-8 py-4 font-display text-sm font-semibold tracking-wide text-gold transition-all hover:border-gold hover:bg-gold/20"
                >
                  Ya quiero comprar
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </BuyAppLink>
              </div>
            </Reveal>
          </div>

          {/* pilares — barra inferior */}
          <Reveal delay={360}>
            <div className="relative z-10 mx-auto mt-16 w-full max-w-7xl px-6 lg:px-10">
              <div className="grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4">
                {pilares.map((p) => (
                  <div
                    key={p.k}
                    className="bg-graphite/95 px-6 py-7 backdrop-blur-sm"
                  >
                    <p className="display text-3xl text-led lg:text-4xl">
                      {p.k}
                    </p>
                    <p className="mt-2 text-[0.82rem] leading-snug text-mist">
                      {p.v}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ===================== MARQUEE ===================== */}
        <div className="overflow-hidden border-y border-line bg-black py-5">
          <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center gap-10">
                {[
                  "Tecnología",
                  "Innovación",
                  "Comunidad",
                  "24 Horas",
                  "Sustentable",
                  "Premium",
                ].map((w) => (
                  <span key={w} className="flex items-center gap-10">
                    <span className="font-display text-2xl font-medium tracking-tight text-mist/70 lg:text-3xl">
                      {w}
                    </span>
                    <span className="text-led">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ===================== EL LAVADERO ===================== */}
        <section id="lavadero" className="relative scroll-mt-20 bg-graphite">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              <div>
                <Reveal>
                  <div className="mb-6 flex items-center gap-4">
                    <span className="led-line h-px w-12" />
                    <span className="eyebrow">El lavadero</span>
                  </div>
                </Reveal>
                <Reveal delay={80}>
                  <h2 className="display text-4xl sm:text-5xl lg:text-[3.6rem]">
                    No es un lavadero.
                    <br />
                    Es otra categoría.
                  </h2>
                </Reveal>
                <Reveal delay={160}>
                  <p className="mt-7 max-w-lg text-base leading-relaxed text-mist">
                    Speed Wash nace para cambiar la forma en que Funes lava su
                    auto. Equipamiento internacional, procesos automatizados de
                    punta a punta y un uso eficiente del agua. Llegás, lavás y
                    seguís — en minutos, a cualquier hora.
                  </p>
                </Reveal>
                <Reveal delay={220}>
                  <ul className="mt-9 space-y-px border border-line bg-line">
                    {[
                      ["Automatización total", "Sin esperas, sin turnos."],
                      [
                        "Tecnología internacional",
                        "Equipos de última generación.",
                      ],
                      ["Sustentable", "Uso eficiente y responsable del agua."],
                    ].map(([t, d]) => (
                      <li
                        key={t}
                        className="flex items-baseline gap-4 bg-graphite px-6 py-5"
                      >
                        <span className="text-led">—</span>
                        <span>
                          <span className="font-display font-semibold text-snow">
                            {t}
                          </span>
                          <span className="ml-2 text-sm text-mist">{d}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>

              <Reveal delay={160}>
                <div className="relative">
                  <div className="relative aspect-[4/5] overflow-hidden border border-line">
                    <Image
                      src="/renders/lavado.jpg"
                      alt="Lavado automático en Speed Wash Funes"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <span className="micro absolute bottom-5 left-5">
                      [ Speed Wash · Funes ]
                    </span>
                  </div>
                  <div className="led-glow led-line absolute -bottom-px left-8 right-8 h-px" />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ===================== SERVICIOS ===================== */}
        <section id="servicios" className="relative scroll-mt-20 bg-black">
          <div className="tech-dots absolute inset-0 opacity-40" />
          <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
            <Reveal>
              <div className="mb-6 flex items-center gap-4">
                <span className="led-line h-px w-12" />
                <span className="eyebrow">Servicios</span>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <h2 className="display text-4xl sm:text-5xl lg:text-[3.6rem]">
                  Dos máquinas.
                  <br />
                  Un acabado perfecto.
                </h2>
                <p className="max-w-sm text-sm leading-relaxed text-mist">
                  Elegí el lavado según tu auto y tu momento. Cualquiera de los
                  dos, en minutos.
                </p>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-px border border-line bg-line lg:grid-cols-2">
              {servicios.map((s, i) => (
                <Reveal key={s.name} delay={i * 120} as="article">
                  <div className="group relative h-full overflow-hidden bg-graphite transition-colors hover:bg-graphite-2">
                    <Image
                      src={s.img}
                      alt=""
                      fill
                      quality={35}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover opacity-[0.16] transition-opacity duration-500 group-hover:opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/85 to-graphite/45" />
                    <div className="relative p-9 lg:p-12">
                      <div className="flex items-center justify-between">
                        <span className="micro">{s.code}</span>
                        <span className="font-display text-sm font-semibold text-led">
                          {s.time}
                        </span>
                      </div>
                      <h3 className="display mt-8 text-4xl lg:text-5xl">
                        {s.name}
                      </h3>
                      <p className="mt-5 max-w-md text-sm leading-relaxed text-mist">
                        {s.desc}
                      </p>
                      <div className="mt-8 flex flex-wrap gap-2">
                        {s.points.map((p) => (
                          <span
                            key={p}
                            className="border border-line px-3 py-1.5 font-display text-[0.72rem] tracking-wide text-mist"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== LISTA DE APERTURA ===================== */}
        <section
          id="lista"
          className="relative scroll-mt-20 overflow-hidden border-y border-line bg-black"
        >
          <div className="tech-grid absolute inset-0 opacity-50" />
          <div className="relative mx-auto max-w-3xl px-6 py-24 text-center lg:px-10 lg:py-32">
            <Reveal>
              <div className="mb-6 flex items-center justify-center gap-4">
                <span className="led-line h-px w-12" />
                <span className="eyebrow">Lista de apertura</span>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display text-4xl sm:text-5xl lg:text-[3.4rem]">
                Sé de los <span className="text-led text-glow">primeros</span>.
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-mist">
                Estamos por abrir en Funes. Dejanos tu contacto y te avisamos
                primero — además te guardamos tu{" "}
                <span className="text-snow">lavado gratis de inauguración</span>.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mx-auto mt-10 max-w-xl text-left">
                <LeadForm />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===================== MEMBRESÍAS ===================== */}
        <section id="membresias" className="relative scroll-mt-20 bg-graphite">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
            <Reveal>
              <div className="mb-6 flex items-center gap-4">
                <span className="led-line h-px w-12" />
                <span className="eyebrow">Membresías · Founders Club</span>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <h2 className="display text-4xl sm:text-5xl lg:text-[3.6rem]">
                  Lavá más.
                  <br />
                  Pagá menos.
                </h2>
                <p className="max-w-sm text-sm leading-relaxed text-mist">
                  Packs prepagos con hasta 27% de ahorro. Preventa exclusiva
                  para los primeros founders.
                </p>
              </div>
            </Reveal>

            {/* ── Diferencial: el pack funciona en cualquier auto ── */}
            <Reveal delay={110}>
              <div className="mt-10 border-l-2 border-led/60 bg-graphite-2/60 px-5 py-5 lg:px-7 lg:py-6">
                <p className="font-display text-lg font-semibold text-snow lg:text-xl">
                  Tu pack, tu familia.{" "}
                  <span className="text-led">Funciona en cualquier auto.</span>{" "}
                  Activación por patente o desde la app.
                </p>
                <p className="mt-2 max-w-2xl text-xs leading-relaxed text-mist lg:text-[0.82rem]">
                  Asociá una patente para abrir la puerta automáticamente con
                  nuestra cámara, o usá la app desde cualquier vehículo cuando
                  escanees el QR de la máquina.
                </p>
              </div>
            </Reveal>

            {/* Aviso: lavado individual */}
            <Reveal delay={130}>
              <p className="mt-6 text-xs leading-relaxed text-mist">
                Lavado individual desde{" "}
                <span className="font-display font-semibold text-snow">
                  {SINGLE_WASH_PRICE_FROM}
                </span>
                <span className="mx-2 text-mist/50">·</span>
                Pagás al escanear la máquina
              </p>
            </Reveal>

            {/* ── Founders pack — destacado full-width, gold sobre azul deep ── */}
            <Reveal delay={160} as="article">
              <div className="relative mt-4 overflow-hidden border border-gold/30 bg-gradient-to-br from-blue-deep-2 via-blue-deep to-black p-8 ring-1 ring-inset ring-gold/40 lg:p-12">
                {/* glow dorado decorativo */}
                <div className="pointer-events-none absolute -top-24 -right-20 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-gold/5 blur-3xl" />

                {/* Badge superior: oferta de preventa */}
                <div className="absolute left-0 right-0 top-0 flex flex-wrap items-stretch justify-between gap-px bg-line">
                  <span className="bg-gold/95 px-4 py-1.5 font-display text-[0.62rem] font-bold tracking-[0.18em] text-black">
                    OFERTA DE PREVENTA · CUPOS LIMITADOS
                  </span>
                  <span className="bg-black/70 px-4 py-1.5 font-display text-[0.62rem] font-bold tracking-[0.18em] text-gold">
                    PRIMEROS {FOUNDERS_TOTAL_SEATS} FUNDADORES
                  </span>
                </div>

                <div className="relative mt-7 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
                  <div>
                    <span className="micro text-gold/80">
                      {foundersPack.washes} · preventa Founders Club
                    </span>
                    <h3 className="display mt-3 text-3xl lg:text-5xl">
                      {foundersPack.name}
                    </h3>
                    <p className="mt-5 max-w-md text-sm leading-relaxed text-mist">
                      {foundersPack.note}
                    </p>
                    <div className="mt-7 flex flex-wrap gap-2">
                      {foundersPack.discount && (
                        <span className="border border-gold/50 bg-gold/15 px-3 py-1.5 font-display text-[0.7rem] font-semibold tracking-wide text-gold">
                          {foundersPack.discount}
                        </span>
                      )}
                      {foundersPack.expiry && (
                        <span className="border border-line/80 px-3 py-1.5 font-display text-[0.7rem] tracking-wide text-mist">
                          {foundersPack.expiry}
                        </span>
                      )}
                      <span className="border border-gold/30 px-3 py-1.5 font-display text-[0.7rem] tracking-wide text-gold/90">
                        Cera incluida
                      </span>
                    </div>

                    {/* Beneficios Founders */}
                    <ul className="mt-8 space-y-2.5">
                      {foundersPerks.map((perk) => (
                        <li
                          key={perk}
                          className="flex items-start gap-3 text-sm leading-relaxed text-snow"
                        >
                          <span
                            aria-hidden
                            className="mt-[0.35rem] inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-gold"
                          />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-5">
                    {/* Contador de cupos con pulse rojo */}
                    <div
                      className="flex items-center gap-3 self-start border border-red-500/40 bg-red-500/10 px-4 py-2.5 font-display text-[0.78rem] font-semibold tracking-wide text-red-200"
                      role="status"
                      aria-live="polite"
                    >
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500/70" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
                      </span>
                      Quedan {FOUNDERS_SEATS_LEFT} de {FOUNDERS_TOTAL_SEATS} cupos
                    </div>

                    <div>
                      <div className="flex items-baseline gap-3">
                        <p className="display text-5xl text-gold lg:text-6xl">
                          {foundersPack.price}
                        </p>
                        {foundersPack.priceCompare && (
                          <p className="display text-2xl text-mist/60 line-through lg:text-3xl">
                            {foundersPack.priceCompare}
                          </p>
                        )}
                      </div>
                      {foundersPack.perWash && (
                        <p className="mt-2 text-xs text-mist">
                          {foundersPack.perWash}
                        </p>
                      )}
                      <p className="mt-3 text-[0.72rem] leading-relaxed text-mist">
                        Una vez agotados los {FOUNDERS_TOTAL_SEATS} cupos,
                        este pack pasa a precio regular de{" "}
                        <span className="text-snow">
                          {foundersPack.priceCompare}
                        </span>
                        . La oferta no se repite.
                      </p>
                    </div>

                    <BuyAppLink
                      source="pack_founders"
                      className="group flex items-center justify-center gap-2 bg-gold py-3.5 font-display text-[0.82rem] font-semibold tracking-wide text-black transition-all hover:bg-gold-bright"
                    >
                      Lo quiero
                      <span className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </BuyAppLink>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* ── 3 packs regulares ── */}
            <div className="mt-4 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {packs.map((p, i) => (
                <Reveal key={p.id} delay={i * 90} as="article">
                  <div
                    className={`relative flex h-full flex-col p-8 transition-colors ${
                      p.featured
                        ? "bg-graphite-2 ring-1 ring-inset ring-led"
                        : "bg-graphite hover:bg-graphite-2"
                    }`}
                  >
                    {p.featured && (
                      <span className="absolute right-0 top-0 bg-led px-3 py-1 font-display text-[0.62rem] font-bold tracking-[0.18em] text-black">
                        MÁS ELEGIDO
                      </span>
                    )}
                    <span className="micro">{p.washes}</span>
                    <h3 className="display mt-3 text-2xl">{p.name}</h3>
                    <p
                      className={`display mt-6 text-4xl ${
                        p.featured ? "text-led text-glow" : "text-snow"
                      }`}
                    >
                      {p.price}
                    </p>
                    {p.perWash && (
                      <p className="mt-1.5 text-xs text-mist">{p.perWash}</p>
                    )}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.discount && (
                        <span className="border border-led/40 bg-led/10 px-2.5 py-1 font-display text-[0.68rem] font-semibold tracking-wide text-led">
                          {p.discount}
                        </span>
                      )}
                      {p.expiry && (
                        <span className="border border-line px-2.5 py-1 font-display text-[0.68rem] tracking-wide text-mist">
                          {p.expiry}
                        </span>
                      )}
                    </div>
                    <p className="mt-6 flex-1 text-xs leading-relaxed text-mist">
                      {p.note}
                    </p>
                    <BuyAppLink
                      source={`pack_${p.id}`}
                      className={`mt-7 flex items-center justify-center gap-2 py-3 font-display text-[0.78rem] font-semibold tracking-wide transition-all ${
                        p.featured
                          ? "bg-led text-black hover:bg-led-bright"
                          : "border border-line text-snow hover:border-led/60 hover:text-led"
                      }`}
                    >
                      Lo quiero →
                    </BuyAppLink>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Nota al pie: cera incluida en todos los packs + acceso a la app */}
            <Reveal delay={140}>
              <div className="mt-5 flex flex-col gap-3 text-xs leading-relaxed text-mist sm:flex-row sm:items-center sm:justify-between">
                <p>
                  <span className="text-led">✦</span>{" "}
                  Todos los packs incluyen{" "}
                  <span className="font-display font-semibold text-snow">
                    Lavado Premium con cera
                  </span>
                  .
                </p>
                <p>
                  ¿Ya tenés cuenta?{" "}
                  <BuyAppLink
                    source="membresias_login"
                    className="font-display font-semibold text-led underline-offset-4 transition-colors hover:text-led-bright hover:underline"
                  >
                    Ingresá a la app →
                  </BuyAppLink>
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-px flex flex-col items-start justify-between gap-5 border border-t-0 border-line bg-black px-8 py-7 sm:flex-row sm:items-center">
                <div>
                  <p className="font-display text-lg font-semibold text-snow">
                    Speed Corporate
                  </p>
                  <p className="mt-1 text-sm text-mist">
                    Flotas, hoteles y concesionarias · 50+ lavados ·
                    facturación A · panel de control por vehículo.
                  </p>
                </div>
                <a
                  href="/b2b"
                  className="shrink-0 border border-led/50 px-6 py-3 font-display text-[0.78rem] font-semibold tracking-wide text-led transition-colors hover:bg-led hover:text-black"
                >
                  Propuesta B2B →
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===================== PARTNERS ===================== */}
        <section
          id="partners"
          className="relative scroll-mt-20 overflow-hidden bg-black"
        >
          <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
            <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-center">
              <div>
                <Reveal>
                  <div className="mb-6 flex items-center gap-4">
                    <span className="led-line h-px w-12" />
                    <span className="eyebrow">Programa de partners</span>
                  </div>
                </Reveal>
                <Reveal delay={80}>
                  <h2 className="display text-4xl sm:text-5xl lg:text-[3.6rem]">
                    Una comunidad
                    <br />
                    de marcas.
                  </h2>
                </Reveal>
                <Reveal delay={160}>
                  <p className="mt-7 max-w-md text-base leading-relaxed text-mist">
                    Speed Wash es parte del ecosistema {site.ecosystem}.
                    Sumamos marcas que comparten un mismo estándar de calidad y
                    estética para construir beneficios cruzados reales.
                  </p>
                </Reveal>
                <Reveal delay={220}>
                  <a
                    href="/institucional"
                    className="mt-9 inline-flex items-center gap-2.5 bg-led px-7 py-3.5 font-display text-sm font-semibold tracking-wide text-black transition-all hover:bg-led-bright"
                  >
                    Brochure institucional
                    <span>→</span>
                  </a>
                </Reveal>
              </div>

              <Reveal delay={140}>
                <div className="grid gap-px border border-line bg-line">
                  {partnerTiers.map((t, i) => (
                    <div
                      key={t.tier}
                      className="flex items-center gap-6 bg-graphite px-7 py-6"
                    >
                      <span className="display w-8 text-xl text-led">
                        0{i + 1}
                      </span>
                      <div>
                        <p className="font-display text-base font-semibold tracking-wide text-snow">
                          {t.tier}
                        </p>
                        <p className="mt-0.5 text-[0.82rem] text-mist">
                          {t.perk}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ===================== CONTACTO / CTA ===================== */}
        <section
          id="contacto"
          className="relative scroll-mt-20 overflow-hidden border-t border-line bg-graphite"
        >
          <Image
            src="/renders/interior.jpg"
            alt=""
            fill
            quality={35}
            sizes="100vw"
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-graphite via-graphite/90 to-graphite/50" />
          <div className="tech-grid absolute inset-0 opacity-70" />
          <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-36">
            <Reveal>
              <span className="eyebrow">Hablemos</span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display mt-6 max-w-3xl text-4xl sm:text-6xl lg:text-7xl">
                Tu lugar entre los{" "}
                <span className="text-led text-glow">founders</span> te está
                esperando.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-7 max-w-lg text-base leading-relaxed text-mist">
                Escribinos y sumate a la lista de apertura o consultanos lo que
                quieras. Respondemos al instante.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-11 flex flex-col gap-3 sm:flex-row">
                <a
                  href={contactHref("Hola Speed Wash! Quiero sumarme a la lista de apertura.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2.5 bg-led px-8 py-4 font-display text-sm font-semibold tracking-wide text-black transition-all hover:bg-led-bright"
                >
                  Escribinos por {CONTACT_CHANNEL}
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center justify-center gap-2.5 border border-line px-8 py-4 font-display text-sm font-medium tracking-wide text-snow transition-colors hover:border-led/60 hover:text-led"
                >
                  {site.email}
                </a>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-3">
                {[
                  ["Ubicación", `${site.ecosystem} · Funes, SF`],
                  ["Horario", "24 horas · todos los días"],
                  ["Instagram", `@${site.instagram}`],
                ].map(([t, d]) => (
                  <div key={t} className="bg-graphite px-7 py-6">
                    <p className="micro">{t}</p>
                    <p className="mt-2 font-display text-base text-snow">{d}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
