// Landing — Hero, Cómo funciona, Packs, CTA final
// Reads NomadeData from window. Calls onStart(initialDestination?) to launch onboarding.

const { useState: useStateL } = React;

function NavBar({ onStart, tweaks }) {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 30,
      background: "rgba(246,240,225,0.78)",
      backdropFilter: "blur(18px) saturate(140%)",
      WebkitBackdropFilter: "blur(18px) saturate(140%)",
      borderBottom: "1px solid var(--line)"
    }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 32px" }}>
        <NomadeLogo size={26} />
        <nav style={{ display: "flex", alignItems: "center", gap: 28, fontSize: 14.5, color: "var(--ink-700)", fontWeight: 500, whiteSpace: "nowrap" }}>
          <a href="#como-funciona" style={{}}>Cómo funciona</a>
          <a href="#packs">Packs</a>
          <a href="#destinos">Destinos</a>
          <a href="#padres" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            Para padres
            <span style={{ background: "var(--orange-100)", color: "var(--orange-700)", padding: "2px 7px", borderRadius: 999, fontSize: 11, fontWeight: 600 }}>Nuevo</span>
          </a>
        </nav>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button className="btn btn-ghost btn-sm">Ingresar</button>
          <button className="btn btn-primary btn-sm" onClick={() => onStart()}>
            Empezar mi intercambio
            <Icon name="arrow-right" size={14} stroke={2.4} />
          </button>
        </div>
      </div>
    </header>);

}

