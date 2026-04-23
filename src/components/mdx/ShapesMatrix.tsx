import Diagram from "./Diagram";

export default function ShapesMatrix() {
  return (
    <Diagram
      title="Shapes of Bad Product Data"
      fig="Fig. 02"
      caption="Most distributors spend their data-quality budget where the problems are easiest to see. Shape D is where the spend should go."
    >
      <svg
        viewBox="0 0 640 340"
        width="100%"
        height="340"
        preserveAspectRatio="xMidYMid meet"
      >
        <g>
          <line x1="80" y1="40" x2="80" y2="280" className="stroke" />
          <line x1="80" y1="280" x2="600" y2="280" className="stroke" />
          <text x="70" y="40" textAnchor="end" className="tiny">HIGH</text>
          <text x="70" y="280" textAnchor="end" className="tiny">LOW</text>
          <text
            x="30"
            y="160"
            className="tiny"
            transform="rotate(-90 30 160)"
            textAnchor="middle"
          >
            COST TO THE BUSINESS
          </text>
          <text x="80" y="300" className="tiny">HARD TO DETECT</text>
          <text x="600" y="300" textAnchor="end" className="tiny">EASY TO DETECT</text>
          <text x="340" y="320" textAnchor="middle" className="tiny">DETECTABILITY</text>

          <line x1="340" y1="40" x2="340" y2="280" className="anno-line" />
          <line x1="80" y1="160" x2="600" y2="160" className="anno-line" />
        </g>

        <g transform="translate(170, 80)">
          <rect
            x="-42"
            y="-16"
            width="84"
            height="30"
            className="stroke-accent fill-elev"
            strokeWidth="1.25"
          />
          <text x="0" y="4" textAnchor="middle" className="label-accent">
            SHAPE · D
          </text>
          <text x="0" y="40" textAnchor="middle" className="serif">Untyped</text>
          <text
            x="0"
            y="56"
            textAnchor="middle"
            className="tiny"
            style={{ letterSpacing: "0.04em" }}
          >
            invisible to systems
          </text>
        </g>

        <g transform="translate(240, 190)">
          <rect x="-42" y="-16" width="84" height="30" className="stroke fill-bg" />
          <text x="0" y="4" textAnchor="middle" className="tiny">SHAPE · C</text>
          <text x="0" y="40" textAnchor="middle" className="serif">Inconsistent</text>
        </g>

        <g transform="translate(430, 130)">
          <rect x="-42" y="-16" width="84" height="30" className="stroke fill-bg" />
          <text x="0" y="4" textAnchor="middle" className="tiny">SHAPE · B</text>
          <text x="0" y="40" textAnchor="middle" className="serif">Wrong</text>
          <text
            x="0"
            y="56"
            textAnchor="middle"
            className="tiny"
            style={{ letterSpacing: "0.04em" }}
          >
            silent until a call
          </text>
        </g>

        <g transform="translate(530, 230)">
          <rect x="-42" y="-16" width="84" height="30" className="stroke fill-bg" />
          <text x="0" y="4" textAnchor="middle" className="tiny">SHAPE · A</text>
          <text x="0" y="40" textAnchor="middle" className="serif">Missing</text>
          <text
            x="0"
            y="56"
            textAnchor="middle"
            className="tiny"
            style={{ letterSpacing: "0.04em" }}
          >
            NOT NULL catches
          </text>
        </g>

        <g transform="translate(530, 255)">
          <circle
            cx="0"
            cy="0"
            r="32"
            className="stroke-accent"
            strokeDasharray="3 3"
            fill="none"
          />
          <line x1="15" y1="-26" x2="55" y2="-55" className="anno-line" />
          <text x="58" y="-58" className="label-accent">BUDGET SPENT HERE</text>
        </g>

        <g transform="translate(170, 85)">
          <circle
            cx="0"
            cy="0"
            r="32"
            className="stroke-accent"
            strokeDasharray="3 3"
            fill="none"
          />
          <line x1="-22" y1="-22" x2="-50" y2="-52" className="anno-line" />
          <text x="-52" y="-55" className="label-accent">SPEND HERE INSTEAD</text>
        </g>
      </svg>
    </Diagram>
  );
}
