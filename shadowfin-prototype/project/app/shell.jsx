/* ShadowFin — App shell (sidebar + topbar) */
(function () {
  const I = window.SF_ICONS;
  const Brand = window.SF_BrandMark;
  const D = window.SF_DATA;

  const NAV = [
    { id: "home", label: "Home", icon: "home" },
    { id: "transactions", label: "Transactions", icon: "list" },
    { id: "accept", label: "Accept payment", icon: "qr" },
    { id: "settlement", label: "Settlement", icon: "swap" },
  ];
  const NAV_DEV = [
    { id: "onboarding", label: "Onboarding", icon: "compliance" },
    { id: "developers", label: "Developers", icon: "code" },
    { id: "settings", label: "Settings", icon: "settings" },
  ];

  function Sidebar({ active, onNav }) {
    const item = (n) => {
      const Ico = I[n.icon];
      return (
        <button key={n.id} className={`sf-nav-item${active === n.id ? " active" : ""}`} onClick={() => onNav(n.id)}>
          <Ico size={19} />
          <span>{n.label}</span>
          {n.badge && <span className="sf-nav-badge">{n.badge}</span>}
        </button>
      );
    };
    return (
      <aside className="sf-sidebar">
        <div className="sf-brand">
          <Brand size={34} />
          <span className="sf-brand-word"><span className="b">Shadow</span><span className="g">Fin</span></span>
        </div>
        <nav className="sf-nav">
          <span className="sf-nav-label">Payments</span>
          {NAV.map(item)}
          <span className="sf-nav-label">Workspace</span>
          {NAV_DEV.map(item)}
        </nav>
        <div className="sf-side-foot">
          <button className="sf-side-card" style={{ width: "100%", textAlign: "left", background: "rgba(73,201,138,0.08)", borderColor: "rgba(73,201,138,0.18)", cursor: "pointer" }} onClick={() => onNav("settlement")}>
            <div className="lab" style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)" }} /> Auto-settle
            </div>
            <div className="val">On <span style={{ fontSize: 12, color: "#7C8595", fontWeight: 500 }}>· settles on clean</span></div>
            <div className="grn"><I.swap size={13} /> {D.kpis.settled} USDT to your wallet</div>
          </button>
        </div>
      </aside>
    );
  }

  function Topbar({ title, onNav }) {
    const [pop, setPop] = React.useState(false);
    return (
      <header className="sf-topbar">
        <h2>{title}</h2>
        <div className="sf-topsearch">
          <window.Input icon="search" placeholder="Search payments, customers, addresses…" />
        </div>
        <div className="sf-topbar-right">
          <button className="sf-btn sf-btn-secondary sf-btn-sm" onClick={() => onNav("accept")} style={{ marginRight: 4 }}>
            <I.plus size={15} /><span>Accept payment</span>
          </button>
          <div style={{ position: "relative" }}>
            <button className="sf-iconbtn" onClick={() => setPop((v) => !v)} title="Notifications">
              <I.bell size={19} /><span className="dot" />
            </button>
            {pop && (
              <>
                <div style={{ position: "fixed", inset: 0, zIndex: 30 }} onClick={() => setPop(false)} />
                <div className="sf-pop">
                  <div className="sf-pop-head">
                    Notifications
                    <span className="sf-badge sf-badge-red" style={{ fontSize: 11 }}>3 new</span>
                  </div>
                  {D.notifications.map((n, i) => {
                    const Ico = I[n.icon];
                    return (
                      <div key={i} className="sf-notif" onClick={() => { setPop(false); onNav("transactions"); }} style={{ cursor: "pointer" }}>
                        <span className={`sf-notif-ico ${n.tone}`}><Ico size={18} /></span>
                        <div>
                          <b>{n.title}</b><span>{n.body}</span><br /><em>{n.t} ago</em>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
          <button className="sf-user">
            <window.Avatar name="Dana Reyes" size={30} />
            <span style={{ textAlign: "left" }}>
              <span className="nm">Dana Reyes</span><br /><span className="rl">Lumen Studio</span>
            </span>
            <I.chevronDown size={15} style={{ color: "var(--ink-4)" }} />
          </button>
        </div>
      </header>
    );
  }

  Object.assign(window, { Sidebar, Topbar });
})();
