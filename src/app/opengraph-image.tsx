import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.description;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          width: "100%",
          height: "100%",
          backgroundColor: "#fafaf9",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#1c1917",
            letterSpacing: "-0.03em",
            lineHeight: 1.2,
            marginBottom: 24,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#57534e",
            lineHeight: 1.5,
            maxWidth: 800,
          }}
        >
          {siteConfig.description}
        </div>
        <div
          style={{
            fontSize: 20,
            color: "#a8a29e",
            marginTop: 40,
            fontFamily: "monospace",
            letterSpacing: "0.05em",
          }}
        >
          jcapshaw.com
        </div>
      </div>
    ),
    { ...size },
  );
}
