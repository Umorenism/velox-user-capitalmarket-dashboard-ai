

// SignalsPage.jsx
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Sun, Moon } from "lucide-react";

/**
 * Unified Signals page
 * - Live BTC via CoinGecko (current price + 7-day hourly chart)
 * - Gold / Silver via GoldAPI or Metals-API if keys provided, otherwise fallback to metals.live
 * - Light / Dark mode toggle
 *
 * Requirements:
 *   npm install axios recharts lucide-react
 *   TailwindCSS configured in project
 *
 * Environment:
 *   REACT_APP_GOLDAPI_KEY  (optional)
 *   REACT_APP_METALS_API_KEY (optional)
 */

const POLL_MS = 20_000; // refresh every 20s (adjust as needed)

const useMounted = () => {
  const mounted = useRef(true);
  useEffect(() => () => (mounted.current = false), []);
  return mounted;
};

export default function VeloxCapitalSignals() {
  const mounted = useMounted();

  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(true);

  // Data state
  const [btc, setBtc] = useState({ price: null, change24h: null, history: [] });
  const [gold, setGold] = useState({ price: null, change24h: null, history: [] });
  const [silver, setSilver] = useState({ price: null, change24h: null, history: [] });

  // Utility format
  const fmtPrice = (n, opts = {}) =>
    n === null || n === undefined
      ? "—"
      : n >= 1000
      ? `$${Number(n).toLocaleString(undefined, { maximumFractionDigits: opts.dp ?? 0 })}`
      : `$${Number(n).toLocaleString(undefined, { maximumFractionDigits: opts.dp ?? 2 })}`;

  // ----------------------
  // FETCH FUNCTIONS
  // ----------------------

  // 1) BTC from CoinGecko
  const fetchBTC = async () => {
    try {
      // current price + 24h change
      const cur = await axios.get("https://api.coingecko.com/api/v3/simple/price", {
        params: { ids: "bitcoin", vs_currencies: "usd", include_24hr_change: "true" },
        timeout: 8000,
      });

      // 7 days hourly market chart (CoinGecko)
      const hist = await axios.get(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart",
        { params: { vs_currency: "usd", days: 7, interval: "hourly" }, timeout: 10000 }
      );

      const price = cur.data?.bitcoin?.usd ?? null;
      const change24h = cur.data?.bitcoin?.usd_24h_change ?? null;
      const history = (hist.data?.prices || []).map(([ts, p]) => ({
        time: new Date(ts).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric" }),
        price: Number(p.toFixed(2)),
      }));

      if (!mounted.current) return;
      setBtc({ price, change24h, history });
    } catch (err) {
      console.warn("BTC fetch failed:", err?.message || err);
    }
  };

  // 2) Gold & Silver fetcher (tries multiple providers)
  const fetchPrecious = async () => {
    // Helpers for providers
    const goldApiKey = process.env.REACT_APP_GOLDAPI_KEY;
    const metalsApiKey = process.env.REACT_APP_METALS_API_KEY;

    // Try GoldAPI (https://www.goldapi.io/) if key present
    if (goldApiKey) {
      try {
        // Gold
        const [gRes, sRes] = await Promise.all([
          axios.get("https://www.goldapi.io/api/XAU/USD", { headers: { "x-access-token": goldApiKey }, timeout: 8000 }),
          axios.get("https://www.goldapi.io/api/XAG/USD", { headers: { "x-access-token": goldApiKey }, timeout: 8000 }),
        ]);
        // Both endpoints return object with price
        if (!mounted.current) return;
        const gPrice = gRes.data?.price ?? null;
        const sPrice = sRes.data?.price ?? null;
        // Build simple pseudo-history by sampling current price (since goldapi historical may be plan-restricted)
        const sampleHistory = (p) =>
          p
            ? Array.from({ length: 24 }).map((_, i) => ({ time: `${i}:00`, price: Number((p * (1 + (Math.random() - 0.5) * 0.01)).toFixed(2)) }))
            : [];
        setGold((g) => ({ ...g, price: gPrice, history: sampleHistory(gPrice), change24h: null }));
        setSilver((s) => ({ ...s, price: sPrice, history: sampleHistory(sPrice), change24h: null }));
        return;
      } catch (e) {
        console.warn("GoldAPI failed (falling back):", e?.message || e);
      }
    }

    // Try Metals-API (requires key)
    if (metalsApiKey) {
      try {
        // Example endpoints:
        // https://metals-api.com/api/latest?access_key=KEY&base=USD&symbols=XAU,XAG
        const res = await axios.get("https://metals-api.com/api/latest", {
          params: { access_key: metalsApiKey, base: "USD", symbols: "XAU,XAG" },
          timeout: 9000,
        });
        if (res.data && res.data.rates) {
          const gRate = res.data.rates.XAU ?? null;
          const sRate = res.data.rates.XAG ?? null;
          // Build simple time-series by sampling:
          const sampleHistory = (p) =>
            p
              ? Array.from({ length: 24 }).map((_, i) => ({ time: `${i}:00`, price: Number((p * (1 + (Math.random() - 0.5) * 0.01)).toFixed(2)) }))
              : [];
          if (!mounted.current) return;
          setGold((g) => ({ ...g, price: gRate, history: sampleHistory(gRate), change24h: null }));
          setSilver((s) => ({ ...s, price: sRate, history: sampleHistory(sRate), change24h: null }));
          return;
        }
      } catch (e) {
        console.warn("Metals-API failed (falling back):", e?.message || e);
      }
    }

    // Final fallback: metals.live public feed (no key). Response format may differ by endpoint.
    // Example endpoint that many use: https://api.metals.live/v1/spot
    // The endpoint returns array of {symbol: 'XAU', price: 1800.12} etc OR {gold: price,...}
    try {
      const fallback = await axios.get("https://api.metals.live/v1/spot", { timeout: 8000 });
      // metals.live often returns [{symbol:'XAU',price:...}, ...] or an object array. We'll normalize.
      const payload = fallback.data;
      if (Array.isArray(payload)) {
        const gItem = payload.find((p) => String(p.symbol).toUpperCase().includes("XAU")) || payload.find((p) => p.gold);
        const sItem = payload.find((p) => String(p.symbol).toUpperCase().includes("XAG")) || payload.find((p) => p.silver);
        const gPrice = gItem?.price ?? gItem?.gold ?? null;
        const sPrice = sItem?.price ?? sItem?.silver ?? null;
        const sampleHistory = (p) =>
          p
            ? Array.from({ length: 24 }).map((_, i) => ({ time: `${i}:00`, price: Number((p * (1 + (Math.random() - 0.5) * 0.01)).toFixed(2)) }))
            : [];
        if (!mounted.current) return;
        setGold((g) => ({ ...g, price: gPrice, history: sampleHistory(gPrice), change24h: null }));
        setSilver((s) => ({ ...s, price: sPrice, history: sampleHistory(sPrice), change24h: null }));
        return;
      } else if (payload?.gold || payload?.silver) {
        const gPrice = payload.gold ?? null;
        const sPrice = payload.silver ?? null;
        const sampleHistory = (p) =>
          p
            ? Array.from({ length: 24 }).map((_, i) => ({ time: `${i}:00`, price: Number((p * (1 + (Math.random() - 0.5) * 0.01)).toFixed(2)) }))
            : [];
        if (!mounted.current) return;
        setGold((g) => ({ ...g, price: gPrice, history: sampleHistory(gPrice), change24h: null }));
        setSilver((s) => ({ ...s, price: sPrice, history: sampleHistory(sPrice), change24h: null }));
        return;
      }
    } catch (e) {
      console.warn("metals.live fallback failed:", e?.message || e);
    }

    // If everything fails, leave gold/silver as-is (UI will show No data)
    return;
  };

  // Combined fetch
  const fetchAll = async () => {
    setLoading(true);
    await Promise.all([fetchBTC(), fetchPrecious()]);
    if (mounted.current) setLoading(false);
  };

  useEffect(() => {
    fetchAll();
    const id = setInterval(fetchAll, POLL_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Theme toggler
  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  // ----------------------
  // Small Chart Card
  // ----------------------
  function AssetCard({ title, symbol, data, color = "blue" }) {
    const primary = color === "blue" ? "#2563EB" : color === "gold" ? "#d4af37" : color === "green" ? "#10b981" : "#888";
    return (
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow p-4 border border-gray-100 dark:border-neutral-700">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">{title}</h3>
            <p className="text-xs text-gray-400">{symbol} • USD</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {fmtPrice(data.price, { dp: data.price >= 1000 ? 0 : 2 })}
            </div>
            <div className={`text-sm mt-1 ${data.change24h && data.change24h >= 0 ? "text-green-600" : "text-red-500"}`}>
              {data.change24h !== null && data.change24h !== undefined
                ? `${Number(data.change24h).toFixed(2)}% (24h)`
                : "—"}
            </div>
          </div>
        </div>

        <div className="mt-3 h-28">
          {data.history && data.history.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.history}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "#1f2937" : "#f1f5f9"} />
                <XAxis dataKey="time" hide />
                <YAxis hide domain={["dataMin", "dataMax"]} />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke={primary} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-sm text-gray-400">No history</div>
          )}
        </div>

        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">Last updated: {new Date().toLocaleTimeString()}</div>
      </div>
    );
  }

  // ----------------------
  // Layout render
  // ----------------------
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Unified Signals</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Live market & signals for BTC, Gold and Silver — updated automatically.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-500 dark:text-gray-400 mr-3">Theme</div>
            <button
              onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
              className="p-2 rounded-md bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 shadow-sm"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="text-gray-700" /> : <Sun className="text-yellow-400" />}
            </button>
          </div>
        </div>

        {/* Top small cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <AssetCard title="Bitcoin" symbol="BTC" data={btc} color="blue" />
          <AssetCard title="Gold" symbol="XAU" data={gold} color="gold" />
          <AssetCard title="Silver" symbol="XAG" data={silver} color="green" />
        </section>

        {/* Large charts / detail area */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* BTC large chart */}
          <div className="col-span-2 bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-gray-100 dark:border-neutral-700 shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Bitcoin — 7 day</h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">{btc.price ? fmtPrice(btc.price) : "—"}</div>
            </div>

            <div className="h-64">
              {btc.history && btc.history.length ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={btc.history}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "#1f2937" : "#f1f5f9"} />
                    <XAxis dataKey="time" tick={{ fontSize: 11 }} />
                    <YAxis tickFormatter={(v) => `$${v}`} />
                    <Tooltip />
                    <Line type="monotone" dataKey="price" stroke="#2563EB" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-sm text-gray-400">Loading chart…</div>
              )}
            </div>

            <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
              Live price & simple signal summary:
              <div className="mt-2 flex gap-3">
                <div className="px-3 py-2 bg-green-50 dark:bg-green-900/20 rounded text-green-700 dark:text-green-300">Buy signal: simulated</div>
                <div className="px-3 py-2 bg-yellow-50 dark:bg-yellow-900/10 rounded text-yellow-700 dark:text-yellow-300">Volatility: medium</div>
                <div className="px-3 py-2 bg-indigo-50 dark:bg-indigo-900/10 rounded text-indigo-700 dark:text-indigo-300">24h change: {btc.change24h ? `${Number(btc.change24h).toFixed(2)}%` : "—"}</div>
              </div>
            </div>
          </div>

          {/* Right column: mini charts + info box */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-gray-100 dark:border-neutral-700 shadow">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Overview</h3>

            <div className="space-y-6">
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Gold (XAU)</div>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">{fmtPrice(gold.price)}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Spot price</div>
                  </div>
                  <div className="w-28 h-16">
                    {gold.history && gold.history.length ? (
                      <ResponsiveContainer width="100%" height="100%">{/* tiny chart */}
                        <LineChart data={gold.history}><Line dataKey="price" stroke="#d4af37" dot={false} strokeWidth={2} /></LineChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="text-xs text-gray-400">No data</div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Silver (XAG)</div>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">{fmtPrice(silver.price)}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Spot price</div>
                  </div>
                  <div className="w-28 h-16">
                    {silver.history && silver.history.length ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={silver.history}><Line dataKey="price" stroke="#10b981" dot={false} strokeWidth={2} /></LineChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="text-xs text-gray-400">No data</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-neutral-800 p-3 rounded">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-200">Action Required</div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  To enable live metals pricing use GoldAPI or Metals-API keys in your environment:
                  <br />
                  <span className="font-mono text-xs">REACT_APP_GOLDAPI_KEY</span> or <span className="font-mono text-xs">REACT_APP_METALS_API_KEY</span>.
                </p>
                <div className="mt-3">
                  <button className="px-3 py-2 bg-blue-600 text-white rounded text-sm">Start Actions</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer note */}
        <div className="mt-8 text-xs text-gray-500">
          Data sources: CoinGecko (Bitcoin). Precious metals from GoldAPI / Metals-API or public fallback endpoints. Charts update every {POLL_MS / 1000}s.
        </div>
      </div>
    </div>
  );
}
