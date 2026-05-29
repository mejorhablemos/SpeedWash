"use client";

import { contactHref, CONTACT_CHANNEL } from "@/lib/site";
import { trackContactClick } from "@/lib/analytics";

// Botón flotante de contacto, siempre a un toque en todo el scroll (patrón #1
// de conversión móvil en AR). Apunta al canal activo (WhatsApp o Instagram).
export default function ContactFab() {
  return (
    <a
      href={contactHref("Hola Speed Wash! Quiero info del lavadero.")}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackContactClick("fab")}
      aria-label={`Escribinos por ${CONTACT_CHANNEL}`}
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex items-center gap-2.5 bg-led px-5 py-3.5 font-display text-sm font-semibold tracking-wide text-black shadow-[0_0_34px_-6px_rgba(0,187,252,0.75)] transition-all hover:bg-led-bright lg:right-6"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 0 1-.9-3.8A8.38 8.38 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z" />
      </svg>
      Escribinos
    </a>
  );
}
