import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Jason Capshaw — background, operating principles, and areas of focus.",
};

export default function AboutPage() {
  return (
    <div className="shell">
      <section className="about-grid">
        <div className="about-portrait" aria-hidden="true" />
        <div className="about-body">
          <span className="eyebrow">Background</span>
          <h1>
            I build and write about the systems underneath modern B2B commerce.
          </h1>
          <p>
            Most of my work lives in the unglamorous middle of enterprise
            change: the pricing logic, catalog quality, integration seams, and
            operating tradeoffs that determine whether a commerce program
            becomes a capability or a very expensive deck.
          </p>
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

      <section className="about-section">
        <h2>Focus</h2>
        <div className="body">
          <p>
            <strong>Commerce architecture.</strong> Platform selection,
            composability, search, and the system boundaries that make B2B
            complexity manageable.
          </p>
          <p>
            <strong>Product &amp; pricing data.</strong> The data discipline
            behind catalogs, customer-specific pricing, enrichment, and the
            workflows that keep them usable.
          </p>
          <p>
            <strong>Enterprise systems strategy.</strong> ERP boundaries,
            integration patterns, build-vs-buy tradeoffs, and the
            organizational realities around long-lived systems.
          </p>
          <p>
            <strong>Applied AI.</strong> Practical uses of AI for
            classification, search, and operational leverage when the data is
            messy and the stakes are real.
          </p>
        </div>
      </section>

      <section className="about-section">
        <h2>How I work</h2>
        <div className="body">
          <p>
            I bias toward clarity, operating detail, and decisions that can
            survive contact with the business. The throughline is
            straightforward: make the problem legible, make the tradeoffs
            explicit, and do not pretend B2C playbooks map cleanly onto
            distribution.
          </p>
          <ul className="section-list">
            <li>
              <strong>Architecture over theater.</strong> Durable operating
              models, not launch-day optics.
            </li>
            <li>
              <strong>Data before decoration.</strong> Better catalogs,
              pricing, and search matter more than polished demos.
            </li>
            <li>
              <strong>Practical AI.</strong> Use it where it lowers real
              friction, not where it adds novelty.
            </li>
          </ul>
        </div>
      </section>

      <section className="about-section">
        <h2>Contact</h2>
        <div className="body">
          <p>
            Email is the best path:{" "}
            <a className="link" href="mailto:jason@jcapshaw.com">
              jason@jcapshaw.com
            </a>
            . I&apos;m also on{" "}
            <a
              className="link"
              href="https://linkedin.com/in/jasoncapshaw"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            .
          </p>
          <p>
            For speaking and advisory work, the{" "}
            <Link className="link" href="/speaking">
              speaking page
            </Link>{" "}
            is the best summary of fit.
          </p>
        </div>
      </section>
    </div>
  );
}
