import { ReactNode } from "react";

export interface DiagramProps {
  title: string;
  fig: string;
  caption?: string;
  legend?: { label: string; kind?: "" | "solid" | "accent" }[];
  children: ReactNode;
}

export default function Diagram({
  title,
  fig,
  caption,
  legend,
  children,
}: DiagramProps) {
  return (
    <figure className="diagram">
      <div className="diagram-head">
        <span className="d-title">{title}</span>
        <span className="d-fig">{fig}</span>
      </div>
      <div className="diagram-body">{children}</div>
      {legend && (
        <div className="d-legend">
          {legend.map((l, i) => (
            <span className="li" key={i}>
              <span className={`dot ${l.kind ?? ""}`.trim()} />
              {l.label}
            </span>
          ))}
        </div>
      )}
      {caption && <figcaption className="diagram-caption">{caption}</figcaption>}
    </figure>
  );
}
