import Link from "next/link";

export default function AuthorBio() {
  return (
    <aside className="author-bio" aria-label="About the author">
      <p className="ab-label">About the author</p>
      <p className="ab-text">
        I&apos;m Jason Capshaw. I write here about the systems underneath B2B
        distribution, and I advise distributors and B2B teams on commerce
        architecture, product data, APIs, and applied AI. If this reads like
        your situation,{" "}
        <Link className="link" href="/advisory">
          start with the advisory page
        </Link>
        .
      </p>
    </aside>
  );
}
