import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { careAreas, fillMessage, findCareArea, flags, whatsapp } from "@/config/site";
import { emagrecimentoSlug, jornadaEntrada, jornadaEtapas, linkCapilar, saudeCapilar } from "@/config/jornada";
import { subgrupoBotao, subgruposDe, type Subgrupo } from "@/config/subgrupos";
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

type CardProps = {
  titulo: string;
  descricao: string;
  cta: string;
  mensagem: string;
  area: string;
  subitem: string;
  /** Página canônica extra (saúde capilar), além do WhatsApp. */
  href?: string | null;
};

function Card({ titulo, descricao, cta, mensagem, area, subitem, href }: CardProps) {
  return (
    <li className="flex flex-col gap-4 rounded-[18px] border border-border-subtle bg-surface-50 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div className="max-w-xl">
        <h3 className="text-lg font-bold text-brand-950">{titulo}</h3>
        <p className="mt-1 text-base leading-relaxed text-fm-muted">{descricao}</p>
      </div>
      <div className="flex shrink-0 flex-col gap-2 sm:items-end">
        <WhatsAppButton
          event="whatsapp_click_care_area"
          variant="ghost"
          message={mensagem}
          eventParams={{ area, subitem, placement: "category_page" }}
        >
          {cta}
        </WhatsAppButton>
        {href && (
          <Link href={href} className="text-sm font-semibold text-fm-green-dark hover:underline">
            {saudeCapilar.linkTexto}
          </Link>
        )}
      </div>
    </li>
  );
}

const subCard = (s: Subgrupo, area: string) => (
  <Card
    key={`${s.nicho}-${s.titulo}`}
    titulo={s.titulo}
    descricao={s.descricao}
    cta={subgrupoBotao}
    mensagem={s.mensagem}
    area={area}
    subitem={s.titulo}
    href={linkCapilar(s.titulo)}
  />
);

/** Agrupa pelo nicho original da planilha, mantendo a ordem de aparição. */
function porNicho(lista: readonly Subgrupo[]) {
  const mapa = new Map<string, Subgrupo[]>();
  for (const s of lista) mapa.set(s.nicho, [...(mapa.get(s.nicho) ?? []), s]);
  return [...mapa.entries()];
}

export default async function CategoryPage({ params }: Props) {
  const area = findCareArea((await params).slug);
  // Rascunho desligado ou slug inválido: volta para a home (nunca 404).
  if (!area || !flags.subitems) redirect("/");

  const lista = subgruposDe(area.slug);
  const jornada = area.slug === emagrecimentoSlug;
  // Na jornada, as etapas substituem os subgrupos de mesmo título (sem cards duplicados).
  const naJornada = new Set(jornadaEtapas.map((e) => e.subgrupo));
  const grupos = porNicho(jornada ? lista.filter((s) => !naJornada.has(s.titulo)) : lista);

  return (
    <>
      <Header />
      <main id="conteudo" className="bg-white py-14 lg:py-20">
        <Container className="max-w-3xl">
          <Link href="/" className="text-sm font-semibold text-fm-green-dark hover:underline">← Voltar para a página inicial</Link>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">{area.label}</h1>
          <p className="mt-4 text-lg leading-relaxed text-fm-muted">{area.summary}</p>

          {jornada && (
            <section aria-labelledby="jornada-title" className="mt-10">
              <h2 id="jornada-title" className="text-2xl font-extrabold text-brand-950">{jornadaEntrada.titulo}</h2>
              <p className="mt-2 text-base text-fm-muted">{jornadaEntrada.descricao}</p>
              <ul className="mt-6 grid gap-3">
                {jornadaEtapas.map((e) => (
                  <Card
                    key={e.subgrupo}
                    titulo={`${e.momento}: ${e.titulo}`}
                    descricao={e.descricao}
                    cta={e.cta}
                    mensagem={e.mensagem}
                    area={area.label}
                    subitem={e.subgrupo}
                    href={linkCapilar(e.subgrupo)}
                  />
                ))}
              </ul>
            </section>
          )}

          {grupos.map(([nicho, itens]) => (
            <section key={nicho} aria-label={nicho} className="mt-10">
              {/* h2 sempre existe (hierarquia h1 > h2 > h3); fica só para leitor de tela quando há um grupo único. */}
              <h2 className={grupos.length > 1 || jornada ? "mb-3 text-xl font-extrabold text-brand-950" : "sr-only"}>
                {jornada ? "Outros cuidados" : nicho}
              </h2>
              <ul className="grid gap-3">{itens.map((s) => subCard(s, area.label))}</ul>
            </section>
          ))}

          <div className="mt-12 flex flex-col items-start gap-4 border-t border-border-subtle pt-8 sm:flex-row sm:items-center sm:gap-6">
            <p className="text-lg font-semibold text-brand-950">Não encontrou o que procura? Fale com a nossa equipe.</p>
            <WhatsAppButton
              event="whatsapp_click_care_area"
              message={fillMessage(whatsapp.messages.category, { categoria: area.label })}
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
