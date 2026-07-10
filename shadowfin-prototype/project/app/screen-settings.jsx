/* ShadowFin — Settings */
(function () {
  const { Card, Button, Badge, Field, Input, Select, Toggle, Network } = window;
  const D = window.SF_DATA;
  const I = window.SF_ICONS;

  function Settings() {
    const [autoScreen, setAutoScreen] = React.useState(true);
    const [autoReject, setAutoReject] = React.useState(true);
    const [autoSettle, setAutoSettle] = React.useState(true);

    return (
      <div className="sf-content">
        <div className="sf-page-head"><div><h1>Settings</h1><p>Business profile, screening policy and payout wallets.</p></div></div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, maxWidth: 980, alignItems: "start" }}>
          <Card title="Business profile">
            <div className="sf-stack" style={{ gap: 16 }}>
              <Field label="Business name"><Input defaultValue="Lumen Studio" /></Field>
              <Field label="Legal entity"><Input defaultValue="Lumen Studio Ltd." /></Field>
              <Field label="Default network">
                <Select defaultValue="TRON"><option>TRON</option><option>Ethereum</option></Select>
              </Field>
              <Field label="Statement currency">
                <Select defaultValue="USDT"><option>USDT</option><option>USDC</option></Select>
              </Field>
            </div>
          </Card>

          <Card title="Screening & settlement">
            <div className="sf-stack" style={{ gap: 18 }}>
              <Toggle checked={autoScreen} onChange={setAutoScreen} label="Screen every payment" sub="Run KYT before any settlement" />
              <Toggle checked={autoReject} onChange={setAutoReject} label="Auto-reject high risk" sub="Reject payments scoring ≥ 60 / 100 — never settle them" />
              <Toggle checked={autoSettle} onChange={setAutoSettle} label="Settle on clean" sub="Forward every cleared payment on-chain to your wallet" />
              <div style={{ borderTop: "1px solid var(--line-2)", paddingTop: 16 }}>
                <Field label="Reject threshold" hint="Risk score at or above which a payment is rejected and never settled">
                  <Select defaultValue="60"><option value="40">40 / 100 — strict</option><option value="60">60 / 100 — balanced</option><option value="80">80 / 100 — lenient</option></Select>
                </Field>
              </div>
            </div>
          </Card>

          <Card title="Payout wallets" sub="Where clean payments settle" pad={false} style={{ gridColumn: "1 / -1" }}>
            <div className="sf-table-wrap">
              <table className="sf-table">
                <thead><tr><th>Label</th><th>Network</th><th>Address</th><th>Status</th><th></th></tr></thead>
                <tbody>
                  {D.wallets.map((w) => (
                    <tr key={w.address} style={{ cursor: "default" }}>
                      <td style={{ fontWeight: 600 }}>{w.label}</td>
                      <td><Network name={w.network} /></td>
                      <td className="sf-mono sf-muted">{w.address.slice(0, 10)}…{w.address.slice(-6)}</td>
                      <td>{w.primary ? <Badge tone="mint" dot={false}>Primary</Badge> : <Badge tone="slate" dot={false}>Backup</Badge>}</td>
                      <td style={{ textAlign: "right" }}><Button variant="ghost" size="sm">Edit</Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ padding: "14px 16px", borderTop: "1px solid var(--line)" }}>
              <Button variant="secondary" size="sm" icon="plus">Add wallet</Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  window.Settings = Settings;
})();
