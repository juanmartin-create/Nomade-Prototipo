// Main App — view router for Landing → Onboarding → Dashboard

const { useState: useStateA, useEffect: useEffectA } = React;

const NOMADE_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "warm",
  "displayFont": "bricolage",
  "headline": "Tu intercambio,|*resuelto* antes",
  "recommendedPack": "completo",
  "showParents": true,
  "showPrices": true,
  "stickerStyle": "stamp"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(NOMADE_DEFAULTS);
  const [view, setView] = useStateA("landing"); // landing | onboarding | dashboard
  const [profile, setProfile] = useStateA(null);

  // Apply palette to root
  useEffectA(() => {
    const root = document.documentElement;
    const palettes = {
      warm:    { cream: "#F6F0E1", paper: "#FBF6EB", ink: "#2A1A0E", accent: "#E88836", accent6: "#D87026", accent7: "#B85C18", accent1: "#FDEEDC", accent2: "#FCE0BC" },
      sand:    { cream: "#EFE9DB", paper: "#F7F3E7", ink: "#1F1812", accent: "#C77C3C", accent6: "#A8632C", accent7: "#8A4F23", accent1: "#F4E4D1", accent2: "#EBD0AC" },
      forest:  { cream: "#EEEAD8", paper: "#F5F2E2", ink: "#1A2418", accent: "#6B8B4A", accent6: "#56723A", accent7: "#42592C", accent1: "#DDE6C8", accent2: "#C8D6A8" },
      slate:   { cream: "#EAE6DE", paper: "#F2EFE8", ink: "#1A1D24", accent: "#3C6E91", accent6: "#2E597A", accent7: "#234866", accent1: "#D6E2EC", accent2: "#B8CCDC" },
    };
    const p = palettes[t.palette] || palettes.warm;
    root.style.setProperty('--cream-100', p.cream);
    root.style.setProperty('--bg-paper', p.paper);
    root.style.setProperty('--ink-900', p.ink);
    root.style.setProperty('--orange-500', p.accent);
    root.style.setProperty('--orange-600', p.accent6);
    root.style.setProperty('--orange-700', p.accent7);
    root.style.setProperty('--orange-100', p.accent1);
    root.style.setProperty('--orange-200', p.accent2);
  }, [t.palette]);

  // Apply display font
  useEffectA(() => {
    const root = document.documentElement;
    const fonts = {
      bricolage: '"Bricolage Grotesque", "Hanken Grotesk", system-ui, sans-serif',
      space:     '"Space Grotesk", "Hanken Grotesk", system-ui, sans-serif',
      serif:     '"Instrument Serif", "Bricolage Grotesque", serif',
      familjen:  '"Familjen Grotesk", "Hanken Grotesk", system-ui, sans-serif',
    };
    root.style.setProperty('--font-display', fonts[t.displayFont] || fonts.bricolage);
  }, [t.displayFont]);

  const handleStart = () => setView("onboarding");
  const handleComplete = (p) => { setProfile(p); setView("dashboard"); window.scrollTo(0, 0); };
  const handleClose = () => setView("landing");
  const handleExit = () => { setView("landing"); setProfile(null); };

  return (
    <>
      {view === "landing" && <Landing onStart={handleStart} tweaks={t} />}
      {view === "onboarding" && <Onboarding onComplete={handleComplete} onClose={handleClose} />}
      {view === "dashboard" && <Dashboard profile={profile} onExit={handleExit} />}

      <TweaksPanel>
        <TweakSection label="Paleta" />
        <TweakRadio label="Mundo de color" value={t.palette}
          options={["warm","sand","forest","slate"]}
          onChange={v => setTweak("palette", v)} />

        <TweakSection label="Tipografía" />
        <TweakSelect label="Display" value={t.displayFont}
          options={[
            { value: "bricolage", label: "Bricolage (default)" },
            { value: "space",     label: "Space Grotesk" },
            { value: "serif",     label: "Instrument Serif (editorial)" },
            { value: "familjen",  label: "Familjen Grotesk" },
          ]}
          onChange={v => setTweak("displayFont", v)} />

        <TweakSection label="Hero" />
        <TweakText label="Headline (usar | para salto, * para itálica)"
          value={t.headline}
          onChange={v => setTweak("headline", v)} />

        <TweakSection label="Packs" />
        <TweakRadio label="Recomendado" value={t.recommendedPack}
          options={["tramites","completo","amedida"]}
          onChange={v => setTweak("recommendedPack", v)} />

        <TweakSection label="Secciones" />
        <TweakToggle label="Bloque para padres" value={t.showParents}
          onChange={v => setTweak("showParents", v)} />

        <TweakSection label="Navegación" />
        <TweakButton label="Ir al landing" onClick={() => { setView("landing"); window.scrollTo(0,0); }} />
        <TweakButton label="Ir al onboarding" onClick={() => setView("onboarding")} />
        <TweakButton label="Ir al dashboard" onClick={() => { setProfile({ destination: "madrid", duration: "semester", monthIdx: 6, uni: "Universidad de San Andrés", resolved: ["pasaporte"], priorities: {} }); setView("dashboard"); }} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
