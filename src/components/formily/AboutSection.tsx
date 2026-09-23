import { about, images } from "@/config/site";
import { Container, SectionHeading } from "./Section";
import { ImagePlaceholder } from "./ImagePlaceholder";

export function AboutSection() {
  return (
    <section id="a-formily" aria-labelledby="sobre-title" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/*
          TODO(imagem manifesto): substituir por FOTO REAL de equipe, recepção ou ambiente
          da Formily (images.about em src/config/site.ts). O prompt de IA no brief é só referência de estilo.
        */}
        <div className="relative order-2 lg:order-1">
          <ImagePlaceholder slot={images.about} todo="foto real de equipe/recepção/ambiente" tone="mint" className="aspect-[4/3.4] rounded-[28px] shadow-lift" />
          <div aria-hidden="true" className="absolute -bottom-5 -right-3 -z-10 size-40 rounded-[28px] bg-fm-mint/50 sm:-right-6" />
        </div>
        <div className="order-1 lg:order-2">
          <SectionHeading id="sobre-title" title={about.title} align="left" />
          <div className="mt-7 space-y-5 text-lg leading-relaxed text-fm-muted">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
