import { ExternalLink } from "lucide-react";
import { contact, cityState, footer, hasBusinessValue, legalLinks, nav, whatsapp } from "@/config/site";
import { isWhatsAppConfigured, whatsappUrl } from "@/lib/whatsapp";
import { Footer as FooterBase } from "@/components/ui/footer-1";

/**
 * Rodapé em 4 colunas: Marca · Navegação · Atendimento · Institucional.
 * Só exibe dados configurados. O endereço completo fica no card de Contato (aqui, cidade/UF resumida).
 */
export function Footer() {
  const phone = hasBusinessValue(contact.phone) ? contact.phone : null;
  const email = hasBusinessValue(contact.email) ? contact.email : null;
  const hours = hasBusinessValue(contact.openingHours) ? contact.openingHours : null;

  const service = [
    { label: cityState },
    ...(isWhatsAppConfigured ? [{ label: whatsapp.display ? `WhatsApp: ${whatsapp.display}` : "Falar no WhatsApp", href: whatsappUrl() }] : []),
    ...(phone ? [{ label: `Telefone: ${phone}`, href: `tel:${phone.replace(/[^\d+]/g, "")}` }] : []),
    ...(email ? [{ label: `E-mail: ${email}`, href: `mailto:${email}` }] : []),
    ...(hours ? [{ label: `Horários: ${hours}` }] : []),
  ];

  // Dados legais: só se TODOS do grupo estiverem confirmados.
  const { legalName, cnpj, pharmacistName, pharmacistCrf } = contact.legal;
  const legalLines: string[] = [];
  if (hasBusinessValue(legalName) && hasBusinessValue(cnpj)) legalLines.push(`${legalName} · CNPJ ${cnpj}`);
  if (hasBusinessValue(pharmacistName) && hasBusinessValue(pharmacistCrf)) legalLines.push(`Responsável técnico: ${pharmacistName} · ${pharmacistCrf}`);

  return (
    <FooterBase
      logoSrc="/images/formily_logo.webp"
      logoAlt="Formily Farmácia de Manipulação – página inicial"
      logoWidth={2069}
      logoHeight={760}
      description={footer.tagline}
      socialLinks={contact.socialLinks.map((s) => ({ icon: ExternalLink, href: s.href, label: s.label }))}
      columns={[
        {
          title: "Navegação",
          navLabel: "Links do rodapé",
          links: nav.map((n) => ({ label: n.label, href: n.href })),
        },
        { title: "Atendimento", links: service },
        {
          title: "Institucional",
          navLabel: "Documentos legais",
          links: legalLinks.map((l) => ({ label: l.label, href: l.href })),
        },
      ]}
      copyright={`© ${new Date().getFullYear()} ${contact.companyName}. Todos os direitos reservados.`}
      legalLines={legalLines}
      disclaimer={footer.disclaimer}
    />
  );
}
