import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Bryker & Co. Premium operating partner for consumer brands"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1E2D3D",
          padding: 80,
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            letterSpacing: "0.15em",
            color: "#FFFFFF",
            fontFamily: "serif",
            marginBottom: 24,
          }}
        >
          BRYKER & CO.
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#A8BDCF",
            fontFamily: "sans-serif",
            textAlign: "center",
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          The operating partner for high-growth consumer brands.
        </div>
      </div>
    ),
    { ...size },
  )
}
