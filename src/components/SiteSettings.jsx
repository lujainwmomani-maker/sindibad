import { useEffect, useState } from "react";
import { useSettings } from "../context/SettingsContext";

export default function SiteSettings() {
  const { language, changeLanguage, isArabic, currency, changeCurrency } =
    useSettings();

  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") === "dark" ? "dark" : "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    try {
      localStorage.setItem("theme", theme);
    } catch {
      // يظل الزر يعمل إذا كان المتصفح لا يسمح بالحفظ.
    }
  }, [theme]);

  const isDark = theme === "dark";

  const themeLabel = isArabic
    ? isDark
      ? "تفعيل الوضع الفاتح"
      : "تفعيل الوضع الداكن"
    : isDark
      ? "Switch to light mode"
      : "Switch to dark mode";

  const selectStyle = {
    height: "38px",
    maxWidth: "100%",
    padding: "0 8px",
    borderRadius: "8px",
    border: "1px solid var(--line)",
    background: "var(--card)",
    color: "var(--ink)",
    font: "inherit",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        flexWrap: "nowrap",
        flexShrink: 0,
      }}
    >
      <button
        type="button"
        onClick={() =>
          setTheme((current) => (current === "dark" ? "light" : "dark"))
        }
        aria-label={themeLabel}
        title={themeLabel}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "38px",
          height: "38px",
          flexShrink: 0,
          borderRadius: "50%",
          border: "1px solid var(--line)",
          background: "var(--card)",
          color: "var(--ink)",
        }}
      >
        {isDark ? (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
          </svg>
        ) : (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20.9 13.1A9 9 0 0 1 10.9 3.1a9 9 0 1 0 10 10Z" />
          </svg>
        )}
      </button>

      <select
        value={language}
        onChange={(event) => changeLanguage(event.target.value)}
        aria-label={isArabic ? "لغة الموقع" : "Site language"}
        style={selectStyle}
      >
        <option value="en">English</option>
        <option value="ar">العربية</option>
      </select>

      <select
        value={currency}
        onChange={(event) => changeCurrency(event.target.value)}
        aria-label={isArabic ? "عملة عرض الأسعار" : "Display currency"}
        title={isArabic ? "عملة عرض الأسعار" : "Display currency"}
        style={selectStyle}
      >
        <option value="USD">USD</option>
        <option value="JOD">JOD</option>
        <option value="SAR">SAR</option>
        <option value="EUR">EUR</option>
      </select>
    </div>
  );
}
