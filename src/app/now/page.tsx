import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Now",
  description: "What Jason Capshaw is working on right now.",
};

export default function NowPage() {
  return (
    <>
      <div className="page-intro">
        <h1 className="page-intro__headline">Now</h1>
        <p className="page-intro__subhead">
          What I&apos;m focused on right now.
          Updated periodically.{" "}
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
          >
            What is a &quot;now&quot; page?
          </a>
        </p>
      </div>

      <div className="about-content">
        <h2>Work</h2>
        <p>
          Building digital commerce infrastructure for B2B distribution.
          Deep in product data architecture, search, and platform integration
          work.
        </p>

        <h2>Writing</h2>
        <p>
          Working on essays about the real cost of bad product data in
          distribution, and why most AI demos fail when they hit enterprise
          procurement workflows.
        </p>

        <h2>Learning</h2>
        <p>
          Exploring how LLMs can be practically applied to industrial product
          classification and search — not the demo version, the version that
          handles 500,000 SKUs with inconsistent vendor data.
        </p>

        <p style={{ color: "var(--color-text-tertiary)", fontSize: "0.85rem", marginTop: "var(--spacing-2xl)" }}>
          Last updated: March 2026
        </p>
      </div>
    </>
  );
}
