import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Now",
  description: "What Jason Capshaw is working on right now.",
};

export default function NowPage() {
  return (
    <div className="shell">
      <section className="now-head">
        <p className="updated">Last updated · April 2026</p>
        <h1>Now</h1>
        <p className="lede">
          What I&apos;m focused on right now.{" "}
          <a
            className="link"
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
          >
            What is a now page?
          </a>
        </p>
      </section>

      <section className="now-section">
        <h3>At work</h3>
        <div className="body">
          <p>
            Building the boring parts that determine whether digital commerce
            actually works. Right now that means product data architecture,
            search quality, and the integration edges between commerce
            platforms and the systems that still run the business day to day.
          </p>
        </div>
      </section>

      <section className="now-section">
        <h3>In writing</h3>
        <div className="body">
          <p>
            Working through essays on product data economics, enterprise AI
            that has to survive procurement and governance, and the gap
            between demo-friendly software stories and operational reality in
            distribution.
          </p>
        </div>
      </section>

      <section className="now-section">
        <h3>Learning</h3>
        <div className="body">
          <p>
            Spending time on how LLMs can support classification, search, and
            internal knowledge work in large industrial catalogs where the
            data is inconsistent, the vocabulary is domain-specific, and the
            acceptable error rate is low.
          </p>
        </div>
      </section>

      <section className="now-section">
        <h3>Paying attention</h3>
        <div className="body">
          <ul>
            <li>Search relevance and synonym strategy in industrial catalogs</li>
            <li>How teams govern AI outputs inside quote-to-cash workflows</li>
            <li>The cost structure behind enrichment, taxonomy, and cleanup work</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
