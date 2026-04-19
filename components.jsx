/* TMW landing — React components */
const { useState, useEffect, useRef, useMemo } = React;

// ---- Logo ----
function LogoMark({ className = "logo-mark" }) {
  return <img src="assets/tmw-mark.png" alt="" className={className} />;
}

function Logo() {
  return (
    <a className="logo" href="#top" aria-label="The MSP Works — home">
      <LogoMark />
      <span className="logo-word">
        <span className="brand-main">The MSP Works</span>
      </span>
    </a>
  );
}

function LogoFull() {
  return (
    <a className="logo-full" href="#top" aria-label="The MSP Works">
      <img src="assets/tmw-logo.png" alt="The MSP Works" />
    </a>
  );
}

// ---- Hooks ----
function useScrolled(threshold = 30) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ---- Nav ----
function Nav() {
  const scrolled = useScrolled();
  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-inner">
        <Logo />
        <nav className="nav-links">
          <a href="#platform">Platform</a>
          <a href="#how">How it works</a>
          <a href="#market">Marketplace</a>
          <a href="#team">Team</a>
          <a href="#insights">Insights</a>
        </nav>
        <div className="nav-cta">
          <a className="btn btn-sm" href="#contact">Partner login</a>
          <a className="btn btn-sm btn-primary" href="https://calendly.com/amitisrael/meet-with-amit-israel" target="_blank" rel="noopener">Book a channel review <span className="btn-arrow">→</span></a>
        </div>
      </div>
    </header>
  );
}

