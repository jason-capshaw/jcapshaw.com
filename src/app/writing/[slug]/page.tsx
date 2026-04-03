import Link from "next/link";
import { getPostBySlug, getAllPosts, formatDate } from "@/lib/content";
import { markdownToHtml } from "@/lib/markdown";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

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
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const htmlContent = await markdownToHtml(post.content);

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const nextPost = currentIndex >= 0 && currentIndex < allPosts.length - 1
    ? allPosts[currentIndex + 1]
    : null;

  return (
    <article>
      <Link href="/writing" className="article-back">
        &larr; All writing
      </Link>
      <header className="article-header">
        <p className="article-header__type">
          {post.type === "essay" ? "Essay" : "Field Note"}
        </p>
        <h1 className="article-header__title">{post.title}</h1>
        <div className="article-header__meta">
          <span>{formatDate(post.date)}</span>
          <span>{post.readingTime}</span>
        </div>
      </header>
      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      {nextPost && (
        <footer className="article-footer">
          <p className="article-footer__label mono">Next</p>
          <h3 className="writing-item__title">
            <Link href={`/writing/${nextPost.slug}`}>{nextPost.title}</Link>
          </h3>
          <p className="writing-item__excerpt">{nextPost.excerpt}</p>
        </footer>
      )}
    </article>
  );
}
