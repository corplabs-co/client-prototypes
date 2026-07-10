/* ShadowFin — Transactions list + payment detail drawer */
(function () {
  const I = window.SF_ICONS;
  const D = window.SF_DATA;
  const { Card, Button, Badge, StatePill, RiskMeter, CheckRow, Avatar, USDT, Network, Alert } = window;

  const FLOW = ["Awaiting", "Detected", "Screening", "Settled"];

  function MiniFlow({ status }) {
    const rejected = status === "Rejected";
    const idx = { Awaiting: 0, Detected: 1, Screening: 2, Settled: 3, Rejected: 2 }[status] ?? 0;
    return (
      <div className="sf-stepper">
        {FLOW.map((s, i) => {
          let cls = "";
          if (rejected && i === 2) cls = "err";
          else if (i < idx) cls = "done";
          else if (i === idx) cls = status === "Settled" ? "done" : "active";
          const done = cls === "done";
          return (
            <div key={s} className={`sf-step ${cls}`}>
              {i < FLOW.length - 1 && <div className="sf-step-line" />}
              <div className="sf-step-dot">
                {done ? <I.check size={15} /> : cls === "err" ? <I.x size={14} /> : i + 1}
              </div>
              <span className="sf-step-label">{cls === "err" && i === 2 ? "Rejected" : s === "Settled" ? "Settled" : s}</span>
            </div>
          );
        })}
      </div>
    );
  }

  /* ---------------- Detail drawer ---------------- */
  function Drawer({ payment, onClose }) {
    const p = payment;
    const rejected = p.status === "Rejected";
    const state = D.riskState(p.status);
    const addr = p.network === "TRON" ? "TJ9kq2c1Vb8nXp4mQ1aLZ7wR3dFs6Hy2eK" : "0x8fA3c1b9E2d74F0a5C6b3E18d9aF27c40B1e";
    const ledger = D.auditFor(p);
    const settle = D.settleFor(p);
    const decision = rejected ? "Rejected — not settled" : p.status === "Settled" ? "Settled to your wallet" : "Pending decision";
    const auditId = "AUD-" + p.id.replace("PMT-", "");

    return (
      <>
        <div className="sf-drawer-bg" onClick={onClose} />
        <aside className="sf-drawer" role="dialog" aria-label="Payment detail">
          <div className="sf-drawer-head">
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <Avatar name={p.customer} size={40} />
              <div>
                <h2>{p.id} <Badge>{p.status}</Badge></h2>
                <p>{p.customer} · {p.ref}</p>
              </div>
            </div>
            <button className="sf-iconbtn" onClick={onClose} title="Close"><I.x size={18} /></button>
          </div>

          <div className="sf-drawer-body">
            <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 14, padding: "16px 18px" }}>
              <MiniFlow status={p.status} />
            </div>

            {rejected && (
              <Alert kind="risk" title="Payment rejected — never settled">
                This payment hit a sanctioned wallet cluster (risk {p.risk}/100). It was rejected before settlement — the funds never reached your wallet and were never held by ShadowFin.
              </Alert>
            )}

            <Card title="Payment">
              <div className="sf-defrow"><span className="k">Amount</span><span className="v"><USDT value={p.amount} /></span></div>
              <div className="sf-defrow"><span className="k">Network</span><span className="v"><Network name={p.network} /></span></div>
              <div className="sf-defrow"><span className="k">Customer</span><span className="v">{p.customer}</span></div>
              <div className="sf-defrow"><span className="k">Reference</span><span className="v">{p.ref}</span></div>
              <div className="sf-defrow"><span className="k">Received</span><span className="v">{p.created}</span></div>
              <div style={{ marginTop: 14 }}>
                <div className="sf-field-label" style={{ marginBottom: 7 }}>Deposit address</div>
                <div className="sf-address">
                  <span className="addr">{addr}</span>
                  <button className="sf-iconbtn" style={{ width: 34, height: 34 }} title="Copy"><I.copy size={16} /></button>
                </div>
              </div>
            </Card>

            <Card title="Screening result" sub="KYT · automated"
              action={<StatePill state={state} />}>
              <RiskMeter value={p.risk == null ? 0 : p.risk} />
              <div style={{ marginTop: 16 }}>
                <CheckRow label="Sanctions" value={p.sanctions === "—" ? "Review" : p.sanctions} />
                <CheckRow label="PEP" value={p.pep === "—" ? "Review" : p.pep} />
                <CheckRow label="Adverse media" value={p.adverseMedia === "—" ? "Review" : p.adverseMedia} />
              </div>
              <div style={{ display: "flex", gap: 18, marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--line-2)" }}>
                <div><div className="sf-muted" style={{ fontSize: 12 }}>Source exposure</div><div style={{ fontWeight: 700, marginTop: 2 }}>{p.exposure}</div></div>
                <div><div className="sf-muted" style={{ fontSize: 12 }}>Hops to source</div><div style={{ fontWeight: 700, marginTop: 2 }} className="tnum">{p.hops == null ? "—" : p.hops}</div></div>
                <div><div className="sf-muted" style={{ fontSize: 12 }}>Source wallet</div><div style={{ fontWeight: 600, marginTop: 2 }} className="sf-mono">{p.sourceWallet || "—"}</div></div>
              </div>
              <p className="sf-muted" style={{ fontSize: 13, marginTop: 14, lineHeight: 1.5 }}>{p.note}</p>
            </Card>

            {settle && (
              <Card title="Settled to your wallet" sub="Forwarded on-chain by the custodian"
                action={<Badge tone="mint" dot={false}>{settle.id}</Badge>}>
                <div className="sf-defrow"><span className="k">Forwarded</span><span className="v"><USDT value={settle.net} /></span></div>
                <div className="sf-defrow"><span className="k">Destination</span><span className="v">{settle.dest.label} · <span className="sf-mono">{D.shortAddr(settle.dest.address)}</span></span></div>
                <div className="sf-defrow"><span className="k">Network fee</span><span className="v">{D.fmtUSDT(settle.fee)} USDT</span></div>
                <div className="sf-defrow"><span className="k">Custodian</span><span className="v">{settle.custodian}</span></div>
                <div style={{ marginTop: 14 }}>
                  <div className="sf-field-label" style={{ marginBottom: 7 }}>Settlement tx hash</div>
                  <div className="sf-address">
                    <Network name={p.network} />
                    <span className="addr">{settle.hash}</span>
                    <button className="sf-iconbtn" style={{ width: 34, height: 34 }} title="Copy"><I.copy size={16} /></button>
                  </div>
                  <button className="sf-hash-link" style={{ background: "none", border: "none", padding: "10px 0 0", cursor: "pointer" }}><I.external size={14} /> View on {p.network === "TRON" ? "Tronscan" : "Etherscan"}</button>
                </div>
              </Card>
            )}

            <Card title="Audit trail" sub="Detected → screened → decided" pad={false}>
              <div style={{ padding: "18px 20px" }}>
                <div className="sf-ledger">
                  {ledger.map((l, i) => {
                    const Ico = l.kind === "ok" ? I.check : l.kind === "risk" ? I.warn : I.dot;
                    return (
                      <div key={i} className="sf-ledger-item">
                        <div className="sf-ledger-rail">
                          <span className={`sf-ledger-node ${l.kind}`}><Ico size={15} /></span>
                          <span className="sf-ledger-line" />
                        </div>
                        <div className="sf-ledger-body">
                          <div className="sf-ledger-event">{l.event}</div>
                          <div className="sf-ledger-detail">{l.detail}</div>
                          <div className="sf-ledger-time">{l.t}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>

            {/* Immutable compliance audit entry */}
            <div className="sf-audit">
              <div className="sf-audit-head"><I.compliance size={15} /> Compliance audit entry</div>
              <div style={{ marginTop: 10 }}>
                <div className="sf-audit-row"><span className="k">Record ID</span><span className="v mono">{auditId}</span></div>
                <div className="sf-audit-row"><span className="k">Decision</span><span className="v">{decision}</span></div>
                <div className="sf-audit-row"><span className="k">Decided by</span><span className="v">Automated KYT engine</span></div>
                <div className="sf-audit-row"><span className="k">Policy</span><span className="v">Auto-reject ≥ 60 / 100</span></div>
                <div className="sf-audit-row"><span className="k">Hash</span><span className="v mono">0x{auditId.slice(-4)}…e91c</span></div>
              </div>
            </div>
          </div>

          <div className="sf-drawer-foot">
            <Button variant="secondary" full icon="download">Download report</Button>
            <Button variant="secondary" icon="external">{settle ? "Settlement tx" : "Explorer"}</Button>
          </div>
        </aside>
      </>
    );
  }

  /* ---------------- Transactions list ---------------- */
  function Transactions({ selected, onSelect }) {
    const [q, setQ] = React.useState("");
    const [filter, setFilter] = React.useState("All");
    const tabs = ["All", "Awaiting", "Screening", "Settled", "Rejected"];
    const rows = D.payments.filter((r) => {
      const okF = filter === "All" || r.status === filter
        || (filter === "Screening" && r.status === "Detected");
      const okQ = !q || (r.customer + r.id + r.ref).toLowerCase().includes(q.toLowerCase());
      return okF && okQ;
    });
    return (
      <div className="sf-content">
        <div className="sf-page-head">
          <div><h1>Transactions</h1><p>{D.payments.length} payments · screened before any settlement</p></div>
          <div className="sf-row-actions">
            <Button variant="secondary" icon="download">Export CSV</Button>
            <Button variant="secondary" icon="refresh">Refresh</Button>
          </div>
        </div>

        <Card pad={false}>
          <div style={{ padding: "16px 16px 14px", borderBottom: "1px solid var(--line)" }}>
            <div className="sf-toolbar" style={{ margin: 0 }}>
              <div className="grow"><window.Input icon="search" placeholder="Search by customer, payment ID or reference…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
              <div className="sf-segment">
                {tabs.map((t) => (
                  <button key={t} className={`sf-seg${filter === t ? " on" : ""}`} onClick={() => setFilter(t)}>{t}</button>
                ))}
              </div>
              <Button variant="secondary" icon="filter">Filters</Button>
            </div>
          </div>
          <div className="sf-table-wrap">
            <table className="sf-table">
              <thead><tr><th>Payment</th><th>Customer</th><th>Amount</th><th>Network</th><th>Status</th><th>Risk</th><th>Created</th><th></th></tr></thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} onClick={() => onSelect(r)} style={selected && selected.id === r.id ? { background: "var(--mint)" } : null}>
                    <td className="sf-t-id">{r.id}<div className="sf-muted" style={{ fontSize: 12, fontWeight: 400 }}>{r.ref}</div></td>
                    <td><div className="sf-t-cp"><Avatar name={r.customer} size={30} /><b>{r.customer}</b></div></td>
                    <td><USDT value={r.amount} /></td>
                    <td><Network name={r.network} /></td>
                    <td><Badge>{r.status}</Badge></td>
                    <td><StatePill state={D.riskState(r.status)} /></td>
                    <td className="sf-muted tnum">{r.created}</td>
                    <td><I.chevronRight size={17} style={{ color: "var(--ink-4)" }} /></td>
                  </tr>
                ))}
                {rows.length === 0 && <tr><td colSpan="8" style={{ textAlign: "center", padding: 48, color: "var(--ink-4)" }}>No payments match your search.</td></tr>}
              </tbody>
            </table>
          </div>
        </Card>

        {selected && <Drawer payment={selected} onClose={() => onSelect(null)} />}
      </div>
    );
  }

  Object.assign(window, { Transactions });
})();
