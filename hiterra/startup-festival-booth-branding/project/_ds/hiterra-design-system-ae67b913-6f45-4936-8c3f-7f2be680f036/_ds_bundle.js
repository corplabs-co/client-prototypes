/* @ds-bundle: {"format":3,"namespace":"HiTerraDesignSystem_ae67b9","components":[],"sourceHashes":{"components/hiterra-mobile.jsx":"45f811eedacb","components/hiterra-screens.jsx":"df56e53165c1","components/ios-frame.jsx":"d67eb3ffe562"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.HiTerraDesignSystem_ae67b9 = window.HiTerraDesignSystem_ae67b9 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/hiterra-mobile.jsx
try { (() => {
// HiTerra mobile UI kit components — the atoms that compose our iOS screens.
// All pulled from the codebase's mobile conventions: Manrope headings, Roboto data/labels,
// 8px radii, lake-blue primary, lime highlight, inset-green growth glow, root-50 canvas.

const HT = {
  blue: '#0A41F2',
  blueDeep: '#0E3CC5',
  lime: '#C0FF40',
  midnight: '#000057',
  leaf: '#6DB100',
  leafBg: '#F0FFC7',
  green: '#06B97D',
  mint50: '#E2FFF5',
  fruit: '#D64913',
  fruitBg: '#FFF6E7',
  sky50: '#E9F6FF',
  root50: '#F8F7F4',
  root100: '#DCD8CC',
  root200: '#C9C2B1',
  root400: '#ADA18A',
  root700: '#635549',
  root900: '#51463D',
  earth: '#2B241F',
  text: '#343334',
  text2: '#666',
  text3: '#989898',
  weak: '#B5B4B5',
  border: '#EEE',
  border2: '#E8E8E8',
  box: '#F5F5F5',
  bg: '#fff',
  success: '#00B578',
  warning: '#FF8F1F',
  danger: '#FF3141'
};

// Icons — stroke-based, matching codebase icon.tsx vocabulary
const Icon = ({
  name,
  size = 20,
  color = 'currentColor',
  stroke = 1.8
}) => {
  const p = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  };
  const paths = {
    field: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M3 17l9-12 9 12"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3 17h18"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M8 17l4-5 4 5"
    })),
    map: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M9 4v14"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M15 6v14"
    })),
    task: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
      x: "4",
      y: "5",
      width: "16",
      height: "16",
      rx: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M9 12l2 2 4-4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M8 3v4M16 3v4"
    })),
    notif: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M6 8a6 6 0 1112 0c0 7 3 7 3 9H3c0-2 3-2 3-9z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M10 21a2 2 0 004 0"
    })),
    module: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "3",
      width: "7",
      height: "7",
      rx: "1"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "14",
      y: "3",
      width: "7",
      height: "7",
      rx: "1"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "14",
      width: "7",
      height: "7",
      rx: "1"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "14",
      y: "14",
      width: "7",
      height: "7",
      rx: "1"
    })),
    info: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 8v.01M11 12h1v5h1"
    })),
    interest: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M12 21s-8-5-8-11a5 5 0 019-3 5 5 0 019 3c0 6-8 11-8 11z"
    })),
    buy: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M3 5h3l2 12h11l2-8H7"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "10",
      cy: "20",
      r: "1"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "18",
      cy: "20",
      r: "1"
    })),
    search: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "11",
      cy: "11",
      r: "7"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M20 20l-4-4"
    })),
    plus: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M12 5v14M5 12h14"
    })),
    check: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M5 12l5 5 9-11"
    })),
    leaf: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M5 21c0-9 7-16 16-16 0 9-7 16-16 16z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M5 21c3-5 7-9 12-12"
    })),
    drop: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M12 3s6 7 6 11a6 6 0 01-12 0c0-4 6-11 6-11z"
    })),
    sun: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"
    })),
    chev: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M9 6l6 6-6 6"
    })),
    back: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M15 6l-6 6 6 6"
    })),
    camera: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M4 8h4l2-3h4l2 3h4v11H4z"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "13",
      r: "4"
    })),
    chart: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M4 20V10M10 20V4M16 20v-8M22 20H2"
    })),
    flag: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M5 21V4h14l-3 4 3 4H5"
    }))
  };
  return /*#__PURE__*/React.createElement("svg", p, paths[name]);
};

