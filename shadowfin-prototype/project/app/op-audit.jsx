/* ShadowFin — Operator: Audit log (immutable, read-only compliance record) */
(function () {
  const I = window.SF_ICONS;
  const D = window.OP_DATA;
  const { Card, Button, Badge, Avatar } = window;

  const KIND_TONE = { ok: "mint", risk: "red", warn: "amber", info: "slate" };
  const CATS = ["All", "KYB", "Screening", "Lifecycle"];
  const CAT_LABEL = { KYB: "KYB decision", Screening: "Screening", Lifecycle: "Lifecycle" };

  function Audit({ onNav, onOpenMerchant }) {
    const [cat, setCat] = React.useState("All");
    const [actor, setActor] = React.useState("All");
    const [q, setQ] = React.useState("");

    const actors = ["All", ...Array.from(new Set(D.auditLog.map((r) => r.actor)))];
    const rows = D.auditLog.filter((r) => {
      if (cat !== "All" && r.category !== cat) return false;
      if (actor !== "All" && r.actor !== actor) return false;
      if (q) {
        const hay = `${r.action} ${r.target} ${r.targetId} ${r.reason} ${r.detail} ${r.actor}`.toLowerCase();
        if (!hay.includes(q.toLowerCase())) return false;
      }
      return true;
    });

    const meta = D.auditMeta;
    const openMerchant = (r) => {
      const m = D.merchantById(r.targetId);
      if (m && onOpenMerchant) onOpenMerchant(m);
    };

    return (
      <div className="sf-content">
        <div className="sf-page-head">
          <div>
            <h1>Audit log</h1>
            <p>Immutable, chronological record of every compliance decision across all merchants — who did what, to which merchant, why, and when.</p>
          </div>
          <div className="sf-row-actions">
            <Button variant="secondary" icon="filter">Filter range</Button>
            <Button variant="secondary" icon="download">Export CSV</Button>
          </div>
        </div>

        {/* Retention / integrity banner */}
        <div className="op-retention">
          <div className="op-retention-item">
            <span className="op-retention-ico"><I.compliance size={18} /></span>
            <div><b>Read-only &amp; immutable</b><span>Records cannot be edited or deleted</span></div>
          </div>
          <div className="op-retention-item">
            <span className="op-retention-ico"><I.clock size={18} /></span>
            <div><b>{meta.retention} retention</b><span>{meta.standard}</span></div>
          </div>
          <div className="op-retention-item">
            <span className="op-retention-ico"><I.book size={18} /></span>
            <div><b>{meta.totalRecords} records</b><span>since {meta.oldest}</span></div>
          </div>
          <div className="op-retention-item">
            <span className="op-retention-ico"><I.download size={18} /></span>
            <div><b>Export-ready</b><span>CSV · JSON · regulator package</span></div>
          </div>
        </div>

        {/* Filters */}
        <div className="sf-toolbar">
          <div className="op-filter-group">
            <span className="op-filter-label">Event</span>
            <div className="sf-segment">
              {CATS.map((c) => (
                <button key={c} className={`sf-seg${cat === c ? " on" : ""}`} onClick={() => setCat(c)}>{c}</button>
              ))}
            </div>
          </div>
          <div className="op-filter-group">
            <span className="op-filter-label">Actor</span>
            <window.Select value={actor} onChange={(e) => setActor(e.target.value)}>
              {actors.map((a) => <option key={a} value={a}>{a}</option>)}
            </window.Select>
          </div>
          <div className="grow" style={{ minWidth: 200 }}>
            <window.Input icon="search" placeholder="Search reason, merchant, payment ID…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <div style={{ fontSize: 13, color: "var(--ink-3)", fontWeight: 500, whiteSpace: "nowrap" }}>{rows.length} of {D.auditLog.length}</div>
        </div>

        <Card pad={false}>
          <div className="op-audit-list">
            {rows.map((r) => {
              const Ico = r.kind === "ok" ? I.checkCircle : r.kind === "risk" ? I.risk : r.kind === "warn" ? I.warn : I.info;
              const live = !!D.merchantById(r.targetId);
              return (
                <div key={r.id} className="op-audit-row">
                  <span className={`op-audit-ico ${r.kind}`}><Ico size={18} /></span>
                  <div className="op-audit-main">
                    <div className="op-audit-line1">
                      <span className="op-audit-cat">{CAT_LABEL[r.category]}</span>
                      <b>{r.action}</b>
                      <span className="op-audit-arrow">→</span>
                      {live ? (
                        <button className="op-merchant-link op-audit-target" onClick={() => openMerchant(r)}>{r.target}</button>
                      ) : (
                        <span className="op-audit-target op-audit-target-dead" title="Application declined — never became a live merchant">{r.target}</span>
                      )}
                      <span className="op-audit-tid sf-mono">{r.targetId}</span>
                    </div>
                    <p className="op-audit-reason"><span className="op-audit-reason-lab">Reason</span> {r.reason}</p>
                    <p className="op-audit-detail">{r.detail}</p>
                    <div className="op-audit-meta">
                      <span className="op-audit-actor"><Avatar name={r.actor === "System" ? "S Y" : r.actor} size={18} /> {r.actor} · {r.role}</span>
                      <span className="op-audit-id sf-mono">{r.id}</span>
                    </div>
                  </div>
                  <div className="op-audit-time tnum">
                    <span className="op-audit-date">{r.t}</span>
                    <span className="op-audit-clock">{r.clock}</span>
                  </div>
                </div>
              );
            })}
            {rows.length === 0 && (
              <div style={{ padding: "44px 20px", textAlign: "center", color: "var(--ink-3)", fontSize: 14 }}>No records match these filters.</div>
            )}
          </div>
        </Card>

        <p className="op-audit-foot">
          <I.compliance size={14} /> Entries are append-only and cryptographically chained. Retained for {meta.retention} per {meta.standard}. Showing the {D.auditLog.length} most recent of {meta.totalRecords} records.
        </p>
      </div>
    );
  }

  window.Audit = Audit;
})();
