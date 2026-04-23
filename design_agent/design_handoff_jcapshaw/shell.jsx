// Shell components: topbar, footer, theme, router, hover preview
const { useState, useEffect, useRef, useCallback, useMemo } = React;

function useTheme() {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem("jc-theme") || "dark"
  );
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("jc-theme", theme);
  }, [theme]);
  return [theme, setTheme];
}

function useDensity() {
  const [density, setDensity] = useState(() =>
    localStorage.getItem("jc-density") || "normal"
  );
  useEffect(() => {
    document.documentElement.setAttribute("data-density", density);
    localStorage.setItem("jc-density", density);
  }, [density]);
  return [density, setDensity];
}

function useAccent() {
  const [accent, setAccent] = useState(() =>
    localStorage.getItem("jc-accent") || "brass"
  );
  useEffect(() => {
    const map = {
      brass:    { main: "#c8a75e", soft: "#8a7645", hl: "rgba(200,167,94,0.12)" },
      oxblood:  { main: "#b86a5e", soft: "#7a463e", hl: "rgba(184,106,94,0.12)" },
      verdigris:{ main: "#7ca98c", soft: "#4f7058", hl: "rgba(124,169,140,0.12)" },
      indigo:   { main: "#8998c9", soft: "#5a6589", hl: "rgba(137,152,201,0.12)" },
      paper:    { main: "#d6cfbf", soft: "#9a9485", hl: "rgba(214,207,191,0.1)" },
    };
    const c = map[accent] || map.brass;
    const root = document.documentElement;
    root.style.setProperty("--accent", c.main);
    root.style.setProperty("--accent-soft", c.soft);
    root.style.setProperty("--hl", c.hl);
    localStorage.setItem("jc-accent", accent);
  }, [accent]);
  return [accent, setAccent];
}

function useRoute() {
  const [route, setRoute] = useState(() => {
    const h = location.hash.replace(/^#\/?/, "");
    return h || "home";
  });
  useEffect(() => {
    const onHash = () => {
      const h = location.hash.replace(/^#\/?/, "");
      setRoute(h || "home");
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const navigate = useCallback((r) => {
    location.hash = "#/" + r;
  }, []);
  return [route, navigate];
}

function TopBar({ route, onToggleTheme, theme, onOpenSearch }) {
  const items = [
    { id: "writing", label: "Writing" },
    { id: "projects", label: "Work" },
    { id: "about", label: "About" },
    { id: "speaking", label: "Speaking" },
    { id: "now", label: "Now" },
    { id: "subscribe", label: "Subscribe" },
  ];
  const activeKey = route.startsWith("post/") ? "writing" : route;
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <a href="#/home" className="brand brand-wrap">
          <Monogram />
          <span style={{display: "flex", flexDirection: "column", gap: 2}}>
            <span className="name">Jason Capshaw</span>
            <span className="sub">Systems · B2B Distribution</span>
          </span>
        </a>
        <nav className="nav">
          {items.map(it => (
            <a
              key={it.id}
              href={"#/" + it.id}
              className={activeKey === it.id ? "active" : ""}
            >{it.label}</a>
          ))}
        </nav>
        <div className="topbar-right">
          <button
            className="icon-btn"
            onClick={onOpenSearch}
            title="Search (⌘K)"
            aria-label="Search"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>
            </svg>
          </button>
          <button
            className="icon-btn"
            onClick={onToggleTheme}
            title={theme === "dark" ? "Switch to light" : "Switch to dark"}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-inner">
          <div>
            <h4>Jason Capshaw</h4>
            <p>Independent systems architect working with B2B industrial and electrical distributors.</p>
            <p style={{marginTop: 12}}>Atlanta, Georgia</p>
          </div>
          <div>
            <h4>Elsewhere</h4>
            <a href="#" onClick={e=>e.preventDefault()}>GitHub</a>
            <a href="#" onClick={e=>e.preventDefault()}>LinkedIn</a>
            <a href="#" onClick={e=>e.preventDefault()}>Email</a>
            <a href="#/subscribe">RSS / Atom</a>
          </div>
          <div>
            <h4>Topics</h4>
            {window.SITE_DATA.topics.map(t => (
              <a key={t.name} href="#/writing" onClick={e=>e.preventDefault()}>{t.name}</a>
            ))}
          </div>
        </div>
        <div className="colophon">
          <span>© 2026 · JCAPSHAW.COM</span>
          <span>Set in Spectral & JetBrains Mono</span>
        </div>
      </div>
    </footer>
  );
}

// Hover preview for post links — reads data-preview attrs
function useHoverPreview() {
  const ref = useRef(null);
  const [state, setState] = useState({ show: false, x: 0, y: 0, title: "", excerpt: "", meta: "" });
  useEffect(() => {
    let hideTimer;
    const enter = (e) => {
      const el = e.target.closest("[data-preview-title]");
      if (!el) return;
      clearTimeout(hideTimer);
      const rect = el.getBoundingClientRect();
      const x = Math.min(rect.right + 16, window.innerWidth - 340);
      const y = Math.min(rect.top, window.innerHeight - 160);
      setState({
        show: true,
        x, y,
        title: el.getAttribute("data-preview-title"),
        excerpt: el.getAttribute("data-preview-excerpt") || "",
        meta: el.getAttribute("data-preview-meta") || "",
      });
    };
    const leave = (e) => {
      const el = e.target.closest("[data-preview-title]");
      if (!el) return;
      hideTimer = setTimeout(() => setState(s => ({ ...s, show: false })), 80);
    };
    document.addEventListener("mouseenter", enter, true);
    document.addEventListener("mouseleave", leave, true);
    return () => {
      document.removeEventListener("mouseenter", enter, true);
      document.removeEventListener("mouseleave", leave, true);
      clearTimeout(hideTimer);
    };
  }, []);
  return state;
}

function HoverPreview() {
  const s = useHoverPreview();
  if (!s.title) return null;
  return (
    <div
      className={"hover-preview" + (s.show ? " show" : "")}
      style={{ left: s.x, top: s.y }}
    >
      <div className="title">{s.title}</div>
      <div className="excerpt">{s.excerpt}</div>
      <div className="foot">
        <span>{s.meta}</span>
        <span>→</span>
      </div>
    </div>
  );
}

Object.assign(window, { useTheme, useDensity, useAccent, useRoute, TopBar, Footer, HoverPreview });
