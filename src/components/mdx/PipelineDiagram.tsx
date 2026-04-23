import Diagram from "./Diagram";

export default function PipelineDiagram() {
  return (
    <Diagram
      title="Catalog Normalization Pipeline"
      fig="Fig. 01"
      caption="A boring pipeline, on purpose. Every transform is versioned, every rule is auditable, and the canonical table carries its own confidence score so downstream consumers can decide how much to trust it."
      legend={[
        { label: "raw / uncertain", kind: "" },
        { label: "canonical", kind: "solid" },
        { label: "audit trail", kind: "accent" },
      ]}
    >
      <svg
        viewBox="0 0 720 300"
        width="100%"
        height="300"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <marker
            id="pipeline-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
          </marker>
        </defs>

        <g transform="translate(20, 40)">
          <text className="tiny" x="0" y="-8">SUPPLIER FEEDS · N</text>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${i * 4}, ${i * 6})`}>
              <rect
                x="0"
                y="0"
                width="100"
                height="40"
                className="stroke fill-bg"
                strokeDasharray="3 2"
              />
            </g>
          ))}
          <text x="16" y="30" className="serif">Supplier.csv</text>
        </g>

        <g style={{ color: "var(--rule-strong)" }}>
          <line
            x1="140"
            y1="60"
            x2="180"
            y2="60"
            className="stroke"
            markerEnd="url(#pipeline-arrow)"
          />
        </g>

        <g transform="translate(180, 40)">
          <rect x="0" y="0" width="120" height="60" className="stroke fill-elev" />
          <text x="10" y="20" className="tiny">STAGE · 01</text>
          <text x="10" y="40" className="serif">stage_supplier</text>
          <text x="10" y="54" className="tiny" style={{ letterSpacing: "0.04em" }}>
            jsonb · received_at
          </text>
        </g>

        <g style={{ color: "var(--rule-strong)" }}>
          <line
            x1="300"
            y1="70"
            x2="345"
            y2="70"
            className="stroke"
            markerEnd="url(#pipeline-arrow)"
          />
          <rect x="302" y="80" width="50" height="18" className="tag-rect" />
          <text x="327" y="92" className="label-accent" textAnchor="middle">
            RULE v3
          </text>
        </g>

        <g transform="translate(345, 40)">
          <rect
            x="0"
            y="0"
            width="140"
            height="60"
            className="stroke-accent fill-elev"
            strokeWidth="1.25"
          />
          <text x="10" y="20" className="label-accent">NORMALIZE · 02</text>
          <text x="10" y="40" className="serif">apply_ruleset()</text>
          <text x="10" y="54" className="tiny" style={{ letterSpacing: "0.04em" }}>
            versioned · idempotent
          </text>
        </g>

        <g style={{ color: "var(--rule-strong)" }}>
          <line
            x1="485"
            y1="70"
            x2="525"
            y2="70"
            className="stroke"
            markerEnd="url(#pipeline-arrow)"
          />
        </g>

        <g transform="translate(525, 40)">
          <rect
            x="0"
            y="0"
            width="170"
            height="80"
            className="stroke fill-bg"
            strokeWidth="1.5"
          />
          <text x="10" y="20" className="tiny">CANONICAL · 03</text>
          <text x="10" y="40" className="serif">canonical_item</text>
          <line x1="10" y1="48" x2="160" y2="48" stroke="var(--rule)" />
          <text x="10" y="62" className="tiny" style={{ letterSpacing: "0.04em" }}>
            item_id · uom · attrs
          </text>
          <text
            x="10"
            y="74"
            className="tiny"
            style={{ letterSpacing: "0.04em", fill: "var(--accent)" }}
          >
            confidence: 0.00—1.00
          </text>
        </g>

        {[0, 1, 2].map((i) => (
          <g key={i} style={{ color: "var(--rule-strong)" }}>
            <line
              x1={585 + i * 40}
              y1={125}
              x2={585 + i * 40}
              y2={200}
              className="stroke"
              markerEnd="url(#pipeline-arrow)"
            />
          </g>
        ))}

        <g transform="translate(560, 210)">
          {["storefront", "quoting", "search"].map((label, i) => (
            <g key={label} transform={`translate(${i * 40}, 0)`}>
              <rect x="-18" y="0" width="36" height="30" className="stroke fill-bg" />
              <text
                x="0"
                y="18"
                textAnchor="middle"
                className="tiny"
                style={{ letterSpacing: "0.06em" }}
              >
                {label.slice(0, 6).toUpperCase()}
              </text>
            </g>
          ))}
        </g>

        <g transform="translate(180, 180)">
          <line
            x1="0"
            y1="10"
            x2="310"
            y2="10"
            className="stroke-accent"
            strokeDasharray="2 3"
          />
          <rect x="110" y="0" width="100" height="22" className="tag-rect" />
          <text x="160" y="14" className="label-accent" textAnchor="middle">
            normalization_event
          </text>
        </g>

        <g transform="translate(20, 250)">
          <line x1="80" y1="0" x2="80" y2="-45" className="anno-line" />
          <text x="0" y="12" className="tiny" style={{ letterSpacing: "0.04em" }}>
            no transforms here —
          </text>
          <text x="0" y="24" className="tiny" style={{ letterSpacing: "0.04em" }}>
            ingest is the contract
          </text>
        </g>
      </svg>
    </Diagram>
  );
}
