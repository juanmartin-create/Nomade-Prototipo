// Onboarding — Interactive multi-step profile flow
// Calls onComplete(profile) when user clicks "Ver mi plan"

const { useState: useStateO, useEffect: useEffectO } = React;

function ProgressBar({ step, total }) {
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          height: 4, flex: 1,
          background: i <= step ? "var(--orange-500)" : "var(--cream-300)",
          borderRadius: 999,
          transition: "background .35s ease",
        }} />
      ))}
      <span style={{ fontSize: 12, color: "var(--ink-soft)", marginLeft: 10, fontVariantNumeric: "tabular-nums", fontWeight: 600 }}>
        {step + 1}/{total}
      </span>
    </div>
  );
}

function StepShell({ children, title, sub, step, total, onBack, onClose }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--cream-100)", display: "flex", flexDirection: "column" }}>
      <header style={{ padding: "20px 32px", display: "flex", alignItems: "center", gap: 16, borderBottom: "1px solid var(--line)" }}>
        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--ink-soft)", fontSize: 14, fontWeight: 500, padding: "6px 10px", borderRadius: 8 }}>
          <Icon name="arrow-left" size={16} />
          {step === 0 ? "Volver al sitio" : "Atrás"}
        </button>
        <div style={{ flex: 1, maxWidth: 480, margin: "0 24px" }}>
          <ProgressBar step={step} total={total} />
        </div>
        <NomadeLogo size={22} />
        <button onClick={onClose} style={{ padding: 8, borderRadius: 8, color: "var(--ink-soft)" }}><Icon name="x" size={18} /></button>
      </header>
      <main style={{ flex: 1, display: "flex", alignItems: "center", padding: "48px 32px" }}>
        <div style={{ maxWidth: 920, margin: "0 auto", width: "100%" }} key={step} className="slide-up">
          {title && (
            <div style={{ marginBottom: 36, maxWidth: 680 }}>
              <h1 className="display" style={{ fontSize: "clamp(38px, 4.8vw, 64px)", margin: 0, color: "var(--ink-900)", lineHeight: 1.04 }}>{title}</h1>
              {sub && <p style={{ fontSize: 17.5, color: "var(--ink-soft)", marginTop: 14, lineHeight: 1.5 }}>{sub}</p>}
            </div>
          )}
          {children}
        </div>
      </main>
    </div>
  );
}

// Step 1: destination
function StepDestino({ value, onChange, onNext }) {
  const D = window.NomadeData.destinations;
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        {D.map(d => {
          const sel = value === d.id;
          return (
            <button key={d.id} onClick={() => { onChange(d.id); setTimeout(onNext, 250); }}
              style={{
                position: "relative", padding: 0, borderRadius: 20,
                aspectRatio: "4/5",
                overflow: "hidden",
                outline: sel ? "3px solid var(--orange-500)" : "1px solid var(--line)",
                outlineOffset: sel ? -3 : 0,
                transition: "transform .2s ease, outline .2s ease",
                transform: sel ? "scale(1.02)" : "scale(1)",
                cursor: "pointer",
                background: "var(--bg-paper)",
              }}>
              <img src={d.photo} alt={d.city} style={{ width: "100%", height: "60%", objectFit: "cover", display: "block" }} />
              <div style={{
                position: "absolute", top: 12, right: 12,
                fontSize: 22, background: "var(--cream-50)", padding: "2px 8px", borderRadius: 999, lineHeight: 1.6,
                boxShadow: "var(--shadow-sm)",
              }}>{d.flag}</div>
              {sel && (
                <div style={{
                  position: "absolute", top: 12, left: 12,
                  width: 28, height: 28, borderRadius: 999, background: "var(--orange-500)",
                  display: "grid", placeItems: "center",
                }}>
                  <Icon name="check" size={14} color="white" stroke={3} />
                </div>
              )}
              <div style={{ padding: "14px 16px", textAlign: "left" }}>
                <div className="display" style={{ fontSize: 19, fontWeight: 700, color: "var(--ink-900)", lineHeight: 1.2 }}>{d.city}</div>
                <div style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 2 }}>{d.country} · {d.tag}</div>
              </div>
            </button>
          );
        })}
      </div>
      <div style={{ marginTop: 28, fontSize: 13.5, color: "var(--ink-soft)", display: "flex", alignItems: "center", gap: 6 }}>
        <Icon name="compass" size={14} />
        ¿Otro destino? Estamos sumando ciudades cada mes. <a style={{ color: "var(--orange-700)", fontWeight: 600, marginLeft: 4 }}>Pedí el tuyo →</a>
      </div>
    </div>
  );
}

