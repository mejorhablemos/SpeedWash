// Eventos de conversión. Son no-op si GA/Pixel no están configurados,
// así que es seguro llamarlos siempre.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/** Lead capturado (alta en la lista de apertura). */
export function trackLead(source: string) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "generate_lead", { source });
  window.fbq?.("track", "Lead", { source });
}

/** Click en un CTA de contacto (WhatsApp / Instagram). */
export function trackContactClick(source: string) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "contact_click", { source });
  window.fbq?.("track", "Contact", { source });
}

/** Click en un CTA que envía al usuario a la app de compra
 *  (lavar.speedwash.com.ar). Es el evento clave de conversión. */
export function trackBuyAppClick(source: string) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "buy_app_click", { source });
  window.fbq?.("track", "InitiateCheckout", { source });
}
