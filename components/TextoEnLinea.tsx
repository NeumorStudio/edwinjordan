import type { ReactNode } from "react";

// Lo justo de Markdown para el CHANGELOG: **negrita**, `código` y [enlaces](url). Todo sale como elementos
// de React, sin HTML crudo, y un enlace solo se pinta si `resolver` lo da por bueno.
const MARCAS = /\*\*(.+?)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)\s]+)\)/g;

type Props = {
  texto: string;
  resolver: (destino: string) => string | null;
};

function trozos(texto: string, resolver: Props["resolver"], prefijo: string): ReactNode[] {
  const salida: ReactNode[] = [];
  let desde = 0;
  for (const marca of texto.matchAll(MARCAS)) {
    const [entera, negrita, codigo, etiqueta, destino] = marca;
    const clave = `${prefijo}${marca.index}`;
    if (marca.index > desde) salida.push(texto.slice(desde, marca.index));
    if (negrita !== undefined) {
      salida.push(<strong key={clave}>{trozos(negrita, resolver, `${clave}-`)}</strong>);
    } else if (codigo !== undefined) {
      salida.push(<code key={clave}>{codigo}</code>);
    } else {
      const url = resolver(destino);
      const contenido = trozos(etiqueta, resolver, `${clave}-`);
      salida.push(
        url ? (
          <a key={clave} href={url} className="enlace">
            {contenido}
          </a>
        ) : (
          <span key={clave}>{contenido}</span>
        ),
      );
    }
    desde = marca.index + entera.length;
  }
  if (desde < texto.length) salida.push(texto.slice(desde));
  return salida;
}

export function TextoEnLinea({ texto, resolver }: Props) {
  return <>{trozos(texto, resolver, "m")}</>;
}
