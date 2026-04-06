import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speaking & Advisory",
  description:
    "Speaking engagements and advisory work on B2B commerce, distribution technology, and digital transformation.",
};

export default function SpeakingPage() {
  return (
    <>
      <div className="page-intro">
        <p className="page-intro__eyebrow mono">Work Together</p>
        <h1 className="page-intro__headline">Speaking &amp; Advisory</h1>
        <p className="page-intro__subhead">
          I speak and advise on digital commerce architecture, B2B distribution
          technology, and enterprise systems strategy. The value is practical
          judgment from building real systems, not recycled transformation
          language.
        </p>
      </div>

      <div className="page-stack">
        <section className="page-section">
          <p className="page-section__label mono">Offerings</p>
          <div className="page-grid">
            <article className="page-grid__item">
              <h2 className="page-grid__title">Speaking</h2>
              <div className="page-grid__body">
                <p>
                  Talks for leadership teams, customer events, associations, and
                  internal groups that need a grounded point of view on B2B
                  commerce, systems strategy, and digital execution.
                </p>
              </div>
            </article>
            <article className="page-grid__item">
              <h2 className="page-grid__title">Advisory</h2>
              <div className="page-grid__body">
                <p>
                  Short, focused advisory work for teams making platform,
                  architecture, search, data, or AI decisions in distribution
                  and industrial commerce.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="page-section">
          <p className="page-section__label mono">Common topics</p>
          <ul className="section-list">
            <li>
              <strong>B2B commerce architecture:</strong> choosing the right
              level of platform complexity for catalog, pricing, and account
              requirements.
            </li>
            <li>
              <strong>Product data as infrastructure:</strong> why data quality,
              enrichment, and governance determine digital outcomes.
            </li>
            <li>
              <strong>Search and discovery:</strong> designing experiences for
              industrial catalogs where language, taxonomy, and fitment are all
              hard.
            </li>
            <li>
              <strong>Applied AI in operations:</strong> where AI helps in
              classification, content, search, and internal workflows without
              becoming a side show.
            </li>
            <li>
              <strong>Enterprise systems strategy:</strong> navigating ERP
              boundaries, integration, and build-vs-buy decisions without
              magical thinking.
            </li>
          </ul>
        </section>

        <section className="page-section">
          <p className="page-section__label mono">Best fit</p>
          <h2 className="page-section__title">
            The strongest fit is an audience that wants operationally honest
            insight, not generic digital optimism.
          </h2>
          <div className="page-section__body">
            <p>
              That usually means commerce leaders, product and technology teams,
              distribution operators, and executive groups who need clearer
              judgment on what to modernize, what to sequence, and what not to
              overcomplicate.
            </p>
          </div>
        </section>

        <section className="page-section">
          <p className="page-section__label mono">Contact</p>
          <div className="page-section__body">
            <p>
              If you&apos;re exploring a talk, workshop, or advisory
              engagement, reach out at{" "}
              <a href="mailto:jason@jcapshaw.com">jason@jcapshaw.com</a> with a
              few lines on the audience, context, and timing.
            </p>
          </div>
          <p className="page-note">
            I&apos;m most useful when the topic has real operational stakes and
            the room wants specificity.
          </p>
        </section>
      </div>
    </>
  );
}
