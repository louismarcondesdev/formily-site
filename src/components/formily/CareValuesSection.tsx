import { flags, personalizationPillar as pp, trust } from "@/config/site";
import { Reveal } from "@/components/ui/scroll-reveal";
import { VerticalTabs, type VerticalTab } from "@/components/ui/vertical-tabs";
import { Container, SectionHeading } from "./Section";

export function CareValuesSection() {
  const items: VerticalTab[] = trust.cards.map((c) => ({ title: c.title, description: c.text, image: c.image, alt: c.alt }));
  if (flags.personalization) {
    const v = pp[flags.personalization];
    // Entra em 2º lugar: logo depois de "Atendimento individualizado".
    items.splice(1, 0, { title: v.title, description: v.text, image: pp.image, alt: pp.alt });
  }

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
