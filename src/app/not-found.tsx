import Link from "next/link";
import NotFoundTrace from "@/components/NotFoundTrace";

export default function NotFound() {
  return (
    <div className="shell">
      <section className="notfound">
        <p className="err">ERR · 404 · NOT FOUND</p>
        <p className="pilcrow" aria-hidden="true">¶</p>
        <h1>This page is not in the archive.</h1>
        <p>
          The URL you followed doesn&apos;t match anything currently published.
          If this came from a link on the site, it&apos;s probably moved — try
          the archive or the subscribe page.
        </p>
        <div className="nf-links">
          <Link href="/">Front page</Link>
          <Link href="/writing">Archive</Link>
          <Link href="/subscribe">Subscribe</Link>
        </div>
        <NotFoundTrace />
      </section>
    </div>
  );
}
