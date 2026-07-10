/* ShadowFin — Operator: Screening (KYT review across all merchants) */
(function () {
  const I = window.SF_ICONS;
  const D = window.OP_DATA;
  const { Card, Button, Badge, Avatar, Network, RiskMeter, SCREEN_TONE } = window;

  function ScreenRow({ label, value }) {
    const Ico = value === "Clear" ? I.checkCircle : value === "Review" ? I.warn : I.risk;
    return (
      <div className="sf-checkrow">
        <span className={`sf-checkrow-ico ${value === "Clear" ? "ok" : value === "Review" ? "rev" : "hit"}`}><Ico size={18} /></span>
        <span className="sf-checkrow-label">{label}</span>
        <Badge tone={SCREEN_TONE[value] || "slate"} dot={false}>{value}</Badge>
      </div>
    );
  }

  function Screening({ toast, selected, onSelect }) {
    const rows = D.flaggedPayments;
    const selId = selected || rows[0].id;
    const p = rows.find((r) => r.id === selId) || rows[0];
    const m = D.merchantByName(p.merchant);

    return (
      <div className="sf-content">
        <div className="sf-page-head">
          <div>
            <h1>Screening</h1>
            <p>Payments flagged by the KYT engine across every merchant. Review the chain analysis and decide.</p>
          </div>
          <div className="sf-row-actions">
            <Badge tone="mint" dot={false}>{D.kpis.passRate} platform pass rate</Badge>
            <Badge tone="amber" dot={false}>{rows.filter((r) => r.decision === "Under review").length} under review</Badge>
          </div>
        </div>

        <div className="sf-screen-split">
          {/* Flagged queue */}
          <Card title="Flagged payments" sub={`${rows.length} across all merchants`} pad={false}>
            <div>
              {rows.map((r) => (
                <button key={r.id} className={`sf-queue-item${selId === r.id ? " sel" : ""}`} onClick={() => onSelect(r.id)} style={{ width: "100%", textAlign: "left", border: "none", background: selId === r.id ? undefined : "transparent" }}>
                  <div className="sf-queue-top">
                    <span className="sf-queue-cp">{r.id}</span>
                    <span className={`sf-risk sf-risk-${r.risk < 25 ? "low" : r.risk < 60 ? "med" : "high"}`}>{r.risk}<em>/100</em></span>
                  </div>
                  <div className="sf-queue-meta">
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Avatar name={r.merchant} size={18} /> {r.merchant}</span>
                    <span>{r.time}</span>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Detail */}
          <div className="sf-stack">
            <Card>
              <div className="op-review-head">
                <div className="op-pay-amt">
                  <span className="lab">{p.id} · {p.reason}</span>
                  <span className="amt sf-usdt">{D.fmtUSDT(p.amount)}<small> USDT</small></span>
                  <Network name={p.network} />
                </div>
                <div className="op-review-score">
                  <span className="lab">Risk</span>
                  <span className={`num sf-risk-${p.risk < 25 ? "low" : p.risk < 60 ? "med" : "high"}`}>{p.risk}<small>/100</small></span>
                </div>
              </div>
            </Card>

            <div className="sf-grid-2">
              <Card title="Merchant">
                <button className="op-merchant-link" style={{ marginBottom: 12 }} onClick={() => onSelect(p.id)}>
                  <Avatar name={p.merchant} size={36} />
                  <div className="op-mcell-txt" style={{ textAlign: "left" }}><b>{p.merchant}</b><span>{m ? m.id + " · " + m.country : ""}</span></div>
                </button>
                <div className="sf-defrow"><span className="k">Risk tier</span><span className="v">{m ? m.tier || "—" : "—"}</span></div>
                <div className="sf-defrow"><span className="k">Status</span><span className="v">{m ? m.status : "—"}</span></div>
                <div className="sf-defrow"><span className="k">Exposure</span><span className="v">{p.exposure}</span></div>
                <div className="sf-defrow"><span className="k">Hops to source</span><span className="v">{p.hops}</span></div>
              </Card>

              <Card title="KYT screen">
                <ScreenRow label="Sanctions & watchlists" value={p.sanctions} />
                <ScreenRow label="PEP" value={p.pep} />
                <ScreenRow label="Adverse media" value={p.adverseMedia} />
              </Card>
            </div>

            <Card title="Analyst summary">
              <div className={`op-screen-note ${p.sanctions === "Hit" || p.adverseMedia === "Hit" ? "hit" : "rev"}`}>
                <div className="op-screen-note-head">
                  {p.sanctions === "Hit" || p.adverseMedia === "Hit" ? <I.risk size={16} /> : <I.warn size={16} />}
                  {p.reason}
                </div>
                <p>{p.note}</p>
              </div>
            </Card>

            <Card>
              <div className="op-review-actions">
                <div className="op-review-actions-txt">
                  <b>Current decision: {p.decision}</b>
                  <span>Clearing settles the payment on-chain; rejecting blocks it. Either writes an audit record.</span>
                </div>
                <div className="op-review-actions-btns">
                  <Button variant="destructive" icon="x" onClick={() => toast(`${p.id} rejected · audit record written`)}>Reject</Button>
                  <Button variant="primary" icon="check" onClick={() => toast(`${p.id} cleared & settled · audit record written`)}>Clear & settle</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  window.Screening = Screening;
})();
