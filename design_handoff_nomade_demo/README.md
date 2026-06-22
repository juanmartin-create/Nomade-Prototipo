# Handoff: Nomade Demo Presentación (45s)

## Overview

Este handoff contiene un **video demo interactivo de 45 segundos** que muestra el flujo completo del producto Nomade:
- Landing (web con propuesta de valor)
- Onboarding (6 pasos: destino, cuándo, universidad, qué tenés resuelto, prioridades, detalles)
- Tu plan (Pack Completo recomendado con desglose de trámites)
- Dashboard (interfaz post-pago con cronograma, trámites y próximas acciones)

**Propósito:** Material de presentación para inversores, stakeholders o equipo. Automatiza el storytelling visual sin necesidad de grabar manualmente.

---

## About the Design Files

Los archivos en este bundle son **prototipos HTML/CSS/JS funcionales** que simulan un iframe con el producto Nomade. **No son código de producción**. Son referencias de diseño que muestran:
- Visual final (colores, tipografía, espacios, sombras)
- Comportamiento e interacciones esperadas
- Timing y ritmo de la presentación

**Si vas a implementar esto en un codebase real:**
- No copies-pegues el HTML — es un prototipo standalone
- Usa el README como especificación visual y de comportamiento
- Implementa en el framework/ambiente que ya usas (React, Vue, Next, etc.)
- Sigue los diseño tokens y patrones que se detallan abajo

---

## Fidelidad

**High-fidelity (hifi)**: Pixel-perfect mockup. Colores, tipografía, espacios, sombras y transiciones son finales y listos para recrear. Los interactions (clicks, scrolls, delays) están temporalizados exactamente.

---

## Archivos Principales

| Archivo | Descripción |
|---------|------------|
| `Nomade Demo.html` | **PRINCIPAL.** Demo interactivo de 45s con iframe, controles play/pausa/seek, captions y cursor animado. Abrí en Chrome. |
| `Nomade Demo v1.html` | Versión anterior (backup). |
| `index.html` | Prototipo del producto (se carga dentro del iframe). |
| `app.jsx`, `landing.jsx`, `onboarding.jsx`, `dashboard.jsx` | Componentes React del producto. |
| `data.js`, `components.jsx`, `styles.css` | Data, helpers visuales y estilos globales. |

---

## Pantallas & Flujo

### 1. **Landing** (0:00–0:07)
**Propósito:** Hero, propuesta de valor, social proof, CTA.
- Hero con headline "Tu intercambio, resuelto antes"
- Secciones: Cómo funciona (4 pasos), Packs (3 opciones), Para padres, CTA final
- Scroll rápido mostrando cada sección
- Button "Empezar mi intercambio" inicia onboarding

