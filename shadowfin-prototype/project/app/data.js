/* ShadowFin — merchant portal sample data
   Model: ShadowFin never holds merchant funds. Each incoming payment is screened;
   clean payments are settled DIRECTLY on-chain to the merchant's own wallet via a
   licensed custodian. There is no account balance and no withdraw. */
(function () {
  const fmtUSDT = (n) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // riskState drives the small risk pill: clean (green) · screening (amber) · flagged (red)
  const riskState = (status) =>
    status === "Settled" ? "clean"
    : status === "Rejected" ? "flagged"
    : status === "Awaiting" ? null
    : "screening";

  // KPI tiles (this calendar month) — throughput + compliance, NOT a balance
  const kpis = {
    volume: "1.27M",        // USDT volume processed this month
    screened: "1,284",      // payments screened
    pctClean: "98.6%",      // share that passed screening
    settled: "1.18M",       // USDT auto-settled on-chain to the merchant's wallet
    held: { count: 3, amount: "51.8K" }, // held for review — flagged / pending decision
  };

  // Merchant's own payout wallets (where clean payments settle)
  const wallets = [
    { label: "Operating wallet", network: "TRON",     address: "TBxp9q2c1Vb8nXp4mQ1aLZ7wR3dFsk7d2", primary: true,  custodian: "Anchorage Digital" },
    { label: "Treasury wallet",  network: "Ethereum", address: "0xA9f3c1b9E2d74F0a5C6b3E18d9aF27c43c10", primary: false, custodian: "Anchorage Digital" },
  ];
  const walletFor = (network) => wallets.find((w) => w.network === network) || wallets[0];
  const shortAddr = (a) => (a ? a.slice(0, 6) + "…" + a.slice(-4) : "—");

  // Deterministic-looking on-chain tx hash from a seed
  const hashFor = (seed, network) => {
    let h = 0; for (let i = 0; i < seed.length; i++) h = (h * 131 + seed.charCodeAt(i)) >>> 0;
    const hex = (n) => { let s = ""; for (let i = 0; i < n; i++) { h = (h * 1103515245 + 12345) >>> 0; s += "0123456789abcdef"[(h >>> 8) & 15]; } return s; };
    return network === "Ethereum" ? "0x" + hex(64) : hex(64);
  };

  // Incoming customer payments (merchant is being paid in USDT)
  const payments = [
    { id: "PMT-30482", customer: "Lumen Apparel Co.", amount: 12480.00, network: "TRON",     status: "Settled",   risk: 3,  created: "Jun 26, 2026", time: "2 min ago",  ref: "ORD-7741",
      sanctions: "Clear", pep: "Clear", adverseMedia: "Clear", sourceWallet: "TJ9k…4mQ1", exposure: "Low", hops: 5,
      note: "Funds traced to a regulated exchange withdrawal. Clean provenance — settled to your wallet automatically." },
    { id: "PMT-30481", customer: "Bytewave SaaS",     amount: 2400.00,  network: "Ethereum", status: "Screening", risk: 18, created: "Jun 26, 2026", time: "6 min ago",  ref: "SUB-2208",
      sanctions: "Clear", pep: "Clear", adverseMedia: "Review", sourceWallet: "0x7a3f…b9e2", exposure: "Low", hops: 4,
      note: "One low-confidence adverse-media match on a similarly named entity. Settlement on hold until the check resolves." },
    { id: "PMT-30480", customer: "Halcyon Imports",   amount: 48200.00, network: "TRON",     status: "Detected",  risk: null, created: "Jun 26, 2026", time: "9 min ago", ref: "INV-0480",
      sanctions: "—", pep: "—", adverseMedia: "—", sourceWallet: "TQ4p…8nR2", exposure: "—", hops: null,
      note: "Deposit detected on-chain with 6 confirmations. KYT screening queued before any settlement." },
    { id: "PMT-30479", customer: "Cedar & Pine LLC",  amount: 860.00,   network: "TRON",     status: "Settled",   risk: 5,  created: "Jun 26, 2026", time: "24 min ago", ref: "ORD-7738",
      sanctions: "Clear", pep: "Clear", adverseMedia: "Clear", sourceWallet: "TR2v…1kP9", exposure: "Low", hops: 6,
      note: "Clean provenance. Forwarded on-chain to your operating wallet." },
    { id: "PMT-30478", customer: "Vantage Reseller",  amount: 9750.00,  network: "Ethereum", status: "Rejected",  risk: 82, created: "Jun 25, 2026", time: "Yesterday", ref: "ORD-7720",
      sanctions: "Hit", pep: "Clear", adverseMedia: "Hit", sourceWallet: "0x4c1a…7f08", exposure: "High", hops: 2,
      note: "Direct exposure to a wallet cluster linked to a sanctioned mixing service. Payment rejected — never settled and never held by ShadowFin." },
    { id: "PMT-30477", customer: "Mirano Foods",      amount: 3120.00,  network: "TRON",     status: "Settled",   risk: 6,  created: "Jun 25, 2026", time: "Yesterday", ref: "ORD-7715",
      sanctions: "Clear", pep: "Clear", adverseMedia: "Clear", sourceWallet: "TK8d…3wL4", exposure: "Low", hops: 5,
      note: "Clean provenance. Forwarded on-chain to your operating wallet." },
    { id: "PMT-30476", customer: "Orbit Hardware",    amount: 24900.00, network: "Ethereum", status: "Settled",   risk: 9,  created: "Jun 25, 2026", time: "Yesterday", ref: "INV-0476",
      sanctions: "Clear", pep: "Clear", adverseMedia: "Clear", sourceWallet: "0x9e22…1ac4", exposure: "Low", hops: 4,
      note: "Funds traced to a regulated custodian. Forwarded on-chain to your treasury wallet." },
    { id: "PMT-30475", customer: "Sable Studio",      amount: 540.00,   network: "TRON",     status: "Awaiting",  risk: null, created: "Jun 25, 2026", time: "Yesterday", ref: "ORD-7711",
      sanctions: "—", pep: "—", adverseMedia: "—", sourceWallet: null, exposure: "—", hops: null,
      note: "Checkout link opened. Waiting for the customer to send payment." },
    { id: "PMT-30474", customer: "Westbrook Trading", amount: 15600.00, network: "Ethereum", status: "Rejected",  risk: 76, created: "Jun 24, 2026", time: "2 days ago", ref: "INV-0474",
      sanctions: "Clear", pep: "Hit", adverseMedia: "Hit", sourceWallet: "0x2b88…d3f1", exposure: "High", hops: 3,
      note: "Beneficial owner matches a politically exposed person on two watchlists. Payment rejected and escalated — never settled." },
    { id: "PMT-30473", customer: "Nordic Goods AB",   amount: 7300.00,  network: "TRON",     status: "Settled",   risk: 4,  created: "Jun 24, 2026", time: "2 days ago", ref: "ORD-7702",
      sanctions: "Clear", pep: "Clear", adverseMedia: "Clear", sourceWallet: "TW5n…9bX1", exposure: "Low", hops: 5,
      note: "Clean provenance. Forwarded on-chain to your operating wallet." },
    { id: "PMT-30472", customer: "Pinecrest Media",   amount: 1180.00,  network: "Ethereum", status: "Screening", risk: 22, created: "Jun 24, 2026", time: "2 days ago", ref: "SUB-2199",
      sanctions: "Clear", pep: "Clear", adverseMedia: "Review", sourceWallet: "0x6f10…a2c7", exposure: "Medium", hops: 3,
      note: "Medium-exposure path through an unhosted wallet. Settlement pending KYT confirmation." },
    { id: "PMT-30471", customer: "Acme Trading Ltd.", amount: 248000.00, network: "TRON",    status: "Settled",   risk: 7,  created: "Jun 24, 2026", time: "2 days ago", ref: "INV-0471",
      sanctions: "Clear", pep: "Clear", adverseMedia: "Clear", sourceWallet: "TJ9k…4mQ1", exposure: "Low", hops: 6,
      note: "Large B2B settlement. Funds traced to a regulated exchange — clean. Forwarded on-chain to your operating wallet." },
  ];

  // Settlement detail for a cleared payment (forwarded on-chain to merchant wallet)
  const settleFor = (p) => {
    if (p.status !== "Settled") return null;
    const w = walletFor(p.network);
    const fee = p.network === "TRON" ? 1.00 : 3.20;
    return {
      id: "SET-" + p.id.replace("PMT-", "9"),
      dest: w,
      fee,
      net: p.amount - fee,
      hash: hashFor(p.id, p.network),
      custodian: w.custodian,
    };
  };

  // Settlement history (newest first) — each clean payment forwarded on-chain to the wallet
  const settlements = payments
    .filter((p) => p.status === "Settled")
    .map((p) => {
      const s = settleFor(p);
      return {
        id: s.id, src: p.id, customer: p.customer, amount: p.amount, net: s.net, fee: s.fee,
        network: p.network, dest: s.dest, hash: s.hash, date: p.created, time: p.time, status: "Settled",
      };
    });

  // Per-payment compliance audit ledger
  const auditFor = (p) => {
    const from = `${fmtUSDT(p.amount)} USDT from ${p.sourceWallet || "the customer"}`;
    if (p.status === "Awaiting")
      return [
        { t: "—", event: "Checkout link created", detail: `Deposit address issued · ${p.network}`, kind: "info" },
        { t: "—", event: "Awaiting payment", detail: "No deposit detected yet", kind: "info" },
      ];
    if (p.status === "Detected")
      return [
        { t: "09:14:02 UTC", event: "Payment detected", detail: from, kind: "info" },
        { t: "09:14:05 UTC", event: "KYT screening queued", detail: "Sanctions · PEP · Adverse media", kind: "info" },
      ];
    if (p.status === "Screening")
      return [
        { t: "08:51:10 UTC", event: "Payment detected", detail: from, kind: "info" },
        { t: "08:51:14 UTC", event: "KYT screening started", detail: "Sanctions · PEP · Adverse media", kind: "info" },
        { t: "08:51:29 UTC", event: "Awaiting decision", detail: `Provisional risk score ${p.risk} / 100`, kind: "info" },
      ];
    if (p.status === "Rejected")
      return [
        { t: "16:22:41 UTC", event: "Payment detected", detail: from, kind: "info" },
        { t: "16:22:46 UTC", event: "KYT screening started", detail: "Sanctions · PEP · Adverse media", kind: "info" },
        { t: "16:23:02 UTC", event: "Screening flagged", detail: `Risk score ${p.risk} / 100 — illicit-fund exposure`, kind: "risk" },
        { t: "16:23:03 UTC", event: "Payment rejected", detail: "Not settled · no funds held · escalated to compliance", kind: "risk" },
      ];
    const s = settleFor(p);
    return [
      { t: "14:02:11 UTC", event: "Payment detected", detail: from, kind: "info" },
      { t: "14:02:18 UTC", event: "KYT screening started", detail: "Sanctions · PEP · Adverse media", kind: "info" },
      { t: "14:02:31 UTC", event: "Screening passed", detail: `Risk score ${p.risk} / 100 — clean`, kind: "ok" },
      { t: "14:02:34 UTC", event: "Settled to your wallet", detail: `${fmtUSDT(s.net)} USDT forwarded → ${shortAddr(s.dest.address)}`, kind: "ok" },
    ];
  };

  // Screened volume, last 14 days (thousands USDT)
  const volume = [38, 42, 36, 51, 46, 60, 54, 41, 61, 72, 55, 79, 64, 84];

  const notifications = [
    { icon: "risk",  title: "Payment rejected — Vantage Reseller", body: "Sanctions hit on PMT-30478. Never settled, never held.", t: "1h",  tone: "risk" },
    { icon: "flag",  title: "Flagged — Westbrook Trading", body: "PEP match on PMT-30474. Held for review.", t: "2d", tone: "warn" },
    { icon: "check", title: "Settled to your wallet", body: "12,480 USDT forwarded on-chain to your operating wallet.", t: "2d", tone: "ok" },
  ];

  window.SF_DATA = {
    kpis, payments, settlements, wallets, volume, notifications,
    fmtUSDT, riskState, auditFor, settleFor, walletFor, shortAddr, hashFor,
  };
})();
