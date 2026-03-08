import Link from "next/link";
import { getAllPosts } from "@/lib/content";

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 5);

  return (
    <>
      <section className="home-hero">
        <h1 className="home-hero__headline">
          Making sense of architecture, AI, and digital execution in B2B
          distribution — without the hand-wavy nonsense.
        </h1>
        <p className="home-hero__body">
          I build and advise on commerce platforms, data infrastructure, and
          enterprise systems for distributors navigating real digital
          transformation. This is where I write about what actually works.
        </p>
      </section>

      <section className="home-section">
        <p className="home-section__label">Recent Writing</p>
        <ul className="writing-list">
          {recentPosts.map((post) => (
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
        {recentPosts.length > 0 && (
          <p style={{ marginTop: "var(--spacing-lg)" }}>
            <Link href="/writing">All writing &rarr;</Link>
          </p>
        )}
        {recentPosts.length === 0 && (
          <p style={{ color: "var(--color-text-secondary)" }}>
            Writing coming soon.
          </p>
        )}
      </section>
    </>
  );
}
