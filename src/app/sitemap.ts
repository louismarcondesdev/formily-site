import type { MetadataRoute } from "next";
import { careAreas, flags, legalLinks, site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...(flags.subitems
      ? careAreas.items.filter((a) => a.enabled).map((a) => ({ url: `${site.url}/categoria/${a.slug}`, changeFrequency: "monthly" as const, priority: 0.6 }))
      : []),
    ...(flags.prescriptionForm ? [{ url: `${site.url}/enviar-receita`, changeFrequency: "yearly" as const, priority: 0.5 }] : []),
    ...legalLinks.map((l) => ({ url: `${site.url}${l.href}`, changeFrequency: "yearly" as const, priority: 0.3 })),
  ];
}
