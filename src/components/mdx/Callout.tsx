import { ReactNode } from "react";

interface CalloutProps {
  title?: string;
  tone?: "default" | "caution";
  children: ReactNode;
}

export default function Callout({
  title,
  tone = "default",
  children,
}: CalloutProps) {
  return (
    <aside className={`mdx-callout mdx-callout--${tone}`}>
      {title ? <p className="mdx-callout__title">{title}</p> : null}
      <div className="mdx-callout__body">{children}</div>
    </aside>
  );
}
