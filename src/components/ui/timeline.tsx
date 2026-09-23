"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TimelineEntry {
  title: string;
  content: ReactNode;
}

function TimelineItem({ item, index, reduceMotion }: { item: TimelineEntry; index: number; reduceMotion: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  // A ponta da linha fica a 65% da altura da tela; a etapa "acende" quando o topo dela passa por ali.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 72%", "start 62%"] });
  const activeOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const activeScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = reduceMotion ? 1 : activeOpacity;
  const scale = reduceMotion ? 1 : activeScale;

  return (
    <li ref={ref} className="flex justify-start pt-12 first:pt-0 md:gap-10 md:pt-20 md:first:pt-0">
      <div className="relative flex max-w-xs items-start self-start md:w-full lg:max-w-sm">
        <motion.div
          aria-hidden="true"
          style={{ scale }}
          className="absolute left-0 z-10 flex size-11 items-center justify-center rounded-[12px] bg-fm-indigo text-lg font-extrabold text-white shadow-soft"
        >
          {index + 1}
        </motion.div>
        <motion.h3
          style={{ opacity }}
          className="hidden text-3xl font-extrabold text-fm-indigo md:block md:pl-20 lg:text-4xl"
        >
          {item.title}
        </motion.h3>
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full pl-16 pr-2 md:pl-4 md:pt-2"
      >
        <h3 className="mb-2 block pt-1 text-xl font-bold text-fm-indigo md:hidden">{item.title}</h3>
        {item.content}
      </motion.div>
    </li>
  );
}

export function Timeline({ data, className }: { data: TimelineEntry[]; className?: string }) {
  const ref = useRef<HTMLOListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setHeight(el.getBoundingClientRect().height);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 65%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <div ref={containerRef} className={cn("w-full", className)}>
      <ol ref={ref} className="relative mx-auto max-w-5xl">
        {data.map((item, index) => (
          <TimelineItem key={item.title} item={item} index={index} reduceMotion={reduceMotion} />
        ))}

        <div
          aria-hidden="true"
          style={{ height: height + "px" }}
          className="absolute left-[21px] top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,transparent_0%,var(--color-fm-line)_10%,var(--color-fm-line)_90%,transparent_100%)]"
        >
          <motion.div
            style={reduceMotion ? { height } : { height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-b from-fm-green to-fm-cyan"
          />
        </div>
      </ol>
    </div>
  );
}
