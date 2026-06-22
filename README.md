# Nomade — Prototipo en Alta

Prototipo en alta fidelidad de **Nomade** (plataforma de intercambio estudiantil), exportado desde [Claude Design](https://claude.ai/design).

> _Tu intercambio, resuelto._

## Demo

Abrí `index.html` en el navegador para ver la app principal (landing + onboarding + dashboard).

## Estructura

- `index.html` — entry point principal (carga React 18 UMD + Babel standalone via unpkg)
- `app.jsx` — root de la SPA, ruteo entre vistas
- `landing.jsx` — landing page
- `onboarding.jsx` — flujo de onboarding
- `dashboard.jsx` — dashboard del usuario
- `components.jsx` — componentes compartidos
- `tweaks-panel.jsx` — panel lateral de ajustes en vivo
- `data.js` — datos mock
- `styles.css` — estilos globales (Bricolage Grotesque + Hanken Grotesk + Instrument Serif + Space Grotesk)
- `assets/` — logo y recursos
- `Nomade Web.html`, `Nomade Demo.html`, `Nomade Storyboard.html` — variantes y storyboard

### Versiones standalone

Los archivos `*(Standalone).html` traen todo inlineado en un solo HTML (~3.5 MB) para previsualizar sin servidor local.

### Carpeta `design_handoff_nomade_demo/`

Copia espejo de los archivos clave del demo — útil como referencia para implementación.

## Cómo correrlo localmente

```bash
python -m http.server 8000
# luego abrí http://localhost:8000
```

O simplemente abrí `Nomade Web (Standalone).html` haciendo doble click.

## Stack

- React 18 (UMD)
- Babel Standalone (transpila JSX en el cliente)
- CSS plano + Google Fonts
- Sin build step

## Origen

Bundle de handoff generado por Claude Design el 2026-06-22. Ver `HANDOFF.md` para contexto del bundle original.
