/* ShadowFin — INTERNAL operator console sample data
   This is the ShadowFin team's back office for the whole platform.
   "merchant" is a first-class entity threaded through every screen. */
(function () {
  const fmtUSDT = (n) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  // Compact money for KPI tiles ($7.36M, $880K)
  const fmtCompact = (n) => {
    if (n >= 1e6) return (n / 1e6).toFixed(2).replace(/\.?0+$/, "") + "M";
    if (n >= 1e3) return Math.round(n / 1e3) + "K";
    return String(n);
  };
  const shortAddr = (a) => (a ? a.slice(0, 6) + "…" + a.slice(-4) : "—");

  /* ---------- Merchant directory (first-class entity) ---------- */
  // status:   Active | Pending KYB | Suspended
  // tier:     Low | Medium | High   (null while under review)
  const merchants = [
    { id: "MER-1042", name: "Lumen Studio", legal: "Lumen Studio LLC", country: "United States", mcc: "5651 · Apparel & accessories",
      status: "Active", tier: "Low", volume30d: 1270000, screened: 1284, pctClean: 98.6, flagged30d: 3,
      network: "TRON", wallet: "TBxp9q2c1Vb8nXp4mQ1aLZ7wR3dFsk7d2", custodian: "Anchorage Digital",
      joined: "Jan 14, 2026", owner: "Dana Reyes", riskScore: 11 },
    { id: "MER-1039", name: "Acme Trading Ltd.", legal: "Acme Trading Limited", country: "United Kingdom", mcc: "5045 · B2B wholesale",
      status: "Active", tier: "Low", volume30d: 2480000, screened: 642, pctClean: 99.1, flagged30d: 1,
      network: "TRON", wallet: "TJ9k4mQ1aLZ7wR3dFsk7d2Bxp9q2c1Vb8n", custodian: "Anchorage Digital",
      joined: "Nov 02, 2025", owner: "Marcus Hale", riskScore: 9 },
    { id: "MER-1051", name: "Northwind Commerce", legal: "Northwind Commerce Inc.", country: "Canada", mcc: "5999 · General retail",
      status: "Active", tier: "Low", volume30d: 880000, screened: 904, pctClean: 98.9, flagged30d: 2,
      network: "Ethereum", wallet: "0xA9f3c1b9E2d74F0a5C6b3E18d9aF27c43c10", custodian: "Anchorage Digital",
      joined: "Dec 11, 2025", owner: "Priya Anand", riskScore: 14 },
    { id: "MER-1047", name: "Halcyon Imports", legal: "Halcyon Imports S.A.", country: "Portugal", mcc: "5912 · Import / distribution",
      status: "Active", tier: "Medium", volume30d: 645000, screened: 488, pctClean: 96.2, flagged30d: 6,
      network: "TRON", wallet: "TQ4p8nR2BxV1aLZ7wR3dFsk7d2c1q9p9k4m", custodian: "Anchorage Digital",
      joined: "Feb 03, 2026", owner: "Tomás Ferreira", riskScore: 38 },
    { id: "MER-1044", name: "Bytewave SaaS", legal: "Bytewave Technologies Inc.", country: "United States", mcc: "5734 · Software / SaaS",
      status: "Active", tier: "Medium", volume30d: 420000, screened: 1190, pctClean: 97.4, flagged30d: 5,
      network: "Ethereum", wallet: "0x7a3fb9e2d10a2c76f3E18d9aF27c43c10A9f3", custodian: "Anchorage Digital",
      joined: "Jan 28, 2026", owner: "Erin Cole", riskScore: 31 },
    { id: "MER-1036", name: "Orbit Hardware", legal: "Orbit Hardware Co.", country: "Germany", mcc: "5722 · Electronics retail",
      status: "Active", tier: "Low", volume30d: 312000, screened: 356, pctClean: 99.4, flagged30d: 0,
      network: "Ethereum", wallet: "0x9e221ac43c10A9f3c1b9E2d74F0a5C6b3E18d", custodian: "Anchorage Digital",
      joined: "Oct 19, 2025", owner: "Lukas Brandt", riskScore: 8 },
    { id: "MER-1053", name: "Pinecrest Media", legal: "Pinecrest Media LLC", country: "United States", mcc: "5815 · Digital media",
      status: "Active", tier: "Medium", volume30d: 156000, screened: 612, pctClean: 95.1, flagged30d: 7,
      network: "Ethereum", wallet: "0x6f10a2c76f3E18d9aF27c43c10A9f3c1b9E2d", custodian: "Anchorage Digital",
      joined: "Mar 22, 2026", owner: "Sasha Kim", riskScore: 44 },
    { id: "MER-1031", name: "Nordic Goods AB", legal: "Nordic Goods AB", country: "Sweden", mcc: "5651 · Apparel & accessories",
      status: "Active", tier: "Low", volume30d: 198000, screened: 274, pctClean: 99.0, flagged30d: 1,
      network: "TRON", wallet: "TW5n9bX1aLZ7wR3dFsk7d2c1q9p9k4mQ1Bxp", custodian: "Anchorage Digital",
      joined: "Sep 30, 2025", owner: "Elin Sundqvist", riskScore: 12 },
    /* ---- Pending KYB — these appear in the Approvals queue ---- */
    { id: "MER-1058", name: "Meridian Tradeco", legal: "Meridian Trading Company FZE", country: "United Arab Emirates", mcc: "5045 · B2B wholesale",
      status: "Pending KYB", tier: null, volume30d: 0, screened: 0, pctClean: null, flagged30d: 0,
      network: "TRON", wallet: "TZ8c1q9p9k4mQ1BxpaLZ7wR3dFsk7d2V1aLn", custodian: "Anchorage Digital (pending)",
      joined: "Jun 21, 2026", owner: "Rashid Al-Mansoori", riskScore: null },
    { id: "MER-1059", name: "Sable Studio", legal: "Sable Creative Studio Ltd.", country: "United States", mcc: "7333 · Creative services",
      status: "Pending KYB", tier: null, volume30d: 0, screened: 0, pctClean: null, flagged30d: 0,
      network: "TRON", wallet: "TR2v1kP9aLZ7wR3dFsk7d2c1q9p9k4mQ1Bxp", custodian: "Anchorage Digital (pending)",
      joined: "Jun 24, 2026", owner: "Noah Whitfield", riskScore: null },
    { id: "MER-1060", name: "Cobalt Freight Ltd.", legal: "Cobalt Freight & Logistics Ltd.", country: "Cyprus", mcc: "4214 · Freight / logistics",
      status: "Pending KYB", tier: null, volume30d: 0, screened: 0, pctClean: null, flagged30d: 0,
      network: "Ethereum", wallet: "0x2b88d3f13c10A9f3c1b9E2d74F0a5C6b3E18", custodian: "Anchorage Digital (pending)",
      joined: "Jun 25, 2026", owner: "Dimitris Pavlou", riskScore: null },
    /* ---- Suspended ---- */
    { id: "MER-1018", name: "Vantage Reseller", legal: "Vantage Reseller Group", country: "Seychelles", mcc: "5999 · General retail",
      status: "Suspended", tier: "High", volume30d: 0, screened: 214, pctClean: 71.0, flagged30d: 12,
      network: "Ethereum", wallet: "0x4c1a7f083c10A9f3c1b9E2d74F0a5C6b3E18", custodian: "—",
      joined: "Aug 08, 2025", owner: "(undisclosed)", riskScore: 82 },
    { id: "MER-1009", name: "Westbrook Trading", legal: "Westbrook Trading LLC", country: "Marshall Islands", mcc: "5045 · B2B wholesale",
      status: "Suspended", tier: "High", volume30d: 0, screened: 168, pctClean: 64.3, flagged30d: 9,
      network: "Ethereum", wallet: "0x2b88d3f1aLZ3c10A9f3c1b9E2d74F0a5C6b3", custodian: "—",
      joined: "Jul 15, 2025", owner: "(undisclosed)", riskScore: 76 },
  ];
  const merchantById = (id) => merchants.find((m) => m.id === id);
  const merchantByName = (n) => merchants.find((m) => m.name === n);

  /* ---------- Platform-wide KPIs (this calendar month) ---------- */
  const totalVolume = merchants.reduce((s, m) => s + m.volume30d, 0);
  const activeCount = merchants.filter((m) => m.status === "Active").length;
  const pendingCount = merchants.filter((m) => m.status === "Pending KYB").length;
  const suspendedCount = merchants.filter((m) => m.status === "Suspended").length;
  const totalScreened = merchants.reduce((s, m) => s + m.screened, 0);
  const totalFlagged = merchants.reduce((s, m) => s + m.flagged30d, 0);

  const kpis = {
    activeMerchants: activeCount,
    pendingApproval: pendingCount,
    suspended: suspendedCount,
    volume: fmtCompact(totalVolume),       // total USDT processed across ALL merchants
    passRate: "97.9%",                      // platform screening pass rate
    flaggedThisMonth: totalFlagged,
    screened: totalScreened,
  };

  // Platform volume trend — last 14 days, USDT thousands
  const volumeTrend = [186, 204, 172, 248, 221, 295, 264, 212, 308, 351, 277, 392, 318, 437];

  /* ---------- Recent flagged payments — span ALL merchants ---------- */
  // reason categories surface in the Screening screen
  const flaggedPayments = [
    { id: "PMT-30478", merchant: "Vantage Reseller", amount: 9750.00, network: "Ethereum", risk: 82,
      sanctions: "Hit", pep: "Clear", adverseMedia: "Hit", reason: "Sanctioned mixer exposure", time: "1h ago",
      exposure: "High", hops: 2, decision: "Rejected", note: "Direct exposure to a wallet cluster linked to a sanctioned mixing service." },
    { id: "PMT-30474", merchant: "Westbrook Trading", amount: 15600.00, network: "Ethereum", risk: 76,
      sanctions: "Clear", pep: "Hit", adverseMedia: "Hit", reason: "PEP / adverse media", time: "2h ago",
      exposure: "High", hops: 3, decision: "Rejected", note: "Beneficial owner matches a politically exposed person on two watchlists." },
    { id: "PMT-30491", merchant: "Pinecrest Media", amount: 4180.00, network: "Ethereum", risk: 58,
      sanctions: "Clear", pep: "Clear", adverseMedia: "Review", reason: "Adverse media review", time: "3h ago",
      exposure: "Medium", hops: 3, decision: "Under review", note: "Two medium-confidence adverse-media articles on a related entity." },
    { id: "PMT-30488", merchant: "Halcyon Imports", amount: 22400.00, network: "TRON", risk: 54,
      sanctions: "Clear", pep: "Clear", adverseMedia: "Review", reason: "High-risk jurisdiction", time: "5h ago",
      exposure: "Medium", hops: 4, decision: "Under review", note: "Funds routed through an exchange in a FATF grey-list jurisdiction." },
    { id: "PMT-30485", merchant: "Bytewave SaaS", amount: 2400.00, network: "Ethereum", risk: 49,
      sanctions: "Clear", pep: "Clear", adverseMedia: "Review", reason: "Adverse media review", time: "6h ago",
      exposure: "Medium", hops: 4, decision: "Under review", note: "Low-confidence adverse-media match on a similarly named entity." },
    { id: "PMT-30470", merchant: "Pinecrest Media", amount: 6920.00, network: "Ethereum", risk: 61,
      sanctions: "Clear", pep: "Clear", adverseMedia: "Hit", reason: "Adverse media hit", time: "1d ago",
      exposure: "High", hops: 2, decision: "Rejected", note: "Confirmed adverse-media on the source wallet operator." },
    { id: "PMT-30462", merchant: "Halcyon Imports", amount: 18800.00, network: "TRON", risk: 52,
      sanctions: "Clear", pep: "Clear", adverseMedia: "Review", reason: "Unhosted wallet path", time: "1d ago",
      exposure: "Medium", hops: 5, decision: "Cleared", note: "Medium-exposure path through an unhosted wallet — cleared after manual review." },
  ];

  /* ---------- KYB review queue (Approvals) — pending merchants ---------- */
  // entity + owner sanctions / adverse-media screens; full submission detail
  const kybQueue = [
    {
      merchantId: "MER-1058",
      submitted: "Jun 21, 2026", waiting: "6 days", priority: "Standard",
      expectedVolume: "250K–500K / mo", entityScore: 41,
      details: {
        registration: "FZE · UAE Free Zone", regNo: "DMCC-184402", incorporated: "Mar 2022",
        category: "5045 · B2B wholesale", website: "meridiantradeco.ae", contact: "ops@meridiantradeco.ae",
      },
      documents: [
        { name: "Certificate of incorporation", status: "Verified", kind: "Registry" },
        { name: "Trade license (DMCC)", status: "Verified", kind: "License" },
        { name: "Proof of address — registered office", status: "Verified", kind: "Address" },
        { name: "Bank reference letter", status: "Review", kind: "Banking" },
        { name: "Source-of-funds declaration", status: "Verified", kind: "AML" },
      ],
      entityScreen: { sanctions: "Clear", adverseMedia: "Review", pep: "Clear" },
      entityNote: "One low-confidence adverse-media article referencing a delayed-shipment dispute in 2023. Not AML-related.",
      owners: [
        { name: "Rashid Al-Mansoori", role: "Director · 60%", country: "UAE", dob: "1981", sanctions: "Clear", pep: "Clear", adverseMedia: "Clear" },
        { name: "Yusuf Haddad", role: "Shareholder · 40%", country: "UAE", dob: "1979", sanctions: "Clear", pep: "Clear", adverseMedia: "Review" },
      ],
    },
    {
      merchantId: "MER-1059",
      submitted: "Jun 24, 2026", waiting: "3 days", priority: "Fast-track",
      expectedVolume: "10K–50K / mo", entityScore: 14,
      details: {
        registration: "LLC · Delaware", regNo: "DE-7741902", incorporated: "Jan 2024",
        category: "7333 · Creative services", website: "sablestudio.co", contact: "noah@sablestudio.co",
      },
      documents: [
        { name: "Certificate of formation", status: "Verified", kind: "Registry" },
        { name: "EIN confirmation letter", status: "Verified", kind: "Tax" },
        { name: "Proof of address — principal place", status: "Verified", kind: "Address" },
        { name: "Government ID — beneficial owner", status: "Verified", kind: "Identity" },
        { name: "Source-of-funds declaration", status: "Verified", kind: "AML" },
      ],
      entityScreen: { sanctions: "Clear", adverseMedia: "Clear", pep: "Clear" },
      entityNote: "No sanctions, PEP, or adverse-media matches on the entity. All documents verified.",
      owners: [
        { name: "Noah Whitfield", role: "Sole owner · 100%", country: "United States", dob: "1990", sanctions: "Clear", pep: "Clear", adverseMedia: "Clear" },
      ],
    },
    {
      merchantId: "MER-1060",
      submitted: "Jun 25, 2026", waiting: "2 days", priority: "Enhanced DD",
      expectedVolume: "500K–1M / mo", entityScore: 67,
      details: {
        registration: "Ltd · Cyprus", regNo: "HE-409218", incorporated: "Nov 2023",
        category: "4214 · Freight / logistics", website: "cobaltfreight.eu", contact: "compliance@cobaltfreight.eu",
      },
      documents: [
        { name: "Certificate of incorporation", status: "Verified", kind: "Registry" },
        { name: "Shareholder register", status: "Review", kind: "Ownership" },
        { name: "Proof of address — registered office", status: "Verified", kind: "Address" },
        { name: "Source-of-funds declaration", status: "Missing", kind: "AML" },
        { name: "Beneficial ownership chart", status: "Missing", kind: "Ownership" },
      ],
      entityScreen: { sanctions: "Clear", adverseMedia: "Hit", pep: "Review" },
      entityNote: "Confirmed adverse-media tying a former affiliate to a 2024 trade-based money-laundering investigation. Ownership chain is opaque — two layers undisclosed.",
      owners: [
        { name: "Dimitris Pavlou", role: "Director · 55%", country: "Cyprus", dob: "1975", sanctions: "Clear", pep: "Review", adverseMedia: "Hit" },
        { name: "Holding nominee — Aster Capital", role: "Corporate shareholder · 45%", country: "Malta", dob: "—", sanctions: "Clear", pep: "Clear", adverseMedia: "Review" },
      ],
    },
  ];
  const kybByMerchant = (id) => kybQueue.find((k) => k.merchantId === id);

  /* ---------- Platform-wide settlements (operator view) ---------- */
  const settlements = [
    { id: "SET-99021", merchant: "Acme Trading Ltd.", amount: 248000.00, fee: 1.00, network: "TRON", wallet: "TJ9k4mQ1aLZ7wR3dFsk7d2Bxp9q2c1Vb8n", hash: "a91f3c0d77be4421ef0aa9b3c10a9f3c1b9e2d74f0a5c6b3e18d9af27c43c10a", date: "Jun 26, 2026", status: "Settled" },
    { id: "SET-99020", merchant: "Lumen Studio", amount: 12480.00, fee: 1.00, network: "TRON", wallet: "TBxp9q2c1Vb8nXp4mQ1aLZ7wR3dFsk7d2", hash: "3d77be4421ef0aa9b3c10a9f3c1b9e2d74f0a5c6b3e18d9af27c43c10aa91f3c", date: "Jun 26, 2026", status: "Settled" },
    { id: "SET-99019", merchant: "Northwind Commerce", amount: 31200.00, fee: 3.20, network: "Ethereum", wallet: "0xA9f3c1b9E2d74F0a5C6b3E18d9aF27c43c10", hash: "0xbe4421ef0aa9b3c10a9f3c1b9e2d74f0a5c6b3e18d9af27c43c10aa91f3c0d77", date: "Jun 26, 2026", status: "Settled" },
    { id: "SET-99018", merchant: "Orbit Hardware", amount: 24900.00, fee: 3.20, network: "Ethereum", wallet: "0x9e221ac43c10A9f3c1b9E2d74F0a5C6b3E18d", hash: "0x21ef0aa9b3c10a9f3c1b9e2d74f0a5c6b3e18d9af27c43c10aa91f3c0d77be44", date: "Jun 25, 2026", status: "Settled" },
    { id: "SET-99017", merchant: "Nordic Goods AB", amount: 7300.00, fee: 1.00, network: "TRON", wallet: "TW5n9bX1aLZ7wR3dFsk7d2c1q9p9k4mQ1Bxp", hash: "ef0aa9b3c10a9f3c1b9e2d74f0a5c6b3e18d9af27c43c10aa91f3c0d77be4421", date: "Jun 25, 2026", status: "Settled" },
    { id: "SET-99016", merchant: "Halcyon Imports", amount: 18800.00, fee: 1.00, network: "TRON", wallet: "TQ4p8nR2BxV1aLZ7wR3dFsk7d2c1q9p9k4m", hash: "aa9b3c10a9f3c1b9e2d74f0a5c6b3e18d9af27c43c10aa91f3c0d77be4421ef0", date: "Jun 25, 2026", status: "Settled" },
    { id: "SET-99015", merchant: "Bytewave SaaS", amount: 2396.80, fee: 3.20, network: "Ethereum", wallet: "0x7a3fb9e2d10a2c76f3E18d9aF27c43c10A9f3", hash: "0xc10a9f3c1b9e2d74f0a5c6b3e18d9af27c43c10aa91f3c0d77be4421ef0aa9b3", date: "Jun 24, 2026", status: "Settled" },
    { id: "SET-99014", merchant: "Pinecrest Media", amount: 1180.00, fee: 3.20, network: "Ethereum", wallet: "0x6f10a2c76f3E18d9aF27c43c10A9f3c1b9E2d", hash: "0x9f3c1b9e2d74f0a5c6b3e18d9af27c43c10aa91f3c0d77be4421ef0aa9b3c10a", date: "Jun 24, 2026", status: "Held" },
  ];

  /* ---------- Audit log — immutable compliance record across ALL merchants ----------
     category:  KYB | Screening | Lifecycle
     Every KYB approval/rejection and every screening decision writes one row.
     Two rejected applicants (MER-1052, MER-1055) never became live merchants —
     they exist only here, which is the point of a retained audit trail. */
  const auditLog = [
    { id: "AUD-44219", t: "Jun 27, 2026", clock: "09:42 UTC", actor: "Priya Anand", role: "Compliance", category: "KYB", action: "Merchant approved", target: "Northwind Commerce", targetId: "MER-1051", kind: "ok", reason: "All entity and beneficial-owner checks cleared", detail: "KYB review passed · risk tier set to Low · entity + 1 owner cleared · 6 documents verified" },
    { id: "AUD-44218", t: "Jun 27, 2026", clock: "09:18 UTC", actor: "System", role: "Screening engine", category: "Screening", action: "Payment flagged", target: "Pinecrest Media", targetId: "MER-1053", kind: "warn", reason: "Adverse-media review match · risk 58/100", detail: "PMT-30491 · two medium-confidence adverse-media articles on a related entity · routed to manual review" },
    { id: "AUD-44217", t: "Jun 26, 2026", clock: "17:51 UTC", actor: "Marcus Hale", role: "Risk", category: "Lifecycle", action: "Merchant suspended", target: "Vantage Reseller", targetId: "MER-1018", kind: "risk", reason: "Repeated sanctions exposure · 12 flagged payments in 30d", detail: "Settlements halted · merchant moved to Suspended · escalated to MLRO" },
    { id: "AUD-44216", t: "Jun 26, 2026", clock: "16:23 UTC", actor: "System", role: "Screening engine", category: "Screening", action: "Payment rejected", target: "Vantage Reseller", targetId: "MER-1018", kind: "risk", reason: "Direct exposure to a sanctioned mixing service", detail: "PMT-30478 · risk 82/100 · funds never settled, never held · auto-returned to sender" },
    { id: "AUD-44215", t: "Jun 26, 2026", clock: "14:09 UTC", actor: "Erin Cole", role: "Compliance", category: "KYB", action: "More info requested", target: "Cobalt Freight Ltd.", targetId: "MER-1060", kind: "warn", reason: "Source-of-funds declaration + beneficial-ownership chart missing", detail: "KYB placed on hold · applicant notified · ownership chain opaque (2 undisclosed layers)" },
    { id: "AUD-44214", t: "Jun 26, 2026", clock: "11:37 UTC", actor: "Priya Anand", role: "Compliance", category: "KYB", action: "Merchant approved", target: "Nordic Goods AB", targetId: "MER-1031", kind: "ok", reason: "Standard DD passed · low-risk apparel merchant", detail: "Risk tier set to Low · entity + sole owner cleared" },
    { id: "AUD-44213", t: "Jun 25, 2026", clock: "15:02 UTC", actor: "Marcus Hale", role: "Risk", category: "Lifecycle", action: "Risk tier changed", target: "Pinecrest Media", targetId: "MER-1053", kind: "info", reason: "Elevated adverse-media flag rate (7 in 30d)", detail: "Risk tier raised Low → Medium · enhanced monitoring enabled" },
    { id: "AUD-44212", t: "Jun 25, 2026", clock: "10:48 UTC", actor: "System", role: "Screening engine", category: "Lifecycle", action: "Merchant auto-suspended", target: "Westbrook Trading", targetId: "MER-1009", kind: "risk", reason: "Beneficial owner PEP + adverse-media confirmed", detail: "Auto-suspended pending review · settlements halted · routed to compliance" },
    { id: "AUD-44211", t: "Jun 24, 2026", clock: "13:20 UTC", actor: "Erin Cole", role: "Compliance", category: "Screening", action: "Payment cleared", target: "Halcyon Imports", targetId: "MER-1047", kind: "ok", reason: "Unhosted-wallet path cleared after manual review", detail: "PMT-30462 · medium-exposure path reviewed and released · settled" },
    { id: "AUD-44210", t: "Jun 24, 2026", clock: "09:55 UTC", actor: "System", role: "Screening engine", category: "Screening", action: "Payment flagged", target: "Halcyon Imports", targetId: "MER-1047", kind: "warn", reason: "Funds routed through a FATF grey-list jurisdiction", detail: "PMT-30488 · high-risk jurisdiction · risk 54/100 · routed to manual review" },
    { id: "AUD-44209", t: "Jun 23, 2026", clock: "16:40 UTC", actor: "Priya Anand", role: "Compliance", category: "KYB", action: "Merchant rejected", target: "Atlas Bullion DMCC", targetId: "MER-1055", kind: "risk", reason: "Undisclosed ownership layers · source of funds unverifiable", detail: "Application declined · two ownership layers behind nominee holdings could not be resolved" },
    { id: "AUD-44208", t: "Jun 23, 2026", clock: "11:12 UTC", actor: "Erin Cole", role: "Compliance", category: "Screening", action: "Payment cleared", target: "Bytewave SaaS", targetId: "MER-1044", kind: "ok", reason: "Low-confidence adverse-media match dismissed", detail: "PMT-30485 · similarly named entity ruled out · released and settled" },
    { id: "AUD-44207", t: "Jun 22, 2026", clock: "14:30 UTC", actor: "Marcus Hale", role: "Risk", category: "Lifecycle", action: "Risk tier changed", target: "Halcyon Imports", targetId: "MER-1047", kind: "info", reason: "Import/distribution profile · cross-border exposure", detail: "Risk tier raised Low → Medium · placed under enhanced monitoring" },
    { id: "AUD-44206", t: "Jun 21, 2026", clock: "10:05 UTC", actor: "Priya Anand", role: "Compliance", category: "KYB", action: "Merchant approved", target: "Bytewave SaaS", targetId: "MER-1044", kind: "ok", reason: "Standard DD passed · SaaS merchant, US-incorporated", detail: "Risk tier set to Medium · entity + sole owner cleared" },
    { id: "AUD-44205", t: "Jun 20, 2026", clock: "15:48 UTC", actor: "System", role: "Screening engine", category: "Screening", action: "Payment rejected", target: "Westbrook Trading", targetId: "MER-1009", kind: "risk", reason: "Beneficial owner matches a PEP on two watchlists", detail: "PMT-30474 · risk 76/100 · funds returned · flagged for lifecycle review" },
    { id: "AUD-44204", t: "Jun 19, 2026", clock: "12:22 UTC", actor: "Erin Cole", role: "Compliance", category: "KYB", action: "Merchant approved", target: "Halcyon Imports", targetId: "MER-1047", kind: "ok", reason: "Enhanced DD passed · one adverse-media article cleared with monitoring", detail: "Risk tier set to Medium · entity cleared · single owner cleared" },
    { id: "AUD-44203", t: "Jun 18, 2026", clock: "09:30 UTC", actor: "System", role: "Screening engine", category: "Screening", action: "Payment flagged", target: "Pinecrest Media", targetId: "MER-1053", kind: "warn", reason: "Confirmed adverse-media on source-wallet operator", detail: "PMT-30470 · risk 61/100 · routed to manual review · later rejected" },
    { id: "AUD-44202", t: "Jun 17, 2026", clock: "16:10 UTC", actor: "Marcus Hale", role: "Risk", category: "KYB", action: "Merchant rejected", target: "Pelagic Holdings Ltd.", targetId: "MER-1052", kind: "risk", reason: "Sanctions hit on a beneficial owner", detail: "Application declined · OFAC SDN match on a 30% shareholder · escalated to MLRO and recorded" },
    { id: "AUD-44201", t: "Jun 16, 2026", clock: "11:00 UTC", actor: "Priya Anand", role: "Compliance", category: "KYB", action: "Merchant approved", target: "Lumen Studio", targetId: "MER-1042", kind: "ok", reason: "Standard DD passed · low-risk apparel merchant", detail: "Risk tier set to Low · entity + sole owner cleared · 6 documents verified" },
    { id: "AUD-44200", t: "Jun 15, 2026", clock: "14:45 UTC", actor: "System", role: "Screening engine", category: "Screening", action: "Payment cleared", target: "Acme Trading Ltd.", targetId: "MER-1039", kind: "ok", reason: "All checks clear · standard B2B settlement", detail: "PMT-30401 · risk 9/100 · settled same day" },
  ];

  const auditMeta = {
    retention: "7 years",
    standard: "FinCEN · 31 CFR 1010.430 record-keeping",
    totalRecords: "2,418,704",
    oldest: "Aug 12, 2019",
    immutable: true,
  };

  /* ---------- Per-merchant derived records (built so every detail page is complete) ---------- */
  const REVIEWERS = [["Priya Anand", "Compliance"], ["Erin Cole", "Compliance"], ["Marcus Hale", "Risk"]];
  const idHash = (s) => { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 9973; return h; };
  const reviewerFor = (m) => REVIEWERS[idHash(m.id) % 3];
  const monthsSince = (dateStr) => {
    const d = new Date(dateStr), now = new Date("2026-06-27");
    return Math.max(1, Math.round((now - d) / (1000 * 60 * 60 * 24 * 30.44)));
  };

  const entityChecksFor = (m) => {
    if (m.status === "Suspended") return { sanctions: "Review", pep: "Clear", adverseMedia: "Hit" };
    if (m.tier === "Medium") return { sanctions: "Clear", pep: "Clear", adverseMedia: "Review" };
    return { sanctions: "Clear", pep: "Clear", adverseMedia: "Clear" };
  };
  const ownersFor = (m) => {
    if (m.owner === "(undisclosed)")
      return [{ name: "Beneficial owner — undisclosed", role: "Ownership chain opaque", country: m.country, sanctions: "Review", pep: "Hit", adverseMedia: "Hit" }];
    return [{ name: m.owner, role: "Director · majority holder", country: m.country, sanctions: "Clear", pep: "Clear", adverseMedia: m.tier === "Medium" ? "Review" : "Clear" }];
  };
  const docsFor = (m) => ([
    { name: "Certificate of incorporation", kind: "Registry", status: "Verified" },
    { name: "Business registration / trade license", kind: "License", status: "Verified" },
    { name: "Proof of registered address", kind: "Address", status: "Verified" },
    { name: "Beneficial ownership declaration", kind: "Ownership", status: m.status === "Suspended" ? "Flagged" : "Verified" },
    { name: "Government ID — beneficial owner", kind: "Identity", status: "Verified" },
    { name: "Source-of-funds declaration", kind: "AML", status: "Verified" },
  ].map((d) => ({ ...d, uploaded: m.joined })));

  const KYB_NOTES = {
    "MER-1018": "Approved at onboarding (Aug 2025) under standard due diligence. Suspended Jun 26, 2026 after 12 flagged payments in 30 days and confirmed exposure to a sanctioned mixing service. KYB record retained.",
    "MER-1009": "Auto-suspended Jun 25, 2026 after a beneficial owner matched a politically-exposed-person entry and adverse-media on two watchlists. Pending MLRO review.",
    "MER-1047": "Enhanced due diligence. One adverse-media article referencing a related entity was reviewed and cleared with ongoing monitoring; risk tier set to Medium.",
  };
  const CLOCKS = ["09:14 UTC", "11:04 UTC", "13:22 UTC", "14:32 UTC", "16:20 UTC"];

  function kybFor(m) {
    if (m.status === "Pending KYB") {
      const q = kybByMerchant(m.id);
      return {
        status: "Pending", decision: "Awaiting decision", method: q ? q.priority : "Standard DD",
        reviewer: null, reviewerRole: null, decidedAt: null, submitted: q ? q.submitted : m.joined,
        entityScore: q ? q.entityScore : m.riskScore,
        checks: q ? q.entityScreen : entityChecksFor(m),
        documents: q ? q.documents.map((d) => ({ ...d, uploaded: q.submitted })) : docsFor(m),
        owners: q ? q.owners : ownersFor(m),
        note: q ? q.entityNote : "KYB submission received and queued for review.",
      };
    }
    const [reviewer, reviewerRole] = reviewerFor(m);
    const suspended = m.status === "Suspended";
    return {
      status: suspended ? "Approved · later suspended" : "Approved",
      decision: suspended ? "Approved, later suspended" : "Approved",
      method: m.tier === "Medium" || suspended ? "Enhanced DD" : "Standard DD",
      reviewer, reviewerRole,
      decidedAt: m.joined + " · " + CLOCKS[idHash(m.id) % CLOCKS.length],
      submitted: m.joined, entityScore: m.riskScore,
      checks: entityChecksFor(m), documents: docsFor(m), owners: ownersFor(m),
      note: KYB_NOTES[m.id] || "All entity and beneficial-owner checks cleared at onboarding. Approved for live processing.",
    };
  }

  // Recent payments for a merchant — merges settled records + flagged screening events
  function paymentsFor(name) {
    const out = [];
    settlements.filter((s) => s.merchant === name).forEach((s) =>
      out.push({ id: s.id, amount: s.amount, network: s.network, risk: idHash(s.id) % 14 + 4, status: s.status, when: s.date, src: "settlement" }));
    flaggedPayments.filter((p) => p.merchant === name).forEach((p) =>
      out.push({ id: p.id, amount: p.amount, network: p.network, risk: p.risk, status: p.decision, when: p.time, src: "flag" }));
    return out;
  }

  function statsFor(m) {
    const tenure = monthsSince(m.joined);
    const lifetime = Math.round(m.volume30d * Math.max(1, tenure * 0.82));
    const avg = m.screened ? Math.round(m.volume30d / Math.max(1, m.screened * 0.62)) : 0;
    const settledCount = settlements.filter((s) => s.merchant === m.name).length;
    return { tenure, lifetime, avg, settledCount };
  }

  window.OP_DATA = {
    merchants, merchantById, merchantByName,
    kpis, volumeTrend, flaggedPayments, kybQueue, kybByMerchant, settlements, auditLog, auditMeta,
    totalVolume, activeCount, pendingCount, suspendedCount, totalScreened, totalFlagged,
    kybFor, paymentsFor, statsFor, monthsSince,
    fmtUSDT, fmtCompact, shortAddr,
  };
})();
