import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speaking & Advisory",
  description:
    "Speaking, workshops, and advisory work on B2B commerce, AI, talent, and software.",
};

export default function SpeakingPage() {
  return (
    <div className="shell">
      <section className="speaking-page">
        <span className="eyebrow">Work together</span>
        <h1>Speaking &amp; Advisory</h1>
        <p className="lede">
          Speaking, workshops, and short advisory engagements on B2B
          commerce, AI, talent, and software.
        </p>
      </section>

      <section className="about-section">
        <h2>Speaking</h2>
        <div className="body">
          <p>
            I run practical, engaging sessions where the audience is involved
            rather than spectating. Topics span B2B commerce, AI, talent, and
            software.
          </p>
          <p>
            Half-day and full-day workshops for distributors, focused on
            strategic planning, product development, gap analysis, and
            related work.
          </p>
          <p>
            I&apos;ve given talks for B2B Online, MDM, PTDA, and others.
            Referrals on request.
          </p>
        </div>
      </section>

      <section className="about-section">
        <h2>Advisory</h2>
        <div className="body">
          <p>
            Short, focused advisory work for teams making platform,
            architecture, data, search, or AI decisions in distribution and
            industrial commerce.
          </p>
        </div>
      </section>

      <section className="about-section">
        <h2>Contact</h2>
        <div className="body">
          <p>
            For a talk, workshop, or advisory engagement, reach out at{" "}
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
