import { PRECIOS, euros, hayLanzamiento } from "@/lib/datos";

export function Precios() {
  const { lanzamiento } = PRECIOS;
  return (
    <div className="precios">
      <article className="precio">
        <h3 className="precio__duracion">Hasta 30 s</h3>
        <p className="precio__cifra">{euros(PRECIOS.hasta30)}</p>
        {hayLanzamiento() && (
          <p className="precio__lanzamiento">
            <strong>Lanzamiento: {euros(lanzamiento.precio)}</strong>
            <span>
              Para los {lanzamiento.plazasTotales} primeros, a cambio de poder enseñar tu vídeo. Quedan{" "}
              {lanzamiento.plazasLibres} de {lanzamiento.plazasTotales} plazas.
            </span>
          </p>
        )}
      </article>
      <article className="precio">
        <h3 className="precio__duracion">Hasta 60 s</h3>
        <p className="precio__cifra">{euros(PRECIOS.hasta60)}</p>
        <p className="precio__nota">Para explicar tu producto o tu negocio entero.</p>
      </article>
    </div>
  );
}
