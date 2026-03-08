import { getPostBySlug, getAllPosts } from "@/lib/content";
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

  return (
    <article>
      <header className="article-header">
        <p className="article-header__type">
          {post.type === "essay" ? "Essay" : "Field Note"}
        </p>
        <h1 className="article-header__title">{post.title}</h1>
        <p className="article-header__meta">{post.date}</p>
      </header>
      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  );
}
