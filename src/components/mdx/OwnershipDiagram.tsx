import Diagram from "./Diagram";

const nodes = [
  { x: 140, y: 50, label: "Category Mgmt", sub: "owns pricing" },
  { x: 460, y: 50, label: "Marketing", sub: "owns copy + images" },
  { x: 520, y: 200, label: "IT / Systems", sub: "owns the pipes" },
  { x: 300, y: 280, label: "Operations", sub: "owns pack sizes" },
  { x: 80, y: 200, label: "Outside Sales", sub: "owns the customer" },
];

const center = { x: 300, y: 170 };

export default function OwnershipDiagram() {
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
      <svg
        viewBox="0 0 600 330"
        width="100%"
        height="330"
        preserveAspectRatio="xMidYMid meet"
      >
        <g>
          <circle
            cx={center.x}
            cy={center.y}
            r="52"
            className="stroke-accent"
            strokeDasharray="3 3"
            fill="none"
          />
          <rect
            x={center.x - 62}
            y={center.y - 12}
            width="124"
            height="24"
            className="fill-bg"
            stroke="none"
          />
          <text
            x={center.x}
            y={center.y + 4}
            textAnchor="middle"
            className="label-accent"
          >
            CATALOG · UNOWNED
          </text>
          <text
            x={center.x}
            y={center.y + 22}
            textAnchor="middle"
            className="tiny"
            style={{ letterSpacing: "0.04em" }}
          >
            (product data)
          </text>
        </g>

        {nodes.map((n, i) => (
          <line
            key={`l-${i}`}
            x1={n.x}
            y1={n.y}
            x2={center.x}
            y2={center.y}
            className="anno-line"
          />
        ))}

        {nodes.map((n, i) => (
          <g key={`n-${i}`} transform={`translate(${n.x}, ${n.y})`}>
            <rect x="-70" y="-16" width="140" height="32" className="stroke fill-bg" />
            <text
              x="0"
              y="-2"
              textAnchor="middle"
              className="serif"
              style={{ fontSize: 12 }}
            >
              {n.label}
            </text>
            <text
              x="0"
              y="10"
              textAnchor="middle"
              className="tiny"
              style={{ letterSpacing: "0.04em" }}
            >
              {n.sub}
            </text>
          </g>
        ))}
      </svg>
    </Diagram>
  );
}
