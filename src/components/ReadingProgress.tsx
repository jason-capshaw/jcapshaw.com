"use client";

import { useEffect, useState } from "react";

interface Props {
  readingMinutes?: number;
}

export default function ReadingProgress({ readingMinutes }: Props) {
  const [progress, setProgress] = useState(0);
  const [showMeter, setShowMeter] = useState(false);

  useEffect(() => {
    const handler = () => {
      const scrollTop = window.scrollY;
      const height =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = height > 0 ? Math.min(100, (scrollTop / height) * 100) : 0;
      setProgress(pct);
      setShowMeter(scrollTop > 280);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);

  const minutesLeft =
    readingMinutes && readingMinutes > 0
      ? Math.max(0, Math.ceil(readingMinutes * (1 - progress / 100)))
      : null;

  return (
    <>
      <div
        className="read-progress"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />
      <div
        className="read-meter"
        data-visible={showMeter || undefined}
        aria-hidden="true"
      >
        <span className="rm-pct">{Math.round(progress)}%</span>
        <span className="rm-bar">
          <span style={{ width: `${progress}%` }} />
        </span>
        {minutesLeft !== null ? (
          <span className="rm-left">{minutesLeft} min left</span>
        ) : null}
      </div>
    </>
  );
}
