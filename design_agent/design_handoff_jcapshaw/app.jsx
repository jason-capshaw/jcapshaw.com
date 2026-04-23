// Tweaks panel + App entry

function TweaksPanel({
  show, onClose,
  theme, setTheme,
  density, setDensity,
  accent, setAccent,
  typography, setTypography,
}) {
  const accents = [
    { id: "brass", label: "Brass", color: "#c8a75e" },
    { id: "oxblood", label: "Oxblood", color: "#b86a5e" },
    { id: "verdigris", label: "Verdigris", color: "#7ca98c" },
    { id: "indigo", label: "Indigo", color: "#8998c9" },
    { id: "paper", label: "Paper", color: "#d6cfbf" },
  ];

  return (
    <div className={"tweaks-panel" + (show ? " show" : "")}>
      <div className="tp-head">
        <span className="tp-title">◆ Tweaks</span>
        <button className="tp-close" onClick={onClose} aria-label="Close">×</button>
      </div>
      <div className="tp-body">
        <div className="tweak-row">
          <div className="tr-label">Theme</div>
          <div className="seg">
            <button className={theme === "dark" ? "active" : ""} onClick={() => setTheme("dark")}>Dark</button>
            <button className={theme === "light" ? "active" : ""} onClick={() => setTheme("light")}>Light</button>
          </div>
        </div>

        <div className="tweak-row">
          <div className="tr-label">Accent</div>
          <div className="swatches">
            {accents.map(a => (
              <div
                key={a.id}
                className={"swatch" + (accent === a.id ? " active" : "")}
                style={{ background: a.color }}
                onClick={() => setAccent(a.id)}
                title={a.label}
              />
            ))}
          </div>
        </div>

        <div className="tweak-row">
          <div className="tr-label">Density</div>
          <div className="seg">
            <button className={density === "compact" ? "active" : ""} onClick={() => setDensity("compact")}>Compact</button>
            <button className={density === "normal" ? "active" : ""} onClick={() => setDensity("normal")}>Normal</button>
            <button className={density === "spacious" ? "active" : ""} onClick={() => setDensity("spacious")}>Spacious</button>
          </div>
        </div>

        <div className="tweak-row">
          <div className="tr-label">Typography</div>
          <div className="seg">
            <button className={typography === "spectral" ? "active" : ""} onClick={() => setTypography("spectral")}>Spectral</button>
            <button className={typography === "eb" ? "active" : ""} onClick={() => setTypography("eb")}>EB Garamond</button>
            <button className={typography === "fraunces" ? "active" : ""} onClick={() => setTypography("fraunces")}>Fraunces</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useTheme();
  const [density, setDensity] = useDensity();
  const [accent, setAccent] = useAccent();
  const [typography, setTypography] = useState(() => localStorage.getItem("jc-typo") || "spectral");
  const [homeVariant, setHomeVariant] = useState(() => localStorage.getItem("jc-home") || "sparse");
  const [route, navigate] = useRoute();
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => { localStorage.setItem("jc-home", homeVariant); }, [homeVariant]);

  // Apply typography
  useEffect(() => {
    const map = {
      spectral: '"Spectral", "Source Serif Pro", Georgia, serif',
      eb: '"EB Garamond", Georgia, serif',
      fraunces: '"Fraunces", Georgia, serif',
    };
    document.documentElement.style.setProperty("--serif", map[typography] || map.spectral);
    localStorage.setItem("jc-typo", typography);
  }, [typography]);

  // Cmd/Ctrl+K to open search
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(v => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Tweaks bridge
  useEffect(() => {
    const onMsg = (e) => {
      const d = e.data || {};
      if (d.type === "__activate_edit_mode") setTweaksOpen(true);
      if (d.type === "__deactivate_edit_mode") setTweaksOpen(false);
    };
    window.addEventListener("message", onMsg);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  // Route rendering
  let screenLabel = "home";
  let page;
  if (route === "home") {
    page = homeVariant === "dense" ? <DenseHome /> : <Home />;
    screenLabel = "01 Home";
  }
  else if (route === "writing") { page = <Archive />; screenLabel = "02 Archive"; }
  else if (route === "about") { page = <About />; screenLabel = "04 About"; }
  else if (route === "speaking") { page = <SpeakingIndex />; screenLabel = "08 Speaking"; }
  else if (route === "projects") { page = <Projects />; screenLabel = "05 Projects"; }
  else if (route === "now") { page = <Now />; screenLabel = "06 Now"; }
  else if (route === "subscribe") { page = <Subscribe />; screenLabel = "07 Subscribe"; }
  else if (route.startsWith("post/")) {
    const slug = route.slice(5);
    page = <PostView slug={slug} />;
    screenLabel = "03 Post — " + slug;
  } else if (route.startsWith("talk/")) {
    const slug = route.slice(5);
    page = <TalkDetail slug={slug} />;
    screenLabel = "09 Talk — " + slug;
  } else if (route.startsWith("case/")) {
    const slug = route.slice(5);
    page = <CaseStudyDetail slug={slug} />;
    screenLabel = "10 Case — " + slug;
  } else {
    page = <NotFound />;
    screenLabel = "11 Not Found";
  }

  return (
    <>
      <TopBar
        route={route}
        theme={theme}
        onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
        onOpenSearch={() => setSearchOpen(true)}
      />
      <main data-screen-label={screenLabel} key={route}>
        {page}
      </main>
      <Footer />
      <HoverPreview />
      <SearchOverlay show={searchOpen} onClose={() => setSearchOpen(false)} />
      <TweaksPanel
        show={tweaksOpen}
        onClose={() => setTweaksOpen(false)}
        theme={theme} setTheme={setTheme}
        density={density} setDensity={setDensity}
        accent={accent} setAccent={setAccent}
        typography={typography} setTypography={setTypography}
        homeVariant={homeVariant} setHomeVariant={setHomeVariant}
      />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
