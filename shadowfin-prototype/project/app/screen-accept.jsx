/* ShadowFin — Accept a payment (create invoice / checkout link) */
(function () {
  const I = window.SF_ICONS;
  const D = window.SF_DATA;
  const { Card, Button, Badge, Field, Input, Textarea, Select, Network, USDT, Alert } = window;

  function AddressRow({ label, value, mono = true }) {
    return (
      <div>
        <div className="sf-field-label" style={{ marginBottom: 7 }}>{label}</div>
        <div className="sf-address">
          <span className="addr" style={mono ? null : { fontFamily: "inherit" }}>{value}</span>
          <button className="sf-iconbtn" style={{ width: 34, height: 34 }} title="Copy"><I.copy size={16} /></button>
        </div>
      </div>
    );
  }

  // Simple deterministic QR-ish placeholder (not a real QR)
  function QrGlyph({ size = 150 }) {
    const cells = [];
    for (let r = 0; r < 11; r++) for (let c = 0; c < 11; c++) {
      const on = (r * 7 + c * 3 + ((r * c) % 5)) % 2 === 0 || (r < 3 && c < 3) || (r < 3 && c > 7) || (r > 7 && c < 3);
      if (on) cells.push(<rect key={`${r}-${c}`} x={c * 13 + 2} y={r * 13 + 2} width="12" height="12" rx="2" fill="#111318" />);
    }
    return (
      <svg width={size} height={size} viewBox="0 0 145 145" style={{ borderRadius: 12, background: "#fff", border: "1px solid var(--line)" }}>
        {cells}
      </svg>
    );
  }

  function Accept({ onNav }) {
    const [form, setForm] = React.useState({ amount: "", network: "TRON", customer: "", ref: "", expiry: "24h", note: "" });
    const [done, setDone] = React.useState(false);
    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target ? e.target.value : e }));
    const addr = form.network === "TRON" ? "TJ9kq2c1Vb8nXp4mQ1aLZ7wR3dFs6Hy2eK" : "0x8fA3c1b9E2d74F0a5C6b3E18d9aF27c40B1e";
    const link = `https://pay.shadowfin.io/c/${(form.ref || "30483").toLowerCase()}-aK7f`;
    const valid = form.amount && Number(form.amount) > 0;

    if (done) {
      return (
        <div className="sf-content">
          <button className="sf-btn sf-btn-ghost sf-btn-sm" style={{ marginBottom: 14, paddingLeft: 0 }} onClick={() => setDone(false)}>
            <I.chevronLeft size={16} /> Back
          </button>
          <div className="sf-page-head"><div><h1>Payment request ready</h1><p>Share the checkout link or address. We detect the deposit and screen it automatically.</p></div></div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 18, alignItems: "start", maxWidth: 940 }}>
            <Card>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <Badge>Awaiting</Badge>
                <span className="sf-muted" style={{ fontSize: 13 }}>Expires in {form.expiry}</span>
              </div>

              <Alert kind="success" title="Screening is on">
                The payment to this address is screened for sanctions, PEP and adverse-media exposure before it settles to your wallet.
              </Alert>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, margin: "20px 0" }}>
                <div><div className="sf-muted" style={{ fontSize: 12 }}>Amount due</div><div style={{ marginTop: 4 }}><USDT value={Number(form.amount)} size="lg" /></div></div>
                <div><div className="sf-muted" style={{ fontSize: 12 }}>Network</div><div style={{ marginTop: 6 }}><Network name={form.network} /></div></div>
              </div>

              <div className="sf-stack" style={{ gap: 16 }}>
                <AddressRow label="Shareable checkout link" value={link} mono={false} />
                <AddressRow label="Deposit address" value={addr} />
              </div>

              <div style={{ display: "flex", gap: 14, alignItems: "center", marginTop: 18, padding: "14px 16px", background: "var(--mist)", borderRadius: 12 }}>
                <div className="sf-pulse" style={{ width: 44, height: 44, margin: 0 }}><I.clock size={20} /></div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>Waiting for payment…</div>
                  <div className="sf-muted" style={{ fontSize: 13 }}>We’ll detect the deposit on-chain, screen it, and settle it straight to your wallet.</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                <Button variant="primary" full icon="share">Share checkout link</Button>
                <Button variant="secondary" onClick={() => onNav("transactions")}>View in transactions</Button>
              </div>
            </Card>

            <Card title="Scan to pay">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                <QrGlyph size={170} />
                <div className="sf-muted" style={{ fontSize: 12.5, textAlign: "center", lineHeight: 1.5 }}>
                  Customer scans with any USDT wallet on {form.network}. Address is single-use.
                </div>
                <Button variant="secondary" size="sm" icon="download" full>Download QR</Button>
              </div>
            </Card>
          </div>
        </div>
      );
    }

    return (
      <div className="sf-content">
        <div className="sf-page-head"><div><h1>Accept payment</h1><p>Create a screened USDT payment request with a unique address and checkout link.</p></div></div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 18, alignItems: "start", maxWidth: 940 }}>
          <Card>
            <div className="sf-stack" style={{ gap: 18 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 170px", gap: 14 }}>
                <Field label="Amount (USDT)">
                  <Input type="number" placeholder="0.00" value={form.amount} onChange={set("amount")} />
                </Field>
                <Field label="Network">
                  <Select value={form.network} onChange={set("network")}>
                    <option>TRON</option><option>Ethereum</option>
                  </Select>
                </Field>
              </div>
              <Field label="Customer" hint="Shown on the checkout page and audit trail">
                <Input icon="user" placeholder="e.g. Lumen Apparel Co." value={form.customer} onChange={set("customer")} />
              </Field>
              <Field label="Reference" hint="Optional — your order or invoice number">
                <Input placeholder="e.g. ORD-7742" value={form.ref} onChange={set("ref")} />
              </Field>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <Field label="Link expires">
                  <Select value={form.expiry} onChange={set("expiry")}>
                    <option value="1h">1 hour</option><option value="24h">24 hours</option><option value="72h">72 hours</option><option value="7d">7 days</option>
                  </Select>
                </Field>
                <Field label="Type">
                  <Select defaultValue="One-time"><option>One-time</option><option>Reusable link</option></Select>
                </Field>
              </div>
              <Field label="Note to customer" hint="Optional">
                <Textarea placeholder="Thanks for your order — pay in USDT to confirm." value={form.note} onChange={set("note")} />
              </Field>
            </div>
          </Card>

          <div className="sf-stack">
            <Card title="Summary">
              <div className="sf-defrow"><span className="k">Amount</span><span className="v">{form.amount ? D.fmtUSDT(Number(form.amount)) + " USDT" : "—"}</span></div>
              <div className="sf-defrow"><span className="k">Network</span><span className="v">{form.network}</span></div>
              <div className="sf-defrow"><span className="k">Customer</span><span className="v">{form.customer || "—"}</span></div>
              <div className="sf-defrow"><span className="k">Screening</span><span className="v">Automatic</span></div>
              <Button variant="primary" full disabled={!valid} onClick={() => setDone(true)} style={{ marginTop: 16 }} icon="qr">Generate checkout</Button>
              <p className="sf-muted" style={{ fontSize: 12, textAlign: "center", marginTop: 10, lineHeight: 1.5 }}>Clean payments settle straight to your wallet — ShadowFin never holds the funds.</p>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  window.Accept = Accept;
})();
