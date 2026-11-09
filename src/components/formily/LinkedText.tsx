import Link from "next/link";
import type { ReactNode } from "react";
import { fillMessage, flags, whatsapp } from "@/config/site";
import type { TrackEventName } from "@/lib/analytics";
import { WhatsAppTextLink } from "./WhatsAppTextLink";

export type TextLink = {
  label: string;
  /** whatsapp-prescription: WhatsApp com mensagem de receita · form: formulário (ou WhatsApp se desligado) · privacy: política. */
  to: "whatsapp-prescription" | "form" | "privacy";
};

const linkClass = "font-semibold text-action-700 underline underline-offset-4 hover:text-action-600";

function Anchor({ link, event }: { link: TextLink; event: TrackEventName }) {
  const message = whatsapp.messages.prescription;
  if (link.to === "privacy") {
    return <Link href="/politica-de-privacidade" className={linkClass}>{link.label}</Link>;
  }
  if (link.to === "form" && flags.prescriptionForm) {
    return <Link href="/enviar-receita" className={linkClass}>{link.label}</Link>;
  }
  return <WhatsAppTextLink event={event} message={fillMessage(message)}>{link.label}</WhatsAppTextLink>;
}

/** Transforma cada `label` de `links` (na ordem em que aparece no texto) em link. */
export function LinkedText({ text, links = [], event }: { text: string; links?: readonly TextLink[]; event: TrackEventName }) {
  const out: ReactNode[] = [];
  let rest = text;
  links.forEach((link, n) => {
    const i = rest.indexOf(link.label);
    if (i < 0) return;
    out.push(rest.slice(0, i), <Anchor key={n} link={link} event={event} />);
    rest = rest.slice(i + link.label.length);
  });
  out.push(rest);
  return <>{out}</>;
}
