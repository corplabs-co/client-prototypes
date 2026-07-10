/* ShadowFin — thin outline geometric icon set */
(function () {
  const S = ({ children, size = 20, sw = 1.6, ...p }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" {...p}>
      {children}
    </svg>
  );

  const Icon = {
    dashboard: (p) => <S {...p}><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="11" width="7" height="10" rx="1.5"/><rect x="3" y="15" width="7" height="6" rx="1.5"/></S>,
    invoicing: (p) => <S {...p}><path d="M6 3h9l4 4v14a0 0 0 0 1 0 0H6z" /><path d="M14 3v5h5"/><path d="M9 13h6M9 17h4"/></S>,
    screening: (p) => <S {...p}><path d="M12 3l7 3v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6z"/><path d="M9 11.5l2 2 3.5-4"/></S>,
    treasury: (p) => <S {...p}><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M3 10h18"/><path d="M7 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/><circle cx="12" cy="14.5" r="1.6"/></S>,
    compliance: (p) => <S {...p}><path d="M9 4h6l1 2h3v14H5V6h3z"/><path d="M9 4a3 3 0 0 0 6 0"/><path d="M8.5 13l2 2 4-4"/></S>,
    reports: (p) => <S {...p}><path d="M5 21V5a2 2 0 0 1 2-2h7l5 5v13z"/><path d="M14 3v5h5"/><path d="M8 16v-3M12 16v-5M16 16v-2"/></S>,
    settings: (p) => <S {...p}><circle cx="12" cy="12" r="3"/><path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8L6 18M18 6l1.8-1.8"/></S>,
    search: (p) => <S {...p}><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.2-3.2"/></S>,
    bell: (p) => <S {...p}><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z"/><path d="M10 19a2 2 0 0 0 4 0"/></S>,
    plus: (p) => <S {...p}><path d="M12 5v14M5 12h14"/></S>,
    chevronDown: (p) => <S {...p}><path d="M6 9l6 6 6-6"/></S>,
    chevronRight: (p) => <S {...p}><path d="M9 6l6 6-6 6"/></S>,
    chevronLeft: (p) => <S {...p}><path d="M15 6l-6 6 6 6"/></S>,
    arrowUp: (p) => <S {...p}><path d="M12 19V5M6 11l6-6 6 6"/></S>,
    arrowDown: (p) => <S {...p}><path d="M12 5v14M6 13l6 6 6-6"/></S>,
    check: (p) => <S {...p}><path d="M5 12.5l4.5 4.5L19 7"/></S>,
    checkCircle: (p) => <S {...p}><circle cx="12" cy="12" r="9"/><path d="M8.5 12.5l2.5 2.5 4.5-5"/></S>,
    info: (p) => <S {...p}><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></S>,
    warn: (p) => <S {...p}><path d="M12 3l9 16H3z"/><path d="M12 9v4M12 16h.01"/></S>,
    risk: (p) => <S {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h.01"/></S>,
    flag: (p) => <S {...p}><path d="M6 21V4M6 4h11l-2 3 2 3H6"/></S>,
    download: (p) => <S {...p}><path d="M12 4v10M8 11l4 4 4-4"/><path d="M5 19h14"/></S>,
    share: (p) => <S {...p}><circle cx="6" cy="12" r="2.5"/><circle cx="17" cy="6" r="2.5"/><circle cx="17" cy="18" r="2.5"/><path d="M8.2 10.8l6.6-3.6M8.2 13.2l6.6 3.6"/></S>,
    copy: (p) => <S {...p}><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/></S>,
    wallet: (p) => <S {...p}><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M16 12h3"/><path d="M3 9h13a2 2 0 0 1 0 4"/></S>,
    snow: (p) => <S {...p}><path d="M12 2v20M4 6l16 12M20 6L4 18M2 12h20"/></S>,
    swap: (p) => <S {...p}><path d="M7 7h12l-3-3M17 17H5l3 3"/></S>,
    clock: (p) => <S {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></S>,
    user: (p) => <S {...p}><circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 5-5 8-5s6.5 1 8 5"/></S>,
    filter: (p) => <S {...p}><path d="M3 5h18l-7 8v6l-4-2v-4z"/></S>,
    external: (p) => <S {...p}><path d="M14 5h5v5"/><path d="M19 5l-8 8"/><path d="M19 14v5H5V5h5"/></S>,
    link: (p) => <S {...p}><path d="M9 15l6-6"/><path d="M11 7l1-1a3.5 3.5 0 0 1 5 5l-1 1"/><path d="M13 17l-1 1a3.5 3.5 0 0 1-5-5l1-1"/></S>,
    x: (p) => <S {...p}><path d="M6 6l12 12M18 6L6 18"/></S>,
    gate: (p) => <S {...p}><path d="M5 21V11a7 7 0 0 1 14 0v10"/><path d="M9 21v-9a3 3 0 0 1 6 0v9"/></S>,
    menu: (p) => <S {...p}><path d="M4 7h16M4 12h16M4 17h16"/></S>,
    dot: (p) => <S {...p}><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/></S>,
    code: (p) => <S {...p}><path d="M9 8l-4 4 4 4"/><path d="M15 8l4 4-4 4"/></S>,
    send: (p) => <S {...p}><path d="M21 4L10 15"/><path d="M21 4l-7 18-3.5-8L2.5 10.5z"/></S>,
    qr: (p) => <S {...p}><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><path d="M14 14h3v3M20 14v.01M20 17v3h-3M17 20h-.01"/></S>,
    refresh: (p) => <S {...p}><path d="M4 12a8 8 0 0 1 13.5-5.8L20 8M20 4v4h-4"/><path d="M20 12a8 8 0 0 1-13.5 5.8L4 16M4 20v-4h4"/></S>,
    book: (p) => <S {...p}><path d="M5 4h11a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2z"/><path d="M5 17h13"/></S>,
    home: (p) => <S {...p}><path d="M4 11l8-7 8 7"/><path d="M6 10v10h12V10"/><path d="M10 20v-6h4v6"/></S>,
    list: (p) => <S {...p}><path d="M8 6h12M8 12h12M8 18h12"/><path d="M4 6h.01M4 12h.01M4 18h.01"/></S>,
  };

  // Brand mark: arched "S" gateway — flat brand green
  const BrandMark = ({ size = 32 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="36" height="36" rx="10" fill="#49C98A"/>
      <path d="M12 14.5a6 6 0 0 1 12 0V28" stroke="#0B1F16" strokeWidth="2.6" strokeLinecap="round" fill="none" opacity="0.92"/>
      <path d="M28 25.5a6 6 0 0 1-12 0V12" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" fill="none"/>
    </svg>
  );

  window.SF_ICONS = Icon;
  window.SF_BrandMark = BrandMark;
})();
