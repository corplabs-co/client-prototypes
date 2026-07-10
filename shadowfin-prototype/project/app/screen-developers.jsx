/* ShadowFin — Developers (API keys, webhooks, Stripe-style integration snippet) */
(function () {
  const I = window.SF_ICONS;
  const { Card, Button, Badge, Toggle } = window;

  /* ---------- Copy button with transient confirmation ---------- */
  function CopyBtn({ text, dark, size = 32 }) {
    const [done, setDone] = React.useState(false);
    const copy = () => {
      try { navigator.clipboard && navigator.clipboard.writeText(text); } catch (e) {}
      setDone(true); setTimeout(() => setDone(false), 1400);
    };
    if (dark) {
      return (
        <button onClick={copy} className="sf-btn sf-btn-sm" style={{ background: done ? "rgba(73,201,138,0.16)" : "#1B1F27", color: done ? "var(--green)" : "#C9D2DE", border: "1px solid #20242C" }}>
          {done ? <I.check size={14} /> : <I.copy size={14} />}<span>{done ? "Copied" : "Copy"}</span>
        </button>
      );
    }
    return (
      <button className="sf-iconbtn" style={{ width: size, height: size, color: done ? "var(--green-700)" : "var(--ink-2)" }} title="Copy" onClick={copy}>
        {done ? <I.check size={15} /> : <I.copy size={15} />}
      </button>
    );
  }

  function KeyRow({ label, value, secret }) {
    const [shown, setShown] = React.useState(false);
    const display = secret && !shown ? value.replace(/.(?=.{4})/g, "•") : value;
    return (
      <div>
        <div className="sf-field-label" style={{ marginBottom: 7 }}>{label}</div>
        <div className="sf-keyrow">
          <span className="key">{display}</span>
          {secret && <Button variant="ghost" size="sm" onClick={() => setShown((s) => !s)}>{shown ? "Hide" : "Reveal"}</Button>}
          <CopyBtn text={value} />
        </div>
      </div>
    );
  }

  /* ---------- Integration snippet (Stripe-style, tabbed) ---------- */
  const SNIPPETS = {
    cURL: `curl https://api.shadowfin.io/v1/payments \\
  -u sk_live_9Xb2…7dRe: \\
  -d amount=12480.00 \\
  -d currency=USDT \\
  -d network=tron \\
  -d customer="Lumen Apparel Co." \\
  -d reference=ORD-7742`,
    Node: `const shadowfin = require('shadowfin')('sk_live_9Xb2…7dRe');

const payment = await shadowfin.payments.create({
  amount:    12480.00,
  currency:  'USDT',
  network:   'tron',
  customer:  'Lumen Apparel Co.',
  reference: 'ORD-7742',
});

// Redirect your customer to the screened checkout
res.redirect(payment.checkout_url);`,
    Python: `import shadowfin
shadowfin.api_key = "sk_live_9Xb2…7dRe"

payment = shadowfin.Payment.create(
    amount=12480.00,
    currency="USDT",
    network="tron",
    customer="Lumen Apparel Co.",
    reference="ORD-7742",
)

# Redirect your customer to the screened checkout
return redirect(payment.checkout_url)`,
  };

  const RESPONSE = `{
  "id": "pmt_30483",
  "object": "payment",
  "status": "awaiting",
  "amount": "12480.00",
  "currency": "USDT",
  "network": "tron",
  "deposit_address": "TJ9kq2c1Vb8nXp4mQ1aLZ7wR3dFs6Hy2eK",
  "checkout_url": "https://pay.shadowfin.io/c/ord-7742-aK7f",
  "screening": { "mode": "automatic", "status": "pending" }
}`;

  function Snippet() {
    const [lang, setLang] = React.useState("cURL");
    const code = SNIPPETS[lang];
    return (
      <div className="sf-codewrap">
        <div className="sf-codebar">
          {Object.keys(SNIPPETS).map((l) => (
            <button key={l} className={`sf-codetab${lang === l ? " on" : ""}`} onClick={() => setLang(l)}>{l}</button>
          ))}
          <div className="sf-codebar-copy"><CopyBtn text={code} dark /></div>
        </div>
        <div className="sf-code" style={{ borderRadius: 0 }}>{code}</div>
      </div>
    );
  }

  /* ---------- Recent webhook deliveries ---------- */
  const DELIVERIES = [
    { event: "screening.passed", id: "PMT-30482", t: "2 min ago", code: 200 },
    { event: "payment.settled", id: "PMT-30482", t: "2 min ago", code: 200 },
    { event: "payment.detected", id: "PMT-30480", t: "9 min ago", code: 200 },
    { event: "screening.flagged", id: "PMT-30478", t: "1 hr ago", code: 200 },
    { event: "settlement.completed", id: "SET-930482", t: "2 days ago", code: 200 },
  ];

  function Developers() {
    const [sandbox, setSandbox] = React.useState(false);
    return (
      <div className="sf-content">
        <div className="sf-page-head">
          <div><h1>Developers</h1><p>Accept screened USDT payments from your own checkout via the ShadowFin API.</p></div>
          <div className="sf-row-actions">
            <Button variant="secondary" icon="book">API docs</Button>
            <Button variant="primary" icon="plus">Create key</Button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, alignItems: "start", maxWidth: 1040 }}>
          <Card title="API keys" sub="Authenticate server-side calls. Never expose your secret key."
            action={<Toggle checked={sandbox} onChange={setSandbox} label={sandbox ? "Sandbox" : "Live"} />}>
            <div className="sf-stack" style={{ gap: 16 }}>
              <KeyRow label="Publishable key" value={sandbox ? "pk_test_4Kq9aF21bZ7m" : "pk_live_9Xb27dRe4Kq1"} />
              <KeyRow label="Secret key" value={sandbox ? "sk_test_8c3aD0fE91cQ" : "sk_live_e91cB7d29Xb2"} secret />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 4 }}>
                <span className="sf-muted" style={{ fontSize: 12.5 }}>Last rotated Jun 12, 2026</span>
                <Button variant="ghost" size="sm" icon="refresh">Rotate</Button>
              </div>
            </div>
          </Card>

          <Card title="Webhooks" sub="We notify your endpoint on every screening decision">
            <div className="sf-stack" style={{ gap: 14 }}>
              <div>
                <div className="sf-field-label" style={{ marginBottom: 7 }}>Endpoint URL</div>
                <div className="sf-keyrow">
                  <span className="key">https://api.lumenstudio.co/shadowfin/webhook</span>
                  <CopyBtn text="https://api.lumenstudio.co/shadowfin/webhook" />
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["payment.detected", "screening.passed", "screening.flagged", "payment.settled", "settlement.completed"].map((e) => (
                  <Badge key={e} tone="slate" dot={false}>{e}</Badge>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
                <span className="sf-badge sf-badge-mint"><span className="sf-badge-dot" />Healthy</span>
                <span className="sf-muted" style={{ fontSize: 12.5 }}>Last delivery 2 min ago · 200 OK</span>
              </div>
            </div>
          </Card>
        </div>

        <Card title="Create a payment" sub="Server-side · returns a screened deposit address and checkout link" style={{ marginTop: 18, maxWidth: 1040 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, alignItems: "start" }} className="sf-dev-split">
            <div>
              <Snippet />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <span className="sf-field-label">Response</span>
                <Badge tone="mint" dot={false}>200 OK</Badge>
              </div>
              <div className="sf-code">{RESPONSE}</div>
            </div>
          </div>
        </Card>

        <Card title="Recent webhook deliveries" sub="Last events sent to your endpoint" style={{ marginTop: 18, maxWidth: 1040 }} pad={false}>
          <div className="sf-table-wrap">
            <table className="sf-table">
              <thead><tr><th>Event</th><th>Object</th><th>Status</th><th style={{ textAlign: "right" }}>Sent</th></tr></thead>
              <tbody>
                {DELIVERIES.map((d, i) => (
                  <tr key={i}>
                    <td><span className="sf-mono" style={{ fontSize: 13, fontWeight: 600 }}>{d.event}</span></td>
                    <td className="sf-muted sf-t-id">{d.id}</td>
                    <td><Badge tone="mint" dot={false}>{d.code}</Badge></td>
                    <td className="sf-muted" style={{ textAlign: "right" }}>{d.t}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    );
  }

  window.Developers = Developers;
})();
