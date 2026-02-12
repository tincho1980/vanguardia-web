import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function TwitterImage() {
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
            fontSize: 30,
            letterSpacing: 5,
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          Experiencia artistica cinematografica
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 900,
            lineHeight: 1.08,
            textTransform: "uppercase",
            letterSpacing: -1,
          }}
        >
          Vanguardia by Negrovski
        </div>
      </div>
    ),
    size
  );
}
