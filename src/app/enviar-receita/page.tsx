import type { Metadata } from "next";
import Link from "next/link";
import { fillMessage, flags, whatsapp } from "@/config/site";
import { Container } from "@/components/formily/Section";
import { Header } from "@/components/formily/Header";
import { Footer } from "@/components/formily/Footer";
import { MobileStickyCta } from "@/components/formily/MobileStickyCta";
import { WhatsAppButton } from "@/components/formily/WhatsAppButton";
import { PrescriptionForm } from "@/components/formily/PrescriptionForm";

export const metadata: Metadata = {
  title: "Enviar receita",
  description: "Envie sua receita para a equipe da Formily e receba o retorno do seu orçamento pelo WhatsApp.",
  alternates: { canonical: "/enviar-receita" },
  robots: { index: flags.prescriptionForm },
};

export default function Page() {
  return (
    <>
      <Header />
      <main id="conteudo" className="bg-white py-14 lg:py-20">
        <Container className="max-w-xl">
          <Link href="/" className="text-sm font-semibold text-fm-green-dark hover:underline">← Voltar para a página inicial</Link>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">Envie sua receita</h1>
          {flags.prescriptionForm ? (
            <>
              <p className="mt-4 text-lg leading-relaxed text-fm-muted">
                Preencha os dados e anexe sua receita. Nossa equipe retorna pelo WhatsApp com o seu orçamento.
              </p>
              <PrescriptionForm pharmacistMessage={fillMessage(whatsapp.messages.pharmacist)} />
            </>
          ) : (
            <>
              <p className="mt-4 text-lg leading-relaxed text-fm-muted">Envie sua receita diretamente pelo WhatsApp.</p>
              <WhatsAppButton event="whatsapp_click_process" size="lg" message={whatsapp.messages.prescription} className="mt-6">
                Enviar receita pelo WhatsApp
              </WhatsAppButton>
            </>
          )}
        </Container>
      </main>
      <Footer />
      <MobileStickyCta />
    </>
  );
}
