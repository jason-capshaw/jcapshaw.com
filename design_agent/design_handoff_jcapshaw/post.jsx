// Individual post reading view with footnotes, code blocks, pull quotes

function FootnoteRef({ n, text, children }) {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onClick = (e) => {
    e.preventDefault();
    const rect = ref.current.getBoundingClientRect();
    const x = Math.min(rect.left + window.scrollX, window.scrollX + window.innerWidth - 320);
    const y = rect.bottom + window.scrollY + 6;
    setPos({ x, y });
    setShow(s => !s);
  };

  useEffect(() => {
    if (!show) return;
    const onClickOut = (e) => {
      if (!ref.current?.contains(e.target)) setShow(false);
    };
    document.addEventListener("click", onClickOut);
    return () => document.removeEventListener("click", onClickOut);
  }, [show]);

  return (
    <>
      <sup
        ref={ref}
        className="fn-ref"
        onClick={onClick}
      >[{n}]</sup>
      {show && ReactDOM.createPortal(
        <div className="footnote-popover fade-in" style={{ left: pos.x, top: pos.y }}>
          <span className="fn-num">Note {n}</span>
          {text}
        </div>,
        document.body
      )}
    </>
  );
}

function CodeBlock({ lang, label, children, defaultExpanded = false }) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  return (
    <div className="code-block">
      <div className="code-head">
        <span>{label || lang}</span>
        <button className="expand-btn" onClick={() => setExpanded(e => !e)}>
          {expanded ? "− collapse" : "+ expand"}
        </button>
      </div>
      <div className={"code-body" + (expanded ? " expanded" : "")}>
        <pre>{children}</pre>
      </div>
    </div>
  );
}

