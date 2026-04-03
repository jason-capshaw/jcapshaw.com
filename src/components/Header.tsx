"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/writing", label: "Writing" },
    { href: "/about", label: "About" },
    { href: "/speaking", label: "Speaking" },
    { href: "/now", label: "Now" },
  ];

  return (
    <>
      <header className="site-header">
        <Link href="/" className="site-header__identity">
          <span className="site-header__name">Jason Capshaw</span>
          <span className="site-header__tagline">
            Systems / Commerce / Distribution
          </span>
        </Link>
        <nav>
          <ul className={`site-header__nav${menuOpen ? " is-open" : ""}`}>
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={
                    pathname.startsWith(link.href)
                      ? { color: "var(--color-text)" }
                      : undefined
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          className="site-header__toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            {menuOpen ? (
              <>
                <line x1="4" y1="4" x2="16" y2="16" />
                <line x1="16" y1="4" x2="4" y2="16" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="17" y2="6" />
                <line x1="3" y1="10" x2="17" y2="10" />
                <line x1="3" y1="14" x2="17" y2="14" />
              </>
            )}
          </svg>
        </button>
      </header>
      <div className="site-header__rule" />
    </>
  );
}
