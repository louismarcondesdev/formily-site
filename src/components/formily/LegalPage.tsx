import type { ReactNode } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Container } from "./Section";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileStickyCta } from "./MobileStickyCta";

export type LegalSection = { title: string; body: ReactNode };

export function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: LegalSection[] }) {
  return (
    <>
      <Header />
      <main id="conteudo" className="bg-white py-14 lg:py-20">
        <Container className="max-w-3xl">
          <Link href="/" className="text-sm font-semibold text-fm-green-dark hover:underline">← Voltar para a página inicial</Link>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">{title}</h1>
          <p role="note" data-unslop="unslop-ignore aviso de rascunho, não é fundo de página" className="mt-6 flex gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950">
            <AlertTriangle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
            <span>
              <strong>Conteúdo inicial sujeito à validação jurídica/LGPD.</strong> Este texto é um ponto de partida e não constitui
              garantia de conformidade legal. Deve ser revisado por profissional habilitado antes da publicação definitiva.
            </span>
          </p>
          <p className="mt-6 text-lg leading-relaxed text-fm-muted">{intro}</p>
          {sections.map((s) => (
            <section key={s.title} className="mt-10">
              <h2 className="text-xl font-bold sm:text-2xl">{s.title}</h2>
              <div className="mt-3 space-y-3 leading-relaxed text-fm-ink/90">{s.body}</div>
            </section>
          ))}
          <p className="mt-12 text-sm text-fm-muted">Última atualização: [PREENCHER: DATA DE VIGÊNCIA]</p>
        </Container>
      </main>
      <Footer />
      <MobileStickyCta />
    </>
  );
}
