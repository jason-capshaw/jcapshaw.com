"use client";

import { ReactNode, useId, useState } from "react";

interface DisclosureProps {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export default function Disclosure({
  title,
  defaultOpen = false,
  children,
}: DisclosureProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div className="mdx-disclosure">
      <button
        type="button"
        className="mdx-disclosure__button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span>{title}</span>
        <span className="mdx-disclosure__glyph" aria-hidden="true">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      {isOpen ? (
        <div id={panelId} className="mdx-disclosure__panel">
          {children}
        </div>
      ) : null}
    </div>
  );
}
