"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type SearchItem = {
  kind: "essay" | "field-note" | "talk" | "case" | "project";
  title: string;
  excerpt: string;
  href: string;
};

type LoadedState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "loaded"; items: SearchItem[] }
  | { status: "error" };

const OPEN_EVENT = "jc:search-open";

export function openSearch() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_EVENT));
}

function highlight(text: string, query: string) {
  if (!query) return text;
  const safe = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${safe})`, "ig"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i}>{part}</mark>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export default function SearchOverlay() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [data, setData] = useState<LoadedState>({ status: "idle" });
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(OPEN_EVENT, onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    if (data.status === "idle") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setData({ status: "loading" });
      fetch("/search-index.json")
        .then((r) => r.json())
        .then((items: SearchItem[]) => setData({ status: "loaded", items }))
        .catch(() => setData({ status: "error" }));
    }
  }, [open, data.status]);

  const results = useMemo(() => {
    if (data.status !== "loaded") return [] as SearchItem[];
    const q = query.trim().toLowerCase();
    if (!q) return data.items.slice(0, 12);
    return data.items
      .filter(
        (it) =>
          it.title.toLowerCase().includes(q) ||
          it.excerpt.toLowerCase().includes(q),
      )
      .slice(0, 30);
  }, [data, query]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActive(0);
  }, [query, open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(results.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter") {
      const target = results[active];
      if (target) {
        window.location.href = target.href;
      }
    }
  };

  if (!open) return null;

  const kindLabel = (k: SearchItem["kind"]) => {
    switch (k) {
      case "essay":
        return "Essay";
      case "field-note":
        return "Field note";
      case "talk":
        return "Talk";
      case "case":
        return "Case study";
      case "project":
        return "Project";
    }
  };

  return (
    <div
      className="search-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="search-inner">
        <div className="search-head">
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <circle cx="7" cy="7" r="4.5" />
            <path d="M10.5 10.5 13.5 13.5" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search essays, talks, case studies…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Search"
          />
          <button type="button" className="esc" onClick={close}>
            Esc
          </button>
        </div>
        <div className="search-meta" aria-live="polite">
          <span>
            {data.status === "loading"
              ? "Loading…"
              : data.status === "error"
                ? "Search unavailable"
                : `${results.length} match${results.length === 1 ? "" : "es"}`}
          </span>
          <span>All · posts · talks · case studies</span>
        </div>
        {results.length > 0 ? (
          <ul className="search-results">
            {results.map((r, i) => (
              <li key={r.href}>
                <a
                  href={r.href}
                  className="search-result"
                  data-active={i === active || undefined}
                  onMouseEnter={() => setActive(i)}
                >
                  <p className="sr-kind">{kindLabel(r.kind)}</p>
                  <p className="sr-title">{highlight(r.title, query)}</p>
                  {r.excerpt ? (
                    <p className="sr-excerpt">
                      {highlight(r.excerpt, query)}
                    </p>
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
        ) : data.status === "loaded" && query ? (
          <div className="search-empty">No matches for &ldquo;{query}&rdquo;.</div>
        ) : null}
        <div className="search-hint">
          <span><span className="kbd">↵</span> open</span>
          <span><span className="kbd">esc</span> close</span>
          <span><span className="kbd">⌘K</span> toggle</span>
        </div>
      </div>
    </div>
  );
}
