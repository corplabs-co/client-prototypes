/* ShadowFin — INTERNAL operator console shell + shared operator helpers */
(function () {
  const I = window.SF_ICONS;
  const Brand = window.SF_BrandMark;
  const D = window.OP_DATA;
  const { Avatar } = window;

  /* ---------- Merchant status pill (Active / Pending KYB / Suspended) ---------- */
  const MSTATUS = {
    "Active":      { tone: "mint",  label: "Active" },
    "Pending KYB": { tone: "amber", label: "Pending KYB" },
    "Suspended":   { tone: "red",   label: "Suspended" },
  };
  const MerchantStatus = ({ status }) => {
    const s = MSTATUS[status] || MSTATUS["Pending KYB"];
    return <span className={`sf-badge sf-badge-${s.tone}`}><span className="sf-badge-dot" />{s.label}</span>;
  };

  /* ---------- Risk-tier pill (Low / Medium / High) ---------- */
  const TIER = { Low: "low", Medium: "med", High: "high" };
  const TierPill = ({ tier }) => {
    if (!tier) return <span className="sf-risk sf-risk-na">Under review</span>;
    return <span className={`sf-risk sf-risk-${TIER[tier]}`}>{tier}</span>;
  };

  /* ---------- Merchant identity cell (avatar + name + id) ---------- */
  const MerchantCell = ({ merchant, size = 32, sub }) => (
    <div className="op-mcell">
      <Avatar name={merchant.name} size={size} />
      <div className="op-mcell-txt">
        <b>{merchant.name}</b>
        <span>{sub || merchant.id}</span>
      </div>
    </div>
  );

  /* ---------- Screen check row (entity / owner sanctions + adverse media) ---------- */
  const SCREEN_TONE = { Clear: "mint", Review: "amber", Hit: "red" };

  const NAV = [
    { id: "overview",    label: "Overview",    icon: "dashboard" },
    { id: "merchants",   label: "Merchants",   icon: "treasury" },
    { id: "approvals",   label: "Approvals",   icon: "compliance" },
    { id: "screening",   label: "Screening",   icon: "screening" },
    { id: "settlements", label: "Settlements", icon: "swap" },
    { id: "audit",       label: "Audit log",   icon: "book" },
  ];

  function Sidebar({ active, onNav }) {
    const badges = { approvals: D.pendingCount, screening: D.flaggedPayments.filter((p) => p.decision === "Under review").length };
    return (
      <aside className="sf-sidebar">
        <div className="sf-brand">
          <Brand size={34} />
          <span className="sf-brand-word"><span className="b">Shadow</span><span className="g">Fin</span></span>
          <span className="op-env">Operator</span>
        </div>
        <nav className="sf-nav">
          <span className="sf-nav-label">Platform</span>
          {NAV.map((n) => {
            const Ico = I[n.icon];
            return (
              <button key={n.id} className={`sf-nav-item${active === n.id ? " active" : ""}`} onClick={() => onNav(n.id)}>
                <Ico size={19} />
                <span>{n.label}</span>
                {badges[n.id] ? <span className="sf-nav-badge">{badges[n.id]}</span> : null}
              </button>
            );
          })}
        </nav>
        <div className="sf-side-foot">
          <button className="sf-side-card" style={{ width: "100%", textAlign: "left", cursor: "pointer" }} onClick={() => onNav("screening")}>
            <div className="lab" style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)" }} /> Screening engine
            </div>
            <div className="val">Operational <span style={{ fontSize: 12, color: "#7C8595", fontWeight: 500 }}>· {D.kpis.passRate} pass</span></div>
            <div className="grn"><I.screening size={13} /> {D.totalFlagged} flagged this month</div>
          </button>
        </div>
      </aside>
    );
  }

  function Topbar({ title, onNav }) {
    return (
      <header className="sf-topbar">
        <h2>{title}</h2>
        <div className="sf-topsearch">
          <window.Input icon="search" placeholder="Search merchants, payments, wallets…" />
        </div>
        <div className="sf-topbar-right">
          <button className="sf-btn sf-btn-secondary sf-btn-sm" onClick={() => onNav("approvals")} style={{ marginRight: 4 }}>
            <I.compliance size={15} /><span>Review queue</span>
            {D.pendingCount > 0 && <span className="op-topbadge">{D.pendingCount}</span>}
          </button>
          <button className="sf-iconbtn" title="Notifications"><I.bell size={19} /><span className="dot" /></button>
          <button className="sf-user">
            <window.Avatar name="Priya Anand" size={30} />
            <span style={{ textAlign: "left" }}>
              <span className="nm">Priya Anand</span><br /><span className="rl">Compliance · Operator</span>
            </span>
            <I.chevronDown size={15} style={{ color: "var(--ink-4)" }} />
          </button>
        </div>
      </header>
    );
  }

  Object.assign(window, { Sidebar, Topbar, MerchantStatus, TierPill, MerchantCell, SCREEN_TONE });
})();
