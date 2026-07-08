import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Speaking",
  description:
    "Talks and workshops on B2B commerce, distribution modernization, applied AI, and enterprise systems.",
};

export default function SpeakingPage() {
  return (
    <div className="shell">
      <section className="speaking-page">
        <span className="eyebrow">Talks &amp; workshops</span>
        <h1>Speaking</h1>
        <p className="lede">
          Practical, engaging sessions on B2B commerce, distribution
          modernization, applied AI, and enterprise systems. The audience is
          involved, not spectating.
        </p>
      </section>

      <section className="about-section">
        <h2>Talks</h2>
        <div className="body">
          <p>
            Conference talks and keynotes grounded in real implementation
            work, not vendor slides. Topics span B2B commerce and
            distribution modernization, enterprise systems and data, applied
            AI, and the teams and talent that make any of it work in
            production.
          </p>
          <p>
            Recent talks have covered why consumer playbooks fail in
            distribution, what separates AI demos from AI in production, and
            how to modernize around a legacy ERP instead of waiting for the
            replatform that never comes.
          </p>
          <p>
            I&apos;ve given talks for B2B Online, MDM, PTDA, and others.
            Referrals on request.
          </p>
        </div>
      </section>

      <section className="about-section">
        <h2>Workshops</h2>
        <div className="body">
          <p>
            Half-day and full-day working sessions for distributors and B2B
            teams: strategic planning, product development, gap analysis,
            architecture reviews, and AI readiness. Built around your
            business, your systems, and your constraints, not a generic
            deck.
          </p>
        </div>
      </section>

      <section className="about-section">
        <h2>Contact</h2>
        <div className="body">
          <p>
            For a talk or workshop, reach out at{" "}
            <a className="link" href="mailto:jason@jcapshaw.com">
              jason@jcapshaw.com
            </a>{" "}
            with a few lines on the audience, context, and timing.
          </p>
          <p>
            Looking for ongoing advisory or embedded architecture work
            instead? That lives on the{" "}
            <Link className="link" href="/advisory">
              advisory page
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
