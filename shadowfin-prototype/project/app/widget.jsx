/* ShadowFin — Embedded checkout widget (customer-facing) + demo host page */
(function () {
  const I = window.SF_ICONS;

  const AMOUNT = "250.00";
  const NETS = {
    TRON: { ico: "tron", label: "TRON", sub: "TRC-20 · low fee", addr: "TJ9kq2c1Vb8nXp4mQ1aLZ7wR3dFs6Hy2eK", conf: "1 / 1", fee: "≈ $0.00", time: "~30 sec" },
    Ethereum: { ico: "eth", label: "Ethereum", sub: "ERC-20", addr: "0x8fA3c1b9E2d74F0a5C6b3E18d9aF27c40B1e", conf: "12 / 12", fee: "≈ $1.40", time: "~3 min" },
  };

  /* ---- QR placeholder (not a real code; deterministic look with finder patterns) ---- */
  function Qr({ seed = 0 }) {
    const N = 25, m = [];
    for (let r = 0; r < N; r++) { m[r] = []; for (let c = 0; c < N; c++) m[r][c] = 0; }
    const finder = (or, oc) => {
      for (let r = 0; r < 7; r++) for (let c = 0; c < 7; c++) {
        const edge = r === 0 || r === 6 || c === 0 || c === 6;
        const core = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        m[or + r][oc + c] = edge || core ? 1 : 0;
      }
    };
    finder(0, 0); finder(0, N - 7); finder(N - 7, 0);
    const inFinder = (r, c) =>
      (r < 8 && c < 8) || (r < 8 && c >= N - 8) || (r >= N - 8 && c < 8);
    for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
      if (inFinder(r, c)) continue;
      m[r][c] = (((r * 13 + c * 7 + seed * 17 + ((r * c) % 11)) % 10) < 5) ? 1 : 0;
    }
    const cells = [];
    for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
      if (m[r][c]) cells.push(<rect key={r + "-" + c} x={c * 4} y={r * 4} width="4" height="4" fill="#111318" />);
    }
    return (
      <svg viewBox={`0 0 ${N * 4} ${N * 4}`} shapeRendering="crispEdges">{cells}</svg>
    );
  }

  /* ---- Status model ---- */
  // phases: awaiting(0) detected(1) screening(2) confirmed(3) ; or rejected
  const STEPS = ["Awaiting payment", "Detected", "Screening", "Settled"];

  function statusStrip(phase, rejected) {
    if (rejected)
      return { kind: "bad", icon: "flag", t: "Payment flagged — not released",
        d: "Screening matched a sanctioned source. Funds were not released to the merchant." };
    switch (phase) {
      case 0: return { kind: "wait", pulse: true, t: "Awaiting your payment",
        d: "Send exactly " + AMOUNT + " USDT to the address above." };
      case 1: return { kind: "info", icon: "wallet", t: "Transaction detected on-chain",
        d: "Seen in the mempool — waiting for network confirmations." };
      case 2: return { kind: "scan", spin: true, t: "Screening the source of funds",
        d: "Checking sanctions, PEP and adverse-media exposure." };
      case 3: return { kind: "ok", icon: "checkCircle", t: "Payment settled",
        d: "Screened and released to the merchant." };
      default: return {};
    }
  }

  function Track({ phase, rejected }) {
    return (
      <div className="cw-track">
        <div className="cw-track-bar">
          {STEPS.map((label, i) => {
            let cls = "cw-tstep";
            let inner = i + 1;
            if (rejected) {
              if (i < 2) { cls += " done"; inner = <I.check size={15} />; }
              else if (i === 2) { cls += " err"; inner = <I.x size={15} />; }
              else { cls += " err pending"; inner = i + 1; }
            } else {
              if (i < phase) { cls += " done"; inner = <I.check size={15} />; }
              else if (i === phase) {
                cls += " active";
                inner = (phase === 1 || phase === 2)
                  ? <span className="cw-mini-spin" /> : i + 1;
                if (phase === 3) inner = <I.check size={15} />;
              }
            }
            // confirmed: all done
            if (!rejected && phase === 3) { cls = "cw-tstep done"; inner = <I.check size={15} />; }
            return (
              <div className={cls} key={label}>
                <div className="cw-tnode">{inner}</div>
                <div className="cw-tline" />
                <div className="cw-tlabel">{label}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* ---- The widget ---- */
  function Widget({ phase, rejected, net, setNet }) {
    const [copied, setCopied] = React.useState(false);
    const n = NETS[net];
    const s = statusStrip(phase, rejected);
    const locked = phase >= 1 || rejected; // network can't change once a tx is seen
    const StatIco = s.icon ? I[s.icon] : null;
    const addr = n.addr;
    const head = addr.slice(0, 6), tail = addr.slice(-6), mid = addr.slice(6, -6);

    const copy = () => { setCopied(true); setTimeout(() => setCopied(false), 1600); };

    return (
      <div className="cw" role="region" aria-label="ShadowFin payment">
        {/* Header */}
        <div className="cw-head">
          <div className="cw-merchant">
            <span className="mfav">N</span>
            <span className="mname">Northwind Supply Co.</span>
            <span className="mlock"><I.gate size={13} /> Secured checkout</span>
          </div>
          <div className="cw-amount-lab">Amount due</div>
          <div className="cw-amount">
            <span className="num">{AMOUNT}</span>
            <span className="cur">USDT</span>
            <span className="fiat">≈ $250.00</span>
          </div>
        </div>

        {/* Body: network + pay-to */}
        <div className="cw-body">
          <div className="cw-net-lab">
            <span>Pay with</span>
            <span className="hint">{locked ? "Locked while pending" : "Choose a network"}</span>
          </div>
          <div className="cw-nets">
            {Object.keys(NETS).map((k) => (
              <button
                key={k}
                className={`cw-net-btn${net === k ? " on" : ""}`}
                onClick={() => !locked && setNet(k)}
                disabled={locked && net !== k}
                style={locked && net !== k ? { opacity: .45, cursor: "not-allowed" } : null}
              >
                <span className={`cw-net-ico ${NETS[k].ico}`}>{k === "TRON" ? "T" : "Ξ"}</span>
                <span className="cw-net-meta"><b>{NETS[k].label}</b><small>{NETS[k].sub}</small></span>
                <I.check size={15} className="cw-net-check" />
              </button>
            ))}
          </div>

          <div className="cw-pay">
            <div className="cw-qr">
              <Qr seed={net === "TRON" ? 1 : 4} />
              <div className="cw-qr-badge"><I.wallet size={15} /></div>
            </div>
            <div className="cw-pay-right">
              <div className="lab">Deposit address · {n.label}</div>
              <div className="cw-addr"><b>{head}</b><span className="dim">{mid}</span><b>{tail}</b></div>
              <button className={`cw-copy${copied ? " done" : ""}`} onClick={copy}>
                {copied ? <I.check size={13} /> : <I.copy size={13} />}
                {copied ? "Copied" : "Copy address"}
              </button>
              <div className="cw-tag">
                <span className="k">Network fee</span><span className="v">{n.fee}</span>
                <span className="sep">·</span>
                <span className="k">Confirms</span><span className="v">{n.conf}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status track */}
        <Track phase={phase} rejected={rejected} />

        {/* Status strip */}
        <div className={`cw-status ${s.kind}`}>
          <span className="ico">
            {s.pulse ? <span className="cw-pulse-dot" />
              : s.spin ? <span className="cw-mini-spin" />
              : StatIco ? <StatIco size={17} /> : null}
          </span>
          <span className="txt"><span className="t">{s.t}</span><span className="d">{s.d}</span></span>
        </div>

        {/* Confirmed receipt */}
        {phase === 3 && !rejected && (
          <div className="cw-receipt">
            <div className="cw-rrow"><span className="k">Paid</span><span className="v">{AMOUNT} USDT</span></div>
            <div className="cw-rrow"><span className="k">Transaction</span><span className="v"><span className="mono">a7f3…9C2e</span><a className="cw-txlink" href="#" onClick={(e)=>e.preventDefault()}>View <I.external size={12} /></a></span></div>
            <div className="cw-rrow"><span className="k">Screening</span><span className="v" style={{ color: "var(--green-700)" }}><I.checkCircle size={14} /> Cleared</span></div>
          </div>
        )}

        {/* Rejected detail */}
        {rejected && (
          <div className="cw-reject">
            <div className="cw-reject-list">
              <div className="cw-rj"><I.risk size={16} className="ic hit" /><span className="lab">Sanctions screening</span><span className="badge hit">Hit</span></div>
              <div className="cw-rj"><I.checkCircle size={16} className="ic ok" /><span className="lab">PEP exposure</span><span className="badge ok">Clear</span></div>
              <div className="cw-rj"><I.checkCircle size={16} className="ic ok" /><span className="lab">Adverse media</span><span className="badge ok">Clear</span></div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="cw-cta" style={{ marginTop: 14 }}>
          {phase === 3 && !rejected && (
            <button className="sf-btn sf-btn-primary sf-btn-md">Return to Northwind Supply Co.</button>
          )}
          {rejected && (
            <button className="sf-btn sf-btn-secondary sf-btn-md">Pay from a different wallet</button>
          )}
          {phase < 3 && !rejected && (
            <button className="sf-btn sf-btn-secondary sf-btn-md"><I.refresh size={15} /> I&apos;ve sent the payment</button>
          )}
        </div>

        {/* Footer */}
        <div className="cw-foot">
          <span className="cw-powered">
            <window.SF_BrandMark size={16} /> Payments screened by <b>ShadowFin</b>
          </span>
          <span className="cw-foot-right"><I.gate size={12} /> Encrypted</span>
        </div>
      </div>
    );
  }

  /* ---- Demo host page + controls ---- */
  function App() {
    const [phase, setPhase] = React.useState(0);
    const [rejected, setRejected] = React.useState(false);
    const [net, setNet] = React.useState("TRON");
    const [playing, setPlaying] = React.useState(false);
    const timer = React.useRef(null);

    const goto = (p) => { setPlaying(false); setRejected(false); setPhase(p); };
    const showReject = () => { setPlaying(false); setRejected(true); setPhase(2); };

    React.useEffect(() => {
      if (!playing) { clearTimeout(timer.current); return; }
      if (rejected) { setPlaying(false); return; }
      if (phase >= 3) { setPlaying(false); return; }
      timer.current = setTimeout(() => setPhase((p) => p + 1), phase === 0 ? 2000 : 2400);
      return () => clearTimeout(timer.current);
    }, [playing, phase, rejected]);

    const play = () => {
      if (playing) { setPlaying(false); return; }
      setRejected(false); setPhase(0); setPlaying(true);
    };

    const state = rejected ? "rej" : ["awaiting", "detected", "screening", "confirmed"][phase];

    return (
      <div className="cw-stage">
        {/* faux merchant chrome */}
        <div className="host-bar">
          <div className="host-logo"><span className="host-logo-mark">N</span> Northwind</div>
          <div className="host-steps">
            <span>Cart</span><span className="sep" /><span>Details</span><span className="sep" /><span className="on">Payment</span>
          </div>
        </div>

        <div className="host-shell">
          {/* merchant order summary */}
          <div>
            <h1 className="host-h1">Complete your order</h1>
            <p className="host-sub">Order #NW-4471 · Pay in USDT to confirm and ship.</p>
            <div className="host-summary">
              <div className="host-line">
                <span className="host-thumb" />
                <div><div className="nm">Aurora Field Jacket</div><div className="meta">Olive · M · Qty 1</div></div>
                <span className="amt">182.00</span>
              </div>
              <div className="host-line">
                <span className="host-thumb" />
                <div><div className="nm">Merino Base Layer</div><div className="meta">Charcoal · L · Qty 1</div></div>
                <span className="amt">54.00</span>
              </div>
              <div className="host-totals">
                <div className="host-trow"><span>Subtotal</span><span>236.00</span></div>
                <div className="host-trow"><span>Shipping</span><span>14.00</span></div>
                <div className="host-trow grand"><span>Total due</span><span className="v">250.00 USDT</span></div>
              </div>
            </div>
          </div>

          {/* embedded widget */}
          <div>
            <div className="host-pay-label">Pay with crypto</div>
            <Widget phase={phase} rejected={rejected} net={net} setNet={setNet} />
          </div>
        </div>

        {/* demo control dock */}
        <div className="cw-dock">
          <span className="lbl">State</span>
          <div className="cw-dock-seg">
            {[["awaiting","Awaiting",0],["detected","Detected",1],["screening","Screening",2],["confirmed","Settled",3]].map(([key,lab,p]) => (
              <button key={key} className={`cw-dock-btn${state===key?" on":""}`} onClick={() => goto(p)}>{lab}</button>
            ))}
            <button className={`cw-dock-btn bad${state==="rej"?" on":""}`} onClick={showReject}>Rejected</button>
          </div>
          <div className="cw-dock-div" />
          <button className={`cw-dock-play${playing?" stop":""}`} onClick={play}>
            {playing ? <><I.x size={14} /> Stop</> : <><I.refresh size={14} /> Play sequence</>}
          </button>
        </div>
      </div>
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
})();
