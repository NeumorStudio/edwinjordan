import type { MetadataRoute } from "next";
import { SITIO, SKILLS } from "@/lib/datos";

export default function sitemap(): MetadataRoute.Sitemap {
  const hoy = new Date();
  return [
    { url: SITIO.url, lastModified: hoy, priority: 1 },
    ...SKILLS.map((skill) => ({ url: `${SITIO.url}/skills/${skill.slug}`, lastModified: hoy, priority: 0.8 })),
    { url: `${SITIO.url}/encargo`, lastModified: hoy, priority: 0.8 },
    { url: `${SITIO.url}/privacidad`, lastModified: hoy, priority: 0.2 },
  ];
}
