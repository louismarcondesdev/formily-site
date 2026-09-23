"use client";

import type { ReactNode } from "react";
import { trackEvent, type TrackEventName } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/whatsapp";

/** Link de texto (inline) para o WhatsApp, com o mesmo rastreamento dos botões. */
export function WhatsAppTextLink({
  event,
  children,
  message,
}: {
  event: TrackEventName;
  children: ReactNode;
  message?: string;
}) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent(event)}
      className="font-semibold text-action-700 underline underline-offset-4 hover:text-action-600"
    >
      {children}
      <span className="sr-only"> (abre o WhatsApp em uma nova aba)</span>
    </a>
  );
}
