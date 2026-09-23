import type { Metadata } from "next";
import { LegalPage } from "@/components/formily/LegalPage";
import { privacy } from "@/config/legal";

export const metadata: Metadata = {
  title: privacy.title,
  description: privacy.description,
  alternates: { canonical: "/politica-de-privacidade" },
};

export default function Page() {
  return <LegalPage title={privacy.title} intro={privacy.intro} sections={privacy.sections} />;
}
