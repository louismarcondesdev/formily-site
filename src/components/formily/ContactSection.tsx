import type { ReactNode } from "react";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { contact, hasBusinessValue } from "@/config/site";
import { isWhatsAppConfigured } from "@/lib/whatsapp";
import { RevealGroup, RevealItem } from "@/components/ui/scroll-reveal";
import { Container, SectionHeading } from "./Section";
import { ContactMap } from "./ContactMap";
import { DirectionsLink } from "./DirectionsLink";
import { WhatsAppButton } from "./WhatsAppButton";

const linkClass =
  "inline-flex min-h-11 items-center rounded-sm text-[0.9375rem] font-semibold text-brand-950 underline-offset-4 hover:underline sm:text-base";

function Block({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-care-50 text-care-700">{icon}</span>
      <div className="min-w-0">
        <h4 className="text-xs font-bold uppercase tracking-[0.08em] text-care-700">{title}</h4>
        <div className="mt-1 break-words text-[0.9375rem] leading-relaxed text-text-950 sm:text-base">{children}</div>
      </div>
    </div>
  );
}

/**
 * Ordem de leitura: conversão (WhatsApp) → visita (endereço + rota) → atendimento (horário) → outros canais.
 * Blocos e itens sem dado configurado simplesmente não são renderizados (sem placeholders).
 */
export function ContactSection() {
  const address = [contact.addressLine1, contact.addressLine2].filter(hasBusinessValue);
  const hasDirections = hasBusinessValue(contact.directionsUrl);
  const showVisit = address.length > 0 || hasDirections;
  const showHours = hasBusinessValue(contact.openingHours);
  const phone = hasBusinessValue(contact.phone) ? contact.phone : null;
  const email = hasBusinessValue(contact.email) ? contact.email : null;
  const showChannels = Boolean(phone || email);

  return (
    <section id="contato" aria-labelledby="contato-title" className="scroll-mt-24 bg-surface-50 py-20 lg:py-28">
      <Container>
        <SectionHeading id="contato-title" title="Contato e localização" subtitle="Fale com a nossa equipe ou visite a Formily." />

        {/* Mobile: título → CTA/contatos → mapa. Desktop: lado a lado. */}
        <RevealGroup className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8" stagger={0.1}>
          <RevealItem className="flex flex-col rounded-[24px] border border-border-subtle bg-white p-7 sm:p-9">
            <h3 className="text-2xl font-extrabold text-brand-950">{contact.companyName}</h3>
            <p className="mt-1.5 text-text-650">Atendimento próximo, em {contact.city}.</p>
            <p className="mt-3 max-w-md leading-relaxed text-text-650">
              Fale com nossa equipe pelo WhatsApp para solicitar um orçamento ou tirar dúvidas sobre o atendimento.
            </p>

            {isWhatsAppConfigured && (
              <div className="mt-6">
                <WhatsAppButton event="whatsapp_click_contact_section" size="lg" className="w-full sm:w-auto">
                  Solicitar orçamento pelo WhatsApp
                </WhatsAppButton>
              </div>
            )}

            {(showVisit || showHours || showChannels) && (
              <div className="mt-8 space-y-6 border-t border-border-subtle pt-8">
                {showVisit && (
                  <Block icon={<MapPin className="size-5" aria-hidden="true" />} title="Visite a Formily">
                    {address.length > 0 && (
                      <address className="not-italic">
                        {address.map((line, i) => (
                          <span key={line}>
                            {i > 0 && <br />}
                            {line}
                          </span>
                        ))}
                      </address>
                    )}
                    <DirectionsLink className={address.length > 0 ? "mt-4 w-full sm:w-auto" : "w-full sm:w-auto"} />
                  </Block>
                )}

                {showHours && (
                  <Block icon={<Clock3 className="size-5" aria-hidden="true" />} title="Atendimento">
                    {contact.openingHours}
                  </Block>
                )}

                {showChannels && (
                  <Block icon={<Phone className="size-5" aria-hidden="true" />} title="Outros canais">
                    <ul className="flex flex-col gap-x-6 sm:flex-row sm:flex-wrap">
                      {phone && (
                        <li className="flex items-center gap-2">
                          <Phone className="size-4 text-text-650" aria-hidden="true" />
                          <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} aria-label={`Ligar para ${phone}`} className={linkClass}>
                            {phone}
                          </a>
                        </li>
                      )}
                      {email && (
                        <li className="flex items-center gap-2">
                          <Mail className="size-4 text-text-650" aria-hidden="true" />
                          <a href={`mailto:${email}`} aria-label={`Enviar e-mail para ${email}`} className={linkClass}>
                            {email}
                          </a>
                        </li>
                      )}
                    </ul>
                  </Block>
                )}
              </div>
            )}
          </RevealItem>

          <RevealItem className="self-start lg:w-full">
            <ContactMap />
          </RevealItem>
        </RevealGroup>
      </Container>
    </section>
  );
}
