import { MessageCircle } from "lucide-react";
import { faq } from "@/config/site";
import { Faqs01 } from "@/components/ui/faqs-01";
import { Container } from "./Section";
import { LinkedText } from "./LinkedText";
import { WhatsAppButton } from "./WhatsAppButton";

function FaqHelpCard() {
  return (
    <div className="flex flex-col items-center justify-between gap-4 rounded-[22px] border border-dashed border-fm-indigo/25 bg-white/60 p-5 sm:flex-row sm:p-6">
      <div className="flex items-center gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-fm-indigo text-white">
          <MessageCircle className="size-5" aria-hidden="true" />
        </span>
        <div className="flex flex-col leading-snug">
          <p className="text-base font-bold text-fm-indigo">Ainda tem alguma dúvida?</p>
          <p className="text-sm text-fm-muted">
            Fale com a nossa equipe pelo WhatsApp.
          </p>
        </div>
      </div>
      <WhatsAppButton event="whatsapp_click_faq" className="w-full shrink-0 sm:w-auto">
        Tirar minha dúvida
      </WhatsAppButton>
    </div>
  );
}

const items = faq.items.map((f) => ({
  q: f.q,
  a: <LinkedText text={f.a} linkLabel={"linkLabel" in f ? f.linkLabel : undefined} event="whatsapp_click_faq" />,
}));

export function FaqSection() {
  return (
    <section id="duvidas" aria-labelledby="faq-title" className="scroll-mt-24 bg-surface-50 py-20 lg:py-28">
      <Container>
        <Faqs01 id="faq-title" title={faq.title} items={items} defaultValue="item-0" footer={<FaqHelpCard />} />
      </Container>
    </section>
  );
}
