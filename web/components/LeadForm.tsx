"use client";

import { useState } from "react";
import { contactHref } from "@/lib/site";
import { trackLead } from "@/lib/analytics";

type State = "idle" | "loading" | "ok" | "error" | "fallback";

export default function LeadForm() {
  const [state, setState] = useState<State>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "loading") return;
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setState("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        trackLead("lista_apertura");
        setState("ok");
        form.reset();
      } else if (json.fallback) {
        setState("fallback");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  if (state === "ok") {
    return (
      <div className="border border-led/40 bg-led/5 p-8 text-center">
        <p className="display text-2xl text-led text-glow">¡Listo! 🚿</p>
        <p className="mt-3 text-sm leading-relaxed text-mist">
          Ya estás en la lista de apertura. Te vamos a avisar primero cuando
          abramos — y te guardamos tu lavado gratis de inauguración.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      {/* honeypot anti-bot (oculto a humanos) */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <input
          name="name"
          required
          minLength={2}
          placeholder="Tu nombre"
          autoComplete="name"
          className="border border-line bg-white/[0.03] px-4 py-3.5 text-base text-snow placeholder:text-mist/70 outline-none transition-colors focus:border-led/60"
        />
        <input
          name="whatsapp"
          inputMode="tel"
          placeholder="WhatsApp (opcional)"
          autoComplete="tel"
          className="border border-line bg-white/[0.03] px-4 py-3.5 text-base text-snow placeholder:text-mist/70 outline-none transition-colors focus:border-led/60"
        />
      </div>
      <input
        name="email"
        type="email"
        required
        placeholder="Tu email"
        autoComplete="email"
        className="border border-line bg-white/[0.03] px-4 py-3.5 text-base text-snow placeholder:text-mist/70 outline-none transition-colors focus:border-led/60"
      />

      <button
        type="submit"
        disabled={state === "loading"}
        className="mt-1 flex items-center justify-center gap-2.5 bg-led px-8 py-4 font-display text-sm font-semibold tracking-wide text-black transition-all hover:bg-led-bright disabled:opacity-60"
      >
        {state === "loading" ? "Sumándote…" : "Sumate a la lista →"}
      </button>

      {state === "error" && (
        <p className="text-sm text-spark">
          Uy, algo falló. Probá de nuevo o escribinos por Instagram.
        </p>
      )}
      {state === "fallback" && (
        <a
          href={contactHref()}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-led underline underline-offset-4"
        >
          Sumate por Instagram →
        </a>
      )}
      <p className="text-xs text-mist">
        Sin spam. Solo te avisamos de la apertura y los beneficios founders.
      </p>
    </form>
  );
}
