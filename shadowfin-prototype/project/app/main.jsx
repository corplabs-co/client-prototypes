/* ShadowFin — App root, routing, toasts */
(function () {
  const I = window.SF_ICONS;
  const D = window.SF_DATA;
  const { Sidebar, Topbar, Home, Transactions, Accept, Settlement, Onboarding, Developers, Settings } = window;

  const TITLES = {
    home: "Home", transactions: "Transactions", accept: "Accept payment",
    settlement: "Settlement", onboarding: "Onboarding", developers: "Developers", settings: "Settings",
  };

  function useToasts() {
    const [list, setList] = React.useState([]);
    const push = (msg) => {
      const id = Math.random();
      setList((l) => [...l, { id, msg }]);
      setTimeout(() => setList((l) => l.filter((t) => t.id !== id)), 2800);
    };
    return [list, push];
  }

  function App() {
    const [screen, setScreen] = React.useState("home");
    const [selected, setSelected] = React.useState(null);
    const [toasts, toast] = useToasts();

    const nav = (id) => { setScreen(id); window.scrollTo({ top: 0 }); };
    const openPayment = (p) => { setSelected(p); setScreen("transactions"); window.scrollTo({ top: 0 }); };

    let view;
    switch (screen) {
      case "home": view = <Home onNav={nav} onOpenPayment={openPayment} />; break;
      case "transactions": view = <Transactions selected={selected} onSelect={setSelected} />; break;
      case "accept": view = <Accept onNav={nav} />; break;
      case "settlement": view = <Settlement onNav={nav} toast={toast} />; break;
      case "onboarding": view = <Onboarding onNav={nav} />; break;
      case "developers": view = <Developers />; break;
      case "settings": view = <Settings />; break;
      default: view = <Home onNav={nav} onOpenPayment={openPayment} />;
    }

    return (
      <div className="sf-app">
        <Sidebar active={screen} onNav={nav} />
        <div className="sf-main">
          <Topbar title={TITLES[screen]} onNav={nav} />
          {view}
        </div>
        {toasts.length > 0 && (
          <div className="sf-toast-wrap">
            {toasts.map((t) => (
              <div key={t.id} className="sf-toast"><span className="ico"><I.checkCircle size={18} /></span>{t.msg}</div>
            ))}
          </div>
        )}
      </div>
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
})();