// ── Buttons ────────────────────────────────────────────────
const MBtn = ({
  kind = 'primary',
  icon,
  children,
  full,
  style = {}
}) => {
  const base = {
    height: 44,
    padding: '0 18px',
    borderRadius: 8,
    fontFamily: 'Manrope, system-ui',
    fontSize: 15,
    fontWeight: 600,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    border: 'none',
    cursor: 'pointer',
    width: full ? '100%' : undefined,
    letterSpacing: 0.1
  };
  const kinds = {
    primary: {
      background: HT.blue,
      color: '#fff'
    },
    glow: {
      background: HT.leaf,
      color: '#fff',
      boxShadow: '0 6px 20px rgba(109,177,0,0.4)'
    },
    secondary: {
      background: '#fff',
      color: HT.text,
      border: `1px solid ${HT.border2}`
    },
    ghost: {
      background: 'transparent',
      color: HT.blue
    },
    lime: {
      background: HT.lime,
      color: HT.midnight
    },
    danger: {
      background: '#fff',
      color: HT.danger,
      border: `1px solid ${HT.danger}`
    }
  };
  return /*#__PURE__*/React.createElement("button", {
    style: {
      ...base,
      ...kinds[kind],
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 18
  }), children);
};

// ── Chips / Pills ──────────────────────────────────────────
const Pill = ({
  tone = 'neutral',
  children,
  dot
}) => {
  const tones = {
    neutral: {
      bg: HT.box,
      fg: HT.text2
    },
    ok: {
      bg: HT.mint50,
      fg: HT.green
    },
    leaf: {
      bg: HT.leafBg,
      fg: HT.leaf
    },
    info: {
      bg: HT.sky50,
      fg: HT.blue
    },
    warn: {
      bg: HT.fruitBg,
      fg: HT.fruit
    },
    danger: {
      bg: '#FFE8EA',
      fg: HT.danger
    },
    dark: {
      bg: HT.midnight,
      fg: HT.lime
    }
  };
  const t = tones[tone];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: '4px 9px',
      borderRadius: 9999,
      background: t.bg,
      color: t.fg,
      fontFamily: 'Roboto, system-ui',
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: 0.2
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 99,
      background: t.fg
    }
  }), children);
};

// ── Metric tile (Roboto numerals) ─────────────────────────
const Metric = ({
  label,
  value,
  unit,
  delta,
  tone = 'leaf'
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    background: '#fff',
    borderRadius: 8,
    padding: 12,
    boxShadow: '0 0 6px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    flex: 1,
    minWidth: 0
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'Roboto',
    fontSize: 10,
    color: HT.text3,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  }
}, label), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 3
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    fontFamily: 'Roboto',
    fontSize: 22,
    fontWeight: 500,
    color: HT.text,
    fontVariantNumeric: 'tabular-nums'
  }
}, value), unit && /*#__PURE__*/React.createElement("span", {
  style: {
    fontFamily: 'Roboto',
    fontSize: 11,
    color: HT.text2
  }
}, unit)), delta && /*#__PURE__*/React.createElement("span", {
  style: {
    fontFamily: 'Roboto',
    fontSize: 10,
    color: tone === 'leaf' ? HT.leaf : HT.fruit,
    fontWeight: 600
  }
}, delta));

// ── Habitat / block card ──────────────────────────────────
const HabitatCard = ({
  name,
  crop,
  ha,
  day,
  of,
  status = 'ok',
  progress
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    background: '#fff',
    borderRadius: 8,
    padding: '12px 14px',
    boxShadow: '0 0 6px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    gap: 8
  }
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'Manrope',
    fontSize: 15,
    fontWeight: 600,
    color: HT.text
  }
}, name), /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'Roboto',
    fontSize: 11,
    color: HT.text2,
    marginTop: 2
  }
}, crop, " \xB7 ", ha, " ha")), /*#__PURE__*/React.createElement(Pill, {
  tone: status,
  dot: true
}, status === 'ok' ? 'Active' : status === 'warn' ? 'Attention' : 'Fallow')), progress !== undefined && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: 'Roboto',
    fontSize: 10,
    color: HT.text3
  }
}, /*#__PURE__*/React.createElement("span", null, "Day ", day, " of ", of), /*#__PURE__*/React.createElement("span", null, Math.round(day / of * 100), "%")), /*#__PURE__*/React.createElement("div", {
  style: {
    height: 6,
    background: HT.leafBg,
    borderRadius: 999,
    overflow: 'hidden'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    width: `${day / of * 100}%`,
    height: '100%',
    background: HT.leaf
  }
}))));

