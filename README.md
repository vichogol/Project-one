# Project-one

Web de fondo negro con la animación **DitherVeil** (React Bits) sobre una imagen.

## Puesta en marcha

```bash
npm install
npm run dev
```

## Imagen

La imagen se busca en `public/image.png` (mismo origen, sin problemas de CORS).

Alternativas:

- Renombrar tu archivo dentro de `public/` a `image.png`.
- O definir la ruta/URL en un `.env`:

```
VITE_IMAGE_SRC=https://tu-dominio.com/foto.jpg
```

Si no se encuentra, la web cae a una imagen de ejemplo y lo avisa abajo.

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