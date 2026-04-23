export type ProjectStatus = "live" | "wip" | "archive";

export interface Project {
  slug: string;
  name: string;
  description: string;
  stack: string[];
  status: ProjectStatus;
  year: string;
}

export interface CaseStudyOutcome {
  metric: string;
  label: string;
}

export interface CaseStudySection {
  heading: string;
  body: string[];
}

export interface CaseStudy {
  slug: string;
  client: string;
  meta: string;
  title: string;
  summary: string;
  period: string;
  stack: string[];
  outcomes: CaseStudyOutcome[];
  problem: string[];
  approach: string[];
  reflection: string[];
}

const projects: Project[] = [
  {
    slug: "catalog-rebuild",
    name: "Catalog rebuild for industrial distributor",
    description:
      "Unified supplier feeds, canonical taxonomy, and normalized attributes across 400k+ SKUs.",
    stack: ["Postgres", "Python", "MDM"],
    status: "live",
    year: "2024",
  },
  {
    slug: "pim-to-storefront",
    name: "PIM-to-storefront pipeline",
    description:
      "Replaced nightly batch sync with event-driven propagation; cut publish latency from 18h to 90s.",
    stack: ["Kafka", "TypeScript", "Algolia"],
    status: "live",
    year: "2024",
  },
  {
    slug: "applied-ai-classification",
    name: "Applied-AI product classification",
    description:
      "LLM-assisted classification for unstructured supplier data; human-in-the-loop review queue.",
    stack: ["OpenAI", "Python", "Postgres"],
    status: "wip",
    year: "2025",
  },
  {
    slug: "erp-middleware",
    name: "ERP integration middleware",
    description:
      "Thin integration layer between legacy ERP and downstream systems; idempotent, auditable.",
    stack: ["Node", "SQL Server", "REST"],
    status: "archive",
    year: "2022",
  },
];

const caseStudies: CaseStudy[] = [
  {
    slug: "catalog-rebuild",
    client: "Industrial distributor · $400M",
    meta: "Catalog · Data · Search",
    title: "Rebuilding a catalog that could actually be searched",
    summary:
      "Moved from seven fragmented supplier feeds to a single canonical catalog — without freezing the business.",
    period: "2023 — 2024 · 14 months",
    stack: ["Postgres", "Python", "Algolia", "Custom MDM"],
    outcomes: [
      { metric: "420k", label: "SKUs normalized" },
      { metric: "7→1", label: "Feed pipelines" },
      { metric: "18h→90s", label: "Publish latency" },
      { metric: "+38%", label: "Search conversion" },
    ],
    problem: [
      "Seven supplier feeds with incompatible taxonomies, no canonical attributes, and no single source of truth for product identity.",
      "Merch, digital, and operations each maintained their own spreadsheets; the storefront was a lagging index of whoever last updated what.",
    ],
    approach: [
      "Started with identity — made SKU canonicalization a platform primitive, not a data-cleanup project.",
      "Rolled changes department-by-department rather than a big-bang cutover, so each team could validate against their own workflow.",
      "Built a review queue and audit trail from day one — the data story only holds if people can trust it.",
    ],
    reflection: [
      "I'd invest earlier in supplier-facing tooling. By the time the canonical model stabilized, we were still chasing upstream quality issues we could have caught at ingest.",
    ],
  },
  {
    slug: "pim-to-storefront",
    client: "Multi-channel distributor",
    meta: "Pipeline · Platform",
    title: "From 18-hour batch to 90-second publish",
    summary:
      "Replaced a brittle nightly ETL with event-driven propagation across PIM, search, and storefront.",
    period: "2024 · 6 months",
    stack: ["Kafka", "TypeScript", "Algolia", "Commercetools"],
    outcomes: [
      { metric: "18h→90s", label: "Publish latency" },
      { metric: "99.97%", label: "Pipeline success rate" },
      { metric: "0", label: "Weekend cutover incidents" },
    ],
    problem: [
      "The nightly batch had become a business constraint — promos couldn't ship same-day, price updates lagged a full day, and operations scheduled around it.",
    ],
    approach: [
      "Treated the pipeline as a product: SLOs, observability, and a rollback path before we started replacing the legs.",
      "Kept the batch path running for a full cycle in parallel and diffed the two outputs daily — cutover happened only after a week of clean diffs.",
    ],
    reflection: [
      "The hard part wasn't the pipe — it was convincing every downstream consumer that the new contract was actually stable.",
    ],
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getAllCaseStudies(): CaseStudy[] {
  return caseStudies;
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