// ── Task / notification row ───────────────────────────────
const TaskRow = ({
  icon,
  title,
  meta,
  trailing,
  bg = HT.sky50,
  fg = HT.blue
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 16px',
    background: '#fff',
    borderBottom: `1px solid ${HT.border}`
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    width: 36,
    height: 36,
    borderRadius: 8,
    background: bg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  }
}, /*#__PURE__*/React.createElement(Icon, {
  name: icon,
  size: 18,
  color: fg
})), /*#__PURE__*/React.createElement("div", {
  style: {
    flex: 1,
    minWidth: 0
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'Manrope',
    fontSize: 14,
    fontWeight: 600,
    color: HT.text,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}, title), /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'Roboto',
    fontSize: 11,
    color: HT.text2,
    marginTop: 2
  }
}, meta)), trailing);

// ── App bottom tab bar ─────────────────────────────────────
const TabBar = ({
  active = 0
}) => {
  const tabs = [{
    icon: 'field',
    label: 'Habitats'
  }, {
    icon: 'map',
    label: 'Map'
  }, {
    icon: 'task',
    label: 'Tasks'
  }, {
    icon: 'chart',
    label: 'Insights'
  }, {
    icon: 'module',
    label: 'More'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      background: '#fff',
      borderTop: `1px solid ${HT.border}`,
      padding: '6px 4px 10px'
    }
  }, tabs.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 2,
      color: active === i ? HT.blue : HT.text3
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: t.icon,
    size: 22,
    color: active === i ? HT.blue : HT.text3,
    stroke: active === i ? 2 : 1.6
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Manrope',
      fontSize: 10,
      fontWeight: active === i ? 600 : 500
    }
  }, t.label))));
};

// ── Sub header (between iOS chrome and content) ───────────
const SubHeader = ({
  title,
  subtitle,
  trailing
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 16px 12px',
    background: HT.root50
  }
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'Manrope',
    fontSize: 22,
    fontWeight: 700,
    color: HT.text,
    letterSpacing: -0.2
  }
}, title), subtitle && /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'Roboto',
    fontSize: 12,
    color: HT.text2,
    marginTop: 2
  }
}, subtitle)), trailing);

