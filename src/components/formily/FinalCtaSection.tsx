import { finalCta } from "@/config/site";
import { RevealGroup, RevealItem } from "@/components/ui/scroll-reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { Container } from "./Section";
import { WhatsAppButton } from "./WhatsAppButton";
import { MoleculeMark } from "./icons";

export function FinalCtaSection() {
  return (
    <section aria-labelledby="cta-title" className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <Container className="relative isolate overflow-hidden rounded-[32px] final-cta px-6 py-16 text-center sm:px-12 sm:py-24">
        {/*
          TODO(imagem CTA final): opcionalmente substituir as formas abaixo pelo visual 3D
          "formily-cta-final.png" (images.finalCta) usando <Image fill className="object-cover -z-10">.
        */}
        <MoleculeMark aria-hidden="true" className="absolute right-[6%] top-[10%] -z-10 hidden size-48 text-white/20 sm:block" />

        <h2 id="cta-title" className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight !text-white sm:text-5xl">
          <TextReveal text={finalCta.title} />
        </h2>
        <RevealGroup stagger={0.08}>
          <RevealItem as="p" className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white">{finalCta.text}</RevealItem>
          <RevealItem className="mt-9 flex justify-center">
            <WhatsAppButton event="whatsapp_click_final_cta" variant="onDark" size="lg">
              {finalCta.cta}
            </WhatsAppButton>
          </RevealItem>
        </RevealGroup>
      </Container>
    </section>
  );
}
