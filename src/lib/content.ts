import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostType = "essay" | "field-note";

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  type: PostType;
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

      return {
        sourcePath: path.join(dir, filename),
        post: {
          slug: filename.replace(/\.mdx$/, ""),
          title: data.title || "Untitled",
          excerpt: data.excerpt || "",
          date: data.date || "",
          type,
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
