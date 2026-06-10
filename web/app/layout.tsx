import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { site } from "@/lib/site";
import Analytics from "@/components/Analytics";
import ContactFab from "@/components/ContactFab";
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Speed Wash Funes — Lavadero automático 24 hs",
    description:
      "Tecnología · Innovación · Comunidad · 24 hs. El primer lavadero automático digitalizado de la región.",
    url: "https://speedwash.com.ar",
    siteName: "Speed Wash Funes",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Speed Wash Funes — Lavadero automático 24 hs",
    description:
      "El primer lavadero automático digitalizado de la región. Autoservicio 24 hs en Funes, Santa Fe.",
  },
  verification: {
    other: {
      "facebook-domain-verification": "ymontt9jb11z9y14gp94qn9mg2e8nz",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  // Permite que el contenido use el área completa y respete los safe-area insets (notch/home bar de iOS).
  viewportFit: "cover",
};

// Schema de negocio local — clave para aparecer en Google Maps / Local Pack.
const [lat, lng] = site.coords.split(",").map((n) => Number(n.trim()));
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoWash",
  name: site.fullName,
  url: `https://${site.domain}`,
  image: `https://${site.domain}/opengraph-image`,
  description:
    "Lavadero automático digitalizado, autoservicio 24 hs en Funes, Santa Fe.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Funes",
    addressRegion: "Santa Fe",
    addressCountry: "AR",
  },
  geo: { "@type": "GeoCoordinates", latitude: lat, longitude: lng },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
  sameAs: [site.instagramUrl],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <ContactFab />
        <Analytics />
      </body>
    </html>
  );
}
