// Dashboard — Post-payment app (the actual web del producto)
// Receives profile from onboarding; shows trámites, services, countdown, etc.

const { useState: useStateD, useMemo: useMemoD } = React;

function SideNav({ active, onChange, profile, onExit }) {
  const sections = window.NomadeData.navSections;
  const dest = window.NomadeData.destinations.find(d => d.id === profile.destination) || window.NomadeData.destinations[0];
  return (
    <aside style={{
      width: 248, flexShrink: 0, padding: "20px 14px",
      background: "var(--cream-50)",
      borderRight: "1px solid var(--line)",
      display: "flex", flexDirection: "column",
      height: "100vh", position: "sticky", top: 0,
    }}>
      <div style={{ padding: "8px 10px 20px" }}>
        <NomadeLogo size={22} />
      </div>

      {/* Trip card */}
      <div style={{
        margin: "0 0 20px",
        padding: 14, borderRadius: 14,
        background: "var(--ink-900)", color: "var(--cream-50)",
        position: "relative", overflow: "hidden",
      }}>
        <img src={dest.photo} alt="" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: .35,
        }} />
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 11, opacity: .75, textTransform: "uppercase", letterSpacing: ".08em", fontWeight: 600 }}>Tu intercambio</div>
          <div className="display" style={{ fontSize: 22, fontWeight: 700, marginTop: 2 }}>{dest.flag} {dest.city}</div>
          <div style={{ fontSize: 12.5, opacity: .8, marginTop: 4 }}>87 días para tu salida</div>
        </div>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {sections.map(s => {
          const isActive = active === s.id;
          return (
            <button key={s.id} onClick={() => onChange(s.id)} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "10px 12px", borderRadius: 10,
              background: isActive ? "var(--cream-200)" : "transparent",
              color: isActive ? "var(--ink-900)" : "var(--ink-700)",
              fontSize: 14.5, fontWeight: isActive ? 600 : 500,
              textAlign: "left", width: "100%",
              transition: "background .12s ease",
            }}
              onMouseOver={e => !isActive && (e.currentTarget.style.background = "var(--cream-100)")}
              onMouseOut={e => !isActive && (e.currentTarget.style.background = "transparent")}>
              <Icon name={s.icon} size={17} stroke={isActive ? 2 : 1.7} />
              <span style={{ flex: 1 }}>{s.label}</span>
              {s.badge && (
                <span style={{
                  background: isActive ? "var(--orange-500)" : "var(--orange-200)",
                  color: isActive ? "white" : "var(--orange-700)",
                  fontSize: 11, fontWeight: 700, padding: "1px 7px", borderRadius: 999,
                }}>{s.badge}</span>
              )}
            </button>
          );
        })}
      </nav>

      <div style={{ flex: 1 }} />

      {/* Apoyo card */}
      <div style={{
        padding: 14, borderRadius: 14, background: "var(--orange-100)", border: "1px solid var(--orange-200)",
        marginBottom: 8,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop" style={{ width: 32, height: 32, borderRadius: 999 }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-900)" }}>Julia, tu copiloto</div>
            <div style={{ fontSize: 11, color: "var(--orange-700)" }}>● en línea · 9–22h</div>
          </div>
        </div>
        <button style={{ width: "100%", padding: "8px 12px", background: "var(--orange-500)", color: "white", borderRadius: 8, fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <Icon name="chat" size={13} stroke={2.4} />
          Hablar con Julia
        </button>
      </div>

      <button onClick={onExit} style={{ padding: "10px 12px", display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--ink-soft)", borderRadius: 8 }}>
        <Icon name="arrow-left" size={14} /> Volver al sitio
      </button>

      {/* User */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 8px", borderTop: "1px solid var(--line)", marginTop: 4 }}>
        <div style={{ width: 32, height: 32, borderRadius: 999, background: "var(--green-600)", color: "white", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 13 }}>TM</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Tomás Mendizábal</div>
          <div style={{ fontSize: 11, color: "var(--ink-soft)" }}>{profile.uni || "UdeSA"}</div>
        </div>
      </div>
    </aside>
  );
}

function TopBar({ activeView }) {
  return (
    <div style={{
      padding: "16px 32px", display: "flex", alignItems: "center", gap: 16,
      borderBottom: "1px solid var(--line)",
      background: "rgba(251,246,235,0.78)",
      backdropFilter: "blur(18px)",
      position: "sticky", top: 0, zIndex: 5,
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "8px 14px", background: "var(--bg-paper)",
        border: "1px solid var(--line)", borderRadius: 10,
        flex: 1, maxWidth: 380, fontSize: 13.5, color: "var(--ink-soft)",
      }}>
        <Icon name="search" size={15} />
        Buscar trámites, servicios, barrios…
        <span style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: 11, opacity: .65, padding: "2px 5px", border: "1px solid var(--line)", borderRadius: 4 }}>⌘K</span>
      </div>
      <div style={{ flex: 1 }} />
      <button style={{ padding: 10, borderRadius: 10, position: "relative", color: "var(--ink-700)" }}>
        <Icon name="bell" size={18} />
        <span style={{ position: "absolute", top: 8, right: 8, width: 8, height: 8, borderRadius: 999, background: "var(--orange-500)" }} />
      </button>
    </div>
  );
}