// ── Form field (mobile) ────────────────────────────────────
const Field = ({
  label,
  value,
  unit,
  error,
  hint
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4
  }
}, /*#__PURE__*/React.createElement("label", {
  style: {
    fontFamily: 'Roboto',
    fontSize: 10,
    color: HT.text3,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  }
}, label), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    height: 44,
    padding: '0 12px',
    borderRadius: 8,
    border: `1px solid ${error ? HT.danger : HT.border2}`,
    background: '#fff'
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    fontFamily: 'Roboto',
    fontSize: 15,
    color: HT.text,
    flex: 1,
    fontVariantNumeric: 'tabular-nums'
  }
}, value), unit && /*#__PURE__*/React.createElement("span", {
  style: {
    fontFamily: 'Roboto',
    fontSize: 12,
    color: HT.text3
  }
}, unit)), (error || hint) && /*#__PURE__*/React.createElement("div", {
  style: {
    fontFamily: 'Roboto',
    fontSize: 10,
    color: error ? HT.danger : HT.text3
  }
}, error || hint));
Object.assign(window, {
  HT,
  Icon,
  MBtn,
  Pill,
  Metric,
  HabitatCard,
  TaskRow,
  TabBar,
  SubHeader,
  Field
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/hiterra-mobile.jsx", error: String((e && e.message) || e) }); }

// components/hiterra-screens.jsx
try { (() => {
// HiTerra mobile screens — each composed from the atoms in hiterra-mobile.jsx

// ═══ 01 · Field overview / Habitats list ═══════════════════
function ScreenHabitats() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: HT.root50,
      minHeight: '100%'
    }
  }, /*#__PURE__*/React.createElement(SubHeader, {
    title: "Habitats",
    subtitle: "4 active \xB7 last sync 2 min ago",
    trailing: /*#__PURE__*/React.createElement("div", {
      style: {
        width: 40,
        height: 40,
        borderRadius: 9999,
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 6px rgba(0,0,0,0.08)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 20,
      color: HT.blue
    }))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      padding: '0 16px 12px',
      overflow: 'auto'
    }
  }, [['All', true], ['Oil palm'], ['Paddy'], ['Banana'], ['Fallow']].map(([l, on], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: '6px 12px',
      borderRadius: 9999,
      background: on ? HT.midnight : '#fff',
      color: on ? HT.lime : HT.text2,
      border: on ? 'none' : `1px solid ${HT.border2}`,
      fontFamily: 'Manrope',
      fontSize: 12,
      fontWeight: 600,
      whiteSpace: 'nowrap'
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px 10px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      borderRadius: 12,
      padding: 16,
      boxShadow: '0 0 6px rgba(0,0,0,0.1), inset 0 0 32px rgba(109,177,0,0.22)',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Manrope',
      fontSize: 11,
      color: HT.leaf,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 0.8
    }
  }, "ON TRACK"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Manrope',
      fontSize: 20,
      fontWeight: 700,
      color: HT.text,
      marginTop: 2
    }
  }, "Block 4A \u2014 North"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Roboto',
      fontSize: 12,
      color: HT.text2,
      marginTop: 2
    }
  }, "Oil Palm \xB7 2.3 ha \xB7 flowering phase")), /*#__PURE__*/React.createElement(Icon, {
    name: "leaf",
    size: 24,
    color: HT.leaf
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontFamily: 'Roboto',
      fontSize: 11,
      color: HT.text2
    }
  }, /*#__PURE__*/React.createElement("span", null, "Day 87 of 140"), /*#__PURE__*/React.createElement("span", null, "62%")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 8,
      background: HT.leafBg,
      borderRadius: 999,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '62%',
      height: '100%',
      background: HT.leaf
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      paddingTop: 4,
      fontFamily: 'Roboto',
      fontSize: 11
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: HT.text3
    }
  }, "pH "), /*#__PURE__*/React.createElement("b", {
    style: {
      color: HT.text,
      fontVariantNumeric: 'tabular-nums'
    }
  }, "5.4")), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: HT.text3
    }
  }, "N "), /*#__PURE__*/React.createElement("b", {
    style: {
      color: HT.text
    }
  }, "120")), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: HT.text3
    }
  }, "P "), /*#__PURE__*/React.createElement("b", {
    style: {
      color: HT.text
    }
  }, "40")), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: HT.text3
    }
  }, "K "), /*#__PURE__*/React.createElement("b", {
    style: {
      color: HT.text
    }
  }, "80"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      padding: '0 16px 20px'
    }
  }, /*#__PURE__*/React.createElement(HabitatCard, {
    name: "Block 4B \u2014 South",
    crop: "Oil Palm",
    ha: "1.8",
    day: 42,
    of: 140,
    status: "ok",
    progress: true
  }), /*#__PURE__*/React.createElement(HabitatCard, {
    name: "Block 2 \u2014 Paddy East",
    crop: "Paddy",
    ha: "3.4",
    day: 94,
    of: 110,
    status: "warn",
    progress: true
  }), /*#__PURE__*/React.createElement(HabitatCard, {
    name: "Block 7 \u2014 Banana Row",
    crop: "Banana",
    ha: "0.9",
    day: 180,
    of: 260,
    status: "ok",
    progress: true
  })));
}

