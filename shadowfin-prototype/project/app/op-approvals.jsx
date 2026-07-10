/* ShadowFin — Operator: Approvals (KYB review queue) */
(function () {
  const I = window.SF_ICONS;
  const D = window.OP_DATA;
  const { Card, Button, Badge, Avatar, Alert, Field, Textarea, MerchantStatus, RiskMeter, SCREEN_TONE } = window;

  const DOC_TONE = { Verified: "mint", Review: "amber", Missing: "red" };

  // Sanctions / PEP / Adverse-media result row
  function ScreenRow({ label, value }) {
    const tone = SCREEN_TONE[value] || "slate";
    const Ico = value === "Clear" ? I.checkCircle : value === "Review" ? I.warn : I.risk;
    return (
      <div className="sf-checkrow">
        <span className={`sf-checkrow-ico ${value === "Clear" ? "ok" : value === "Review" ? "rev" : "hit"}`}><Ico size={18} /></span>
        <span className="sf-checkrow-label">{label}</span>
        <Badge tone={tone} dot={false}>{value}</Badge>
      </div>
    );
  }

  // Worst result across a screen set → drives owner card accent
  const worst = (s) => (s.sanctions === "Hit" || s.adverseMedia === "Hit" || s.pep === "Hit") ? "hit"
    : (s.sanctions === "Review" || s.adverseMedia === "Review" || s.pep === "Review") ? "rev" : "ok";

  /* ---------- Decision modal — frames the audit record ---------- */
  function DecisionModal({ action, merchant, onClose, onConfirm }) {
    const [note, setNote] = React.useState("");
    const cfg = {
      approve: { title: "Approve merchant", verb: "Approve", variant: "primary", kind: "success",
        body: "This activates the merchant, sets a Low risk tier, and lets it accept payments. A signed audit record is written.", icon: "check" },
      reject: { title: "Reject application", verb: "Reject", variant: "destructive", kind: "risk",
        body: "This permanently declines the application. The applicant is notified and a signed audit record is written.", icon: "x" },
      info: { title: "Request more information", verb: "Send request", variant: "dark", kind: "warning",
        body: "This pauses the review and asks the applicant for the outstanding items. A signed audit record is written.", icon: "info" },
    }[action];

    return (
      <div className="sf-modal-bg" onClick={onClose}>
        <div className="sf-modal" onClick={(e) => e.stopPropagation()}>
          <div className="sf-modal-head">
            <div>
              <h2>{cfg.title}</h2>
              <p>{merchant.name} · {merchant.id}</p>
            </div>
            <button className="sf-iconbtn" onClick={onClose}><I.x size={18} /></button>
          </div>
          <div className="sf-modal-body" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Alert kind={cfg.kind}>{cfg.body}</Alert>
            <Field label="Reviewer note" hint="Stored on the audit record. Required for reject / request decisions.">
              <Textarea placeholder="Summarise your compliance rationale…" value={note} onChange={(e) => setNote(e.target.value)} />
            </Field>
            <div className="sf-audit">
              <div className="sf-audit-head"><I.book size={13} /> Audit record preview</div>
              <div className="sf-audit-row"><span className="k">Action</span><span className="v">{cfg.title}</span></div>
              <div className="sf-audit-row"><span className="k">Merchant</span><span className="v">{merchant.name}</span></div>
              <div className="sf-audit-row"><span className="k">Reviewer</span><span className="v">Priya Anand · Compliance</span></div>
              <div className="sf-audit-row"><span className="k">Timestamp</span><span className="v mono">Jun 27, 2026 · 10:14 UTC</span></div>
            </div>
          </div>
          <div className="sf-modal-foot">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button variant={cfg.variant} icon={cfg.icon} onClick={() => onConfirm(action, note)}>{cfg.verb}</Button>
          </div>
        </div>
      </div>
    );
  }

  function Approvals({ toast }) {
    const queue = D.kybQueue;
    const [selId, setSelId] = React.useState(queue[0].merchantId);
    const [modal, setModal] = React.useState(null);
    const [decisions, setDecisions] = React.useState({});

    const kyb = D.kybByMerchant(selId);
    const m = D.merchantById(selId);
    const decision = decisions[selId];

    const confirm = (action, note) => {
      const labels = { approve: "approved", reject: "rejected", info: "info requested" };
      const recId = "AUD-" + (44220 + Object.keys(decisions).length);
      setDecisions((d) => ({ ...d, [selId]: { action, note, recId, at: "Jun 27, 2026 · 10:14 UTC" } }));
      setModal(null);
      toast(`${m.name} — ${labels[action]} · ${recId} written`);
    };

    return (
      <div className="sf-content">
        <div className="sf-page-head">
          <div>
            <h1>Approvals</h1>
            <p>KYB review queue. Every decision is a compliance action and writes a signed audit record.</p>
          </div>
          <div className="sf-row-actions">
            <Badge tone="amber" dot={false}>{queue.length - Object.keys(decisions).length} awaiting decision</Badge>
          </div>
        </div>

        <div className="sf-screen-split">
          {/* Queue */}
          <Card title="Review queue" sub={`${queue.length} pending merchants`} pad={false}>
            <div>
              {queue.map((q) => {
                const qm = D.merchantById(q.merchantId);
                const dec = decisions[q.merchantId];
                return (
                  <button key={q.merchantId} className={`sf-queue-item${selId === q.merchantId ? " sel" : ""}`} onClick={() => setSelId(q.merchantId)} style={{ width: "100%", textAlign: "left", border: "none", background: selId === q.merchantId ? undefined : "transparent" }}>
                    <div className="sf-queue-top">
                      <span className="sf-queue-cp">{qm.name}</span>
                      {dec ? <Badge tone={dec.action === "approve" ? "mint" : dec.action === "reject" ? "red" : "amber"} dot={false}>
                        {dec.action === "approve" ? "Approved" : dec.action === "reject" ? "Rejected" : "Info requested"}
                      </Badge> : <Badge tone={q.priority === "Enhanced DD" ? "red" : q.priority === "Fast-track" ? "mint" : "slate"} dot={false}>{q.priority}</Badge>}
                    </div>
                    <div className="sf-queue-meta">
                      <span>{qm.country}</span>
                      <span>{q.waiting} waiting</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Review detail */}
          <div className="sf-stack">
            {/* Header */}
            <Card>
              <div className="op-review-head">
                <Avatar name={m.name} size={50} />
                <div className="op-review-id">
                  <h2>{m.name}</h2>
                  <p>{m.legal} · {m.id}</p>
                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <MerchantStatus status={m.status} />
                    <Badge tone={kyb.priority === "Enhanced DD" ? "red" : kyb.priority === "Fast-track" ? "mint" : "slate"} dot={false}>{kyb.priority}</Badge>
                  </div>
                </div>
                <div className="op-review-score">
                  <span className="lab">Entity risk</span>
                  <span className={`num sf-risk-${kyb.entityScore < 25 ? "low" : kyb.entityScore < 60 ? "med" : "high"}`}>{kyb.entityScore}<small>/100</small></span>
                </div>
              </div>
            </Card>

            {decision && (
              <div className={`sf-alert sf-alert-${decision.action === "approve" ? "success" : decision.action === "reject" ? "risk" : "warning"}`}>
                <span className="sf-alert-ico"><I.book size={18} /></span>
                <div>
                  <p className="sf-alert-title">
                    Decision recorded — {decision.action === "approve" ? "merchant approved" : decision.action === "reject" ? "application rejected" : "more information requested"}
                  </p>
                  <p className="sf-alert-body">Audit record {decision.recId} written · Priya Anand · {decision.at}{decision.note ? ` · “${decision.note}”` : ""}</p>
                </div>
              </div>
            )}

            <div className="sf-grid-2">
              {/* Business details */}
              <Card title="Business details">
                <div className="sf-defrow"><span className="k">Registration</span><span className="v">{kyb.details.registration}</span></div>
                <div className="sf-defrow"><span className="k">Reg. number</span><span className="v sf-mono">{kyb.details.regNo}</span></div>
                <div className="sf-defrow"><span className="k">Incorporated</span><span className="v">{kyb.details.incorporated}</span></div>
                <div className="sf-defrow"><span className="k">Jurisdiction</span><span className="v">{m.country}</span></div>
                <div className="sf-defrow"><span className="k">Category</span><span className="v">{kyb.details.category}</span></div>
                <div className="sf-defrow"><span className="k">Expected volume</span><span className="v">{kyb.expectedVolume}</span></div>
                <div className="sf-defrow"><span className="k">Website</span><span className="v">{kyb.details.website}</span></div>
                <div className="sf-defrow"><span className="k">Contact</span><span className="v">{kyb.details.contact}</span></div>
              </Card>

              {/* KYB documents */}
              <Card title="Submitted KYB documents" sub={`${kyb.documents.length} files`}>
                <div className="op-doc-list">
                  {kyb.documents.map((doc, i) => (
                    <div key={i} className="op-doc-row">
                      <span className="op-doc-ico"><I.reports size={18} /></span>
                      <div className="op-doc-main">
                        <b>{doc.name}</b>
                        <span>{doc.kind}</span>
                      </div>
                      <Badge tone={DOC_TONE[doc.status]} dot={false}>{doc.status}</Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Entity screening */}
            <Card title="Entity screening" sub="Sanctions, PEP & adverse-media check on the business">
              <div className="sf-grid-2" style={{ alignItems: "start" }}>
                <div>
                  <ScreenRow label="Sanctions & watchlists" value={kyb.entityScreen.sanctions} />
                  <ScreenRow label="PEP" value={kyb.entityScreen.pep} />
                  <ScreenRow label="Adverse media" value={kyb.entityScreen.adverseMedia} />
                </div>
                <div className={`op-screen-note ${worst(kyb.entityScreen)}`}>
                  <div className="op-screen-note-head">
                    {worst(kyb.entityScreen) === "ok" ? <I.checkCircle size={16} /> : worst(kyb.entityScreen) === "rev" ? <I.warn size={16} /> : <I.risk size={16} />}
                    {worst(kyb.entityScreen) === "ok" ? "No material findings" : worst(kyb.entityScreen) === "rev" ? "Findings to review" : "Adverse finding"}
                  </div>
                  <p>{kyb.entityNote}</p>
                </div>
              </div>
            </Card>

            {/* Beneficial owners + their screening */}
            <Card title="Beneficial owners" sub={`${kyb.owners.length} screened — each owner is checked against sanctions & adverse media`} pad={false}>
              <div className="op-owner-list">
                {kyb.owners.map((o, i) => (
                  <div key={i} className={`op-owner ${worst(o)}`}>
                    <div className="op-owner-id">
                      <Avatar name={o.name} size={38} />
                      <div>
                        <b>{o.name}</b>
                        <span>{o.role} · {o.country} · b. {o.dob}</span>
                      </div>
                    </div>
                    <div className="op-owner-screens">
                      <div className="op-owner-screen"><span className="lab">Sanctions</span><Badge tone={SCREEN_TONE[o.sanctions]} dot={false}>{o.sanctions}</Badge></div>
                      <div className="op-owner-screen"><span className="lab">PEP</span><Badge tone={SCREEN_TONE[o.pep]} dot={false}>{o.pep}</Badge></div>
                      <div className="op-owner-screen"><span className="lab">Adverse media</span><Badge tone={SCREEN_TONE[o.adverseMedia]} dot={false}>{o.adverseMedia}</Badge></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Action footer */}
            <Card>
              <div className="op-review-actions">
                <div className="op-review-actions-txt">
                  <b>Compliance decision</b>
                  <span>Each action writes a signed, immutable audit record attributed to you.</span>
                </div>
                <div className="op-review-actions-btns">
                  <Button variant="destructive" icon="x" onClick={() => setModal("reject")} disabled={!!decision}>Reject</Button>
                  <Button variant="secondary" icon="info" onClick={() => setModal("info")} disabled={!!decision}>Request more info</Button>
                  <Button variant="primary" icon="check" onClick={() => setModal("approve")} disabled={!!decision}>Approve</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {modal && <DecisionModal action={modal} merchant={m} onClose={() => setModal(null)} onConfirm={confirm} />}
      </div>
    );
  }

  window.Approvals = Approvals;
})();
