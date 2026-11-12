import type { ReactNode } from "react";
import type { Video } from "@/lib/datos";

// Un vídeo vertical con su pie. Si no le pasas otro pie, usa el del vídeo.
export function FiguraVideo({ video, children }: { video: Video; children?: ReactNode }) {
  return (
    <figure className="video">
      <video controls playsInline preload="none" poster={video.poster} width={720} height={1280}>
        <source src={video.src} type="video/mp4" />
      </video>
      <figcaption>{children ?? video.pie}</figcaption>
    </figure>
  );
}
