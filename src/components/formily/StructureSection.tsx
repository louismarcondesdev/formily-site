import { CheckCircle2 } from "lucide-react";
import { images, structure } from "@/config/site";
import { Container, SectionHeading } from "./Section";
import { ImagePlaceholder } from "./ImagePlaceholder";

export function StructureSection() {
  return (
    <section aria-labelledby="estrutura-title" className="bg-white py-20 lg:py-28">
      <Container>
        <SectionHeading id="estrutura-title" title={structure.title} subtitle={structure.text} />

        {/*
          TODO(fotos reais): os 3 espaços abaixo devem receber fotos REAIS da Formily:
          [FOTO REAL: fachada ou recepção] · [FOTO REAL: farmacêutico responsável / equipe] ·
          [FOTO REAL: área permitida do laboratório ou detalhes de processo].
          Configure em images.structureFacade/structureTeam/structureLab (src/config/site.ts).
        */}
        <div className="mt-14 grid gap-4 md:grid-cols-3 md:grid-rows-2 md:gap-5">
          <ImagePlaceholder slot={images.structureFacade} todo="fachada ou recepção" tone="light" className="aspect-[4/3] rounded-[24px] md:col-span-2 md:row-span-2 md:aspect-auto md:min-h-[26rem]" />
          <ImagePlaceholder slot={images.structureTeam} todo="farmacêutico responsável / equipe" tone="mint" className="aspect-[4/3] rounded-[24px]" />
          <ImagePlaceholder slot={images.structureLab} todo="área permitida do laboratório" tone="indigo" className="aspect-[4/3] rounded-[24px]" />
        </div>

        <ul className="mx-auto mt-10 grid max-w-5xl gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
          {structure.bullets.map((b) => (
            <li key={b} className="flex items-center gap-2.5 font-semibold text-fm-indigo">
              <CheckCircle2 className="size-5 shrink-0 text-fm-green" aria-hidden="true" />
              {b}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
