import type { Metadata } from "next";
import { getAllPosts } from "@/lib/content";
import WritingIndex from "./WritingIndex";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays and field notes on B2B distribution, commerce architecture, enterprise systems, and applied AI.",
};

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <div className="shell">
      <section className="archive-head">
        <h1>Writing</h1>
        <p className="lede">
          Long-form essays and shorter field notes on distribution, commerce
          architecture, enterprise systems, and AI that actually ships.
        </p>
      </section>
      <WritingIndex
        posts={posts.map((p) => ({
          slug: p.slug,
          title: p.title,
          excerpt: p.excerpt,
          date: p.date,
          type: p.type,
          readingTime: p.readingTime,
        }))}
      />
    </div>
  );
}
