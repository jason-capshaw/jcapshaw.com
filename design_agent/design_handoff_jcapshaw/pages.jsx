// Home, Archive, Projects, About, Now, Subscribe pages

function fmtDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function Home() {
  const { posts, topics } = window.SITE_DATA;
  const featured = posts.find(p => p.featured) || posts[0];
  const recent = posts.filter(p => p.slug !== featured.slug).slice(0, 4);
  return (
    <div className="fade-in">
      <section className="hero">
        <div className="shell">
          <h1 className="display">Systems thinking for B2B distribution.</h1>
          <p className="sub">
            Writing on commerce architecture, enterprise systems, product data,
            and applied AI — by a solo architect working inside wholesale,
            industrial, and electrical supply.
          </p>
          <div className="ornament" aria-hidden="true" />
        </div>
      </section>

      <section className="featured">
        <div className="shell narrow">
          <div className="kicker label">Essay · featured</div>
          <h2 className="display">
            <a href={"#/post/" + featured.slug}>{featured.title}</a>
          </h2>
          <p>{featured.dek || featured.excerpt}</p>
          <div className="meta" style={{marginTop: 20}}>
            <a href={"#/post/" + featured.slug} className="link">
              Read essay · {featured.read}
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <h3>Recent writing</h3>
            <a href="#/writing" className="link-all">View all →</a>
          </div>
          <div className="stagger">
            {recent.map(p => (
              <a
                key={p.slug}
                href={"#/post/" + p.slug}
                className="post-row"
                data-preview-title={p.title}
                data-preview-excerpt={p.excerpt}
                data-preview-meta={fmtDate(p.date) + " · " + p.read}
              >
                <div>
                  <div className="pr-title">{p.title}</div>
                  <div className="pr-excerpt">{p.excerpt}</div>
                </div>
                <div className="pr-meta meta">
                  <span className="tag">{p.topic}</span>
                  <span>{fmtDate(p.date)}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <h3>Topics</h3>
            <a href="#/writing" className="link-all">Browse archive →</a>
          </div>
          <div className="topic-grid">
            {topics.map(t => (
              <div className="topic" key={t.name}>
                <div className="t-name">{t.name}</div>
                <div className="t-desc">{t.desc}</div>
                <div className="t-count">{t.count} essays</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Archive() {
  const { posts, topics } = window.SITE_DATA;
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const searchRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/" && !e.metaKey && !e.ctrlKey && document.activeElement !== searchRef.current) {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === "Escape") searchRef.current?.blur();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter(p => {
      if (filter !== "All" && p.topic !== filter) return false;
      if (!q) return true;
      return (p.title + " " + p.excerpt + " " + p.topic).toLowerCase().includes(q);
    });
  }, [query, filter, posts]);

  // Group by year
  const byYear = useMemo(() => {
    const groups = {};
    filtered.forEach(p => {
      const y = p.date.slice(0, 4);
      (groups[y] ||= []).push(p);
    });
    return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]));
  }, [filtered]);

  const chips = ["All", ...topics.map(t => t.name)];

  return (
    <div className="fade-in">
      <div className="shell">
        <section className="archive-head">
          <div className="eyebrow" style={{marginBottom: 18}}>§ Archive</div>
          <h1 className="display">Everything, in order.</h1>
          <p className="lede">
            {posts.length} essays and notes on B2B commerce architecture, distribution
            systems, and the practical use of AI in industrial workflows.
          </p>

          <div className="filters">
            <span className="filter-label">Topic</span>
            {chips.map(c => (
              <button
                key={c}
                className={"chip" + (filter === c ? " active" : "")}
                onClick={() => setFilter(c)}
              >{c}</button>
            ))}
            <div className="search-wrap">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{color: "var(--ink-faint)"}}>
                <circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>
              </svg>
              <input
                ref={searchRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search essays…"
              />
              <span className="kbd">/</span>
            </div>
          </div>
        </section>

        {byYear.length === 0 && (
          <div style={{padding: "60px 0", textAlign: "center", color: "var(--ink-faint)", fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.1em"}}>
            NO RESULTS — TRY A BROADER QUERY
          </div>
        )}

        {byYear.map(([year, items]) => (
          <div className="year-group" key={year}>
            <div className="year">{year}</div>
            {items.map(p => (
              <a
                key={p.slug}
                href={"#/post/" + p.slug}
                className="post-row"
                data-preview-title={p.title}
                data-preview-excerpt={p.excerpt}
                data-preview-meta={fmtDate(p.date) + " · " + p.read}
              >
                <div>
                  <div className="pr-title">{p.title}</div>
                  <div className="pr-excerpt">{p.excerpt}</div>
                </div>
                <div className="pr-meta meta">
                  <span className="tag">{p.topic}</span>
                  <span>{fmtDate(p.date)} · {p.read}</span>
                </div>
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function About() {
  const { talks } = window.SITE_DATA;
  return (
    <div className="fade-in">
      <div className="shell">
        <div className="about-grid">
          <div className="about-portrait" aria-label="Portrait placeholder" />
          <div className="about-body">
            <div className="eyebrow" style={{marginBottom: 14}}>§ About</div>
            <h1 className="display">
              An independent systems architect for distribution.
            </h1>
            <p>
              <strong>Jason Capshaw</strong> runs a solo consulting practice
              focused on B2B industrial and electrical distribution. His work
              sits at the intersection of systems architecture, data, and
              process design.
            </p>
            <p>
              Most of what he does is translation — turning ambiguous business
              requirements into structured, usable solutions that prioritize
              clarity, efficiency, and maintainability over unnecessary
              complexity.
            </p>
            <p>
              His approach emphasizes reducing friction and cognitive load while
              improving decision-making and execution. He favors designs that
              are straightforward to implement, easy to operate, and tightly
              aligned with how distribution businesses actually function —
              warehouses, counters, outside sales, procurement, and all.
            </p>
            <p>
              He writes here about what he's learned in the field, and speaks
              several times a year at industry gatherings for the NAED, NAW,
              IDEA, and related associations.
            </p>
            <div className="meta" style={{marginTop: 32, display: "flex", gap: 18, flexWrap: "wrap"}}>
              <a href="#" onClick={e=>e.preventDefault()} className="link">Book a conversation</a>
              <a href="#" onClick={e=>e.preventDefault()} className="link">jason@jcapshaw.com</a>
              <a href="#/speaking" className="link">Speaking inquiries</a>
            </div>
          </div>
        </div>

        <section className="speaking">
          <div className="section-head">
            <h3>Recent speaking</h3>
            <a href="#/speaking" className="link-all">All talks →</a>
          </div>
          <div className="speaking-list">
            {talks.map((t, i) => (
              <div className="talk" key={i}>
                <div className="date">{t.date}</div>
                <div className="title">{t.title}</div>
                <div className="venue">{t.venue}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function Projects() {
  const { projects } = window.SITE_DATA;
  return (
    <div className="fade-in">
      <div className="shell">
        <section className="projects-head">
          <div className="eyebrow" style={{marginBottom: 18}}>§ Work</div>
          <h1 className="display" style={{fontSize: "clamp(32px, 4vw, 42px)", maxWidth: "20ch", margin: "0 0 14px"}}>
            Systems I'm building, or have built.
          </h1>
          <p className="lede" style={{fontSize: 15, color: "var(--ink-dim)", maxWidth: "54ch"}}>
            A curated list. Most client work stays private; these are projects I
            can talk about, sometimes owned outright, sometimes shipped for a
            distributor and then spun off.
          </p>
        </section>

        <div style={{paddingBottom: 32}}>
          {projects.map((p, i) => (
            <div className="project-row" key={p.name}>
              <div className="idx">{String(i + 1).padStart(2, "0")}</div>
              <div>
                <div className="p-name">{p.name}</div>
                <div className="p-desc">{p.desc}</div>
              </div>
              <div className="p-stack">
                {p.stack}<br/>
                <span style={{color: "var(--ink-faint)", opacity: 0.7}}>{p.years}</span>
              </div>
              <div className={"p-status status-" + p.status}>
                {p.status === "live" && "● live"}
                {p.status === "wip" && "◐ in progress"}
                {p.status === "archive" && "○ archived"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Now() {
  return (
    <div className="fade-in">
      <div className="shell narrow">
        <section className="now-head">
          <div className="updated">Updated 12 April 2026</div>
          <h1 className="display" style={{fontSize: "clamp(32px, 4vw, 42px)", margin: 0, maxWidth: "20ch", letterSpacing: "-0.02em"}}>
            What I'm on this month.
          </h1>
          <p className="lede" style={{marginTop: 14, fontSize: 15, color: "var(--ink-dim)", maxWidth: "54ch"}}>
            A snapshot of current work, reading, and the tools I've settled on.
            Inspired by the <a href="https://nownownow.com" className="link" onClick={e=>e.preventDefault()}>/now page movement</a>.
          </p>
        </section>

        <div className="now-section">
          <h3>Working on</h3>
          <div className="body">
            <p>
              Shipping v2 of Ledgerline's contract-pricing engine for two electrical
              distributors in the Southeast. Rewriting the quote export pipeline.
            </p>
            <p>
              Advising a third-generation industrial distributor on replatforming
              their customer portal — phased migration, no big-bang.
            </p>
            <p>
              Drafting a long essay on how RFQ automation actually works when the
              PDFs are terrible and the SKUs are wrong.
            </p>
          </div>
        </div>

        <div className="now-section">
          <h3>Reading</h3>
          <div className="body">
            <p>
              <em>Seeing Like a State</em>, James C. Scott — re-read. Still the best
              book on why top-down systems fail in the field.
            </p>
            <p>
              <em>Designing Data-Intensive Applications</em>, Martin Kleppmann —
              reference; keeping nearby.
            </p>
            <p>
              Various annual reports from NAED member firms. Unromantic, very useful.
            </p>
          </div>
        </div>

        <div className="now-section">
          <h3>Not doing</h3>
          <div className="body">
            <p>
              New consulting engagements until Q3. Conferences outside of
              electrical / industrial distribution. Side projects that require a
              frontend framework migration.
            </p>
          </div>
        </div>

        <section style={{padding: "40px 0 0", borderTop: "1px solid var(--rule)", marginTop: 40}}>
          <div className="section-head">
            <h3>Uses</h3>
            <span className="meta" style={{color: "var(--ink-faint)"}}>The tools I keep coming back to</span>
          </div>
          <ul className="uses-list" style={{paddingTop: 20}}>
            <li><span className="u-key">Editor</span> <span>Neovim (Lazyvim distro), then Zed for pair work</span></li>
            <li><span className="u-key">Shell</span> <span>Fish · Ghostty · tmux · starship</span></li>
            <li><span className="u-key">Languages</span> <span>Elixir, Python, TypeScript. SQL for everything important.</span></li>
            <li><span className="u-key">Database</span> <span>Postgres for OLTP, DuckDB for catalog work, SQLite for anything local</span></li>
            <li><span className="u-key">Hosting</span> <span>Fly.io, Hetzner, Cloudflare</span></li>
            <li><span className="u-key">Notes</span> <span>Plain markdown in a git repo. Obsidian for reading.</span></li>
            <li><span className="u-key">Hardware</span> <span>M2 MacBook Air · ZSA Moonlander · LG 27UL850</span></li>
            <li><span className="u-key">Reference</span> <span>Paper notebooks (Leuchtturm 1917 dotted) and fountain pens</span></li>
          </ul>
        </section>
      </div>
    </div>
  );
}

function Subscribe() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    if (email.includes("@")) setSubmitted(true);
  };
  return (
    <div className="fade-in">
      <div className="shell">
        <section className="subscribe">
          <div className="eyebrow">§ Subscribe</div>
          <h1 className="display">No spam. Two essays a month, maximum.</h1>
          <p className="lede">
            A quiet newsletter for people running, building, or vending software
            to B2B distributors. Plain text, no tracking, unsubscribe with one
            click — your address is never shared or sold.
          </p>

          {!submitted ? (
            <form className="sub-form" onSubmit={onSubmit}>
              <input
                type="email"
                placeholder="your.email@company.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <button type="submit">Subscribe →</button>
            </form>
          ) : (
            <div style={{
              maxWidth: 440, margin: "0 auto 28px",
              padding: "22px 20px",
              border: "1px solid var(--accent-soft)",
              background: "var(--hl)",
              fontFamily: "var(--serif)",
              fontSize: 15,
              color: "var(--ink)",
            }}>
              <div className="eyebrow" style={{color: "var(--accent)", marginBottom: 8}}>✓ Confirmed</div>
              Check <strong>{email}</strong> for a confirmation link. You'll hear from me when the next essay ships.
            </div>
          )}

          <div className="meta" style={{color: "var(--ink-faint)"}}>
            Current list: 3,284 readers · Since Feb 2023
          </div>

          <div className="feed-options">
            <a className="feed-opt" href="#" onClick={e=>e.preventDefault()}>
              <div className="f-name">→ RSS</div>
              <div className="f-desc">Standard RSS 2.0 feed with full essay text. Works with every reader.</div>
              <div className="f-url">jcapshaw.com/feed.xml</div>
            </a>
            <a className="feed-opt" href="#" onClick={e=>e.preventDefault()}>
              <div className="f-name">→ Atom</div>
              <div className="f-desc">Atom 1.0 equivalent. Preferred by some readers for richer metadata.</div>
              <div className="f-url">jcapshaw.com/atom.xml</div>
            </a>
            <a className="feed-opt" href="#" onClick={e=>e.preventDefault()}>
              <div className="f-name">→ JSON Feed</div>
              <div className="f-desc">Modern JSON-formatted feed for programmatic consumers.</div>
              <div className="f-url">jcapshaw.com/feed.json</div>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

Object.assign(window, { Home, Archive, About, Projects, Now, Subscribe, fmtDate });
