import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Advisory",
  description:
    "Advisory and embedded architecture work for B2B distributors: commerce, ERP integration, APIs, product data, and applied AI.",
};

export default function AdvisoryPage() {
  return (
    <div className="shell">
      <section className="speaking-page">
        <span className="eyebrow">Work together</span>
        <h1>Advisory</h1>
        <p className="lede">
          I help distributors and B2B companies modernize commerce, data,
          APIs, and operations without losing touch with how the business
          actually works.
        </p>
      </section>

      <section className="about-section">
        <h2>What this looks like</h2>
        <div className="body">
          <p>
            The work is usually some blend of enterprise architecture,
            solution design, and technical ownership for initiatives that
            cross systems, teams, and vendors. I sit with executives to frame
            the problem, work with operations to map the real workflow, and
            engage technical teams on the architecture, then stay close
            enough to implementation that the strategy becomes usable.
          </p>
          <p>Engagements tend to take one of three shapes:</p>
          <ul className="section-list">
            <li>
              <strong>Embedded architecture leadership.</strong> Fractional,
              ongoing work as the technical owner for a modernization
              program, whether that centers on commerce, enterprise systems,
              data, or the operations around them.
            </li>
            <li>
              <strong>Focused advisory.</strong> Short engagements for teams
              making a platform, architecture, data, search, or AI decision
              and needing a defensible answer, not a vendor demo tour.
            </li>
            <li>
              <strong>Discovery and workshops.</strong> Half-day to multi-day
              sessions that turn an ambiguous initiative into a sequence of
              decisions, designs, and delivery paths real teams can act on.
            </li>
          </ul>
        </div>
      </section>

      <section className="about-section">
        <h2>When to bring me in</h2>
        <div className="body">
          <ul className="section-list">
            <li>
              The ambition is clear (modernize, automate, make better use of
              data and AI) but nobody has turned it into a sequence of
              decisions, designs, and delivery paths teams can act on.
            </li>
            <li>
              A legacy system is constraining every initiative, and
              replacing it is not a near-term option.
            </li>
            <li>
              Core business data is fragmented across systems, and every
              downstream project is absorbing the cost.
            </li>
            <li>
              A digital initiative needs stronger technical ownership,
              especially where B2B complexity (contract pricing, procurement
              integration, quote workflows) breaks the standard playbook.
            </li>
            <li>
              Critical workflows still live in email, spreadsheets, and
              tribal knowledge, and nobody owns the fix.
            </li>
            <li>
              The work spans executives, operators, technologists, and
              vendors, and it needs one person who can hold the thread across
              all of them.
            </li>
          </ul>
        </div>
      </section>

      <section className="about-section">
        <h2>How to judge fit</h2>
        <div className="body">
          <p>
            The <Link className="link" href="/projects">case studies</Link>{" "}
            show the shape of past work: what was built, why, and what
            changed. The <Link className="link" href="/writing">writing</Link>{" "}
            shows how I think about these problems. If both feel like your
            situation, we should talk.
          </p>
          <p>
            For conference talks and workshops, see the{" "}
            <Link className="link" href="/speaking">speaking page</Link>.
          </p>
        </div>
      </section>

      <section className="about-section">
        <h2>Contact</h2>
        <div className="body">
          <p>
            Email{" "}
            <a className="link" href="mailto:jason@jcapshaw.com">
              jason@jcapshaw.com
            </a>{" "}
            with a few lines on the business, the initiative, and where it is
            stuck. I read everything and reply to anything with a real
            problem in it.
          </p>
        </div>
      </section>
    </div>
  );
}
