import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getPostBySlug,
  getAllPosts,
  getTopicBySlug,
  formatDate,
  formatDateShort,
} from "@/lib/content";
import { mdxComponents } from "@/components/mdx";
import ReadingProgress from "@/components/ReadingProgress";
import AuthorBio from "@/components/AuthorBio";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `${siteConfig.url}/writing/${post.slug}`,
      publishedTime: `${post.date}T00:00:00Z`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const newerPost =
    currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const olderPost =
    currentIndex >= 0 && currentIndex < allPosts.length - 1
      ? allPosts[currentIndex + 1]
      : null;

  // Prefer posts sharing a topic; fall back to recency.
  const related = allPosts
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      post: p,
      shared: p.tags.filter((t) => post.tags.includes(t)).length,
    }))
    .sort((a, b) => b.shared - a.shared)
    .slice(0, 3)
    .map((r) => r.post);

  const postTopics = post.tags
    .map((t) => getTopicBySlug(t))
    .filter((t): t is NonNullable<typeof t> => !!t);

  const typeLabel = post.type === "essay" ? "Essay" : "Field Note";

  const readingMinutes = Number.parseInt(post.readingTime, 10) || undefined;

  return (
    <>
      <ReadingProgress readingMinutes={readingMinutes} />
      <article className="shell">
        <Link href="/writing" className="article-back">
          ← All writing
        </Link>

        <header className="post-header">
          <p className="meta-line">
            <span>{formatDate(post.date)}</span>
            <span className="dot" aria-hidden="true">·</span>
            <span>{post.readingTime}</span>
            <span className="dot" aria-hidden="true">·</span>
            <span>{typeLabel}</span>
          </p>
          <h1>{post.title}</h1>
          {post.excerpt ? <p className="dek">{post.excerpt}</p> : null}
          <p className="byline">By Jason Capshaw</p>
        </header>

        <div className="prose">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>

        {postTopics.length > 0 && (
          <p className="filed-under">
            <span className="fu-label">Filed under</span>
            {postTopics.map((t) => (
              <Link
                key={t.slug}
                href={`/writing/topics/${t.slug}`}
                className="fu-topic"
              >
                {t.label}
              </Link>
            ))}
          </p>
        )}

        <AuthorBio />

        {(olderPost || newerPost) && (
          <nav className="post-footer" aria-label="Post navigation">
            <div className="post-nav">
              {newerPost ? (
                <Link href={`/writing/${newerPost.slug}`} className="prev">
                  <p className="dir">← Newer</p>
                  <p className="t">{newerPost.title}</p>
                </Link>
              ) : (
                <span />
              )}
              {olderPost ? (
                <Link href={`/writing/${olderPost.slug}`} className="next">
                  <p className="dir">Older →</p>
                  <p className="t">{olderPost.title}</p>
                </Link>
              ) : (
                <span />
              )}
            </div>
          </nav>
        )}

        {related.length > 0 && (
          <section className="related" aria-label="Related essays">
            <p className="related-head">Related Reading</p>
            <div className="related-grid">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/writing/${r.slug}`}
                  className="related-card"
                >
                  <span className="r-topic">
                    {r.type === "essay" ? "Essay" : "Field Note"}
                  </span>
                  <span className="r-title">{r.title}</span>
                  <span className="r-meta">
                    {formatDateShort(r.date)} · {r.readingTime}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