// ═══ 02 · Harvest forecast / Insight ═══════════════════════
function ScreenInsight() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: HT.root50,
      minHeight: '100%'
    }
  }, /*#__PURE__*/React.createElement(SubHeader, {
    title: "Harvest forecast",
    subtitle: "Block 4A \xB7 next 30 days"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: HT.midnight,
      borderRadius: 12,
      padding: 18,
      color: '#fff',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Manrope',
      fontSize: 11,
      color: HT.lime,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 0.8
    }
  }, "EXPECTED YIELD"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Roboto',
      fontSize: 44,
      fontWeight: 500,
      letterSpacing: -0.5,
      marginTop: 4,
      fontVariantNumeric: 'tabular-nums'
    }
  }, "1,284", /*#__PURE__*/React.createElement("span", {
    style: {
      color: HT.lime
    }
  }, ".50")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Roboto',
      fontSize: 13,
      opacity: 0.7
    }
  }, "kg \xB7 \xB14.2% confidence"), /*#__PURE__*/React.createElement("svg", {
    width: "140",
    height: "52",
    viewBox: "0 0 140 52",
    style: {
      position: 'absolute',
      right: 14,
      bottom: 14
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 44 L20 38 L38 40 L56 30 L74 24 L92 26 L110 14 L130 8",
    stroke: HT.lime,
    strokeWidth: "2",
    fill: "none",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "130",
    cy: "8",
    r: "3.5",
    fill: HT.lime
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "130",
    cy: "8",
    r: "6",
    fill: HT.lime,
    opacity: "0.25"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      padding: '0 16px 14px'
    }
  }, /*#__PURE__*/React.createElement(Metric, {
    label: "vs last cycle",
    value: "+12.4",
    unit: "%",
    tone: "leaf",
    delta: "\u2191 Above plan"
  }), /*#__PURE__*/React.createElement(Metric, {
    label: "Est. revenue",
    value: "4,820",
    unit: "RM"
  }), /*#__PURE__*/React.createElement(Metric, {
    label: "Variance",
    value: "\xB14.2",
    unit: "%"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Manrope',
      fontSize: 11,
      color: HT.text3,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
      marginBottom: 8
    }
  }, "Driving factors"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      borderRadius: 8,
      boxShadow: '0 0 6px rgba(0,0,0,0.08)'
    }
  }, [{
    icon: 'drop',
    label: 'Rainfall',
    val: '+18 mm vs avg',
    tone: 'ok',
    fg: HT.green,
    bg: HT.mint50
  }, {
    icon: 'sun',
    label: 'Solar radiation',
    val: 'Normal',
    tone: 'neutral',
    fg: HT.warning,
    bg: HT.fruitBg
  }, {
    icon: 'leaf',
    label: 'Leaf area index',
    val: '4.8 (healthy)',
    tone: 'leaf',
    fg: HT.leaf,
    bg: HT.leafBg
  }].map((r, i, a) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 14px',
      borderBottom: i < a.length - 1 ? `1px solid ${HT.border}` : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 8,
      background: r.bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: r.icon,
    size: 18,
    color: r.fg
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      fontFamily: 'Manrope',
      fontSize: 14,
      fontWeight: 600,
      color: HT.text
    }
  }, r.label), /*#__PURE__*/React.createElement(Pill, {
    tone: r.tone
  }, r.val))))));
}

// ═══ 03 · Sampling entry (form + keyboard) ═════════════════
function ScreenSample() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: HT.root50,
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(SubHeader, {
    title: "New soil sample",
    subtitle: "Block 4A \xB7 point 3 of 6",
    trailing: /*#__PURE__*/React.createElement(Pill, {
      tone: "info"
    }, "GPS locked")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      borderRadius: 8,
      padding: 14,
      boxShadow: '0 0 6px rgba(0,0,0,0.08)',
      display: 'flex',
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 60,
      height: 60,
      borderRadius: 8,
      background: HT.leafBg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "camera",
    size: 26,
    color: HT.leaf
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Manrope',
      fontSize: 14,
      fontWeight: 600,
      color: HT.text
    }
  }, "Add sample photo"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Roboto',
      fontSize: 11,
      color: HT.text2,
      marginTop: 2
    }
  }, "Topsoil at 15 cm depth")), /*#__PURE__*/React.createElement(Icon, {
    name: "chev",
    size: 16,
    color: HT.text3
  })), /*#__PURE__*/React.createElement(Field, {
    label: "pH reading",
    value: "5.4"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Nitrogen",
    value: "120",
    unit: "ppm"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Phosphorus",
    value: "40",
    unit: "ppm"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Potassium",
    value: "80",
    unit: "ppm"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Moisture",
    value: "28",
    unit: "%",
    hint: "Within range"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      background: '#fff',
      borderTop: `1px solid ${HT.border}`,
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(MBtn, {
    kind: "secondary",
    icon: "flag"
  }, "Flag"), /*#__PURE__*/React.createElement(MBtn, {
    kind: "primary",
    full: true,
    icon: "check"
  }, "Save sample")));
}

