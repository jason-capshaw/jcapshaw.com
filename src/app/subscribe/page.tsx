import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscribe",
  description:
    "Subscribe to essays and field notes — by email or feed reader.",
};

export default function SubscribePage() {
  return (
    <div className="shell narrow">
      <section className="subscribe">
        <span className="eyebrow">Subscribe</span>
        <h1>Get the writing as it ships.</h1>
        <p className="lede">
          New essays and field notes land a few times a month. No digest, no
          tracking, no marketing — just the work, delivered quietly.
        </p>
        <form
          className="sub-form"
          action="mailto:jason@jcapshaw.com"
          method="post"
          encType="text/plain"
        >
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            aria-label="Email address"
            required
          />
          <button type="submit">Subscribe</button>
        </form>
        <section className="feed-options" aria-label="Feed options">
          <a href="/rss.xml">
            <p className="f-kind">RSS</p>
            <p className="f-title">RSS 2.0</p>
            <p className="f-desc">
              Standard RSS feed for most readers — NetNewsWire, Reeder,
              Feedbin.
            </p>
          </a>
          <a href="/atom.xml">
            <p className="f-kind">Atom</p>
            <p className="f-title">Atom 1.0</p>
            <p className="f-desc">
              Atom feed for readers that prefer it over RSS.
            </p>
          </a>
          <a href="/feed.json">
            <p className="f-kind">JSON</p>
            <p className="f-title">JSON Feed</p>
            <p className="f-desc">
              Structured JSON for programmatic consumers and modern readers.
            </p>
          </a>
        </section>
      </section>
    </div>
  );
}
