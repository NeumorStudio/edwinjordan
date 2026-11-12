# edwinjordan.neumorstudio.com

La página personal de Edwin Jordan: enseña las skills gratis de [motion-skills](https://github.com/EdwinJordanHerbas/motion-skills) y recoge encargos de vídeos en motion graphics.

Next.js 16 (App Router) en Vercel. Sin base de datos: el formulario manda un correo con Resend.

## En local

```bash
npm install
npm run dev
```

Sin `RESEND_API_KEY`, el formulario funciona en desarrollo y el aviso sale solo en la terminal. En producción, sin la clave, el formulario dice que escriban a info@.

## Variables de entorno (en Vercel, nunca en el código)

| Variable | Para qué |
|---|---|
| `RESEND_API_KEY` | Clave de Resend con permiso solo de envío. |
| `AVISOS_A` | Dónde llegan los encargos. Si no está, a info@neumorstudio.com. Admite varias separadas por comas. |
| `CORREO_DESDE` | Remitente del aviso. Por defecto `Edwin Jordan <info@neumorstudio.com>`. El dominio tiene que estar verificado en Resend. |

El aviso lleva como «Responder a» el correo del cliente: se le contesta directamente. Al cliente no se le manda nada automático, para que nadie pueda usar el formulario para enviar correos a terceros.

## Lo que se cambia a menudo

Todo está en `lib/datos.ts`:

- **Plazas de lanzamiento**: baja `PRECIOS.lanzamiento.plazasLibres` en 1 con cada encargo a precio de lanzamiento. A 0, la oferta desaparece de toda la página.
- **Precios**: `PRECIOS`.
- **Skills**: añade una entrada a `SKILLS`. Su página sale sola en `/skills/<slug>`.
- **Vídeo de ejemplo**: `VIDEO_EJEMPLO`, con el archivo en `public/videos/`. Comprimido a 720×1280 para que cargue rápido en móvil.

## Comprobar antes de publicar

```bash
npm run typecheck
npm run build
```

`main` publica en producción: los cambios van por rama y PR.
