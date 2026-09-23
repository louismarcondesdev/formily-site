import { testimonials } from "@/config/site";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { Container, SectionHeading } from "./Section";

const DURATIONS = [15, 19, 17];
const COLUMN_CLASS = [undefined, "hidden md:block", "hidden lg:block"];

/** Só renderiza com depoimentos reais e autorizados em `testimonials.items` (src/config/site.ts). */
export function TestimonialsSection() {
  const { items, title, subtitle } = testimonials;
  if (items.length === 0) return null;

  const columns = [0, 1, 2].map((c) => items.filter((_, i) => i % 3 === c)).filter((col) => col.length > 0);

  return (
    <section id="depoimentos" aria-labelledby="depoimentos-title" className="scroll-mt-24 bg-surface-50 py-20 lg:py-28">
      <Container>
        <SectionHeading id="depoimentos-title" title={title} subtitle={subtitle} />
        <div className="mt-14 flex max-h-[740px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] motion-reduce:max-h-none motion-reduce:overflow-visible motion-reduce:[mask-image:none]">
          {columns.map((col, i) => (
            <TestimonialsColumn key={i} testimonials={col} duration={DURATIONS[i]} className={COLUMN_CLASS[i]} />
          ))}
        </div>
      </Container>
    </section>
  );
}
