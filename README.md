# Project-one

Web de fondo negro con la animación **DitherVeil** (React Bits) sobre una imagen.

## Puesta en marcha

```bash
npm install
npm run dev
```

La web se sirve en `http://localhost:5173/Project-one/` (el subpath es por GitHub Pages).

## Despliegue en GitHub Pages

1. En el repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Sube el código a `main`. El workflow `.github/workflows/pages.yml` compila y publica.
3. Queda pública en `https://vichogol.github.io/Project-one/`.

Detalles:
- `vite.config.js` fija `base: '/Project-one/'`; si el repo cambia de nombre, actualiza ese valor
  y también `BASE` en `scripts/postbuild.mjs`.
- GitHub Pages no tiene fallback de SPA, por eso el build genera `dist/404.html`
  (redirige a la base guardando la ruta en `sessionStorage`) y `src/App.jsx` la restaura.

## Imagen

La imagen se busca en `public/image.png` (mismo origen, sin problemas de CORS).

Alternativas:

- Renombrar tu archivo dentro de `public/` a `image.png`.
- O definir la ruta/URL en un `.env`:

```
VITE_IMAGE_SRC=https://tu-dominio.com/foto.jpg
```

Si no se encuentra, la web cae a una imagen de ejemplo y lo avisa abajo.

## Rutas

| Ruta | Página |
|------|--------|
| `/` | Portada con el DitherVeil |
| `/cotizacion` | Formulario de cotización (bordes blancos sobre negro) |

Barra superior compartida en `src/components/Bar.jsx`. Solo "Cotiza" navega; los demás
items son botones sin ruta todavía.

## Captcha (Cloudflare Turnstile)

`src/components/Turnstile.jsx` carga el script de Turnstile explícitamente. Por defecto
usa la site key de prueba de Cloudflare. Con tu clave real:

```
VITE_TURNSTILE_SITE_KEY=tu-site-key
```

El token se valida en el backend al enviar el formulario; el `onSubmit` actual solo
muestra la confirmación en cliente porque todavía no hay API.

## Ajustes rápidos

Props en `src/App.jsx` (componente en `src/components/DitherVeil.jsx`):

| Prop | Efecto |
|------|--------|
| `pattern` | `floyd`, `atkinson`, `bayer`, `noise`, `lines` |
| `palette` | `duotone` (tinta/papel) o `rgb` |
| `pixelSize` / `levels` | tamaño de celda y número de tonos |
| `revealRadius` / `softness` / `linger` | radio de la ventana de color, borde y duración de la estela |
| `rim` / `rimColor` | halo de color en el borde que se disuelve |
| `reverse` | empieza en color y difumina donde pasa el cursor |
| `wander` | la revela se mueve sola si el puntero no está |
| `clickBurst` | ondas de color al hacer clic |

## Scripts

```bash
npm run dev
npm run build
npm run lint
```