/* ShadowFin — shared UI component library */
(function () {
  const I = window.SF_ICONS;

  /* ---------- Button ---------- */
  const Button = ({ variant = "primary", size = "md", icon, iconRight, children, full, ...p }) => {
    const Ico = icon ? I[icon] : null;
    const IcoR = iconRight ? I[iconRight] : null;
    return (
      <button className={`sf-btn sf-btn-${variant} sf-btn-${size}${full ? " sf-btn-full" : ""}`} {...p}>
        {Ico && <Ico size={size === "sm" ? 15 : 17} />}
        {children && <span>{children}</span>}
        {IcoR && <IcoR size={size === "sm" ? 15 : 17} />}
      </button>
    );
  };

  /* ---------- Status badges ---------- */
  const BADGE = {
    Awaiting: "slate", Detected: "blue", Screening: "amber", Confirmed: "mint", Rejected: "red",
    Settled: "mint", Pending: "amber", Queued: "slate", Complete: "mint",
    Hit: "red", Clear: "mint", Review: "amber",
  };
  const Badge = ({ children, tone, dot = true }) => {
    const t = tone || BADGE[children] || "slate";
    return (
      <span className={`sf-badge sf-badge-${t}`}>
        {dot && <span className="sf-badge-dot" />}{children}
      </span>
    );
  };

  /* ---------- Card ---------- */
  const Card = ({ title, sub, action, children, pad = true, className = "", ...p }) => (
    <section className={`sf-card ${className}`} {...p}>
      {(title || action) && (
        <header className="sf-card-head">
          <div>
            {title && <h3 className="sf-card-title">{title}</h3>}
            {sub && <p className="sf-card-sub">{sub}</p>}
          </div>
          {action}
        </header>
      )}
      <div className={pad ? "sf-card-body" : ""}>{children}</div>
    </section>
  );

  /* ---------- Alert ---------- */
  const Alert = ({ kind = "info", title, children }) => {
    const map = { success: "check", info: "info", warning: "warn", risk: "risk" };
    const Ico = I[map[kind]] || I.info;
    return (
      <div className={`sf-alert sf-alert-${kind}`}>
        <span className="sf-alert-ico"><Ico size={18} /></span>
        <div>
          {title && <p className="sf-alert-title">{title}</p>}
          {children && <p className="sf-alert-body">{children}</p>}
        </div>
      </div>
    );
  };

  /* ---------- Risk score ---------- */
  const riskBand = (r) => (r == null ? "na" : r < 25 ? "low" : r < 60 ? "med" : "high");
  const riskLabel = (r) => (r == null ? "—" : r < 25 ? "Low" : r < 60 ? "Medium" : "High");

  /* ---------- Risk state pill (clean / screening / flagged) ---------- */
  const STATE = {
    clean:     { tone: "mint",  label: "Clean" },
    screening: { tone: "amber", label: "Screening" },
    flagged:   { tone: "red",   label: "Flagged" },
  };
  const StatePill = ({ state }) => {
    if (!state) return <span className="sf-muted">—</span>;
    const s = STATE[state] || STATE.screening;
    return <span className={`sf-badge sf-badge-${s.tone}`}><span className="sf-badge-dot" />{s.label}</span>;
  };
  const RiskPill = ({ value }) => (
    <span className={`sf-risk sf-risk-${riskBand(value)}`}>
      {value == null ? "—" : value} {value != null && <em>/100</em>}
    </span>
  );
  const RiskMeter = ({ value }) => (
    <div className="sf-meter">
      <div className="sf-meter-head">
        <span className="sf-meter-num">{value == null ? "—" : value}<small>/100</small></span>
        <span className={`sf-risk sf-risk-${riskBand(value)}`}>{riskLabel(value)} risk</span>
      </div>
      <div className="sf-meter-track">
        <div className={`sf-meter-fill sf-meter-${riskBand(value)}`} style={{ width: `${value == null ? 0 : value}%` }} />
      </div>
      <div className="sf-meter-scale"><span>0</span><span>25</span><span>60</span><span>100</span></div>
    </div>
  );

  /* ---------- Check row (Sanctions / PEP / Adverse Media) ---------- */
  const CheckRow = ({ label, value }) => {
    const ok = value === "Clear";
    const review = value === "Review";
    const Ico = ok ? I.checkCircle : review ? I.warn : I.risk;
    return (
      <div className="sf-checkrow">
        <span className={`sf-checkrow-ico ${ok ? "ok" : review ? "rev" : "hit"}`}><Ico size={18} /></span>
        <span className="sf-checkrow-label">{label}</span>
        <Badge tone={ok ? "mint" : review ? "amber" : "red"} dot={false}>{value}</Badge>
      </div>
    );
  };

  /* ---------- Form elements ---------- */
  const Field = ({ label, hint, children }) => (
    <label className="sf-field">
      {label && <span className="sf-field-label">{label}</span>}
      {children}
      {hint && <span className="sf-field-hint">{hint}</span>}
    </label>
  );
  const Input = ({ icon, ...p }) => {
    const Ico = icon ? I[icon] : null;
    return (
      <span className={`sf-input-wrap${Ico ? " has-ico" : ""}`}>
        {Ico && <Ico size={17} className="sf-input-ico" />}
        <input className="sf-input" {...p} />
      </span>
    );
  };
  const Textarea = (p) => <textarea className="sf-input sf-textarea" {...p} />;
  const Select = ({ children, ...p }) => (
    <span className="sf-select-wrap">
      <select className="sf-input sf-select" {...p}>{children}</select>
      <I.chevronDown size={16} className="sf-select-ico" />
    </span>
  );
  const Toggle = ({ checked, onChange, label, sub }) => (
    <label className="sf-toggle">
      <span className={`sf-toggle-track${checked ? " on" : ""}`} onClick={() => onChange && onChange(!checked)} role="switch" aria-checked={checked}>
        <span className="sf-toggle-thumb" />
      </span>
      {(label || sub) && <span className="sf-toggle-txt"><b>{label}</b>{sub && <small>{sub}</small>}</span>}
    </label>
  );
  const Checkbox = ({ checked, onChange, label }) => (
    <label className="sf-check">
      <span className={`sf-check-box${checked ? " on" : ""}`} onClick={() => onChange && onChange(!checked)}>
        {checked && <I.check size={13} />}
      </span>
      {label && <span>{label}</span>}
    </label>
  );
  const Radio = ({ checked, onChange, label }) => (
    <label className="sf-radio" onClick={() => onChange && onChange(true)}>
      <span className={`sf-radio-dot${checked ? " on" : ""}`} />
      {label && <span>{label}</span>}
    </label>
  );

  /* ---------- Avatar (deterministic initials) ---------- */
  const Avatar = ({ name, size = 32 }) => {
    const init = name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
    let h = 0; for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360;
    return (
      <span className="sf-avatar" style={{ width: size, height: size, background: `oklch(0.92 0.04 ${h})`, color: `oklch(0.42 0.09 ${h})`, fontSize: size * 0.36 }}>
        {init}
      </span>
    );
  };

  /* ---------- Network chip ---------- */
  const Network = ({ name }) => (
    <span className={`sf-net sf-net-${name === "TRON" ? "tron" : "eth"}`}>
      <span className="sf-net-dot" />{name}
    </span>
  );

  /* ---------- USDT amount ---------- */
  const USDT = ({ value, size = "md" }) => (
    <span className={`sf-usdt sf-usdt-${size}`}>
      {window.SF_DATA.fmtUSDT(value)}<small> USDT</small>
    </span>
  );

  /* ---------- Sparkline / area chart ---------- */
  const AreaChart = ({ data, height = 220, color = "#49C98A", ymin, ymax, labels }) => {
    const w = 720, pad = 8;
    const lo = ymin != null ? ymin : Math.min(...data);
    const hi = ymax != null ? ymax : Math.max(...data);
    const x = (i) => pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = (v) => pad + (1 - (v - lo) / (hi - lo || 1)) * (height - pad * 2 - 22);
    const line = data.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
    const area = `${line} L${x(data.length - 1).toFixed(1)} ${height - 22} L${x(0).toFixed(1)} ${height - 22} Z`;
    return (
      <svg className="sf-chart" viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none" width="100%" height={height}>
        <defs>
          <linearGradient id={`ac-${color.slice(1)}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={color} stopOpacity="0.22" />
            <stop offset="1" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((g) => (
          <line key={g} x1={pad} x2={w - pad} y1={pad + g * (height - pad * 2 - 22)} y2={pad + g * (height - pad * 2 - 22)} stroke="#E7EBEF" strokeWidth="1" />
        ))}
        <path d={area} fill={`url(#ac-${color.slice(1)})`} />
        <path d={line} fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        {data.map((v, i) => i === data.length - 1 && (
          <circle key={i} cx={x(i)} cy={y(v)} r="4" fill={color} stroke="#fff" strokeWidth="2" />
        ))}
        {labels && labels.map((l, i) => (
          <text key={i} x={x(i * (data.length - 1) / (labels.length - 1))} y={height - 4} fontSize="11" fill="#7A828C" textAnchor={i === 0 ? "start" : i === labels.length - 1 ? "end" : "middle"}>{l}</text>
        ))}
      </svg>
    );
  };

  Object.assign(window, {
    Button, Badge, Card, Alert, RiskPill, RiskMeter, CheckRow, StatePill,
    Field, Input, Textarea, Select, Toggle, Checkbox, Radio,
    Avatar, Network, USDT, AreaChart, riskBand,
  });
})();
