import Diagram from "./Diagram";

/**
 * The connected commerce model: customer-controlled clients on top, a
 * governed access layer in the middle, reusable commerce capabilities
 * beneath, and the systems of record at the bottom.
 */
export default function ConnectedCommerceDiagram() {
  const clients = ["AI ASSISTANT", "PROCUREMENT", "CUSTOMER ERP", "WEBSITE"];
  const capabilities = ["PRODUCT DATA", "PRICING", "INVENTORY", "ORDERS"];
  return (
    <Diagram
      title="Connected Commerce Model"
      fig="Fig. 02"
      caption="The customer chooses the client. The distributor exposes one governed set of commerce capabilities and reuses them across every client, including the ones that do not exist yet. MCP, APIs, PunchOut, and EDI are protocols over the same services, not separate integrations."
      legend={[
        { label: "customer-controlled", kind: "" },
        { label: "distributor-owned", kind: "solid" },
        { label: "governance", kind: "accent" },
      ]}
    >
      <svg
        className="d-wide"
        viewBox="0 0 720 380"
        width="100%"
        height="380"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <marker
            id="cc-arrow"
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

        {/* Row 1: customer-controlled clients */}
        <g transform="translate(90, 28)">
          <text className="tiny" x="0" y="-8">
            CUSTOMER-CONTROLLED CLIENTS · N
          </text>
          {clients.map((label, i) => (
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
              y2={88}
              className="stroke"
              markerEnd="url(#cc-arrow)"
            />
          </g>
        ))}
        <text
          className="tiny"
          x="140"
          y="80"
          textAnchor="end"
          style={{ letterSpacing: "0.04em" }}
        >
          authenticated requests
        </text>

        {/* Row 2: access layer with governance band */}
        <g transform="translate(90, 92)">
          <rect
            x="0"
            y="0"
            width="540"
            height="72"
            className="stroke-accent fill-elev"
            strokeWidth="1.25"
          />
          <text x="12" y="19" className="label-accent">
            CONNECTED COMMERCE LAYER · 01
          </text>
          <text x="12" y="38" className="serif">
            APIs · MCP · PunchOut · EDI
          </text>
          <line
            x1="0"
            y1="48"
            x2="540"
            y2="48"
            className="stroke-accent"
            strokeDasharray="2 3"
          />
          <text x="12" y="63" className="label-accent">
            identity · authorization · audit · data scope
          </text>
        </g>

        {[220, 505].map((x) => (
          <g key={x} style={{ color: "var(--rule-strong)" }}>
            <line
              x1={x}
              y1={164}
              x2={x}
              y2={196}
              className="stroke"
              markerEnd="url(#cc-arrow)"
            />
          </g>
        ))}

        {/* Row 3: reusable capabilities */}
        <g transform="translate(90, 200)">
          <rect
            x="0"
            y="0"
            width="540"
            height="64"
            className="stroke fill-elev"
            strokeWidth="1.5"
          />
          <text x="12" y="19" className="tiny">
            REUSABLE COMMERCE CAPABILITIES · 02
          </text>
          {capabilities.map((label, i) => (
            <g key={label} transform={`translate(${12 + i * 130}, 28)`}>
              <rect x="0" y="0" width="118" height="26" className="tag-rect" />
              <text
                x="59"
                y="17"
                textAnchor="middle"
                className="tiny"
                style={{ letterSpacing: "0.06em" }}
              >
                {label}
              </text>
            </g>
          ))}
        </g>

        {[220, 505].map((x) => (
          <g key={x} style={{ color: "var(--rule-strong)" }}>
            <line
              x1={x}
              y1={264}
              x2={x}
              y2={296}
              className="stroke"
              markerEnd="url(#cc-arrow)"
            />
          </g>
        ))}

        {/* Row 4: systems of record */}
        <g transform="translate(90, 300)">
          <rect x="0" y="0" width="260" height="48" className="stroke fill-bg" />
          <text x="12" y="19" className="tiny">ERP · 03</text>
          <text x="12" y="38" className="serif">
            contracts · pricing · stock · orders
          </text>
        </g>
        <g transform="translate(370, 300)">
          <rect x="0" y="0" width="260" height="48" className="stroke fill-bg" />
          <text x="12" y="19" className="tiny">PIM + SEARCH INDEX · 04</text>
          <text x="12" y="38" className="serif">
            attributes · substitutes · compatibility
          </text>
        </g>

        <text
          className="tiny"
          x="90"
          y="372"
          style={{ letterSpacing: "0.04em" }}
        >
          the interface changes · the capabilities do not
        </text>
      </svg>

      {/* Phone layout: the same four rows, stacked with 2×2 grids. */}
      <svg className="d-narrow" viewBox="0 0 320 494" width="100%">
        <defs>
          <marker
            id="cc-arrow-n"
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

        <g transform="translate(4, 0)">
          <text className="tiny" x="0" y="12">
            CUSTOMER-CONTROLLED CLIENTS · N
          </text>
          {clients.map((label, i) => (
            <g
              key={label}
              transform={`translate(${(i % 2) * 162}, ${22 + Math.floor(i / 2) * 40})`}
            >
              <rect x="0" y="0" width="150" height="30" className="stroke fill-bg" />
              <text
                x="75"
                y="19"
                textAnchor="middle"
                className="tiny"
                style={{ letterSpacing: "0.06em" }}
              >
                {label}
              </text>
            </g>
          ))}

          <g style={{ color: "var(--rule-strong)" }}>
            <line
              x1={156}
              y1={92}
              x2={156}
              y2={114}
              className="stroke"
              markerEnd="url(#cc-arrow-n)"
            />
          </g>
          <text className="tiny" x="166" y="107" style={{ letterSpacing: "0.04em" }}>
            authenticated requests
          </text>

          <g transform="translate(0, 118)">
            <rect
              x="0"
              y="0"
              width="312"
              height="88"
              className="stroke-accent fill-elev"
              strokeWidth="1.25"
            />
            <text x="12" y="19" className="label-accent">
              CONNECTED COMMERCE LAYER · 01
            </text>
            <text x="12" y="38" className="serif">
              APIs · MCP · PunchOut · EDI
            </text>
            <line
              x1="0"
              y1="48"
              x2="312"
              y2="48"
              className="stroke-accent"
              strokeDasharray="2 3"
            />
            <text x="12" y="64" className="label-accent">
              identity · authorization
            </text>
            <text x="12" y="78" className="label-accent">
              audit · data scope
            </text>
          </g>

          <g style={{ color: "var(--rule-strong)" }}>
            <line
              x1={156}
              y1={206}
              x2={156}
              y2={228}
              className="stroke"
              markerEnd="url(#cc-arrow-n)"
            />
          </g>

          <g transform="translate(0, 232)">
            <rect
              x="0"
              y="0"
              width="312"
              height="96"
              className="stroke fill-elev"
              strokeWidth="1.5"
            />
            <text x="12" y="19" className="tiny">
              REUSABLE COMMERCE CAPABILITIES · 02
            </text>
            {capabilities.map((label, i) => (
              <g
                key={label}
                transform={`translate(${12 + (i % 2) * 150}, ${30 + Math.floor(i / 2) * 32})`}
              >
                <rect x="0" y="0" width="138" height="24" className="tag-rect" />
                <text
                  x="69"
                  y="16"
                  textAnchor="middle"
                  className="tiny"
                  style={{ letterSpacing: "0.06em" }}
                >
                  {label}
                </text>
              </g>
            ))}
          </g>

          <g style={{ color: "var(--rule-strong)" }}>
            <line
              x1={156}
              y1={328}
              x2={156}
              y2={350}
              className="stroke"
              markerEnd="url(#cc-arrow-n)"
            />
          </g>

          <g transform="translate(0, 354)">
            <rect x="0" y="0" width="312" height="48" className="stroke fill-bg" />
            <text x="12" y="19" className="tiny">ERP · 03</text>
            <text x="12" y="38" className="serif">
              contracts · pricing · stock · orders
            </text>
          </g>
          <g transform="translate(0, 412)">
            <rect x="0" y="0" width="312" height="48" className="stroke fill-bg" />
            <text x="12" y="19" className="tiny">PIM + SEARCH INDEX · 04</text>
            <text x="12" y="38" className="serif">
              attributes · substitutes · compatibility
            </text>
          </g>

          <text className="tiny" x="0" y="484" style={{ letterSpacing: "0.04em" }}>
            the interface changes · the capabilities do not
          </text>
        </g>
      </svg>
    </Diagram>
  );
}
