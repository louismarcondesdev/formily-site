"use client";

import { createContext, useContext, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Scroll Reveal: aparece uma única vez ao entrar na tela. Só anima opacity e transform
 * (sem layout shift). Com prefers-reduced-motion: fade curto, sem translate/scale.
 * Sem JavaScript, o conteúdo continua visível (regra em <noscript> no layout, via [data-reveal]).
 */
const EASE = [0.22, 1, 0.36, 1] as const;
const OPACITY_EASE = [0.4, 0, 0.2, 1] as const;
const VIEWPORT = { once: true, amount: 0.2 } as const;

type Tag = "div" | "section" | "ul" | "li" | "p" | "span";

interface RevealBase {
  children?: ReactNode;
  className?: string;
  as?: Tag;
  /** Deslocamento vertical inicial em px (máx. 20). */
  y?: number;
  /** Escala inicial sutil (ex.: 0.98). Omitido = sem escala. */
  scale?: number;
  duration?: number;
}

function variantsFor(reduce: boolean, y: number, scale?: number, duration = 0.5, delay = 0): Variants {
  const dy = reduce ? 0 : Math.min(Math.abs(y), 20);
  const ds = reduce ? 1 : (scale ?? 1);
  // Opacidade com curva suave (perceptível); movimento com a curva expo-out da marca.
  // Movimento reduzido: só fade, um pouco mais longo para continuar perceptível.
  const d = reduce ? 0.4 : duration;
  return {
    hidden: { opacity: 0, y: dy, scale: ds },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay,
        opacity: { duration: d, ease: OPACITY_EASE },
        y: { duration: d, ease: EASE },
        scale: { duration: d, ease: EASE },
      },
    },
  };
}

const GroupContext = createContext(false);

/** Reveal simples (fora de grupo). Dentro de <RevealGroup>, use <RevealItem>. */
export function Reveal({ children, className, as = "div", y = 20, scale, duration, delay = 0 }: RevealBase & { delay?: number }) {
  const reduce = useReducedMotion() ?? false;
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      data-reveal=""
      className={className}
      variants={variantsFor(reduce, y, scale, duration, delay)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </Comp>
  );
}

/** Contêiner que escalona (stagger 0.06–0.10 s) os <RevealItem> filhos. */
export function RevealGroup({
  children,
  className,
  as = "div",
  stagger = 0.09,
  delay = 0,
}: {
  children?: ReactNode;
  className?: string;
  as?: Tag;
  stagger?: number;
  delay?: number;
}) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <GroupContext.Provider value>
      <Comp
        className={className}
        variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
      >
        {children}
      </Comp>
    </GroupContext.Provider>
  );
}

/** Item de um <RevealGroup>: herda o gatilho do grupo. */
export function RevealItem({ children, className, as = "div", y = 20, scale, duration }: RevealBase) {
  const reduce = useReducedMotion() ?? false;
  const inGroup = useContext(GroupContext);
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      data-reveal=""
      className={cn(className)}
      variants={variantsFor(reduce, y, scale, duration)}
      {...(inGroup ? {} : { initial: "hidden", whileInView: "show", viewport: VIEWPORT })}
    >
      {children}
    </Comp>
  );
}
