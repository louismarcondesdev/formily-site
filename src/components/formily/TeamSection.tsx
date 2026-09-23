import { team } from "@/config/site";
import { TailwindImageAccordion } from "@/components/ui/tailwind-image-accordion";
import { Container, SectionHeading } from "./Section";

const items = team.members.map((m) => ({
  title: m.name,
  subtitle: m.role,
  description: m.bio,
  image: m.photo,
  alt: `Foto de ${m.name}`,
}));

export function TeamSection() {
  return (
    <section id="equipe" aria-labelledby="equipe-title" className="scroll-mt-24 bg-surface-50 py-20 lg:py-28">
      <Container>
        <SectionHeading id="equipe-title" title={team.title} subtitle={team.subtitle} />

        <div className="mt-14">
          <TailwindImageAccordion items={items} persistentTitle heightClass="h-[32rem] md:h-[440px]" />
        </div>
      </Container>
    </section>
  );
}
