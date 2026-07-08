"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type HomePost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  type: "essay" | "field-note";
  readingTime: string;
};

interface Props {
  featured: HomePost | null;
  recentPosts: HomePost[];
  allPostCount: number;
  essayCount: number;
  fieldNoteCount: number;
  children: React.ReactNode;
}

function formatShort(dateStr: string): string {
  const [year, month] = dateStr.split("-").map(Number);
  const d = new Date(year, (month ?? 1) - 1);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

export default function HomeView({
  featured,
  recentPosts,
  essayCount,
  fieldNoteCount,
  children,
}: Props) {
  const [variant, setVariant] = useState<"sparse" | "dense">("sparse");

  useEffect(() => {
    const applyFromStorage = () => {
      const v = localStorage.getItem("jc-home") === "dense" ? "dense" : "sparse";
      setVariant(v);
    };
    applyFromStorage();
    const obs = new MutationObserver(() => {
      const attr = document.documentElement.getAttribute("data-home");
      setVariant(attr === "dense" ? "dense" : "sparse");
    });
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-home"],
    });
    return () => obs.disconnect();
  }, []);

  if (variant === "dense") {
    return (
      <section className="dense-home fade-in">
        <div className="dense-statement">
          <h1>
            Systems thinking for B2B distribution, written from inside the
            operational middle.
          </h1>
          <div className="dense-meta">
            <div className="m-line"><span>Essays</span><span className="v">{essayCount}</span></div>
            <div className="m-line"><span>Field notes</span><span className="v">{fieldNoteCount}</span></div>
            <div className="m-line"><span>Region</span><span className="v">North America</span></div>
            <div className="m-line"><span>Practice</span><span className="v">15+ years</span></div>
          </div>
        </div>

        <div className="dense-col">
          <h3>All writing</h3>
          <ul className="dense-list">
            {[featured, ...recentPosts].filter((p): p is HomePost => !!p).map((p) => (
              <li key={p.slug}>
                <Link className="dl-title" href={`/writing/${p.slug}`}>
                  {p.title}
                </Link>
                <span className="dl-meta">{formatShort(p.date)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="dense-col">
          <h3>Topics</h3>
          <ul className="dense-list">
            <li><Link className="dl-title" href="/writing/topics/commerce-architecture">Commerce architecture</Link><span className="dl-meta">Platforms · Data</span></li>
            <li><Link className="dl-title" href="/writing/topics/b2b-distribution">B2B distribution</Link><span className="dl-meta">Channels</span></li>
            <li><Link className="dl-title" href="/writing/topics/applied-ai">Applied AI</Link><span className="dl-meta">Classification</span></li>
            <li><Link className="dl-title" href="/writing/topics/enterprise-systems">Enterprise systems</Link><span className="dl-meta">ERP · Integration</span></li>
            <li><Link className="dl-title" href="/writing/topics/apis-integration">APIs &amp; integration</Link><span className="dl-meta">Strategy · Governance</span></li>
            <li><Link className="dl-title" href="/writing/topics/product-data">Product &amp; pricing data</Link><span className="dl-meta">Catalogs · Pricing</span></li>
          </ul>
        </div>
      </section>
    );
  }

  return <>{children}</>;
}
