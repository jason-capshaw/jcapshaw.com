import type { Metadata } from "next";
import Link from "next/link";
import { getAllProjects, getAllCaseStudies } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Projects and case studies — what I've built and shipped in industrial distribution, commerce architecture, and applied AI.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  const cases = getAllCaseStudies();
  const caseSlugs = new Set(cases.map((c) => c.slug));

  const statusLabel: Record<string, string> = {
    live: "Live",
    wip: "In flight",
    archive: "Archive",
  };

  return (
    <div className="shell">
      <section className="archive-head">
        <span className="eyebrow">Work</span>
        <h1>Projects</h1>
        <p className="lede">
          A running index of work — shipped platforms, in-flight rebuilds, and
          things I&apos;ve parked. Case studies are linked where the client
          relationship allows it.
        </p>
      </section>

      <ul className="post-list" style={{ marginTop: "12px" }}>
        {projects.map((p, i) => {
          const hasCase = caseSlugs.has(p.slug);
          const Wrap = ({ children }: { children: React.ReactNode }) =>
            hasCase ? (
              <Link href={`/projects/${p.slug}`} className="project-row">
                {children}
              </Link>
            ) : (
              <div className="project-row">{children}</div>
            );
          return (
            <li key={p.slug}>
              <Wrap>
                <span className="p-idx">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="p-name">{p.name}</p>
                  <p className="p-desc">{p.description}</p>
                </div>
                <span className="p-stack">{p.stack.join(" · ")}</span>
                <span className="p-status" data-status={p.status}>
                  {statusLabel[p.status] ?? p.status}
                </span>
              </Wrap>
            </li>
          );
        })}
      </ul>

      {cases.length > 0 ? (
        <section className="section">
          <div className="section-head">
            <h3>Case studies</h3>
          </div>
          <ul className="post-list">
            {cases.map((c) => (
              <li key={c.slug} className="post-row">
                <div>
                  <h2 className="pr-title">
                    <Link href={`/projects/${c.slug}`}>{c.title}</Link>
                  </h2>
                  <p className="pr-excerpt">{c.summary}</p>
                </div>
                <div className="pr-meta">
                  <span className="pr-tag">Case</span>
                  <span>{c.client}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
