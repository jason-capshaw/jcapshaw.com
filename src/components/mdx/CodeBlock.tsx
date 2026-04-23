"use client";

import { useState } from "react";

interface Props {
  label?: string;
  children: React.ReactNode;
}

export default function CodeBlock({ label = "Code", children }: Props) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="codeblock" data-expanded={expanded}>
      <div className="codeblock-head">
        <span className="ch-label">{label}</span>
        <button
          type="button"
          className="ch-toggle"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
        >
          {expanded ? "Collapse" : "Expand"}
        </button>
      </div>
      <div className="codeblock-body">
        <pre>{children}</pre>
      </div>
    </div>
  );
}