// Step 2: duration + date
function StepCuando({ duration, monthIdx, onDuration, onMonth, onNext }) {
  const Ds = window.NomadeData.durations;
  const months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 640 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-700)", letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 4 }}>
          ¿Cuánto dura?
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {Ds.map(d => {
            const sel = duration === d.id;
            return (
              <button key={d.id} onClick={() => onDuration(d.id)} style={{
                padding: "20px 16px",
                background: sel ? "var(--ink-900)" : "var(--bg-paper)",
                color: sel ? "var(--cream-50)" : "var(--ink-900)",
                border: sel ? "1px solid var(--ink-900)" : "1px solid var(--line)",
                borderRadius: 16,
                textAlign: "left",
                position: "relative",
                transition: "all .15s ease",
              }}>
                <div className="display" style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em" }}>{d.months} <span style={{ fontSize: 14, fontWeight: 500, opacity: .7 }}>meses</span></div>
                <div style={{ fontSize: 14, opacity: .75, marginTop: 4 }}>{d.label}</div>
                {d.popular && !sel && (
                  <span style={{ position: "absolute", top: 12, right: 12, background: "var(--orange-100)", color: "var(--orange-700)", padding: "2px 8px", borderRadius: 999, fontSize: 11, fontWeight: 600 }}>
                    + elegido
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-700)", letterSpacing: ".05em", textTransform: "uppercase", marginTop: 28, marginBottom: 4 }}>
          ¿Cuándo arranca tu intercambio?
        </div>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>2026 / 2027</div>
            <div style={{ display: "flex", gap: 8, fontSize: 13, color: "var(--ink-soft)" }}>
              <span><Icon name="calendar" size={13} /></span>
              <span>Mes de inicio aproximado</span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 6 }}>
            {months.map((m, i) => {
              const sel = monthIdx === i;
              const past = i < 4; // first 4 are past
              return (
                <button key={i} disabled={past} onClick={() => onMonth(i)} style={{
                  padding: "10px 0",
                  background: sel ? "var(--orange-500)" : past ? "transparent" : "var(--cream-50)",
                  color: sel ? "white" : past ? "var(--ink-300)" : "var(--ink-900)",
                  border: sel ? "1px solid var(--orange-500)" : "1px solid var(--line)",
                  borderRadius: 10,
                  fontSize: 13.5, fontWeight: 600,
                  cursor: past ? "not-allowed" : "pointer",
                  opacity: past ? .5 : 1,
                }}>{m}</button>
              );
            })}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 32 }}>
        <button className="btn btn-orange btn-lg" disabled={!duration || monthIdx === null} onClick={onNext}
          style={{ opacity: (!duration || monthIdx === null) ? .4 : 1 }}>
          Continuar <Icon name="arrow-right" size={16} stroke={2.4} />
        </button>
      </div>
    </div>
  );
}

