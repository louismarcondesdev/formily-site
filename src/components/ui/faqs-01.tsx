import { MessageCircle } from "lucide-react";

import { Reveal } from "@/components/ui/scroll-reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export type FaqItem = { q: string; a: React.ReactNode };

export function Faqs01({
  id,
  title,
  items,
  defaultValue,
  footer,
}: {
  id?: string;
  title: string;
  items: readonly FaqItem[];
  defaultValue?: string;
  footer?: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <Reveal className="flex flex-col items-center gap-3 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-[8px] border border-fm-line bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-fm-green-dark shadow-soft">
          <MessageCircle className="size-3" aria-hidden="true" />
          FAQ
        </span>
        <h2 id={id} className="text-balance text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h2>
      </Reveal>

      <Reveal className="mt-12">
      <Accordion defaultValue={defaultValue ? [defaultValue] : undefined}>
        {items.map((f, i) => (
          <AccordionItem key={f.q} value={`item-${i}`} className="border-fm-line">
            <AccordionTrigger className="py-5 text-lg font-bold text-fm-indigo">{f.q}</AccordionTrigger>
            <AccordionContent className="pb-5 text-base leading-relaxed text-fm-muted">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      </Reveal>

      {footer && <Reveal className="mt-10">{footer}</Reveal>}
    </div>
  );
}