function PostView({ slug }) {
  const { posts } = window.SITE_DATA;
  const post = posts.find(p => p.slug === slug);
  if (!post) return <NotFound />;
  const idx = posts.findIndex(p => p.slug === post.slug);
  const prev = posts[idx + 1];
  const next = posts[idx - 1];
  const related = posts.filter(p => p.slug !== post.slug && p.topic === post.topic).slice(0, 3);
  while (related.length < 3) {
    const filler = posts.find(p => p.slug !== post.slug && !related.includes(p));
    if (filler) related.push(filler); else break;
  }

  // Reading progress
  const [progress, setProgress] = useState(0);
  const [showMeter, setShowMeter] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
      setProgress(p);
      setShowMeter(window.scrollY > 280);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  const isFeatured = post.slug === "real-cost-bad-product-data";
  const pct = Math.round(progress * 100);
  const remaining = Math.max(0, Math.round(parseInt(post.read) * (1 - progress)));

  return (
    <article className="fade-in">
      <div className="read-progress" style={{ width: pct + "%" }} />
      <div className={"read-meter" + (showMeter ? " show" : "")}>
        {pct}% · <span className="rm-bar" style={{"--p": pct + "%"}} /> · {remaining} min left
      </div>

      <header className="post-header">
        <div className="shell narrow">
          <div className="meta-line meta">
            <span>{fmtDate(post.date)}</span>
            <span className="dot">·</span>
            <span>{post.read} read</span>
            <span className="dot">·</span>
            <span>{post.topic}</span>
          </div>
          <h1 className="display">{post.title}</h1>
          <p className="dek">{post.dek || post.excerpt}</p>
          <div className="byline">— Jason Capshaw</div>
        </div>
      </header>

      <div className="shell narrow">
        <div className="prose">
          {isFeatured ? <RealCostOfBadDataBody /> : <GenericBody post={post} />}

          <div className="post-footer">
            <div className="eyebrow" style={{marginBottom: 14}}>§ Notes</div>
            <ol className="notes-list">
              <li>
                Industry estimates vary; the figure most often cited comes from
                a 2023 IDEA benchmark of 128 mid-market distributors, where the
                median cost of data-quality incidents reached 2.1% of annual
                gross revenue.
              </li>
              <li>
                UNSPSC (United Nations Standard Products and Services Code) is
                widely adopted in industrial procurement but inconsistently
                applied; a distributor's "UNSPSC-tagged" feed is often tagged
                only at the 2- or 4-digit level.
              </li>
              <li>
                I say this having shipped four of them. The fifth one, I
                rewrote the catalog first. It went measurably better.
              </li>
            </ol>
          </div>

          <nav className="post-nav">
            {prev ? (
              <a href={"#/post/" + prev.slug}
                 data-preview-title={prev.title}
                 data-preview-excerpt={prev.excerpt}
                 data-preview-meta={fmtDate(prev.date)}>
                <div className="dir">← Previous</div>
                <div className="t">{prev.title}</div>
              </a>
            ) : <div />}
            {next ? (
              <a href={"#/post/" + next.slug} className="next"
                 data-preview-title={next.title}
                 data-preview-excerpt={next.excerpt}
                 data-preview-meta={fmtDate(next.date)}>
                <div className="dir">Next →</div>
                <div className="t">{next.title}</div>
              </a>
            ) : <div />}
          </nav>

          <section className="related">
            <div className="related-head">§ Related essays</div>
            <div className="related-grid">
              {related.map(r => (
                <a key={r.slug} href={"#/post/" + r.slug} className="related-card"
                   data-preview-title={r.title}
                   data-preview-excerpt={r.excerpt}
                   data-preview-meta={fmtDate(r.date)}>
                  <div className="r-topic">{r.topic}</div>
                  <div className="r-title">{r.title}</div>
                  <div className="r-meta">{fmtDate(r.date)} · {r.read}</div>
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}

function RealCostOfBadDataBody() {
  return (
    <>
      <p>
        Every distributor I've worked with over the last decade shares the same
        quiet anxiety. They know their product data is bad. They cannot quite
        say how bad, or what it's costing them, or who is supposed to fix it.
        So it persists, absorbed as a permanent line-item of friction in
        every workflow the business runs.<FootnoteRef n="1" />
      </p>

      <p>
        The cost is not theoretical. It shows up in quotes that go out with
        wrong weights and lose on freight. In a search bar that can't resolve{" "}
        <em>1/2-inch EMT conduit</em> because the catalog has it spelled six
        ways. In a replatforming project that blows its schedule not because
        the platform is wrong, but because nobody owns the master attribute
        schema.
      </p>

      <h2><span className="num">01</span> A short taxonomy of data rot</h2>

      <p>
        There are four recurring shapes of bad product data in distribution,
        and they compound in order:
      </p>

      <ShapesMatrix />

      <p>
        Each corner of the matrix is a different failure mode with a different
        remedy:
      </p>

      <div className="callout">
        <div className="c-label">Shape A<br/>Missing</div>
        <div className="c-body">
          Required attributes absent or null. The most common failure mode, and
          the easiest to detect — but rarely the most expensive.
        </div>
      </div>

      <div className="callout">
        <div className="c-label">Shape B<br/>Wrong</div>
        <div className="c-body">
          Attributes present but incorrect. Freight class, HTS code, pack
          quantity. These silently corrupt downstream calculations and don't
          surface until a customer calls.
        </div>
      </div>

      <div className="callout">
        <div className="c-label">Shape C<br/>Inconsistent</div>
        <div className="c-body">
          Present and correct, but expressed differently across suppliers:
          "1/2 in" vs. "0.5 inch" vs. "12.7 mm." Breaks search, filtering,
          and any analytics that assumes a canonical form.
        </div>
      </div>

      <div className="callout">
        <div className="c-label">Shape D<br/>Untyped</div>
        <div className="c-body">
          Present but schema-less — attributes dropped into free-text
          descriptions because there is nowhere else to put them. Invisible
          to every system that isn't a human.
        </div>
      </div>

      <p>
        Most distribution companies spend the bulk of their data-quality
        budget on Shape A. This is the wrong place to start. Shape A is
        detectable by a <code>NOT NULL</code> constraint. Shape D is what
        silently eats your commerce roadmap.<FootnoteRef n="2" />
      </p>

      <h2><span className="num">02</span> Why it persists</h2>

      <p>
        The honest answer is that product data ownership is a structural
        problem, not a tooling problem. Every department in a distributor
        depends on the catalog, but none of them own it.
      </p>

      <OwnershipDiagram />

      <p>
        The result: a catalog that is everybody's problem and nobody's
        product. Bad data is the emergent property of that arrangement, not
        an accident.
      </p>

      <div className="pullquote">
        Every replatforming project I've shipped that treated the catalog as a
        downstream concern has overrun its budget. The one where I rewrote
        the catalog first went measurably better.<FootnoteRef n="3" />
      </div>

      <h2><span className="num">03</span> A pipeline that actually works</h2>

      <p>
        The pattern I reach for now is boring on purpose. Ingest supplier
        feeds into a staging table with minimal transformation. Normalize in
        a second pass, with every normalization rule versioned. Reconcile
        against a canonical attribute schema. Publish.
      </p>

      <PipelineDiagram />

      <CodeBlock lang="SQL" label="catalog-pipeline.sql — normalization pass">
{`-- stage_01: raw ingest, no transforms
create table catalog.stage_supplier (
  supplier_id  text        not null,
  sku          text        not null,
  payload      jsonb       not null,
  received_at  timestamptz not null default now(),
  primary key (supplier_id, sku, received_at)
);

-- stage_02: normalized into canonical shape
create table catalog.canonical_item (
  item_id          uuid        primary key,
  mfr_part_number  text        not null,
  unspsc_8         text        check (length(unspsc_8) = 8),
  uom              text        not null references catalog.uom(code),
  attributes       jsonb       not null,
  attribute_schema text        not null,  -- versioned
  sourced_from     text[]      not null,
  confidence       numeric(3,2),          -- 0.00 .. 1.00
  updated_at       timestamptz not null default now()
);

-- every normalization is auditable
create table catalog.normalization_event (
  event_id     bigint generated always as identity primary key,
  item_id      uuid references catalog.canonical_item,
  rule_name    text not null,
  rule_version text not null,
  before       jsonb,
  after        jsonb,
  applied_at   timestamptz not null default now()
);`}
      </CodeBlock>

      <p>
        Three design choices do most of the work. <strong>Audit trails on
        every rule application</strong> so you can answer "why did this item
        change" in production. <strong>Versioned attribute schemas</strong>{" "}
        so retroactive changes don't silently invalidate downstream
        contracts. And a <strong>confidence score</strong> on every canonical
        record so systems that consume the catalog can make their own
        decisions about trust.
      </p>

      <h2><span className="num">04</span> The real cost</h2>

      <p>
        So: what does it actually cost? In ten years of engagements, I've
        seen the same rough breakdown:
      </p>

      <ul>
        <li><strong>~1.5% of revenue</strong> in quote errors, freight miscalculations, and reactive returns.</li>
        <li><strong>~3–6 months</strong> added to a typical replatforming project when catalog work is treated as a late-stage concern.</li>
        <li><strong>20–40% of a customer service team's time</strong> spent resolving questions that a better catalog would have answered in the UI.</li>
      </ul>

      <p>
        None of these show up as a line item on any budget. That's the
        problem. The cost is real, it is measurable, and it is structurally
        invisible — which is exactly why fixing it quietly returns more than
        most of the initiatives that do appear on the budget.
      </p>

      <p>
        Start there. Write down your attribute schema. Version it. Make
        somebody responsible for it. The rest is implementation detail.
      </p>
    </>
  );
}

function GenericBody({ post }) {
  // Generic placeholder prose — consistent in texture with the featured essay.
  return (
    <>
      <p>
        {post.excerpt} The details of this argument matter more than the
        premise, so bear with me for a few paragraphs while I set up the
        shape of the problem.
      </p>

      <p>
        Distribution is a business of seams. Every interesting problem in the
        industry lives at the join between two systems — ERP and storefront,
        supplier feed and canonical catalog, rep in the field and desk in
        the back office — and the work of a systems architect is, almost
        always, the work of making those seams honest.<FootnoteRef n="1" />
      </p>

      <h2><span className="num">01</span> The premise</h2>

      <p>
        Most of the failure modes I've watched distributors run into have a
        common cause: a piece of the business that was modeled as a technical
        concern turns out to be a trust concern, or vice versa. The symptoms
        differ. The remedy rhymes.
      </p>

      <div className="pullquote">
        The software you can ship in six months usually isn't the software the
        business needed twelve months ago. That's fine. The point of good
        architecture is to make the gap navigable.
      </div>

      <h2><span className="num">02</span> What to do instead</h2>

      <p>
        What follows is a small number of concrete patterns I reach for when
        a client describes the problem in the shape above. None of them are
        novel — that's deliberate. Novelty in B2B systems architecture is
        almost always a signal that you've misunderstood the domain.
      </p>

      <CodeBlock lang="TypeScript" label="example — intent extraction">
{`// Intent extraction from RFQ line-items.
// The hard part is not the LLM. It's the schema you extract into.
type LineItemIntent = {
  kind: "exact" | "equivalent" | "category";
  query: string;
  uom_hint?: string;
  quantity: number;
  uom: string;
  qualifiers: string[];    // "red", "stainless", "NEMA 4X"
  confidence: number;      // 0..1
};

async function extractIntent(
  raw: string
): Promise<LineItemIntent[]> {
  const normalized = normalize(raw);
  const candidates = await llm.complete({
    system: SYSTEM_PROMPT,
    user: normalized,
    schema: LineItemIntentArray,
  });
  return candidates.filter(c => c.confidence > 0.55);
}`}
      </CodeBlock>

      <p>
        The rest of the essay unpacks three specific cases from engagements in
        the last eighteen months. Names and SKUs have been changed; the
        architecture has not.
      </p>

      <h2><span className="num">03</span> In closing</h2>

      <p>
        If any of this is useful to you, I'd be glad to hear about it — I
        write these essays partly to think in public and partly to find the
        other people thinking about the same problems. The contact address
        is on the About page.
      </p>
    </>
  );
}

Object.assign(window, { PostView, FootnoteRef, CodeBlock });
