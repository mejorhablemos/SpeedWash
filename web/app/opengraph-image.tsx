import { ImageResponse } from "next/og";

// Preview que se ve al compartir el link por WhatsApp / Instagram / Google.
// Generada por código (no depende de los renders) — on-brand y siempre nítida.

export const alt = "Speed Wash Funes — Lavadero automático 24 hs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(120% 120% at 80% 0%, #0d2230 0%, #0b0b0d 55%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* top row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: "#9a9aa3",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 56,
              height: 4,
              background: "#00bbfc",
              marginRight: 24,
            }}
          />
          Lavadero automático · Funes
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 120,
              fontWeight: 800,
              color: "#f4f4f6",
              lineHeight: 1,
              letterSpacing: -4,
            }}
          >
            Tu auto listo
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 120,
              fontWeight: 800,
              color: "#00bbfc",
              lineHeight: 1,
              letterSpacing: -4,
            }}
          >
            en minutos.
          </div>
        </div>

        {/* bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 44,
              fontWeight: 700,
              color: "#f4f4f6",
              letterSpacing: -1,
            }}
          >
            Speed
            <span style={{ color: "#00bbfc" }}>Wash</span>
          </div>
          <div style={{ display: "flex", color: "#9a9aa3", fontSize: 28 }}>
            Autoservicio 24 hs · speedwash.com.ar
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