// ═══ 04 · Task board / Notifications ═══════════════════════
function ScreenTasks() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: HT.root50,
      minHeight: '100%'
    }
  }, /*#__PURE__*/React.createElement(SubHeader, {
    title: "Tasks",
    subtitle: "Today \xB7 3 pending"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      padding: '0 16px 14px'
    }
  }, /*#__PURE__*/React.createElement(Metric, {
    label: "Pending",
    value: "3"
  }), /*#__PURE__*/React.createElement(Metric, {
    label: "Overdue",
    value: "1",
    tone: "fruit",
    delta: "! Review"
  }), /*#__PURE__*/React.createElement(Metric, {
    label: "Done",
    value: "12"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Manrope',
      fontSize: 11,
      color: HT.text3,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
      padding: '0 16px 6px'
    }
  }, "Today"), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '0 16px',
      borderRadius: 8,
      overflow: 'hidden',
      boxShadow: '0 0 6px rgba(0,0,0,0.06)'
    }
  }, /*#__PURE__*/React.createElement(TaskRow, {
    icon: "drop",
    title: "Irrigation \xB7 Block 2",
    meta: "Due 14:00 \xB7 Azlan",
    bg: HT.sky50,
    fg: HT.blue,
    trailing: /*#__PURE__*/React.createElement(Pill, {
      tone: "info"
    }, "1h")
  }), /*#__PURE__*/React.createElement(TaskRow, {
    icon: "leaf",
    title: "Fertilize Row 3\u20135",
    meta: "Due 16:30 \xB7 Team B",
    bg: HT.leafBg,
    fg: HT.leaf,
    trailing: /*#__PURE__*/React.createElement(Pill, {
      tone: "leaf"
    }, "3h")
  }), /*#__PURE__*/React.createElement(TaskRow, {
    icon: "flag",
    title: "Re-sample North corner",
    meta: "Overdue \xB7 yesterday",
    bg: "#FFE8EA",
    fg: HT.danger,
    trailing: /*#__PURE__*/React.createElement(Pill, {
      tone: "danger",
      dot: true
    }, "Overdue")
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Manrope',
      fontSize: 11,
      color: HT.text3,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
      padding: '18px 16px 6px'
    }
  }, "Upcoming"), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '0 16px 20px',
      borderRadius: 8,
      overflow: 'hidden',
      boxShadow: '0 0 6px rgba(0,0,0,0.06)'
    }
  }, /*#__PURE__*/React.createElement(TaskRow, {
    icon: "task",
    title: "Canopy scan \xB7 Block 7",
    meta: "Tomorrow \xB7 drone",
    bg: HT.box,
    fg: HT.text2,
    trailing: /*#__PURE__*/React.createElement(Icon, {
      name: "chev",
      size: 14,
      color: HT.text3
    })
  }), /*#__PURE__*/React.createElement(TaskRow, {
    icon: "buy",
    title: "Order: NPK 14-14-14",
    meta: "Thu \xB7 240 kg",
    bg: HT.fruitBg,
    fg: HT.fruit,
    trailing: /*#__PURE__*/React.createElement(Icon, {
      name: "chev",
      size: 14,
      color: HT.text3
    })
  })));
}
Object.assign(window, {
  ScreenHabitats,
  ScreenInsight,
  ScreenSample,
  ScreenTasks
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/hiterra-screens.jsx", error: String((e && e.message) || e) }); }

// components/ios-frame.jsx
try { (() => {
// iOS.jsx — Simplified iOS 26 (Liquid Glass) device frame
// Based on the iOS 26 UI Kit + Figma status bar spec. No assets, no deps.
// Exports: IOSDevice, IOSStatusBar, IOSNavBar, IOSGlassPill, IOSList, IOSListRow, IOSKeyboard

// ─────────────────────────────────────────────────────────────
// Status bar
// ─────────────────────────────────────────────────────────────
function IOSStatusBar({
  dark = false,
  time = '9:41'
}) {
  const c = dark ? '#fff' : '#000';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 154,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '21px 24px 19px',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 20,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 1.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '-apple-system, "SF Pro", system-ui',
      fontWeight: 590,
      fontSize: 17,
      lineHeight: '22px',
      color: c
    }
  }, time)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
      paddingTop: 1,
      paddingRight: 1
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "19",
    height: "12",
    viewBox: "0 0 19 12"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "7.5",
    width: "3.2",
    height: "4.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4.8",
    y: "5",
    width: "3.2",
    height: "7",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9.6",
    y: "2.5",
    width: "3.2",
    height: "9.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14.4",
    y: "0",
    width: "3.2",
    height: "12",
    rx: "0.7",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "12",
    viewBox: "0 0 17 12"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z",
    fill: c
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8.5",
    cy: "10.5",
    r: "1.5",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "27",
    height: "13",
    viewBox: "0 0 27 13"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0.5",
    y: "0.5",
    width: "23",
    height: "12",
    rx: "3.5",
    stroke: c,
    strokeOpacity: "0.35",
    fill: "none"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "20",
    height: "9",
    rx: "2",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z",
    fill: c,
    fillOpacity: "0.4"
  }))));
}

