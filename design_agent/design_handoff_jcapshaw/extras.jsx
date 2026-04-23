// Additional pages: Speaking index, Talk detail, Case Study detail, NotFound, Search overlay, Dense home

function Monogram() {
  return (
    <div className="monogram" aria-hidden="true">jc</div>
  );
}

// Speaking index page (list of all talks, richer than the About preview)
function SpeakingIndex() {
  const { talks } = window.SITE_DATA;
  return (
    <div className="fade-in">
      <div className="shell">
        <section className="speaking-page">
          <div className="eyebrow" style={{marginBottom: 18}}>§ Speaking</div>
          <h1 className="display" style={{fontSize: "clamp(32px, 4vw, 42px)", maxWidth: "22ch", margin: "0 0 14px"}}>
            Talks for people who run distribution businesses.
          </h1>
          <p className="lede" style={{fontSize: 15, color: "var(--ink-dim)", maxWidth: "54ch"}}>
            I speak a few times a year at NAED, NAW, IDEA, and adjacent gatherings.
            Here's what I've given, with slides and recordings where available.
          </p>
        </section>

        <div style={{paddingBottom: 40}}>
          {talks.map(t => (
            <a key={t.slug} href={"#/talk/" + t.slug} className="talk-card">
              <div className="tc-date">{t.date}</div>
              <div>
                <div className="tc-title">{t.title}</div>
                <div className="tc-venue">{t.venue}</div>
                <div className="tc-abs">{t.abstract}</div>
              </div>
              <div className="tc-assets">
                <span className={t.slides ? "avail" : "n-a"}>{t.slides ? "◇ slides" : "◇ no slides"}</span>
                <span className={t.recording ? "avail" : "n-a"}>{t.recording ? "▶ recording" : "▶ no recording"}</span>
                <span>{t.duration}</span>
              </div>
            </a>
          ))}
        </div>

        <section style={{padding: "40px 0 80px", borderTop: "1px solid var(--rule)"}}>
          <div className="section-head">
            <h3>Booking inquiries</h3>
            <a href="mailto:speaking@jcapshaw.com" className="link-all">speaking@jcapshaw.com →</a>
          </div>
          <p style={{maxWidth: "58ch", color: "var(--ink-dim)", fontSize: 15, lineHeight: 1.65, marginTop: 18}}>
            I'll consider speaking at industry events in electrical, industrial,
            MRO, and related distribution verticals. I don't do paid sponsored
            keynotes, and I generally decline vendor-stage talks. For private
            corporate events — happy to talk.
          </p>
        </section>
      </div>
    </div>
  );
}

