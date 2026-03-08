import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Jason Capshaw — background, experience, and what I work on.",
};

export default function AboutPage() {
  return (
    <>
      <div className="page-intro">
        <h1 className="page-intro__headline">About</h1>
      </div>

      <div className="about-content">
        <p>
          I work at the intersection of B2B distribution, digital commerce, and
          enterprise technology. My focus is on helping organizations build
          systems that actually work — commerce platforms, data infrastructure,
          and digital operations that survive contact with the real world.
        </p>

        <p>
          Most of my career has been spent inside distribution and industrial
          commerce, where the problems are unglamorous but the stakes are high.
          Getting product data right, making pricing engines that don&apos;t
          collapse under complexity, building search that understands industrial
          taxonomies — this is the work that separates real digital transformation
          from slideware.
        </p>

        <p>
          I write here about what I&apos;m learning and building. The essays are
          longer explorations of ideas. The field notes are shorter observations
          from the work itself.
        </p>

        <h2>What I care about</h2>
        <ul>
          <li>Commerce architecture that serves B2B complexity, not just B2C patterns with a login page</li>
          <li>Data systems that handle the mess of real product catalogs and pricing</li>
          <li>AI and automation applied to actual business problems, not demos</li>
          <li>Clear thinking about technology strategy in traditional industries</li>
        </ul>

        <h2>Get in touch</h2>
        <p>
          The best way to reach me is by email at{" "}
          <a href="mailto:jason@jcapshaw.com">jason@jcapshaw.com</a>.
          I&apos;m also on{" "}
          <a href="https://linkedin.com/in/jasoncapshaw" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>.
        </p>
      </div>
    </>
  );
}
