/* ShadowFin — Operator: full-page Merchant detail (one merchant's complete record) */
(function () {
  const I = window.SF_ICONS;
  const D = window.OP_DATA;
  const { Card, Button, Badge, Avatar, Network, RiskMeter, CheckRow, MerchantStatus, TierPill } = window;

  const DOC_TONE = { Verified: "mint", Review: "amber", Missing: "red", Flagged: "red" };
  const PAY_TONE = (s) =>
    s === "Settled" || s === "Cleared" ? "mint" :
    s === "Held" || s === "Under review" ? "amber" :
    s === "Rejected" ? "red" : "slate";

  function ScreenTriplet({ checks }) {
    return (
      <div className="op-triplet">
        {[["Sanctions", checks.sanctions], ["PEP", checks.pep], ["Adverse media", checks.adverseMedia]].map(([lab, val]) => {
          const tone = val === "Clear" ? "ok" : val === "Review" ? "rev" : "hit";
          const Ico = val === "Clear" ? I.checkCircle : val === "Review" ? I.warn : I.risk;
          return (
            <div key={lab} className={`op-trip ${tone}`}>
              <span className="op-trip-ico"><Ico size={16} /></span>
              <div><span className="lab">{lab}</span><b>{val}</b></div>
            </div>
          );
        })}
      </div>
    );
  }

  function ConfirmModal({ title, sub, children, confirmLabel, confirmVariant = "primary", onConfirm, onClose }) {
    return (
      <div className="sf-modal-bg" onClick={onClose}>
        <div className="sf-modal" onClick={(e) => e.stopPropagation()}>
          <div className="sf-modal-head">
            <div><h2>{title}</h2><p>{sub}</p></div>
            <button className="sf-iconbtn" onClick={onClose}><I.x size={18} /></button>
          </div>
          <div className="sf-modal-body">{children}</div>
          <div className="sf-modal-foot">
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button variant={confirmVariant} onClick={onConfirm}>{confirmLabel}</Button>
          </div>
        </div>
      </div>
    );
  }

  function MerchantDetail({ merchant, onBack, onNav, toast }) {
    const [status, setStatus] = React.useState(merchant.status);
    const [tier, setTier] = React.useState(merchant.tier);
    const [modal, setModal] = React.useState(null);   // 'suspend' | 'reinstate' | 'tier'
    const [tierDraft, setTierDraft] = React.useState(tier || "Low");
    const [reason, setReason] = React.useState("");

    const m = { ...merchant, status, tier };
    const kyb = D.kybFor(merchant);
    const stats = D.statsFor(merchant);
    const payments = D.paymentsFor(merchant.name);
    const pending = status === "Pending KYB";
    const suspended = status === "Suspended";

    const doSuspend = () => { setStatus("Suspended"); setModal(null); toast(`${merchant.name} suspended · settlements halted`); };
    const doReinstate = () => { setStatus("Active"); setModal(null); toast(`${merchant.name} reinstated · settlements resumed`); };
    const doTier = () => { setTier(tierDraft); setModal(null); toast(`${merchant.name} risk tier set to ${tierDraft}`); };
    const openPortal = () => { toast(`Opening ${merchant.name}'s portal…`); window.open("../ShadowFin Prototype.html", "_blank"); };

    return (
      <div className="sf-content">
        {/* ---- header ---- */}
        <button className="op-back" onClick={onBack}><I.chevronLeft size={16} /> Merchants</button>

        <div className="op-detail-head">
          <div className="op-detail-id">
            <Avatar name={merchant.name} size={56} />
            <div>
              <h1>{merchant.name}</h1>
              <p>{merchant.legal} · <span className="sf-mono">{merchant.id}</span> · {merchant.country}</p>
              <div className="op-detail-pills">
                <MerchantStatus status={status} />
                <TierPill tier={tier} />
                <span className="op-detail-meta">{merchant.mcc}</span>
              </div>
            </div>
          </div>
          <div className="op-detail-actions">
            {pending ? (
              <Button variant="primary" icon="compliance" onClick={() => onNav("approvals")}>Open KYB review</Button>
            ) : suspended ? (
              <Button variant="primary" icon="refresh" onClick={() => setModal("reinstate")}>Reinstate</Button>
            ) : (
              <Button variant="destructive" icon="snow" onClick={() => setModal("suspend")}>Suspend</Button>
            )}
            <Button variant="secondary" icon="risk" onClick={() => { setTierDraft(tier || "Low"); setModal("tier"); }}>Change risk tier</Button>
            <Button variant="secondary" icon="external" onClick={openPortal}>Open portal</Button>
          </div>
        </div>

        {suspended && (
          <div className="sf-alert sf-alert-risk" style={{ marginBottom: 18 }}>
            <span className="sf-alert-ico"><I.risk size={18} /></span>
            <div><p className="sf-alert-title">Merchant suspended</p><p className="sf-alert-body">Settlements are halted. Incoming payments are screened but not forwarded. {kyb.note}</p></div>
          </div>
        )}

        <div className="sf-detail">
          {/* ============ MAIN ============ */}
          <div className="sf-stack">
            {/* Stats */}
            <div className="op-stat-grid">
              <div className="op-stat"><span className="lab">Volume · 30d</span><span className="val">{m.volume30d ? "$" + D.fmtCompact(m.volume30d) : "—"}</span></div>
              <div className="op-stat"><span className="lab">Lifetime volume</span><span className="val">{stats.lifetime ? "$" + D.fmtCompact(stats.lifetime) : "—"}</span></div>
              <div className="op-stat"><span className="lab">Avg payment</span><span className="val">{stats.avg ? "$" + stats.avg.toLocaleString() : "—"}</span></div>
              <div className="op-stat"><span className="lab">Payments screened</span><span className="val">{m.screened ? m.screened.toLocaleString() : "—"}</span></div>
              <div className="op-stat"><span className="lab">Clean rate</span><span className="val" style={{ color: m.pctClean >= 98 ? "var(--green-700)" : m.pctClean < 90 ? "var(--red)" : undefined }}>{m.pctClean != null ? m.pctClean + "%" : "—"}</span></div>
              <div className="op-stat"><span className="lab">Flagged · 30d</span><span className="val" style={{ color: m.flagged30d > 5 ? "var(--red)" : undefined }}>{m.flagged30d}</span></div>
            </div>

            {/* KYB record */}
            <Card title="KYB record" sub="Know-Your-Business verification — checks, documents, and decision" pad={false}
              action={<Badge tone={pending ? "amber" : suspended ? "red" : "mint"} dot={false}>{kyb.decision}</Badge>}>
              <div className="op-kyb-decision">
                <div className="op-kyb-dec-main">
                  {pending ? (
                    <>
                      <span className="op-kyb-dec-ico amber"><I.clock size={18} /></span>
                      <div><b>Awaiting decision · {kyb.method}</b><span>Submitted {kyb.submitted} · sitting in the Approvals queue</span></div>
                    </>
                  ) : (
                    <>
                      <span className={`op-kyb-dec-ico ${suspended ? "red" : "ok"}`}>{suspended ? <I.warn size={18} /> : <I.checkCircle size={18} />}</span>
                      <div><b>{kyb.decision} by {kyb.reviewer} · {kyb.reviewerRole}</b><span>{kyb.decidedAt} · {kyb.method} · entity score {kyb.entityScore}/100</span></div>
                    </>
                  )}
                </div>
              </div>

              <div className="op-kyb-body">
                <div className="op-kyb-section">
                  <h4 className="op-sub-h">Entity screening</h4>
                  <ScreenTriplet checks={kyb.checks} />
                  <p className="op-kyb-note">{kyb.note}</p>
                </div>

                <div className="op-kyb-section">
                  <h4 className="op-sub-h">Beneficial owners</h4>
                  <div className="op-owner-list">
                    {kyb.owners.map((o, i) => {
                      const flag = o.sanctions !== "Clear" || o.pep !== "Clear" || o.adverseMedia !== "Clear";
                      return (
                        <div key={i} className={`op-owner ${o.pep === "Hit" || o.adverseMedia === "Hit" || o.sanctions === "Hit" ? "hit" : flag ? "rev" : ""}`}>
                          <div className="op-owner-id">
                            <Avatar name={o.name.includes("undisclosed") ? "? ?" : o.name} size={36} />
                            <div><b>{o.name}</b><span>{o.role} · {o.country}</span></div>
                          </div>
                          <div className="op-owner-screens">
                            {[["Sanctions", o.sanctions], ["PEP", o.pep], ["Adverse", o.adverseMedia]].map(([l, v]) => (
                              <div key={l} className="op-owner-screen"><span className="lab">{l}</span><Badge tone={v === "Clear" ? "mint" : v === "Review" ? "amber" : "red"} dot={false}>{v}</Badge></div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="op-kyb-section">
                  <h4 className="op-sub-h">Documents <span className="op-sub-count">{kyb.documents.length}</span></h4>
                  <div className="op-doc-list">
                    {kyb.documents.map((d, i) => (
                      <div key={i} className="op-doc-row">
                        <span className="op-doc-ico"><I.book size={17} /></span>
                        <div className="op-doc-main"><b>{d.name}</b><span>{d.kind} · uploaded {d.uploaded}</span></div>
                        <Badge tone={DOC_TONE[d.status]} dot={false}>{d.status}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Recent payments */}
            <Card title="Recent payments" sub={`${payments.length} records · every payment is screened before settlement`} pad={false}
              action={<Button variant="ghost" size="sm" icon="screening" onClick={() => onNav("screening")}>Screening</Button>}>
              {payments.length ? (
                <div className="sf-table-wrap">
                  <table className="sf-table">
                    <thead><tr><th>Payment</th><th>Amount</th><th>Network</th><th>Risk</th><th>Status</th><th>When</th></tr></thead>
                    <tbody>
                      {payments.map((p) => (
                        <tr key={p.id} style={{ cursor: "default" }}>
                          <td className="sf-t-id sf-mono">{p.id}</td>
                          <td className="sf-usdt tnum">${D.fmtUSDT(p.amount)}</td>
                          <td><Network name={p.network} /></td>
                          <td><span className={`sf-risk sf-risk-${p.risk < 25 ? "low" : p.risk < 60 ? "med" : "high"}`}>{p.risk}<em>/100</em></span></td>
                          <td><Badge tone={PAY_TONE(p.status)} dot={false}>{p.status}</Badge></td>
                          <td className="sf-muted tnum">{p.when}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ padding: "34px 20px", textAlign: "center", color: "var(--ink-3)", fontSize: 14 }}>
                  No payments yet — this merchant cannot process until KYB is approved.
                </div>
              )}
            </Card>
          </div>

          {/* ============ SIDE ============ */}
          <div className="sf-stack">
            <Card title="Business profile" pad>
              <div className="sf-defrow"><span className="k">Legal entity</span><span className="v">{merchant.legal}</span></div>
              <div className="sf-defrow"><span className="k">Jurisdiction</span><span className="v">{merchant.country}</span></div>
              <div className="sf-defrow"><span className="k">Category</span><span className="v" style={{ maxWidth: 160 }}>{merchant.mcc}</span></div>
              <div className="sf-defrow"><span className="k">Primary contact</span><span className="v">{merchant.owner}</span></div>
              <div className="sf-defrow"><span className="k">Risk tier</span><span className="v"><TierPill tier={tier} /></span></div>
              <div className="sf-defrow"><span className="k">Joined</span><span className="v">{merchant.joined}</span></div>
              <div className="sf-defrow"><span className="k">Tenure</span><span className="v">{stats.tenure} mo</span></div>
            </Card>

            {merchant.riskScore != null && (
              <Card title="Merchant risk score" sub="Weighted across screening history & ownership">
                <RiskMeter value={merchant.riskScore} />
              </Card>
            )}

            <Card title="Settlement wallets" sub="Clean payments forward on-chain here">
              <div className="sf-wallet prim">
                <span className="sf-wallet-ico"><I.wallet size={20} /></span>
                <div className="sf-wallet-main">
                  <div className="sf-wallet-label">Operating wallet <Network name={merchant.network} /></div>
                  <div className="sf-wallet-addr">{merchant.wallet}</div>
                </div>
              </div>
              <div className="sf-defrow" style={{ marginTop: 10 }}><span className="k">Custodian</span><span className="v">{merchant.custodian}</span></div>
              <div className="sf-defrow"><span className="k">Settled payouts</span><span className="v">{stats.settledCount}</span></div>
            </Card>

            <Card title="Operator actions" pad>
              <div className="op-action-list">
                {pending ? (
                  <button className="op-action" onClick={() => onNav("approvals")}><span className="op-action-ico ok"><I.compliance size={17} /></span><div><b>Open KYB review</b><span>Decide approval in the queue</span></div><I.chevronRight size={16} /></button>
                ) : suspended ? (
                  <button className="op-action" onClick={() => setModal("reinstate")}><span className="op-action-ico ok"><I.refresh size={17} /></span><div><b>Reinstate merchant</b><span>Resume settlements</span></div><I.chevronRight size={16} /></button>
                ) : (
                  <button className="op-action" onClick={() => setModal("suspend")}><span className="op-action-ico red"><I.snow size={17} /></span><div><b>Suspend merchant</b><span>Halt settlements immediately</span></div><I.chevronRight size={16} /></button>
                )}
                <button className="op-action" onClick={() => { setTierDraft(tier || "Low"); setModal("tier"); }}><span className="op-action-ico amber"><I.risk size={17} /></span><div><b>Change risk tier</b><span>Currently {tier || "under review"}</span></div><I.chevronRight size={16} /></button>
                <button className="op-action" onClick={openPortal}><span className="op-action-ico slate"><I.external size={17} /></span><div><b>Open merchant portal</b><span>View what the merchant sees</span></div><I.chevronRight size={16} /></button>
                <button className="op-action" onClick={() => onNav("audit")}><span className="op-action-ico slate"><I.book size={17} /></span><div><b>Audit trail</b><span>Every action on this merchant</span></div><I.chevronRight size={16} /></button>
              </div>
            </Card>
          </div>
        </div>

        {/* ---- modals ---- */}
        {modal === "suspend" && (
          <ConfirmModal title="Suspend merchant" sub={`${merchant.name} · ${merchant.id}`} confirmLabel="Suspend merchant" confirmVariant="destructive" onClose={() => setModal(null)} onConfirm={doSuspend}>
            <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.55, marginBottom: 14 }}>Settlements will halt immediately. Incoming payments are still screened but will not be forwarded on-chain. This writes an immutable audit record.</p>
            <window.Field label="Reason (recorded in audit log)">
              <window.Textarea placeholder="e.g. Repeated sanctions exposure — 12 flagged payments in 30 days" value={reason} onChange={(e) => setReason(e.target.value)} />
            </window.Field>
          </ConfirmModal>
        )}
        {modal === "reinstate" && (
          <ConfirmModal title="Reinstate merchant" sub={`${merchant.name} · ${merchant.id}`} confirmLabel="Reinstate" confirmVariant="primary" onClose={() => setModal(null)} onConfirm={doReinstate}>
            <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.55 }}>Settlements will resume. The merchant returns to Active status. A record of the reinstatement is written to the audit log.</p>
          </ConfirmModal>
        )}
        {modal === "tier" && (
          <ConfirmModal title="Change risk tier" sub={`${merchant.name} · ${merchant.id}`} confirmLabel="Apply tier" confirmVariant="primary" onClose={() => setModal(null)} onConfirm={doTier}>
            <p style={{ fontSize: 14, color: "var(--ink-3)", marginBottom: 14 }}>Risk tier drives screening thresholds and monitoring frequency.</p>
            <div className="op-tier-choices">
              {["Low", "Medium", "High"].map((t) => (
                <button key={t} className={`op-tier-choice${tierDraft === t ? " on" : ""}`} onClick={() => setTierDraft(t)}>
                  <TierPill tier={t} />
                  <span>{t === "Low" ? "Standard monitoring" : t === "Medium" ? "Enhanced monitoring" : "Continuous review"}</span>
                </button>
              ))}
            </div>
          </ConfirmModal>
        )}
      </div>
    );
  }

  window.MerchantDetail = MerchantDetail;
})();
