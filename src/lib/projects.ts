import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type ProjectStatus = "shipped" | "wip" | "archive";

export interface MetricOutcome {
  kind: "metric";
  metric: string;
  label: string;
}

export interface QualitativeOutcome {
  kind: "qualitative";
  text: string;
}

export type Outcome = MetricOutcome | QualitativeOutcome;

export interface CaseStudy {
  slug: string;
  title: string;
  summary: string;
  role: string;
  disciplines: string[];
  period: string;
  client?: string;
  stack: string[];
  outcomes: Outcome[];
  relatedSkills: string[];
  status: ProjectStatus;
  order: number;
  published: boolean;
  content: string;
}

const projectsDir = path.join(process.cwd(), "src/content/projects");

function normalizeOutcomes(raw: unknown): Outcome[] {
  if (!Array.isArray(raw)) return [];
  const out: Outcome[] = [];
  for (const o of raw) {
    if (!o || typeof o !== "object") continue;
    const rec = o as Record<string, unknown>;
    if (rec.kind === "metric" && typeof rec.metric === "string" && typeof rec.label === "string") {
      out.push({ kind: "metric", metric: rec.metric, label: rec.label });
    } else if (rec.kind === "qualitative" && typeof rec.text === "string") {
      out.push({ kind: "qualitative", text: rec.text });
    }
  }
  return out;
}

function asStringArray(raw: unknown): string[] {
  return Array.isArray(raw) ? raw.filter((v): v is string => typeof v === "string") : [];
}

function readAll(): CaseStudy[] {
  if (!fs.existsSync(projectsDir)) return [];
  return fs
    .readdirSync(projectsDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const filePath = path.join(projectsDir, filename);
      const fileContents = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContents);
      const status: ProjectStatus =
        data.status === "wip" || data.status === "archive" ? data.status : "shipped";
      return {
        slug: filename.replace(/\.mdx$/, ""),
        title: typeof data.title === "string" ? data.title : "Untitled",
        summary: typeof data.summary === "string" ? data.summary : "",
        role: typeof data.role === "string" ? data.role : "",
        disciplines: asStringArray(data.disciplines),
        period: typeof data.period === "string" ? data.period : "",
        client: typeof data.client === "string" ? data.client : undefined,
        stack: asStringArray(data.stack),
        outcomes: normalizeOutcomes(data.outcomes),
        relatedSkills: asStringArray(data.relatedSkills),
        status,
        order: typeof data.order === "number" ? data.order : 999,
        published: data.published !== false,
        content,
      };
    });
}

export function getAllProjects(): CaseStudy[] {
  return readAll()
    .filter((p) => p.published)
    .sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
}

export function getProjectBySlug(slug: string): CaseStudy | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export const consultingCapabilities: string[] = [
  "AI strategy",
  "Enterprise architecture",
  "Digital transformation",
  "Product management",
  "Customer experience",
  "Commerce strategy",
  "Enterprise search",
  "Data strategy",
  "Systems integration",
  "Technical due diligence",
  "Vendor evaluation",
  "Competitive analysis",
  "Business process optimization",
  "API strategy",
  "Platform modernization",
];
