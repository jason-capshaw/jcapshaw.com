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

  // Phone layout: rungs stack top to bottom, highest risk first, each
  // indented a step further than the one below it.
  const narrowRows = rungs
    .map((r, i) => ({ ...r, i, height: 50 + r.lines.length * 15 }))
    .reverse();
  const narrow = narrowRows.map((r, k) => ({
    ...r,
    y: 22 + narrowRows.slice(0, k).reduce((sum, p) => sum + p.height + 8, 0),
  }));
  const last = narrow[narrow.length - 1];
  const narrowBottom = last.y + last.height;
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
        className="d-wide"
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

      <svg
        className="d-narrow"
        viewBox={`0 0 320 ${narrowBottom + 24}`}
        width="100%"
      >
        <defs>
          <marker
            id="ladder-arrow-n"
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

        <text className="tiny" x="20" y="12" style={{ letterSpacing: "0.04em" }}>
          higher risk · expand when proven
        </text>
        <g style={{ color: "var(--rule-strong)" }}>
          <line
            x1={8}
            y1={narrowBottom}
            x2={8}
            y2={24}
            className="stroke"
            markerEnd="url(#ladder-arrow-n)"
          />
        </g>

        {narrow.map((r) => {
          const acts = r.i >= 2;
          const x = 20 + r.i * 16;
          return (
            <g key={r.title} transform={`translate(${x}, ${r.y})`}>
              <rect
                x="0"
                y="0"
                width={316 - x}
                height={r.height}
                className={acts ? "stroke-accent fill-elev" : "stroke fill-elev"}
                strokeWidth={r.i === 3 ? 1.5 : 1.25}
              />
              <text x="12" y="17" className={acts ? "label-accent" : "tiny"}>
                {`RUNG · 0${r.i + 1}`}
              </text>
              <text x="12" y="36" className="serif" style={{ fontSize: 14 }}>
                {r.title}
              </text>
              {r.lines.map((line, j) => (
                <text
                  key={line}
                  x="12"
                  y={54 + j * 15}
                  className="serif"
                  style={{ fill: "var(--ink-dim)" }}
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}

        <text
          className="tiny"
          x="20"
          y={narrowBottom + 18}
          style={{ letterSpacing: "0.04em" }}
        >
          lower risk · start here
        </text>
      </svg>
    </Diagram>
  );
}
