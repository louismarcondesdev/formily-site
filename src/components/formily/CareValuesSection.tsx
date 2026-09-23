import { trust } from "@/config/site";
import { Reveal } from "@/components/ui/scroll-reveal";
import { VerticalTabs } from "@/components/ui/vertical-tabs";
import { Container, SectionHeading } from "./Section";

export function CareValuesSection() {
  const items = trust.cards.map((c) => ({ title: c.title, description: c.text, image: c.image, alt: c.alt }));

  return (
    <section id="nossos-cuidados" aria-labelledby="cuidados-title" className="scroll-mt-24 bg-surface-50 py-20 lg:py-28">
      <Container>
        <SectionHeading id="cuidados-title" title={trust.title} textReveal />
        <Reveal className="mt-14">
          <VerticalTabs items={items} />
        </Reveal>
      </Container>
    </section>
  );
}
