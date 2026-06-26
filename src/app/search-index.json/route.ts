import { getAllPosts } from "@/lib/content";
import { getAllProjects } from "@/lib/projects";
import type { SearchItem } from "@/components/SearchOverlay";

export const dynamic = "force-static";

export function GET() {
  const posts = getAllPosts().map<SearchItem>((p) => ({
    kind: p.type,
    title: p.title,
    excerpt: p.excerpt,
    href: `/writing/${p.slug}`,
  }));
  const cases = getAllProjects().map<SearchItem>((c) => ({
    kind: "case",
    title: c.title,
    excerpt: c.summary,
    href: `/projects/${c.slug}`,
  }));
  const items: SearchItem[] = [...posts, ...cases];
  return new Response(JSON.stringify(items), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, s-maxage=31536000, stale-while-revalidate=86400",
    },
  });
}
