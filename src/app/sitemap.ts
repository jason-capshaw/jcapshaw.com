import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/content";
import { getAllProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const cases = getAllProjects();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/writing/${post.slug}`,
    lastModified: new Date(`${post.date}T00:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const caseEntries: MetadataRoute.Sitemap = cases.map((c) => ({
    url: `${siteConfig.url}/projects/${c.slug}`,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/writing`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.url}/projects`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/speaking`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/now`, changeFrequency: "weekly", priority: 0.5 },
    { url: `${siteConfig.url}/subscribe`, changeFrequency: "yearly", priority: 0.4 },
  ];

  return [...staticPages, ...postEntries, ...caseEntries];
}