// Trámite row card
function TramiteCard({ t, expanded, onToggle }) {
  const statusBgMap = {
    done: "var(--green-100)", in_progress: "var(--orange-100)", ready: "var(--blue-100)", pending: "var(--cream-100)", blocked: "var(--red-100)",
  };
  const iconMap = {
    visa_pasaporte: "passport", visa: "doc", pasaporte: "passport",
    seguro: "shield", banco: "bank", esim: "signal",
    alojam: "home", alojamiento: "home", pasajes: "plane", vuelos: "plane",
    uni: "doc", papeles: "doc",
  };
  return (
    <div className="card" style={{ overflow: "hidden", transition: "box-shadow .15s ease" }}>
      <button onClick={onToggle} style={{
        display: "flex", alignItems: "center", gap: 16,
        width: "100%", padding: "18px 20px",
        textAlign: "left",
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: statusBgMap[t.status],
          display: "grid", placeItems: "center", flexShrink: 0,
        }}>
          <Icon name={iconMap[t.id] || "doc"} size={20} color="var(--ink-800)" stroke={1.8} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 2 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: "var(--ink-900)" }}>{t.title}</span>
            <StatusPill status={t.status} />
          </div>
          <div style={{ fontSize: 13.5, color: "var(--ink-soft)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {t.sub}
          </div>
        </div>
        {t.status === "in_progress" && (
          <div style={{ width: 90, flexShrink: 0 }}>
            <div style={{ height: 6, background: "var(--cream-200)", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ width: `${t.progress || 50}%`, height: "100%", background: "var(--orange-500)" }} />
            </div>
            <div style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 4, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{t.progress || 50}%</div>
          </div>
        )}
        {t.status === "ready" && (
          <span style={{ fontSize: 12.5, color: "var(--blue-700)", fontWeight: 600 }}>{t.options} opciones</span>
        )}
        <Icon name="arrow-right" size={16} color="var(--ink-soft)" />
      </button>
      {expanded && (
        <div style={{ padding: "0 20px 20px 80px", borderTop: "1px solid var(--line)", paddingTop: 16 }} className="fade-in">
          {t.nextAction && (
            <div style={{ display: "flex", gap: 10, padding: 12, background: "var(--orange-100)", borderRadius: 10, marginBottom: 12, alignItems: "center" }}>
              <Icon name="sparkle-fill" size={14} color="var(--orange-600)" />
              <span style={{ fontSize: 13.5, color: "var(--orange-700)", fontWeight: 600 }}>Próximo paso: </span>
              <span style={{ fontSize: 13.5, color: "var(--ink-800)" }}>{t.nextAction}</span>
            </div>
          )}
          {t.blockedBy && (
            <div style={{ display: "flex", gap: 10, padding: 12, background: "var(--red-100)", borderRadius: 10, marginBottom: 12 }}>
              <Icon name="lock" size={14} color="var(--red-600)" />
              <span style={{ fontSize: 13.5, color: "var(--red-600)" }}>{t.blockedBy}</span>
            </div>
          )}
          {t.provider && (
            <div style={{ fontSize: 13, color: "var(--ink-soft)", marginBottom: 12 }}>
              <strong style={{ color: "var(--ink-800)" }}>Proveedor:</strong> {t.provider}
            </div>
          )}
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-primary btn-sm">Abrir trámite <Icon name="arrow-right" size={12} stroke={2.4} /></button>
            <button className="btn btn-ghost btn-sm">Ver guía</button>
            <button className="btn btn-ghost btn-sm"><Icon name="chat" size={13} /> Preguntarle a Julia</button>
          </div>
        </div>
      )}
    </div>
  );
}

