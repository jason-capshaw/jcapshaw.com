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
}

const contentDir = path.join(process.cwd(), "src/content");

function getPostsFromDir(dir: string, type: PostType): Post[] {
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
        slug: filename.replace(/\.mdx$/, ""),
        title: data.title || "Untitled",
        excerpt: data.excerpt || "",
        date: data.date || "",
        type,
        published: data.published !== false,
        content,
      };
    });
}

export function getAllPosts(): Post[] {
  const essays = getPostsFromDir("essays", "essay");
  const fieldNotes = getPostsFromDir("field-notes", "field-note");

  return [...essays, ...fieldNotes]
    .filter((p) => p.published)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(slug: string): Post | undefined {
  const allPosts = [
    ...getPostsFromDir("essays", "essay"),
    ...getPostsFromDir("field-notes", "field-note"),
  ];
  return allPosts.find((p) => p.slug === slug);
}
