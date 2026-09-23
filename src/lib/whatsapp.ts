import { whatsapp } from "@/config/site";

/** Segmento usado quando o número real ainda não foi configurado. */
export const WHATSAPP_PLACEHOLDER_NUMBER = "PREENCHER_NUMERO_WHATSAPP";

export const isWhatsAppConfigured = Boolean(whatsapp.number);

/**
 * Monta a URL wa.me com mensagem pré-preenchida.
 * O número é fixo em `whatsapp.number` (src/config/site.ts).
 */
export function whatsappUrl(message: string = whatsapp.defaultMessage): string {
  const number = whatsapp.number?.replace(/\D/g, "") || WHATSAPP_PLACEHOLDER_NUMBER;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
