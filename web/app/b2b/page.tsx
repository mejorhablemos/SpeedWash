import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Propuesta comercial B2B",
  description:
    "Speed Corporate: lavado premium para flotas, hoteles, concesionarias y comercios.",
};

export default function B2B() {
  return (
    <>
      <Header />
      <main className="relative flex min-h-screen items-center overflow-hidden bg-black">
        <div className="tech-grid absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-3xl px-6 py-40 text-center lg:px-10">
          <span className="eyebrow">Propuesta comercial B2B</span>
          <h1 className="display mt-7 text-5xl sm:text-6xl">
            Speed <span className="text-led text-glow">Corporate</span>
          </h1>
          <p className="mx-auto mt-7 max-w-md text-base leading-relaxed text-mist">
            Lavado premium para flotas, hoteles, concesionarias y comercios.
            Facturación A y panel de control por vehículo. Coordinemos una
            reunión.
          </p>
          <a
            href={`https://wa.me/54${site.whatsapp}?text=${encodeURIComponent(
              "Hola Speed Wash, quiero coordinar una reunión por la propuesta B2B.",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center gap-2.5 bg-led px-8 py-4 font-display text-sm font-semibold tracking-wide text-black transition-all hover:bg-led-bright"
          >
            Solicitar propuesta →
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
