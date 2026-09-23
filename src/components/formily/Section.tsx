import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/scroll-reveal";
import { TextReveal } from "@/components/ui/text-reveal";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
  textReveal = false,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
  /** Text Reveal palavra a palavra no título (usar em no máximo 3 títulos institucionais). */
  textReveal?: boolean;
}) {
  const cls = cn("max-w-3xl", align === "center" && "mx-auto text-center", className);
  const Wrap = textReveal ? "div" : Reveal; // com Text Reveal, o próprio título anima
  return (
    <Wrap className={cls}>
      {eyebrow && (
        <p className="mb-3 inline-flex rounded-[8px] bg-fm-mint-soft px-3.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-fm-green-dark">
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.75rem]">
        {textReveal ? <TextReveal text={title} /> : title}
      </h2>
      {subtitle && <p className="mt-4 text-lg leading-relaxed text-fm-muted">{subtitle}</p>}
    </Wrap>
  );
}
