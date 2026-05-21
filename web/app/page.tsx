import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { packs, site } from "@/lib/site";

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
    desc: "Lavado contactless de alta presión. Sin contacto físico con la carrocería: cuida la pintura y los detalles más delicados.",
    points: ["Sin contacto", "Alta presión", "Secado integral"],
  },
  {
    code: "S—02",
    name: "Roller",
    time: "8 minutos",
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
        <section className="relative flex min-h-screen flex-col justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/renders/local.jpg"
              alt="Lavadero Speed Wash Funes"
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
            <span className="micro absolute left-6 top-28 lg:left-10">
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
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#membresias"
                  className="group flex items-center justify-center gap-2.5 bg-led px-8 py-4 font-display text-sm font-semibold tracking-wide text-black transition-all hover:bg-led-bright"
                >
                  Ver membresías
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
                      src="/renders/local.jpg"
                      alt="Instalaciones de Speed Wash Funes"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <span className="micro absolute bottom-5 left-5">
                      [ Render — fachada Speed Wash Funes ]
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
                  <div className="group h-full bg-graphite p-9 transition-colors hover:bg-graphite-2 lg:p-12">
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
                </Reveal>
              ))}
            </div>
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
                  Packs prepagos con hasta 25% de ahorro. Preventa exclusiva
                  para los primeros founders.
                </p>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
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
                    <a
                      href={`https://wa.me/54${site.whatsapp}?text=${encodeURIComponent(
                        `Hola Speed Wash, quiero info del pack ${p.name}.`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-7 flex items-center justify-center gap-2 py-3 font-display text-[0.78rem] font-semibold tracking-wide transition-all ${
                        p.featured
                          ? "bg-led text-black hover:bg-led-bright"
                          : "border border-line text-snow hover:border-led/60 hover:text-led"
                      }`}
                    >
                      Lo quiero →
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>

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
                Escribinos por WhatsApp y reservá tu lavado o tu membresía.
                Respondemos al instante.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-11 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`https://wa.me/54${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2.5 bg-led px-8 py-4 font-display text-sm font-semibold tracking-wide text-black transition-all hover:bg-led-bright"
                >
                  WhatsApp · {site.whatsappDisplay}
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
