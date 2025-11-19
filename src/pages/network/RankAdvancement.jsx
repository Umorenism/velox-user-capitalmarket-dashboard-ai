


import React, { useState, useEffect, useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import axios from "axios";

export default function MarketOverviewCashFX() {
  // Mock / demo data. Replace with real-time API calls.
  const [priceSeries, setPriceSeries] = useState(generateMockSeries());
  const [orderBook, setOrderBook] = useState(generateMockOrderBook());
  const [recentTrades, setRecentTrades] = useState(generateMockTrades());
  const [marketStats, setMarketStats] = useState(generateMockStats());
  const [loading, setLoading] = useState(false);
  const [timeframe, setTimeframe] = useState("1H");

  useEffect(() => {
    // Example: replace with real fetch to your market data service
    // fetchMarketSnapshot();

    // simple interval to animate/mock live updates
    const id = setInterval(() => {
      setPriceSeries((s) => shiftSeries(s));
      setRecentTrades((t) => [generateSingleTrade(), ...t].slice(0, 12));
      setOrderBook((ob) => mutateOrderbook(ob));
    }, 5000);
    return () => clearInterval(id);
  }, []);

  // Derived values
  const latest = priceSeries[priceSeries.length - 1];
  const priceChangePct = useMemo(() => {
    const first = priceSeries[0].value;
    const last = latest.value;
    return (((last - first) / first) * 100).toFixed(2);
  }, [priceSeries]);

  async function fetchMarketSnapshot() {
    setLoading(true);
    try {
      // Example: await axios.get('/api/market/cashfx/snapshot')
      // setPriceSeries(response.data.series)
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-neutral-900 min-h-screen">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">CashFX — Market Overview</h1>
          <p className="text-sm text-slate-500 dark:text-slate-300">Live snapshot, orderbook, trades and quick analytics</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-lg font-semibold text-slate-900 dark:text-white">{formatCurrency(latest.value)}</div>
            <div className={`text-sm ${priceChangePct >= 0 ? "text-green-600" : "text-red-500"}`}>{priceChangePct}%</div>
          </div>
          <div className="bg-white dark:bg-neutral-800 shadow rounded-md px-3 py-2 text-sm">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="bg-transparent outline-none"
            >
              <option>1H</option>
              <option>6H</option>
              <option>1D</option>
              <option>1W</option>
            </select>
          </div>
        </div>
      </header>

      <main className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left column: Chart + stats */}
        <section className="xl:col-span-2 space-y-4">
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Price Chart</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Real-time price movement for CashFX</p>
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-300">Volume: {formatCompactNumber(marketStats.volume)}</div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={priceSeries} margin={{ top: 6, right: 12, bottom: 6, left: 0 }}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                  <YAxis domain={["dataMin", "dataMax"]} tickFormatter={(v) => formatCurrency(v)} />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip formatter={(v) => formatCurrency(v)} labelFormatter={(l) => `Time: ${l}`} />
                  <Area type="monotone" dataKey="value" stroke="#2563eb" fill="url(#colorPrice)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <StatCard label="Market Cap" value={`$${formatCompactNumber(marketStats.marketCap)}`} />
              <StatCard label="24h High" value={formatCurrency(marketStats.high24h)} />
              <StatCard label="24h Low" value={formatCurrency(marketStats.low24h)} />
            </div>
          </div>

          {/* Insights / quick actions */}
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow p-4 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Quick Insights</h3>
              <p className="text-xs text-slate-500 dark:text-slate-300">Automated signals & recent changes</p>
              <ul className="mt-3 flex gap-3 text-xs">
                <li className="px-3 py-1 bg-green-50 dark:bg-green-900/20 rounded">Bullish momentum</li>
                <li className="px-3 py-1 bg-yellow-50 dark:bg-yellow-900/20 rounded">Volatility rising</li>
                <li className="px-3 py-1 bg-red-50 dark:bg-red-900/20 rounded">Watch: large sell wall</li>
              </ul>
            </div>
            <div className="text-right">
              <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm">Create Alert</button>
            </div>
          </div>
        </section>

        {/* Right column: Orderbook, trades, news */}
        <aside className="space-y-4">
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow p-4">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Order Book</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <div className="text-[11px] text-slate-500">Bids</div>
                <div className="space-y-2 mt-2">
                  {orderBook.bids.slice(0, 6).map((b, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <div className="text-green-600">{formatCurrency(b.price)}</div>
                      <div className="text-slate-600 dark:text-slate-300">{b.size}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-slate-500">Asks</div>
                <div className="space-y-2 mt-2">
                  {orderBook.asks.slice(0, 6).map((a, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <div className="text-red-600">{formatCurrency(a.price)}</div>
                      <div className="text-slate-600 dark:text-slate-300">{a.size}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow p-4">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Recent Trades</h3>
            <div className="space-y-2 text-xs">
              {recentTrades.map((t, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="text-[13px]">{formatCurrency(t.price)}</div>
                  <div className={`text-[12px] ${t.side === "buy" ? "text-green-600" : "text-red-500"}`}>{t.side}</div>
                  <div className="text-[12px] text-slate-500">{t.size}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow p-4">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">News & Mentions</h3>
            <ul className="text-xs space-y-2">
              <li className="border-l-2 border-slate-200 dark:border-neutral-700 pl-3">CashFX partnership announced with LiquiPay (demo)</li>
              <li className="border-l-2 border-slate-200 dark:border-neutral-700 pl-3">Regulatory filing shows new listing plans</li>
              <li className="border-l-2 border-slate-200 dark:border-neutral-700 pl-3">High-frequency traders increase activity</li>
            </ul>
          </div>
        </aside>
      </main>

      <footer className="text-xs text-slate-500 dark:text-slate-400">Tip: replace mock data functions with your real CashFX market API endpoints for live production data.</footer>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="p-3 bg-white dark:bg-neutral-900 rounded-lg shadow-sm text-center">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="mt-1 font-semibold text-slate-900 dark:text-white">{value}</div>
    </div>
  );
}

// ------------------------- Helpers & Mock data ------------------------- //

function formatCurrency(n) {
  if (n === undefined || n === null) return "—";
  return `$${Number(n).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

function formatCompactNumber(n) {
  if (!n) return "0";
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function generateMockSeries(points = 40) {
  const base = 1.0 + Math.random() * 0.5;
  const out = [];
  let val = base * 100; // base price ~ 100
  for (let i = 0; i < points; i++) {
    val = val * (1 + (Math.random() - 0.45) * 0.02);
    out.push({ time: `${i}`, value: Number(val.toFixed(2)) });
  }
  return out;
}

function shiftSeries(series) {
  const last = series[series.length - 1];
  const newVal = Number((last.value * (1 + (Math.random() - 0.5) * 0.01)).toFixed(2));
  const shifted = [...series.slice(1), { time: `${Date.now() % 100000}`, value: newVal }];
  return shifted;
}

function generateMockOrderBook() {
  const mid = 100;
  const asks = Array.from({ length: 12 }).map((_, i) => ({ price: Number((mid + i * 0.2).toFixed(2)), size: (Math.random() * 50).toFixed(2) }));
  const bids = Array.from({ length: 12 }).map((_, i) => ({ price: Number((mid - i * 0.2).toFixed(2)), size: (Math.random() * 50).toFixed(2) }));
  return { asks, bids };
}

function mutateOrderbook(ob) {
  // tiny mutation to emulate live changes
  const mutateSide = (arr) => arr.map((r) => ({ ...r, size: (Number(r.size) * (1 + (Math.random() - 0.5) * 0.1)).toFixed(2) }));
  return { asks: mutateSide(ob.asks), bids: mutateSide(ob.bids) };
}

function generateMockTrades() {
  return Array.from({ length: 10 }).map(() => generateSingleTrade());
}

function generateSingleTrade() {
  return {
    price: Number((98 + Math.random() * 6).toFixed(2)),
    size: (Math.random() * 5).toFixed(4),
    side: Math.random() > 0.5 ? "buy" : "sell",
    ts: Date.now(),
  };
}

function generateMockStats() {
  return {
    volume: Math.floor(100000 + Math.random() * 900000),
    marketCap: Math.floor(50_000_000 + Math.random() * 200_000_000),
    high24h: Number((102 + Math.random() * 6).toFixed(2)),
    low24h: Number((94 + Math.random() * 6).toFixed(2)),
  };
}
