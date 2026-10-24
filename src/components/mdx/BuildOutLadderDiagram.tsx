import Diagram from "./Diagram";

/**
 * The build-out ladder: four rungs of access for a customer's software,
 * ordered by risk. Each rung depends on the ones below it.
 */
export default function BuildOutLadderDiagram() {
  const rungs = [
    { title: "Read public data", lines: ["products · attributes", "documents · relationships"] },
    { title: "Read account data", lines: ["negotiated price", "availability by ship-to", "order status · invoices"] },
    { title: "Prepare", lines: ["draft quotes and orders", "for a person to review"] },
    { title: "Commit", lines: ["submit approved repeat", "orders; recheck price,", "availability, authority"] },
  ];
  const baseline = 240;
  return (
    <Diagram
      title="The Build-Out Ladder"
      fig="Fig. 04"
      caption="Each rung needs the permissions and data quality of the ones below it. Start at the bottom with one customer and one recurring workflow, and climb when it's proven valuable and reliable."
      legend={[
        { label: "read", kind: "" },
        { label: "act on the customer's behalf", kind: "accent" },
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
            id="ladder-arrow"
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

        {rungs.map((r, i) => {
          const height = 86 + i * 40;
          const acts = i >= 2;
          return (
            <g
              key={r.title}
              transform={`translate(${22 + i * 172}, ${baseline - height})`}
            >
              <rect
                x="0"
                y="0"
                width="160"
                height={height}
                className={acts ? "stroke-accent fill-elev" : "stroke fill-elev"}
                strokeWidth={i === 3 ? 1.5 : 1.25}
              />
              <text x="12" y="19" className={acts ? "label-accent" : "tiny"}>
                {`RUNG · 0${i + 1}`}
              </text>
              <text x="12" y="39" className="serif" style={{ fontSize: 14 }}>
                {r.title}
              </text>
              {r.lines.map((line, j) => (
                <text
                  key={line}
                  x="12"
                  y={58 + j * 15}
                  className="serif"
                  style={{ fill: "var(--ink-dim)" }}
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}

        <g style={{ color: "var(--rule-strong)" }}>
          <line
            x1={22}
            y1={262}
            x2={698}
            y2={262}
            className="stroke"
            markerEnd="url(#ladder-arrow)"
          />
        </g>
        <text className="tiny" x="22" y="284" style={{ letterSpacing: "0.04em" }}>
          lower risk · start here
        </text>
        <text
          className="tiny"
          x="698"
          y="284"
          textAnchor="end"
          style={{ letterSpacing: "0.04em" }}
        >
          higher risk · expand when proven
        </text>
      </svg>
    </Diagram>
  );
}
