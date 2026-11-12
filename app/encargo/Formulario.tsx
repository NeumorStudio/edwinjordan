"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { enviarEncargo, type Campo, type EstadoEncargo } from "./acciones";
import { PRECIOS, SITIO, euros, hayLanzamiento } from "@/lib/datos";

const INICIAL: EstadoEncargo = { ok: false };

export function Formulario() {
  const [estado, accion, enviando] = useActionState(enviarEncargo, INICIAL);
  const abierto = useRef<HTMLInputElement>(null);
  const valores = !estado.ok ? estado.valores : undefined;
  const errores = !estado.ok ? (estado.errores ?? {}) : {};
  const [duracion, setDuracion] = useState(valores?.duracion ?? "30");

  // Hora a la que se abrió el formulario: si llega un envío a los pocos segundos, es un robot.
  useEffect(() => {
    if (abierto.current) abierto.current.value = String(Date.now());
  }, []);

  if (estado.ok) {
    return (
      <div className="exito" role="status">
        <h2>¡Recibido{estado.nombre ? `, ${estado.nombre}` : ""}!</h2>
        <p>
          Te escribo a <strong>{estado.email}</strong> con una propuesta y el precio cerrado. Si no ves mi correo, mira
          en spam o escríbeme a{" "}
          <a href={`mailto:${SITIO.correo}`} className="enlace">
            {SITIO.correo}
          </a>
          .
        </p>
        <div className="botones">
          <Link href="/" className="boton boton--borde">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const ayudaError = (campo: Campo) =>
    errores[campo]
      ? { "aria-invalid": true as const, "aria-describedby": `${campo}-error` }
      : {};
  const textoError = (campo: Campo) =>
    errores[campo] ? (
      <p id={`${campo}-error`} className="campo__error">
        {errores[campo]}
      </p>
    ) : null;

  const lanzamiento = PRECIOS.lanzamiento;

  return (
    <form action={accion} className="form">
      {estado.error && (
        <p className="aviso aviso--error" role="alert">
          {estado.error}
        </p>
      )}

      <div className="campo">
        <label htmlFor="nombre">Tu nombre</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          required
          maxLength={80}
          autoComplete="name"
          defaultValue={valores?.nombre}
          {...ayudaError("nombre")}
        />
        {textoError("nombre")}
      </div>

      <div className="campo">
        <label htmlFor="email">Tu correo</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={120}
          autoComplete="email"
          inputMode="email"
          defaultValue={valores?.email}
          {...ayudaError("email")}
        />
        {textoError("email")}
      </div>

      <div className="campo">
        <label htmlFor="negocio">Tu negocio o producto</label>
        <input
          id="negocio"
          name="negocio"
          type="text"
          required
          maxLength={160}
          autoComplete="organization"
          placeholder="Ej.: Panadería Triana, una app de reservas…"
          defaultValue={valores?.negocio}
          {...ayudaError("negocio")}
        />
        {textoError("negocio")}
      </div>

      <div className="campo">
        <label htmlFor="enlace">
          Tu web o tus redes <span className="ayuda">(opcional)</span>
        </label>
        <input
          id="enlace"
          name="enlace"
          type="text"
          maxLength={300}
          autoComplete="url"
          placeholder="Ej.: instagram.com/tunegocio"
          defaultValue={valores?.enlace}
        />
      </div>

      <fieldset className="campo">
        <legend>Duración</legend>
        <div className="opciones">
          <label className="opcion">
            <input
              type="radio"
              name="duracion"
              value="30"
              defaultChecked={(valores?.duracion ?? "30") === "30"}
              onChange={() => setDuracion("30")}
            />
            <span>Hasta 30 s · {euros(PRECIOS.hasta30)}</span>
          </label>
          <label className="opcion">
            <input
              type="radio"
              name="duracion"
              value="60"
              defaultChecked={valores?.duracion === "60"}
              onChange={() => setDuracion("60")}
            />
            <span>Hasta 60 s · {euros(PRECIOS.hasta60)}</span>
          </label>
        </div>
      </fieldset>

      {duracion === "30" && hayLanzamiento() && (
        <label className="casilla">
          <input type="checkbox" name="lanzamiento" value="si" defaultChecked={valores?.lanzamiento === "si"} />
          <span>
            <strong>Quiero el precio de lanzamiento: {euros(lanzamiento.precio)}.</strong> A cambio, me dejas enseñar tu
            vídeo en esta página y en mis redes. Quedan {lanzamiento.plazasLibres} de {lanzamiento.plazasTotales}{" "}
            plazas.
          </span>
        </label>
      )}

      <fieldset className="campo">
        <legend>¿Tienes logo y colores de marca?</legend>
        <div className="opciones">
          <label className="opcion">
            <input type="radio" name="marca" value="si" defaultChecked={(valores?.marca ?? "si") === "si"} />
            <span>Sí</span>
          </label>
          <label className="opcion">
            <input type="radio" name="marca" value="no" defaultChecked={valores?.marca === "no"} />
            <span>Todavía no</span>
          </label>
        </div>
        <p className="ayuda">No diseño logos desde cero: en el vídeo uso los tuyos.</p>
      </fieldset>

      <fieldset className="campo">
        <legend>¿Voz en off?</legend>
        <div className="opciones">
          <label className="opcion">
            <input type="radio" name="voz" value="si" defaultChecked={(valores?.voz ?? "si") === "si"} />
            <span>Sí</span>
          </label>
          <label className="opcion">
            <input type="radio" name="voz" value="no" defaultChecked={valores?.voz === "no"} />
            <span>No, solo música y rótulos</span>
          </label>
        </div>
      </fieldset>

      <div className="campo">
        <label htmlFor="mensaje">¿Qué quieres contar?</label>
        <span className="ayuda" id="mensaje-ayuda">
          Qué hace tu negocio, para quién es y qué quieres que haga quien vea el vídeo.
        </span>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          minLength={10}
          maxLength={3000}
          rows={6}
          defaultValue={valores?.mensaje}
          aria-invalid={errores.mensaje ? true : undefined}
          aria-describedby={errores.mensaje ? "mensaje-ayuda mensaje-error" : "mensaje-ayuda"}
        />
        {textoError("mensaje")}
      </div>

      <label className="casilla">
        <input type="checkbox" name="urgente" value="si" defaultChecked={valores?.urgente === "si"} />
        <span>Lo necesito urgente, en 72 h (+{PRECIOS.urgentePorcentaje} %).</span>
      </label>

      {/* Campo trampa: las personas no lo ven; los robots lo rellenan. */}
      <div className="oculto" aria-hidden="true">
        <label htmlFor="campo_extra">No rellenes este campo</label>
        <input id="campo_extra" name="campo_extra" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="t" ref={abierto} />

      <div className="grupo">
        <label className="casilla">
          <input
            type="checkbox"
            name="privacidad"
            value="si"
            required
            defaultChecked={valores?.privacidad === "si"}
            {...ayudaError("privacidad")}
          />
          <span>
            He leído la{" "}
            <Link href="/privacidad" className="enlace">
              información de privacidad
            </Link>{" "}
            y acepto que uses estos datos para responder a mi encargo.
          </span>
        </label>
        {textoError("privacidad")}
      </div>

      <div>
        <button type="submit" className="boton boton--tinta" disabled={enviando}>
          {enviando ? "Enviando…" : "Enviar solicitud"}
        </button>
      </div>

      <p className="info-legal">
        <strong>Responsable:</strong> {SITIO.nombre}. <strong>Finalidad:</strong> responder a tu encargo y prepararte
        la propuesta. <strong>Legitimación:</strong> tu consentimiento. <strong>Destinatarios:</strong> no cedo tus
        datos; mis proveedores de alojamiento y correo los tratan por encargo mío. <strong>Derechos:</strong> acceso,
        rectificación, supresión y los demás, escribiendo a {SITIO.correo}. Más en{" "}
        <Link href="/privacidad" className="enlace">
          Privacidad
        </Link>
        .
      </p>
    </form>
  );
}
