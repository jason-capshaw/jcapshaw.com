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
        <h1 className="page-intro__headline">Speaking &amp; Advisory</h1>
        <p className="page-intro__subhead">
          I speak and advise on digital commerce architecture, B2B distribution
          technology, and enterprise systems strategy. No frameworks. No
          buzzword bingo. Practical insight from building real systems.
        </p>
      </div>

      <div className="offering">
        <h2 className="offering__title">Speaking</h2>
        <p className="offering__description">
          I talk about the real challenges of digital transformation in B2B
          distribution — the architecture decisions, the data problems, the
          organizational friction. Topics include commerce platform strategy,
          product data infrastructure, applied AI in distribution, and building
          engineering culture in traditional industries.
        </p>
      </div>

      <div className="offering">
        <h2 className="offering__title">Advisory</h2>
        <p className="offering__description">
          I work with distribution and commerce leaders who need an experienced
          technical perspective on platform decisions, architecture reviews,
          build-vs-buy evaluations, and digital strategy. Engagements are
          typically short, focused, and designed to accelerate decisions — not
          create dependency.
        </p>
      </div>

      <div className="offering">
        <h2 className="offering__title">Get in touch</h2>
        <p className="offering__description">
          If you&apos;re interested in having me speak at your event or advise
          on a project, reach out at{" "}
          <a href="mailto:jason@jcapshaw.com">jason@jcapshaw.com</a>.
        </p>
      </div>
    </>
  );
}
