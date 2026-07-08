import type { Metadata } from "next";
import Link from "next/link";
import { consultingCapabilities, getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies in architecture, applied AI, and product leadership: what was built, why, and what it changed.",
};

const statusLabel: Record<string, string> = {
  shipped: "Shipped",
  wip: "In flight",
  archive: "Archive",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="shell">
      <section className="archive-head">
        <span className="eyebrow">Work</span>
        <h1>Work</h1>
        <p className="lede">
          Architecture, applied AI, and product work for enterprise and B2B teams. Each case study
          describes the business problem, the approach, and what changed, qualitatively when the
          metrics aren&apos;t public. Recurring themes: customer workflows, legacy modernization,
          search and data, AI that augments human decision-making.
        </p>
      </section>

      <ul className="post-list" style={{ marginTop: "12px" }}>
        {projects.map((p, i) => (
          <li key={p.slug}>
            <Link href={`/projects/${p.slug}`} className="project-row">
              <span className="p-idx">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="p-name">{p.title}</p>
                <p className="p-desc">{p.summary}</p>
              </div>
              <span className="p-stack">{p.disciplines.join(" · ")}</span>
              <span className="p-status" data-status={p.status}>
                {statusLabel[p.status] ?? p.status}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <section className="capability-section">
        <div className="capability-head">
          <span className="eyebrow">Consulting practice</span>
          <h2>Advisory and engagement areas</h2>
          <p className="lede">
            Areas of advisory and engagement-level work outside individual case studies.{" "}
            <Link className="link" href="/advisory">
              How I engage →
            </Link>
          </p>
        </div>
        <ul className="capability-grid">
          {consultingCapabilities.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
