import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Cabecera } from "@/components/Cabecera";
import { Pie } from "@/components/Pie";
import { SITIO } from "@/lib/datos";

const geist = Geist({ subsets: ["latin"], display: "swap", variable: "--fuente" });

const descripcion =
  "Skills gratis para que tu IA haga vídeos de producto en motion graphics. Y si prefieres no instalar nada, te hago el vídeo.";

export const metadata: Metadata = {
  metadataBase: new URL(SITIO.url),
  title: {
    default: "Edwin Jordan · Skills gratis y vídeos en motion graphics",
    template: "%s · Edwin Jordan",
  },
  description: descripcion,
  authors: [{ name: SITIO.nombre, url: SITIO.github }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Edwin Jordan",
    title: "Edwin Jordan · Skills gratis y vídeos en motion graphics",
    description: descripcion,
    url: SITIO.url,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#FBFAF8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={geist.variable}>
      <body>
        <a href="#contenido" className="saltar">
          Ir al contenido
        </a>
        <Cabecera />
        <main id="contenido">{children}</main>
        <Pie />
      </body>
    </html>
  );
}
