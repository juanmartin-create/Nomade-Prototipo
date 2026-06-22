// Shared components: Logo, Icons, small primitives
// Exposed globally on window for cross-file Babel access

const NomadeLogo = ({ size = 28, showText = true, color }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <svg width={size} height={size} viewBox="0 0 40 40" style={{ flexShrink: 0 }}>
      <defs>
        <linearGradient id="nlsky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F8B864" />
          <stop offset="55%" stopColor="#F1A350" />
          <stop offset="100%" stopColor="#E27E2A" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="38" height="38" rx="10" fill="url(#nlsky)" />
      {/* Sun ridge */}
      <path d="M1 28 Q 8 22, 14 25 T 26 23 T 39 26 L 39 39 L 1 39 Z" fill="#7A9A55" opacity=".85" />
      {/* Mini plane */}
      <path d="M28 10 l4 -1 l-1 3 l3 1 l-4 2 l-1 3 l-2 -3 l-3 1 z" fill="#fff" opacity=".95" />
      {/* Tiny "passport" dot */}
      <circle cx="11" cy="18" r="3" fill="#A8412B" />
      <rect x="9.5" y="16.5" width="3" height="3" rx=".5" fill="#C76040" />
    </svg>
    {showText && (
      <span className="display" style={{
        fontSize: size * 0.78,
        letterSpacing: '-0.04em',
        fontWeight: 800,
        color: color || 'var(--ink-900)',
        lineHeight: 1,
      }}>
        NOMADE
      </span>
    )}
  </div>
);

// Tiny line-icon set
const Icon = ({ name, size = 18, stroke = 1.6, color = "currentColor" }) => {
  const s = size;
  const props = { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "arrow-right": return (<svg {...props}><path d="M5 12h14M13 6l6 6-6 6"/></svg>);
    case "arrow-left":  return (<svg {...props}><path d="M19 12H5M11 6l-6 6 6 6"/></svg>);
    case "check":       return (<svg {...props}><path d="M5 12l5 5 9-11"/></svg>);
    case "check-circle":return (<svg {...props}><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></svg>);
    case "clock":       return (<svg {...props}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>);
    case "lock":        return (<svg {...props}><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>);
    case "spark":       return (<svg {...props}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/></svg>);
    case "passport":    return (<svg {...props}><rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="11" r="3"/><path d="M9 17h6"/></svg>);
    case "home":        return (<svg {...props}><path d="M3 11l9-8 9 8M5 10v10h14V10"/></svg>);
    case "shield":      return (<svg {...props}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/></svg>);
    case "bank":        return (<svg {...props}><path d="M3 10l9-6 9 6"/><path d="M5 10v8M9 10v8M15 10v8M19 10v8M3 21h18"/></svg>);
    case "signal":      return (<svg {...props}><path d="M5 20v-4M10 20v-8M15 20v-12M20 20V4"/></svg>);
    case "plane":       return (<svg {...props}><path d="M21 16l-7-3V5a2 2 0 10-4 0v8l-7 3v2l7-1.5V20l-2 1.5V23l4-1 4 1v-1.5L10 20v-3.5L17 18z"/></svg>);
    case "doc":         return (<svg {...props}><path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></svg>);
    case "globe":       return (<svg {...props}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/></svg>);
    case "users":       return (<svg {...props}><circle cx="9" cy="9" r="3.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M15 13.5c4 0 6 2 6 5.5"/></svg>);
    case "chat":        return (<svg {...props}><path d="M21 12a8 8 0 11-3-6.2L21 4l-1 4.5A8 8 0 0121 12z"/></svg>);
    case "calendar":    return (<svg {...props}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>);
    case "compass":     return (<svg {...props}><circle cx="12" cy="12" r="9"/><path d="M16 8l-2.5 5L8 16l2.5-5z"/></svg>);
    case "menu":        return (<svg {...props}><path d="M4 7h16M4 12h16M4 17h16"/></svg>);
    case "x":           return (<svg {...props}><path d="M6 6l12 12M18 6L6 18"/></svg>);
    case "play":        return (<svg {...props}><path d="M7 5l12 7-12 7z" fill={color}/></svg>);
    case "search":      return (<svg {...props}><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>);
    case "bell":        return (<svg {...props}><path d="M6 16V11a6 6 0 1112 0v5l2 2H4z"/><path d="M10 20a2 2 0 004 0"/></svg>);
    case "sparkle-fill":return (<svg width={s} height={s} viewBox="0 0 24 24" fill={color}><path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6z"/></svg>);
    case "star":        return (<svg {...props}><path d="M12 3l2.6 5.6 6.4.7-4.8 4.4 1.3 6.3L12 17l-5.5 2.9 1.3-6.3L3 9.3l6.4-.7z"/></svg>);
    case "heart":       return (<svg {...props}><path d="M12 20s-7-4.5-7-10a4.5 4.5 0 018-3 4.5 4.5 0 018 3c0 5.5-7 10-7 10z"/></svg>);
    case "wallet":      return (<svg {...props}><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M16 14h2"/></svg>);
    case "map-pin":     return (<svg {...props}><path d="M12 21s-7-6-7-12a7 7 0 0114 0c0 6-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>);
    case "flag":        return (<svg {...props}><path d="M5 21V4M5 5h11l-2 3.5L16 12H5"/></svg>);
    case "gauge":       return (<svg {...props}><path d="M5 18a7 7 0 1114 0"/><path d="M12 14l3-3"/></svg>);
    default: return null;
  }
};

// Status pill
const StatusPill = ({ status }) => {
  const map = {
    done: { bg: "var(--green-100)", color: "var(--green-700)", border: "rgba(107,139,74,.25)", label: "Listo", icon: "check" },
    in_progress: { bg: "var(--orange-100)", color: "var(--orange-700)", border: "rgba(184,92,24,.25)", label: "En curso", icon: "clock" },
    ready: { bg: "var(--blue-100)", color: "var(--blue-700)", border: "rgba(43,91,110,.25)", label: "Listo para elegir", icon: "spark" },
    pending: { bg: "var(--cream-200)", color: "var(--ink-700)", border: "var(--line)", label: "Pendiente", icon: "clock" },
    blocked: { bg: "rgba(208,90,60,.10)", color: "var(--red-600)", border: "rgba(208,90,60,.25)", label: "Bloqueado", icon: "lock" },
  };
  const s = map[status] || map.pending;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "4px 10px",
      background: s.bg,
      color: s.color,
      border: `1px solid ${s.border}`,
      borderRadius: 999,
      fontSize: 12, fontWeight: 600,
      letterSpacing: "-0.005em",
    }}>
      <Icon name={s.icon} size={12} stroke={2.2} />
      {s.label}
    </span>
  );
};

// Decorative noise / grain
const Grain = () => (
  <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",mixBlendMode:"multiply",opacity:.06}}>
    <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" /></filter>
    <rect width="100%" height="100%" filter="url(#grain)" />
  </svg>
);

Object.assign(window, { NomadeLogo, Icon, StatusPill, Grain });
