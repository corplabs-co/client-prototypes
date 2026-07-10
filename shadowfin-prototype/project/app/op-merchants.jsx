/* ShadowFin — Operator: Merchants directory (rows open the full Merchant detail) */
(function () {
  const I = window.SF_ICONS;
  const D = window.OP_DATA;
  const { Card, Button, Avatar, Network, MerchantStatus, TierPill } = window;

  const STATUS_FILTERS = ["All", "Active", "Pending KYB", "Suspended"];
  const TIER_FILTERS = ["All", "Low", "Medium", "High"];

  function Merchants({ onOpenMerchant }) {
    const [status, setStatus] = React.useState("All");
    const [tier, setTier] = React.useState("All");

    const rows = D.merchants.filter((m) =>
      (status === "All" || m.status === status) &&
      (tier === "All" || m.tier === tier)
    );

    return (
      <div className="sf-content">
        <div className="sf-page-head">
          <div>
            <h1>Merchants</h1>
            <p>Every business on the platform. Each merchant runs its own portal — this is the directory across all of them.</p>
          </div>
          <div className="sf-row-actions">
            <Button variant="secondary" icon="download">Export</Button>
            <Button variant="primary" icon="plus">Invite merchant</Button>
          </div>
        </div>

        <div className="sf-toolbar">
          <div className="op-filter-group">
            <span className="op-filter-label">Status</span>
            <div className="sf-segment">
              {STATUS_FILTERS.map((s) => (
                <button key={s} className={`sf-seg${status === s ? " on" : ""}`} onClick={() => setStatus(s)}>{s}</button>
              ))}
            </div>
          </div>
          <div className="op-filter-group">
            <span className="op-filter-label">Risk tier</span>
            <div className="sf-segment">
              {TIER_FILTERS.map((t) => (
                <button key={t} className={`sf-seg${tier === t ? " on" : ""}`} onClick={() => setTier(t)}>{t}</button>
              ))}
            </div>
          </div>
          <div style={{ marginLeft: "auto", fontSize: 13, color: "var(--ink-3)", fontWeight: 500 }}>
            {rows.length} of {D.merchants.length} merchants
          </div>
        </div>

        <Card pad={false}>
          <div className="sf-table-wrap">
            <table className="sf-table">
              <thead>
                <tr>
                  <th>Merchant</th><th>Status</th><th>Risk tier</th><th>Volume (30d)</th>
                  <th>Screened</th><th>% clean</th><th>Settlement wallet</th><th>Joined</th><th></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((m) => (
                  <tr key={m.id} onClick={() => onOpenMerchant(m)}>
                    <td>
                      <div className="op-mcell">
                        <Avatar name={m.name} size={32} />
                        <div className="op-mcell-txt"><b>{m.name}</b><span>{m.id} · {m.country}</span></div>
                      </div>
                    </td>
                    <td><MerchantStatus status={m.status} /></td>
                    <td><TierPill tier={m.tier} /></td>
                    <td className="sf-usdt tnum">{m.volume30d ? "$" + D.fmtCompact(m.volume30d) : <span className="sf-muted">—</span>}</td>
                    <td className="tnum">{m.screened ? m.screened.toLocaleString() : <span className="sf-muted">—</span>}</td>
                    <td className="tnum">{m.pctClean != null ? (
                      <span style={{ fontWeight: 600, color: m.pctClean >= 98 ? "var(--green-700)" : m.pctClean >= 90 ? "var(--ink)" : "var(--red)" }}>{m.pctClean}%</span>
                    ) : <span className="sf-muted">—</span>}</td>
                    <td><div className="op-wallet-cell"><Network name={m.network} /><span className="sf-mono">{D.shortAddr(m.wallet)}</span></div></td>
                    <td className="sf-muted tnum">{m.joined}</td>
                    <td style={{ textAlign: "right", color: "var(--ink-4)" }}><I.chevronRight size={16} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    );
  }

  window.Merchants = Merchants;
})();
