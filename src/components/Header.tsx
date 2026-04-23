"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { openSearch } from "@/components/SearchOverlay";

const links = [
  { href: "/writing", label: "Writing" },
  { href: "/projects", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/speaking", label: "Speaking" },
  { href: "/now", label: "Now" },
  { href: "/subscribe", label: "Subscribe" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link href="/" className="brand-wrap" aria-label="Home">
          <span className="monogram" aria-hidden="true">jc</span>
          <span className="brand">
            <span className="name">Jason Capshaw</span>
            <span className="sub">Systems · B2B Distribution</span>
          </span>
        </Link>
        <nav aria-label="Primary">
          <ul className="nav">
            {links.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="topbar-right">
          <button
            type="button"
            className="icon-btn"
            aria-label="Search (⌘K)"
            title="Search (⌘K)"
            onClick={openSearch}
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <circle cx="7" cy="7" r="4.5" />
              <path d="M10.5 10.5 13.5 13.5" />
            </svg>
          </button>
          <a
            href="/rss.xml"
            className="icon-btn"
            aria-label="RSS feed"
            title="RSS"
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 3a10 10 0 0 1 10 10" />
              <path d="M3 8a5 5 0 0 1 5 5" />
              <circle cx="3.8" cy="12.2" r="1.1" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