function HomeView({ profile, onView }) {
  // Los 7 trámites canónicos del dashboard. Si el usuario los marcó como hechos en onboarding,
  // forzamos status "done" para que el dashboard refleje su estado real.
  const T = useMemoD(() => window.NomadeData.tramites.map(t =>
    profile.resolved && profile.resolved.includes(t.id) ? { ...t, status: "done", sub: "Verificado ✓", progress: 100 } : t
  ), [profile.resolved]);
  const dest = window.NomadeData.destinations.find(d => d.id === profile.destination) || window.NomadeData.destinations[0];
  const months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  const startMonth = months[profile.monthIdx ?? 7];

  const done = T.filter(t => t.status === "done").length;
  const total = T.length;                                  // 7
  const pct = Math.round((done / total) * 100);

  const [expandedId, setExpandedId] = useStateD("seguro");

  // Categorize for the next-actions area
  const inProgress = T.filter(t => t.status === "in_progress");
  const ready = T.filter(t => t.status === "ready");

  return (
    <div data-screen-label="03 Dashboard — Inicio" style={{ padding: "32px 32px 80px", display: "grid", gridTemplateColumns: "1fr 320px", gap: 32, alignItems: "start" }}>
      <div>
        {/* Greeting + countdown */}
        <div style={{ marginBottom: 32 }}>
          <div className="eyebrow" style={{ color: "var(--orange-700)" }}>Inicio</div>
          <h1 className="display" style={{ fontSize: "clamp(36px, 4.4vw, 56px)", margin: "8px 0 0", color: "var(--ink-900)" }}>
            Hola, Tomás. Faltan <span style={{ color: "var(--orange-600)" }}>87 días</span> para {dest.city}.
          </h1>
          <p style={{ fontSize: 16, color: "var(--ink-soft)", marginTop: 10, maxWidth: 720 }}>
            Salís el 14 de {startMonth}. Hay {inProgress.length} cosas en curso y {ready.length} listas para que elijas. Bien encaminado.
          </p>
        </div>

        {/* Progress hero */}
        <div className="card" style={{ padding: 28, marginBottom: 24, background: "var(--bg-paper)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ink-soft)" }}>Tu plan</div>
              <div className="display" style={{ fontSize: 30, fontWeight: 700, marginTop: 4 }}>{done} de {total} trámites listos</div>
            </div>
            <div style={{ position: "relative", width: 86, height: 86 }}>
              <svg width="86" height="86" viewBox="0 0 86 86">
                <circle cx="43" cy="43" r="36" fill="none" stroke="var(--cream-200)" strokeWidth="10" />
                <circle cx="43" cy="43" r="36" fill="none" stroke="var(--green-600)" strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 36}`}
                  strokeDashoffset={`${2 * Math.PI * 36 * (1 - pct / 100)}`}
                  strokeLinecap="round"
                  transform="rotate(-90 43 43)"
                  style={{ transition: "stroke-dashoffset 1s ease" }} />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
                <div className="display" style={{ fontSize: 22, fontWeight: 700 }}>{pct}%</div>
              </div>
            </div>
          </div>
          {/* Stack progress bar */}
          <div style={{ display: "flex", gap: 2, marginBottom: 10 }}>
            {T.map(t => (
              <div key={t.id} style={{
                flex: 1, height: 8, borderRadius: 4,
                background: t.status === "done" ? "var(--green-600)" :
                            t.status === "in_progress" ? "var(--orange-500)" :
                            t.status === "ready" ? "var(--blue-500)" :
                            t.status === "blocked" ? "var(--red-500)" :
                            "var(--cream-300)",
              }} />
            ))}
          </div>
          <div style={{ display: "flex", gap: 18, fontSize: 12.5, color: "var(--ink-soft)", flexWrap: "wrap" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: "var(--green-600)" }}/>Listos {done}</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: "var(--orange-500)" }}/>En curso {inProgress.length}</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: "var(--blue-500)" }}/>Para elegir {ready.length}</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: "var(--red-500)" }}/>Bloqueado {T.filter(t => t.status === "blocked").length}</span>
          </div>
        </div>

        {/* Next action featured card */}
        <div style={{
          background: "linear-gradient(135deg, var(--ink-900), #3B2415)", color: "var(--cream-50)",
          borderRadius: 24, padding: 32, marginBottom: 32, position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: -80, right: -60, width: 280, height: 280,
            background: "radial-gradient(circle, rgba(232,136,54,0.45), transparent 65%)",
          }} />
          <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 12, color: "var(--orange-300)", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 12 }}>
                <Icon name="sparkle-fill" size={11} color="var(--orange-400)" /> Próxima acción
              </div>
              <h2 className="display" style={{ fontSize: 28, fontWeight: 700, margin: "0 0 8px", lineHeight: 1.2 }}>
                Elegí tu seguro médico estudiantil
              </h2>
              <p style={{ fontSize: 15, opacity: .75, maxWidth: 480, lineHeight: 1.5, margin: 0 }}>
                Te filtramos 3 opciones para tu perfil: 6 meses en España, cobertura preexistentes, deportes incluidos.
                Carlos III lo exige antes del 30 de noviembre.
              </p>
              <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                <button className="btn btn-orange btn-sm">Ver 3 opciones <Icon name="arrow-right" size={12} stroke={2.4} /></button>
                <button style={{ padding: "10px 16px", border: "1px solid rgba(251,246,235,0.2)", borderRadius: 999, color: "var(--cream-50)", fontSize: 13.5, fontWeight: 600 }}>Recordar mañana</button>
              </div>
            </div>
            <div style={{ width: 200, height: 140, borderRadius: 16, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", padding: 16, position: "relative" }}>
              <div style={{ fontSize: 11, opacity: .7, fontWeight: 600 }}>RECOMENDADO</div>
              <div style={{ fontSize: 17, fontWeight: 700, marginTop: 4 }}>Asseguro Plus</div>
              <div style={{ fontSize: 12, opacity: .7, marginTop: 2 }}>Cobertura €60.000</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, position: "absolute", left: 16, bottom: 16 }}>
                <span style={{ fontSize: 11, opacity: .7 }}>desde</span>
                <span className="display" style={{ fontSize: 24, fontWeight: 700 }}>€42</span>
                <span style={{ fontSize: 11, opacity: .7 }}>/mes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trámites list */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <h2 className="display" style={{ fontSize: 26, fontWeight: 700, margin: 0 }}>Todos tus trámites</h2>
          <div style={{ display: "flex", gap: 6 }}>
            {["Todos", "Trámites", "Servicios", "Vida en destino"].map((c, i) => (
              <button key={c} style={{
                padding: "6px 12px", fontSize: 13, fontWeight: 500,
                background: i === 0 ? "var(--ink-900)" : "transparent",
                color: i === 0 ? "var(--cream-50)" : "var(--ink-700)",
                borderRadius: 999,
                border: i === 0 ? "1px solid var(--ink-900)" : "1px solid var(--line)",
              }}>{c}</button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {T.map(t => (
            <TramiteCard key={t.id} t={t} expanded={expandedId === t.id} onToggle={() => setExpandedId(expandedId === t.id ? null : t.id)} />
          ))}
        </div>
      </div>

      {/* Right rail */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, position: "sticky", top: 92 }}>
        {/* Timeline */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>Tu cronograma</h3>
            <Icon name="calendar" size={15} color="var(--ink-soft)" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { d: "Hoy", t: "Elegir seguro médico", urgent: true },
              { d: "Mar 28", t: "Turno consulado España" },
              { d: "Mar 30", t: "Deadline Carlos III seguro" },
              { d: "Abr 12", t: "Compra eSIM óptima" },
              { d: "May 02", t: "Comprar vuelos (–18%)" },
              { d: "Jul 14", t: "✈️ Salida a Madrid", milestone: true },
            ].map((e, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "start" }}>
                <div style={{
                  width: 54, flexShrink: 0, fontSize: 11.5, fontWeight: 600,
                  color: e.urgent ? "var(--orange-700)" : "var(--ink-soft)",
                  textTransform: "uppercase", letterSpacing: ".06em",
                  paddingTop: 2,
                }}>{e.d}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: e.milestone ? 700 : 500, color: e.milestone ? "var(--orange-700)" : "var(--ink-900)" }}>{e.t}</div>
                  {i < 5 && <div style={{ height: 14, width: 2, background: "var(--cream-300)", marginLeft: 4, marginTop: 6 }} />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>Tu cohorte en Madrid</h3>
            <span style={{ fontSize: 12, color: "var(--ink-soft)" }}>23 esta tanda</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
            {[
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop",
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop",
              "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&h=60&fit=crop",
              "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=60&h=60&fit=crop",
              "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=60&h=60&fit=crop",
            ].map((src, i) => (
              <img key={i} src={src} style={{ width: 32, height: 32, borderRadius: 999, border: "2px solid var(--bg-paper)", marginLeft: i ? -8 : 0 }} />
            ))}
            <span style={{ marginLeft: 8, fontSize: 12.5, color: "var(--ink-soft)" }}>+18</span>
          </div>
          <div style={{ fontSize: 13, color: "var(--ink-soft)", marginBottom: 12, lineHeight: 1.45 }}>
            <strong style={{ color: "var(--ink-900)" }}>Sofía</strong> preguntó: "¿alguien sabe si Bankinter te pide DNI español?"
          </div>
          <button style={{ width: "100%", padding: "8px", background: "var(--cream-200)", borderRadius: 8, fontSize: 13, fontWeight: 600, color: "var(--ink-800)" }}>
            Entrar al chat
          </button>
        </div>

        {/* TikTok / content */}
        <div className="card" style={{ padding: 20, background: "var(--orange-100)", border: "1px solid var(--orange-200)" }}>
          <div style={{ fontSize: 12, color: "var(--orange-700)", fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 8 }}>
            Para vos esta semana
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink-900)", marginBottom: 6, lineHeight: 1.35 }}>
            Los 5 barrios más buscados por argentinos en Madrid (y cuál evitar)
          </div>
          <div style={{ fontSize: 12.5, color: "var(--orange-700)" }}>5 min de lectura · curado por Julia</div>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ profile, onExit }) {
  const [active, setActive] = useStateD("home");
  return (
    <div style={{ display: "flex", background: "var(--cream-100)", minHeight: "100vh" }} className="fade-in">
      <SideNav active={active} onChange={setActive} profile={profile} onExit={onExit} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <TopBar activeView={active} />
        <HomeView profile={profile} onView={setActive} />
      </div>
    </div>
  );
}

Object.assign(window, { Dashboard });
