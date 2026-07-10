/* ShadowFin — Operator: Settlements (platform-wide) */
(function () {
  const I = window.SF_ICONS;
  const D = window.OP_DATA;
  const { Card, Button, Badge, Avatar, Network } = window;

  function Settlements({ onNav }) {
    const rows = D.settlements;
    const total = rows.filter((r) => r.status === "Settled").reduce((s, r) => s + r.amount, 0);
    const held = rows.filter((r) => r.status === "Held").reduce((s, r) => s + r.amount, 0);

    return (
      <div className="sf-content">
        <div className="sf-page-head">
          <div>
            <h1>Settlements</h1>
            <p>Clean payments forwarded on-chain to each merchant's own wallet. ShadowFin never holds the funds.</p>
          </div>
          <div className="sf-row-actions">
            <Button variant="secondary" icon="download">Export</Button>
          </div>
        </div>

        <div className="sf-rule" style={{ marginBottom: 20 }}>
          <span className="sf-rule-ico"><I.gate size={22} /></span>
          <div className="sf-rule-txt">
            <b>Non-custodial settlement</b>
            <p>Every settlement below was forwarded by a licensed custodian directly to the merchant's wallet — there is no platform balance.</p>
          </div>
          <div className="sf-rule-state"><Badge tone="mint" dot={false}>Custodian: Anchorage Digital</Badge></div>
        </div>

        <div className="op-settle-stats">
          <div className="op-dk"><span className="lab">Settled (recent)</span><span className="val">${D.fmtCompact(total)}</span></div>
          <div className="op-dk"><span className="lab">Held for review</span><span className="val">${D.fmtUSDT(held)}</span></div>
          <div className="op-dk"><span className="lab">Settlements</span><span className="val">{rows.length}</span></div>
          <div className="op-dk"><span className="lab">Networks</span><span className="val">TRON · ETH</span></div>
        </div>

        <Card pad={false} style={{ marginTop: 20 }}>
          <div className="sf-table-wrap">
            <table className="sf-table">
              <thead>
                <tr><th>Settlement</th><th>Merchant</th><th>Amount</th><th>Fee</th><th>Network</th><th>Destination wallet</th><th>Tx hash</th><th>Date</th><th>Status</th></tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} onClick={() => onNav("merchants")}>
                    <td className="sf-t-id">{r.id}</td>
                    <td><div className="op-mcell"><Avatar name={r.merchant} size={28} /><b>{r.merchant}</b></div></td>
                    <td className="sf-usdt tnum">{D.fmtUSDT(r.amount)}<small> USDT</small></td>
                    <td className="sf-muted tnum">{r.fee.toFixed(2)}</td>
                    <td><Network name={r.network} /></td>
                    <td className="sf-mono">{D.shortAddr(r.wallet)}</td>
                    <td>
                      <span className="sf-hash-link"><I.external size={13} /> {r.hash.slice(0, 10)}…</span>
                    </td>
                    <td className="sf-muted tnum">{r.date}</td>
                    <td><Badge tone={r.status === "Settled" ? "mint" : "amber"} dot={false}>{r.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    );
  }

  window.Settlements = Settlements;
})();
