import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { mdxComponents } from "@/components/mdx";
import { siteConfig } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const p = getProjectBySlug(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    openGraph: {
      type: "article",
      title: p.title,
      description: p.summary,
      url: `${siteConfig.url}/projects/${p.slug}`,
    },
  };
}

export default async function CasePage({ params }: PageProps) {
  const { slug } = await params;
  const p = getProjectBySlug(slug);
  if (!p) notFound();

  const metricOutcomes = p.outcomes.filter((o) => o.kind === "metric");
  const qualitativeOutcomes = p.outcomes.filter((o) => o.kind === "qualitative");

  const headMeta = [p.client, p.period].filter(Boolean).join(" · ");

  return (
    <div className="shell">
      <Link href="/projects" className="article-back">
        ← All work
      </Link>

      <header className="case-head">
        {headMeta ? <p className="c-client">{headMeta}</p> : null}
        <h1>{p.title}</h1>
        {p.summary ? <p className="summary">{p.summary}</p> : null}
      </header>

      {metricOutcomes.length > 0 ? (
        <section className="case-outcomes" aria-label="Outcomes">
          {metricOutcomes.map((o) => (
            <div key={o.label} className="o-cell">
              <p className="o-metric">{o.metric}</p>
              <p className="o-label">{o.label}</p>
            </div>
          ))}
        </section>
      ) : null}

      {qualitativeOutcomes.length > 0 ? (
        <section className="case-outcomes-q" aria-label="Qualitative outcomes">
          <p className="o-q-head">Impact</p>
          <ul>
            {qualitativeOutcomes.map((o, i) => (
              <li key={i}>{o.text}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="prose case-prose">
        <MDXRemote source={p.content} components={mdxComponents} />
      </div>

      <section className="case-meta" aria-label="Engagement detail">
        <dl>
          {p.role ? (
            <div className="cm-row">
              <dt>Role</dt>
              <dd>{p.role}</dd>
            </div>
          ) : null}
          {p.disciplines.length > 0 ? (
            <div className="cm-row">
              <dt>Disciplines</dt>
              <dd className="cm-chips">
                {p.disciplines.map((d) => (
                  <span key={d} className="cm-chip">
                    {d}
                  </span>
                ))}
              </dd>
            </div>
          ) : null}
          {p.stack.length > 0 ? (
            <div className="cm-row">
              <dt>Stack</dt>
              <dd className="cm-chips">
                {p.stack.map((s) => (
                  <span key={s} className="cm-chip">
                    {s}
                  </span>
                ))}
              </dd>
            </div>
          ) : null}
          {p.relatedSkills.length > 0 ? (
            <div className="cm-row">
              <dt>Related skills</dt>
              <dd className="cm-chips">
                {p.relatedSkills.map((s) => (
                  <span key={s} className="cm-chip">
                    {s}
                  </span>
                ))}
              </dd>
            </div>
          ) : null}
        </dl>
      </section>
    </div>
  );
}
