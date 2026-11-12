"use server";

import { PRECIOS, SITIO, hayLanzamiento } from "@/lib/datos";

export type Campo =
  | "nombre"
  | "email"
  | "negocio"
  | "enlace"
  | "duracion"
  | "marca"
  | "voz"
  | "urgente"
  | "mensaje"
  | "lanzamiento"
  | "privacidad";

export type Valores = Record<Campo, string>;

export type EstadoEncargo =
  | { ok: true; nombre: string; email: string }
  | {
      ok: false;
      error?: string;
      errores?: Partial<Record<Campo, string>>;
      // Lo que escribió la persona, para no perderlo si hay que corregir algo.
      valores?: Valores;
    };

const ERROR_ENVIO = `No se ha podido enviar. Prueba otra vez en un momento o escríbeme a ${SITIO.correo}.`;
const SIN_ACTIVAR = `El formulario todavía no está activo. Escríbeme a ${SITIO.correo} y te respondo desde ahí.`;

const correoValido = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
const unaLinea = (texto: string) => texto.replace(/[\r\n]+/g, " ").trim();

export async function enviarEncargo(_anterior: EstadoEncargo, datos: FormData): Promise<EstadoEncargo> {
  const texto = (campo: string, maximo: number) => String(datos.get(campo) ?? "").trim().slice(0, maximo);
  const marcado = (campo: string) => datos.get(campo) === "si";

  const valores: Valores = {
    nombre: unaLinea(texto("nombre", 80)),
    email: unaLinea(texto("email", 120)),
    negocio: unaLinea(texto("negocio", 160)),
    enlace: unaLinea(texto("enlace", 300)),
    duracion: texto("duracion", 2) === "60" ? "60" : "30",
    marca: texto("marca", 2) === "no" ? "no" : "si",
    voz: texto("voz", 2) === "no" ? "no" : "si",
    urgente: marcado("urgente") ? "si" : "no",
    mensaje: texto("mensaje", 3000),
    lanzamiento: marcado("lanzamiento") ? "si" : "no",
    privacidad: marcado("privacidad") ? "si" : "no",
  };

  // Trampas para robots: un campo que las personas no ven y un envío demasiado rápido.
  // Al robot se le dice que todo fue bien para que no insista.
  const trampa = texto("campo_extra", 200);
  const abierto = Number(datos.get("t"));
  const demasiadoRapido = Number.isFinite(abierto) && abierto > 0 && Date.now() - abierto < 3000;
  if (trampa || demasiadoRapido) {
    return { ok: true, nombre: valores.nombre, email: valores.email };
  }

  const errores: Partial<Record<Campo, string>> = {};
  if (!valores.nombre) errores.nombre = "Dime cómo te llamas.";
  if (!correoValido(valores.email)) errores.email = "Revisa el correo: no parece válido.";
  if (!valores.negocio) errores.negocio = "Dime qué negocio o producto es.";
  if (valores.mensaje.length < 10) errores.mensaje = "Cuéntame un poco más: qué haces y qué quieres contar.";
  if (valores.privacidad !== "si") errores.privacidad = "Para responderte necesito que aceptes la información de privacidad.";
  if (Object.keys(errores).length > 0) return { ok: false, errores, valores };

  const conLanzamiento = valores.duracion === "30" && valores.lanzamiento === "si" && hayLanzamiento();
  const asunto = unaLinea(`Encargo de vídeo: ${valores.negocio} (${valores.duracion} s)`).slice(0, 150);
  const cuerpo = [
    `Nuevo encargo desde ${SITIO.url.replace("https://", "")}`,
    `Recibido: ${new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" })}`,
    "",
    `Nombre: ${valores.nombre}`,
    `Correo: ${valores.email}`,
    `Negocio o producto: ${valores.negocio}`,
    `Web o redes: ${valores.enlace || "(no lo ha puesto)"}`,
    `Duración: hasta ${valores.duracion} s`,
    `Precio de lanzamiento (${PRECIOS.lanzamiento.precio} €, deja enseñar el vídeo): ${conLanzamiento ? "sí" : "no"}`,
    `Tiene logo y colores: ${valores.marca === "si" ? "sí" : "todavía no"}`,
    `Voz en off: ${valores.voz === "si" ? "sí" : "no, solo música y rótulos"}`,
    `Urgente en 72 h (+${PRECIOS.urgentePorcentaje} %): ${valores.urgente === "si" ? "sí" : "no"}`,
    "",
    "Qué quiere contar:",
    valores.mensaje,
    "",
    "Responde a este correo para escribirle directamente.",
  ].join("\n");

  const clave = process.env.RESEND_API_KEY;
  if (!clave) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[encargo] Sin RESEND_API_KEY: en desarrollo el aviso solo sale aquí.\n${asunto}\n${cuerpo}`);
      return { ok: true, nombre: valores.nombre, email: valores.email };
    }
    console.error("[encargo] Falta RESEND_API_KEY en las variables de entorno.");
    return { ok: false, error: SIN_ACTIVAR, valores };
  }

  const destinos = (process.env.AVISOS_A || SITIO.correo)
    .split(",")
    .map((d) => d.trim())
    .filter(Boolean);

  try {
    const respuesta = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${clave}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CORREO_DESDE || `Edwin Jordan <${SITIO.correo}>`,
        to: destinos,
        reply_to: valores.email,
        subject: asunto,
        text: cuerpo,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!respuesta.ok) {
      console.error("[encargo] Resend respondió", respuesta.status, (await respuesta.text()).slice(0, 300));
      return { ok: false, error: ERROR_ENVIO, valores };
    }
  } catch (fallo) {
    console.error("[encargo] No se pudo llamar a Resend:", fallo);
    return { ok: false, error: ERROR_ENVIO, valores };
  }

  return { ok: true, nombre: valores.nombre, email: valores.email };
}
