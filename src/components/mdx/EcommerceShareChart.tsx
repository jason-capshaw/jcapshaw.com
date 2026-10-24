import Diagram from "./Diagram";

/**
 * Ecommerce share of digitally captured orders by distributor revenue tier.
 * Single series, so no legend; each bar is direct-labeled.
 * Source: WizCommerce data on 250+ wholesalers, reported by Distribution
 * Strategy Group, October 1, 2026.
 */
const TIERS = [
  { label: "Under $5M", value: 34 },
  { label: "$5M to $15M", value: 40.7 },
  { label: "$15M and up", value: 63.5 },
];

const PLOT_X = 150;
const PLOT_W = 500;
const BAR_H = 26;
const ROW_H = 48;
const TOP = 34;

// Phone layout: labels sit above full-width bars.
const N_X = 4;
const N_W = 250;
const N_ROW = 56;
const N_TOP = 26;

const ARIA_LABEL =
  "Bar chart. Ecommerce share of digitally captured orders: 34 percent for distributors under 5 million dollars in revenue, 40.7 percent for 5 to 15 million, 63.5 percent for 15 million and up.";

export default function EcommerceShareChart() {
  const ticks = [0, 25, 50, 75, 100];
  const plotH = TIERS.length * ROW_H;
  const nPlotH = TIERS.length * N_ROW;
  return (
    <Diagram
      title="Ecommerce Share of Digital Orders"
      fig="Fig. 01"
      caption={
        <>
          Share of digitally captured orders placed through ecommerce, by
          distributor annual revenue. The remainder are entered by sales
          representatives. Not a share of all orders or of revenue. Source:{" "}
          <a href="https://distributionstrategy.com/2026/10/ecommerce-takes-larger-share-of-distributor-orders-as-companies-scale/">
            WizCommerce data on more than 250 wholesalers, reported by
            Distribution Strategy Group, October 2026
          </a>
          .
        </>
      }
    >
      <svg
        className="d-wide"
        viewBox="0 0 720 220"
        width="100%"
        height="220"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={ARIA_LABEL}
      >
        <text className="tiny" x={PLOT_X} y={14}>
          ECOMMERCE SHARE OF DIGITALLY CAPTURED ORDERS · %
        </text>

        {ticks.map((t) => {
          const x = PLOT_X + (t / 100) * PLOT_W;
          return (
            <g key={t}>
              <line
                x1={x}
                y1={TOP - 6}
                x2={x}
                y2={TOP + plotH}
                stroke="var(--rule)"
                strokeWidth={t === 0 ? 1.25 : 1}
                strokeDasharray={t === 0 ? undefined : "2 3"}
                style={t === 0 ? { stroke: "var(--rule-strong)" } : undefined}
              />
              <text
                className="tiny"
                x={x}
                y={TOP + plotH + 16}
                textAnchor={t === 0 ? "start" : t === 100 ? "end" : "middle"}
              >
                {t}
              </text>
            </g>
          );
        })}

        {TIERS.map((tier, i) => {
          const y = TOP + i * ROW_H + (ROW_H - BAR_H) / 2;
          const w = (tier.value / 100) * PLOT_W;
          return (
            <g key={tier.label}>
              <text
                className="serif"
                x={PLOT_X - 14}
                y={y + BAR_H / 2 + 4}
                textAnchor="end"
              >
                {tier.label}
              </text>
              <rect
                x={PLOT_X}
                y={y}
                width={w}
                height={BAR_H}
                className="fill-accent"
                rx="0"
              >
                <title>{`${tier.label}: ${tier.value}% of digitally captured orders via ecommerce`}</title>
              </rect>
              <text
                x={PLOT_X + w + 8}
                y={y + BAR_H / 2 + 4}
                style={{ fontSize: 11, letterSpacing: "0.02em" }}
              >
                {tier.value}%
              </text>
            </g>
          );
        })}

        <text
          className="tiny"
          x={PLOT_X + PLOT_W}
          y={TOP + plotH + 36}
          textAnchor="end"
          style={{ letterSpacing: "0.04em" }}
        >
          remainder entered by sales representatives
        </text>
      </svg>

      <svg
        className="d-narrow"
        viewBox="0 0 320 246"
        width="100%"
        role="img"
        aria-label={ARIA_LABEL}
      >
        <text className="tiny" x={N_X} y={12}>
          ECOMMERCE SHARE OF DIGITAL ORDERS · %
        </text>

        {ticks.map((t) => {
          const x = N_X + (t / 100) * N_W;
          return (
            <g key={t}>
              <line
                x1={x}
                y1={N_TOP}
                x2={x}
                y2={N_TOP + nPlotH}
                stroke="var(--rule)"
                strokeWidth={t === 0 ? 1.25 : 1}
                strokeDasharray={t === 0 ? undefined : "2 3"}
                style={t === 0 ? { stroke: "var(--rule-strong)" } : undefined}
              />
              <text
                className="tiny"
                x={x}
                y={N_TOP + nPlotH + 16}
                textAnchor={t === 0 ? "start" : t === 100 ? "end" : "middle"}
              >
                {t}
              </text>
            </g>
          );
        })}

        {TIERS.map((tier, i) => {
          const y = N_TOP + i * N_ROW;
          const w = (tier.value / 100) * N_W;
          return (
            <g key={tier.label}>
              <text className="serif" x={N_X + 6} y={y + 18}>
                {tier.label}
              </text>
              <rect
                x={N_X}
                y={y + 26}
                width={w}
                height={20}
                className="fill-accent"
                rx="0"
              >
                <title>{`${tier.label}: ${tier.value}% of digitally captured orders via ecommerce`}</title>
              </rect>
              <text
                x={N_X + w + 8}
                y={y + 40}
                style={{ fontSize: 11, letterSpacing: "0.02em" }}
              >
                {tier.value}%
              </text>
            </g>
          );
        })}

        <text
          className="tiny"
          x={N_X}
          y={N_TOP + nPlotH + 36}
          style={{ letterSpacing: "0.04em" }}
        >
          remainder entered by sales representatives
        </text>
      </svg>
    </Diagram>
  );
}
