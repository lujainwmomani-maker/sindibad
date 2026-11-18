import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  loadExchangeRates,
  formatPrice,
} from "../services/currency";

const SettingsContext = createContext(null);

const supportedCurrencies = ["USD", "JOD", "SAR", "EUR"];

export function SettingsProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem("language") === "ar"
        ? "ar"
        : "en";
    } catch {
      return "en";
    }
  });

  const [currency, setCurrency] = useState(() => {
    try {
      const savedCurrency = localStorage.getItem("currency");

      return supportedCurrencies.includes(savedCurrency)
        ? savedCurrency
        : "USD";
    } catch {
      return "USD";
    }
  });

  const [rates, setRates] = useState({ USD: 1 });
  const [ratesLoading, setRatesLoading] = useState(false);
  const [ratesError, setRatesError] = useState(false);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir =
      language === "ar" ? "rtl" : "ltr";

    try {
      localStorage.setItem("language", language);
    } catch {
      // تظل اللغة تعمل إذا كان المتصفح لا يسمح بالحفظ.
    }
  }, [language]);

  useEffect(() => {
    try {
      localStorage.setItem("currency", currency);
    } catch {
      // تظل العملة تعمل إذا كان المتصفح لا يسمح بالحفظ.
    }
  }, [currency]);

  useEffect(() => {
    let active = true;

    if (currency === "USD") {
      setRatesLoading(false);
      setRatesError(false);
      return;
    }

    setRatesLoading(true);
    setRatesError(false);

    loadExchangeRates()
      .then((newRates) => {
        if (active) {
          setRates(newRates);
        }
      })
      .catch(() => {
        if (active) {
          setRatesError(true);
        }
      })
      .finally(() => {
        if (active) {
          setRatesLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [currency]);

  function changeLanguage(value) {
    if (value === "ar" || value === "en") {
      setLanguage(value);
    }
  }

  function changeCurrency(value) {
    if (supportedCurrencies.includes(value)) {
      setCurrency(value);
    }
  }

  function formatMoney(amountUSD) {
    return formatPrice(amountUSD, currency, language, rates);
  }

  return (
    <SettingsContext.Provider
      value={{
        language,
        changeLanguage,
        isArabic: language === "ar",
        currency,
        changeCurrency,
        formatMoney,
        ratesLoading,
        ratesError,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const settings = useContext(SettingsContext);

  if (!settings) {
    throw new Error(
      "useSettings must be used inside SettingsProvider"
    );
  }

  return settings;
}