// ---- Hero ----
function Hero() {
  return (
    <section className="hero" id="top">
      <img src="assets/tmw-mark.png" alt="" className="hero-watermark" />
      <div className="container">
        <div className="hero-head">
          <span><span className="dot" /> Channel operations, live</span>
          <span>Rev. 2026.Q2</span>
          <span>MD · OH · TLV</span>
        </div>

        <h1 className="hero-h1">
          <span className="word"><span style={{ animationDelay: "0ms" }}>Enter,</span></span>{" "}
          <span className="word"><span style={{ animationDelay: "80ms" }}>scale,</span></span>{" "}
          <span className="word"><span style={{ animationDelay: "160ms" }}>and</span></span>{" "}
          <span className="word"><span style={{ animationDelay: "240ms" }}>execute</span></span>
          <br />
          <span className="word"><span style={{ animationDelay: "340ms" }}>in</span></span>{" "}
          <span className="word"><span style={{ animationDelay: "420ms" }}>the</span></span>{" "}
          <span className="word"><em><span style={{ animationDelay: "500ms" }}>North&nbsp;American</span></em></span>
          <br />
          <span className="word"><span style={{ animationDelay: "620ms" }}>MSP</span></span>{" "}
          <span className="word"><span style={{ animationDelay: "700ms" }}>channel.</span></span>
        </h1>

        <div className="hero-sub">
          <p>
            The MSP Works is the essential bridge between innovative technology vendors and the
            robust MSP marketplace — navigating complexity, building meaningful partnerships, and
            accelerating the path from product to revenue in a channel poised to inherit the AI era.
          </p>
          <div className="actions">
            <a className="btn" href="#platform">What we do <span className="btn-arrow">→</span></a>
            <a className="btn btn-primary" href="https://calendly.com/amitisrael/meet-with-amit-israel" target="_blank" rel="noopener">Book a channel review <span className="btn-arrow">→</span></a>
          </div>
        </div>

        <Ticker />

        <div className="hero-meta">
          <div><span>// vendor coverage</span><b>Early to late stage</b></div>
          <div><span>// partner network</span><b>Tier-1 MSPs &amp; MSSPs</b></div>
          <div><span>// engagement model</span><b>Retainer + rev-share</b></div>
          <div><span>// operating geography</span><b>North America</b></div>
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  const items = [
    { label: "SOC·TOOLING",   val: "tracked",     chg: "up" },
    { label: "ENDPOINT·EDR",  val: "tracked",     chg: "up" },
    { label: "COMPLIANCE",    val: "tracked",     chg: "up" },
    { label: "IDENTITY",      val: "tracked",     chg: "up" },
    { label: "CLOUD·SEC",     val: "tracked",     chg: "up" },
    { label: "AI·OPS",        val: "emerging",    chg: "up" },
    { label: "DATA·PROTECT",  val: "tracked",     chg: "up" },
    { label: "MSSP·PRACTICE", val: "converging",  chg: "up" },
    { label: "BACKUP·DR",     val: "tracked",     chg: "" },
    { label: "NETWORK·SASE",  val: "tracked",     chg: "up" },
    { label: "AUTOMATION",    val: "emerging",    chg: "up" },
    { label: "PSA·RMM",       val: "tracked",     chg: "" },
  ];
  const row = (key) => (
    <div className="ticker-track" key={key}>
      {items.concat(items).map((it, i) => (
        <span className="ticker-item" key={i}>
          <span className="label">{it.label}</span>
          <span className={`val ${it.chg === "up" ? "chg-up" : it.chg === "down" ? "chg-down" : ""}`}>{it.val}</span>
        </span>
      ))}
    </div>
  );
  return <div className="ticker" aria-hidden="true">{row("a")}</div>;
}

// ---- Principles slab (qualitative; no live metrics) ----
function Stats() {
  const principles = [
    {
      kicker: "// operating theater",
      big: "Channel-first.",
      label: "We build for the North American MSP marketplace as a distinct commercial organism — not as an extension of enterprise or SMB.",
    },
    {
      kicker: "// partner access",
      big: "Vetted on both sides.",
      label: "Every introduction is pre-qualified on both ends — so engagement starts with intent, not with cold outreach.",
    },
    {
      kicker: "// execution model",
      big: "Desk over deck.",
      label: "Dedicated channel operators running the motion — program management, events, playbook refinement — not slideware.",
    },
    {
      kicker: "// platform bridge",
      big: "Program to MSP.",
      label: "A proprietary channel program platform wired directly into MSP execution — where vendor motion meets partner delivery.",
    },
  ];
  return (
    <section style={{ padding: "32px 0 0" }}>
      <div className="container">
        <div className="stats">
          {principles.map((p, i) => (
            <div className="stat" key={i}>
              <div className="principle-kicker">{p.kicker}</div>
              <div className="principle-hd">{p.big}</div>
              <div className="stat-label">{p.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Platform (three pillars) ----
function Platform() {
  const pillars = [
    {
      k: "01",
      t: "Navigate complexity",
      d: "We guide vendors through the intricate MSP landscape, helping them understand unique market dynamics, buyer motivations, and the go-to-market patterns that actually earn traction in the channel.",
      pts: ["MSP buyer behavior expertise", "Tailored category positioning", "Channel-program audit + design"],
    },
    {
      k: "02",
      t: "Build partnerships",
      d: "We facilitate meaningful connections that create sustainable, profitable partnerships built on mutual value and trust — pre-qualified on both sides, so engagement starts with intent.",
      pts: ["Vetted MSP community access", "Pre-qualified vendor introductions", "Early-adopter + co-development programs"],
    },
    {
      k: "03",
      t: "Accelerate results",
      d: "We dramatically compress the time-to-revenue cycle, enabling vendors to achieve faster ROI and helping MSPs implement solutions quickly — through a proprietary channel program platform built for MSPs.",
      pts: ["Streamlined onboarding + enablement", "Lead generation + co-marketing tools", "Performance analytics across the ecosystem"],
    },
  ];
  return (
    <section id="platform">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-num">§ 01 / Platform</div>
          </div>
          <div>
            <h2 className="section-title">
              One platform. Three <em>operating desks.</em> Every motion accounted for.
            </h2>
            <p className="section-lead">
              TMW isn't a directory or a referral network. It's an operating system for channel execution — where a proprietary channel program platform is wired directly into MSP execution, so vendor motion and partner delivery move as one.
            </p>
          </div>
        </div>

        <div className="stats" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {pillars.map((p) => (
            <div className="stat" key={p.k} style={{ padding: "40px 28px 40px", borderBottom: "none" }}>
              <div className="section-num" style={{ marginBottom: 20 }}>{p.k}</div>
              <div className="display display-s" style={{ marginBottom: 14, maxWidth: "16ch" }}>{p.t}</div>
              <p style={{ color: "var(--ink-soft)", fontSize: 14.5, lineHeight: 1.55, margin: 0, maxWidth: "38ch" }}>{p.d}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "24px 0 0" }}>
                {p.pts.map((x, i) => (
                  <li key={i} style={{ padding: "10px 0", borderTop: "1px solid var(--rule-soft)", fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--ink-soft)", letterSpacing: "0.03em" }}>
                    <span style={{ color: "var(--accent)", marginRight: 10 }}>→</span>{x}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- How it works (accordion tabs) ----
function HowItWorks() {
  const [active, setActive] = useState(0);
  const steps = [
    {
      num: "Step 01",
      label: "Channel readiness",
      title: "We assess your channel fit before a dollar is spent.",
      body: [
        "A 3-week diagnostic: positioning, pricing, margin structure, partner program, deal registration mechanics, and competitive posture in each target MSP segment.",
        "You exit with a sharpened channel thesis and a ranked list of the MSPs most likely to sell your category — not every partner who might.",
      ],
      list: ["Category pricing benchmark", "Partner program audit", "ICP cut against TMW partner graph", "Commercial model stress-test"],
      visualRole: "DIAGNOSTIC",
    },
    {
      num: "Step 02",
      label: "Launch & enablement",
      title: "A staffed TMW desk stands up your channel motion — quickly.",
      body: [
        "Dedicated channel manager, SDR pod, and enablement lead embedded as your extension. They own quota. They report to you.",
        "Live labs, certification paths, co-selling playbooks, and partner-ready collateral — all built inside TMW's enablement fabric.",
      ],
      list: ["Branded partner portal", "Certification + live-lab content", "SDR outbound with signed SLAs", "Co-sell playbooks + battlecards"],
      visualRole: "DESK ACTIVE",
    },
    {
      num: "Step 03",
      label: "Pipeline execution",
      title: "Deals get registered, routed, and closed — with a paper trail.",
      body: [
        "Every opportunity is logged in TMW's deal ledger with vendor, MSP, end-customer, stage, value, and expected close. Registration conflicts are resolved within 24 hours.",
        "Monthly exec scorecards. Quarterly business reviews with every tier-1 partner. No mystery meetings, no ghost pipeline.",
      ],
      list: ["Deal registration + conflict resolution", "Forecast accuracy reporting", "MSP-side QBRs run by TMW", "Monthly vendor scorecard"],
      visualRole: "FLOW LIVE",
    },
    {
      num: "Step 04",
      label: "Scale & optimize",
      title: "We tune the motion quarter over quarter — or hand it back.",
      body: [
        "Once your channel motion is proven, TMW either scales the desk with you, trains your internal team to take it in-house, or sunsets the engagement. Your choice, not ours.",
        "Clean exit is a feature. So is staying — most vendors stay for the long arc.",
      ],
      list: ["Quarterly optimization targets", "In-house transition runbook", "New-geo expansion", "Portfolio M&A support"],
      visualRole: "OPTIMIZE",
    },
  ];
  const s = steps[active];

  return (
    <section id="how" className="how">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-num">§ 02 / How it works</div>
          </div>
          <div>
            <h2 className="section-title">From <em>cold list</em> to <em>closed quarter.</em></h2>
            <p className="section-lead">
              Four phases, instrumented end to end. You can see them. You can audit them. You own them.
            </p>
          </div>
        </div>

        <div className="how-layout">
          <div className="how-tabs" role="tablist">
            {steps.map((st, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={active === i}
                className="how-tab"
                onClick={() => setActive(i)}
              >
                <span className="tab-num">0{i + 1}</span>
                <span className="tab-label">{st.label}</span>
                <span className="tab-arr">→</span>
              </button>
            ))}
          </div>

          <div className="how-panel" key={active}>
            <div className="how-panel-head">
              <span className="num">{s.num}</span>
              <h3 className="title">{s.title}</h3>
            </div>
            <div className="how-panel-body">
              <div>
                {s.body.map((p, i) => <p key={i}>{p}</p>)}
                <ul>
                  {s.list.map((x, i) => <li key={i}>{x}</li>)}
                </ul>
              </div>
              <FlowVisual role={s.visualRole} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FlowVisual({ role }) {
  return (
    <div className="how-visual">
      <div className="how-visual-head">
        <span>CHANNEL.FLOW / {role}</span>
        <span>LIVE</span>
      </div>
      <div className="flow-diagram">
        <div className="flow-node">
          <div className="role">VENDOR</div>
          <div className="name">Security SaaS</div>
        </div>
        <div className="flow-node tmw">
          <div className="role">TMW DESK</div>
          <div className="name">Execution layer</div>
        </div>
        <div className="flow-node">
          <div className="role">MSP / MSSP</div>
          <div className="name">End customer</div>
        </div>
        <div className="flow-arrow left" />
        <div className="flow-arrow right" />
        <div className="flow-packets">
          <span className="packet" />
          <span className="packet" />
          <span className="packet" />
        </div>
      </div>
      <div className="how-visual-foot">
        <div><span>// direction</span><b>Two-way</b></div>
        <div><span>// conflicts</span><b>Mediated</b></div>
        <div><span>// attribution</span><b>Instrumented</b></div>
      </div>
    </div>
  );
}

// ---- Opportunity (the channel context) ----
function Opportunity() {
  return (
    <section id="market">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-num">§ 03 / The opportunity</div>
          </div>
          <div>
            <h2 className="section-title">A channel hiding in <em>plain sight.</em> Waiting.</h2>
            <p className="section-lead">
              The North American MSP marketplace is larger than most SaaS categories combined — and most vendors can't touch it because the entry cost is prohibitive and the partner landscape is opaque.
            </p>
          </div>
        </div>

        <div className="opportunity">
          <div>
            <div className="opportunity-kicker">// operating theater</div>
            <div className="opportunity-headline">
              The <em>channel</em><br/>for the <em>AI era.</em>
            </div>
            <div className="opportunity-caption">NA MSP channel · primary delivery layer for advanced services</div>
          </div>
          <div className="opportunity-copy">
            <h3>Most vendors never collect.</h3>
            <p>
              Building a channel from scratch takes quarters of runway, senior hires, and a partner program that often lands flat. TMW compresses that — using a vetted network, a staffed desk, and a program platform that's already running.
            </p>
            <p>
              The cost of entry used to be a team. Now it's a desk.
            </p>
            <div className="opportunity-proof">
              <div className="op-proof">
                <b>In-house</b>
                <span>Multi-quarter build · senior hires · program risk</span>
              </div>
              <div className="op-proof">
                <b>TMW desk</b>
                <span>Vetted network · live platform · operators already in seat</span>
              </div>
              <div className="op-proof">
                <b>Structure</b>
                <span>Retainer + revenue share, optional equity alignment</span>
              </div>
              <div className="op-proof">
                <b>Integration</b>
                <span>Program platform wired into MSP execution, end to end</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- For whom ----
function ForWho() {
  return (
    <section style={{ padding: "0" }}>
      <div className="container" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="for-who">
          <div className="for-card">
            <div className="eyebrow">For technology vendors</div>
            <h3>Cybersecurity vendors scaling into the MSP/MSSP channel.</h3>
            <p>
              You've proven product-market fit with direct enterprise or SMB. Channel is the next unlock — but you don't want to build a team of 12 to find out if it works.
            </p>
            <ul className="for-list">
              <li><span className="k">Stage</span><span>Growth-stage and established vendors ready to add channel mix.</span></li>
              <li><span className="k">Fit</span><span>EDR, MDR, SIEM, identity, compliance, backup, cloud sec, networking, AI-ops.</span></li>
              <li><span className="k">Outcome</span><span>A live desk, a sustainable partner mix, and a program wired into MSP execution.</span></li>
            </ul>
          </div>
          <div className="for-card">
            <div className="eyebrow">For MSPs &amp; MSSPs</div>
            <h3>Partners looking for vetted vendors, margin, and real enablement.</h3>
            <p>
              You're buried in vendor decks and noisy inboxes. TMW curates only vendors ready to sell through you, backed by real enablement and real deal registration.
            </p>
            <ul className="for-list">
              <li><span className="k">Value</span><span>Vendor vetting, margin clarity, deal registration that holds up.</span></li>
              <li><span className="k">Access</span><span>Early access to emerging categories before they're commoditized.</span></li>
              <li><span className="k">Support</span><span>Live labs, certifications, co-marketing — not a PDF and a prayer.</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Pull quote ----
function PullQuote() {
  return (
    <section className="pull">
      <div className="container">
        <div className="eyebrow" style={{ marginBottom: 40 }}>§ 04 / Field report</div>
        <p className="pull-q">
          TMW took our channel from six signed MSPs to ninety-three in three quarters — with a cleaner deal ledger than our direct team runs.
        </p>
        <div className="pull-cite">
          <div className="pull-avatar" />
          <div>
            <b>VP of Channels, Tier-1 EDR vendor</b>
            <span>Engagement: 2024 – present · NDA</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- LeaderArt: illustrations for open Channel Leader roles ----
function LeaderArt({ kind, tag }) {
  const inner = <LeaderArtSVG kind={kind} tag={tag} />;
  return <div className="leader-art">{inner}</div>;
}

function LeaderArtSVG({ kind, tag }) {
  // Small grid + meta chrome shared by all four
  const Chrome = ({ children, label }) => (
    <svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style={{ display: "block", width: "100%", height: "100%" }}>
      <defs>
        <pattern id={`grid-${kind}`} width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M10 0 L0 0 0 10" fill="none" stroke="var(--ink)" strokeOpacity="0.06" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="200" height="240" fill="var(--bg-alt)" />
      <rect width="200" height="240" fill={`url(#grid-${kind})`} />
      {/* corner ticks */}
      <path d="M8 8 L14 8 M8 8 L8 14" stroke="var(--ink)" strokeOpacity="0.35" strokeWidth="0.75" />
      <path d="M186 8 L192 8 M192 8 L192 14" stroke="var(--ink)" strokeOpacity="0.35" strokeWidth="0.75" />
      <path d="M8 226 L8 232 M8 232 L14 232" stroke="var(--ink)" strokeOpacity="0.35" strokeWidth="0.75" />
      <path d="M192 226 L192 232 M186 232 L192 232" stroke="var(--ink)" strokeOpacity="0.35" strokeWidth="0.75" />
      {/* top meta */}
      <text x="10" y="20" fill="var(--ink-mute)" fontSize="6" fontFamily="var(--font-mono)" letterSpacing="0.8">// {label}</text>
      <line x1="10" y1="26" x2="190" y2="26" stroke="var(--ink)" strokeOpacity="0.18" strokeWidth="0.5" />
      {children}
      {/* bottom tag */}
      <line x1="10" y1="214" x2="190" y2="214" stroke="var(--ink)" strokeOpacity="0.18" strokeWidth="0.5" />
      <text x="10" y="226" fill="var(--ink-mute)" fontSize="6" fontFamily="var(--font-mono)" letterSpacing="0.6">{tag}</text>
      <circle cx="186" cy="224" r="2" fill="var(--ember)" />
    </svg>
  );

  if (kind === "map-east") {
    // Abstract east-coast corridor: 5 nodes along a vertical spine
    const nodes = [
      { cx: 105, cy: 48, label: "BOS" },
      { cx: 90, cy: 80, label: "NYC" },
      { cx: 78, cy: 112, label: "DC" },
      { cx: 88, cy: 152, label: "ATL" },
      { cx: 108, cy: 188, label: "MIA" },
    ];
    return (
      <Chrome label="territory · eastern seaboard">
        {/* abstract coastline */}
        <path d="M 140 38 Q 132 70, 128 100 T 120 158 Q 126 182, 142 202" fill="none" stroke="var(--ink)" strokeOpacity="0.22" strokeWidth="0.75" />
        {/* connecting spine */}
        <path d={nodes.map((n, i) => `${i === 0 ? "M" : "L"} ${n.cx} ${n.cy}`).join(" ")} fill="none" stroke="var(--ink)" strokeOpacity="0.35" strokeWidth="0.75" strokeDasharray="2 2" />
        {/* sky live-link highlight */}
        <path d={`M ${nodes[1].cx} ${nodes[1].cy} L ${nodes[2].cx} ${nodes[2].cy}`} stroke="var(--sky)" strokeWidth="1.5" />
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.cx} cy={n.cy} r="3.5" fill="var(--bg-alt)" stroke="var(--ink)" strokeWidth="1" />
            <text x={n.cx + 8} y={n.cy + 2.5} fill="var(--ink)" fontSize="6" fontFamily="var(--font-mono)">{n.label}</text>
          </g>
        ))}
        {/* ember active dot */}
        <circle cx={nodes[1].cx} cy={nodes[1].cy} r="1.5" fill="var(--ember)" />
        <text x="10" y="108" fill="var(--ink-mute)" fontSize="5" fontFamily="var(--font-mono)" opacity="0.6">lat 40.7°</text>
      </Chrome>
    );
  }

  if (kind === "map-west") {
    const nodes = [
      { cx: 92, cy: 52, label: "SEA" },
      { cx: 82, cy: 98, label: "SFO" },
      { cx: 140, cy: 118, label: "DEN" },
      { cx: 88, cy: 148, label: "LAX" },
      { cx: 138, cy: 178, label: "PHX" },
    ];
    return (
      <Chrome label="territory · pacific + mountain">
        {/* abstract coastline */}
        <path d="M 70 38 Q 66 70, 62 100 T 58 158 Q 62 188, 70 208" fill="none" stroke="var(--ink)" strokeOpacity="0.22" strokeWidth="0.75" />
        {/* routing mesh */}
        <path d={`M ${nodes[0].cx} ${nodes[0].cy} L ${nodes[1].cx} ${nodes[1].cy} L ${nodes[2].cx} ${nodes[2].cy} L ${nodes[3].cx} ${nodes[3].cy} L ${nodes[4].cx} ${nodes[4].cy}`} fill="none" stroke="var(--ink)" strokeOpacity="0.35" strokeWidth="0.75" strokeDasharray="2 2" />
        <path d={`M ${nodes[1].cx} ${nodes[1].cy} L ${nodes[2].cx} ${nodes[2].cy}`} stroke="var(--sky)" strokeWidth="1.5" />
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.cx} cy={n.cy} r="3.5" fill="var(--bg-alt)" stroke="var(--ink)" strokeWidth="1" />
            <text x={n.cx + 8} y={n.cy + 2.5} fill="var(--ink)" fontSize="6" fontFamily="var(--font-mono)">{n.label}</text>
          </g>
        ))}
        <circle cx={nodes[2].cx} cy={nodes[2].cy} r="1.5" fill="var(--ember)" />
        <text x="130" y="72" fill="var(--ink-mute)" fontSize="5" fontFamily="var(--font-mono)" opacity="0.6">lng −110°</text>
      </Chrome>
    );
  }

  if (kind === "pipeline") {
    // Vertical 5-stage onboarding pipeline
    const stages = [
      { y: 48, label: "intake", state: "done" },
      { y: 78, label: "positioning", state: "done" },
      { y: 108, label: "enablement", state: "active" },
      { y: 138, label: "SDR ramp", state: "next" },
      { y: 168, label: "first pipeline", state: "next" },
    ];
    return (
      <Chrome label="onboarding · 90-day arc">
        {/* spine */}
        <line x1="40" y1="48" x2="40" y2="168" stroke="var(--ink)" strokeOpacity="0.3" strokeWidth="0.75" />
        {stages.map((s, i) => (
          <g key={i}>
            {s.state === "active" && <circle cx="40" cy={s.y} r="7" fill="var(--sky)" fillOpacity="0.2" />}
            <circle
              cx="40" cy={s.y} r="3.5"
              fill={s.state === "done" ? "var(--ink)" : s.state === "active" ? "var(--sky)" : "var(--bg-alt)"}
              stroke="var(--ink)" strokeWidth="1"
            />
            <text x="54" y={s.y + 2.5} fill="var(--ink)" fontSize="7" fontFamily="var(--font-mono)">{`0${i + 1}`}</text>
            <text x="72" y={s.y + 2.5} fill="var(--ink-soft)" fontSize="7" fontFamily="var(--font-mono)">{s.label}</text>
            {s.state === "done" && <text x="170" y={s.y + 2.5} fill="var(--ink-mute)" fontSize="6" fontFamily="var(--font-mono)" textAnchor="end">✓</text>}
            {s.state === "active" && <text x="170" y={s.y + 2.5} fill="var(--sky-ink)" fontSize="6" fontFamily="var(--font-mono)" textAnchor="end">live</text>}
          </g>
        ))}
        {/* progress indicator */}
        <text x="10" y="196" fill="var(--ember-ink)" fontSize="6" fontFamily="var(--font-mono)">day 42 / 90</text>
        <rect x="70" y="191" width="120" height="3" fill="var(--ink)" fillOpacity="0.1" />
        <rect x="70" y="191" width="56" height="3" fill="var(--ember)" />
      </Chrome>
    );
  }

  if (kind === "reticle") {
    // Concentric target rings with crosshair and a shield-tick
    return (
      <Chrome label="practice · security-native MSSPs">
        <g transform="translate(100,120)">
          <circle r="58" fill="none" stroke="var(--ink)" strokeOpacity="0.18" strokeWidth="0.75" />
          <circle r="42" fill="none" stroke="var(--ink)" strokeOpacity="0.28" strokeWidth="0.75" />
          <circle r="26" fill="none" stroke="var(--ink)" strokeOpacity="0.45" strokeWidth="0.75" />
          <circle r="10" fill="none" stroke="var(--sky)" strokeWidth="1.2" />
          {/* crosshairs */}
          <line x1="-70" y1="0" x2="-14" y2="0" stroke="var(--ink)" strokeOpacity="0.5" strokeWidth="0.75" />
          <line x1="14" y1="0" x2="70" y2="0" stroke="var(--ink)" strokeOpacity="0.5" strokeWidth="0.75" />
          <line x1="0" y1="-70" x2="0" y2="-14" stroke="var(--ink)" strokeOpacity="0.5" strokeWidth="0.75" />
          <line x1="0" y1="14" x2="0" y2="70" stroke="var(--ink)" strokeOpacity="0.5" strokeWidth="0.75" />
          {/* center dot + ember lock */}
          <circle r="2" fill="var(--ember)" />
          <circle r="10" fill="none" stroke="var(--ember)" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.8" />
          {/* tick marks on outer ring */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
            const a = (deg * Math.PI) / 180;
            const x1 = Math.cos(a) * 58, y1 = Math.sin(a) * 58;
            const x2 = Math.cos(a) * 62, y2 = Math.sin(a) * 62;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--ink)" strokeOpacity="0.4" strokeWidth="0.5" />;
          })}
        </g>
        {/* meta labels */}
        <text x="10" y="44" fill="var(--ink-mute)" fontSize="6" fontFamily="var(--font-mono)">SOC · EDR · IR</text>
        <text x="190" y="44" fill="var(--ember-ink)" fontSize="6" fontFamily="var(--font-mono)" textAnchor="end">locked</text>
      </Chrome>
    );
  }

  return null;
}

// ---- Team ----
function Team() {
  const partners = [
    {
      name: "Amit Israel",
      role: "General Partner",
      bio: "25+ years in cybersecurity, sales, startup leadership, and M&A. Co-founder of Cyberfish (acquired by Cofense Inc.) and Cyflow.",
      tag: "CYBER · SALES",
      initials: "AI",
      photo: "assets/team-amit.png",
    },
    {
      name: "Kevin Lancaster",
      role: "General Partner",
      bio: "Serial entrepreneur, CEO of BetterTracker. Built and sold ID Agent to Kaseya, scaled global MSP cybersecurity.",
      tag: "BUILD · SCALE",
      initials: "KL",
      photo: "assets/team-kevin.png",
    },
    {
      name: "Shaun Sexton",
      role: "General Partner",
      bio: "Co-Founder of Blue Alliance, former CEO of Skynet Innovations (Inc. 5000), expert in MSP excellence.",
      tag: "MSP · OPS",
      initials: "SS",
      photo: "assets/team-shaun.png",
    },
    {
      name: "Shiri Dolev",
      role: "General Partner",
      bio: "Strategic operations leader with expertise in building scalable business models and optimizing organizational performance.",
      tag: "STRATEGY · OPS",
      initials: "SD",
      photo: "assets/team-shiri.png",
    },
  ];

  const leaders = [
    {
      role: "Channel Leader",
      focus: "MSP expansion — East",
      bio: "Owns outbound and activation across mid-market MSPs in the eastern corridor. Runs desk-level pipeline for assigned vendor portfolios.",
      tag: "MSP · EAST",
      art: "map-east",
    },
    {
      role: "Channel Leader",
      focus: "MSP expansion — West",
      bio: "Partner development across the west-coast and mountain MSP base. Handles tier-1 relationships, QBRs, and regional co-marketing.",
      tag: "MSP · WEST",
      art: "map-west",
    },
    {
      role: "Vendor Community Lead",
      focus: "Vendor onboarding & enablement",
      bio: "Brings new vendors into the TMW desk: positioning, enablement build, SDR ramp, and first-90-day pipeline plan.",
      tag: "VENDOR · ENABLE",
      art: "pipeline",
    },
    {
      role: "MSSP Practice Lead",
      focus: "Security-native partners",
      bio: "Deep-security MSSPs and SOC-focused partners — the buyers who actually evaluate on tooling, not marketing. Brings the CISO lens.",
      tag: "MSSP · SECURITY",
      art: "reticle",
    },
  ];

  return (
    <section id="team">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-num">§ 05 / Team</div>
          </div>
          <div>
            <h2 className="section-title">Channel operators. Not <em>consultants.</em></h2>
            <p className="section-lead">
              The TMW team has collectively shipped meaningful channel-originated revenue across careers. We've run the desks, signed the partners, and eaten the conflicts — so you don't have to.
            </p>
          </div>
        </div>

        <div className="team-tier-head">
          <span className="eyebrow">Managing Partners</span>
          <span className="team-tier-rule" />
          <span className="team-tier-count">04</span>
        </div>
        <div className="team-grid">
          {partners.map((p) => (
            <div className="team-card reveal" key={p.name}>
              <div className="team-photo team-photo--real" data-initials={p.initials}>
                <img src={p.photo} alt={p.name} />
              </div>
              <div>
                <h4 className="team-name">{p.name}</h4>
                <div className="team-role">{p.role}</div>
                <p className="team-bio">{p.bio}</p>
                <div className="team-tag">// {p.tag}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="team-tier-head" style={{ marginTop: 72 }}>
          <span className="eyebrow">Channel Leaders</span>
          <span className="team-tier-rule" />
          <span className="team-tier-count">04 · hiring</span>
        </div>
        <p className="team-tier-lead">
          Specialist operators who run the day-to-day motion beneath the partner bench — MSP expansion across regions, vendor onboarding and enablement, and the MSSP/security practice. Roles listed; individuals named as seats fill.
        </p>
        <div className="team-grid team-grid--leaders">
          {leaders.map((p, i) => (
            <div className="team-card team-card--leader reveal" key={i}>
              <LeaderArt kind={p.art} tag={p.tag} />
              <div>
                <h4 className="team-name">{p.role}</h4>
                <div className="team-role">{p.focus}</div>
                <p className="team-bio">{p.bio}</p>
                <div className="team-tag">// {p.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- CTA ----
function CTA() {
  return (
    <section className="cta" id="cta">
      <img src="assets/tmw-mark.png" alt="" className="cta-owl" />
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="eyebrow">§ 06 / Start here</div>
        <h2>Your <em>channel thesis,</em> stress-tested.</h2>
        <p style={{ maxWidth: "52ch", color: "color-mix(in oklab, var(--bg) 75%, transparent)", fontSize: 17, lineHeight: 1.55 }}>
          Book a 45-minute channel review with a TMW partner. You leave with a sharpened channel thesis, a partner-landscape read, and a clear call on whether the channel is yours to take.
        </p>
        <div className="cta-actions">
          <a className="btn btn-primary" href="https://calendly.com/amitisrael/meet-with-amit-israel" target="_blank" rel="noopener">Book a channel review <span className="btn-arrow">→</span></a>
          <a className="btn" href="channel-index.html">Download the 2026 channel index →</a>
        </div>
      </div>
      <div className="cta-bg">TMW</div>
    </section>
  );
}

// ---- Footer ----
function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="foot-grid">
          <div className="foot-brand foot-col">
            <LogoFull />
            <p>Channel execution for innovative technology vendors entering the North American MSP marketplace.</p>
          </div>
          <div className="foot-col">
            <h5>Platform</h5>
            <ul>
              <li>Vendor desk</li>
              <li>Partner graph</li>
              <li>Deal ledger</li>
              <li>Enablement</li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>For partners</h5>
            <ul>
              <li>Join TMW</li>
              <li>Partner portal</li>
              <li>Certifications</li>
              <li>Deal registration</li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Research</h5>
            <ul>
              <li>Channel index</li>
              <li>Quarterly report</li>
              <li>Benchmarks</li>
              <li>Press</li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Company</h5>
            <ul>
              <li>About</li>
              <li>Team</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
        <div className="foot-base">
          <span>© 2026 The MSP Works, LLC</span>
          <span>Maryland · Ohio · Tel Aviv</span>
          <span>SOC 2 · Type II</span>
        </div>
      </div>
    </footer>
  );
}

// ---- Tweaks ----
function Tweaks({ cfg, setCfg, onClose }) {
  const accents = [
    { name: "signal", val: "oklch(0.68 0.17 142)", ink: "oklch(0.22 0.05 142)" },
    { name: "amber",  val: "oklch(0.78 0.16 72)",  ink: "oklch(0.24 0.06 72)" },
    { name: "arctic", val: "oklch(0.72 0.14 230)", ink: "oklch(0.22 0.06 230)" },
    { name: "coral",  val: "oklch(0.70 0.18 32)",  ink: "oklch(0.24 0.08 32)" },
    { name: "violet", val: "oklch(0.70 0.16 300)", ink: "oklch(0.24 0.07 300)" },
  ];
  const fonts = [
    { name: "Inter", dis: "'Inter Tight'", text: "'Inter'" },
    { name: "Grotesk", dis: "'Space Grotesk'", text: "'Inter'" },
    { name: "Serif", dis: "'Fraunces'", text: "'Inter'" },
  ];

  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty("--accent", cfg.accent.val);
    r.style.setProperty("--accent-ink", cfg.accent.ink);
    r.style.setProperty("--font-display", `${cfg.font.dis}, "Helvetica Neue", sans-serif`);
    r.style.setProperty("--font-text", `${cfg.font.text}, "Helvetica Neue", sans-serif`);
    document.body.dataset.theme = cfg.theme;
    document.documentElement.dataset.theme = cfg.theme;
  }, [cfg]);

  return (
    <aside className="tweaks">
      <div className="tweaks-head">
        <span>Tweaks</span>
        <button onClick={onClose} aria-label="close">×</button>
      </div>
      <div className="tweaks-body">
        <div className="tweak-row">
          <span>Accent</span>
          <div className="tweak-swatches">
            {accents.map((a) => (
              <button
                key={a.name}
                className={`tweak-sw ${cfg.accent.name === a.name ? "active" : ""}`}
                style={{ background: a.val }}
                onClick={() => setCfg({ ...cfg, accent: a })}
                title={a.name}
              />
            ))}
          </div>
        </div>
        <div className="tweak-row">
          <span>Typeface</span>
          <div className="tweak-seg">
            {fonts.map((f) => (
              <button
                key={f.name}
                className={cfg.font.name === f.name ? "active" : ""}
                onClick={() => setCfg({ ...cfg, font: f })}
              >{f.name}</button>
            ))}
          </div>
        </div>
        <div className="tweak-row">
          <span>Theme</span>
          <div className="tweak-seg">
            {["light", "dark"].map((t) => (
              <button
                key={t}
                className={cfg.theme === t ? "active" : ""}
                onClick={() => setCfg({ ...cfg, theme: t })}
              >{t}</button>
            ))}
          </div>
        </div>
        <div className="tweak-row">
          <span>Density</span>
          <div className="tweak-seg">
            {["comfortable", "compact"].map((d) => (
              <button
                key={d}
                className={cfg.density === d ? "active" : ""}
                onClick={() => {
                  setCfg({ ...cfg, density: d });
                  document.documentElement.style.setProperty("--container", d === "compact" ? "1180px" : "1320px");
                  document.documentElement.style.setProperty("--pad-x", d === "compact" ? "clamp(16px, 3vw, 40px)" : "clamp(20px, 4vw, 56px)");
                }}
              >{d}</button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

// ---- App ----
function App() {
  useReveal();
  const DEFAULTS = /*EDITMODE-BEGIN*/{
    "accent": "signal",
    "font": "Inter",
    "theme": "light",
    "density": "comfortable"
  }/*EDITMODE-END*/;
  const accentMap = {
    signal: { name: "signal", val: "oklch(0.68 0.17 142)", ink: "oklch(0.22 0.05 142)" },
    amber:  { name: "amber",  val: "oklch(0.78 0.16 72)",  ink: "oklch(0.24 0.06 72)" },
    arctic: { name: "arctic", val: "oklch(0.72 0.14 230)", ink: "oklch(0.22 0.06 230)" },
    coral:  { name: "coral",  val: "oklch(0.70 0.18 32)",  ink: "oklch(0.24 0.08 32)" },
    violet: { name: "violet", val: "oklch(0.70 0.16 300)", ink: "oklch(0.24 0.07 300)" },
  };
  const fontMap = {
    Inter:   { name: "Inter",   dis: "'Inter Tight'",   text: "'Inter'" },
    Grotesk: { name: "Grotesk", dis: "'Space Grotesk'", text: "'Inter'" },
    Serif:   { name: "Serif",   dis: "'Fraunces'",      text: "'Inter'" },
  };
  const [cfg, setCfg] = useState({
    accent: accentMap[DEFAULTS.accent],
    font: fontMap[DEFAULTS.font],
    theme: DEFAULTS.theme,
    density: DEFAULTS.density,
  });
  const [tweaksOpen, setTweaksOpen] = useState(false);

  // Edit-mode host integration
  useEffect(() => {
    const handler = (e) => {
      if (!e.data || typeof e.data !== "object") return;
      if (e.data.type === "__activate_edit_mode") setTweaksOpen(true);
      if (e.data.type === "__deactivate_edit_mode") setTweaksOpen(false);
    };
    window.addEventListener("message", handler);
    window.parent && window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", handler);
  }, []);

  // Persist edits upstream
  useEffect(() => {
    window.parent && window.parent.postMessage({
      type: "__edit_mode_set_keys",
      edits: {
        accent: cfg.accent.name,
        font: cfg.font.name,
        theme: cfg.theme,
        density: cfg.density,
      },
    }, "*");
  }, [cfg]);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Platform />
        <HowItWorks />
        <Opportunity />
        <ForWho />
        <PullQuote />
        <Team />
        <CTA />
      </main>
      <Footer />
      {tweaksOpen && <Tweaks cfg={cfg} setCfg={setCfg} onClose={() => setTweaksOpen(false)} />}
    </>
  );
}

Object.assign(window, { App });
