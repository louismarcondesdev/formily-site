import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  // Sem NEXT_PUBLIC_SITE_URL em produção, o site ainda aponta para localhost: não indexar.
  if (!site.urlIsConfigured && process.env.NODE_ENV === "production") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
