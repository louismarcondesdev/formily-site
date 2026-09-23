import type { MetadataRoute } from "next";
import { legalLinks, site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...legalLinks.map((l) => ({ url: `${site.url}${l.href}`, changeFrequency: "yearly" as const, priority: 0.3 })),
  ];
}
