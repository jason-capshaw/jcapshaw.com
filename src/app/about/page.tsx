import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Jason Capshaw: background, operating principles, and areas of focus.",
};

export default function AboutPage() {
  return (
    <div className="shell">
      <section className="about-grid">
        <div className="about-portrait">
          <Image
            src="/portrait.jpg"
            alt="Jason Capshaw"
            width={400}
            height={400}
            priority
          />
        </div>
        <div className="about-body">
          <span className="eyebrow">Background</span>
          <h1>
            I build and write about the systems underneath modern B2B commerce.
          </h1>
          <p>
            Before commerce, I spent about a decade running an investigations
            business in the private sector, doing computer forensics,
            penetration testing, and live investigative work. I started
            building things for clients in distribution and never really
            left.
          </p>
          <p>
            B2C was a known problem with known tools and never held my
            attention. B2B distribution and industrial commerce gave me the
            opposite: messy contract pricing, deep assortments, ERPs older
            than the internet, organizations that cannot stop operating just
            because a transformation program says they should. Hard problems
            at scale, where getting the foundation right is the whole job.
          </p>
          <p>
            Most enterprises in this space are still trying to make
            multi-million-dollar packaged software fit a business it was
            never designed for. I think the move, for the parts of the
            business that actually differentiate, is to stop buying and
            start building. That position got stronger when agents arrived,
            not weaker. The talent that builds and operates well is what
            makes the next decade safe in production.
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
            <strong>Product and pricing data.</strong> The data discipline
            behind catalogs, customer-specific pricing, enrichment, and the
            workflows that keep them usable.
          </p>
          <p>
            <strong>Enterprise systems strategy.</strong> ERP boundaries,
            integration patterns, build versus buy, and the organizational
            realities around long-lived systems.
          </p>
          <p>
            <strong>Applied AI.</strong> Practical uses of AI for
            classification, search, agentic ordering, and operational
            leverage when the data is messy and the stakes are real.
          </p>
        </div>
      </section>

      <section className="about-section">
        <h2>How I work</h2>
        <div className="body">
          <p>
            I bias toward clarity, operating detail, and decisions that
            survive contact with the business. Make the problem legible,
            make the tradeoffs explicit, do not pretend B2C playbooks map
            onto distribution.
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
              <strong>Build to suit where it differentiates.</strong>{" "}
              Packaged software is fine for commodity. For the parts of the
              business that actually differentiate, custom built to suit
              beats fighting a platform that was never designed for
              distribution.
            </li>
            <li>
              <strong>Talent is the throughline.</strong> Strong people are
              what makes the next decade of automation safe in production.
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
