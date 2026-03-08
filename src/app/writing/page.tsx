import Link from "next/link";
import { getAllPosts } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays and field notes on B2B distribution, commerce architecture, enterprise systems, and applied AI.",
};

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <>
      <div className="page-intro">
        <h1 className="page-intro__headline">Writing</h1>
        <p className="page-intro__subhead">
          Long-form essays and shorter field notes on distribution, commerce
          architecture, enterprise systems, and AI that actually ships.
        </p>
      </div>

      <ul className="writing-list">
        {posts.map((post) => (
          <li key={post.slug} className="writing-item">
            <p className="writing-item__type">
              {post.type === "essay" ? "Essay" : "Field Note"}
            </p>
            <h2 className="writing-item__title">
              <Link href={`/writing/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="writing-item__excerpt">{post.excerpt}</p>
            <p className="writing-item__date">{post.date}</p>
          </li>
        ))}
      </ul>

      {posts.length === 0 && (
        <p style={{ color: "var(--color-text-secondary)" }}>
          Writing coming soon.
        </p>
      )}
    </>
  );
}
