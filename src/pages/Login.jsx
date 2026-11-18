import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, demoAccounts, redirectByRole } from "../services/authService";
import "./Login.css";

const T = {
  en: {
    back: "Back to Home",
    portal: "CONCIERGE PORTAL",
    title: "Welcome back",
    sub: "Sign in to continue your journey.",
    demo: "One unified login for travelers, guides and admins",
    demoHint: "Tap a role to auto-fill demo credentials",
    roles: { tourist: "Tourist", guide: "Guide", admin: "Admin" },
    email: "Email",
    emailPh: "you@example.com",
    pass: "Password",
    remember: "Keep me signed in on this device",
    forgot: "Forgot password?",
    signin: "Sign In",
    signing: "Signing in...",
    or: "or continue with",
    google: "Continue with Google",
    newTo: "New to Sindibad?",
    create: "Create an account",
    head: "Your Next Great Adventure Begins in Jordan.",
    text: "Sign in to discover ancient wonders, hidden gems and private expeditions curated with certified local guides.",
    chips: ["Verified Guides", "Secure Booking", "Authentic Experiences"],
    eEmpty: "Please enter your email",
    eBad: "Enter a valid email address",
    pShort: "Password must be at least 6 characters",
    wrong: "Invalid email or password",
    soon: "Google sign-in will be available soon",
    reset: "Password reset is not available yet",
  },
  ar: {
    back: "العودة للرئيسية",
    portal: "بوابة الدخول",
    title: "مرحباً بعودتك",
    sub: "سجّل دخولك لتكمل رحلتك.",
    demo: "تسجيل دخول تجريبي للمسافرين والمرشدين والإدارة",
    demoHint: "اختار الحساب لتعبئة بيانات التجربة",
    roles: { tourist: "مسافر", guide: "مرشد", admin: "إدارة" },
    email: "البريد الإلكتروني",
    emailPh: "you@example.com",
    pass: "كلمة المرور",
    remember: "ابقني مسجّلاً على هذا الجهاز",
    forgot: "نسيت كلمة المرور؟",
    signin: "تسجيل الدخول",
    signing: "جارٍ الدخول...",
    or: "أو تابع باستخدام",
    google: "المتابعة عبر Google",
    newTo: "جديد على سندباد؟",
    create: "أنشئ حساباً",
    head: "مغامرتك العظيمة القادمة تبدأ في الأردن.",
    text: "سجّل دخولك لتكتشف العجائب القديمة والكنوز المخفية ورحلات خاصة مع مرشدين محليين معتمدين.",
    chips: ["مرشدون موثّقون", "حجز آمن", "تجارب أصيلة"],
    eEmpty: "الرجاء إدخال البريد الإلكتروني",
    eBad: "أدخل بريداً إلكترونياً صحيحاً",
    pShort: "كلمة المرور 6 أحرف على الأقل",
    wrong: "البريد أو كلمة المرور غير صحيحة",
    soon: "تسجيل الدخول عبر Google سيتوفر قريباً",
    reset: "استعادة كلمة المرور غير متاحة حاليًا",
  },
};

export default function Login() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(true);
  const [lang, setLang] = useState("en");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const t = T[lang];

  function fill(role) {
    setEmail(demoAccounts[role].email);
    setPassword(demoAccounts[role].password);
    setErrors({});
    setServerError("");
  }

  async function submit(e) {
    e.preventDefault();
    setServerError("");
    setInfo("");
    const errs = {};
    if (!email.trim()) errs.email = t.eEmpty;
    else if (!/^\S+@\S+\.\S+$/.test(email.trim())) errs.email = t.eBad;
    if (password.length < 6) errs.password = t.pShort;
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    try {
      const { token, user } = await login(email.trim(), password);
      const store = remember ? localStorage : sessionStorage;
      const otherStore = remember ? sessionStorage : localStorage;
      otherStore.removeItem("token");
      otherStore.removeItem("user");
      store.setItem("token", token);
      store.setItem("user", JSON.stringify(user));
      navigate(redirectByRole[user.role] || "/");
    } catch {
      setServerError(t.wrong);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="lg-root"
      data-theme={dark ? "dark" : "light"}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <section className="lg-hero">
        <Link to="/" className="lg-logo">
          <img src="/images/logo.png" alt="Sindibad" />
        </Link>
        <div>
          <span className="lg-badge">JORDAN HERITAGE & LUXURY EXPEDITIONS</span>
          <h1>{t.head}</h1>
          <p>{t.text}</p>
          <div className="lg-chips">
            {t.chips.map((c) => (
              <span key={c}>✓ {c}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="lg-panel">
        <div className="lg-bar">
          <Link to="/">
            {lang === "ar" ? "→" : "←"} {t.back}
          </Link>
          <div className="lg-actions">
            <div className="lg-seg">
              <button
                type="button"
                className={lang === "en" ? "on" : ""}
                onClick={() => setLang("en")}
              >
                EN
              </button>
              <button
                type="button"
                className={lang === "ar" ? "on" : ""}
                onClick={() => setLang("ar")}
              >
                AR
              </button>
            </div>
            <button
              type="button"
              className="lg-icon"
              onClick={() => setDark(!dark)}
              aria-label="Toggle theme"
            >
              {dark ? "🌙" : "☀️"}
            </button>
          </div>
        </div>

        <form className="lg-card" onSubmit={submit} noValidate>
          <span className="lg-eyebrow">{t.portal}</span>
          <h2>{t.title}</h2>
          <p className="lg-sub">{t.sub}</p>

          <div className="lg-roles">
            <p><strong>{t.demo}</strong><br />{t.demoHint}</p>
            <div>
              {Object.keys(demoAccounts).map((role) => (
                <button type="button" key={role} onClick={() => fill(role)}>
                  {t.roles[role]}
                </button>
              ))}
            </div>
          </div>

          {serverError && (
            <div className="lg-banner" role="alert">
              {serverError}
            </div>
          )}
          {info && (
            <div className="lg-banner info" role="status">
              {info}
            </div>
          )}

          <div className="lg-field">
            <label htmlFor="lg-email">{t.email}</label>
            <div className="lg-input">
              <input
                id="lg-email"
                type="email"
                autoComplete="email"
                placeholder={t.emailPh}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!errors.email}
              />
            </div>
            {errors.email && (
              <p className="lg-err" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          <div className="lg-field">
            <label htmlFor="lg-pass">{t.pass}</label>
            <div className="lg-input">
              <input
                id="lg-pass"
                type={show ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!errors.password}
              />
              <button
                type="button"
                className="lg-eye"
                onClick={() => setShow(!show)}
                aria-label="Show or hide password"
              >
                {show ? "🙈" : "👁"}
              </button>
            </div>
            {errors.password && (
              <p className="lg-err" role="alert">
                {errors.password}
              </p>
            )}
          </div>

          <div className="lg-row">
            <label>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />{" "}
              {t.remember}
            </label>
            <button
              type="button"
              className="lg-link"
              onClick={() => setInfo(t.reset)}
            >
              {t.forgot}
            </button>
          </div>

          <button className="lg-submit" disabled={loading}>
            {loading ? t.signing : t.signin}
          </button>

          <div className="lg-or">{t.or}</div>
          <button
            type="button"
            className="lg-google"
            onClick={() => setInfo(t.soon)}
          >
            G&nbsp; {t.google}
          </button>

          <p className="lg-new">
            {t.newTo} <Link to="/register">{t.create}</Link>
          </p>
        </form>
      </section>
    </div>
  );
}
