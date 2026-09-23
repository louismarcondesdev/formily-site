import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { careAreas, hero } from "@/config/site";
import { PulseFitHero, PulseFitMarquee } from "@/components/ui/pulse-fit-hero";
import { HeroAreaCard } from "./HeroAreaCard";
import { WhatsAppButton } from "./WhatsAppButton";

// Só as áreas habilitadas que têm ilustração entram no carrossel.
const areasWithImage = careAreas.items.flatMap((a) => (a.enabled && "image" in a ? [a] : []));

const areaCards = (clone: boolean) =>
  areasWithImage.map((a) => (
    <HeroAreaCard
      key={a.label}
      label={a.label}
      icon={a.icon}
      image={a.image}
      clone={clone}
    />
  ));

export function Hero() {
  return (
    <PulseFitHero
      title={hero.title}
      subtitle={hero.text}
      actions={
        <>
          <WhatsAppButton event="whatsapp_click_hero" size="lg">
            {hero.primaryCta}
          </WhatsAppButton>
          <Link
            href="/#como-funciona"
            className="btn-secondary inline-flex min-h-[54px] items-center justify-center rounded-2xl px-7 py-3.5 text-base font-bold"
          >
            {hero.secondaryCta}
          </Link>
        </>
      }
      footnote={
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold text-fm-indigo">
          {hero.trustLine.map((t) => (
            <li key={t} className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-fm-green" aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
      }
      carousel={
        <PulseFitMarquee
          label="Áreas de atendimento"
          items={areaCards(false)}
          clonedItems={areaCards(true)}
        />
      }
    />
  );
}
