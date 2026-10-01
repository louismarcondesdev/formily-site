import { whatsapp } from "@/config/site";

const findNumber = (id: string) =>
  whatsapp.numbers.find((n) => n.id === id) ?? whatsapp.numbers[0];

export const isWhatsAppConfigured = whatsapp.numbers.length > 0;

/** Número para exibição do atendimento padrão (ou de outro `id`). */
export const whatsappDisplay = (id: string = whatsapp.defaultId) => findNumber(id)?.display;

/**
 * Monta a URL wa.me com mensagem pré-preenchida.
 * Números ficam só em `whatsapp.numbers` (src/config/site.ts).
 */
export function whatsappUrl(
  message: string = whatsapp.messages.default,
  numberId: string = whatsapp.defaultId,
): string {
  const number = findNumber(numberId)?.number.replace(/\D/g, "") ?? "";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