// Step 3: universidad
function StepUni({ value, onChange, onNext }) {
  return (
    <div style={{ maxWidth: 640 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {window.NomadeData.universities.map(u => {
          const sel = value === u;
          return (
            <button key={u} onClick={() => onChange(u)} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "16px 20px",
              background: sel ? "var(--ink-900)" : "var(--bg-paper)",
              color: sel ? "var(--cream-50)" : "var(--ink-900)",
              border: sel ? "1px solid var(--ink-900)" : "1px solid var(--line)",
              borderRadius: 14,
              fontSize: 15, fontWeight: 500,
              transition: "all .12s ease",
            }}>
              <span>{u}</span>
              {sel
                ? <div style={{ width: 22, height: 22, borderRadius: 999, background: "var(--orange-500)", display: "grid", placeItems: "center" }}><Icon name="check" size={12} color="white" stroke={3} /></div>
                : <div style={{ width: 22, height: 22, borderRadius: 999, border: "1.5px solid var(--line-strong)" }} />
              }
            </button>
          );
        })}
      </div>
      <div style={{ marginTop: 24, padding: 16, background: "var(--orange-100)", borderRadius: 12, fontSize: 14, color: "var(--orange-700)", display: "flex", gap: 10, alignItems: "start" }}>
        <Icon name="sparkle-fill" size={14} color="var(--orange-600)" />
        <span>Si tu universidad es <strong>partner</strong>, tu plan incluye un <strong>10% off</strong>. Te lo aplicamos al final.</span>
      </div>
      <div style={{ marginTop: 24 }}>
        <button className="btn btn-orange btn-lg" disabled={!value} onClick={onNext} style={{ opacity: value ? 1 : .4 }}>
          Continuar <Icon name="arrow-right" size={16} stroke={2.4} />
        </button>
      </div>
    </div>
  );
}

// Step 4: qué ya tenés resuelto — usa los 7 trámites canónicos
function StepResuelto({ value, onToggle, onNext }) {
  const items = window.NomadeData.priorities;
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {items.map(it => {
          const sel = value.includes(it.id);
          return (
            <button key={it.id} onClick={() => onToggle(it.id)} style={{
              padding: 20,
              background: sel ? "var(--green-100)" : "var(--bg-paper)",
              border: sel ? "1px solid var(--green-600)" : "1px solid var(--line)",
              borderRadius: 16,
              textAlign: "left",
              position: "relative",
              transition: "all .12s ease",
              minHeight: 138,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: sel ? "var(--green-600)" : "var(--cream-200)",
                color: sel ? "white" : "var(--ink-700)",
                display: "grid", placeItems: "center",
                marginBottom: 12,
              }}>
                <Icon name={it.icon} size={18} stroke={2} />
              </div>
              <div style={{ fontSize: 14.5, fontWeight: 600, color: sel ? "var(--green-700)" : "var(--ink-900)", lineHeight: 1.25 }}>
                {it.label}
              </div>
              {it.hint && (
                <div style={{ fontSize: 11.5, color: sel ? "var(--green-700)" : "var(--ink-soft)", marginTop: 4, lineHeight: 1.35 }}>
                  {it.hint}
                </div>
              )}
              {sel && (
                <div style={{ position: "absolute", top: 14, right: 14, width: 22, height: 22, borderRadius: 999, background: "var(--green-600)", color: "white", display: "grid", placeItems: "center" }}>
                  <Icon name="check" size={12} color="white" stroke={3} />
                </div>
              )}
            </button>
          );
        })}
      </div>
      <div style={{ marginTop: 24, fontSize: 14, color: "var(--ink-soft)" }}>
        {value.length === 0 && "Ningún trámite resuelto todavía. Tranqui, nosotros nos encargamos."}
        {value.length > 0 && value.length < 4 && `Marcaste ${value.length}. Nos centramos en los que faltan.`}
        {value.length >= 4 && `Genial, marcaste ${value.length}. Vas re bien.`}
      </div>
      <div style={{ marginTop: 24 }}>
        <button className="btn btn-orange btn-lg" onClick={onNext}>
          Continuar <Icon name="arrow-right" size={16} stroke={2.4} />
        </button>
      </div>
    </div>
  );
}

