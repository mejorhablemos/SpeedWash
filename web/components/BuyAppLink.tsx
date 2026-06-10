"use client";

import type { ReactNode } from "react";
import { BUY_APP_URL } from "@/lib/site";
import { trackBuyAppClick } from "@/lib/analytics";

type Props = {
  source: string;
  className?: string;
  children: ReactNode;
};

// Link de conversión a la app de compra (lavar.speedwash.com.ar).
// Dispara el evento buy_app_click con el origen del clic.
export default function BuyAppLink({ source, className, children }: Props) {
  return (
    <a
      href={BUY_APP_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackBuyAppClick(source)}
      className={className}
    >
      {children}
    </a>
  );
}
