import Link from "next/link";
import { getAllPosts, formatDate, formatDateShort } from "@/lib/content";

export default function Home() {
  const allPosts = getAllPosts();
  const featured = allPosts[0];
  const recentPosts = allPosts.slice(1, 5);

  return (
    <>
      <section className="home-hero">
        <h1 className="home-hero__headline">
          Systems thinking for B2B distribution.
        </h1>
        <p className="home-hero__body">
          Writing on commerce architecture, enterprise systems, product data,
          and applied AI.
        </p>
      </section>

      {featured && (
        <section className="home-featured">
          <p className="home-featured__label mono">Latest</p>
          <h2 className="home-featured__title">
            <Link href={`/writing/${featured.slug}`}>{featured.title}</Link>
          </h2>
          <p className="home-featured__excerpt">{featured.excerpt}</p>
          <p className="home-featured__meta">
            {featured.type === "essay" ? "Essay" : "Field Note"} &middot;{" "}
            {formatDate(featured.date)}
          </p>
        </section>
      )}

      {recentPosts.length > 0 && (
        <section className="home-section">
          <div className="home-section__header">
            <p className="mono">Recent Writing</p>
            <Link href="/writing" className="home-section__all">
              View all &rarr;
            </Link>
          </div>
          <ul className="writing-list">
            {recentPosts.map((post) => (
              <li key={post.slug} className="writing-item">
                <div className="writing-item__body">
                  <h3 className="writing-item__title">
                    <Link href={`/writing/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="writing-item__excerpt">{post.excerpt}</p>
                </div>
                <div className="writing-item__aside">
                  <p className="writing-item__type">
                    {post.type === "essay" ? "Essay" : "Field Note"}
                  </p>
                  <p className="writing-item__date">
                    {formatDateShort(post.date)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="home-pillars">
        <p className="mono">What I write about</p>
        <div className="home-pillars__grid">
          <Link href="/writing" className="home-pillar">
            <p className="home-pillar__title">Commerce Architecture</p>
            <p className="home-pillar__desc">
              Platform decisions, data models, and system design for B2B
              complexity.
            </p>
          </Link>
          <Link href="/writing" className="home-pillar">
            <p className="home-pillar__title">Distribution &amp; Industrial</p>
            <p className="home-pillar__desc">
              The specific problems of moving physical products through complex
              supply chains.
            </p>
          </Link>
          <Link href="/writing" className="home-pillar">
            <p className="home-pillar__title">Applied AI</p>
            <p className="home-pillar__desc">
              What happens when AI meets procurement workflows, product data,
              and real-world constraints.
            </p>
          </Link>
          <Link href="/writing" className="home-pillar">
            <p className="home-pillar__title">Enterprise Systems</p>
            <p className="home-pillar__desc">
              ERPs, integrations, build-vs-buy, and the organizational friction
              of digital transformation.
            </p>
          </Link>
        </div>
      </section>
    </>
  );
}
