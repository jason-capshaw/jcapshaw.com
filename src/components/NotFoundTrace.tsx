"use client";

import { useEffect, useState } from "react";

export default function NotFoundTrace() {
  const [trace, setTrace] = useState<string>("");

  useEffect(() => {
    const id = Array.from(crypto.getRandomValues(new Uint8Array(6)))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    const iso = new Date().toISOString();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTrace(`TRACE · ${id} · ${iso}`);
  }, []);

  return <p className="trace">{trace}</p>;
}
