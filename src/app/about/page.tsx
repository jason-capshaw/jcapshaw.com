import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Jason Capshaw — background, operating principles, and areas of focus.",
};

export default function AboutPage() {
  return (
    <>
      <div className="page-intro">
        <p className="page-intro__eyebrow mono">Background</p>
        <h1 className="page-intro__headline">About</h1>
        <p className="page-intro__subhead">
          I build and write about the systems underneath modern B2B commerce:
          platforms, product data, search, integration, and the decisions that
          shape them.
        </p>
      </div>

      <div className="page-stack">
        <section className="page-section">
          <p className="page-section__lead">
            Most of my work lives in the unglamorous middle of enterprise
            change: the pricing logic, catalog quality, integration seams, and
            operating tradeoffs that determine whether a commerce program
            becomes a capability or a very expensive deck.
          </p>
          <div className="page-section__body">
            <p>
              I have spent most of my career inside B2B distribution and
              industrial commerce, where software has to accommodate negotiated
              pricing, deep assortments, messy ERP data, and organizations that
              cannot stop operating just because a transformation program says
              they should.
            </p>
            <p>
              That perspective shapes both the client work and the writing here.
              I&apos;m interested in technology that survives operational
              reality, not the simplified version that looks good in a vendor
              environment.
            </p>
          </div>
        </section>

        <section className="page-section">
          <p className="page-section__label mono">Focus</p>
          <div className="page-grid">
            <article className="page-grid__item">
              <h2 className="page-grid__title">Commerce architecture</h2>
              <div className="page-grid__body">
                <p>
                  Platform selection, composability, search, and the system
                  boundaries that make B2B complexity manageable.
                </p>
              </div>
            </article>
            <article className="page-grid__item">
              <h2 className="page-grid__title">Product and pricing data</h2>
              <div className="page-grid__body">
                <p>
                  The data discipline behind catalogs, customer-specific
                  pricing, enrichment, and the workflows that keep them usable.
                </p>
              </div>
            </article>
            <article className="page-grid__item">
              <h2 className="page-grid__title">Enterprise systems strategy</h2>
              <div className="page-grid__body">
                <p>
                  ERP boundaries, integration patterns, build-vs-buy tradeoffs,
                  and the organizational realities around long-lived systems.
                </p>
              </div>
            </article>
            <article className="page-grid__item">
              <h2 className="page-grid__title">Applied AI</h2>
              <div className="page-grid__body">
                <p>
                  Practical uses of AI for classification, search, and
                  operational leverage when the data is messy and the stakes are
                  real.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="page-section">
          <p className="page-section__label mono">How I work</p>
          <h2 className="page-section__title">
            I bias toward clarity, operating detail, and decisions that can
            survive contact with the business.
          </h2>
          <div className="page-section__body">
            <p>
              The throughline is straightforward: make the problem legible, make
              the tradeoffs explicit, and do not pretend B2C playbooks map
              cleanly onto distribution. Good architecture is partly technical,
              partly organizational, and mostly about reducing expensive
              ambiguity.
            </p>
          </div>
          <ul className="section-list">
            <li>
              <strong>Architecture over theater:</strong> focus on durable
              operating models, not launch-day optics.
            </li>
            <li>
              <strong>Data before decoration:</strong> better catalogs, pricing,
              and search matter more than polished demos.
            </li>
            <li>
              <strong>Practical AI:</strong> use it where it lowers real
              friction, not where it adds novelty.
            </li>
          </ul>
        </section>

        <section className="page-section">
          <p className="page-section__label mono">Contact</p>
          <div className="page-section__body">
            <p>
              Email is the best path:{" "}
              <a href="mailto:jason@jcapshaw.com">jason@jcapshaw.com</a>.
              I&apos;m also on{" "}
              <a
                href="https://linkedin.com/in/jasoncapshaw"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              .
            </p>
          </div>
          <p className="page-note">
            For speaking and advisory work, the{" "}
            <a href="/speaking">speaking page</a> is the best summary of fit.
          </p>
        </section>
      </div>
    </>
  );
}
