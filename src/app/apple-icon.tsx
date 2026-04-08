import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#1c1917",
          borderRadius: 32,
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            color: "#fafaf9",
            letterSpacing: "-0.05em",
          }}
        >
          JC
        </div>
      </div>
    ),
    { ...size },
  );
}
