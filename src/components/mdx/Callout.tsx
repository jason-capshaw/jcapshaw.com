import { ReactNode } from "react";

interface CalloutProps {
  title?: string;
  tone?: "default" | "caution";
  children: ReactNode;
}

export default function Callout({
  title = "Note",
  tone = "default",
  children,
}: CalloutProps) {
  return (
    <aside className="callout" data-tone={tone}>
      <p className="c-label">{title}</p>
      <div className="c-body">{children}</div>
    </aside>
  );
}
