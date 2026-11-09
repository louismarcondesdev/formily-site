import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { flags } from "@/config/site";
import { saudeCapilar } from "@/config/jornada";
import { Container } from "@/components/formily/Section";
import { Header } from "@/components/formily/Header";
import { Footer } from "@/components/formily/Footer";
import { MobileStickyCta } from "@/components/formily/MobileStickyCta";
import { WhatsAppButton } from "@/components/formily/WhatsAppButton";

export function generateMetadata(): Metadata {
  if (!flags.subitems) return { robots: { index: false } };
  return {
    title: saudeCapilar.titulo,
    description: saudeCapilar.descricao,
    alternates: { canonical: saudeCapilar.path },
  };
}

/** Uma página, duas portas de entrada (Emagrecimento e Pele e cabelos). Sem fórmulas, diagnóstico ou promessas. */
export default function SaudeCapilarPage() {
  // Rascunho desligado: volta para a home (mesmo comportamento das páginas de categoria).
  if (!flags.subitems) redirect("/");

  return (
    <>
      <Header />
      <main id="conteudo" className="bg-white py-14 lg:py-20">
        <Container className="max-w-3xl">
          <Link href="/" className="text-sm font-semibold text-fm-green-dark hover:underline">← Voltar para a página inicial</Link>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">{saudeCapilar.titulo}</h1>
          <p className="mt-4 text-lg leading-relaxed text-fm-muted">{saudeCapilar.descricao}</p>
          <div className="mt-8">
            <WhatsAppButton
              event="whatsapp_click_care_area"
              size="lg"
              message={saudeCapilar.mensagem}
              eventParams={{ area: "saude-capilar", placement: "saude_capilar_page" }}
            >
              {saudeCapilar.cta}
            </WhatsAppButton>
          </div>
        </Container>
      </main>
      <Footer />
      <MobileStickyCta />
    </>
  );
}
