import Link from "next/link";
import { getAllPosts, formatDateShort } from "@/lib/content";
import HomeView from "@/components/HomeView";

export default function Home() {
  const allPosts = getAllPosts();
  const featured = allPosts[0] ?? null;
  const recentPosts = allPosts.slice(1, 5);
  const essayCount = allPosts.filter((p) => p.type === "essay").length;
  const fieldNoteCount = allPosts.filter((p) => p.type === "field-note").length;

  const homePosts = allPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    date: p.date,
    type: p.type,
    readingTime: p.readingTime,
  }));
  const homeFeatured = featured
    ? {
        slug: featured.slug,
        title: featured.title,
        excerpt: featured.excerpt,
        date: featured.date,
        type: featured.type,
        readingTime: featured.readingTime,
      }
    : null;

  return (
    <div className="shell">
      <HomeView
        featured={homeFeatured}
        recentPosts={homePosts.slice(1, 5)}
        allPostCount={allPosts.length}
        essayCount={essayCount}
        fieldNoteCount={fieldNoteCount}
      >
        <section className="hero fade-in">
          <h1>Systems thinking for B2B distribution.</h1>
          <p className="sub">
            A working archive on digital commerce architecture, product data,
            enterprise systems, and applied AI, written from inside the
            operational middle of industrial distribution.
          </p>
          <div className="ornament" aria-hidden="true" />
        </section>

        {featured && (
          <section className="featured">
            <p className="kicker eyebrow">Latest Essay</p>
            <h2>
              <Link href={`/writing/${featured.slug}`}>{featured.title}</Link>
            </h2>
            <p className="dek">{featured.excerpt}</p>
            <Link href={`/writing/${featured.slug}`} className="more">
              Read essay · {featured.readingTime}
            </Link>
          </section>
        )}

        {recentPosts.length > 0 && (
          <section className="section">
            <div className="section-head">
              <h3>Recent Writing</h3>
              <Link href="/writing" className="link-all">
                All writing →
              </Link>
            </div>
            <ul className="post-list">
              {recentPosts.map((post) => (
                <li
                  key={post.slug}
                  className="post-row"
                  data-preview-title={post.title}
                  data-preview-kind={post.type === "essay" ? "Essay" : "Field note"}
                >
                  <div>
                    <h4 className="pr-title">
                      <Link href={`/writing/${post.slug}`}>{post.title}</Link>
                    </h4>
                    <p className="pr-excerpt">{post.excerpt}</p>
                  </div>
                  <div className="pr-meta">
                    <span className="pr-tag">
                      {post.type === "essay" ? "Essay" : "Field Note"}
                    </span>
                    <span>{formatDateShort(post.date)}</span>
                    <span> · {post.readingTime}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="section">
          <div className="section-head">
            <h3>Topics</h3>
          </div>
          <div className="topic-grid">
            <Link href="/writing/topics/commerce-architecture" className="topic">
              <p className="t-name">Commerce architecture</p>
              <p className="t-desc">
                Platform decisions, data models, and system design for B2B.
              </p>
              <p className="t-count">Platforms · Data · Search</p>
            </Link>
            <Link href="/writing/topics/b2b-distribution" className="topic">
              <p className="t-name">B2B distribution</p>
              <p className="t-desc">
                Contract pricing, branch operations, quote workflows, and how
                physical products actually move.
              </p>
              <p className="t-count">Quote-to-cash · Channels</p>
            </Link>
            <Link href="/writing/topics/applied-ai" className="topic">
              <p className="t-name">Applied AI</p>
              <p className="t-desc">
                AI in procurement, product data, and operational workflows.
              </p>
              <p className="t-count">Classification · Retrieval</p>
            </Link>
            <Link href="/writing/topics/enterprise-systems" className="topic">
              <p className="t-name">Enterprise systems</p>
              <p className="t-desc">
                ERPs, integrations, and the build-vs-buy decisions that shape
                organizations.
              </p>
              <p className="t-count">ERP · Integration · Strategy</p>
            </Link>
            <Link href="/writing/topics/apis-integration" className="topic">
              <p className="t-name">APIs &amp; integration</p>
              <p className="t-desc">
                API strategy, governance, and the product thinking behind
                integration programs.
              </p>
              <p className="t-count">Strategy · Governance</p>
            </Link>
            <Link href="/writing/topics/product-data" className="topic">
              <p className="t-name">Product &amp; pricing data</p>
              <p className="t-desc">
                Catalogs, customer-specific pricing, enrichment, and the
                workflows that keep them usable.
              </p>
              <p className="t-count">Catalogs · Pricing · Enrichment</p>
            </Link>
          </div>
        </section>

        <section className="practice-line">
          <p>
            I also advise distributors and B2B teams on this work:
            architecture, data, APIs, and applied AI.{" "}
            <Link className="link" href="/advisory">
              How I engage →
            </Link>
          </p>
        </section>
      </HomeView>
    </div>
  );
}
