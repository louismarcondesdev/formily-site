import Image from "next/image";
import type { ImageSlot } from "@/config/site";
import { cn } from "@/lib/utils";
import { MoleculeMark } from "./icons";

type Props = {
  slot: ImageSlot;
  /** Descrição curta do que substituir (comentário visível só em desenvolvimento). */
  todo: string;
  tone?: "light" | "mint" | "indigo";
  className?: string;
  priority?: boolean;
  sizes?: string;
};

const tones = {
  light: "bg-gradient-to-br from-fm-mint-soft via-white to-[#e6f6fc] text-fm-indigo",
  mint: "bg-gradient-to-br from-fm-mint/50 via-fm-mint-soft to-white text-fm-indigo",
  indigo: "bg-gradient-to-br from-fm-indigo via-[#3d3390] to-[#1f1850] text-fm-mint",
};

/**
 * Se `slot.src` estiver definido em src/config/site.ts, renderiza a imagem real.
 * Caso contrário, mostra um placeholder abstrato (gradiente + formas orgânicas).
 * O rótulo com o nome do arquivo aparece SOMENTE em desenvolvimento.
 */
export function ImagePlaceholder({ slot, todo, tone = "light", className, priority, sizes }: Props) {
  if (slot.src) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image src={slot.src} alt={slot.alt} fill priority={priority} sizes={sizes ?? "(min-width: 1024px) 50vw, 100vw"} className="object-cover" />
      </div>
    );
  }
  return (
    <div className={cn("relative isolate overflow-hidden", tones[tone], className)} aria-hidden="true">
      {/* TODO(imagem): substituir por <slot.file> — ver docs/FORMILY_IMAGE_BRIEF.md */}
      <div className="absolute -left-1/4 -top-1/4 size-3/4 rounded-full bg-fm-mint/40 blur-2xl" />
      <div className="absolute -bottom-1/4 -right-1/4 size-3/4 rounded-full bg-fm-cyan/25 blur-2xl" />
      <svg className="absolute inset-0 size-full opacity-60" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" fill="none">
        <path d="M-20 220C80 160 140 260 240 200S360 120 430 170" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.5" />
        <path d="M-20 250C90 200 160 290 250 235S370 160 430 205" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.5" />
        <circle cx="320" cy="70" r="46" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1.5" />
      </svg>
      <MoleculeMark className="animate-fm-float absolute right-[12%] top-[14%] size-1/3 max-w-40 opacity-70" />
      {process.env.NODE_ENV !== "production" && (
        <span className="absolute inset-x-3 bottom-3 rounded-lg bg-black/70 px-3 py-2 text-xs font-medium text-white">
          {slot.realPhoto ? "FOTO REAL" : "IMAGEM"}: {slot.file} — {todo}
        </span>
      )}
    </div>
  );
}
