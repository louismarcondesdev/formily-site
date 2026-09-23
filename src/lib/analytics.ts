/**
 * Camada de eventos abstraída. O projeto não tem analytics instalado; quando
 * houver GTM (dataLayer), GA4 (gtag) ou outro, os eventos já saem para eles.
 * Também dispara um CustomEvent "formily:track" para integrações futuras.
 */
export type TrackEventName =
  | "whatsapp_click_header"
  | "whatsapp_click_hero"
  | "whatsapp_click_process"
  | "whatsapp_click_care_area"
  | "whatsapp_click_final_cta"
  | "whatsapp_click_faq"
  | "whatsapp_click_contact_section"
  | "whatsapp_click_mobile_sticky"
  | "directions_click";

type AnalyticsWindow = Window & {
  dataLayer?: Record<string, unknown>[];
  gtag?: (command: "event", name: string, params?: Record<string, unknown>) => void;
};

export function trackEvent(name: TrackEventName, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  const w = window as AnalyticsWindow;
  try {
    w.dataLayer?.push({ event: name, ...params });
    w.gtag?.("event", name, params);
    window.dispatchEvent(new CustomEvent("formily:track", { detail: { name, ...params } }));
  } catch {
    // Rastreamento nunca deve quebrar a navegação.
  }
}
