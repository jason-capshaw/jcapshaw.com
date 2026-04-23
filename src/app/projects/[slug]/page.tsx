import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllCaseStudies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudyBySlug(slug);
  if (!c) return {};
  return {
    title: c.title,
    description: c.summary,
    openGraph: {
      type: "article",
      title: c.title,
      description: c.summary,
      url: `${siteConfig.url}/projects/${c.slug}`,
    },
  };
}

export default async function CasePage({ params }: PageProps) {
  const { slug } = await params;
  const c = getCaseStudyBySlug(slug);
  if (!c) notFound();

  return (
    <div className="shell">
      <Link href="/projects" className="article-back">
        ← All work
      </Link>

      <header className="case-head">
        <p className="c-client">{c.client} · {c.meta}</p>
        <h1>{c.title}</h1>
        <p className="summary">{c.summary}</p>
      </header>

      {c.outcomes.length > 0 ? (
        <section className="case-outcomes" aria-label="Outcomes">
          {c.outcomes.map((o) => (
            <div key={o.label} className="o-cell">
              <p className="o-metric">{o.metric}</p>
              <p className="o-label">{o.label}</p>
            </div>
          ))}
        </section>
      ) : null}

      <section className="case-section">
        <h2>Period</h2>
        <div className="body">
          <p>{c.period}</p>
        </div>
      </section>

      <section className="case-section">
        <h2>Stack</h2>
        <div className="body">
          <p className="stack">{c.stack.join(" · ")}</p>
        </div>
      </section>

      <section className="case-section">
        <h2>Problem</h2>
        <div className="body">
          {c.problem.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      <section className="case-section">
        <h2>Approach</h2>
        <div className="body">
          {c.approach.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {c.reflection.length > 0 ? (
        <section className="case-section">
          <h2>Hindsight</h2>
          <div className="body">
            {c.reflection.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
