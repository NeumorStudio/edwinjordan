import Image from "next/image";
import Link from "next/link";
import { FiguraVideo } from "@/components/FiguraVideo";
import { IconoGitHub } from "@/components/Iconos";
import { Precios } from "@/components/Precios";
import { PRECIOS, SITIO, SKILLS, VIDEO_EJEMPLO, euros, precioDesde } from "@/lib/datos";
import { estadoSkill } from "@/lib/github";

const INCLUYE = [
  "El guion del vídeo.",
  "Tu marca de principio a fin: logo, colores y tipografía.",
  "Voz en off que presenta tu negocio.",
  "Música, efectos y rótulos que se entienden sin sonido.",
  "Tu web o tu app en móviles y portátiles 3D, si la tienes.",
  "Una ronda de cambios.",
  `El MP4 vertical (1080×1920) en ${PRECIOS.diasEntrega} días.`,
];

const NO_INCLUYE = [
  "Grabaciones con cámara o actores.",
  "Diseñar un logo o una identidad desde cero.",
  "Webs, apps, gestión de redes ni anuncios de pago.",
];

export default async function Inicio() {
  const estados = await Promise.all(SKILLS.map(estadoSkill));
  const skillDelEjemplo = SKILLS.find((skill) => skill.ejemplo?.video === VIDEO_EJEMPLO);

  return (
    <>
      <section className="portada">
        <div className="contenedor">
          <Image
            src="/edwin.jpg"
            alt="Edwin Jordan Herbas"
            width={88}
            height={88}
            className="portada__foto"
            loading="eager"
          />
          <p className="antetitulo">
            {SITIO.nombre} · {SITIO.ciudad}
          </p>
          <h1>Vídeos de producto en motion graphics.</h1>
          <p className="portada__texto">
            Comparto gratis las skills con las que hago mis vídeos, para que tu IA te haga el tuyo. Y si prefieres no
            instalar nada, te lo hago yo.
          </p>
          <div className="botones">
            <a href={SITIO.repoSkills} className="boton boton--tinta">
              <IconoGitHub />
              Skills gratis en GitHub
            </a>
            <Link href="/encargo" className="boton boton--borde">
              Pide tu vídeo · desde {euros(precioDesde())}
            </Link>
          </div>
          <p className="portada__nota">Son de código abierto. Si te sirven, deja una ⭐ en GitHub.</p>
        </div>
      </section>

      <section id="skills" className="seccion">
        <div className="contenedor">
          <h2 className="seccion__titulo">Skills gratis</h2>
          <p className="seccion__entrada">
            Están en GitHub, en español y con licencia Apache 2.0. Instalas la skill en tu agente de IA, le das tus
            capturas y tus textos, y te monta el vídeo con código.
          </p>
          <div className="skills">
            {SKILLS.map((skill, i) => (
              <article className="tarjeta" key={skill.slug}>
                <ul className="etiquetas">
                  <li className="etiqueta etiqueta--tinta">Gratis</li>
                  <li className="etiqueta">v{estados[i].version}</li>
                  {skill.etiquetas.map((etiqueta) => (
                    <li className="etiqueta" key={etiqueta}>
                      {etiqueta}
                    </li>
                  ))}
                </ul>
                <h3>{skill.nombre}</h3>
                <p>{skill.resumen}</p>
                {estados[i].novedades[0]?.fecha && (
                  <p className="tarjeta__novedad">
                    Actualizada el {estados[i].novedades[0].fecha}.{" "}
                    <Link href={`/skills/${skill.slug}#novedades`} className="enlace">
                      Qué hay de nuevo
                    </Link>
                  </p>
                )}
                <div className="botones">
                  <a href={skill.enlace} className="boton boton--tinta">
                    <IconoGitHub />
                    Consíguela en GitHub
                  </a>
                  <Link href={`/skills/${skill.slug}`} className="boton boton--borde">
                    Cómo se instala
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <p className="seccion__pie">
            Para enterarte de las nuevas, sigue el{" "}
            <a href={SITIO.repoSkills} className="enlace">
              repositorio en GitHub
            </a>
            .
          </p>
        </div>
      </section>

      <section id="videos" className="seccion seccion--oscura">
        <div className="contenedor">
          <p className="antetitulo">¿No quieres instalar nada?</p>
          <h2 className="seccion__titulo">Te hago el vídeo.</h2>
          <p className="seccion__entrada">
            Un vídeo vertical en motion graphics con tu marca y con voz, para presentar tu negocio o tu producto en
            redes.
          </p>

          <div className="encargo-rejilla">
            <FiguraVideo video={VIDEO_EJEMPLO}>
              {VIDEO_EJEMPLO.pie}.
              {skillDelEjemplo && (
                <>
                  {" "}
                  Hecha con mi skill gratis{" "}
                  <Link href={`/skills/${skillDelEjemplo.slug}#ejemplo`} className="enlace">
                    {skillDelEjemplo.nombre}
                  </Link>
                  .
                </>
              )}
            </FiguraVideo>

            <div>
              <Precios />
              <div className="listas">
                <div className="lista">
                  <h3>Incluye</h3>
                  <ul>
                    {INCLUYE.map((punto) => (
                      <li key={punto}>{punto}</li>
                    ))}
                  </ul>
                </div>
                <div className="lista lista--no">
                  <h3>Solo motion graphics. No incluye:</h3>
                  <ul>
                    {NO_INCLUYE.map((punto) => (
                      <li key={punto}>{punto}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="extras texto-suave">
                Extras: otra versión en cuadrado u horizontal, o una ronda más de cambios, +{euros(PRECIOS.extraFormato)}{" "}
                cada uno. Urgente en 72&nbsp;h, +{PRECIOS.urgentePorcentaje}&nbsp;%.
              </p>
            </div>
          </div>

          <ol className="pasos">
            <li>Me cuentas tu idea en el formulario.</li>
            <li>Te respondo con una propuesta y el precio cerrado. Se paga por adelantado.</li>
            <li>En {PRECIOS.diasEntrega} días tienes tu vídeo, con una ronda de cambios incluida.</li>
          </ol>
          <p className="material texto-suave">
            Tú pones el material: logo, colores y capturas o enlaces de lo que quieras enseñar.
          </p>
          <div className="botones">
            <Link href="/encargo" className="boton boton--claro">
              Pide tu vídeo
            </Link>
          </div>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor sobre-mi">
          <Image src="/edwin.jpg" alt="" width={56} height={56} className="sobre-mi__foto" />
          <div>
            <h2>Soy Edwin</h2>
            <p>
              Cofundador de{" "}
              <a href={SITIO.neumorstudio} className="enlace">
                NeumorStudio
              </a>
              , en {SITIO.ciudad}: hacemos software a medida para negocios. Los vídeos de producto los hago con código,
              con Remotion y three.js, y en las skills está el método que sigo, explicado para que lo use tu IA.
            </p>
            <p className="sobre-mi__enlaces">
              <a href={SITIO.github} className="enlace" rel="me">
                GitHub
              </a>
              <a href={SITIO.linkedin} className="enlace" rel="me">
                LinkedIn
              </a>
              <a href={`mailto:${SITIO.correo}`} className="enlace">
                {SITIO.correo}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
