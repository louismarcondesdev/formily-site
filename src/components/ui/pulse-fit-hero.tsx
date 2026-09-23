"use client";

import { Pause, Play } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import { MotionConfig, motion, useAnimationFrame, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/scroll-reveal";

type PulseFitHeroProps = {
  /** Id do <h1>, usado em aria-labelledby. */
  titleId?: string;
  eyebrow?: string;
  title: string;
  subtitle: string;
  /** Botões de ação (ex.: WhatsAppButton + link secundário). */
  actions?: ReactNode;
  /** Linha de apoio abaixo dos botões (ex.: lista de pontos de confiança). */
  footnote?: ReactNode;
  /** Faixa inferior, normalmente um <PulseFitMarquee />. */
  carousel?: ReactNode;
  className?: string;
};

export function PulseFitHero({
  titleId = "hero-title",
  eyebrow,
  title,
  subtitle,
  actions,
  footnote,
  carousel,
  className,
}: PulseFitHeroProps) {
  return (
    // reducedMotion="user": desliga as animações de entrada para quem prefere menos movimento.
    <MotionConfig reducedMotion="user">
      <section
        aria-labelledby={titleId}
        className={cn(
          "hero relative flex w-full flex-col overflow-hidden",
          className,
        )}
      >
        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center px-4 pb-12 pt-14 text-center sm:px-6 sm:pt-20 lg:pt-24">
          <RevealGroup stagger={0.08} className="flex w-full flex-col items-center">
            <RevealItem className="flex flex-col items-center gap-7">
              {eyebrow && (
                <p className="inline-flex rounded-[8px] bg-fm-mint-soft px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-fm-green-dark">
                  {eyebrow}
                </p>
              )}
              <h1 id={titleId} className="hero-title mx-auto text-balance">
                {title}
              </h1>
            </RevealItem>
            <RevealItem as="p" className="mt-7 max-w-2xl text-[1.0625rem] leading-relaxed text-text-650 sm:text-xl lg:text-[1.375rem]">
              {subtitle}
            </RevealItem>
            {actions && (
              <RevealItem scale={0.98} className="mt-9 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
                {actions}
              </RevealItem>
            )}
            {footnote && <RevealItem className="mt-10">{footnote}</RevealItem>}
          </RevealGroup>
        </div>

        {carousel && (
          <Reveal y={20} className="relative z-10 w-full pb-14 sm:pb-20">
            {carousel}
          </Reveal>
        )}
      </section>
    </MotionConfig>
  );
}

/** Velocidade da faixa, em pixels por segundo. */
const MARQUEE_SPEED = 40;

/**
 * Faixa horizontal em rolagem contínua. Recebe os cards em `items`; a lista é
 * duplicada (`clonedItems`) para o loop sem emenda, e a cópia fica oculta para
 * leitores de tela e fora da ordem de tabulação. A posição é atualizada quadro a
 * quadro por JS (não depende de CSS/`prefers-reduced-motion`), sem barra de rolagem.
 * Pausa com hover/foco e tem um botão de pausa para quem precisar (WCAG 2.2.2).
 */
export function PulseFitMarquee({
  label,
  items,
  clonedItems,
  className,
}: {
  label: string;
  /** Itens <li> da lista principal. */
  items: ReactNode;
  /** Mesmos itens, para a cópia do loop (renderizados fora da ordem de tabulação). */
  clonedItems: ReactNode;
  className?: string;
}) {
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  useAnimationFrame((_, delta) => {
    if (paused || interacting || !trackRef.current) return;
    const loopWidth = trackRef.current.scrollWidth / 2;
    if (!loopWidth) return;
    let next = x.get() - (MARQUEE_SPEED * delta) / 1000;
    if (next <= -loopWidth) next += loopWidth;
    x.set(next);
  });

  return (
    <div
      role="region"
      aria-label={label}
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={() => setInteracting(false)}
      className={cn("relative overflow-hidden", className)}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-32"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-32"
      />
      <motion.div ref={trackRef} style={{ x }} className="flex w-max py-4">
        <ul className="flex shrink-0 gap-5 pr-5">{items}</ul>
        <ul aria-hidden="true" className="flex shrink-0 gap-5 pr-5">
          {clonedItems}
        </ul>
      </motion.div>
      <button
        type="button"
        onClick={() => setPaused((v) => !v)}
        aria-pressed={paused}
        aria-label={paused ? "Retomar movimento dos cards" : "Pausar movimento dos cards"}
        className="absolute right-4 top-0 z-20 inline-flex size-9 items-center justify-center rounded-[10px] border border-fm-line bg-white/90 text-fm-indigo shadow-soft transition-colors hover:bg-fm-mint-soft"
      >
        {paused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
      </button>
    </div>
  );
}
