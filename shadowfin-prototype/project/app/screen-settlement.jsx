/* ShadowFin — Settlement (replaces Withdraw). ShadowFin holds no balance:
   each clean payment is forwarded on-chain to the merchant's own wallet. */
(function () {
  const I = window.SF_ICONS;
  const D = window.SF_DATA;
  const { Card, Button, Badge, Toggle, Network, USDT, Select } = window;

  function WalletCard({ w }) {
    return (
      <div className={`sf-wallet${w.primary ? " prim" : ""}`}>
        <span className="sf-wallet-ico"><I.wallet size={20} /></span>
        <div className="sf-wallet-main">
          <div className="sf-wallet-label">
            {w.label}
            {w.primary
              ? <Badge tone="mint" dot={false}>Primary</Badge>
              : <Badge tone="slate" dot={false}>Backup</Badge>}
          </div>
          <div className="sf-wallet-addr">{w.address}</div>
        </div>
        <div style={{ flex: "none", textAlign: "right" }}>
          <Network name={w.network} />
          <div className="sf-muted" style={{ fontSize: 12, marginTop: 6 }}>{w.network} clears here</div>
        </div>
        <button className="sf-iconbtn" style={{ width: 36, height: 36, flex: "none" }} title="Copy address"><I.copy size={16} /></button>
      </div>
    );
  }

  function Settlement({ onNav, toast }) {
    const [autoSettle, setAutoSettle] = React.useState(true);
    const [threshold, setThreshold] = React.useState("60");
    const s = D.settlements;
    const totalNet = s.reduce((a, r) => a + r.net, 0);

    return (
      <div className="sf-content">
        <div className="sf-page-head">
          <div><h1>Settlement</h1><p>Clean payments settle on-chain straight to your own wallets. ShadowFin never holds your funds — there's nothing to withdraw.</p></div>
          <div className="sf-row-actions">
            <Button variant="secondary" icon="download">Export CSV</Button>
            <Button variant="primary" icon="plus" onClick={() => onNav("settings")}>Add wallet</Button>
          </div>
        </div>

        {/* Auto-settle rule */}
        <div className="sf-rule" style={{ marginBottom: 20 }}>
          <span className="sf-rule-ico"><I.gate size={22} /></span>
          <div className="sf-rule-txt">
            <b>Settle on clean</b>
            <p>The instant a payment passes screening, the custodian forwards it on-chain to your payout wallet for that network. Anything scoring ≥ {threshold} / 100 is rejected and never settled.</p>
          </div>
          <div className="sf-rule-state">
            <span className={`sf-badge sf-badge-${autoSettle ? "mint" : "slate"}`}><span className="sf-badge-dot" />{autoSettle ? "On" : "Paused"}</span>
            <Toggle checked={autoSettle} onChange={(v) => { setAutoSettle(v); toast && toast(v ? "Auto-settle on — clean payments forward automatically" : "Auto-settle paused"); }} />
          </div>
        </div>

        <div className="sf-grid-3" style={{ marginBottom: 20 }}>
          <Card>
            <div className="sf-kpi-label">Settled this month</div>
            <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em", marginTop: 10 }} className="tnum">{D.kpis.settled} <small style={{ fontSize: 13, color: "var(--ink-4)", fontWeight: 600 }}>USDT</small></div>
            <div className="sf-kpi-sub">Forwarded on-chain to your wallets</div>
          </Card>
          <Card>
            <div className="sf-kpi-label">Settlements</div>
            <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em", marginTop: 10 }} className="tnum">{s.length}</div>
            <div className="sf-kpi-sub">Clean payments forwarded</div>
          </Card>
          <Card>
            <div className="sf-kpi-label">Median settle time</div>
            <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em", marginTop: 10 }} className="tnum">38<small style={{ fontSize: 13, color: "var(--ink-4)", fontWeight: 600 }}> sec</small></div>
            <div className="sf-kpi-sub">From clean decision to on-chain</div>
          </Card>
        </div>

        {/* Payout wallets */}
        <Card title="Payout wallets" sub="Where clean payments are forwarded, by network"
          action={<Button variant="secondary" size="sm" icon="plus" onClick={() => onNav("settings")}>Add wallet</Button>}
          style={{ marginBottom: 20 }}>
          <div className="sf-stack" style={{ gap: 12 }}>
            {D.wallets.map((w) => <WalletCard key={w.address} w={w} />)}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--line-2)" }}>
            <span className="sf-kpi-ico" style={{ width: 30, height: 30 }}><I.compliance size={16} /></span>
            <span className="sf-muted" style={{ fontSize: 13 }}>Wallets are custodied by <b style={{ color: "var(--ink-2)" }}>Anchorage Digital</b>, a licensed qualified custodian. ShadowFin can never move funds out of them.</span>
          </div>
        </Card>

        {/* Reject threshold */}
        <Card title="Settlement rule" sub="Applies to every network" style={{ marginBottom: 20, maxWidth: 560 }}>
          <div className="sf-field">
            <span className="sf-field-label">Reject &amp; never settle above</span>
            <Select value={threshold} onChange={(e) => setThreshold(e.target.value)}>
              <option value="40">40 / 100 — strict</option>
              <option value="60">60 / 100 — balanced</option>
              <option value="80">80 / 100 — lenient</option>
            </Select>
            <span className="sf-field-hint">Payments scoring at or above this are rejected at screening and never forwarded to your wallet.</span>
          </div>
        </Card>

        {/* Settlement history */}
        <Card title="Settlement history" sub={`${s.length} clean payments forwarded on-chain · ${D.fmtUSDT(totalNet)} USDT net`} pad={false}>
          <div className="sf-table-wrap">
            <table className="sf-table">
              <thead><tr><th>Settlement</th><th>Source payment</th><th>Net forwarded</th><th>Network</th><th>Destination</th><th>Tx hash</th><th>Date</th><th>Status</th></tr></thead>
              <tbody>
                {s.map((r) => (
                  <tr key={r.id} style={{ cursor: "default" }}>
                    <td className="sf-t-id">{r.id}</td>
                    <td className="sf-muted sf-t-id">{r.src}<div className="sf-muted" style={{ fontSize: 12, fontWeight: 400 }}>{r.customer}</div></td>
                    <td><USDT value={r.net} /></td>
                    <td><Network name={r.network} /></td>
                    <td className="sf-mono sf-muted">{r.dest.label}<div style={{ fontSize: 11 }}>{D.shortAddr(r.dest.address)}</div></td>
                    <td>
                      <span className="sf-hash-link">{r.hash.slice(0, r.network === "Ethereum" ? 8 : 6)}…{r.hash.slice(-6)}<I.external size={13} /></span>
                    </td>
                    <td className="sf-muted tnum">{r.date}</td>
                    <td><Badge tone="mint">Settled</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    );
  }

  window.Settlement = Settlement;
})();
