import type { Metadata } from "next";
import { Formulario } from "./Formulario";
import { PRECIOS, euros, hayLanzamiento } from "@/lib/datos";

export const metadata: Metadata = {
  title: "Pide tu vídeo",
  description:
    "Vídeo vertical en motion graphics con tu marca y con voz. Hasta 30 s por 150 € y hasta 60 s por 300 €. Entrega en 7 días.",
  alternates: { canonical: "/encargo" },
};

export default function Encargo() {
  const { lanzamiento } = PRECIOS;
  return (
    <div className="contenedor formulario-pagina">
      <p className="antetitulo">Vídeo en motion graphics</p>
      <h1>Pide tu vídeo</h1>
      <p className="seccion__entrada">
        Cuéntame qué haces y qué quieres contar. Te respondo por correo con una propuesta y el precio cerrado.
      </p>

      <div className="formulario-rejilla">
        <Formulario />

        <aside className="resumen" aria-label="Precios">
          <h2>Precios</h2>
          <dl>
            <div>
              <dt>Hasta 30 s</dt>
              <dd>{euros(PRECIOS.hasta30)}</dd>
            </div>
            {hayLanzamiento() && (
              <div>
                <dt>Lanzamiento, 30 s</dt>
                <dd>{euros(lanzamiento.precio)}</dd>
              </div>
            )}
            <div>
              <dt>Hasta 60 s</dt>
              <dd>{euros(PRECIOS.hasta60)}</dd>
            </div>
            <div>
              <dt>Otro formato o más cambios</dt>
              <dd>+{euros(PRECIOS.extraFormato)}</dd>
            </div>
            <div>
              <dt>Urgente, 72&nbsp;h</dt>
              <dd>+{PRECIOS.urgentePorcentaje}&nbsp;%</dd>
            </div>
          </dl>
          {hayLanzamiento() && (
            <p>
              El precio de lanzamiento es para los {lanzamiento.plazasTotales} primeros, a cambio de poder enseñar su
              vídeo. Quedan {lanzamiento.plazasLibres}.
            </p>
          )}
          <p>
            Entrega en {PRECIOS.diasEntrega} días, con una ronda de cambios. Se paga por adelantado. Tú pones el logo,
            los colores y las capturas.
          </p>
        </aside>
      </div>
    </div>
  );
}
