/* ShadowFin — Operator: Business overview (home) */
(function () {
  const I = window.SF_ICONS;
  const D = window.OP_DATA;
  const { Card, Button, Badge, Avatar, AreaChart, MerchantStatus, TierPill, MerchantCell } = window;

  function Kpi({ label, value, unit, icon, sub, variant }) {
    const Ico = I[icon];
    return (
      <div className={`sf-kpi ${variant || ""}`}>
        <div className="sf-kpi-top">
          <span className="sf-kpi-label">{label}</span>
          <span className="sf-kpi-ico"><Ico size={18} /></span>
        </div>
        <div className="sf-kpi-val tnum">{value}{unit && <small> {unit}</small>}</div>
        {sub && <div className="sf-kpi-sub">{sub}</div>}
      </div>
    );
  }

  // Disabled / not-yet-priced revenue tile
  function RevenueKpi() {
    return (
      <div className="sf-kpi op-kpi-disabled" aria-disabled="true">
        <div className="sf-kpi-top">
          <span className="sf-kpi-label">Monthly revenue</span>
          <span className="sf-kpi-ico"><I.gate size={18} /></span>
        </div>
        <div className="sf-kpi-val tnum op-kpi-na">—</div>
        <div className="op-kpi-pending"><I.clock size={13} /> Pending fee model — not yet priced</div>
      </div>
    );
  }

  function Overview({ onNav, onOpenMerchant, onOpenFlagged }) {
    const k = D.kpis;
    const pending = D.merchants.filter((m) => m.status === "Pending KYB");
    const flagged = D.flaggedPayments;
    const trendMax = Math.max(...D.volumeTrend);

    return (
      <div className="sf-content">
        <div className="sf-page-head">
          <div>
            <h1>Business overview</h1>
            <p>Platform-wide health across every merchant on ShadowFin — throughput, compliance, and the approvals queue.</p>
          </div>
          <div className="sf-row-actions">
            <Button variant="secondary" icon="download">Export report</Button>
            <Button variant="primary" icon="compliance" onClick={() => onNav("approvals")}>Review approvals</Button>
          </div>
        </div>

        {/* KPI tiles — platform metrics + disabled revenue placeholder */}
        <div className="op-kpis-6">
          <Kpi label="Active merchants" value={k.activeMerchants} icon="treasury" sub={`${k.suspended} suspended · ${D.merchants.length} total`} variant="dark" />
          <Kpi label="Pending approval" value={k.pendingApproval} icon="compliance" sub="Awaiting KYB review" variant="accent" />
          <Kpi label="Volume processed this month" value={"$" + k.volume} icon="arrowDown" sub="Across all merchants · +21% vs. May" />
          <Kpi label="Screening pass rate" value={k.passRate} icon="checkCircle" sub={`${k.screened.toLocaleString()} payments screened`} />
          <Kpi label="Flagged this month" value={k.flaggedThisMonth} icon="flag" sub="Across all merchants" variant="danger" />
          <RevenueKpi />
        </div>

        {/* Trend + awaiting approval */}
        <div className="op-grid-trend" style={{ margin: "20px 0" }}>
          <Card title="Volume processed over time" sub="USDT settled across all merchants · last 14 days"
            action={<div className="op-chart-legend"><span className="dot" /> Daily volume</div>}>
            <div className="op-chart-figure">
              <div className="op-chart-peak">
                <span className="op-chart-peak-val">${(trendMax / 1000).toFixed(2)}M</span>
                <span className="op-chart-peak-lab">peak day · Jun 26</span>
              </div>
              <AreaChart data={D.volumeTrend} height={232} labels={["Jun 13", "Jun 20", "Jun 27"]} ymin={0} />
            </div>
          </Card>

          <Card title="Awaiting approval" sub={`${pending.length} merchants in the KYB queue`}
            action={<Button variant="ghost" size="sm" iconRight="chevronRight" onClick={() => onNav("approvals")}>Open queue</Button>} pad={false}>
            <div className="op-await-list">
              {pending.map((m) => {
                const kyb = D.kybByMerchant(m.id);
                return (
                  <button key={m.id} className="op-await-row" onClick={() => onNav("approvals")}>
                    <Avatar name={m.name} size={34} />
                    <div className="op-await-main">
                      <b>{m.name}</b>
                      <span>{m.country} · {m.mcc.split(" · ")[1] || m.mcc}</span>
                    </div>
                    <div className="op-await-meta">
                      <Badge tone={kyb && kyb.priority === "Enhanced DD" ? "red" : kyb && kyb.priority === "Fast-track" ? "mint" : "slate"} dot={false}>
                        {kyb ? kyb.priority : "Standard"}
                      </Badge>
                      <span className="op-await-wait">{kyb ? kyb.waiting : "—"} waiting</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Recent flagged payments — across all merchants */}
        <Card title="Recent flagged payments" sub="Spanning every merchant on the platform"
          action={<Button variant="ghost" size="sm" iconRight="chevronRight" onClick={() => onNav("screening")}>Open screening</Button>} pad={false}>
          <div className="sf-table-wrap">
            <table className="sf-table">
              <thead>
                <tr>
                  <th>Payment</th><th>Merchant</th><th>Amount</th><th>Reason</th><th>Risk</th><th>Decision</th><th>When</th>
                </tr>
              </thead>
              <tbody>
                {flagged.map((p) => (
                  <tr key={p.id} onClick={() => onOpenFlagged(p)}>
                    <td className="sf-t-id">{p.id}</td>
                    <td>
                      <button className="op-merchant-link" onClick={(e) => { e.stopPropagation(); onOpenMerchant(D.merchantByName(p.merchant)); }}>
                        <Avatar name={p.merchant} size={26} /><b>{p.merchant}</b>
                      </button>
                    </td>
                    <td className="sf-usdt tnum">{D.fmtUSDT(p.amount)}<small> USDT</small></td>
                    <td className="sf-muted">{p.reason}</td>
                    <td><span className={`sf-risk sf-risk-${p.risk < 25 ? "low" : p.risk < 60 ? "med" : "high"}`}>{p.risk}<em>/100</em></span></td>
                    <td>
                      <Badge tone={p.decision === "Rejected" ? "red" : p.decision === "Cleared" ? "mint" : "amber"} dot={false}>{p.decision}</Badge>
                    </td>
                    <td className="sf-muted tnum">{p.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    );
  }

  window.Overview = Overview;
})();
