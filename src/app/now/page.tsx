import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Now",
  description: "What Jason Capshaw is working on right now.",
};

export default function NowPage() {
  return (
    <div className="shell">
      <section className="now-head">
        <p className="updated">Last updated · June 2026</p>
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
        <h3>Working on</h3>
        <div className="body">
          <p>
            Agentic commerce in B2B: purchasing and procurement workflows,
            automated ordering, and the product services that sit
            underneath. Most of the real work is the layer beneath the
            agent. That is what decides whether autonomous ordering holds
            up in a transaction the buyer is accountable for.
          </p>
        </div>
      </section>

      <section className="now-section">
        <h3>Thinking about</h3>
        <div className="body">
          <p>
            Long-horizon commerce architecture. The next five years of
            technology shifts are coming faster than most enterprise stacks
            were designed to absorb. The question I keep returning to: how do
            you position infrastructure and architecture so new capability
            gets consumed rapidly, instead of needing a transformation
            program to land it each time?
          </p>
        </div>
      </section>

      <section className="now-section">
        <h3>Following</h3>
        <div className="body">
          <ul>
            <li>Architecture and team dynamics in the era of autonomous agents</li>
            <li>Risk and governance around agents operating inside real workflows</li>
            <li>Strategic talent management as the shape of the work changes</li>
            <li>Security and privacy posture for agents touching production systems</li>
          </ul>
        </div>
      </section>

      <section className="now-section">
        <h3>Outside work</h3>
        <div className="body">
          <p>Cycling.</p>
          <p>
            Building an aquaponics system that uses modern sensors and
            machine learning to optimize and improve output.
          </p>
        </div>
      </section>
    </div>
  );
}