function Hero({ onStart, tweaks }) {
  const D = window.NomadeData.destinations;
  const featured = [D[0], D[2], D[5]]; // madrid, paris, berlin
  return (
    <section style={{ position: "relative", overflow: "hidden", paddingTop: 64, paddingBottom: 80 }}>
      {/* Soft orange wash top right */}
      <div style={{
        position: "absolute", top: -200, right: -200, width: 600, height: 600,
        background: "radial-gradient(circle at center, rgba(241,163,80,0.35), transparent 65%)",
        pointerEvents: "none"
      }} />
      <div className="container" style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 56, alignItems: "center", position: "relative" }}>
        {/* Left: copy */}
        <div className="slide-up">
          <div className="chip chip-orange" style={{ marginBottom: 24 }}>
            <Icon name="sparkle-fill" size={12} />
            La plataforma para tu intercambio universitario
          </div>
          <h1 className="display" style={{ fontSize: "clamp(48px, 6.4vw, 92px)", margin: 0, color: "var(--ink-900)", lineHeight: 1.02 }}>
            {tweaks.headline.split('|').map((part, i, arr) =>
            <React.Fragment key={i}>
                {i > 0 && <br />}
                {part.includes('*') ?
              <>
                    {part.split('*')[0]}
                    <span className="serif-it" style={{ color: "var(--orange-600)" }}>{part.split('*')[1]}</span>
                    {part.split('*')[2] || ''}
                  </> :
              part}
              </React.Fragment>
            )}
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.5, color: "var(--ink-soft)", marginTop: 40, maxWidth: 520 }}>Visa de estudiante, cuenta de banco, seguro médico, eSIM, alojamiento. Todos los trámites de tu intercambio en una sola app, ordenados paso a paso y filtrados para vos. Ademas de pasajes y papeles entre universidades.

          </p>

          <div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap" }}>
            <button className="btn btn-orange btn-lg" onClick={() => onStart()}>
              Armá tu plan en 2 minutos
              <Icon name="arrow-right" size={16} stroke={2.4} />
            </button>
            <button className="btn btn-ghost btn-lg" style={{ background: "var(--cream-50)" }}>
              <Icon name="play" size={14} color="var(--orange-600)" />
              Ver cómo funciona
            </button>
          </div>

          {/* Social proof row */}
          <div style={{ display: "flex", alignItems: "center", gap: 28, marginTop: 48, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {[
              window.__resources.avatar_1,
              window.__resources.avatar_2,
              window.__resources.avatar_3,
              window.__resources.avatar_4].
              map((src, i) =>
              <img key={i} src={src} alt="" style={{
                width: 36, height: 36, borderRadius: 999, objectFit: "cover",
                border: "2.5px solid var(--cream-50)",
                marginLeft: i ? -10 : 0
              }} />
              )}
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                {[1, 2, 3, 4, 5].map((i) => <Icon key={i} name="star" size={14} color="var(--orange-500)" stroke={2.2} />)}
                <strong style={{ marginLeft: 4, fontSize: 14 }}>4.9</strong>
              </div>
              <div style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>+1.300 estudiantes preparados</div>
            </div>
          </div>
        </div>

        {/* Right: photo collage */}
        <div style={{ position: "relative", height: 580 }}>
          {/* Main destination photo */}
          <div style={{
            position: "absolute", top: 30, right: 0, width: 420, height: 520,
            borderRadius: 28, overflow: "hidden",
            boxShadow: "var(--shadow-lg)",
            transform: "rotate(2deg)"
          }}>
            <img src={window.__resources.d_madrid} alt="Madrid"
            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(42,26,14,0.55), transparent 50%)"
            }} />
            <div style={{ position: "absolute", left: 20, bottom: 20, color: "white" }}>
              <div style={{ fontSize: 12, opacity: .85, fontWeight: 500, letterSpacing: ".05em", textTransform: "uppercase" }}>Tu próximo destino</div>
              <div className="display" style={{ fontSize: 38, fontWeight: 700, letterSpacing: "-0.03em" }}>Madrid</div>
            </div>
            {/* Sticker */}
            <div style={{
              position: "absolute", top: 20, left: 20,
              background: "var(--cream-50)", padding: "8px 14px", borderRadius: 999,
              fontSize: 13, fontWeight: 600, color: "var(--ink-900)",
              boxShadow: "var(--shadow-sm)",
              display: "flex", alignItems: "center", gap: 6
            }}>
              🇪🇸 412 estudiantes
            </div>
          </div>

          {/* Small floating card 1 — trámite */}
          <div className="card" style={{
            position: "absolute", left: 0, top: 60, width: 280,
            padding: 16, borderRadius: 18,
            transform: "rotate(-3deg)",
            zIndex: 2,
            boxShadow: "var(--shadow-md)"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: "var(--orange-100)", display: "grid", placeItems: "center" }}>
                  <Icon name="passport" size={16} color="var(--orange-700)" />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>Visa estudiante</div>
                  <div style={{ fontSize: 11.5, color: "var(--ink-soft)" }}>Próximo paso · Mar 28</div>
                </div>
              </div>
              <StatusPill status="in_progress" />
            </div>
            <div style={{ height: 6, background: "var(--cream-200)", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ width: "70%", height: "100%", background: "var(--orange-500)", borderRadius: 999 }} />
            </div>
            <div style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 8 }}>70% · 4 de 6 documentos listos</div>
          </div>

          {/* Small floating card 2 — alojamiento options */}
          <div className="card" style={{
            position: "absolute", left: 20, bottom: 30, width: 300,
            padding: 16, borderRadius: 18,
            transform: "rotate(2deg)",
            zIndex: 2,
            boxShadow: "var(--shadow-md)"
          }}>
            <div style={{ fontSize: 11, color: "var(--ink-soft)", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 8 }}>
              <Icon name="sparkle-fill" size={11} color="var(--orange-500)" /> Recomendado para vos
            </div>
            <div style={{ fontSize: 14.5, fontWeight: 600, marginBottom: 4 }}>Habitación en Malasaña</div>
            <div style={{ fontSize: 12.5, color: "var(--ink-soft)", marginBottom: 12 }}>€780/mes · 12 min a Carlos III · 4.8 ★</div>
            <div style={{ display: "flex", gap: 6 }}>
              <span className="chip" style={{ padding: "3px 9px", fontSize: 11 }}>WiFi 600MB</span>
              <span className="chip" style={{ padding: "3px 9px", fontSize: 11 }}>Amueblado</span>
              <span className="chip" style={{ padding: "3px 9px", fontSize: 11 }}>Lavadora</span>
            </div>
          </div>

          {/* Sticker — passport stamp */}
          <div style={{
            position: "absolute", left: -28, top: 350, width: 96, height: 96, borderRadius: 999,
            border: "2px dashed var(--orange-600)",
            display: "grid", placeItems: "center",
            color: "var(--orange-700)",
            fontSize: 10, fontWeight: 700, letterSpacing: ".1em",
            textAlign: "center",
            transform: "rotate(-14deg)",
            background: "rgba(252,224,188,0.75)",
            zIndex: 3,
            boxShadow: "var(--shadow-sm)"
          }}>
            <div>
              ESTUDIANTE<br />
              <span style={{ fontSize: 16 }}>2026</span><br />
              VISADO
            </div>
          </div>
        </div>
      </div>

      {/* Bottom marquee — stats / partners */}
      <div className="container" style={{ marginTop: 96 }}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          gap: 0, borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)",
          padding: "32px 0"
        }}>
          {[
          { n: "1.347", l: "estudiantes preparados" },
          { n: "27", l: "destinos cubiertos" },
          { n: "9", l: "universidades partner" },
          { n: "94%", l: "llega sin imprevistos" }].
          map((s, i) =>
          <div key={i} style={{
            padding: "0 24px",
            borderLeft: i ? "1px solid var(--line)" : "none"
          }}>
              <div className="display" style={{ fontSize: 44, fontWeight: 700, color: "var(--ink-900)" }}>{s.n}</div>
              <div style={{ fontSize: 14, color: "var(--ink-soft)", marginTop: 4 }}>{s.l}</div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

function HowItWorks() {
  const steps = window.NomadeData.steps;
  return (
    <section id="como-funciona" className="section" style={{ background: "var(--cream-50)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, marginBottom: 64, alignItems: "end" }}>
          <div>
            <div className="eyebrow">Cómo funciona</div>
            <h2 className="display" style={{ fontSize: "clamp(36px, 4.4vw, 62px)", margin: "12px 0 0", color: "var(--ink-900)" }}>
              De confirmar el intercambio al <span className="serif-it" style={{ color: "var(--orange-600)" }}>despegue</span>, en 4 pasos.
            </h2>
          </div>
          <p style={{ fontSize: 17, color: "var(--ink-soft)", lineHeight: 1.55 }}>
            Nada de catálogos infinitos. Te preguntamos lo justo, te armamos un plan a medida y resolvemos cada trámite en el orden correcto.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {steps.map((s, i) =>
          <div key={s.n} className="card" style={{ padding: 28, position: "relative", overflow: "hidden", minHeight: 320 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 48 }}>
                <div className="display" style={{ fontSize: 56, color: "var(--orange-500)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>
                  {s.n}
                </div>
                <div style={{
                width: 38, height: 38, borderRadius: 999, background: "var(--ink-900)", color: "var(--cream-50)",
                display: "grid", placeItems: "center"
              }}>
                  <Icon name={["compass", "spark", "check", "plane"][i]} size={18} color="var(--cream-50)" />
                </div>
              </div>
              <h3 className="display" style={{ fontSize: 22, margin: "0 0 8px", color: "var(--ink-900)", fontWeight: 700 }}>
                {s.title}
              </h3>
              <div style={{ fontSize: 14, color: "var(--ink-700)", fontWeight: 500, marginBottom: 14 }}>{s.sub}</div>
              <p style={{ fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.55, margin: 0 }}>{s.detail}</p>
            </div>
          )}
        </div>

        {/* Map-style destinos strip */}
        <div id="destinos" style={{ marginTop: 80 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 24 }}>
            <h3 className="display" style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>Destinos con cobertura completa</h3>
            <span style={{ fontSize: 14, color: "var(--ink-soft)" }}>Y sumamos uno nuevo cada mes</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
            {window.NomadeData.destinations.slice(0, 5).map((d) =>
            <div key={d.id} style={{
              aspectRatio: "3/4", borderRadius: 18, position: "relative", overflow: "hidden",
              cursor: "pointer", transition: "transform .2s ease"
            }} onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "none"}>
                <img src={d.photo} alt={d.city} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(42,26,14,0.7) 0%, transparent 55%)"
              }} />
                <div style={{ position: "absolute", left: 14, bottom: 12, right: 14, color: "white" }}>
                  <div style={{ fontSize: 11, opacity: .85 }}>{d.flag} {d.country}</div>
                  <div className="display" style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.03em" }}>{d.city}</div>
                  <div style={{ fontSize: 11.5, opacity: .9, marginTop: 2 }}>{d.students} estudiantes este año</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}

function Packs({ onStart, tweaks }) {
  const packs = window.NomadeData.packs;
  return (
    <section id="packs" className="section">
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 56px" }}>
          <div className="eyebrow">Packs y precios</div>
          <h2 className="display" style={{ fontSize: "clamp(38px, 4.6vw, 64px)", margin: "12px 0 16px", color: "var(--ink-900)" }}>
            La comodidad <span className="serif-it" style={{ color: "var(--orange-600)" }}>tiene un precio</span>.<br />
            Y vale cada peso.
          </h2>
          <p style={{ fontSize: 17, color: "var(--ink-soft)" }}>
            Pagás una vez, antes del viaje. Sin suscripciones, sin sorpresas. Los servicios los contratás directo a cada proveedor desde la app.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, alignItems: "stretch" }}>
          {packs.map((p) => {
            const isRec = p.recommended && tweaks.recommendedPack === p.id || tweaks.recommendedPack === 'completo' && p.id === 'completo';
            const highlighted = tweaks.recommendedPack === p.id;
            return (
              <div key={p.id} style={{
                background: highlighted ? "var(--ink-900)" : "var(--bg-paper)",
                color: highlighted ? "var(--cream-50)" : "var(--ink-900)",
                border: highlighted ? "1px solid var(--ink-900)" : "1px solid var(--line)",
                borderRadius: 24,
                padding: 32,
                position: "relative",
                boxShadow: highlighted ? "var(--shadow-lg)" : "var(--shadow-sm)",
                transform: highlighted ? "translateY(-8px)" : "none",
                transition: "transform .25s ease"
              }}>
                {highlighted &&
                <div style={{
                  position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                  background: "var(--orange-500)", color: "white",
                  padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase"
                }}>
                    Recomendado
                  </div>
                }
                <div style={{ marginBottom: 24 }}>
                  <h3 className="display" style={{ fontSize: 26, fontWeight: 700, margin: "0 0 4px" }}>{p.name}</h3>
                  <div style={{ fontSize: 14, opacity: .7 }}>{p.subtitle}</div>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                  {p.pricePrefix && <span style={{ fontSize: 13, opacity: .65 }}>{p.pricePrefix}</span>}
                  <span className="display" style={{ fontSize: 56, fontWeight: 800, letterSpacing: "-0.04em" }}>${p.price}</span>
                  <span style={{ fontSize: 14, opacity: .65 }}>{p.currency}</span>
                </div>
                <div style={{ fontSize: 13, opacity: .65, marginBottom: 24, fontStyle: "italic" }}>{p.tagline}</div>

                <button className={highlighted ? "btn btn-orange" : "btn btn-primary"} style={{ width: "100%", justifyContent: "center", marginBottom: 24 }} onClick={() => onStart()}>
                  {highlighted ? "Empezar con este pack" : "Elegir este pack"}
                  <Icon name="arrow-right" size={14} stroke={2.4} />
                </button>

                <div style={{ borderTop: `1px solid ${highlighted ? "rgba(255,255,255,0.12)" : "var(--line)"}`, paddingTop: 20 }}>
                  <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", opacity: .7, marginBottom: 12 }}>
                    Incluye
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {p.includes.map((inc, i) =>
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "start", fontSize: 14 }}>
                        <span style={{
                        width: 18, height: 18, borderRadius: 999, flexShrink: 0,
                        background: highlighted ? "var(--orange-500)" : "var(--green-600)",
                        color: "white", display: "grid", placeItems: "center",
                        marginTop: 1
                      }}>
                          <Icon name="check" size={11} stroke={3} color="white" />
                        </span>
                        <span>{inc}</span>
                      </div>
                    )}
                  </div>
                  {p.excludes.length > 0 &&
                  <div style={{ marginTop: 16, opacity: .5 }}>
                      {p.excludes.map((ex, i) =>
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 13.5, marginBottom: 8 }}>
                          <span style={{ width: 18, height: 18, borderRadius: 999, background: "transparent", border: `1px solid ${highlighted ? "rgba(255,255,255,0.25)" : "var(--line-strong)"}`, flexShrink: 0 }} />
                          <span style={{ textDecoration: "line-through" }}>{ex}</span>
                        </div>
                    )}
                    </div>
                  }
                </div>
              </div>);

          })}
        </div>

        {/* Footnote */}
        <div style={{ marginTop: 32, textAlign: "center", fontSize: 13.5, color: "var(--ink-soft)" }}>
          ¿Tu universidad es partner? <a style={{ color: "var(--orange-700)", fontWeight: 600 }}>Probá tu mail institucional para descuento.</a>
        </div>
      </div>
    </section>);

}

