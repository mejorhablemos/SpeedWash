import Image from "next/image";
import { nav, site, contactHref, CONTACT_CHANNEL } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-graphite">
      <div className="led-line h-px w-full opacity-60" />
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Image
              src="/brand/logo-wordmark.png"
              alt="Speed Wash"
              width={472}
              height={60}
              className="h-8 w-auto"
            />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-mist">
              El primer lavadero automático digitalizado de la región.
              Tecnología, velocidad y experiencia premium en {site.ecosystem}.
            </p>
          </div>

          <div>
            <p className="micro mb-5">Navegación</p>
            <ul className="space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-mist transition-colors hover:text-led"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="micro mb-5">Contacto</p>
            <ul className="space-y-3 text-sm text-mist">
              <li>
                <a
                  href={contactHref("Hola Speed Wash! Quiero info.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-led"
                >
                  Escribinos por {CONTACT_CHANNEL}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-led"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-led"
                >
                  Instagram · @{site.instagram}
                </a>
              </li>
              <li className="pt-1 text-mist/80">{site.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="micro">
            © {new Date().getFullYear()} {site.fullName}
          </p>
          <div className="flex items-center gap-5">
            <a
              href="/terminos"
              className="micro transition-colors hover:text-led"
            >
              Términos
            </a>
            <a
              href="/privacidad"
              className="micro transition-colors hover:text-led"
            >
              Privacidad
            </a>
            <span className="micro">{site.coords} · Funes · SF · AR</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
