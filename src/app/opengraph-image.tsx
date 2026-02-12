import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#080606",
          color: "#ffffff",
          padding: "64px",
          textAlign: "center",
          fontFamily: "Montserrat, Arial, sans-serif",
        }}
      >
        <div
          style={{
            color: "#972528",
            fontSize: 34,
            letterSpacing: 6,
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Fotografia Boudoir de Alta Gama
        </div>
        <div
          style={{
            fontSize: 82,
            fontWeight: 900,
            lineHeight: 1.05,
            textTransform: "uppercase",
            letterSpacing: -1.5,
          }}
        >
          Vanguardia
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 52,
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          by Negrovski
        </div>
      </div>
    ),
    size
  );
}
