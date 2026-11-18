const API_URL = "https://open.er-api.com/v6/latest/USD";
const CURRENCIES = ["USD", "JOD", "SAR", "EUR"];

let cachedRates = null;
let cacheExpiresAt = 0;
let pendingRequest = null;

export async function loadExchangeRates() {
  if (cachedRates && Date.now() < cacheExpiresAt) {
    return cachedRates;
  }

  if (pendingRequest) {
    return pendingRequest;
  }

  pendingRequest = (async () => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(API_URL, {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error("Could not load exchange rates");
      }

      const data = await response.json();

      if (
        data.result !== "success" ||
        data.base_code !== "USD"
      ) {
        throw new Error("Invalid exchange rate response");
      }

      const rates = {};

      for (const code of CURRENCIES) {
        const rate = data.rates?.[code];

        if (typeof rate !== "number" || !Number.isFinite(rate) || rate <= 0) {
          throw new Error(`Missing exchange rate: ${code}`);
        }

        rates[code] = rate;
      }

      cachedRates = rates;
      cacheExpiresAt = Date.now() + 60 * 60 * 1000;

      return rates;
    } finally {
      clearTimeout(timeout);
    }
  })();

  try {
    return await pendingRequest;
  } finally {
    pendingRequest = null;
  }
}

export function formatPrice(amountUSD, currency, language, rates) {
  const rate = currency === "USD" ? 1 : rates?.[currency];

  if (!Number.isFinite(amountUSD) || !Number.isFinite(rate)) {
    return null;
  }

  return new Intl.NumberFormat(
    language === "ar" ? "ar-JO" : "en-US",
    {
      style: "currency",
      currency,
    }
  ).format(amountUSD * rate);
}