function ParentsBlock() {
  return (
    <section id="padres" style={{ background: "var(--ink-900)", color: "var(--cream-50)", padding: "96px 0", overflow: "hidden", position: "relative" }}>
      <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
        <div>
          <div className="eyebrow" style={{ color: "var(--orange-300)" }}>Una nota para los padres</div>
          <h2 className="display" style={{ fontSize: "clamp(36px, 4.2vw, 56px)", margin: "12px 0 24px", color: "var(--cream-50)" }}>
            Su hijo llega <span className="serif-it" style={{ color: "var(--orange-400)" }}>preparado</span>. Ustedes, tranquilos.
          </h2>
          <p style={{ fontSize: 17, color: "rgba(251,246,235,0.75)", lineHeight: 1.55, marginBottom: 24 }}>
            Un intercambio de seis meses puede costar entre USD 20.000 y USD 30.000. Lo que cobra Nomade no es una tarifa: es la diferencia entre llegar con todos los trámites resueltos o llegar a improvisar a 11.000 km de casa.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 28 }}>
            {[
            ["Visibilidad total", "Recibís un resumen semanal con el estado de cada trámite."],
            ["Soporte humano", "Si algo se complica, hay un equipo en Buenos Aires y otro en destino."],
            ["Sin sorpresas", "Pago único antes del viaje. Sin contracargos, sin suscripciones."]].
            map(([t, d], i) =>
            <div key={i} style={{ display: "flex", gap: 14, alignItems: "start" }}>
                <div style={{ width: 28, height: 28, borderRadius: 999, background: "var(--orange-500)", color: "white", display: "grid", placeItems: "center", flexShrink: 0 }}>
                  <Icon name="check" size={14} stroke={2.5} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16 }}>{t}</div>
                  <div style={{ fontSize: 14.5, color: "rgba(251,246,235,0.65)" }}>{d}</div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <div style={{
            borderRadius: 24, overflow: "hidden",
            border: "1px solid rgba(251,246,235,0.12)",
            background: "rgba(251,246,235,0.04)",
            padding: 28
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <img src={window.__resources.parents} style={{ width: 44, height: 44, borderRadius: 999 }} />
              <div>
                <div style={{ fontWeight: 600 }}>Cecilia M.</div>
                <div style={{ fontSize: 13, color: "rgba(251,246,235,0.6)" }}>Mamá de Tomás · Intercambio en Madrid</div>
              </div>
            </div>
            <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 22, lineHeight: 1.45, color: "var(--cream-50)" }}>
              "El día que se subió al avión yo no estaba pensando en si le faltaba algún papel. Estaba pensando en que iba a extrañarlo. Eso, para mí, valió cada centavo."
            </p>
            <div style={{ display: "flex", gap: 6, marginTop: 16 }}>
              {[1, 2, 3, 4, 5].map((i) => <Icon key={i} name="star" size={14} color="var(--orange-400)" stroke={2.4} />)}
            </div>
          </div>
        </div>
      </div>
    </section>);

}

