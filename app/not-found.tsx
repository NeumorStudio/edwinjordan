import Link from "next/link";

export default function NoEncontrada() {
  return (
    <div className="contenedor texto-largo">
      <h1>Esta página no existe</h1>
      <p>Puede que el enlace esté mal escrito o que la página ya no esté.</p>
      <div className="botones" style={{ marginTop: 24 }}>
        <Link href="/" className="boton boton--tinta">
          Ir al inicio
        </Link>
      </div>
    </div>
  );
}
