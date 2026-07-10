/* ShadowFin — Onboarding (sales-led KYB signup: application → review → approved) */
(function () {
  const I = window.SF_ICONS;
  const { Card, Button, Badge, Field, Input, Select, Alert, Checkbox, Avatar } = window;

  /* ---------- Stepper ---------- */
  const STEPS = ["Account", "Business", "Compliance review", "Go live"];
  function Stepper({ current }) {
    return (
      <div className="sf-stepper" style={{ maxWidth: 620, margin: "0 auto 30px" }}>
        {STEPS.map((s, i) => {
          const cls = i < current ? "done" : i === current ? "active" : "";
          return (
            <div key={s} className={`sf-step ${cls}`}>
              {i < STEPS.length - 1 && <div className="sf-step-line" />}
              <div className="sf-step-dot">{i < current ? <I.check size={16} /> : i + 1}</div>
              <div className="sf-step-label">{s}</div>
            </div>
          );
        })}
      </div>
    );
  }

  /* ---------- Sales rep card (sales-led signup) ---------- */
  function RepCard({ note }) {
    return (
      <Card title="Your account team">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Avatar name="Marcus Hale" size={46} />
          <div>
            <div style={{ fontWeight: 600, fontSize: 14.5 }}>Marcus Hale</div>
            <div className="sf-muted" style={{ fontSize: 12.5 }}>Solutions Engineer · ShadowFin</div>
          </div>
        </div>
        <p className="sf-muted" style={{ fontSize: 13, lineHeight: 1.55, margin: "14px 0 16px" }}>{note}</p>
        <div style={{ display: "flex", gap: 10 }}>
          <Button variant="secondary" size="sm" icon="clock" full>Book a call</Button>
          <Button variant="ghost" size="sm" icon="send" full>Message</Button>
        </div>
      </Card>
    );
  }

  /* ---------- Summary chips ---------- */
  function MetaRow({ items }) {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 22, justifyContent: "center", margin: "4px 0 0" }}>
        {items.map((it) => (
          <div key={it.k} style={{ textAlign: "center" }}>
            <div className="sf-muted" style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: ".04em", textTransform: "uppercase" }}>{it.k}</div>
            <div style={{ fontSize: 14.5, fontWeight: 600, marginTop: 4 }}>{it.v}</div>
          </div>
        ))}
      </div>
    );
  }

  /* ===================================================================== */
  function Onboarding({ onNav }) {
    const [stage, setStage] = React.useState("form"); // form · review · approved
    const [owners, setOwners] = React.useState([
      { name: "Dana Reyes", pct: "60" },
      { name: "Aria Voss", pct: "40" },
    ]);
    const [agree, setAgree] = React.useState(false);

    const setOwner = (i, k) => (e) =>
      setOwners((o) => o.map((row, idx) => (idx === i ? { ...row, [k]: e.target.value } : row)));
    const addOwner = () => setOwners((o) => [...o, { name: "", pct: "" }]);

    const stageIndex = stage === "form" ? 1 : stage === "review" ? 2 : 3;

    /* preview switcher so a reviewer can jump to any state */
    const PreviewSwitch = (
      <div className="sf-segment">
        {[["form", "Application"], ["review", "Under review"], ["approved", "Approved"]].map(([id, lbl]) => (
          <button key={id} className={`sf-seg${stage === id ? " on" : ""}`} onClick={() => { setStage(id); window.scrollTo({ top: 0 }); }}>{lbl}</button>
        ))}
      </div>
    );

    /* ---------------- APPLICATION FORM ---------------- */
    if (stage === "form") {
      return (
        <div className="sf-content">
          <div className="sf-page-head">
            <div><h1>Get started with ShadowFin</h1><p>Tell us about your business. Every account is reviewed by our compliance team before it goes live.</p></div>
            {PreviewSwitch}
          </div>

          <Stepper current={1} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 18, alignItems: "start", maxWidth: 980, margin: "0 auto" }}>
            <div className="sf-stack">
              <Card title="Business details" sub="Used to verify your company (KYB) against registries and watchlists">
                <div className="sf-stack" style={{ gap: 16 }}>
                  <Field label="Legal business name">
                    <Input icon="treasury" defaultValue="Lumen Studio Ltd." />
                  </Field>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <Field label="Country of incorporation">
                      <Select defaultValue="Singapore"><option>Singapore</option><option>United Kingdom</option><option>United States</option><option>Germany</option><option>UAE</option></Select>
                    </Field>
                    <Field label="Registration number">
                      <Input defaultValue="202418842K" />
                    </Field>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <Field label="Industry">
                      <Select defaultValue="E-commerce"><option>E-commerce</option><option>SaaS / Software</option><option>Marketplace</option><option>Digital goods</option><option>Professional services</option></Select>
                    </Field>
                    <Field label="Website">
                      <Input icon="external" defaultValue="lumenstudio.co" />
                    </Field>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <Field label="Expected monthly USDT volume">
                      <Select defaultValue="$500K – $2M"><option>Under $100K</option><option>$100K – $500K</option><option>$500K – $2M</option><option>$2M – $10M</option><option>Over $10M</option></Select>
                    </Field>
                    <Field label="Primary settlement network">
                      <Select defaultValue="TRON"><option>TRON</option><option>Ethereum</option></Select>
                    </Field>
                  </div>
                </div>
              </Card>

              <Card title="Beneficial owners" sub="Anyone owning 25% or more. We screen each individual for sanctions & PEP exposure."
                action={<Button variant="ghost" size="sm" icon="plus" onClick={addOwner}>Add owner</Button>}>
                <div className="sf-stack" style={{ gap: 12 }}>
                  {owners.map((o, i) => (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 120px 38px", gap: 10, alignItems: "center" }}>
                      <Input icon="user" placeholder="Full legal name" value={o.name} onChange={setOwner(i, "name")} />
                      <div className="sf-input-wrap">
                        <input className="sf-input" type="number" placeholder="%" value={o.pct} onChange={setOwner(i, "pct")} style={{ paddingRight: 28 }} />
                        <span className="sf-select-ico" style={{ pointerEvents: "none", fontSize: 13, color: "var(--ink-4)" }}>%</span>
                      </div>
                      <button className="sf-iconbtn" style={{ width: 38, height: 42, color: "var(--ink-4)" }} title="Remove"
                        onClick={() => setOwners((arr) => arr.length > 1 ? arr.filter((_, idx) => idx !== i) : arr)}>
                        <I.x size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <label style={{ display: "flex", gap: 11, alignItems: "flex-start", cursor: "pointer" }}>
                  <Checkbox checked={agree} onChange={setAgree} />
                  <span className="sf-muted" style={{ fontSize: 13, lineHeight: 1.5 }}>
                    I confirm the information above is accurate and I'm authorised to act for this business. I accept the
                    <b style={{ color: "var(--ink-2)" }}> Merchant Terms</b> and <b style={{ color: "var(--ink-2)" }}>AML &amp; KYC Policy</b>.
                  </span>
                </label>
                <Button variant="primary" full icon="compliance" disabled={!agree} style={{ marginTop: 18 }}
                  onClick={() => { setStage("review"); window.scrollTo({ top: 0 }); }}>
                  Submit for compliance review
                </Button>
                <p className="sf-muted" style={{ fontSize: 12, textAlign: "center", marginTop: 10 }}>No card required. Most reviews complete within 1–2 business days.</p>
              </Card>
            </div>

            <div className="sf-stack">
              <RepCard note="I'll be your point of contact through onboarding. Book a 20-minute call and I'll walk you through screening, settlement and going live." />
              <Card title="What happens next">
                <div className="sf-ledger">
                  {[
                    ["You submit", "Business details + beneficial owners", "info"],
                    ["KYB review", "We verify registries & screen owners", "info"],
                    ["Approval call", "A short call with your account team", "info"],
                    ["Go live", "Keys issued — start accepting USDT", "ok"],
                  ].map(([ev, dt, kind], i) => (
                    <div key={ev} className="sf-ledger-item">
                      <div className="sf-ledger-rail">
                        <span className={`sf-ledger-node ${kind}`} style={{ width: 24, height: 24 }}>
                          {kind === "ok" ? <I.check size={13} /> : <span style={{ fontSize: 11, fontWeight: 700 }}>{i + 1}</span>}
                        </span>
                        <span className="sf-ledger-line" />
                      </div>
                      <div className="sf-ledger-body">
                        <div className="sf-ledger-event">{ev}</div>
                        <div className="sf-ledger-detail">{dt}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      );
    }

    /* ---------------- KYB UNDER REVIEW ---------------- */
    if (stage === "review") {
      const checks = [
        ["Business registration", "Verified", "ok"],
        ["Beneficial owners", "In review", "rev"],
        ["Sanctions & PEP screening", "In progress", "rev"],
        ["Source-of-funds questionnaire", "Received", "ok"],
        ["Approval call", "Scheduled · Jun 27, 10:00", "info"],
      ];
      return (
        <div className="sf-content">
          <div className="sf-page-head">
            <div><h1>Application submitted</h1><p>Your account is being verified by our compliance team.</p></div>
            {PreviewSwitch}
          </div>

          <Stepper current={2} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 18, alignItems: "start", maxWidth: 980, margin: "0 auto" }}>
            <div className="sf-stack">
              <Card>
                <div style={{ textAlign: "center", padding: "10px 8px 4px" }}>
                  <div className="sf-pulse"><I.compliance size={28} /></div>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
                    <Badge tone="amber">KYB under review</Badge>
                  </div>
                  <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>We're verifying Lumen Studio Ltd.</h2>
                  <p className="sf-muted" style={{ fontSize: 14, marginTop: 8, maxWidth: 440, marginInline: "auto", lineHeight: 1.55 }}>
                    No action needed from you right now. We'll email <b style={{ color: "var(--ink-2)" }}>dana@lumenstudio.co</b> the moment a decision is made — usually within 1–2 business days.
                  </p>
                  <div style={{ height: 1, background: "var(--line)", margin: "22px 0" }} />
                  <MetaRow items={[
                    { k: "Submitted", v: "Jun 26, 2026" },
                    { k: "Application", v: "APP-7742" },
                    { k: "Est. decision", v: "Jun 28" },
                  ]} />
                </div>
              </Card>

              <Card title="Verification checklist" sub="Live status of each compliance check">
                <div>
                  {checks.map(([label, val, kind]) => {
                    const Ico = kind === "ok" ? I.checkCircle : kind === "rev" ? I.clock : I.clock;
                    const tone = kind === "ok" ? "mint" : kind === "rev" ? "amber" : "blue";
                    return (
                      <div key={label} className="sf-checkrow">
                        <span className={`sf-checkrow-ico ${kind === "ok" ? "ok" : "rev"}`}>
                          {kind === "rev" ? <I.refresh size={18} className="sf-spin" /> : <Ico size={18} />}
                        </span>
                        <span className="sf-checkrow-label">{label}</span>
                        <Badge tone={tone} dot={false}>{val}</Badge>
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Button variant="secondary" icon="check" onClick={() => { setStage("approved"); window.scrollTo({ top: 0 }); }}>
                Simulate approval
              </Button>
            </div>

            <div className="sf-stack">
              <RepCard note="Your application is in our queue. If anything's missing I'll reach out directly — otherwise you'll hear from us shortly after the review." />
              <Alert kind="info" title="Need it faster?">
                Enterprise accounts can request an expedited review. Mention it on your onboarding call.
              </Alert>
            </div>
          </div>
        </div>
      );
    }

    /* ---------------- APPROVED ---------------- */
    return (
      <div className="sf-content">
        <div className="sf-page-head">
          <div><h1>You're approved</h1><p>Lumen Studio is live on ShadowFin. Start accepting screened USDT.</p></div>
          {PreviewSwitch}
        </div>

        <Stepper current={4} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 18, alignItems: "start", maxWidth: 980, margin: "0 auto" }}>
          <div className="sf-stack">
            <Card>
              <div style={{ textAlign: "center", padding: "10px 8px 4px" }}>
                <div className="sf-pulse" style={{ background: "var(--mint)", color: "var(--green-700)" }}><I.checkCircle size={30} /></div>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
                  <Badge tone="mint">Account approved</Badge>
                </div>
                <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>Welcome to ShadowFin, Dana</h2>
                <p className="sf-muted" style={{ fontSize: 14, marginTop: 8, maxWidth: 440, marginInline: "auto", lineHeight: 1.55 }}>
                  Your KYB checks cleared and live keys are ready. Every payment you accept is screened and the clean ones settle straight to your wallet.
                </p>
                <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 20 }}>
                  <Button variant="primary" icon="home" onClick={() => onNav("home")}>Go to dashboard</Button>
                  <Button variant="secondary" icon="code" onClick={() => onNav("developers")}>View API keys</Button>
                </div>
              </div>
            </Card>

            <Card title="Your account">
              <div className="sf-defrow"><span className="k">Merchant ID</span><span className="v sf-mono">mer_lumen_8f21</span></div>
              <div className="sf-defrow"><span className="k">Plan</span><span className="v">Growth · 0.4% screening fee</span></div>
              <div className="sf-defrow"><span className="k">Settlement network</span><span className="v">TRON (default)</span></div>
              <div className="sf-defrow"><span className="k">Monthly volume limit</span><span className="v">2,000,000 USDT</span></div>
              <div className="sf-defrow"><span className="k">Status</span><span className="v"><Badge tone="mint">Live</Badge></span></div>
            </Card>
          </div>

          <div className="sf-stack">
            <Card title="Get going">
              <div className="sf-stack" style={{ gap: 10 }}>
                {[
                  ["qr", "Accept your first payment", "accept"],
                  ["code", "Grab your API keys", "developers"],
                  ["wallet", "Add a payout wallet", "settlement"],
                ].map(([ico, label, dest]) => {
                  const Ico = I[ico];
                  return (
                    <button key={label} onClick={() => onNav(dest)} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", textAlign: "left", background: "var(--mist)", border: "1px solid var(--line)", borderRadius: 10, padding: "12px 13px", cursor: "pointer" }}>
                      <span className="sf-kpi-ico" style={{ width: 34, height: 34 }}><Ico size={18} /></span>
                      <span style={{ fontSize: 14, fontWeight: 600, flex: 1 }}>{label}</span>
                      <I.chevronRight size={16} style={{ color: "var(--ink-4)" }} />
                    </button>
                  );
                })}
              </div>
            </Card>
            <RepCard note="Congrats — you're live! I'm still here if you need help with your integration or want to raise your limits as you grow." />
          </div>
        </div>
      </div>
    );
  }

  window.Onboarding = Onboarding;
})();
