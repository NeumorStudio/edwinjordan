import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Comando } from "@/components/Copiar";
import { IconoGitHub } from "@/components/Iconos";
import { SKILLS, euros, precioDesde, skillPorSlug } from "@/lib/datos";

// Solo existen las skills de lib/datos.ts; cualquier otra dirección da 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return SKILLS.map((skill) => ({ slug: skill.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const skill = skillPorSlug(slug);
  if (!skill) return {};
  return {
    title: `${skill.nombre}: skill gratis`,
    description: skill.resumen,
    alternates: { canonical: `/skills/${skill.slug}` },
  };
}

export default async function PaginaSkill({ params }: Props) {
  const { slug } = await params;
  const skill = skillPorSlug(slug);
  if (!skill) notFound();

  return (
    <div className="contenedor">
      <Link href="/#skills" className="volver">
        ← Todas las skills
      </Link>

      <header className="skill-cabeza">
        <ul className="etiquetas">
          <li className="etiqueta etiqueta--tinta">Gratis</li>
          <li className="etiqueta">v{skill.version}</li>
          {skill.etiquetas.map((etiqueta) => (
            <li className="etiqueta" key={etiqueta}>
              {etiqueta}
            </li>
          ))}
        </ul>
        <h1>{skill.nombre}</h1>
        <p className="seccion__entrada">{skill.resumen}</p>
        <div className="botones">
          <a href={skill.enlace} className="boton boton--tinta">
            <IconoGitHub />
            Abrir en GitHub
          </a>
        </div>
        <p className="estrella">Es gratis. Si te sirve, dale una ⭐ en GitHub: así llega a más gente.</p>
      </header>

      <section className="bloque">
        <h2>Qué hace</h2>
        <ul className="puntos">
          {skill.hace.map((punto) => (
            <li key={punto}>{punto}</li>
          ))}
        </ul>
      </section>

      <section className="bloque">
        <h2>Cómo se instala</h2>
        <div className="instalar">
          {skill.instalacion.map((forma) => (
            <div key={forma.titulo}>
              <h3>{forma.titulo}</h3>
              {forma.nota && <p>{forma.nota}</p>}
              {forma.comandos.map((comando) => (
                <Comando key={comando} texto={comando} />
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="bloque">
        <h2>Qué necesitas</h2>
        <ul className="puntos">
          {skill.necesitas.map((punto) => (
            <li key={punto}>{punto}</li>
          ))}
        </ul>
      </section>

      <aside className="llamada">
        <h2>¿Prefieres no instalar nada?</h2>
        <p>
          Te hago el vídeo en motion graphics, con tu marca y con voz. Desde {euros(precioDesde())}.
        </p>
        <div className="botones">
          <Link href="/encargo" className="boton boton--claro">
            Pide tu vídeo
          </Link>
        </div>
      </aside>
    </div>
  );
}
