import Link from "next/link";
import { LogoN } from "./Logo";
import { SITIO } from "@/lib/datos";

export function Pie() {
  return (
    <footer className="pie">
      <div className="contenedor pie__fila">
        <div className="pie__quien">
          <strong>{SITIO.nombre}</strong>
          <span>
            Cofundador de{" "}
            <a href={SITIO.neumorstudio} className="enlace">
              NeumorStudio
            </a>{" "}
            · {SITIO.ciudad}
          </span>
        </div>
        <ul className="pie__enlaces">
          <li>
            <a href={SITIO.github} className="enlace" rel="me">
              GitHub
            </a>
          </li>
          <li>
            <a href={SITIO.linkedin} className="enlace" rel="me">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={`mailto:${SITIO.correo}`} className="enlace">
              {SITIO.correo}
            </a>
          </li>
          <li>
            <Link href="/privacidad" className="enlace">
              Privacidad
            </Link>
          </li>
        </ul>
      </div>
      <div className="contenedor pie__marca">
        <LogoN alto={14} />
        <span>Una página de neumorstudio.com</span>
      </div>
    </footer>
  );
}