// Step 5: prioridades (ranker by sliders) — oculta los trámites que el usuario ya marcó como hechos
function StepPriorities({ value, onChange, onNext, resolved }) {
  const items = window.NomadeData.priorities.filter(p => !resolved.includes(p.id));
  if (items.length === 0) {
    return (
      <div style={{ maxWidth: 720 }}>
        <div className="card" style={{ padding: 28, textAlign: "center" }}>
          <div style={{ fontSize: 44, marginBottom: 10 }}>🎉</div>
          <h3 className="display" style={{ fontSize: 24, margin: "0 0 8px", color: "var(--ink-900)" }}>Ya tenés todo resuelto.</h3>
          <p style={{ fontSize: 15, color: "var(--ink-soft)", margin: 0 }}>
            Marcaste los 7 trámites como hechos. Si igual querés que te acompañemos, te ofrecemos el Pack Completo para tener todo verificado y soporte humano.
          </p>
        </div>
        <div style={{ marginTop: 24 }}>
          <button className="btn btn-orange btn-lg" onClick={onNext}>
            Continuar <Icon name="arrow-right" size={16} stroke={2.4} />
          </button>
        </div>
      </div>
    );
  }
  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {items.map(it => {
          const v = value[it.id] ?? 3;
          return (
            <div key={it.id} className="card" style={{ padding: "18px 22px", display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: "var(--cream-200)", color: "var(--ink-700)",
                display: "grid", placeItems: "center", flexShrink: 0,
              }}>
                <Icon name={it.icon} size={18} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{it.label}</div>
                <div style={{ display: "flex", gap: 6 }}>
                  {[1,2,3,4,5].map(n => (
                    <button key={n} onClick={() => onChange(it.id, n)} style={{
                      flex: 1, padding: "6px 0",
                      background: n <= v ? "var(--orange-500)" : "var(--cream-200)",
                      borderRadius: 6,
                      height: 22,
                      transition: "background .15s ease",
                    }} />
                  ))}
                </div>
              </div>
              <div style={{ width: 80, textAlign: "right", fontSize: 13, color: "var(--ink-soft)", fontWeight: 500 }}>
                {["", "Bajo", "Bajo", "Medio", "Alto", "Crítico"][v]}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 32 }}>
        <button className="btn btn-orange btn-lg" onClick={onNext}>
          Continuar <Icon name="arrow-right" size={16} stroke={2.4} />
        </button>
      </div>
    </div>
  );
}

// Step 6: Detalles extra — presupuesto + idioma + aclaraciones
function StepDetalles({ budget, language, healthNotes, freeNotes, onBudget, onLanguage, onHealthNotes, onFreeNotes, onNext }) {
  const budgetBands = [
    { v: 0,     label: "No sé todavía",  sub: "Ayúdame a estimarlo" },
    { v: 12000, label: "Hasta USD 15k",  sub: "Lo más ajustado posible" },
    { v: 20000, label: "USD 15–25k",     sub: "Equilibrado" },
    { v: 30000, label: "USD 25k+",       sub: "Sin techo definido" },
  ];
  const langs = ["Solo español", "Inglés básico", "Inglés avanzado", "Otro idioma"];
  return (
    <div style={{ maxWidth: 760, display: "flex", flexDirection: "column", gap: 28 }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-700)", letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 10 }}>
          ¿Tenés un presupuesto estimado para el intercambio?
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {budgetBands.map(b => {
            const sel = budget === b.v;
            return (
              <button key={b.v} onClick={() => onBudget(b.v)} style={{
                padding: "16px 14px", textAlign: "left",
                background: sel ? "var(--ink-900)" : "var(--bg-paper)",
                color: sel ? "var(--cream-50)" : "var(--ink-900)",
                border: sel ? "1px solid var(--ink-900)" : "1px solid var(--line)",
                borderRadius: 14,
                transition: "all .12s ease",
              }}>
                <div style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 4 }}>{b.label}</div>
                <div style={{ fontSize: 12, opacity: .7 }}>{b.sub}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-700)", letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 10 }}>
          ¿Qué idiomas maneás? (filtramos guias y soporte)
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {langs.map(l => {
            const sel = language === l;
            return (
              <button key={l} onClick={() => onLanguage(l)} style={{
                padding: "10px 16px", fontSize: 14, fontWeight: 600,
                background: sel ? "var(--orange-500)" : "var(--bg-paper)",
                color: sel ? "white" : "var(--ink-800)",
                border: sel ? "1px solid var(--orange-500)" : "1px solid var(--line)",
                borderRadius: 999,
              }}>{l}</button>
            );
          })}
        </div>
      </div>

      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-700)", letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 10 }}>
          ¿Algún tema de salud, medicación o dieta que el seguro deba cubrir?
        </div>
        <input value={healthNotes} onChange={e => onHealthNotes(e.target.value)} placeholder="Opcional — ej. asma, celíaca, anteojos"
          style={{ width: "100%", padding: "14px 16px", background: "var(--bg-paper)", border: "1px solid var(--line)", borderRadius: 12, fontSize: 14.5, color: "var(--ink-900)" }} />
      </div>

      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-700)", letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 10 }}>
          ¿Alguna aclaración antes de armar tu paquete?
        </div>
        <textarea value={freeNotes} onChange={e => onFreeNotes(e.target.value)} placeholder="Opcional — viajo con alguien, necesito factura A, quiero llegar antes, etc."
          rows={3} style={{ width: "100%", padding: "14px 16px", background: "var(--bg-paper)", border: "1px solid var(--line)", borderRadius: 12, fontSize: 14.5, color: "var(--ink-900)", resize: "vertical", fontFamily: "inherit" }} />
      </div>

      <div>
        <button className="btn btn-orange btn-lg" onClick={onNext}>
          Ver mi plan <Icon name="arrow-right" size={16} stroke={2.4} />
        </button>
      </div>
    </div>
  );
}

