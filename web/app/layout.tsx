import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://speedwash.com.ar"),
  title: {
    default: "Speed Wash Funes — Lavadero automático 24 hs",
    template: "%s · Speed Wash Funes",
  },
  description:
    "El primer lavadero automático digitalizado de la región. Tecnología internacional, servicio 24 hs y experiencia premium en Funes, Santa Fe.",
  keywords: [
    "lavadero de autos Funes",
    "lavadero automático",
    "car wash Funes",
    "Speed Wash",
    "lavado de autos 24 horas",
  ],
  openGraph: {
    title: "Speed Wash Funes — Lavadero automático 24 hs",
    description:
      "Tecnología · Innovación · Comunidad · 24 hs. El primer lavadero automático digitalizado de la región.",
    url: "https://speedwash.com.ar",
    siteName: "Speed Wash Funes",
    locale: "es_AR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
