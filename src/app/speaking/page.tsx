import type { Metadata } from "next";
import Link from "next/link";
import { getAllTalks } from "@/lib/talks";
import { formatDateShort } from "@/lib/content";

export const metadata: Metadata = {
  title: "Speaking & Advisory",
  description:
    "Speaking engagements and advisory work on B2B commerce, distribution technology, and enterprise systems.",
};

export default function SpeakingPage() {
  const talks = getAllTalks();

  return (
    <div className="shell">
      <section className="speaking-page">
        <span className="eyebrow">Work together</span>
        <h1>Speaking &amp; Advisory</h1>
        <p className="lede">
          I speak and advise on digital commerce architecture, B2B distribution
          technology, and enterprise systems strategy. The value is practical
          judgment from building real systems, not recycled transformation
          language.
        </p>
      </section>

      <section>
        {talks.map((t) => (
          <Link
            key={t.slug}
            href={`/speaking/${t.slug}`}
            className="talk-card"
            data-preview-title={t.title}
            data-preview-kind="Talk"
          >
            <span className="tc-date">{formatDateShort(t.date)}</span>
            <div>
              <p className="tc-title">{t.title}</p>
              <p className="tc-venue">{t.venue}</p>
              <p className="tc-abs">{t.abstract}</p>
            </div>
            <div className="tc-assets">
              <span className={t.slides ? "avail" : ""}>
                {t.slides ? "Slides" : "— slides"}
              </span>
              <span className={t.recording ? "avail" : ""}>
                {t.recording ? "Recording" : "— recording"}
              </span>
              <span>{t.duration}</span>
            </div>
          </Link>
        ))}
      </section>

      <section className="about-section">
        <h2>Offerings</h2>
        <div className="body">
          <p>
            <strong>Speaking.</strong> Talks for leadership teams, customer
            events, associations, and internal groups that need a grounded
            point of view on B2B commerce, systems strategy, and digital
            execution.
          </p>
          <p>
            <strong>Advisory.</strong> Short, focused advisory work for teams
            making platform, architecture, search, data, or AI decisions in
            distribution and industrial commerce.
          </p>
        </div>
      </section>

      <section className="about-section">
        <h2>Contact</h2>
        <div className="body">
          <p>
            If you&apos;re exploring a talk, workshop, or advisory engagement,
            reach out at{" "}
            <a className="link" href="mailto:jason@jcapshaw.com">
              jason@jcapshaw.com
            </a>{" "}
            with a few lines on the audience, context, and timing.
          </p>
        </div>
      </section>
    </div>
  );
}
