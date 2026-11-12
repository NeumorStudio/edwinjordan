import Link from "next/link";
import { LogoN } from "./Logo";
import { SITIO } from "@/lib/datos";

export function Cabecera() {
  return (
    <header className="cabecera">
      <div className="contenedor cabecera__fila">
        <Link href="/" className="cabecera__marca">
          <LogoN alto={20} />
          <span>{SITIO.nombreCorto}</span>
        </Link>
        <nav aria-label="Principal" className="cabecera__nav">
          <Link href="/#skills">Skills</Link>
          <Link href="/encargo" className="boton boton--tinta boton--peque">
            Pide tu vídeo
          </Link>
        </nav>
      </div>
    </header>
  );
}
