// Inline diagram components — engineering-notebook schematics
// Exported via window assign so post.jsx can use them.

function Diagram({ title, fig, caption, legend, children }) {
  return (
    <figure className="diagram">
      <div className="diagram-head">
        <span className="d-title">{title}</span>
        <span className="d-fig">{fig}</span>
      </div>
      <div className="diagram-body">
        {children}
      </div>
      {legend && (
        <div className="d-legend">
          {legend.map((l, i) => (
            <span className="li" key={i}>
              <span className={"dot " + (l.kind || "")} />
              {l.label}
            </span>
          ))}
        </div>
      )}
      {caption && <figcaption className="diagram-caption">{caption}</figcaption>}
    </figure>
  );
}

// A horizontal pipeline: supplier feeds → staging → normalize → canonical → consumers
function PipelineDiagram() {
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
      <svg viewBox="0 0 720 300" width="100%" height="300" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="currentColor"/>
          </marker>
        </defs>

        {/* column 1 — supplier feeds (stacked, uncertain) */}
        <g transform="translate(20, 40)">
          <text className="tiny" x="0" y="-8">SUPPLIER FEEDS · N</text>
          {[0, 1, 2].map(i => (
            <g key={i} transform={`translate(${i * 4}, ${i * 6})`}>
              <rect x="0" y="0" width="100" height="40" className="stroke fill-bg" strokeDasharray="3 2" />
            </g>
          ))}
          <text x="16" y="30" className="serif">Supplier.csv</text>
        </g>

        {/* arrow 1 */}
        <g className="stroke" color="var(--rule-strong)">
          <line x1="140" y1="60" x2="180" y2="60" markerEnd="url(#arrow)" />
        </g>

        {/* column 2 — staging */}
        <g transform="translate(180, 40)">
          <rect x="0" y="0" width="120" height="60" className="stroke fill-elev" />
          <text x="10" y="20" className="tiny">STAGE · 01</text>
          <text x="10" y="40" className="serif">stage_supplier</text>
          <text x="10" y="54" className="tiny" style={{letterSpacing: "0.04em"}}>jsonb · received_at</text>
        </g>

        {/* arrow 2 with rule callout */}
        <g>
          <line x1="300" y1="70" x2="345" y2="70" className="stroke" markerEnd="url(#arrow)" color="var(--rule-strong)" />
          <rect x="302" y="80" width="50" height="18" className="tag-rect" />
          <text x="327" y="92" className="label-accent" textAnchor="middle">RULE v3</text>
        </g>

        {/* column 3 — normalize */}
        <g transform="translate(345, 40)">
          <rect x="0" y="0" width="140" height="60" className="stroke-accent fill-elev" strokeWidth="1.25" />
          <text x="10" y="20" className="label-accent">NORMALIZE · 02</text>
          <text x="10" y="40" className="serif">apply_ruleset()</text>
          <text x="10" y="54" className="tiny" style={{letterSpacing: "0.04em"}}>versioned · idempotent</text>
        </g>

        {/* arrow 3 */}
        <g>
          <line x1="485" y1="70" x2="525" y2="70" className="stroke" markerEnd="url(#arrow)" color="var(--rule-strong)" />
        </g>

        {/* column 4 — canonical */}
        <g transform="translate(525, 40)">
          <rect x="0" y="0" width="170" height="80" className="stroke fill-bg" strokeWidth="1.5" />
          <text x="10" y="20" className="tiny">CANONICAL · 03</text>
          <text x="10" y="40" className="serif">canonical_item</text>
          <line x1="10" y1="48" x2="160" y2="48" stroke="var(--rule)" />
          <text x="10" y="62" className="tiny" style={{letterSpacing: "0.04em"}}>item_id · uom · attrs</text>
          <text x="10" y="74" className="tiny" style={{letterSpacing: "0.04em", fill: "var(--accent)"}}>confidence: 0.00—1.00</text>
        </g>

        {/* arrows down to consumers */}
        {[0, 1, 2].map(i => (
          <g key={i}>
            <line
              x1={585 + i * 40}
              y1={125}
              x2={585 + i * 40}
              y2={200}
              className="stroke"
              color="var(--rule-strong)"
              markerEnd="url(#arrow)"
            />
          </g>
        ))}
        {/* consumer row */}
        <g transform="translate(560, 210)">
          {["storefront", "quoting", "search"].map((label, i) => (
            <g key={label} transform={`translate(${i * 40}, 0)`}>
              <rect x="-18" y="0" width="36" height="30" className="stroke fill-bg" />
              <text x="0" y="18" textAnchor="middle" className="tiny" style={{letterSpacing: "0.06em"}}>{label.slice(0, 6).toUpperCase()}</text>
            </g>
          ))}
        </g>

        {/* audit trail ribbon below */}
        <g transform="translate(180, 180)">
          <line x1="0" y1="10" x2="310" y2="10" className="stroke-accent" strokeDasharray="2 3" />
          <rect x="110" y="0" width="100" height="22" className="tag-rect" />
          <text x="160" y="14" className="label-accent" textAnchor="middle">normalization_event</text>
        </g>

        {/* annotations */}
        <g transform="translate(20, 250)">
          <line x1="80" y1="0" x2="80" y2="-45" className="anno-line" />
          <text x="0" y="12" className="tiny" style={{letterSpacing: "0.04em"}}>no transforms here —</text>
          <text x="0" y="24" className="tiny" style={{letterSpacing: "0.04em"}}>ingest is the contract</text>
        </g>
      </svg>
    </Diagram>
  );
}

