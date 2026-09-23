import Image from "next/image";
import { team } from "@/config/site";
import { RevealGroup, RevealItem } from "@/components/ui/scroll-reveal";
import { Container, SectionHeading } from "./Section";

const initials = (name: string) => {
  const parts = name.split(" ").filter(Boolean);
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

export function TeamSection() {
  return (
    <section id="equipe" aria-labelledby="equipe-title" className="scroll-mt-24 bg-surface-50 py-20 lg:py-28">
      <Container>
        <SectionHeading id="equipe-title" title={team.title} subtitle={team.subtitle} />

        <RevealGroup as="ul" className="mt-14 grid gap-5 lg:grid-cols-3">
          {team.members.map((m) => (
            <RevealItem
              as="li"
              key={m.name}
              className="flex flex-col rounded-[22px] border border-border-subtle bg-white p-6 sm:p-7"
            >
              {m.photo ? (
                <div className="relative size-24 overflow-hidden rounded-2xl">
                  <Image src={m.photo} alt={`Foto de ${m.name}`} fill sizes="96px" className="object-cover" />
                </div>
              ) : (
                <span
                  aria-hidden="true"
                  className="grid size-24 place-items-center rounded-2xl bg-fm-mint-soft text-3xl font-extrabold text-fm-green-dark"
                >
                  {initials(m.name)}
                </span>
              )}
              <h3 className="mt-5 text-xl font-bold">{m.name}</h3>
              <p className="mt-1 text-sm font-bold uppercase tracking-[0.08em] text-care-700">{m.role}</p>
              <p className="mt-4 leading-relaxed text-text-650">{m.bio}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
