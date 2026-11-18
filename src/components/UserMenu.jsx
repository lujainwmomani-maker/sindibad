import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSettings } from "../context/SettingsContext";
import "./UserMenu.css";

const readUser = () => {
  try {
    return JSON.parse(
      localStorage.getItem("user") || sessionStorage.getItem("user") || "null",
    );
  } catch {
    return null;
  }
};

export default function UserMenu() {
  const { isArabic } = useSettings();
  const [user, setUser] = useState(readUser);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const close = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", close);

    return () => {
      document.removeEventListener("mousedown", close);
    };
  }, []);

  const logout = () => {
    ["token", "user"].forEach((key) => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });

    setUser(null);
    setOpen(false);
    navigate("/");
  };

  if (!user) {
    return <Link to="/login">{isArabic ? "تسجيل الدخول" : "Sign In"}</Link>;
  }

  const dashboard = {
    admin: ["/admin", isArabic ? "لوحة تحكم الإدارة" : "Admin Dashboard"],
    guide: ["/guide", isArabic ? "لوحة تحكم المرشد" : "Guide Dashboard"],
  }[user.role];

  return (
    <div className="um" ref={ref}>
      <button
        type="button"
        className="um-btn"
        onClick={() => setOpen((current) => !current)}
        aria-label={isArabic ? "قائمة الحساب" : "Account menu"}
        aria-expanded={open}
      >
        <img src="/images/user-icon.png" alt="" />
      </button>

      {open && (
        <div className="um-menu">
          <div className="um-head">
            <strong>{user.name}</strong>
            <span dir="ltr">{user.email}</span>
          </div>

          {dashboard && (
            <Link to={dashboard[0]} onClick={() => setOpen(false)}>
              {dashboard[1]}
            </Link>
          )}

          <button type="button" onClick={logout}>
            {isArabic ? "تسجيل الخروج" : "Log out"}
          </button>
        </div>
      )}
    </div>
  );
}
