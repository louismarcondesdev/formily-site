import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { careAreas, fillMessage, findCareArea, flags, whatsapp } from "@/config/site";
import { Container } from "@/components/formily/Section";
import { Header } from "@/components/formily/Header";
import { Footer } from "@/components/formily/Footer";
import { MobileStickyCta } from "@/components/formily/MobileStickyCta";
import { WhatsAppButton } from "@/components/formily/WhatsAppButton";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return careAreas.items.filter((a) => a.enabled).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const area = findCareArea((await params).slug);
  if (!area || !flags.subitems) return { robots: { index: false } };
  return {
    title: area.label,
    description: area.summary,
    alternates: { canonical: `/categoria/${area.slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const area = findCareArea((await params).slug);
  // Rascunho desligado ou slug inválido: volta para a home (nunca 404).
  if (!area || !flags.subitems) redirect("/");

  const msg = (subitem?: string) =>
    fillMessage(subitem ? whatsapp.messages.subitem : whatsapp.messages.category, {
      categoria: area.label,
      subitem: subitem?.toLowerCase() ?? "",
    });

  return (
    <>
      <Header />
      <main id="conteudo" className="bg-white py-14 lg:py-20">
        <Container className="max-w-3xl">
          <Link href="/" className="text-sm font-semibold text-fm-green-dark hover:underline">← Voltar para a página inicial</Link>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">{area.label}</h1>
          <p className="mt-4 text-lg leading-relaxed text-fm-muted">{area.summary}</p>

          {area.subitems.length > 0 && (
            <ul className="mt-10 grid gap-3">
              {area.subitems.map((name) => (
                <li
                  key={name}
                  className="flex flex-col gap-3 rounded-[18px] border border-border-subtle bg-surface-50 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
                >
                  <span className="text-lg font-bold text-brand-950">{name}</span>
                  <WhatsAppButton
                    event="whatsapp_click_care_area"
                    variant="ghost"
                    message={msg(name)}
                    eventParams={{ area: area.label, subitem: name, placement: "category_page" }}
                  >
                    Falar com a equipe
                  </WhatsAppButton>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-12 flex flex-col items-start gap-4 border-t border-border-subtle pt-8 sm:flex-row sm:items-center sm:gap-6">
            <p className="text-lg font-semibold text-brand-950">Não encontrou o que procura? Fale com a nossa equipe.</p>
            <WhatsAppButton
              event="whatsapp_click_care_area"
              message={msg()}
              eventParams={{ area: area.label, placement: "category_page_cta" }}
            >
              Falar no WhatsApp
            </WhatsAppButton>
          </div>
        </Container>
      </main>
      <Footer />
      <MobileStickyCta />
    </>
  );
}
