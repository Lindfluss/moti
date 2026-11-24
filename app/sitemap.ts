import type { MetadataRoute } from "next";

const siteUrl = "https://moti-type.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/quiz`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
