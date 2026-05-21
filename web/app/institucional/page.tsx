import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Brochure institucional",
  description:
    "Programa de partners y propuesta institucional de Speed Wash Funes.",
};

export default function Institucional() {
  return (
    <>
      <Header />
      <main className="relative flex min-h-screen items-center overflow-hidden bg-black">
        <div className="tech-grid absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-3xl px-6 py-40 text-center lg:px-10">
          <span className="eyebrow">Brochure institucional</span>
          <h1 className="display mt-7 text-5xl sm:text-6xl">
            Programa de <span className="text-led text-glow">Partners</span>
          </h1>
          <p className="mx-auto mt-7 max-w-md text-base leading-relaxed text-mist">
            Estamos preparando la presentación institucional completa para
            partners y sponsors. Mientras tanto, escribinos y te la enviamos.
          </p>
          <a
            href={`https://wa.me/54${site.whatsapp}?text=${encodeURIComponent(
              "Hola Speed Wash, quiero la presentación institucional para partners.",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center gap-2.5 bg-led px-8 py-4 font-display text-sm font-semibold tracking-wide text-black transition-all hover:bg-led-bright"
          >
            Solicitar por WhatsApp →
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
