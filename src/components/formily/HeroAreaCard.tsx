"use client";

import Image from "next/image";
import { careAreaMessage } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/whatsapp";
import { NamedIcon, WhatsAppIcon } from "./icons";

type Props = {
  label: string;
  icon: string;
  /** Ilustração 2:3 (1024x1536) da área. */
  image: string;
  /** A cópia do carrossel fica fora da ordem de tabulação. */
  clone?: boolean;
};

/**
 * Card de área de atendimento do hero: ilustração em tela cheia (2:3, igual ao card),
 * com degradê branco na base para o texto manter contraste.
 */
export function HeroAreaCard({ label, icon, image, clone = false }: Props) {
  return (
    <li>
      <a
        href={whatsappUrl(careAreaMessage(label))}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={clone ? -1 : undefined}
        onClick={() => trackEvent("whatsapp_click_care_area", { area: label, placement: "hero" })}
        className="group relative flex h-96 w-64 flex-col justify-between overflow-hidden rounded-3xl bg-fm-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-lift sm:h-[27rem] sm:w-72"
      >
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 640px) 288px, 256px"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-white via-white/85 to-transparent"
        />
        <span className="relative flex size-12 items-center justify-center rounded-2xl bg-white/90 text-fm-indigo shadow-soft backdrop-blur-sm">
          <NamedIcon name={icon} className="size-6" />
        </span>
        <span className="relative">
          <span className="block text-2xl font-bold leading-tight text-fm-indigo">{label}</span>
          <span className="mt-4 flex items-center gap-2 text-sm font-bold text-fm-green-dark">
            <WhatsAppIcon className="size-4" />
            Conversar com a equipe
            <span className="sr-only"> sobre {label} (abre o WhatsApp em uma nova aba)</span>
          </span>
        </span>
      </a>
    </li>
  );
}
