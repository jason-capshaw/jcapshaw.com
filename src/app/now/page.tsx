import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Now",
  description: "What Jason Capshaw is working on right now.",
};

export default function NowPage() {
  return (
    <>
      <div className="page-intro">
        <p className="page-intro__eyebrow mono">Current</p>
        <h1 className="page-intro__headline">Now</h1>
        <p className="page-intro__subhead">
          What I&apos;m focused on right now.{" "}
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
          >
            What is a now page?
          </a>
        </p>
      </div>

      <div className="page-stack">
        <section className="page-section">
          <p className="page-section__label mono">At work</p>
          <h2 className="page-section__title">
            Building the boring parts that determine whether digital commerce
            actually works.
          </h2>
          <div className="page-section__body">
            <p>
              Right now that means product data architecture, search quality,
              and the integration edges between commerce platforms and the
              systems that still run the business day to day.
            </p>
          </div>
        </section>

        <section className="page-section">
          <p className="page-section__label mono">In writing</p>
          <div className="page-section__body">
            <p>
              I&apos;m working through essays on product data economics,
              enterprise AI that has to survive procurement and governance, and
              the gap between demo-friendly software stories and operational
              reality in distribution.
            </p>
          </div>
        </section>

        <section className="page-section">
          <p className="page-section__label mono">Learning</p>
          <div className="page-section__body">
            <p>
              I&apos;m spending time on how LLMs can support classification,
              search, and internal knowledge work in large industrial catalogs
              where the data is inconsistent, the vocabulary is domain-specific,
              and the acceptable error rate is low.
            </p>
          </div>
        </section>

        <section className="page-section">
          <p className="page-section__label mono">Paying attention to</p>
          <ul className="section-list">
            <li>Search relevance and synonym strategy in industrial catalogs</li>
            <li>How teams govern AI outputs inside quote-to-cash workflows</li>
            <li>The cost structure behind enrichment, taxonomy, and cleanup work</li>
          </ul>
          <p className="now-updated">Last updated: April 2026</p>
        </section>
      </div>
    </>
  );
}
