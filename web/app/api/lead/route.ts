import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Alta a la Lista de Apertura.
// Env vars (en Vercel) para activarlo:
//   RESEND_API_KEY       — obligatoria. Sin esto, devuelve fallback → el form manda a Instagram.
//   RESEND_AUDIENCE_ID   — opcional. Si está, da de alta el contacto en esa audiencia.
//   LEAD_FROM_EMAIL      — opcional. Remitente verificado (ej "Speed Wash <hola@speedwash.com.ar>")
//                          para notificar al negocio y mandar bienvenida al lead.
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim().toLowerCase();
  const whatsapp = String(body?.whatsapp ?? "").trim();
  const honeypot = String(body?.company ?? "").trim(); // anti-bot: humanos lo dejan vacío

  if (honeypot) return NextResponse.json({ ok: true }); // bot silencioso
  if (name.length < 2 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // Resend todavía no configurado: el form usa el fallback de Instagram.
    return NextResponse.json(
      { ok: false, error: "not_configured", fallback: true },
      { status: 503 },
    );
  }

  const resend = new Resend(key);
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  const from = process.env.LEAD_FROM_EMAIL;

  try {
    if (audienceId) {
      await resend.contacts.create({
        audienceId,
        email,
        firstName: name,
        unsubscribed: false,
      });
    }

    if (from) {
      // Aviso al negocio (no bloqueante).
      await resend.emails
        .send({
          from,
          to: site.email,
          subject: `Nuevo lead — lista de apertura: ${name}`,
          text: `Nombre: ${name}\nEmail: ${email}\nWhatsApp: ${whatsapp || "—"}`,
        })
        .catch(() => {});
      // Bienvenida al lead (requiere dominio verificado en Resend).
      await resend.emails
        .send({
          from,
          to: email,
          subject: "Ya estás en la lista de Speed Wash 🚿",
          text: `Hola ${name}, ya estás en la lista de apertura de Speed Wash Funes.\n\nVas a ser de los primeros en enterarte cuando abramos, y te guardamos tu lavado gratis de inauguración.\n\nNos vemos pronto.\n— Speed Wash Funes`,
        })
        .catch(() => {});
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
