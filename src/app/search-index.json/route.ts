import { getAllPosts } from "@/lib/content";
import { getAllTalks } from "@/lib/talks";
import { getAllCaseStudies, getAllProjects } from "@/lib/projects";
import type { SearchItem } from "@/components/SearchOverlay";

export const dynamic = "force-static";

export function GET() {
  const posts = getAllPosts().map<SearchItem>((p) => ({
    kind: p.type,
    title: p.title,
    excerpt: p.excerpt,
    href: `/writing/${p.slug}`,
  }));
  const talks = getAllTalks().map<SearchItem>((t) => ({
    kind: "talk",
    title: t.title,
    excerpt: t.abstract,
    href: `/speaking/${t.slug}`,
  }));
  const cases = getAllCaseStudies().map<SearchItem>((c) => ({
    kind: "case",
    title: c.title,
    excerpt: c.summary,
    href: `/projects/${c.slug}`,
  }));
  const projects = getAllProjects().map<SearchItem>((p) => ({
    kind: "project",
    title: p.name,
    excerpt: p.description,
    href: `/projects`,
  }));
  const items: SearchItem[] = [...posts, ...talks, ...cases, ...projects];
  return new Response(JSON.stringify(items), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, s-maxage=31536000, stale-while-revalidate=86400",
    },
  });
}
