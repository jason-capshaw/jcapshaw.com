"use client";

import {
  Children,
  isValidElement,
  ReactElement,
  ReactNode,
  useState,
} from "react";

interface PaneProps {
  title: string;
  children: ReactNode;
}

interface SwitcherProps {
  children: ReactNode;
}

export function Pane({ children }: PaneProps) {
  return <>{children}</>;
}

export default function Switcher({ children }: SwitcherProps) {
  const panes = Children.toArray(children).filter(
    (child): child is ReactElement<PaneProps> => isValidElement<PaneProps>(child),
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const activePane = panes[activeIndex];

  if (panes.length === 0) {
    return null;
  }

  return (
    <div className="mdx-switcher">
      <div
        className="mdx-switcher__tabs"
        role="tablist"
        aria-label="Article panel switcher"
      >
        {panes.map((pane, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={`${pane.props.title}-${index}`}
              type="button"
              role="tab"
              className="mdx-switcher__tab"
              aria-selected={isActive}
              onClick={() => setActiveIndex(index)}
            >
              {pane.props.title}
            </button>
          );
        })}
      </div>
      <div className="mdx-switcher__panel" role="tabpanel">
        {activePane.props.children}
      </div>
    </div>
  );
}
