import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

type Props = {
  eyebrow: string;
  title: string;
  /** Fecha de última actualización en formato ISO (YYYY-MM-DD). */
  updatedAt: string;
  children: ReactNode;
};

// Layout compartido para páginas legales (/terminos, /privacidad).
// Mantiene la misma estética del sitio sin diseño elaborado:
// fondo negro, columna estrecha, prose blanco con jerarquía sobria.
export default function LegalLayout({
  eyebrow,
  title,
  updatedAt,
  children,
}: Props) {
  const updatedDisplay = new Date(updatedAt).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Header />
      <main className="relative min-h-svh overflow-hidden bg-black">
        <div className="tech-grid absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 pb-24 pt-32 lg:px-10 lg:pt-40">
          <div className="mb-10 flex items-center gap-4">
            <span className="led-line h-px w-12" />
            <span className="eyebrow">{eyebrow}</span>
          </div>

          <h1 className="display text-4xl sm:text-5xl lg:text-[3.4rem]">
            {title}
          </h1>

          <p className="mt-6 text-sm text-mist">
            Última actualización: {updatedDisplay}
          </p>

          <div className="legal-prose mt-12 text-mist">{children}</div>

          {/* Disclaimer obligatorio: contenido pendiente de revisión legal */}
          <div className="mt-16 border-l-2 border-led/50 bg-graphite-2/50 px-5 py-4 text-[0.82rem] leading-relaxed text-mist">
            Este documento es una versión preliminar pendiente de revisión
            legal. Para consultas:{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-led underline-offset-4 transition-colors hover:text-led-bright hover:underline"
            >
              {site.email}
            </a>
            .
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
