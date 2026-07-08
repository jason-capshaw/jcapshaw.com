import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostType = "essay" | "field-note";

export interface Topic {
  slug: string;
  label: string;
  description: string;
}

// Canonical topic taxonomy. Post frontmatter `tags:` entries must use these slugs.
export const topics: Topic[] = [
  {
    slug: "commerce-architecture",
    label: "Commerce architecture",
    description:
      "Platform decisions, composability, search, and the system boundaries that make B2B complexity manageable.",
  },
  {
    slug: "b2b-distribution",
    label: "B2B distribution",
    description:
      "How distributors actually operate: contract pricing, branch operations, quote workflows, and the channel realities behind industrial commerce.",
  },
  {
    slug: "enterprise-systems",
    label: "Enterprise systems",
    description:
      "ERP boundaries, integration patterns, build versus buy, and the organizational realities around long-lived systems.",
  },
  {
    slug: "applied-ai",
    label: "Applied AI",
    description:
      "Practical uses of AI for classification, search, agentic ordering, and operational leverage when the data is messy and the stakes are real.",
  },
  {
    slug: "apis-integration",
    label: "APIs & integration",
    description:
      "API strategy, governance, and the product thinking that makes integration programs usable rather than just connected.",
  },
  {
    slug: "product-data",
    label: "Product & pricing data",
    description:
      "The data discipline behind catalogs, customer-specific pricing, enrichment, and the workflows that keep them usable.",
  },
];

const topicSlugs = new Set(topics.map((t) => t.slug));

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  type: PostType;
  tags: string[];
  published: boolean;
  content: string;
  readingTime: string;
}

const contentDir = path.join(process.cwd(), "src/content");

interface PostRecord {
  post: Post;
  sourcePath: string;
}

function estimateReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 230));
  return `${minutes} min read`;
}

function normalizeTags(raw: unknown, sourcePath: string): string[] {
  if (!Array.isArray(raw)) return [];
  const tags = raw.filter((t): t is string => typeof t === "string");
  for (const tag of tags) {
    if (!topicSlugs.has(tag)) {
      throw new Error(
        `Unknown tag "${tag}" in "${sourcePath}". Valid topics: ${topics
          .map((t) => t.slug)
          .join(", ")}.`,
      );
    }
  }
  return tags;
}

function getPostsFromDir(dir: string, type: PostType): PostRecord[] {
  const fullPath = path.join(contentDir, dir);
  if (!fs.existsSync(fullPath)) return [];

  return fs
    .readdirSync(fullPath)
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const filePath = path.join(fullPath, filename);
      const fileContents = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContents);
      const sourcePath = path.join(dir, filename);

      return {
        sourcePath,
        post: {
          slug: filename.replace(/\.mdx$/, ""),
          title: data.title || "Untitled",
          excerpt: data.excerpt || "",
          date: data.date || "",
          type,
          tags: normalizeTags(data.tags, sourcePath),
          published: data.published !== false,
          content,
          readingTime: estimateReadingTime(content),
        },
      };
    });
}

function getSortedPosts(posts: Post[]): Post[] {
  return posts.sort((a, b) => {
    const aTime = Date.parse(a.date);
    const bTime = Date.parse(b.date);
    const safeATime = Number.isNaN(aTime) ? 0 : aTime;
    const safeBTime = Number.isNaN(bTime) ? 0 : bTime;

    if (safeATime !== safeBTime) {
      return safeBTime - safeATime;
    }

    return a.slug.localeCompare(b.slug);
  });
}

function getAllPostRecords(): PostRecord[] {
  const records = [
    ...getPostsFromDir("essays", "essay"),
    ...getPostsFromDir("field-notes", "field-note"),
  ];
  const slugSources = new Map<string, string>();

  for (const record of records) {
    const existingSource = slugSources.get(record.post.slug);

    if (existingSource) {
      throw new Error(
        `Duplicate post slug "${record.post.slug}" found in "${existingSource}" and "${record.sourcePath}".`,
      );
    }

    slugSources.set(record.post.slug, record.sourcePath);
  }

  return records;
}

export function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateShort(dateStr: string): string {
  const [year, month] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

export function getAllPosts(): Post[] {
  const posts = getAllPostRecords().map((record) => record.post);
  return getSortedPosts(posts.filter((post) => post.published));
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}

export function getPostsByTopic(topicSlug: string): Post[] {
  return getAllPosts().filter((post) => post.tags.includes(topicSlug));
}

/** Topics that have at least one published post, in taxonomy order. */
export function getTopicsInUse(): Topic[] {
  const used = new Set(getAllPosts().flatMap((post) => post.tags));
  return topics.filter((t) => used.has(t.slug));
}