// Step 7: Resultado
function StepResult({ profile, onComplete }) {
  const dest = window.NomadeData.destinations.find(d => d.id === profile.destination) || window.NomadeData.destinations[0];
  const dur = window.NomadeData.durations.find(d => d.id === profile.duration) || window.NomadeData.durations[1];
  const items = window.NomadeData.priorities;          // los 7 trámites canónicos (con precio)
  const total = items.length;                            // 7
  const resolvedCount = profile.resolved.length;
  const remaining = total - resolvedCount;
  const months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

  // Precio "a la carta": suma de los trámites que el usuario AÚN tiene que resolver
  const pendingItems = items.filter(it => !profile.resolved.includes(it.id));
  const sumPending = pendingItems.reduce((s, it) => s + it.price, 0);

  // Pack Completo: precio real fijo $150 (cubre los 7), con -10% si universidad partner
  const packBase = window.NomadeData.packCompletoPrice;  // 150
  const isPartner = profile.uni && profile.uni.includes("San Andrés");
  const packPrice = isPartner ? Math.round(packBase * 0.9) : packBase;
  const packSavings = Math.max(0, sumPending - packPrice);

  // El primer trámite urgente (no resuelto)
  const firstPending = pendingItems[0]?.label || "Alojamiento";

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 48, alignItems: "start" }}>
      {/* Left — perfil */}
      <div>
        <div className="chip chip-orange" style={{ marginBottom: 20 }}>
          <Icon name="sparkle-fill" size={12} /> Tu perfil de intercambio
        </div>
        <h1 className="display" style={{ fontSize: "clamp(40px, 4.8vw, 60px)", margin: 0, color: "var(--ink-900)" }}>
          Listo. Tu plan para <span className="serif-it" style={{ color: "var(--orange-600)" }}>{dest.city}</span> está armado.
        </h1>
        <p style={{ fontSize: 17, color: "var(--ink-soft)", marginTop: 16, lineHeight: 1.55 }}>
          {remaining > 0 ? (
            <>Te identificamos <strong>{remaining} {remaining === 1 ? "trámite" : "trámites"}</strong> que {remaining === 1 ? "falta" : "faltan"} resolver antes de viajar, ordenados por urgencia. El primero es <strong>{firstPending}</strong>, te lleva ~3 semanas.</>
          ) : (
            <>Marcaste los 7 trámites como hechos. Te ofrecemos el Pack Completo igual para verificar todo y tener soporte humano durante el viaje.</>
          )}
        </p>

        <div style={{ marginTop: 28, padding: 24, background: "var(--bg-paper)", borderRadius: 20, border: "1px solid var(--line)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ink-soft)" }}>Destino</div>
              <div style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>{dest.flag} {dest.city}, {dest.country}</div>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ink-soft)" }}>Duración</div>
              <div style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>{dur.label} · {dur.months}m</div>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ink-soft)" }}>Universidad</div>
              <div style={{ fontSize: 15, fontWeight: 600, marginTop: 4 }}>{profile.uni}</div>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ink-soft)" }}>Salida</div>
              <div style={{ fontSize: 15, fontWeight: 600, marginTop: 4 }}>{months[profile.monthIdx]} 2027</div>
            </div>
          </div>
          <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid var(--line)" }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ink-soft)" }}>Avance</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
              <div style={{ flex: 1, height: 10, background: "var(--cream-200)", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ width: `${(resolvedCount/total)*100}%`, height: "100%", background: "var(--green-600)", borderRadius: 999, transition: "width .8s ease" }} />
              </div>
              <span style={{ fontSize: 14, fontWeight: 700 }}>{resolvedCount}/{total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right — recomendación de pack */}
      <div style={{ background: "var(--ink-900)", color: "var(--cream-50)", borderRadius: 24, padding: 32, position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: -100, right: -100, width: 280, height: 280,
          background: "radial-gradient(circle, rgba(232,136,54,0.4), transparent 70%)",
        }} />
        <div style={{ position: "relative" }}>
          <div className="chip" style={{ background: "var(--orange-500)", color: "white", border: "none", marginBottom: 16 }}>
            <Icon name="sparkle-fill" size={11} color="white" /> Tu pack recomendado
          </div>
          <h3 className="display" style={{ fontSize: 30, fontWeight: 700, margin: "0 0 4px" }}>Pack Completo</h3>
          <div style={{ fontSize: 13.5, opacity: .7, marginBottom: 20 }}>Todos los trámites incluidos · sale más barato que armarlo a la carta</div>

          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
            <span className="display" style={{ fontSize: 64, fontWeight: 800, letterSpacing: "-0.04em" }}>${packPrice}</span>
            <span style={{ fontSize: 14, opacity: .65 }}>USD</span>
            {isPartner && (
              <span className="chip" style={{ background: "var(--orange-500)", color: "white", border: "none", fontSize: 11, padding: "2px 8px", marginLeft: 4 }}>−10% UdeSA</span>
            )}
          </div>
          {packSavings > 0 && (
            <div style={{ fontSize: 13, color: "var(--orange-300)", fontWeight: 600, marginBottom: 16 }}>
              Ahorrás USD {packSavings} vs. resolver suelto lo que te falta
            </div>
          )}
          {packSavings === 0 && remaining > 0 && (
            <div style={{ fontSize: 13, opacity: .7, marginBottom: 16 }}>
              Te queda poco por resolver — igual te conviene por el soporte y la verificación humana.
            </div>
          )}

          {/* Comparativa: a la carta */}
          <div style={{ marginTop: 8, marginBottom: 20, padding: 14, background: "rgba(255,255,255,0.05)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13 }}>
              <span style={{ opacity: .7 }}>Resolver suelto lo que te falta ({remaining})</span>
              <span style={{ fontWeight: 700, fontSize: 16, textDecoration: packSavings > 0 ? "line-through" : "none", opacity: packSavings > 0 ? .55 : 1 }}>USD {sumPending}</span>
            </div>
          </div>

          <button onClick={onComplete} className="btn btn-orange btn-lg" style={{ width: "100%", justifyContent: "center", marginBottom: 14 }}>
            Entrar a mi plan <Icon name="arrow-right" size={16} stroke={2.4} />
          </button>
          <div style={{ fontSize: 12.5, opacity: .65, textAlign: "center", marginBottom: 22 }}>
            Vista previa gratis. Pagás cuando estés listo.
          </div>

          {/* Desglose de trámites con check (hecho) o reloj (pendiente) */}
          <div style={{ paddingTop: 18, borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", opacity: .55, marginBottom: 4 }}>
              Estado actual ({resolvedCount}/{total} listos)
            </div>
            {items.map(it => {
              const done = profile.resolved.includes(it.id);
              return (
                <div key={it.id} style={{ display: "flex", gap: 10, fontSize: 13.5, alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", minWidth: 0 }}>
                    {done ? (
                      <span style={{ width: 18, height: 18, borderRadius: 999, background: "var(--green-600)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                        <Icon name="check" size={11} color="white" stroke={3} />
                      </span>
                    ) : (
                      <span style={{ width: 18, height: 18, borderRadius: 999, background: "rgba(232,136,54,0.18)", border: "1px solid rgba(232,136,54,0.6)", display: "grid", placeItems: "center", flexShrink: 0, color: "var(--orange-400)" }}>
                        <Icon name="clock" size={10} color="var(--orange-400)" stroke={2.5} />
                      </span>
                    )}
                    <span style={{ opacity: done ? .55 : 1, textDecoration: done ? "line-through" : "none", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{it.label}</span>
                  </div>
                  <span style={{ fontSize: 12, opacity: done ? .4 : .7, fontVariantNumeric: "tabular-nums", fontWeight: 600 }}>USD {it.price}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function Onboarding({ onComplete, onClose }) {
  const [step, setStep] = useStateO(0);
  const [destination, setDestination] = useStateO(null);
  const [duration, setDuration] = useStateO("semester");
  const [monthIdx, setMonthIdx] = useStateO(null);
  const [uni, setUni] = useStateO(null);
  const [resolved, setResolved] = useStateO([]);
  const [priorities, setPriorities] = useStateO({ visa_pasaporte: 5, alojam: 5, seguro: 4, banco: 3, esim: 3, pasajes: 3, papeles: 3 });
  const [budget, setBudget] = useStateO(null);
  const [language, setLanguage] = useStateO(null);
  const [healthNotes, setHealthNotes] = useStateO("");
  const [freeNotes, setFreeNotes] = useStateO("");

  const total = 7;
  const next = () => setStep(s => Math.min(s + 1, total - 1));
  const back = () => step === 0 ? onClose() : setStep(s => s - 1);

  const toggleResolved = (id) => setResolved(r => r.includes(id) ? r.filter(x => x !== id) : [...r, id]);
  const setPriority = (id, v) => setPriorities(p => ({ ...p, [id]: v }));

  const titles = [
    { t: "Primero lo primero. ¿A dónde te vas?", s: "Elegí tu ciudad de intercambio. Cubrimos los destinos más elegidos por estudiantes argentinos." },
    { t: "¿Cuándo arranca tu intercambio?", s: "Con esto calculamos los deadlines de cada trámite y te ordenamos lo urgente primero." },
    { t: "¿De qué universidad salís?", s: "Si tu universidad es partner, el plan tiene descuento y conectamos con tu oficina de intercambio." },
    { t: "¿Qué ya tenés resuelto?", s: "Marcá lo que ya está hecho. No tiene sentido perder tiempo en cosas que ya hiciste." },
    { t: "¿Qué te preocupa más?", s: "Ordená cada trámite por importancia. Te mostramos primero lo que más te quita el sueño." },
    { t: "Últimos detalles para personalizarlo", s: "Cuatro datos rápidos. Cuanto más nos cuentes, más a medida queda tu paquete." },
    { t: null, s: null },
  ];

  const profile = { destination, duration, monthIdx, uni, resolved, priorities, budget, language, healthNotes, freeNotes };

  return (
    <StepShell title={titles[step].t} sub={titles[step].s} step={step} total={total} onBack={back} onClose={onClose}>
      {step === 0 && <StepDestino value={destination} onChange={setDestination} onNext={next} />}
      {step === 1 && <StepCuando duration={duration} monthIdx={monthIdx} onDuration={setDuration} onMonth={setMonthIdx} onNext={next} />}
      {step === 2 && <StepUni value={uni} onChange={setUni} onNext={next} />}
      {step === 3 && <StepResuelto value={resolved} onToggle={toggleResolved} onNext={next} />}
      {step === 4 && <StepPriorities value={priorities} onChange={setPriority} onNext={next} resolved={resolved} />}
      {step === 5 && <StepDetalles budget={budget} language={language} healthNotes={healthNotes} freeNotes={freeNotes}
                                   onBudget={setBudget} onLanguage={setLanguage} onHealthNotes={setHealthNotes} onFreeNotes={setFreeNotes}
                                   onNext={next} />}
      {step === 6 && <StepResult profile={profile} onComplete={() => onComplete(profile)} />}
    </StepShell>
  );
}

Object.assign(window, { Onboarding });
