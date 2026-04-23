import { getAllPosts } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const posts = getAllPosts();

  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: siteConfig.name,
    home_page_url: siteConfig.url,
    feed_url: `${siteConfig.url}/feed.json`,
    description: siteConfig.description,
    language: "en-US",
    authors: [{ name: "Jason Capshaw" }],
    items: posts.map((post) => {
      const url = `${siteConfig.url}/writing/${post.slug}`;
      const published = new Date(`${post.date}T00:00:00Z`).toISOString();
      return {
        id: url,
        url,
        title: post.title,
        summary: post.excerpt,
        content_text: post.excerpt,
        date_published: published,
        tags: [post.type === "essay" ? "Essay" : "Field Note"],
      };
    }),
  };

  return new Response(JSON.stringify(feed), {
    headers: {
      "Content-Type": "application/feed+json; charset=utf-8",
      "Cache-Control": "public, s-maxage=31536000, stale-while-revalidate=86400",
    },
  });
}
