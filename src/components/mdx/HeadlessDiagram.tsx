import Diagram from "./Diagram";

export default function HeadlessDiagram() {
  return (
    <Diagram
      title="Browsing / Transacting Split"
      fig="Fig. 01"
      caption="Separate browsing from transaction processing. The digital data layer supplies browsing and search information; pricing checks, inventory validation, and order submission go to the ERP or other system responsible for them."
      legend={[
        { label: "serving reads", kind: "" },
        { label: "live transaction", kind: "solid" },
        { label: "synchronization", kind: "accent" },
      ]}
    >
      <svg
        viewBox="0 0 720 320"
        width="100%"
        height="320"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <marker
            id="headless-arrow"
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

        <g transform="translate(90, 28)">
          <text className="tiny" x="0" y="-8">CHANNELS · N</text>
          {["WEBSITE", "PORTAL", "MOBILE", "PUNCHOUT"].map((label, i) => (
            <g key={label} transform={`translate(${i * 140}, 0)`}>
              <rect x="0" y="0" width="120" height="34" className="stroke fill-bg" />
              <text
                x="60"
                y="22"
                textAnchor="middle"
                className="tiny"
                style={{ letterSpacing: "0.06em" }}
              >
                {label}
              </text>
            </g>
          ))}
        </g>

        {[150, 290, 430, 570].map((x) => (
          <g key={x} style={{ color: "var(--rule-strong)" }}>
            <line
              x1={x}
              y1={62}
              x2={x}
              y2={86}
              className="stroke"
              markerEnd="url(#headless-arrow)"
            />
          </g>
        ))}

        <g transform="translate(90, 90)">
          <rect
            x="0"
            y="0"
            width="540"
            height="48"
            className="stroke-accent fill-elev"
            strokeWidth="1.25"
          />
          <text x="12" y="19" className="label-accent">DIGITAL SERVICES · 01</text>
          <text x="12" y="38" className="serif">
            APIs · orchestration · customer permissions
          </text>
        </g>

        {[220, 505].map((x) => (
          <g key={x} style={{ color: "var(--rule-strong)" }}>
            <line
              x1={x}
              y1={138}
              x2={x}
              y2={181}
              className="stroke"
              markerEnd="url(#headless-arrow)"
            />
          </g>
        ))}

        <g transform="translate(90, 185)">
          <rect x="0" y="0" width="260" height="64" className="stroke fill-bg" />
          <text x="12" y="19" className="tiny">BROWSE AND SEARCH · 02</text>
          <text x="12" y="39" className="serif">digital data + search index</text>
          <text x="12" y="54" className="tiny" style={{ letterSpacing: "0.04em" }}>
            prepared for customers · fast reads
          </text>
        </g>

        <g transform="translate(380, 185)">
          <rect
            x="0"
            y="0"
            width="250"
            height="64"
            className="stroke fill-elev"
            strokeWidth="1.5"
          />
          <text x="12" y="19" className="tiny">VALIDATE AND TRANSACT · 03</text>
          <text x="12" y="39" className="serif">authoritative ERP / service</text>
          <text x="12" y="54" className="tiny" style={{ letterSpacing: "0.04em" }}>
            live checks · order submission
          </text>
        </g>

        <g>
          <polyline
            points="505,249 505,285 220,285 220,253"
            className="stroke-accent"
            fill="none"
            strokeDasharray="2 3"
            markerEnd="url(#headless-arrow)"
            style={{ color: "var(--accent)" }}
          />
          <rect x="302" y="274" width="120" height="22" className="tag-rect" />
          <text x="362" y="288" className="label-accent" textAnchor="middle">
            sync · ERP + PIM
          </text>
        </g>

        <g transform="translate(440, 296)">
          <text x="0" y="12" className="tiny" style={{ letterSpacing: "0.04em" }}>
            a cached number is not a reservation
          </text>
        </g>
      </svg>
    </Diagram>
  );
}
