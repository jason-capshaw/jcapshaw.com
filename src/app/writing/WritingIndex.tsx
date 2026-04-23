"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type IndexPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  type: "essay" | "field-note";
  readingTime: string;
};

type Filter = "all" | "essay" | "field-note";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "essay", label: "Essays" },
  { id: "field-note", label: "Field notes" },
];

function formatShort(dateStr: string): string {
  const [year, month] = dateStr.split("-").map(Number);
  const d = new Date(year, (month ?? 1) - 1);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

function yearOf(dateStr: string): string {
  return dateStr.slice(0, 4) || "Undated";
}

export default function WritingIndex({ posts }: { posts: IndexPost[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === "f") {
        const input = searchRef.current;
        if (!input) return;
        e.preventDefault();
        input.focus();
        input.select();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts
      .filter((p) => (filter === "all" ? true : p.type === filter))
      .filter((p) => {
        if (!q) return true;
        return (
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q)
        );
      });
  }, [posts, filter, query]);

  const grouped = useMemo(() => {
    const map = new Map<string, IndexPost[]>();
    for (const p of visible) {
      const year = yearOf(p.date);
      if (!map.has(year)) map.set(year, []);
      map.get(year)!.push(p);
    }
    return Array.from(map.entries());
  }, [visible]);

  return (
    <>
      <div className="filters" role="tablist" aria-label="Filter writing">
        <span className="filter-label">Filter</span>
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={filter === f.id}
            className={`chip${filter === f.id ? " active" : ""}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
        <label className="archive-search">
          <input
            ref={searchRef}
            type="search"
            placeholder="Search writing…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search writing"
          />
          <span className="kbd" aria-hidden="true">⌘F</span>
        </label>
      </div>

      {grouped.length === 0 ? (
        <p className="empty-state">Nothing here yet.</p>
      ) : (
        grouped.map(([year, items]) => (
          <section key={year} className="year-group">
            <p className="year">{year}</p>
            <ul className="post-list">
              {items.map((post) => (
                <li
                  key={post.slug}
                  className="post-row"
                  data-preview-title={post.title}
                  data-preview-kind={post.type === "essay" ? "Essay" : "Field note"}
                >
                  <div>
                    <h2 className="pr-title">
                      <Link href={`/writing/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="pr-excerpt">{post.excerpt}</p>
                  </div>
                  <div className="pr-meta">
                    <span className="pr-tag">
                      {post.type === "essay" ? "Essay" : "Field Note"}
                    </span>
                    <span>{formatShort(post.date)}</span>
                    <span> · {post.readingTime}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </>
  );
}
