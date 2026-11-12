// Todo lo que cambia a menudo está aquí: plazas de lanzamiento, precios y skills.

export const SITIO = {
  url: "https://edwinjordan.neumorstudio.com",
  nombre: "Edwin Jordan Herbas",
  nombreCorto: "Edwin Jordan",
  ciudad: "Sevilla",
  correo: "info@neumorstudio.com",
  github: "https://github.com/EdwinJordanHerbas",
  linkedin: "https://www.linkedin.com/in/edwin-jordan-herbas",
  neumorstudio: "https://www.neumorstudio.com",
  repoSkills: "https://github.com/EdwinJordanHerbas/motion-skills",
};

export const PRECIOS = {
  hasta30: 150,
  hasta60: 300,
  lanzamiento: {
    precio: 100,
    plazasTotales: 5,
    // Bájalo en 1 con cada encargo de lanzamiento. A 0 desaparece la oferta.
    plazasLibres: 5,
  },
  extraFormato: 20,
  extraCambios: 20,
  urgentePorcentaje: 50,
  diasEntrega: 7,
};

export const hayLanzamiento = () => PRECIOS.lanzamiento.plazasLibres > 0;
export const precioDesde = () => (hayLanzamiento() ? PRECIOS.lanzamiento.precio : PRECIOS.hasta30);

export type Instalacion = {
  titulo: string;
  nota?: string;
  comandos: string[];
};

export type Skill = {
  slug: string;
  nombre: string;
  version: string;
  etiquetas: string[];
  resumen: string;
  hace: string[];
  instalacion: Instalacion[];
  necesitas: string[];
  enlace: string;
};

export const SKILLS: Skill[] = [
  {
    slug: "video-demo-saas",
    nombre: "Vídeo demo de tu producto",
    version: "0.2",
    etiquetas: ["Remotion", "three.js", "Probada con Claude Code"],
    resumen:
      "Una plantilla de vídeo vertical de 33 s y el método para que tu IA la adapte: tu interfaz real dentro de dispositivos 3D, rótulos que se leen sin sonido y transiciones conectadas.",
    hace: [
      "Un solo plano continuo de 33 s en vertical (1080×1920), listo para Reels, TikTok y Shorts.",
      "Tu interfaz real y nítida dentro de portátiles y móviles en 3D, modelados en código.",
      "Rótulos que se entienden sin sonido y un sonido sin silencios muertos.",
      "Todo lo que cambia de un vídeo a otro está en un solo archivo: nombre, colores, textos, capturas y sonido.",
      "Le pides a tu IA «hazme un vídeo demo de mi producto con la plantilla» y la adapta, o construye otra historia con el mismo método.",
    ],
    instalacion: [
      {
        titulo: "En Claude Code",
        nota: "Escríbelo en una sesión de Claude Code:",
        comandos: [
          "/plugin marketplace add EdwinJordanHerbas/motion-skills",
          "/plugin install video-demo-saas@edwinjordanherbas",
        ],
      },
      {
        titulo: "En otros agentes compatibles",
        nota: "Con la CLI de skills, desde la terminal:",
        comandos: ["npx skills add EdwinJordanHerbas/motion-skills --skill video-demo-saas"],
      },
      {
        titulo: "A mano",
        nota: "Copia la carpeta skills/video-demo-saas del repositorio a la carpeta de skills de tu agente. En Claude Code es:",
        comandos: ["~/.claude/skills/"],
      },
    ],
    necesitas: [
      "Node.js y un proyecto de Remotion 4, con three (0.18x) y @remotion/fonts.",
      "uv para los scripts de Python y ffmpeg para revisar imagen y audio.",
      "Sonido opcional con ElevenLabs y tu propia clave. Su plan gratis no permite uso comercial.",
    ],
    enlace: "https://github.com/EdwinJordanHerbas/motion-skills/tree/main/skills/video-demo-saas",
  },
];

export const skillPorSlug = (slug: string) => SKILLS.find((s) => s.slug === slug);

export const VIDEO_EJEMPLO = {
  src: "/videos/neumorstudio.mp4",
  poster: "/videos/neumorstudio.jpg",
  pie: "Ejemplo: presentación de NeumorStudio · 34 s · voz generada con IA",
};

// Espacio que no se parte (código 160): así «100 €» nunca queda en dos líneas.
const ESPACIO_FIJO = String.fromCharCode(160);
export const euros = (n: number) => `${n}${ESPACIO_FIJO}€`;
