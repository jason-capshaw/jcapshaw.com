import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="site-header__name">
        Jason Capshaw
      </Link>
      <nav>
        <ul className="site-header__nav">
          <li><Link href="/writing">Writing</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/speaking">Speaking &amp; Advisory</Link></li>
          <li><Link href="/now">Now</Link></li>
        </ul>
      </nav>
    </header>
  );
}
