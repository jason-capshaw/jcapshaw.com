"use client";

import { useEffect, useRef, useState } from "react";

interface FootnoteProps {
  n: number;
  children: React.ReactNode;
}

export function Footnote({ n, children }: FootnoteProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = Math.min(window.innerWidth - 316, Math.max(8, rect.left - 120));
    const y = rect.bottom + 8;
    setPos({ x, y });
  }, [open]);

  return (
    <>
      <button
        ref={ref}
        type="button"
        className="fn-ref"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        aria-label={`Footnote ${n}`}
      >
        [{n}]
      </button>
      {open ? (
        <span className="fn-pop" style={{ left: pos.x, top: pos.y }}>
          <span className="fn-pop-num">Note {String(n).padStart(2, "0")}</span>
          {children}
        </span>
      ) : null}
    </>
  );
}

export function Notes({ children }: { children: React.ReactNode }) {
  return (
    <aside className="notes-block" aria-label="Footnotes">
      <p className="notes-head">Notes</p>
      <ol className="notes-list">{children}</ol>
    </aside>
  );
}

export function Note({ children }: { children: React.ReactNode }) {
  return <li>{children}</li>;
}
