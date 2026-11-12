// La versión y las novedades de cada skill se leen de su repositorio público, así la web nunca se queda
// atrás: basta con publicar la versión en GitHub. Vercel las vuelve a leer como mucho una vez por hora.
// Si GitHub no responde, la página sale igual con la versión de lib/datos.ts y sin novedades.
import type { Skill } from "./datos";

const REPO = "EdwinJordanHerbas/motion-skills";
const CRUDO = `https://raw.githubusercontent.com/${REPO}/main/skills`;

export type Version = {
  numero: string;
  fecha: string;
  entrada: string[];
  cambios: string[];
};

export type EstadoSkill = {
  version: string;
  novedades: Version[];
  changelog: string;
};

async function leer(ruta: string): Promise<string | null> {
  try {
    const respuesta = await fetch(`${CRUDO}/${ruta}`, { next: { revalidate: 3600 } });
    return respuesta.ok ? await respuesta.text() : null;
  } catch {
    return null;
  }
}

// La versión está en la cabecera de SKILL.md, dentro de `metadata:`, como `version: "0.3.1"`.
export function versionDeSkillMd(texto: string): string | null {
  const cabecera = texto.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? "";
  return cabecera.match(/^\s+version:\s*["']?(\d+\.\d+\.\d+)["']?\s*$/m)?.[1] ?? null;
}

// Cada versión del CHANGELOG empieza con `## 0.3.1 · 12 nov 2026`, puede llevar un párrafo de entrada
// y sigue con una lista de `- ` (las líneas sangradas continúan el punto anterior).
export function leerChangelog(texto: string): Version[] {
  const versiones: Version[] = [];
  for (const trozo of texto.split(/^## /m).slice(1)) {
    const [titulo, ...lineas] = trozo.split(/\r?\n/);
    const [numero, fecha = ""] = titulo.split("·").map((parte) => parte.trim());
    if (!/^\d+\.\d+\.\d+$/.test(numero)) continue;
    const version: Version = { numero, fecha, entrada: [], cambios: [] };
    let enLista = false;
    for (const linea of lineas) {
      if (linea.startsWith("- ")) {
        version.cambios.push(linea.slice(2).trim());
        enLista = true;
      } else if (enLista && /^\s+\S/.test(linea) && !linea.trimStart().startsWith("```")) {
        version.cambios[version.cambios.length - 1] += ` ${linea.trim()}`;
      } else if (!enLista && linea.trim() && !linea.trimStart().startsWith("```")) {
        version.entrada.push(linea.trim());
      }
    }
    versiones.push(version);
  }
  return versiones;
}

export async function estadoSkill(skill: Skill): Promise<EstadoSkill> {
  const [skillMd, changelog] = await Promise.all([leer(`${skill.slug}/SKILL.md`), leer(`${skill.slug}/CHANGELOG.md`)]);
  return {
    version: (skillMd && versionDeSkillMd(skillMd)) || skill.version,
    novedades: changelog ? leerChangelog(changelog) : [],
    changelog: `https://github.com/${REPO}/blob/main/skills/${skill.slug}/CHANGELOG.md`,
  };
}

// Los enlaces relativos del CHANGELOG (`references/sonido.md`) apuntan a la carpeta de la skill en GitHub.
export function enlaceDelRepo(skill: Skill, destino: string): string | null {
  try {
    const url = new URL(destino, `https://github.com/${REPO}/blob/main/skills/${skill.slug}/`);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}
