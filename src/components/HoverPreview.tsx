"use client";

import { useEffect, useRef, useState } from "react";

export default function HoverPreview() {
  const [state, setState] = useState<{
    title: string;
    kind?: string;
    x: number;
    y: number;
    visible: boolean;
  }>({ title: "", x: 0, y: 0, visible: false });
  const hideTimer = useRef<number | null>(null);

  useEffect(() => {
    const onEnter = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const host = target.closest<HTMLElement>("[data-preview-title]");
      if (!host) return;
      if (hideTimer.current) {
        window.clearTimeout(hideTimer.current);
        hideTimer.current = null;
      }
      const rect = host.getBoundingClientRect();
      const title = host.getAttribute("data-preview-title") || "";
      const kind = host.getAttribute("data-preview-kind") || undefined;
      setState({
        title,
        kind,
        x: Math.min(window.innerWidth - 336, rect.left),
        y: rect.bottom + 8,
        visible: true,
      });
    };
    const onLeave = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const host = target.closest("[data-preview-title]");
      if (!host) return;
      hideTimer.current = window.setTimeout(() => {
        setState((s) => ({ ...s, visible: false }));
      }, 80);
    };
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    return () => {
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <div
      className="hover-preview"
      data-visible={state.visible || undefined}
      style={{ left: state.x, top: state.y }}
      aria-hidden="true"
    >
      {state.kind ? <p className="hp-kind">{state.kind}</p> : null}
      <p className="hp-title">{state.title}</p>
    </div>
  );
}
