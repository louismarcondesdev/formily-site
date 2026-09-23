"use client";

import Image from "next/image";
import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";

export type Testimonial = { text: string; name: string; role?: string; image?: string };

const initials = (name: string) => {
  const parts = name.split(" ").filter(Boolean);
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

/** Coluna que rola na vertical em loop. Com movimento reduzido fica estática, sem cópia duplicada. */
export function TestimonialsColumn({
  testimonials,
  className,
  duration = 10,
}: {
  testimonials: readonly Testimonial[];
  className?: string;
  duration?: number;
}) {
  const reduce = useReducedMotion() ?? false;
  const copies = reduce ? 1 : 2;

  return (
    <div className={className}>
      <motion.div
        animate={reduce ? undefined : { translateY: "-50%" }}
        transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        className="flex flex-col gap-6 pb-6"
      >
        {Array.from({ length: copies }, (_, copy) => (
          <Fragment key={copy}>
            {testimonials.map(({ text, image, name, role }) => (
              <figure
                key={`${copy}-${name}`}
                aria-hidden={copy > 0 ? true : undefined}
                className="w-full max-w-xs rounded-3xl border border-border-subtle bg-white p-8 shadow-soft"
              >
                <blockquote className="leading-relaxed text-text-950">{text}</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  {image ? (
                    <Image src={image} alt="" width={40} height={40} className="size-10 rounded-full object-cover" />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="grid size-10 shrink-0 place-items-center rounded-full bg-fm-mint-soft text-sm font-extrabold text-fm-green-dark"
                    >
                      {initials(name)}
                    </span>
                  )}
                  <span className="flex flex-col leading-5">
                    <span className="font-semibold tracking-tight text-brand-950">{name}</span>
                    {role && <span className="text-sm text-text-650">{role}</span>}
                  </span>
                </figcaption>
              </figure>
            ))}
          </Fragment>
        ))}
      </motion.div>
    </div>
  );
}
