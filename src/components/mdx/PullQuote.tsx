import { ReactNode } from "react";

export default function PullQuote({ children }: { children: ReactNode }) {
  return <blockquote className="pullquote">{children}</blockquote>;
}
