"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Text Reveal discreto, palavra por palavra (uso: até 3 títulos institucionais).
 * O texto completo fica em `sr-only` para leitores de tela; as palavras animadas são `aria-hidden`.
 * Só opacity + translateY de 10px; com prefers-reduced-motion o texto aparece direto.
 */
export function TextReveal({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion() ?? false;
  const words = text.split(" ");

  // Movimento reduzido: só um fade do título inteiro (sem deslocamento).
  if (reduce) {
    return (
      <motion.span
        data-reveal=""
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        {text}
      </motion.span>
    );
  }

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <motion.span
            key={`${w}-${i}`}
            data-reveal=""
            className="inline-block"
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: {
                opacity: 1,
                y: 0,
                transition: { opacity: { duration: 0.45, ease: [0.4, 0, 0.2, 1] }, y: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
              },
            }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        ))}
      </span>
    </motion.span>
  );
}
