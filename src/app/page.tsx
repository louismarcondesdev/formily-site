import { TopBar } from "@/components/formily/TopBar";
import { SiteNavbar } from "@/components/formily/SiteNavbar";
import { Hero } from "@/components/formily/Hero";
import { CareValuesSection } from "@/components/formily/CareValuesSection";
import { ProcessSection } from "@/components/formily/ProcessSection";
import { CareAreasSection } from "@/components/formily/CareAreasSection";
import { AboutSection } from "@/components/formily/AboutSection";
import { StructureSection } from "@/components/formily/StructureSection";
import { FaqSection } from "@/components/formily/FaqSection";
import { FinalCtaSection } from "@/components/formily/FinalCtaSection";
import { ContactSection } from "@/components/formily/ContactSection";
import { Footer } from "@/components/formily/Footer";
import { MobileStickyCta } from "@/components/formily/MobileStickyCta";
import { JsonLd } from "@/components/formily/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <TopBar />
      <SiteNavbar />
      <main id="conteudo">
        <Hero />
        <CareValuesSection />
        <ProcessSection />
        <CareAreasSection />
        <AboutSection />
        <StructureSection />
        <FaqSection />
        <FinalCtaSection />
        <ContactSection />
      </main>
      <Footer />
      <MobileStickyCta />
    </>
  );
}
