"use client";

import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface VerticalTab {
  title: string;
  description: string;
  image: string;
  alt: string;
}

/**
 * Abas verticais com galeria. Adaptado do componente do 21st.dev com semântica de abas
 * (tablist/tab/tabpanel, setas do teclado) e SEM troca automática: nada muda sozinho.
 */
export function VerticalTabs({ items, className }: { items: readonly VerticalTab[]; className?: string }) {
  const [active, setActive] = useState(0);
  // Foto anterior: fica opaca por baixo até a nova cobrir 100%, evitando a "piscada" do fundo.
  const [previous, setPrevious] = useState<number | null>(null);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const go = (index: number, focus = false) => {
    const next = (index + items.length) % items.length;
    if (next === active) return;
    setPrevious(active);
    setActive(next);
    if (focus) tabRefs.current[next]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); go(index + 1, true); }
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); go(index - 1, true); }
    else if (e.key === "Home") { e.preventDefault(); go(0, true); }
    else if (e.key === "End") { e.preventDefault(); go(items.length - 1, true); }
  };

  return (
    <div className={cn("grid items-start gap-8 lg:grid-cols-12 lg:gap-14", className)}>
      <div role="tablist" aria-orientation="vertical" aria-label="Diferenciais da Formily" className="order-2 flex flex-col lg:order-1 lg:col-span-5">
        {items.map((it, i) => {
          const isActive = i === active;
          return (
            <button
              key={it.title}
              ref={(el) => { tabRefs.current[i] = el; }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${i}`}
              aria-selected={isActive}
              aria-controls={`${baseId}-panel`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => go(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "group relative flex items-start gap-4 border-t border-fm-line py-5 pl-5 text-left transition-colors duration-300 first:border-t-0 focus-visible:outline-offset-[-2px] md:py-6",
                isActive ? "text-fm-indigo" : "text-fm-muted hover:text-fm-indigo",
              )}
            >
              <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[2px] bg-fm-line">
                <span className={cn("absolute inset-x-0 top-0 bg-fm-green transition-[height] duration-300 motion-reduce:transition-none", isActive ? "h-full" : "h-0")} />
              </span>
              <span aria-hidden="true" className="mt-2 text-xs font-bold tabular-nums opacity-60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex flex-1 flex-col gap-2">
                <span className="text-xl font-bold tracking-tight md:text-2xl">{it.title}</span>
                <span
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-300 motion-reduce:transition-none",
                    isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <span className="overflow-hidden">
                    <span className="block max-w-sm pb-1 leading-relaxed text-fm-muted">{it.description}</span>
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="order-1 lg:order-2 lg:col-span-7">
        <div
          role="tabpanel"
          id={`${baseId}-panel`}
          aria-labelledby={`${baseId}-tab-${active}`}
          className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-fm-line bg-fm-mint-soft/40 lg:aspect-[16/11]"
        >
          {/* Todas as fotos ficam montadas e pré-carregadas; só a opacidade muda (crossfade sem lacuna). */}
          {items.map((it, i) => {
            const isActive = i === active;
            const isPrevious = i === previous;
            return (
              <Image
                key={it.image}
                src={it.image}
                alt={isActive ? it.alt : ""}
                aria-hidden={!isActive}
                fill
                loading="eager"
                sizes="(min-width: 1024px) 58vw, 100vw"
                className={cn(
                  "object-cover",
                  isActive && "z-20 opacity-100 transition-opacity duration-500 ease-out motion-reduce:duration-150",
                  isPrevious && "z-10 opacity-100",
                  !isActive && !isPrevious && "z-0 opacity-0",
                )}
              />
            );
          })}

          <div className="absolute bottom-4 right-4 z-10 flex gap-2 md:bottom-6 md:right-6">
            <button
              type="button"
              onClick={() => go(active - 1)}
              aria-label="Diferencial anterior"
              className="grid size-11 place-items-center rounded-[12px] border border-fm-line bg-white/90 text-fm-indigo transition-colors hover:bg-white focus-visible:outline-offset-2"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(active + 1)}
              aria-label="Próximo diferencial"
              className="grid size-11 place-items-center rounded-[12px] border border-fm-line bg-white/90 text-fm-indigo transition-colors hover:bg-white focus-visible:outline-offset-2"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
