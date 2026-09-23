import { careAreas } from "@/config/site";
import { cn } from "@/lib/utils";
import { Container, SectionHeading } from "./Section";
import { NamedIcon } from "./icons";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/scroll-reveal";
import { WhatsAppButton } from "./WhatsAppButton";

const isDev = process.env.NODE_ENV !== "production";
const CTA_MESSAGE = "Olá! Não encontrei o que procuro e gostaria de falar com a equipe da Formily Farmácia de Manipulação.";

function HelpCta() {
  return (
    <Reveal className="mt-12 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center sm:gap-6">
      <p className="text-lg font-semibold text-brand-950">Não encontrou o que procura? Fale com a nossa equipe.</p>
      <WhatsAppButton
        event="whatsapp_click_care_area"
        variant="ghost"
        eventParams={{ area: "outras", placement: "care_areas_cta" }}
        message={CTA_MESSAGE}
      >
        Falar com a equipe
      </WhatsAppButton>
    </Reveal>
  );
}

/**
 * Regras (ver `careAreas` em src/config/site.ts):
 * - só áreas `enabled` são exibidas;
 * - < 4: versão institucional, sem citar categorias;
 * - 4–6: grade 3/2/1 colunas; 7+: bento assimétrico com card principal.
 */
export function CareAreasSection() {
  const items = careAreas.items.filter((a) => a.enabled);
  const bento = items.length >= 7;

  return (
    <section aria-labelledby="areas-title" className="bg-surface-50 py-20 lg:py-28">
      <Container>
        <SectionHeading id="areas-title" title={careAreas.title} subtitle={careAreas.subtitle} />

        {items.length >= 4 && (
          <RevealGroup
            as="ul"
            className={cn(
              "mt-14 grid gap-4 md:grid-cols-2 lg:gap-5",
              bento ? "lg:grid-cols-4" : "lg:grid-cols-3",
            )}
          >
            {items.map((a, i) => {
              const main = bento && i === 0;
              return (
                <RevealItem
                  as="li"
                  key={a.label}
                  className={cn(
                    "flex flex-col rounded-[22px] border border-border-subtle bg-white p-6 transition-[transform,border-color] duration-200 ease-out motion-safe:hover:-translate-y-0.5 hover:border-fm-indigo/25 sm:p-7",
                    main && "md:col-span-2 lg:row-span-2 lg:p-9",
                  )}
                >
                  <span
                    className={cn(
                      "flex items-center justify-center bg-care-50 text-care-700",
                      main ? "size-14 rounded-2xl" : "size-11 rounded-xl",
                    )}
                  >
                    <NamedIcon name={a.icon} className={main ? "size-7" : "size-5"} />
                  </span>
                  <h3 className={cn("mt-5 font-bold", main ? "text-2xl lg:text-3xl" : "text-lg")}>{a.label}</h3>
                  {isDev && !a.confirmed && (
                    <p className="mt-1.5 text-[0.7rem] font-semibold uppercase tracking-wide text-text-500">
                      [VALIDAR DISPONIBILIDADE] (visível só em desenvolvimento)
                    </p>
                  )}
                </RevealItem>
              );
            })}
          </RevealGroup>
        )}

        <HelpCta />
      </Container>
    </section>
  );
}