// ─────────────────────────────────────────────────────────────
// Liquid glass pill — blur + tint + shine
// ─────────────────────────────────────────────────────────────
function IOSGlassPill({
  children,
  dark = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      minWidth: 44,
      borderRadius: 9999,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: dark ? '0 2px 6px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.2)' : '0 1px 3px rgba(0,0,0,0.07), 0 3px 10px rgba(0,0,0,0.06)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.28)' : 'rgba(255,255,255,0.5)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15), inset -1px -1px 1px rgba(255,255,255,0.08)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      padding: '0 4px'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Navigation bar — glass pills + large title
// ─────────────────────────────────────────────────────────────
function IOSNavBar({
  title = 'Title',
  dark = false,
  trailingIcon = true
}) {
  const muted = dark ? 'rgba(255,255,255,0.6)' : '#404040';
  const text = dark ? '#fff' : '#000';
  const pillIcon = content => /*#__PURE__*/React.createElement(IOSGlassPill, {
    dark: dark
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, content));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      paddingTop: 62,
      paddingBottom: 10,
      position: 'relative',
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px'
    }
  }, pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "20",
    viewBox: "0 0 12 20",
    fill: "none",
    style: {
      marginLeft: -1
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 2L2 10l8 8",
    stroke: muted,
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), trailingIcon && pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "6",
    viewBox: "0 0 22 6"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "3",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "3",
    r: "2.5",
    fill: muted
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px',
      fontFamily: '-apple-system, system-ui',
      fontSize: 34,
      fontWeight: 700,
      lineHeight: '41px',
      color: text,
      letterSpacing: 0.4
    }
  }, title));
}

// ─────────────────────────────────────────────────────────────
// Grouped list (inset card, r:26) + row (52px)
// ─────────────────────────────────────────────────────────────
function IOSListRow({
  title,
  detail,
  icon,
  chevron = true,
  isLast = false,
  dark = false
}) {
  const text = dark ? '#fff' : '#000';
  const sec = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const ter = dark ? 'rgba(235,235,245,0.3)' : 'rgba(60,60,67,0.3)';
  const sep = dark ? 'rgba(84,84,88,0.65)' : 'rgba(60,60,67,0.12)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      minHeight: 52,
      padding: '0 16px',
      position: 'relative',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      letterSpacing: -0.43
    }
  }, icon && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 7,
      background: icon,
      marginRight: 12,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      color: text
    }
  }, title), detail && /*#__PURE__*/React.createElement("span", {
    style: {
      color: sec,
      marginRight: 6
    }
  }, detail), chevron && /*#__PURE__*/React.createElement("svg", {
    width: "8",
    height: "14",
    viewBox: "0 0 8 14",
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 1l6 6-6 6",
    stroke: ter,
    strokeWidth: "2",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), !isLast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: icon ? 58 : 16,
      height: 0.5,
      background: sep
    }
  }));
}
function IOSList({
  header,
  children,
  dark = false
}) {
  const hc = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const bg = dark ? '#1C1C1E' : '#fff';
  return /*#__PURE__*/React.createElement("div", null, header && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '-apple-system, system-ui',
      fontSize: 13,
      color: hc,
      textTransform: 'uppercase',
      padding: '8px 36px 6px',
      letterSpacing: -0.08
    }
  }, header), /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      borderRadius: 26,
      margin: '0 16px',
      overflow: 'hidden'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Device frame