function TalkDetail({ slug }) {
  const talk = window.SITE_DATA.talks.find(t => t.slug === slug);
  if (!talk) return <NotFound />;
  const slides = Array.from({length: 12}, (_, i) => ({
    n: i + 1,
    label: [
      "Title", "Why we're here", "A map of the problem", "The quiet shape",
      "Where it breaks", "Pattern 01", "Pattern 02", "Pattern 03",
      "A worked example", "Trade-offs", "How to start", "Thank you",
    ][i],
  }));
  return (
    <div className="fade-in">
      <div className="shell">
        <section className="talk-detail-head">
          <div className="tdh-when">{talk.date} · talk</div>
          <h1 className="display">{talk.title}</h1>
          <div className="venue-line">{talk.venue}</div>
          <p className="abs">{talk.abstract}</p>

          <div className="talk-meta-grid">
            <div className="tmg">
              <div className="k">Audience</div>
              <div className="v">{talk.audience}</div>
            </div>
            <div className="tmg">
              <div className="k">Duration</div>
              <div className="v">{talk.duration}</div>
            </div>
            <div className="tmg">
              <div className="k">Slides</div>
              <div className="v">{talk.slides ? "Available on request" : "Not released"}</div>
            </div>
            <div className="tmg">
              <div className="k">Recording</div>
              <div className="v">{talk.recording ? "Available on request" : "Not recorded"}</div>
            </div>
          </div>
        </section>

        <section style={{padding: "40px 0 0"}}>
          <div className="label" style={{marginBottom: 14}}>◇ Slide thumbnails</div>
          <div className="slide-strip">
            {slides.map(s => (
              <div className="slide-tile" key={s.n}>
                <div className="st-num">{String(s.n).padStart(2, "0")}</div>
                <div className="st-label">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{padding: "48px 0 80px"}}>
          <div className="case-section">
            <h3>Abstract</h3>
            <div>
              <p style={{fontFamily: "var(--serif)", fontSize: 16, lineHeight: 1.65, color: "var(--ink-dim)"}}>
                {talk.abstract}
              </p>
              <p style={{fontFamily: "var(--serif)", fontSize: 16, lineHeight: 1.65, color: "var(--ink-dim)"}}>
                The talk opens with a walk through the specific failure modes I see most often in
                mid-market distribution, then moves into three concrete patterns that consistently
                produce better outcomes. No slides about AI, no vendor logos, no roadmap theater.
              </p>
            </div>
          </div>
          <div className="case-section">
            <h3>Related essays</h3>
            <div style={{display: "grid", gap: 8}}>
              {window.SITE_DATA.posts.slice(0, 3).map(p => (
                <a key={p.slug} href={"#/post/" + p.slug} className="link"
                   style={{fontFamily: "var(--serif)", fontSize: 15, color: "var(--ink)"}}>
                  → {p.title}
                </a>
              ))}
            </div>
          </div>
          <div className="case-section">
            <h3>Booking</h3>
            <p>
              If you'd like me to give a version of this talk at your event or internal offsite,
              email <a className="link" href="mailto:speaking@jcapshaw.com">speaking@jcapshaw.com</a>.
              I usually need 6–8 weeks of lead time.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

function CaseStudyDetail({ slug }) {
  const cs = window.SITE_DATA.caseStudies.find(c => c.slug === slug);
  if (!cs) return <NotFound />;
  return (
    <div className="fade-in">
      <div className="shell">
        <section className="case-head">
          <div className="client-row">{cs.client} · {cs.clientMeta}</div>
          <h1 className="display">{cs.title}</h1>
          <p className="summary">{cs.summary}</p>
        </section>

        <div className="outcomes">
          {cs.outcomes.map((o, i) => (
            <div className="outcome" key={i}>
              <div className="om">{o.metric}</div>
              <div className="ol">{o.label}</div>
            </div>
          ))}
        </div>

        <section style={{padding: "20px 0 80px"}}>
          <div className="case-section">
            <h3>Period</h3>
            <p>{cs.period} · {cs.role}</p>
          </div>
          <div className="case-section">
            <h3>Stack</h3>
            <p style={{fontFamily: "var(--mono)", fontSize: 13, letterSpacing: "0.04em"}}>{cs.stack}</p>
          </div>
          <div className="case-section">
            <h3>The problem</h3>
            <p>{cs.problem}</p>
          </div>
          <div className="case-section">
            <h3>Approach</h3>
            <p>{cs.approach}</p>
          </div>
          <div className="case-section">
            <h3>What I'd do differently</h3>
            <p>
              In hindsight, the first month of discovery would have been better spent in the
              warehouse and behind the trade counter than in conference rooms. The sharpest
              insights came from watching actual work happen, and I was too slow to get there.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

function NotFound() {
  const trace = "0x" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");
  return (
    <div className="fade-in not-found">
      <div className="not-found-inner">
        <div className="err-code">HTTP 404 · NOT FOUND</div>
        <div className="glyph">¶</div>
        <h1>This page isn't here.</h1>
        <p>
          Either the URL is wrong, or an older essay was retired. Try the archive,
          the front page, or search the site.
        </p>
        <div style={{display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap"}}>
          <a href="#/home" className="link">Front page</a>
          <a href="#/writing" className="link">Archive</a>
          <a href="#/subscribe" className="link">Subscribe</a>
        </div>
        <div className="trace">trace · {trace} · {new Date().toISOString().slice(0, 19).replace("T", " ")}Z</div>
      </div>
    </div>
  );
}

function highlight(text, q) {
  if (!q) return text;
  const re = new RegExp("(" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig");
  const parts = text.split(re);
  return parts.map((p, i) => re.test(p) ? <mark key={i}>{p}</mark> : p);
}

function SearchOverlay({ show, onClose }) {
  const [q, setQ] = useState("");
  const inputRef = useRef(null);
  useEffect(() => {
    if (show) setTimeout(() => inputRef.current?.focus(), 60);
  }, [show]);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (show) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show, onClose]);

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const lq = q.toLowerCase();
    const out = [];
    window.SITE_DATA.posts.forEach(p => {
      if ((p.title + " " + p.excerpt + " " + p.topic).toLowerCase().includes(lq))
        out.push({ kind: "Essay", title: p.title, excerpt: p.excerpt, href: "#/post/" + p.slug });
    });
    window.SITE_DATA.talks.forEach(t => {
      if ((t.title + " " + t.abstract + " " + t.venue).toLowerCase().includes(lq))
        out.push({ kind: "Talk", title: t.title, excerpt: t.abstract, href: "#/talk/" + t.slug });
    });
    window.SITE_DATA.caseStudies.forEach(c => {
      if ((c.title + " " + c.summary + " " + c.client).toLowerCase().includes(lq))
        out.push({ kind: "Case Study", title: c.title, excerpt: c.summary, href: "#/case/" + c.slug });
    });
    return out;
  }, [q]);

  return (
    <div className={"search-overlay" + (show ? " show" : "")}>
      <div className="search-overlay-inner">
        <div className="search-head">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={{color: "var(--ink-faint)"}}>
            <circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>
          </svg>
          <input
            ref={inputRef}
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search essays, talks, and case studies…"
          />
          <button className="close-btn" onClick={onClose}>Esc</button>
        </div>
        <div className="search-meta">
          <span>{q.trim() ? results.length + " matches" : "start typing"}</span>
          <span>scope · all content</span>
        </div>
        {q.trim() && results.length === 0 && (
          <div style={{padding: "40px 0", textAlign: "center", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", color: "var(--ink-faint)", textTransform: "uppercase"}}>
            no matches — try fewer words
          </div>
        )}
        {results.map((r, i) => (
          <a key={i} href={r.href} className="result-row" onClick={onClose}>
            <div className="r-kind">{r.kind}</div>
            <div className="r-t">{highlight(r.title, q)}</div>
            <div className="r-x">{highlight(r.excerpt, q)}</div>
          </a>
        ))}
        <div className="hint-bar">
          <span><span className="kbd">↵</span>open</span>
          <span><span className="kbd">Esc</span>close</span>
          <span><span className="kbd">⌘K</span>toggle</span>
        </div>
      </div>
    </div>
  );
}

function DenseHome() {
  const { posts, topics } = window.SITE_DATA;
  return (
    <div className="fade-in">
      <div className="shell">
        <section className="dense-home">
          <div className="dh-statement">
            <h1 className="display">Systems thinking for B2B distribution.</h1>
            <div className="dh-meta">
              <div>Updated 22 Apr 2026</div>
              <div>{posts.length} essays · {window.SITE_DATA.talks.length} talks</div>
              <div>{window.SITE_DATA.caseStudies.length} published case studies</div>
              <div>Independent practice · since 2023</div>
            </div>
          </div>

          <div className="dense-grid">
            <div className="dense-col">
              <h3>All writing</h3>
              <div className="dense-list">
                {posts.slice(0, 10).map(p => (
                  <a
                    key={p.slug}
                    href={"#/post/" + p.slug}
                    className="item"
                    data-preview-title={p.title}
                    data-preview-excerpt={p.excerpt}
                    data-preview-meta={fmtDate(p.date) + " · " + p.read}
                  >
                    <div className="it">{p.title}</div>
                    <div className="id">{fmtDate(p.date)}</div>
                  </a>
                ))}
              </div>
            </div>
            <div className="dense-col right">
              <h3>Topics</h3>
              <div className="dense-list">
                {topics.map(t => (
                  <a key={t.name} href="#/writing" className="item" onClick={e=>e.preventDefault()}>
                    <div className="it">{t.name}</div>
                    <div className="id">{t.count}</div>
                  </a>
                ))}
              </div>
              <h3 style={{marginTop: 28}}>Recent talks</h3>
              <div className="dense-list">
                {window.SITE_DATA.talks.slice(0, 4).map(t => (
                  <a key={t.slug} href={"#/talk/" + t.slug} className="item">
                    <div className="it">{t.title}</div>
                    <div className="id">{t.date}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

Object.assign(window, { Monogram, SpeakingIndex, TalkDetail, CaseStudyDetail, NotFound, SearchOverlay, DenseHome, highlight });
