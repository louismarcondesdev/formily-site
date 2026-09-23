"use client";

import type { ReactNode } from "react";
import { trackEvent, type TrackEventName } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "./icons";

type Props = {
  event: TrackEventName;
  children: ReactNode;
  /** Mensagem pré-preenchida; padrão configurável em src/config/site.ts. */
  message?: string;
  variant?: "primary" | "onDark" | "ghost";
  size?: "md" | "lg";
  icon?: boolean;
  className?: string;
  /** Contexto adicional enviado ao evento (ex.: nome da área). */
  eventParams?: Record<string, unknown>;
};

const base =
  "inline-flex items-center justify-center gap-2.5 font-bold";

const variants = {
  // Única CTA preenchida e dominante: estilo .btn-primary (globals.css). Texto branco sobre #078AB6.
  primary: "btn-primary rounded-full",
  onDark: "btn-on-cta rounded-full",
  ghost: "btn-secondary rounded-2xl",
};

const sizes = { md: "min-h-[46px] px-5 py-2.5 text-[0.95rem]", lg: "min-h-[54px] px-7 py-3.5 text-base" };

export function WhatsAppButton({
  event,
  children,
  message,
  variant = "primary",
  size = "md",
  icon = true,
  className,
  eventParams,
}: Props) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent(event, eventParams)}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {icon && <WhatsAppIcon className="size-5 shrink-0" />}
      <span>{children}</span>
      <span className="sr-only"> (abre o WhatsApp em uma nova aba)</span>
    </a>
  );
}
