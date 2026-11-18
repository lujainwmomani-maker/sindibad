import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import "../pages/admin/Admin.css";

const nav = [
  ["/admin", "Overview", "▦"],
  ["/admin/users", "Users", "👤"],
  ["/admin/guides", "Tour Guides", "🧭", 3],
  ["/admin/destinations", "Destinations", "📍"],
  ["/admin/trips", "Group Trips", "🗺️"],
  ["/admin/bookings", "Bookings & Payments", "💳", 2],
  ["/admin/reviews", "Reviews", "⭐"],
  ["/admin/settings", "Settings", "⚙️"],
];

export default function AdminLayout() {
  const [dark, setDark] = useState(false);
  const [lang, setLang] = useState("en");
  const [open, setOpen] = useState(false);

  return (
    <div
      className="ad-root"
      data-theme={dark ? "dark" : "light"}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <aside className={`ad-side ${open ? "open" : ""}`}>
        <Link to="/" className="ad-logo">
          <img src="/images/logo.png" alt="Sindibad" />
          <small>JORDAN ADMIN</small>
        </Link>
        <div className="ad-status">
          <span>Operator Status</span>
          <span className="ad-live">Live</span>
        </div>
        <nav className="ad-nav" onClick={() => setOpen(false)}>
          {nav.map(([to, label, icon, count]) => (
            <NavLink key={to} to={to} end={to === "/admin"}>
              <span>{icon}</span>
              {label}
              {count && <span className="ad-count">{count}</span>}
            </NavLink>
          ))}
        </nav>
        <div className="ad-me">
          <span className="ad-avatar">TH</span>
          <div>
            <strong>Tariq Al-Hashemi</strong>
            <div className="ad-muted">Operations Lead</div>
          </div>
        </div>
      </aside>

      <div className="ad-main">
        <header className="ad-top">
          <button
            className="ad-icon ad-menu"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            ☰
          </button>
          <input
            className="ad-search"
            placeholder="Search bookings, guides, destinations..."
          />
          <div className="ad-top-actions">
            <div className="ad-seg">
              <button
                className={lang === "en" ? "on" : ""}
                onClick={() => setLang("en")}
              >
                EN
              </button>
              <button
                className={lang === "ar" ? "on" : ""}
                onClick={() => setLang("ar")}
              >
                AR
              </button>
            </div>
            <button
              className="ad-icon"
              onClick={() => setDark(!dark)}
              aria-label="Toggle theme"
            >
              {dark ? "🌙" : "☀️"}
            </button>
            <button className="ad-icon" aria-label="Notifications">
              🔔
            </button>
            <span className="ad-avatar">TH</span>
          </div>
        </header>
        <main className="ad-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
