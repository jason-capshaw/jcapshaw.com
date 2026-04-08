import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 4,
        }}
      >
        <div
          style={{
            fontSize: 18,
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
