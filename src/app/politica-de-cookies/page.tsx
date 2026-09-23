import type { Metadata } from "next";
import { LegalPage } from "@/components/formily/LegalPage";
import { cookies } from "@/config/legal";

export const metadata: Metadata = {
  title: cookies.title,
  description: cookies.description,
  alternates: { canonical: "/politica-de-cookies" },
};

export default function Page() {
  return <LegalPage title={cookies.title} intro={cookies.intro} sections={cookies.sections} />;
}