// 2×2 matrix of data-rot shapes, positioned by detectability vs. cost
function ShapesMatrix() {
  return (
    <Diagram
      title="Shapes of Bad Product Data"
      fig="Fig. 02"
      caption="Most distributors spend their data-quality budget where the problems are easiest to see. Shape D is where the spend should go."
    >
      <svg viewBox="0 0 640 340" width="100%" height="340" preserveAspectRatio="xMidYMid meet">
        {/* axes */}
        <g>
          <line x1="80" y1="40" x2="80" y2="280" className="stroke" />
          <line x1="80" y1="280" x2="600" y2="280" className="stroke" />
          {/* y-axis label */}
          <text x="70" y="40" textAnchor="end" className="tiny">HIGH</text>
          <text x="70" y="280" textAnchor="end" className="tiny">LOW</text>
          <text x="30" y="160" className="tiny" transform="rotate(-90 30 160)" textAnchor="middle">COST TO THE BUSINESS</text>
          {/* x-axis label */}
          <text x="80" y="300" className="tiny">HARD TO DETECT</text>
          <text x="600" y="300" textAnchor="end" className="tiny">EASY TO DETECT</text>
          <text x="340" y="320" textAnchor="middle" className="tiny">DETECTABILITY</text>

          {/* gridlines */}
          <line x1="340" y1="40" x2="340" y2="280" className="anno-line" />
          <line x1="80" y1="160" x2="600" y2="160" className="anno-line" />
        </g>

        {/* plots: D(top-left high cost, hard), C(mid), B(mid), A(bottom-right low cost, easy) */}
        {/* Shape D */}
        <g transform="translate(170, 80)">
          <rect x="-42" y="-16" width="84" height="30" className="stroke-accent fill-elev" strokeWidth="1.25" />
          <text x="0" y="4" textAnchor="middle" className="label-accent">SHAPE · D</text>
          <text x="0" y="40" textAnchor="middle" className="serif">Untyped</text>
          <text x="0" y="56" textAnchor="middle" className="tiny" style={{letterSpacing: "0.04em"}}>invisible to systems</text>
        </g>

        {/* Shape C */}
        <g transform="translate(240, 190)">
          <rect x="-42" y="-16" width="84" height="30" className="stroke fill-bg" />
          <text x="0" y="4" textAnchor="middle" className="tiny">SHAPE · C</text>
          <text x="0" y="40" textAnchor="middle" className="serif">Inconsistent</text>
        </g>

        {/* Shape B */}
        <g transform="translate(430, 130)">
          <rect x="-42" y="-16" width="84" height="30" className="stroke fill-bg" />
          <text x="0" y="4" textAnchor="middle" className="tiny">SHAPE · B</text>
          <text x="0" y="40" textAnchor="middle" className="serif">Wrong</text>
          <text x="0" y="56" textAnchor="middle" className="tiny" style={{letterSpacing: "0.04em"}}>silent until a call</text>
        </g>

        {/* Shape A */}
        <g transform="translate(530, 230)">
          <rect x="-42" y="-16" width="84" height="30" className="stroke fill-bg" />
          <text x="0" y="4" textAnchor="middle" className="tiny">SHAPE · A</text>
          <text x="0" y="40" textAnchor="middle" className="serif">Missing</text>
          <text x="0" y="56" textAnchor="middle" className="tiny" style={{letterSpacing: "0.04em"}}>NOT NULL catches</text>
        </g>

        {/* Where the budget usually goes annotation */}
        <g transform="translate(530, 255)">
          <circle cx="0" cy="0" r="32" className="stroke-accent" strokeDasharray="3 3" fill="none" />
          <line x1="15" y1="-26" x2="55" y2="-55" className="anno-line" />
          <text x="58" y="-58" className="label-accent">BUDGET SPENT HERE</text>
        </g>

        {/* Where it should go */}
        <g transform="translate(170, 85)">
          <circle cx="0" cy="0" r="32" className="stroke-accent" strokeDasharray="3 3" fill="none" />
          <line x1="-22" y1="-22" x2="-50" y2="-52" className="anno-line" />
          <text x="-52" y="-55" className="label-accent">SPEND HERE INSTEAD</text>
        </g>
      </svg>
    </Diagram>
  );
}