**Layout:**
- Container ancho max 1240px, centrado
- Grid 2 cols en hero (izq: copy, dcha: fotos + cards flotantes)
- Paleta: cream (#F6F0E1) bg, ink (#2A1A0E) text, orange (#E88836) accents
- Tipografía: Bricolage Grotesque (display), Hanken Grotesk (body)

---

### 2. **Onboarding** (0:07–0:27)
**Propósito:** Recopilar datos del usuario para armar plan personalizado. 6 pasos:

#### Paso 1: Destino (0:09–0:11.7)
- Grid 4 cols de destination cards (imagen + flag + nombre + país)
- Click selecciona Madrid automáticamente
- Animación de entrada: `slide-up` + fade

#### Paso 2: Cuándo (0:11.7–0:15)
- 3 botones radio (Trimestre / Semestre / Año)
- Grid 6 meses para seleccionar fecha de inicio
- Meses pasados deshabilitados (opacity .5)
- Selecciona Sep automático

#### Paso 3: Universidad (0:15–0:18)
- Lista de universidades (buttons stacked)
- Click selecciona "Universidad de San Andrés"
- Info badge: "Partner = 10% off"

#### Paso 4: Qué tenés resuelto (0:18–0:21)
- Grid 4 cols de checkboxes (7 trámites: visa, alojamiento, banco, seguro, eSIM, papeles, pasajes)
- Click marca "Visa y pasaporte"
- Animación: icon + checkmark + color change

#### Paso 5: Prioridades (0:21–0:22.5)
- Lista de trámites no resueltos con 5-star slider cada uno
- Ordena por urgencia

#### Paso 6: Detalles (0:23.5–0:26.4)
- Presupuesto: 4 botones (No sé / USD 15k / USD 15–25k / 25k+)
- Idioma: 4 pills (Solo español / Inglés básico / Avanzado / Otro)
- Salud: textarea libre
- Aclaraciones: textarea libre
- Click "USD 15–25k" + "Inglés avanzado" automático

**Componente StepShell (padre de todos los pasos):**
- Header sticky con back button, progress bar (7 divisiones), logo, close
- Main centrada, maxWidth 920px
- Título + subtítulo en cada paso
- Animación de entrada: `slide-up` 200ms

**Design Tokens Onboarding:**
- Progress bar: 4px height, orange-500 filled, cream-300 empty, radius 999px
- Card bg: bg-paper (#FBF6EB)
- Botones: 
  - Primary (seleccionado): ink-900 bg, cream-50 text, 600 weight
  - Ghost (no seleccionado): transparent bg, line border, ink-700 text
  - Hover: cream-100 bg (ghost)
- Spacing: 28px padding en containers, 12–16px gap entre elementos
- Border radius: 14–20px (cards), 999px (pills/dots)

---

### 3. **Tu Plan / Resultado** (0:27.5–0:32)
**Propósito:** Mostrar el plan generado + pack recomendado (Completo).

**Layout:**
- Grid 2 cols: izq (perfil resumen), dcha (pack recomendado con pricing)
- Izq: chip "Tu perfil de intercambio", h1 "Listo. Tu plan para Madrid está armado", p descriptivo, card con 4 datos (destino, duración, uni, salida), progress circle
- Dcha: card oscura (ink-900 bg) con:
  - Chip "Tu pack recomendado"
  - H3 "Pack Completo"
  - P "Todos los trámites incluidos"
  - Precio grande: $149 USD
  - "Ahorrás USD X vs. resolver suelto"
  - Button "Entrar a mi plan"
  - Comparativa: "Resolver suelto = USD X" (tachado si hay ahorro)
  - Desglose de 7 trámites con check/clock icon + precio individual

**Captions:**
- 0:27.5 "Tu plan · listo · Pack Completo recomendado: ahorrás vs. resolver suelto."
- 0:30 "Tu plan · listo · 7 trámites identificados, ordenados por urgencia para Madrid."

---

### 4. **Dashboard** (0:32–0:45)
**Propósito:** Post-pago. Vista inicial con 87 días, próximas acciones, trámites, timeline, comunidad.

**Layout:**
- Sidebar izq (248px): logo, trip card (oscura, foto bg), nav sections (7 items), apoyo card (Julia), user card
- Main derecha: topbar (buscar + bell), content grid 2 cols (izq ancho, dcha 320px sticky)

**Izq (main content):**
- Greeting: "Hola, Tomás. Faltan 87 días para Madrid."
- Progress card: "2 de 7 trámites listos" + circle progress 28% + stacked bar (colores por status)
- Featured card (oscura): "Próxima acción · Elegí tu seguro médico" + 3 opciones filtradas + botón "Ver 3 opciones"
- Trámites list (7 cards expandibles):
  - Header: icon + título + status pill + progress bar (si in_progress)
  - Click abre detalle: próximo paso, proveedor, botones (Abrir, Ver guía, Chat Julia)
  
**Dcha (right rail):**
- Cronograma: eventos (Hoy, Mar 28, etc.) con línea vertical connecting, icons
- Comunidad: "23 estudiantes esta tanda" + avatares stacked, chat snippet, botón "Entrar al chat"
- Content card: "Los 5 barrios más buscados en Madrid"

**Captions Dashboard:**
- 0:34 "Dashboard · Inicio · Faltan 87 días para Madrid. Tu plan, en una sola pantalla."
- 0:37 "Cada trámite, su estado · Listo, en curso, para elegir o bloqueado."
- 0:40 "Próxima acción · Elegí tu seguro médico — 3 opciones ya filtradas para tu perfil."
- 0:43 "Nomade · Tu intercambio, resuelto."

---

## Interacciones & Timing

| Tiempo | Acción | Resultado |
|--------|--------|-----------|
| 0:00 | Intro fade-out | Landing aparece |
| 0:03 | Scroll 1300px | Sección "Cómo funciona" visible |
| 0:05 | Scroll 2400px | Sección "Packs" visible |
| 0:07 | Scroll 0 | Vuelve arriba |
| 0:07.6 | Click "Empezar mi intercambio" | Onboarding paso 1 |
| 0:10.2 | Click Madrid | Avanza a paso 2 |
| 0:12.8 | Click Sep | Deselecciona duración por defecto |
| 0:13.8 | Click "Continuar" | Paso 3 (uni) |
| 0:16 | Click "Universidad de San Andrés" | Selecciona |
| 0:17.2 | Click "Continuar" | Paso 4 (qué tenés) |
| 0:19 | Click "Visa y pasaporte" | Marca como resuelto |
| 0:20 | Click "Continuar" | Paso 5 (prioridades) |
| 0:22.5 | Click "Continuar" | Paso 6 (detalles) |
| 0:24.6 | Click "USD 15–25k" | Selecciona presupuesto |
| 0:25.6 | Click "Inglés avanzado" | Selecciona idioma |
| 0:26.4 | Click "Ver mi plan" | Pantalla resultado |
| 0:32 | Click "Entrar a mi plan" | Dashboard |
| 0:37 | Scroll 550px | Muestra trámites |
| 0:40 | Scroll 900px | Muestra próxima acción |
| 0:43 | Scroll 0 | Vuelve arriba (cierre) |

**Cursor animado:**
- Aparece 300ms antes de cada click
- Easing: cubic-bezier(.22,.85,.3,1) (suave, elástico)
- Click effect: ripple naranja 550ms
- Desaparece en pantalla resultado y dashboard (0:29.5, 0:34)

**Captions:**
- Fade in 450ms, slide up 20px → translateY(0)
- Fade out 450ms, translateY(20px)
- Posición: left 80px, bottom 60px (dentro del browser frame)
- Backdrop blur 20px, border orange-500 .25 opacity

---

## Estado & Datos

### Profile State (Onboarding → Dashboard)
```js
{
  destination: "madrid",
  duration: "semester",
  monthIdx: 8, // Sep = index 8
  uni: "Universidad de San Andrés",
  resolved: ["visa_pasaporte"],
  priorities: { /* 7 trámites con valores 1–5 */ },
  budget: 20000, // USD 15–25k
  language: "Inglés avanzado",
  healthNotes: "",
  freeNotes: ""
}
```

### Dashboard Data
```js
tramites: [
  {
    id: "visa_pasaporte",
    title: "Visa y pasaporte",
    sub: "Verificado ✓",
    status: "done",
    icon: "passport",
    progress: 100
  },
  {
    id: "seguro",
    title: "Seguro médico",
    sub: "Elige entre 3 opciones",
    status: "ready",
    icon: "shield",
    options: 3,
    nextAction: "Carlos III lo exige antes del 30 de noviembre"
  },
  // ... 5 más
]

destinations: { id, city, country, flag, photo, students, ... }
durations: { id, months, label, popular }
universities: [ "Universidad de San Andrés", ... ]
priorities: [ { id, label, icon, price, hint }, ... ] // 7 trámites
packs: [ { id, name, price, includes, excludes }, ... ]
```

---

## Design Tokens

### Colors
```
Paleta Warm (default):
- cream-100: #FDEEDC
- cream-50: #F6F0E1 (bg principal)
- paper: #FBF6EB (card bg)
- ink-900: #2A1A0E (text, dark accents)
- ink-700: #5C3D2E
- ink-soft: #8B6F5F
- orange-500: #E88836 (primary accent)
- orange-600: #D87026
- orange-700: #B85C18
- orange-100: #FDEEDC
- green-600: #1F8A5B (done status)
- blue-500: #3C6E91 (ready status)
- red-500: #C74C3C (blocked status)
- line: rgba(42,26,14,0.08)
```

Paletas alternativas: sand, forest, slate (en app.jsx)

### Typography
```
Font display: "Bricolage Grotesque" (600, 700, 800)
Font body: "Hanken Grotesk" (400, 500, 600, 700)
Font serif: "Instrument Serif" (italic para emfasis)
Font mono: system monospace

Escala:
- H1 (hero): clamp(48px, 6.4vw, 92px) · 700 weight · lh 1.02
- H2 (section): clamp(36px, 4.4vw, 62px) · 700 weight · lh 1.1
- H3 (card title): 22px · 700 weight
- Body large: 19px · 400 weight · lh 1.5
- Body: 16px · 400 weight · lh 1.5
- Body small: 14.5px · 500 weight
- Label: 12px · 600 weight · letter-spacing .08em · uppercase
```

### Spacing
```
Gap (flex/grid): 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 48, 56, 64, 80, 96
Padding (containers): 14, 16, 20, 24, 28, 32, 48, 64, 96
Margin (sections): padding-top/bottom 48–96px
```

### Shadows
```
shadow-sm: 0 1px 3px rgba(0,0,0,0.08)
shadow-md: 0 4px 12px rgba(0,0,0,0.12)
shadow-lg: 0 20px 40px rgba(0,0,0,0.2)
browser frame: 0 40px 120px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.04)
```

### Border Radius
```
Buttons: 8–10px
Cards: 14–20px
Pills/badges: 999px (border-radius)
Images: 18–28px
```

### Animations
```
Fade in: opacity 0 → 1 · 300–450ms · ease
Slide up: translateY(20px) → 0 · 300–450ms · ease
Scale: scale(1) hover → 1.02 · 200ms · ease
Transition default: .15s–.2s ease
Button hover: background .15s ease
Progress bar: stroke-dashoffset 1s ease
```

---

## Assets

| Asset | Origen | Uso |
|-------|--------|-----|
| Fotos destinos | Unsplash (crop a 900×1080+) | Hero, destination cards, sidebar |
| Avatares users | Unsplash (80×80, crop circulares) | Social proof, comunidad, apoyo |
| Icons | Custom SVG set (compass, spark, check, plane, passport, home, bank, shield, signal, doc, chat, bell, arrow-left, arrow-right, x, lock, calendar, search, star) | UI buttons, status indicators |
| Logo Nomade | "Bricolage Grotesque" 800 weight, letterspacing -0.05em | Header, intro |

---

## Browser & Responsive

**Desktop-first** (1920×1080 design size). Demo está containerizado con scale stage para mantener aspectratio:
- Viewport 1920×1080 (16:9)
- Browser frame dentro: 1480×900 (iframe)
- Lettersbox en pantallas más chicas (scale via transform)

**No es responsivo** — es una presentación fija de 45s. Si recreas en web, mantené el 16:9 y scale, o adaptá a viewport con media queries.

---

## Cómo Usar Este Handoff

1. **Abrí `Nomade Demo.html` en Chrome** → Play → observá el flujo end-to-end
2. **Leé este README** completo para entender estructura, timing, datos
3. **Si vas a implementar en codebase:**
   - Usá estos tokens y layout como especificación
   - Copia la estructura de componentes (Landing, Onboarding, Dashboard)
   - Implementá el router view (landing → onboarding → dashboard)
   - Mantené el mismo estado y transiciones
   - Testea con datos reales (no fixtures)
4. **Si vas a grabar un video .mp4:**
   - Abrí demo HTML en navegador fullscreen
   - Grabá con QuickTime / Loom / OBS
   - Editá si querés music/narración por encima (demo es silencioso)

---

## Notas de Desarrollo

- **Babel + React en runtime:** app.jsx, landing.jsx, onboarding.jsx, dashboard.jsx se compilan on-the-fly. Para producción, precompila con `npx babel`.
- **Data.js:** data hardcoded. En producción, fetcheá desde API.
- **No hay backend:** validación, pagos, etc. son mocks. Integrá con tu backend.
- **localStorage:** tweaks panel persiste en localStorage (no borrés `nomade_tweaks`).
- **Icons:** custom SVG components. Usa tu icon library preferida.

---

**Creado:** Jun 10, 2026  
**Fidelidad:** High-fidelity (hifi)  
**Duración:** 45s exactos  
**Formato:** HTML + React inline (demo) / Especificación para reimplementación
