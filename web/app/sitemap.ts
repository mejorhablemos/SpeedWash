import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${site.domain}`;
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/institucional`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/b2b`, changeFrequency: "monthly", priority: 0.6 },
  ];
}
