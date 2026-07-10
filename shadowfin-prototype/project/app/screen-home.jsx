/* ShadowFin — Merchant home (throughput + compliance, no held balance) */
(function () {
  const I = window.SF_ICONS;
  const D = window.SF_DATA;
  const { Card, Button, Badge, StatePill, Avatar, USDT, Network, Alert } = window;

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

  function Home({ onNav, onOpenPayment }) {
    const k = D.kpis;
    const rows = D.payments.slice(0, 7);
    return (
      <div className="sf-content">
        <div className="sf-page-head">
          <div>
            <h1>Home</h1>
            <p>Accept USDT from your customers. We screen every payment and settle the clean ones straight to your wallet.</p>
          </div>
          <div className="sf-row-actions">
            <Button variant="secondary" icon="swap" onClick={() => onNav("settlement")}>Settlement</Button>
            <Button variant="primary" icon="plus" onClick={() => onNav("accept")}>Accept payment</Button>
          </div>
        </div>

        {/* No-custody framing — there is no balance to hold */}
        <div className="sf-custody" style={{ marginBottom: 20 }}>
          <span className="sf-custody-ico"><I.gate size={20} /></span>
          <div>
            <b>ShadowFin never holds your funds</b>
            <p>Every clean payment is forwarded on-chain to your own wallet by a licensed custodian. There's no balance and nothing to withdraw.</p>
          </div>
          <span className="sf-custody-tag"><Badge tone="mint" dot={false}>Non-custodial</Badge></span>
        </div>

        {/* KPI tiles — volume, screened, % clean, settled to wallet, held for review */}
        <div className="sf-kpis five">
          <Kpi label="Volume this month" value={k.volume} unit="USDT" icon="arrowDown" sub="+18% vs. May" variant="dark" />
          <Kpi label="Payments screened" value={k.screened} icon="screening" sub="Sanctions · PEP · adverse media" variant="accent" />
          <Kpi label="Clean rate" value={k.pctClean} icon="checkCircle" sub="Passed screening this month" />
          <Kpi label="Auto-settled to your wallet" value={k.settled} unit="USDT" icon="swap" sub="Forwarded on-chain" />
          <Kpi label="Held for review" value={k.held.count} icon="flag" sub={`${k.held.amount} USDT · flagged / pending`} variant="danger" />
        </div>

        <div style={{ margin: "20px 0" }}>
          <Alert kind="risk" title="1 payment rejected">
            PMT-30478 from Vantage Reseller hit a sanctioned wallet cluster (risk 82/100) and was rejected before settlement. The funds never reached your wallet and were never held by ShadowFin — no action needed.
          </Alert>
        </div>

        {/* Recent activity */}
        <Card title="Recent activity" sub="Latest incoming payments"
          action={<Button variant="ghost" size="sm" iconRight="chevronRight" onClick={() => onNav("transactions")}>View all</Button>} pad={false}>
          <div className="sf-table-wrap">
            <table className="sf-table">
              <thead><tr><th>Payment</th><th>Customer</th><th>Amount</th><th>Network</th><th>Status</th><th>Risk</th><th>When</th></tr></thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} onClick={() => onOpenPayment(r)}>
                    <td className="sf-t-id">{r.id}</td>
                    <td><div className="sf-t-cp"><Avatar name={r.customer} size={28} /><b>{r.customer}</b></div></td>
                    <td><USDT value={r.amount} /></td>
                    <td><Network name={r.network} /></td>
                    <td><Badge>{r.status === "Settled" ? "Settled" : r.status}</Badge></td>
                    <td><StatePill state={D.riskState(r.status)} /></td>
                    <td className="sf-muted tnum">{r.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    );
  }

  window.Home = Home;
})();
