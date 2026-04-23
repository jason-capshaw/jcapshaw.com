import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllTalks, getTalkBySlug } from "@/lib/talks";
import { formatDate } from "@/lib/content";
import { siteConfig } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllTalks().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const t = getTalkBySlug(slug);
  if (!t) return {};
  return {
    title: t.title,
    description: t.abstract,
    openGraph: {
      type: "article",
      title: t.title,
      description: t.abstract,
      url: `${siteConfig.url}/speaking/${t.slug}`,
    },
  };
}

export default async function TalkPage({ params }: PageProps) {
  const { slug } = await params;
  const t = getTalkBySlug(slug);
  if (!t) notFound();

  return (
    <div className="shell">
      <Link href="/speaking" className="article-back">
        ← All talks
      </Link>

      <header className="talk-head">
        <p className="t-when">{formatDate(t.date)}</p>
        <h1>{t.title}</h1>
        <p className="t-venue">{t.venue}</p>
        <p className="t-abs">{t.abstract}</p>
      </header>

      <section className="talk-meta" aria-label="Talk metadata">
        <div className="tm-cell">
          <p className="tm-label">Audience</p>
          <p className="tm-val">{t.audience}</p>
        </div>
        <div className="tm-cell">
          <p className="tm-label">Duration</p>
          <p className="tm-val">{t.duration}</p>
        </div>
        <div className="tm-cell">
          <p className="tm-label">Slides</p>
          <p className={`tm-val${t.slides ? " avail" : ""}`}>
            {t.slides ? "Available" : "—"}
          </p>
        </div>
        <div className="tm-cell">
          <p className="tm-label">Recording</p>
          <p className={`tm-val${t.recording ? " avail" : ""}`}>
            {t.recording ? "Available" : "—"}
          </p>
        </div>
      </section>

      {t.slideTitles && t.slideTitles.length > 0 ? (
        <section className="slide-strip" aria-label="Slide outline">
          {t.slideTitles.map((title, i) => (
            <div key={i} className="slide-tile">
              <span className="st-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="st-label">{title}</span>
            </div>
          ))}
        </section>
      ) : null}

      {t.sections?.map((s) => (
        <section key={s.heading} className="case-section">
          <h2>{s.heading}</h2>
          <div className="body">
            {s.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
