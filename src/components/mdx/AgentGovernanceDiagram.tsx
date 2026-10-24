import Diagram from "./Diagram";

/**
 * Governing a customer's agent: every request passes identity, authority,
 * and exposure checks; routine requests reach the shared commerce services,
 * uncertain ones go to a person, and both sides keep the audit record.
 */
export default function AgentGovernanceDiagram() {
  const gates = [
    { label: "IDENTITY · 01", text: "which buyer, which customer, which ship-to?" },
    { label: "AUTHORITY · 02", text: "read, prepare a quote, or submit an order?" },
    { label: "EXPOSURE · 03", text: "scoped, authenticated, customer-initiated" },
  ];
  return (
    <Diagram
      title="Governing a Customer's Agent"
      fig="Fig. 03"
      caption="The protocol carries the request. Governance decides what happens to it. The routine 95 percent flows through to the same services every other client uses; the uncertain 5 percent goes to a person who knows the product and the account. None of it is new: it's the discipline EDI and PunchOut already demanded."
      legend={[
        { label: "customer-controlled", kind: "" },
        { label: "distributor-owned", kind: "solid" },
        { label: "governance", kind: "accent" },
      ]}
    >
      <svg
        className="d-wide"
        viewBox="0 0 720 330"
        width="100%"
        height="330"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <marker
            id="ag-arrow"
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

        {/* Customer's agent */}
        <g transform="translate(10, 100)">
          <rect x="0" y="0" width="120" height="60" className="stroke fill-bg" />
          <text x="60" y="26" textAnchor="middle" className="tiny">
            CUSTOMER&apos;S
          </text>
          <text x="60" y="42" textAnchor="middle" className="tiny">
            AGENT
          </text>
        </g>

        <g style={{ color: "var(--rule-strong)" }}>
          <line
            x1={130}
            y1={130}
            x2={166}
            y2={130}
            className="stroke"
            markerEnd="url(#ag-arrow)"
          />
        </g>

        {/* Governance checks */}
        {gates.map((g, i) => (
          <g key={g.label} transform={`translate(170, ${40 + i * 64})`}>
            <rect
              x="0"
              y="0"
              width="270"
              height="52"
              className="stroke-accent fill-elev"
              strokeWidth="1.25"
            />
            <text x="12" y="19" className="label-accent">
              {g.label}
            </text>
            <text x="12" y="38" className="serif">
              {g.text}
            </text>
          </g>
        ))}

        {/* Routine path */}
        <g style={{ color: "var(--rule-strong)" }}>
          <line
            x1={440}
            y1={122}
            x2={496}
            y2={122}
            className="stroke"
            markerEnd="url(#ag-arrow)"
          />
        </g>
        <text className="tiny" x="468" y="114" textAnchor="middle">
          ~95%
        </text>
        <g transform="translate(500, 92)">
          <rect
            x="0"
            y="0"
            width="210"
            height="60"
            className="stroke fill-elev"
            strokeWidth="1.5"
          />
          <text x="12" y="21" className="tiny">
            SHARED COMMERCE SERVICES
          </text>
          <text x="12" y="42" className="serif">
            pricing · inventory · orders
          </text>
        </g>

        {/* Exception path */}
        <g style={{ color: "var(--rule-strong)" }}>
          <line
            x1={440}
            y1={194}
            x2={496}
            y2={194}
            className="stroke"
            strokeDasharray="3 3"
            markerEnd="url(#ag-arrow)"
          />
        </g>
        <text className="tiny" x="468" y="186" textAnchor="middle">
          ~5%
        </text>
        <g transform="translate(500, 166)">
          <rect
            x="0"
            y="0"
            width="210"
            height="56"
            className="stroke fill-elev"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <text x="12" y="20" className="tiny">
            EXCEPTIONS
          </text>
          <text x="12" y="40" className="serif">
            a person who knows the account
          </text>
        </g>

        {/* Audit band */}
        <g transform="translate(10, 246)">
          <rect
            x="0"
            y="0"
            width="700"
            height="50"
            className="stroke-accent fill-elev"
            strokeDasharray="2 3"
          />
          <text x="12" y="19" className="label-accent">
            AUDIT AND LIABILITY · 04
          </text>
          <text x="12" y="38" className="serif">
            what was requested · what came back · what was approved · what
            happened
          </text>
        </g>

        <text
          className="tiny"
          x="10"
          y="320"
          style={{ letterSpacing: "0.04em" }}
        >
          a record both parties can inspect
        </text>
      </svg>

      {/* Phone layout: the request flows top to bottom, then splits. */}
      <svg className="d-narrow" viewBox="0 0 320 416" width="100%">
        <defs>
          <marker
            id="ag-arrow-n"
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
          <rect x="0" y="0" width="312" height="34" className="stroke fill-bg" />
          <text x="156" y="21" textAnchor="middle" className="tiny">
            CUSTOMER&apos;S AGENT
          </text>

          <g style={{ color: "var(--rule-strong)" }}>
            <line
              x1={156}
              y1={34}
              x2={156}
              y2={54}
              className="stroke"
              markerEnd="url(#ag-arrow-n)"
            />
          </g>

          {gates.map((g, i) => (
            <g key={g.label} transform={`translate(0, ${58 + i * 54})`}>
              <rect
                x="0"
                y="0"
                width="312"
                height="46"
                className="stroke-accent fill-elev"
                strokeWidth="1.25"
              />
              <text x="12" y="17" className="label-accent">
                {g.label}
              </text>
              <text x="12" y="35" className="serif">
                {g.text}
              </text>
            </g>
          ))}

          <g style={{ color: "var(--rule-strong)" }}>
            <line x1={156} y1={220} x2={156} y2={230} className="stroke" />
            <line x1={75} y1={230} x2={237} y2={230} className="stroke" />
            <line
              x1={75}
              y1={230}
              x2={75}
              y2={250}
              className="stroke"
              markerEnd="url(#ag-arrow-n)"
            />
            <line
              x1={237}
              y1={230}
              x2={237}
              y2={250}
              className="stroke"
              strokeDasharray="3 3"
              markerEnd="url(#ag-arrow-n)"
            />
          </g>

          <g transform="translate(0, 254)">
            <rect
              x="0"
              y="0"
              width="150"
              height="62"
              className="stroke fill-elev"
              strokeWidth="1.5"
            />
            <text x="10" y="17" className="tiny">
              ~95% · ROUTINE
            </text>
            <text x="10" y="35" className="serif">
              shared commerce
            </text>
            <text x="10" y="51" className="serif">
              services
            </text>
          </g>
          <g transform="translate(162, 254)">
            <rect
              x="0"
              y="0"
              width="150"
              height="62"
              className="stroke fill-elev"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
            <text x="10" y="17" className="tiny">
              ~5% · UNCERTAIN
            </text>
            <text x="10" y="35" className="serif">
              a person who
            </text>
            <text x="10" y="51" className="serif">
              knows the account
            </text>
          </g>

          <g transform="translate(0, 328)">
            <rect
              x="0"
              y="0"
              width="312"
              height="62"
              className="stroke-accent fill-elev"
              strokeDasharray="2 3"
            />
            <text x="12" y="18" className="label-accent">
              AUDIT AND LIABILITY · 04
            </text>
            <text x="12" y="36" className="serif">
              what was requested · what came back
            </text>
            <text x="12" y="52" className="serif">
              what was approved · what happened
            </text>
          </g>

          <text className="tiny" x="0" y="408" style={{ letterSpacing: "0.04em" }}>
            a record both parties can inspect
          </text>
        </g>
      </svg>
    </Diagram>
  );
}
