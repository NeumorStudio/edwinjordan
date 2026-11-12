import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { euros, precioDesde } from "@/lib/datos";

// Imagen que sale al compartir el enlace en WhatsApp, LinkedIn, Instagram…
export const alt = "Edwin Jordan · Skills gratis y vídeos en motion graphics";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ImagenCompartir() {
  const foto = await readFile(join(process.cwd(), "public", "edwin.jpg"));
  const fotoUrl = `data:image/jpeg;base64,${foto.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FBFAF8",
          color: "#17181F",
          padding: "68px 76px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={fotoUrl} width={96} height={96} alt="" style={{ borderRadius: 48 }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 36, fontWeight: 700 }}>Edwin Jordan</div>
            <div style={{ fontSize: 26, color: "#6B6A66" }}>edwinjordan.neumorstudio.com</div>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 700, letterSpacing: -3, lineHeight: 1.04, maxWidth: 960 }}>
          Vídeos de producto en motion graphics.
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 30 }}>
          <div style={{ display: "flex", background: "#17181F", color: "#FBFAF8", padding: "14px 26px", borderRadius: 16 }}>
            Skills gratis en GitHub
          </div>
          <div style={{ display: "flex", border: "2px solid #17181F", padding: "12px 26px", borderRadius: 16 }}>
            {`Vídeos desde ${euros(precioDesde())}`}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
