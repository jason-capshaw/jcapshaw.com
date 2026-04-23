export interface Talk {
  slug: string;
  title: string;
  venue: string;
  date: string;
  abstract: string;
  audience: string;
  duration: string;
  slides: boolean;
  recording: boolean;
  sections?: { heading: string; body: string[] }[];
  slideTitles?: string[];
}

const talks: Talk[] = [
  {
    slug: "catalog-as-infrastructure",
    title: "Product data as infrastructure, not content",
    venue: "NAED Industrial Distribution Summit",
    date: "2025-03-18",
    abstract:
      "Why distributors keep failing at digital until they treat catalog, pricing, and identity as shared infrastructure owned by nobody and depended on by everybody.",
    audience: "Commerce & technology leadership",
    duration: "42 min + Q&A",
    slides: true,
    recording: false,
    slideTitles: [
      "Opening",
      "The ownership trap",
      "Identity first",
      "Audit trails",
      "Rollout patterns",
      "Close",
    ],
    sections: [
      {
        heading: "Abstract",
        body: [
          "The pattern I keep seeing: digital teams inherit a catalog that nobody actually owns, get measured on revenue, and never get the runway to fix the substrate. The talk walks through why the substrate matters and what it takes to treat it as real infrastructure.",
        ],
      },
      {
        heading: "Booking",
        body: [
          "Best fit for association keynotes, customer summits, and internal leadership sessions. Email jason@jcapshaw.com with audience and date.",
        ],
      },
    ],
  },
  {
    slug: "applied-ai-operations",
    title: "Where applied AI actually earns its keep",
    venue: "B2B Online",
    date: "2024-11-04",
    abstract:
      "A grounded tour through where AI helps in industrial commerce — classification, enrichment, internal workflows — and where it becomes a distraction.",
    audience: "Commerce operators",
    duration: "35 min",
    slides: true,
    recording: true,
    slideTitles: [
      "Framing",
      "Classification",
      "Enrichment",
      "Internal tools",
      "Anti-patterns",
      "Close",
    ],
  },
  {
    slug: "erp-boundaries",
    title: "ERP boundaries and the systems they shape",
    venue: "Private — distribution executive roundtable",
    date: "2024-06-12",
    abstract:
      "On drawing ERP boundaries so the rest of the architecture can be modern without rebuilding ledger and inventory.",
    audience: "Executives & architects",
    duration: "Workshop · 90 min",
    slides: false,
    recording: false,
  },
];

export function getAllTalks(): Talk[] {
  return [...talks].sort((a, b) => b.date.localeCompare(a.date));
}

export function getTalkBySlug(slug: string): Talk | undefined {
  return talks.find((t) => t.slug === slug);
}