function FinalCTA({ onStart }) {
  return (
    <section style={{ padding: "120px 0", position: "relative", overflow: "hidden", background: "var(--cream-100)" }}>
      <div style={{
        position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)",
        width: 800, height: 600,
        background: "radial-gradient(ellipse at center, rgba(241,163,80,0.25), transparent 60%)",
        pointerEvents: "none"
      }} />
      <div className="container" style={{ position: "relative", textAlign: "center", maxWidth: 820, margin: "0 auto" }}>
        <div className="chip chip-orange" style={{ marginBottom: 24 }}>
          <Icon name="sparkle-fill" size={12} />
          Listo en 2 minutos
        </div>
        <h2 className="display" style={{ fontSize: "clamp(48px, 6.4vw, 96px)", margin: "0 0 24px", color: "var(--ink-900)" }}>
          ¿Te aceptaron el<br />
          <span className="serif-it" style={{ color: "var(--orange-600)" }}>intercambio</span>?
        </h2>
        <p style={{ fontSize: 19, color: "var(--ink-soft)", marginBottom: 36, maxWidth: 580, margin: "0 auto 36px" }}>
          Contános a dónde vas, cuándo y qué ya tenés resuelto. En menos tiempo del que tardás en pedir un café, te armamos tu plan personalizado.
        </p>
        <button className="btn btn-orange btn-lg" onClick={() => onStart()} style={{ fontSize: 17, padding: "20px 32px" }}>
          Empezar mi intercambio
          <Icon name="arrow-right" size={18} stroke={2.4} />
        </button>
        <div style={{ marginTop: 20, fontSize: 13.5, color: "var(--ink-soft)" }}>
          Sin tarjeta. Sin compromiso. Tu plan es gratis hasta que decidas pagarlo.
        </div>
      </div>
    </section>);

}

