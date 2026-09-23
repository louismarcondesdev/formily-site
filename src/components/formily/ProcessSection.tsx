import { howItWorks as proc } from "@/config/site";
import { Reveal } from "@/components/ui/scroll-reveal";
import { Timeline } from "@/components/ui/timeline";
import { Container, SectionHeading } from "./Section";
import { WhatsAppButton } from "./WhatsAppButton";
import { LinkedText } from "./LinkedText";

export function ProcessSection() {
  const data = proc.steps.map((s) => ({
    title: s.title,
    content: (
      <p className="text-lg leading-relaxed text-fm-muted">
        <LinkedText text={s.text} linkLabel={"linkLabel" in s ? s.linkLabel : undefined} event="whatsapp_click_process" />
      </p>
    ),
  }));

  return (
    <section id="como-funciona" aria-labelledby="como-title" className="relative scroll-mt-24 bg-white py-20 lg:py-28">
      <Container className="relative">
        <SectionHeading id="como-title" title={proc.title} subtitle={proc.subtitle} />

        <Timeline data={data} className="mt-14" />

        <Reveal className="mt-16 flex justify-center">
          <WhatsAppButton event="whatsapp_click_process" size="lg">
            {proc.cta}
          </WhatsAppButton>
        </Reveal>
      </Container>
    </section>
  );
}
