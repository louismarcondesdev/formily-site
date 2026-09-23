import type { Metadata } from "next";
import { LegalPage } from "@/components/formily/LegalPage";
import { terms } from "@/config/legal";

export const metadata: Metadata = {
  title: terms.title,
  description: terms.description,
  alternates: { canonical: "/termos-de-uso" },
};

export default function Page() {
  return <LegalPage title={terms.title} intro={terms.intro} sections={terms.sections} />;
}