function Footer() {
  return (
    <footer style={{ background: "var(--ink-900)", color: "rgba(251,246,235,0.7)", padding: "64px 0 32px" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 56, marginBottom: 48 }}>
          <div>
            <NomadeLogo size={28} color="var(--cream-50)" />
            <p style={{ fontSize: 14, marginTop: 16, maxWidth: 280, lineHeight: 1.55 }}>
              La plataforma que organiza todo tu intercambio universitario, antes de que subas al avión.
            </p>
          </div>
          {[
          ["Producto", ["Cómo funciona", "Packs", "Destinos", "Para padres", "Para universidades"]],
          ["Compañía", ["Nosotros", "Trabajá con nosotros", "Prensa", "Contacto"]],
          ["Recursos", ["Blog", "Guías por destino", "FAQ", "Términos"]]].
          map(([title, items]) =>
          <div key={title}>
              <div style={{ color: "var(--cream-50)", fontWeight: 600, fontSize: 14, marginBottom: 14 }}>{title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {items.map((i) => <a key={i} style={{ fontSize: 14 }}>{i}</a>)}
              </div>
            </div>
          )}
        </div>
        <div style={{ borderTop: "1px solid rgba(251,246,235,0.1)", paddingTop: 24, fontSize: 12.5, display: "flex", justifyContent: "space-between" }}>
          <span>© 2026 Nomade · Buenos Aires, AR</span>
          <span>Hecho con ☕ y ansiedad evitada.</span>
        </div>
      </div>
    </footer>);

}

function Landing({ onStart, tweaks }) {
  return (
    <div data-screen-label="01 Landing" className="fade-in">
      <NavBar onStart={onStart} tweaks={tweaks} />
      <Hero onStart={onStart} tweaks={tweaks} />
      <HowItWorks />
      <Packs onStart={onStart} tweaks={tweaks} />
      {tweaks.showParents && <ParentsBlock />}
      <FinalCTA onStart={onStart} />
      <Footer />
    </div>);

}

Object.assign(window, { Landing });