import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Jason Capshaw: enterprise architect and digital strategy leader for B2B distribution. Background, operating principles, and areas of focus.",
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
          <span className="eyebrow">About</span>
          <h1>
            I help B2B companies connect business strategy to the systems
            that actually run the business.
          </h1>
          <p>
            I&apos;m an enterprise architect and digital strategy leader
            focused on B2B distribution. The work sits at the intersection
            of commerce, enterprise systems, data, APIs, and applied AI, and
            it moves between altitudes: framing the problem with executives,
            mapping the real workflow with operations, engaging technical
            teams on the architecture, and staying close enough to
            implementation that the strategy becomes usable.
          </p>
          <p>
            Distribution is where I&apos;ve spent most of my career because
            it has the problems I find worth solving: contract pricing, deep
            assortments, ERPs older than the internet, and organizations
            that cannot stop operating just because a transformation program
            says they should. Hard problems at scale, where getting the
            foundation right is the whole job.
          </p>
          <p>
            Before any of this, I spent about a decade running a private
            investigations firm: computer forensics, penetration testing,
            live casework. I started building systems for clients in
            distribution and never left.
          </p>
        </div>
      </section>

      <section className="about-section">
        <h2>Focus</h2>
        <div className="body">
          <p>
            <strong>Commerce architecture.</strong> Platform decisions,
            composability, search, and the system boundaries that make B2B
            complexity manageable.
          </p>
          <p>
            <strong>Enterprise systems strategy.</strong> ERP boundaries,
            integration patterns, build versus buy, and the organizational
            realities around long-lived systems.
          </p>
          <p>
            <strong>APIs and integration.</strong> API strategy and
            governance with product thinking behind them, so integration
            programs end up usable rather than just connected.
          </p>
          <p>
            <strong>Product and pricing data.</strong> The data discipline
            behind catalogs, customer-specific pricing, enrichment, and the
            workflows that keep them usable.
          </p>
          <p>
            <strong>Applied AI.</strong> Practical uses of AI for search,
            classification, and operational leverage, grounded in real
            business processes rather than demos.
          </p>
        </div>
      </section>

      <section className="about-section">
        <h2>How I work</h2>
        <div className="body">
          <p>
            I bias toward clarity, operating detail, and decisions that
            survive contact with the business. Make the problem legible,
            make the tradeoffs explicit, and do not pretend consumer
            playbooks map onto distribution.
          </p>
          <ul className="section-list">
            <li>
              <strong>Architecture is a business tool.</strong> Good
              architecture clarifies ownership, reduces unnecessary
              complexity, and gives everyone a shared map of how systems,
              data, and people connect.
            </li>
            <li>
              <strong>Embedded, not detached.</strong> I work best close to
              the messy parts: the workarounds, the edge cases, the places
              where a clean diagram does not match what actually happens.
            </li>
            <li>
              <strong>Platform-aware, platform-independent.</strong> The
              tool is not the strategy. Packaged software earns its place on
              commodity capability; where the business actually
              differentiates, building to suit usually beats fighting a
              platform that was never designed for it.
            </li>
            <li>
              <strong>Practical over impressive.</strong> Transformation
              fails on translation, not ambition. The job is turning broad
              goals into executable increments with clear owners.
            </li>
            <li>
              <strong>Talent is the throughline.</strong> Strong people who
              build and operate well are what make the next decade of
              automation safe in production.
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
            For advisory and embedded architecture work, the{" "}
            <Link className="link" href="/advisory">
              advisory page
            </Link>{" "}
            is the best summary of fit. For talks and workshops, see{" "}
            <Link className="link" href="/speaking">
              speaking
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
