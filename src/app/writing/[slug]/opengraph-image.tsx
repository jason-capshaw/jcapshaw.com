import { ImageResponse } from "next/og";
import { getPostBySlug, getAllPosts } from "@/lib/content";

export const alt = "Article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title ?? "Article";
  const type = post?.type === "essay" ? "Essay" : "Field Note";

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
            fontSize: 16,
            color: "#57534e",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontFamily: "monospace",
            marginBottom: 20,
          }}
        >
          {type}
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#1c1917",
            letterSpacing: "-0.03em",
            lineHeight: 1.2,
            maxWidth: 960,
            marginBottom: 40,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              fontSize: 24,
              color: "#57534e",
            }}
          >
            Jason Capshaw
          </div>
          <div
            style={{
              fontSize: 20,
              color: "#a8a29e",
              fontFamily: "monospace",
              letterSpacing: "0.05em",
            }}
          >
            jcapshaw.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
