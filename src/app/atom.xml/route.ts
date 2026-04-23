import { getAllPosts } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const posts = getAllPosts();
  const updated = posts[0]?.date
    ? new Date(`${posts[0].date}T00:00:00Z`).toISOString()
    : new Date().toISOString();

  const entries = posts
    .map((post) => {
      const url = `${siteConfig.url}/writing/${post.slug}`;
      const published = new Date(`${post.date}T00:00:00Z`).toISOString();
      return [
        "<entry>",
        `<title>${escapeXml(post.title)}</title>`,
        `<link href="${url}"/>`,
        `<id>${url}</id>`,
        `<updated>${published}</updated>`,
        `<published>${published}</published>`,
        `<summary>${escapeXml(post.excerpt)}</summary>`,
        `<category term="${escapeXml(post.type === "essay" ? "Essay" : "Field Note")}"/>`,
        `<author><name>Jason Capshaw</name></author>`,
        "</entry>",
      ].join("");
    })
    .join("");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<feed xmlns="http://www.w3.org/2005/Atom">',
    `<title>${escapeXml(siteConfig.name)}</title>`,
    `<subtitle>${escapeXml(siteConfig.description)}</subtitle>`,
    `<link href="${siteConfig.url}/atom.xml" rel="self"/>`,
    `<link href="${siteConfig.url}/"/>`,
    `<id>${siteConfig.url}/</id>`,
    `<updated>${updated}</updated>`,
    entries,
    "</feed>",
  ].join("");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=31536000, stale-while-revalidate=86400",
    },
  });
}
