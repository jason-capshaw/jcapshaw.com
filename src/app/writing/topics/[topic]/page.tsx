import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  topics,
  getTopicBySlug,
  getPostsByTopic,
  formatDateShort,
} from "@/lib/content";

interface PageProps {
  params: Promise<{ topic: string }>;
}

export async function generateStaticParams() {
  return topics.map((t) => ({ topic: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { topic: topicSlug } = await params;
  const topic = getTopicBySlug(topicSlug);
  if (!topic) return {};
  return {
    title: `${topic.label} · Writing`,
    description: topic.description,
  };
}

export default async function TopicPage({ params }: PageProps) {
  const { topic: topicSlug } = await params;
  const topic = getTopicBySlug(topicSlug);
  if (!topic) notFound();

  const posts = getPostsByTopic(topic.slug);

  return (
    <div className="shell">
      <Link href="/writing" className="article-back">
        ← All writing
      </Link>
      <section className="archive-head">
        <span className="eyebrow">Topic</span>
        <h1>{topic.label}</h1>
        <p className="lede">{topic.description}</p>
      </section>

      {posts.length === 0 ? (
        <p className="empty-state">
          Nothing published under this topic yet. It&apos;s on the desk.
        </p>
      ) : (
        <ul className="post-list">
          {posts.map((post) => (
            <li
              key={post.slug}
              className="post-row"
              data-preview-title={post.title}
              data-preview-kind={post.type === "essay" ? "Essay" : "Field note"}
            >
              <div>
                <h2 className="pr-title">
                  <Link href={`/writing/${post.slug}`}>{post.title}</Link>
                </h2>
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
      )}
    </div>
  );
}
