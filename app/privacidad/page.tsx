import type { Metadata } from "next";
import { SITIO } from "@/lib/datos";

// [DECISIÓN STARK] Borrador: falta que Stark confirme quién es el responsable (persona o sociedad, con NIF),
// los plazos de conservación y el permiso de los vídeos de lanzamiento antes de publicarlo.

export const metadata: Metadata = {
  title: "Privacidad",
  description: "Qué datos recoge el formulario de encargo, para qué y cómo ejercer tus derechos.",
  alternates: { canonical: "/privacidad" },
};

export default function Privacidad() {
  return (
    <article className="contenedor texto-largo">
      <h1>Privacidad</h1>
      <p>
        Esta página solo recoge datos cuando me envías el formulario de encargo. No usa cookies de seguimiento ni
        analítica.
      </p>

      <h2>Quién trata tus datos</h2>
      <p>
        {SITIO.nombre}, en {SITIO.ciudad} (España). Puedes escribirme a{" "}
        <a href={`mailto:${SITIO.correo}`} className="enlace">
          {SITIO.correo}
        </a>
        .
      </p>

      <h2>Qué datos y para qué</h2>
      <p>
        Tu nombre, tu correo, el nombre de tu negocio, tu web o tus redes y lo que me cuentes en el formulario. Los uso
        para responderte, prepararte la propuesta y, si me encargas el vídeo, hacerlo.
      </p>

      <h2>Por qué puedo usarlos</h2>
      <p>
        Porque me das tu consentimiento al enviar el formulario y porque me pides un presupuesto. Puedes retirar el
        consentimiento cuando quieras escribiéndome.
      </p>

      <h2>Cuánto tiempo los guardo</h2>
      <p>
        Mientras hablamos de tu encargo. Si no sale adelante, los borro cuando me lo pidas o, como mucho, al año. Si
        sale adelante, el tiempo que obliguen las leyes fiscales y mercantiles.
      </p>

      <h2>Quién más los ve</h2>
      <p>
        No los cedo a nadie. Los tratan por encargo mío los proveedores que necesito para que esto funcione: Vercel
        (alojamiento de la web), Resend (envío del aviso del formulario) y mi proveedor de correo. Vercel y Resend son
        empresas de Estados Unidos; la transferencia se ampara en el Marco de Privacidad de Datos UE-EE. UU. o en
        cláusulas contractuales tipo.
      </p>

      <h2>Vídeos con precio de lanzamiento</h2>
      <p>
        Si eliges el precio de lanzamiento, me das permiso para enseñar tu vídeo en esta página y en mis redes.
      </p>

      <h2>Tus derechos</h2>
      <p>
        Puedes pedirme acceso, rectificación, supresión, oposición, limitación o portabilidad de tus datos escribiendo a{" "}
        {SITIO.correo}. Si crees que no los he respetado, puedes reclamar ante la Agencia Española de Protección de
        Datos (aepd.es).
      </p>

      <p className="texto-suave">Última actualización: 12 de noviembre de 2026.</p>
    </article>
  );
}
