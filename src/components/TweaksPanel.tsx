"use client";

import { useEffect, useState } from "react";

type Theme = "auto" | "dark" | "light";
type Density = "compact" | "normal" | "spacious";
type Accent = "brass" | "oxblood" | "verdigris" | "indigo" | "paper";
type Typo = "spectral" | "garamond" | "fraunces";
type HomeVariant = "sparse" | "dense";

const keys = {
  theme: "jc-theme",
  density: "jc-density",
  accent: "jc-accent",
  typo: "jc-typo",
  home: "jc-home",
};

const accentColors: Record<Accent, string> = {
  brass: "#c8a75e",
  oxblood: "#b86a5e",
  verdigris: "#7ca98c",
  indigo: "#8998c9",
  paper: "#d6cfbf",
};

function apply(attr: string, value: string | null) {
  if (typeof document === "undefined") return;
  if (value) document.documentElement.setAttribute(attr, value);
  else document.documentElement.removeAttribute(attr);
}

export default function TweaksPanel() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("auto");
  const [density, setDensity] = useState<Density>("normal");
  const [accent, setAccent] = useState<Accent>("brass");
  const [typo, setTypo] = useState<Typo>("spectral");
  const [home, setHome] = useState<HomeVariant>("sparse");

  useEffect(() => {
    const t = (localStorage.getItem(keys.theme) as Theme) || "auto";
    const d = (localStorage.getItem(keys.density) as Density) || "normal";
    const a = (localStorage.getItem(keys.accent) as Accent) || "brass";
    const ty = (localStorage.getItem(keys.typo) as Typo) || "spectral";
    const h = (localStorage.getItem(keys.home) as HomeVariant) || "sparse";
    /* eslint-disable react-hooks/set-state-in-effect */
    setTheme(t);
    setDensity(d);
    setAccent(a);
    setTypo(ty);
    setHome(h);
    /* eslint-enable react-hooks/set-state-in-effect */
    apply("data-theme", t === "auto" ? null : t);
    apply("data-density", d === "normal" ? null : d);
    apply("data-accent", a === "brass" ? null : a);
    apply("data-typo", ty === "spectral" ? null : ty);
    apply("data-home", h === "sparse" ? null : h);
    if (ty === "garamond" || ty === "fraunces") {
      ensureFont(ty);
    }
  }, []);

  const save = <T extends string>(
    key: string,
    attr: string,
    defaultVal: T,
    value: T,
    setter: (v: T) => void,
  ) => {
    setter(value);
    localStorage.setItem(key, value);
    apply(attr, value === defaultVal ? null : value);
  };

  return (
    <>
      {open ? (
        <div className="tweaks-panel" role="dialog" aria-label="Display tweaks">
          <div className="tw-head">
            <span className="tw-title">Tweaks</span>
            <button
              type="button"
              className="tw-close"
              onClick={() => setOpen(false)}
              aria-label="Close tweaks"
            >
              ×
            </button>
          </div>

          <div className="tweaks-row">
            <span className="tw-label">Theme</span>
            <div className="tw-options">
              {(["auto", "dark", "light"] as Theme[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  className="tw-opt"
                  aria-pressed={theme === t}
                  onClick={() => save(keys.theme, "data-theme", "auto", t, setTheme)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="tweaks-row">
            <span className="tw-label">Density</span>
            <div className="tw-options">
              {(["compact", "normal", "spacious"] as Density[]).map((d) => (
                <button
                  key={d}
                  type="button"
                  className="tw-opt"
                  aria-pressed={density === d}
                  onClick={() =>
                    save(keys.density, "data-density", "normal", d, setDensity)
                  }
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="tweaks-row">
            <span className="tw-label">Accent</span>
            <div className="tw-swatches">
              {(Object.keys(accentColors) as Accent[]).map((a) => (
                <button
                  key={a}
                  type="button"
                  className="tw-swatch"
                  style={{ background: accentColors[a] }}
                  aria-label={a}
                  aria-pressed={accent === a}
                  onClick={() =>
                    save(keys.accent, "data-accent", "brass", a, setAccent)
                  }
                />
              ))}
            </div>
          </div>

          <div className="tweaks-row">
            <span className="tw-label">Typography</span>
            <div className="tw-options">
              {(["spectral", "garamond", "fraunces"] as Typo[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  className="tw-opt"
                  aria-pressed={typo === t}
                  onClick={() => {
                    if (t === "garamond" || t === "fraunces") ensureFont(t);
                    save(keys.typo, "data-typo", "spectral", t, setTypo);
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="tweaks-row">
            <span className="tw-label">Homepage</span>
            <div className="tw-options">
              {(["sparse", "dense"] as HomeVariant[]).map((h) => (
                <button
                  key={h}
                  type="button"
                  className="tw-opt"
                  aria-pressed={home === h}
                  onClick={() => save(keys.home, "data-home", "sparse", h, setHome)}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
      <button
        type="button"
        className="tweaks-fab"
        aria-label="Open display tweaks"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        title="Tweaks"
      >
        ⚙
      </button>
    </>
  );
}

function ensureFont(family: "garamond" | "fraunces") {
  const id = `font-${family}`;
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href =
    family === "garamond"
      ? "https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap"
      : "https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,500;1,400&display=swap";
  document.head.appendChild(link);
}