// Ownership diagram — radial dependencies on the catalog, with no owner in the middle
function OwnershipDiagram() {
  const nodes = [
    { x: 140, y: 50, label: "Category Mgmt", sub: "owns pricing" },
    { x: 460, y: 50, label: "Marketing", sub: "owns copy + images" },
    { x: 520, y: 200, label: "IT / Systems", sub: "owns the pipes" },
    { x: 300, y: 280, label: "Operations", sub: "owns pack sizes" },
    { x: 80, y: 200, label: "Outside Sales", sub: "owns the customer" },
  ];
  const center = { x: 300, y: 170 };
  return (
    <Diagram
      title="Who Owns The Catalog?"
      fig="Fig. 03"
      caption="Every department depends on the catalog. None of them are measured on its quality. Bad product data is the emergent property of that arrangement, not an accident."
      legend={[
        { label: "depends on", kind: "" },
        { label: "nobody owns", kind: "accent" },
      ]}
    >
      <svg viewBox="0 0 600 330" width="100%" height="330" preserveAspectRatio="xMidYMid meet">
        {/* center */}
        <g>
          {/* dashed ring around the empty center */}
          <circle cx={center.x} cy={center.y} r="52" className="stroke-accent" strokeDasharray="3 3" fill="none" />
          <rect x={center.x - 62} y={center.y - 12} width="124" height="24" className="fill-bg" stroke="none" />
          <text x={center.x} y={center.y + 4} textAnchor="middle" className="label-accent">CATALOG · UNOWNED</text>
          <text x={center.x} y={center.y + 22} textAnchor="middle" className="tiny" style={{letterSpacing: "0.04em"}}>(product data)</text>
        </g>
        {/* spokes */}
        {nodes.map((n, i) => (
          <g key={i}>
            <line x1={n.x} y1={n.y} x2={center.x} y2={center.y} className="anno-line" />
          </g>
        ))}
        {/* nodes */}
        {nodes.map((n, i) => (
          <g key={"n" + i} transform={`translate(${n.x}, ${n.y})`}>
            <rect x="-70" y="-16" width="140" height="32" className="stroke fill-bg" />
            <text x="0" y="-2" textAnchor="middle" className="serif" style={{fontSize: 12}}>{n.label}</text>
            <text x="0" y="10" textAnchor="middle" className="tiny" style={{letterSpacing: "0.04em"}}>{n.sub}</text>
          </g>
        ))}
      </svg>
    </Diagram>
  );
}

Object.assign(window, { Diagram, PipelineDiagram, ShapesMatrix, OwnershipDiagram });
