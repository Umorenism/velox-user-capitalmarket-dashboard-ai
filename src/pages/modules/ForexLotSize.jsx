import React, { useState } from "react";

export default function ForexLotSize() {
  const [currencyPair, setCurrencyPair] = useState("");
  const [accountCurrency, setAccountCurrency] = useState("USD");
  const [balance, setBalance] = useState("");
  const [riskPercent, setRiskPercent] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [exchangeRate, setExchangeRate] = useState(""); // user-provided or static
  const [result, setResult] = useState(null);

  // Common major & cross pairs
  const currencyPairs = [
    "EUR/USD", "GBP/USD", "USD/JPY", "AUD/USD", "USD/CHF",
    "NZD/USD", "USD/CAD", "EUR/GBP", "EUR/JPY", "GBP/JPY",
    "AUD/CAD", "AUD/JPY", "CAD/JPY", "CHF/JPY", "EUR/AUD",
    "EUR/CAD", "GBP/CAD", "NZD/JPY", "USD/SGD", "USD/ZAR",
  ];

  // Proper pip value logic
  const getPipValue = (pair, rate) => {
    // For JPY pairs, pip is 0.01; others 0.0001
    const pip = pair.includes("JPY") ? 0.01 : 0.0001;
    // Pip value per standard lot in quote currency
    return (pip / rate) * 100000;
  };

  const calculateLotSize = () => {
    if (!balance || !riskPercent || !stopLoss || !currencyPair) {
      alert("Please fill all fields");
      return;
    }

    const balanceNum = parseFloat(balance);
    const riskPct = parseFloat(riskPercent);
    const stopLossNum = parseFloat(stopLoss);
    const rate = exchangeRate ? parseFloat(exchangeRate) : 1.0; // default if user doesn't enter rate

    const pipValue = getPipValue(currencyPair, rate);
    const riskAmount = balanceNum * (riskPct / 100);

    // Correct position size in lots
    const positionSizeLots = riskAmount / (stopLossNum * pipValue);
    const units = positionSizeLots * 100000;

    setResult({
      standard: positionSizeLots.toFixed(4),
      mini: (positionSizeLots * 10).toFixed(4),
      micro: (positionSizeLots * 100).toFixed(4),
      risk: riskAmount.toFixed(2),
      units: units.toFixed(0),
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0e2a] text-white flex flex-col md:flex-row p-4 md:p-10">
      {/* Sidebar */}
      <div className="bg-[#0d1238] border border-gray-700 rounded-xl w-full md:w-72 p-5 mb-6 md:mb-0 md:mr-10">
        <h3 className="font-semibold text-gray-300 text-lg mb-3">
          VeloxCapital Tools
        </h3>
        <ul className="text-sm space-y-2 text-gray-400">
          <li className="font-semibold text-white">▾ Risk Management</li>
          <li className="pl-3 hover:text-yellow-400 cursor-pointer">
            Position Size Calculator
          </li>
          <li className="pl-3 text-yellow-400">Lot Size Calculator</li>
          <li className="pl-3 hover:text-yellow-400 cursor-pointer">
            Stop Loss & Take Profit
          </li>
          <li className="pl-3 hover:text-yellow-400 cursor-pointer">
            Risk to Reward Calculator
          </li>
        </ul>

        <h3 className="font-semibold text-gray-300 text-lg mt-6">▸ Forex Calculators</h3>
        <h3 className="font-semibold text-gray-300 text-lg mt-3">▸ Technical Analysis</h3>
        <h3 className="font-semibold text-gray-300 text-lg mt-3">▸ Profit Reports</h3>
      </div>

      {/* Main Section */}
      <div className="bg-gray-100 text-gray-800 rounded-xl flex-1 p-8 shadow-lg dark:bg-neutral-900 dark:text-white">
        <h2 className="text-2xl font-bold mb-6 text-yellow-500">
          Forex Lot Size Calculator
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Currency Pair
              </label>
              <select
                value={currencyPair}
                onChange={(e) => setCurrencyPair(e.target.value)}
                className="w-full p-3 rounded-full bg-[#0d1238] text-white"
              >
                <option value="">Select Currency Pair</option>
                {currencyPairs.map((pair) => (
                  <option key={pair} value={pair}>
                    {pair}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Account Currency
              </label>
              <select
                value={accountCurrency}
                onChange={(e) => setAccountCurrency(e.target.value)}
                className="w-full p-3 rounded-full bg-[#0d1238] text-white"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Account Balance
              </label>
              <input
                type="number"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                placeholder="e.g. 50000"
                className="w-full p-3 rounded-full bg-gray-200 dark:bg-neutral-800"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Risk %
              </label>
              <input
                type="number"
                value={riskPercent}
                onChange={(e) => setRiskPercent(e.target.value)}
                placeholder="e.g. 10"
                className="w-full p-3 rounded-full bg-gray-200 dark:bg-neutral-800"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Stop Loss (in Pips)
              </label>
              <input
                type="number"
                value={stopLoss}
                onChange={(e) => setStopLoss(e.target.value)}
                placeholder="e.g. 10"
                className="w-full p-3 rounded-full bg-gray-200 dark:bg-neutral-800"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Exchange Rate (Optional)
              </label>
              <input
                type="number"
                value={exchangeRate}
                onChange={(e) => setExchangeRate(e.target.value)}
                placeholder="e.g. 1.2345"
                className="w-full p-3 rounded-full bg-gray-200 dark:bg-neutral-800"
              />
            </div>

            <button
              onClick={calculateLotSize}
              className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-full mt-3"
            >
              Calculate
            </button>
          </div>

          {/* Results */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Results</h3>
            <div className="border-t-2 border-yellow-400 pt-4">
              {result ? (
                <div className="space-y-3">
                  <p className="text-4xl font-bold text-yellow-500">
                    {result.standard}
                  </p>
                  <div className="grid grid-cols-2 text-sm gap-y-2">
                    <p>Risk:</p> <p>${result.risk}</p>
                    <p>Units:</p> <p>{result.units}</p>
                    <p>Mini Lots:</p> <p>{result.mini}</p>
                    <p>Micro Lots:</p> <p>{result.micro}</p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">
                  Enter your trade details and click calculate.
                </p>
              )}
            </div>

            <div className="border-t mt-5 pt-3 text-sm text-gray-600 leading-relaxed dark:text-gray-400">
              <p>
                About to enter a trade? Try all{" "}
                <a href="#" className="text-yellow-500 underline">
                  VeloxCapital calculators
                </a>
                .
              </p>
              <p className="mt-2">
                Precision-built tools for serious traders. Every pip counts.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-xs text-gray-400 border-t pt-4">
          VeloxCapital © {new Date().getFullYear()} — Head Office:
          <span className="text-gray-300 ml-1">
            15 Marina Road, Victoria Island, Lagos, Nigeria.
          </span>
        </div>
      </div>
    </div>
  );
}
