"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/lib/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-colors duration-500 ${
        scrolled || open
          ? "bg-black/85 backdrop-blur-xl border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" className="flex items-center" aria-label="Speed Wash Funes — inicio">
          <Image
            src="/brand/logo-wordmark.png"
            alt="Speed Wash"
            width={472}
            height={60}
            priority
            className="h-6 w-auto sm:h-7"
          />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-display text-[0.82rem] font-medium tracking-wide text-mist transition-colors hover:text-snow"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={`https://wa.me/54${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 bg-led px-5 py-2.5 font-display text-[0.8rem] font-semibold tracking-wide text-black transition-all hover:bg-led-bright"
          >
            Reservá tu lavado
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
          aria-label="Menú"
          aria-expanded={open}
        >
          <span
            className={`h-[1.5px] w-6 bg-snow transition-transform duration-300 ${
              open ? "translate-y-[6.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[1.5px] w-6 bg-snow transition-opacity duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-[1.5px] w-6 bg-snow transition-transform duration-300 ${
              open ? "-translate-y-[6.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`border-t border-line bg-black/95 backdrop-blur-xl transition-[max-height] duration-500 lg:hidden ${
          open
            ? "max-h-[85vh] overflow-y-auto"
            : "max-h-0 overflow-hidden border-t-transparent"
        }`}
      >
        <nav className="flex flex-col px-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-line/60 py-4 font-display text-base tracking-wide text-snow"
            >
              {item.label}
            </a>
          ))}
          <a
            href={`https://wa.me/54${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 bg-led px-5 py-3.5 text-center font-display text-sm font-semibold tracking-wide text-black"
          >
            Reservá tu lavado →
          </a>
        </nav>
      </div>
    </header>
  );
}