// ─────────────────────────────────────────────────────────────
function IOSDevice({
  children,
  width = 402,
  height = 874,
  dark = false,
  title,
  keyboard = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      borderRadius: 48,
      overflow: 'hidden',
      position: 'relative',
      background: dark ? '#000' : '#F2F2F7',
      boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)',
      fontFamily: '-apple-system, system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 11,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 126,
      height: 37,
      borderRadius: 24,
      background: '#000',
      zIndex: 50
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement(IOSStatusBar, {
    dark: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  }, title !== undefined && /*#__PURE__*/React.createElement(IOSNavBar, {
    title: title,
    dark: dark
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto'
    }
  }, children), keyboard && /*#__PURE__*/React.createElement(IOSKeyboard, {
    dark: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 60,
      height: 34,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingBottom: 8,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 139,
      height: 5,
      borderRadius: 100,
      background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.25)'
    }
  })));
}

// ─────────────────────────────────────────────────────────────
// Keyboard — iOS 26 liquid glass
// ─────────────────────────────────────────────────────────────
function IOSKeyboard({
  dark = false
}) {
  const glyph = dark ? 'rgba(255,255,255,0.7)' : '#595959';
  const sugg = dark ? 'rgba(255,255,255,0.6)' : '#333';
  const keyBg = dark ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.85)';

  // special-key icons
  const icons = {
    shift: /*#__PURE__*/React.createElement("svg", {
      width: "19",
      height: "17",
      viewBox: "0 0 19 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M9.5 1L1 9.5h4.5V16h8V9.5H18L9.5 1z",
      fill: glyph
    })),
    del: /*#__PURE__*/React.createElement("svg", {
      width: "23",
      height: "17",
      viewBox: "0 0 23 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M7 1h13a2 2 0 012 2v11a2 2 0 01-2 2H7l-6-7.5L7 1z",
      fill: "none",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M10 5l7 7M17 5l-7 7",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinecap: "round"
    })),
    ret: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "14",
      viewBox: "0 0 20 14"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M18 1v6H4m0 0l4-4M4 7l4 4",
      fill: "none",
      stroke: "#fff",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }))
  };
  const key = (content, {
    w,
    flex,
    ret,
    fs = 25,
    k
  } = {}) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      height: 42,
      borderRadius: 8.5,
      flex: flex ? 1 : undefined,
      width: w,
      minWidth: 0,
      background: ret ? '#08f' : keyBg,
      boxShadow: '0 1px 0 rgba(0,0,0,0.075)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, "SF Compact", system-ui',
      fontSize: fs,
      fontWeight: 458,
      color: ret ? '#fff' : glyph
    }
  }, content);
  const row = (keys, pad = 0) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      justifyContent: 'center',
      padding: `0 ${pad}px`
    }
  }, keys.map(l => key(l, {
    flex: true,
    k: l
  })));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 15,
      borderRadius: 27,
      overflow: 'hidden',
      padding: '11px 0 2px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: dark ? '0 -2px 20px rgba(0,0,0,0.09)' : '0 -1px 6px rgba(0,0,0,0.018), 0 -3px 20px rgba(0,0,0,0.012)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.14)' : 'rgba(255,255,255,0.25)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'center',
      padding: '8px 22px 13px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, ['"The"', 'the', 'to'].map((w, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 25,
      background: '#ccc',
      opacity: 0.3
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: 'center',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      color: sugg,
      letterSpacing: -0.43,
      lineHeight: '22px'
    }
  }, w)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 13,
      padding: '0 6.5px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, row(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']), row(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], 20), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14.25,
      alignItems: 'center'
    }
  }, key(icons.shift, {
    w: 45,
    k: 'shift'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      flex: 1
    }
  }, ['z', 'x', 'c', 'v', 'b', 'n', 'm'].map(l => key(l, {
    flex: true,
    k: l
  }))), key(icons.del, {
    w: 45,
    k: 'del'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center'
    }
  }, key('ABC', {
    w: 92.25,
    fs: 18,
    k: 'abc'
  }), key('', {
    flex: true,
    k: 'space'
  }), key(icons.ret, {
    w: 92.25,
    ret: true,
    k: 'ret'
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      width: '100%',
      position: 'relative'
    }
  }));
}
Object.assign(window, {
  IOSDevice,
  IOSStatusBar,
  IOSNavBar,
  IOSGlassPill,
  IOSList,
  IOSListRow,
  IOSKeyboard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ios-frame.jsx", error: String((e && e.message) || e) }); }

})();
