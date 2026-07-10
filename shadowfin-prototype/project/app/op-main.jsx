/* ShadowFin — Operator console: root, routing, toasts */
(function () {
  const I = window.SF_ICONS;
  const { Sidebar, Topbar, Overview, Merchants, MerchantDetail, Approvals, Screening, Settlements, Audit } = window;

  const TITLES = {
    overview: "Business overview", merchants: "Merchants", "merchant-detail": "Merchant detail", approvals: "Approvals",
    screening: "Screening", settlements: "Settlements", audit: "Audit log",
  };

  function useToasts() {
    const [list, setList] = React.useState([]);
    const push = (msg) => {
      const id = Math.random();
      setList((l) => [...l, { id, msg }]);
      setTimeout(() => setList((l) => l.filter((t) => t.id !== id)), 3200);
    };
    return [list, push];
  }

  function App() {
    const [screen, setScreen] = React.useState("overview");
    const [merchant, setMerchant] = React.useState(null);
    const [flagged, setFlagged] = React.useState(null);
    const [toasts, toast] = useToasts();

    const nav = (id) => { setScreen(id); window.scrollTo({ top: 0 }); };
    const openMerchant = (m) => { setMerchant(m); setScreen("merchant-detail"); window.scrollTo({ top: 0 }); };
    const openFlagged = (p) => { setFlagged(p.id); setScreen("screening"); window.scrollTo({ top: 0 }); };

    let view;
    switch (screen) {
      case "overview": view = <Overview onNav={nav} onOpenMerchant={openMerchant} onOpenFlagged={openFlagged} />; break;
      case "merchants": view = <Merchants onOpenMerchant={openMerchant} />; break;
      case "merchant-detail": view = merchant
        ? <MerchantDetail merchant={merchant} onBack={() => nav("merchants")} onNav={nav} toast={toast} />
        : <Merchants onOpenMerchant={openMerchant} />; break;
      case "approvals": view = <Approvals toast={toast} />; break;
      case "screening": view = <Screening toast={toast} selected={flagged} onSelect={setFlagged} />; break;
      case "settlements": view = <Settlements onNav={nav} />; break;
      case "audit": view = <Audit onNav={nav} onOpenMerchant={openMerchant} />; break;
      default: view = <Overview onNav={nav} onOpenMerchant={openMerchant} onOpenFlagged={openFlagged} />;
    }

    return (
      <div className="sf-app">
        <Sidebar active={screen === "merchant-detail" ? "merchants" : screen} onNav={nav} />
        <div className="sf-main">
          <Topbar title={TITLES[screen]} onNav={nav} />
          {view}
        </div>
        {toasts.length > 0 && (
          <div className="sf-toast-wrap">
            {toasts.map((t) => (
              <div key={t.id} className="sf-toast"><span className="ico"><I.book size={18} /></span>{t.msg}</div>
            ))}
          </div>
        )}
      </div>
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
})();
