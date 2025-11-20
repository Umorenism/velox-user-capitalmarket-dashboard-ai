// import React, { useState, useMemo } from 'react';

// // Velox Retirement Investor UI
// // Single-file React component (Tailwind CSS assumed available globally)
// // Uses recharts for the pie chart (install: recharts)

// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// export default function VeloxRetirementInvestorUI() {
//   // Preset tiers (8 boxes)
//   const presets = [50000, 100000, 150000, 250000, 350000, 500000, 750000, 1000000];

//   const [amount, setAmount] = useState(50000);
//   const [years, setYears] = useState(3);
//   const [annualRate, setAnnualRate] = useState(5); // percent
//   const [walletAddress, setWalletAddress] = useState('Tether-USDT-TRC20-ADDRESS-PLACEHOLDER');
//   const [qrSrc, setQrSrc] = useState(null); // user can upload QR or we show placeholder
//   const [proofFile, setProofFile] = useState(null);
//   const [fxblueLink, setFxblueLink] = useState('');
//   const [startDate, setStartDate] = useState(new Date().toISOString().slice(0,10));

//   // Validation constraints
//   const MIN_YEARS = 3;
//   const MIN_RATE = 5;

//   // Helpers
//   function formatCurrency(n){
//     return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
//   }

//   function handlePresetClick(value){
//     setAmount(value);
//   }

//   function handleProofUpload(e){
//     const f = e.target.files[0];
//     setProofFile(f || null);
//   }

//   // Compound calculation (compounded monthly)
//   // A = P * (1 + r/12)^(12*t)
//   const breakdown = useMemo(()=>{
//     const P = Number(amount);
//     const r = Number(annualRate)/100;
//     const t = Math.max(Number(years), MIN_YEARS);
//     const months = t * 12;
//     const monthlyRate = r / 12;
//     const monthlyBalances = [];
//     let balance = P;
//     for(let m=1; m<=months; m++){
//       balance = balance * (1 + monthlyRate);
//       monthlyBalances.push({ month: m, balance: Number(balance.toFixed(2)) });
//     }
//     const finalBalance = monthlyBalances.length ? monthlyBalances[monthlyBalances.length-1].balance : P;
//     const profit = finalBalance - P;
//     return { monthlyBalances, finalBalance, profit };
//   }, [amount, annualRate, years]);

//   // Pie chart data: principal vs profit
//   const pieData = [
//     { name: 'Principal', value: Number(amount) },
//     { name: 'Profit', value: Number(breakdown.profit.toFixed(2)) }
//   ];
//   const COLORS = ['#2dd4bf', '#60a5fa'];

//   // Progress of account by time elapsed since startDate
//   const progressPercent = useMemo(()=>{
//     try{
//       const start = new Date(startDate);
//       const now = new Date();
//       const end = new Date(start);
//       end.setFullYear(end.getFullYear() + Number(years));
//       if(now <= start) return 0;
//       if(now >= end) return 100;
//       const total = end - start;
//       const elapsed = now - start;
//       return Math.round((elapsed / total) * 100);
//     } catch(e){ return 0; }
//   }, [startDate, years]);

//   function handleSubmit(e){
//     e.preventDefault();
//     // In production, this would call backend API to create account / record deposit proof
//     alert('Submission recorded locally in this demo UI. Replace this with API call.');
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-6 space-y-6">
//       <header className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-extrabold">Velox Capital — Retirement Investor Portal</h1>
//           <p className="text-sm text-muted-foreground">Designed for retirement personnel: invest, track, and withdraw profit after tenure</p>
//         </div>
//         <div className="text-right">
//           <div className="text-xs">Profit share: <span className="font-semibold">50/50 (Non-negotiable)</span></div>
//           <div className="text-xs">Min compoundable %: <span className="font-semibold">{MIN_RATE}%</span></div>
//         </div>
//       </header>

//       <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-6">
//         {/* Left column: inputs & presets */}
//         <section className="col-span-12 md:col-span-6 bg-white p-4 rounded-2xl shadow-sm">
//           <h2 className="text-lg font-bold mb-3">Investment Details</h2>

//           <label className="block mb-2 text-sm font-medium">Amount (USD)</label>
//           <div className="flex gap-2 mb-4">
//             <input type="number" min={0} step={100} value={amount} onChange={(e)=>setAmount(Number(e.target.value))} className="flex-1 p-2 border rounded" />
//             <button type="button" onClick={()=>setAmount(0)} className="px-3 py-2 rounded bg-gray-100">Clear</button>
//           </div>

//           <label className="block mb-2 text-sm font-medium">Compound period (years) — minimum {MIN_YEARS} years</label>
//           <input type="number" min={MIN_YEARS} step={1} value={years} onChange={(e)=>setYears(Math.max(Number(e.target.value), MIN_YEARS))} className="w-24 p-2 border rounded mb-4" />

//           <label className="block mb-2 text-sm font-medium">Compound annual percentage (%) — min {MIN_RATE}%</label>
//           <input type="number" min={MIN_RATE} step={0.1} value={annualRate} onChange={(e)=>setAnnualRate(Math.max(Number(e.target.value), MIN_RATE))} className="w-32 p-2 border rounded mb-4" />

//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-medium">Start date</label>
//             <input type="date" value={startDate} onChange={(e)=>setStartDate(e.target.value)} className="p-2 border rounded" />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-medium">USDT Wallet (credit to)</label>
//             <input type="text" value={walletAddress} onChange={(e)=>setWalletAddress(e.target.value)} className="w-full p-2 border rounded" />
//             <div className="mt-2 text-xs text-gray-600">Please credit TRC20 USDT to the wallet above. Confirm network before sending.</div>
//           </div>

//           <div className="grid grid-cols-4 gap-2 mb-4">
//             {presets.map(p => (
//               <button type="button" key={p} onClick={()=>handlePresetClick(p)} className={`p-2 rounded-lg border ${amount===p? 'ring-2 ring-offset-1 ring-indigo-300' : ''}`}>
//                 {formatCurrency(p)}
//               </button>
//             ))}
//           </div>

//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-medium">Upload proof of payment</label>
//             <input type="file" accept="image/*,application/pdf" onChange={handleProofUpload} className="mb-2" />
//             {proofFile && <div className="text-xs">Selected: {proofFile.name}</div>}
//           </div>

//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-medium">USDT QR Code (tap to upload or replace)</label>
//             <div className="flex items-center gap-4">
//               <div className="w-32 h-32 bg-gray-50 rounded p-2 flex items-center justify-center border">
//                 {qrSrc ? (
//                   <img src={qrSrc} alt="USDT QR" className="max-w-full max-h-full" />
//                 ) : (
//                   <div className="text-center text-xs text-gray-500">QR Placeholder<br/><span className="text-2xl">📷</span></div>
//                 )}
//               </div>
//               <div>
//                 <input type="file" accept="image/*" onChange={(e)=>{const f=e.target.files?.[0]; if(f){const url=URL.createObjectURL(f); setQrSrc(url);}}} />
//                 <div className="text-xs mt-2">Or scan the wallet address manually.</div>
//               </div>
//             </div>
//           </div>

//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-medium">Risk warning</label>
//             <div className="text-xs text-red-700 bg-red-50 p-3 rounded">Investing in financial instruments involves risks. Past performance does not guarantee future results. By submitting you acknowledge the 50/50 profit share and agree to the terms.</div>
//           </div>

//           <div className="flex gap-3">
//             <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold">Submit Investment</button>
//             <button type="button" onClick={()=>{navigator.clipboard?.writeText(walletAddress)}} className="px-4 py-2 rounded-lg border">Copy Wallet</button>
//           </div>

//         </section>

//         {/* Right column: charts, breakdown, fxblue panel */}
//         <aside className="col-span-12 md:col-span-6 space-y-4">
//           <div className="bg-white p-4 rounded-2xl shadow-sm">
//             <h3 className="font-bold text-lg">Projected Compound Growth</h3>
//             <div className="flex gap-4 mt-4">
//               <div className="w-1/2 h-56">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label />
//                     {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>

//               <div className="flex-1">
//                 <div className="text-sm">Principal: <span className="font-semibold">{formatCurrency(Number(amount))}</span></div>
//                 <div className="text-sm">Projected Final Balance: <span className="font-semibold">{formatCurrency(breakdown.finalBalance)}</span></div>
//                 <div className="text-sm">Projected Profit: <span className="font-semibold">{formatCurrency(breakdown.profit)}</span></div>
//                 <div className="text-sm">Profit Split: <span className="font-semibold">You: {formatCurrency(breakdown.profit/2)} | Velox: {formatCurrency(breakdown.profit/2)}</span></div>
//                 <div className="mt-3 text-xs text-gray-600">Compound frequency: Monthly. Your returns are shown in nominal USD and assume consistent monthly compounding at the selected annual %.</div>
//               </div>
//             </div>

//             <div className="mt-4">
//               <div className="flex items-center justify-between text-sm">
//                 <div>Progress through term</div>
//                 <div className="font-semibold">{progressPercent}%</div>
//               </div>
//               <div className="w-full h-3 bg-gray-200 rounded mt-2 overflow-hidden">
//                 <div style={{ width: `${progressPercent}%` }} className="h-full bg-green-400" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-4 rounded-2xl shadow-sm">
//             <h3 className="font-bold text-lg">Compound Breakdown (monthly sample)</h3>
//             <div className="text-xs text-gray-600 mb-3">Showing first 12 months and final balance. Full month-by-month data available for download via export button.</div>
//             <div className="grid grid-cols-3 gap-2 text-sm">
//               <div className="font-semibold">Month</div>
//               <div className="font-semibold">Balance</div>
//               <div className="font-semibold">Change</div>
//             </div>
//             <div className="max-h-48 overflow-auto mt-2 text-sm">
//               {breakdown.monthlyBalances.slice(0,12).map(m=> (
//                 <div key={m.month} className="grid grid-cols-3 gap-2 py-1 border-b">
//                   <div>Month {m.month}</div>
//                   <div>{formatCurrency(m.balance)}</div>
//                   <div>{formatCurrency(m.balance - (m.month===1? Number(amount) : breakdown.monthlyBalances[m.month-2].balance))}</div>
//                 </div>
//               ))}
//             </div>

//             <div className="mt-3 flex justify-between items-center">
//               <div className="text-sm">Final: <span className="font-bold">{formatCurrency(breakdown.finalBalance)}</span></div>
//               <button type="button" onClick={()=>{
//                 // simple CSV export
//                 const rows = [['month','balance']].concat(breakdown.monthlyBalances.map(m=>[m.month, m.balance]));
//                 const csv = rows.map(r=>r.join(',')).join('\n');
//                 const blob = new Blob([csv], {type: 'text/csv'});
//                 const url = URL.createObjectURL(blob);
//                 const a = document.createElement('a'); a.href=url; a.download='compound_breakdown.csv'; a.click();
//               }} className="px-3 py-2 border rounded">Export CSV</button>
//             </div>
//           </div>

//           <div className="bg-white p-4 rounded-2xl shadow-sm">
//             <h3 className="font-bold text-lg">Withdrawals & Profit Share</h3>
//             <div className="text-sm mt-2">Withdrawals are allowed only after the stipulated term ends. Profit is shared 50/50 (non-negotiable). Partial withdrawals during term may incur penalties as defined in the terms.</div>
//             <div className="mt-3">
//               <label className="block mb-2 text-sm font-medium">Request withdrawal (available after end date)</label>
//               <input type="number" min={0} step={1} placeholder="Amount (USD)" className="p-2 border rounded w-48" />
//               <div className="text-xs text-gray-500 mt-2">If eligible, funds will be split 50/50 and processed to your registered payout method.</div>
//               <div className="mt-3">
//                 <button type="button" className="px-3 py-2 bg-green-600 text-white rounded">Request Withdrawal</button>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-4 rounded-2xl shadow-sm">
//             <h3 className="font-bold text-lg">FXBlue Analytics Panel</h3>
//             <div className="text-xs text-gray-600 mb-2">Paste your FXBlue public URL below to load live analytics (or use our shared account feed).</div>
//             <input type="text" value={fxblueLink} onChange={(e)=>setFxblueLink(e.target.value)} placeholder="https://www.fxblue.com/users/your-feed" className="w-full p-2 border rounded mb-2" />
//             <div className="h-48 bg-gray-50 rounded border overflow-hidden">
//               {fxblueLink ? (
//                 // embed as iframe (note: remote site must allow embedding)
//                 <iframe title="fxblue" src={fxblueLink} className="w-full h-full" />
//               ) : (
//                 <div className="p-4 text-sm text-gray-500">FXBlue preview not loaded. Paste a public FXBlue URL above to preview analytics.</div>
//               )}
//             </div>
//           </div>
//         </aside>

//       </form>

//     </div>
//   );
// }

























// import React, { useState, useMemo } from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// export default function VeloxRetirementInvestorUI() {
//   const presets = [
//     50000, 100000, 150000, 250000, 350000, 500000, 750000, 1000000,
//   ];

//   const [amount, setAmount] = useState(50000);
//   const [years, setYears] = useState(3);
//   const [annualRate, setAnnualRate] = useState(5);
//   const [walletAddress, setWalletAddress] = useState(
//     "Tether-USDT-TRC20-ADDRESS-PLACEHOLDER"
//   );
//   const [qrSrc, setQrSrc] = useState(null);
//   const [proofFile, setProofFile] = useState(null);
//   const [fxblueLink, setFxblueLink] = useState("");
//   const [startDate, setStartDate] = useState(
//     new Date().toISOString().slice(0, 10)
//   );

//   const MIN_YEARS = 3;
//   const MIN_RATE = 5;

//   function formatCurrency(n) {
//     return n.toLocaleString("en-US", {
//       style: "currency",
//       currency: "USD",
//       maximumFractionDigits: 2,
//     });
//   }

//   function handleProofUpload(e) {
//     const f = e.target.files[0];
//     setProofFile(f || null);
//   }

//   const breakdown = useMemo(() => {
//     const P = Number(amount);
//     const r = Number(annualRate) / 100;
//     const t = Math.max(Number(years), MIN_YEARS);
//     const months = t * 12;
//     const monthlyRate = r / 12;
//     const monthlyBalances = [];
//     let balance = P;
//     for (let m = 1; m <= months; m++) {
//       balance = balance * (1 + monthlyRate);
//       monthlyBalances.push({ month: m, balance: Number(balance.toFixed(2)) });
//     }
//     const finalBalance = monthlyBalances.at(-1)?.balance || P;
//     const profit = finalBalance - P;
//     return { monthlyBalances, finalBalance, profit };
//   }, [amount, annualRate, years]);

//   const pieData = [
//     { name: "Principal", value: Number(amount) },
//     { name: "Profit", value: Number(breakdown.profit.toFixed(2)) },
//   ];
//   const COLORS = ["#2dd4bf", "#60a5fa"];

//   const progressPercent = useMemo(() => {
//     try {
//       const start = new Date(startDate);
//       const now = new Date();
//       const end = new Date(start);
//       end.setFullYear(end.getFullYear() + Number(years));
//       if (now <= start) return 0;
//       if (now >= end) return 100;
//       const total = end - start;
//       const elapsed = now - start;
//       return Math.round((elapsed / total) * 100);
//     } catch {
//       return 0;
//     }
//   }, [startDate, years]);

//   function handleSubmit(e) {
//     e.preventDefault();
//     alert("Submission recorded locally in this demo UI.");
//   }

//   return (
//     <div className="max-w-6xl dark:bg-neutral-800 dark:text-white mx-auto p-4 sm:p-6 space-y-6">
//       {/* Header */}
//       <header className="flex dark:bg-neutral-800 dark:text-white flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//         <div className="dark:bg-neutral-800 dark:text-white">
//           <h1 className="text-xl dark:bg-neutral-800 dark:text-white sm:text-2xl font-extrabold">
//             Velox Capital — Retirement Investor Portal
//           </h1>
//           <p className="text-sm dark:bg-neutral-800 dark:text-white text-gray-600">
//             Designed for retirement personnel: invest, track, and withdraw
//             profit after tenure
//           </p>
//         </div>
//         <div className="text-sm sm:text-right">
//           <div>
//             Profit share:{" "}
//             <span className="font-semibold">50/50 (Non-negotiable)</span>
//           </div>
//           <div>
//             Min compoundable %: <span className="font-semibold">{MIN_RATE}%</span>
//           </div>
//         </div>
//       </header>

//       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 dark:bg-neutral-800 dark:text-white gap-6">
//         {/* Left Section */}
//         <section className="col-span-12 dark:bg-neutral-800 dark:text-white md:col-span-6 bg-white p-4 rounded-2xl shadow-sm">
//           <h2 className="text-lg dark:bg-neutral-800 dark:text-white font-bold mb-3">Investment Details</h2>

//           {/* Amount */}
//           <label className="block dark:bg-neutral-800 dark:text-white mb-2 text-sm font-medium">Amount (USD)</label>
//           <div className="flex dark:bg-neutral-800 dark:text-white flex-col sm:flex-row gap-2 mb-4">
//             <input
//               type="number"
//               min={0}
//               step={100}
//               value={amount}
//               onChange={(e) => setAmount(Number(e.target.value))}
//               className="flex-1 dark:bg-neutral-800 dark:text-white p-2 border rounded"
//             />
//             <button
//               type="button"
//               onClick={() => setAmount(0)}
//               className="px-3 dark:bg-neutral-800 dark:text-white dark:border dark:bg-teal-600 py-2 rounded bg-gray-100"
//             >
//               Clear
//             </button>
//           </div>

//           {/* Years */}
//           <label className="block mb-2 text-sm font-medium dark:bg-neutral-800 dark:text-white">
//             Compound period (years) — min {MIN_YEARS}
//           </label>
//           <input
//             type="number"
//             min={MIN_YEARS}
//             value={years}
//             onChange={(e) =>
//               setYears(Math.max(Number(e.target.value), MIN_YEARS))
//             }
//             className="w-full dark:bg-neutral-800 dark:text-white sm:w-32 p-2 border rounded mb-4"
//           />

//           {/* Annual Rate */}
//           <label className="block dark:bg-neutral-800 dark:text-white mb-2 text-sm font-medium">
//             Annual Rate (%) — min {MIN_RATE}
//           </label>
//           <input
//             type="number"
//             min={MIN_RATE}
//             step={0.1}
//             value={annualRate}
//             onChange={(e) =>
//               setAnnualRate(Math.max(Number(e.target.value), MIN_RATE))
//             }
//             className="w-full dark:bg-neutral-800 dark:text-white sm:w-32 p-2 border rounded mb-4"
//           />

//           {/* Start Date */}
//           <label className="block mb-2 text-sm font-medium dark:bg-neutral-800 dark:text-white">Start date</label>
//           <input
//             type="date"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             className="p-2 border dark:bg-neutral-800 dark:text-white rounded mb-4 w-full sm:w-auto"
//           />

//           {/* Wallet */}
//           <label className="block dark:bg-neutral-800 dark:text-white mb-2 text-sm font-medium">
//             USDT Wallet (credit to)
//           </label>
//           <input
//             type="text"
//             value={walletAddress}
//             onChange={(e) => setWalletAddress(e.target.value)}
//             className="w-full dark:bg-neutral-800 dark:text-white p-2 border rounded mb-4"
//           />

//           {/* Presets */}
//           <div className="grid dark:bg-neutral-800 dark:text-white grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
//             {presets.map((p) => (
//               <button
//                 key={p}
//                 type="button"
//                 onClick={() => setAmount(p)}
//                 className={`p-2 dark:bg-neutral-800 dark:text-white rounded-lg border ${
//                   amount === p ? "ring-2 ring-indigo-300" : ""
//                 }`}
//               >
//                 {formatCurrency(p)}
//               </button>
//             ))}
//           </div>

//           {/* Proof Upload */}
//           <label className="block dark:bg-neutral-800 dark:text-white mb-2 text-sm font-medium">
//             Upload proof of payment
//           </label>
//           <input
//             type="file"
//             accept="image/*,application/pdf"
//             onChange={handleProofUpload}
//             className="mb-2"
//           />
//           {proofFile && (
//             <div className="text-xs dark:bg-neutral-800 dark:text-white mb-4">Selected: {proofFile.name}</div>
//           )}

//           {/* QR Upload */}
//           <div className="mb-4 dark:bg-neutral-800 dark:text-white">
//             <label className="block dark:bg-neutral-800 dark:text-white  mb-2 text-sm font-medium">
//               USDT QR Code
//             </label>
//             <div className="flex dark:bg-neutral-800 dark:text-white flex-col sm:flex-row items-center gap-4">
//               <div className="w-32 h-32 bg-gray-50 rounded flex items-center justify-center border">
//                 {qrSrc ? (
//                   <img
//                     src={qrSrc}
//                     alt="QR"
//                     className="max-w-full max-h-full rounded"
//                   />
//                 ) : (
//                   <div className="text-xs  text-gray-500 text-center">
//                     QR Placeholder
//                   </div>
//                 )}
//               </div>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => {
//                   const f = e.target.files?.[0];
//                   if (f) setQrSrc(URL.createObjectURL(f));
//                 }}
//               />
//             </div>
//           </div>

//           {/* Risk */}
//           <div className="text-xs text-red-700 bg-red-50 p-3 rounded mb-4 dark:bg-neutral-800 dark:text-white dark:border">
//             Investing involves risks. Past performance does not guarantee
//             future results. By submitting, you acknowledge the 50/50 profit
//             share and agree to the terms.
//           </div>

//           <div className="flex flex-col sm:flex-row gap-3">
//             <button
//               type="submit"
//               className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold"
//             >
//               Submit
//             </button>
//             <button
//               type="button"
//               onClick={() => navigator.clipboard.writeText(walletAddress)}
//               className="px-4 py-2 rounded-lg border"
//             >
//               Copy Wallet
//             </button>
//           </div>
//         </section>

//         {/* Right Section */}
//         <aside className="col-span-12 dark:bg-neutral-800 dark:text-white  md:col-span-6 space-y-4">
//           {/* Chart */}
//           <div className="bg-white dark:border dark:bg-neutral-800 dark:text-white  p-4 rounded-2xl shadow-sm">
//             <h3 className="font-bold dark:bg-neutral-800 dark:text-white  text-lg mb-3">Projected Growth</h3>
//             <div className="flex flex-col dark:bg-neutral-800 dark:text-white  sm:flex-row gap-4">
//               <div className="w-full dark:bg-neutral-800 dark:text-white  sm:w-1/2 h-56">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie
//                       data={pieData}
//                       dataKey="value"
//                       nameKey="name"
//                       outerRadius={80}
//                       label
//                     >
//                       {pieData.map((entry, i) => (
//                         <Cell key={i} fill={COLORS[i % COLORS.length]} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//               <div className="text-sm dark:bg-neutral-800 dark:text-white  space-y-1">
//                 <div className="dark:bg-neutral-800 dark:text-white ">
//                   Principal:{" "}
//                   <span className="font-semibold">
//                     {formatCurrency(Number(amount))}
//                   </span>
//                 </div>
//                 <div className="dark:bg-neutral-800 dark:text-white ">
//                   Final Balance:{" "}
//                   <span className="font-semibold">
//                     {formatCurrency(breakdown.finalBalance)}
//                   </span>
//                 </div>
//                 <div className="dark:bg-neutral-800 dark:text-white ">
//                   Profit:{" "}
//                   <span className="font-semibold">
//                     {formatCurrency(breakdown.profit)}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Progress Bar */}
//             <div className="mt-4 dark:bg-neutral-800 dark:text-white ">
//               <div className="flex justify-between text-sm">
//                 <div>Progress</div>
//                 <div>{progressPercent}%</div>
//               </div>
//               <div className="w-full h-3 bg-gray-200 rounded mt-2 overflow-hidden">
//                 <div
//                   style={{ width: `${progressPercent}%` }}
//                   className="h-full bg-green-400"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Breakdown */}
//           <div className="bg-white p-4 dark:bg-neutral-800 dark:text-white dark:border rounded-2xl shadow-sm">
//             <h3 className="font-bold text-lg">Monthly Breakdown</h3>
//             <div className="max-h-48 overflow-auto mt-2 text-sm">
//               {breakdown.monthlyBalances.slice(0, 12).map((m) => (
//                 <div
//                   key={m.month}
//                   className="grid grid-cols-3 gap-2 py-1 border-b"
//                 >
//                   <div>Month {m.month}</div>
//                   <div>{formatCurrency(m.balance)}</div>
//                   <div>
//                     {formatCurrency(
//                       m.balance -
//                         (m.month === 1
//                           ? Number(amount)
//                           : breakdown.monthlyBalances[m.month - 2].balance)
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </aside>
//       </form>
//     </div>
//   );
// }







// src/components/invest/VeloxRetirementInvestorUI.jsx
import React, { useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function VeloxRetirementInvestorUI() {
  const presets = [
    50000, 100000, 150000, 250000, 350000, 500000, 750000, 1000000,
  ];

  const [amount, setAmount] = useState(50000);
  const [years, setYears] = useState(3);
  const [annualRate, setAnnualRate] = useState(8); // Slightly higher default for realism
  const [reinvest, setReinvest] = useState(100); // 0–100% reinvest control
  const [walletAddress, setWalletAddress] = useState(
    "Tether-USDT-TRC20-ADDRESS-PLACEHOLDER"
  );
  const [qrSrc, setQrSrc] = useState(null);
  const [proofFile, setProofFile] = useState(null);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const MIN_YEARS = 3;
  const MIN_RATE = 5;

  // Format currency
  const formatCurrency = (n) => {
    return n.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    });
  };

  // Handle proof upload
  const handleProofUpload = (e) => {
    const file = e.target.files[0];
    setProofFile(file || null);
  };

  // YOUR EXACT DAILY COMPOUNDING LOGIC WITH REINVEST %
  const { finalBalance, totalProfit } = useMemo(() => {
    let P = Number(amount);
    const dailyRate = Number(annualRate) / 100 / 365;
    const totalDays = Math.max(Number(years), MIN_YEARS) * 365;
    const reinvestRate = Number(reinvest) / 100;

    if (isNaN(P) || isNaN(dailyRate) || isNaN(totalDays)) {
      return { finalBalance: P, totalProfit: 0 };
    }

    // Daily compounding loop
    for (let i = 0; i < totalDays; i++) {
      const dailyProfit = P * dailyRate;
      P += dailyProfit * reinvestRate; // Only reinvest portion is added back
    }

    const profit = P - amount;
    return {
      finalBalance: Number(P.toFixed(2)),
      totalProfit: Number(profit.toFixed(2)),
    };
  }, [amount, annualRate, years, reinvest]);

  // Pie chart data
  const pieData = [
    { name: "Principal", value: Number(amount) },
    { name: "Profit", value: totalProfit },
  ];
  const COLORS = ["#0d9488", "#10b981"]; // Teal → Green

  // Progress bar (from start date)
  const progressPercent = useMemo(() => {
    try {
      const start = new Date(startDate);
      const now = new Date();
      const end = new Date(start);
      end.setFullYear(end.getFullYear() + Number(years));

      if (now <= start) return 0;
      if (now >= end) return 100;

      const totalMs = end - start;
      const elapsedMs = now - start;
      return Math.min(100, Math.round((elapsedMs / totalMs) * 100));
    } catch {
      return 0;
    }
  }, [startDate, years]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Investment submitted!\nFinal projected balance: ${formatCurrency(
        finalBalance
      )}\nProfit: ${formatCurrency(totalProfit)}`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 py-8 px-4">
      <div className="max-w-8xl mx-auto">

        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00A991] to-emerald-600">
            Velox Capital — Retirement Investor Portal
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
            Long-term compounding • Full reinvestment control • 50/50 profit share
          </p>
        </header>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT: Investment Form */}
          <section className="lg:col-span-7 bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl p-8 space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Investment Details</h2>

            {/* Amount Presets */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Investment Amount (USD)
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-5">
                {presets.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setAmount(p)}
                    className={`py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 ${
                      amount === p
                        ? "bg-gradient-to-r from-[#00A991] to-emerald-600 text-white shadow-xl"
                        : "bg-gray-100 dark:bg-neutral-700 hover:bg-gray-200 dark:hover:bg-neutral-600"
                    }`}
                  >
                    {formatCurrency(p)}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Math.max(1000, Number(e.target.value) || 0))}
                className="w-full px-5 py-4 text-2xl font-bold text-center border-2 border-gray-300 dark:border-neutral-600 rounded-2xl focus:border-[#00A991] focus:outline-none transition"
                placeholder="Enter custom amount"
              />
            </div>

            {/* Years & Rate */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Compound Period (Years) — min {MIN_YEARS}
                </label>
                <input
                  type="number"
                  min={MIN_YEARS}
                  value={years}
                  onChange={(e) => setYears(Math.max(MIN_YEARS, Number(e.target.value)))}
                  className="w-full px-5 py-4 border-2 rounded-2xl text-lg font-bold text-center"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Expected Annual Return (%) — min {MIN_RATE}
                </label>
                <input
                  type="number"
                  min={MIN_RATE}
                  step={0.1}
                  value={annualRate}
                  onChange={(e) => setAnnualRate(Math.max(MIN_RATE, Number(e.target.value)))}
                  className="w-full px-5 py-4 border-2 rounded-2xl text-lg font-bold text-center"
                />
              </div>
            </div>

            {/* REINVEST SLIDER — THE HERO FEATURE */}
            <div className="bg-gradient-to-r from-[#00A991]/10 via-emerald-50 to-teal-50 dark:from-[#00A991]/20 dark:via-emerald-900/20 dark:to-teal-900/20 rounded-3xl p-8 border-2 border-[#00A991]/30">
              <h3 className="text-2xl font-bold text-[#00A991] mb-6 text-center">
                Reinvest Profit: <span className="text-4xl">{reinvest}%</span>
              </h3>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={reinvest}
                onChange={(e) => setReinvest(Number(e.target.value))}
                className="w-full h-4 rounded-full appearance-none cursor-pointer slider-thumb"
                style={{
                  background: `linear-gradient(to right, #10b981 0%, #10b981 ${reinvest}%, #e5e7eb ${reinvest}%, #e5e7eb 100%)`,
                }}
              />
              <div className="flex justify-between mt-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                <span>Withdraw All Profit</span>
                <span className="text-[#00A991] font-bold">{reinvest}% Reinvested</span>
                <span>Full Compounding</span>
              </div>
            </div>

            {/* Wallet & Proof */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">USDT TRC20 Wallet Address</label>
                <input
                  type="text"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="w-full px-5 py-4 border-2 rounded-2xl font-mono text-sm bg-gray-50 dark:bg-neutral-700"
                  placeholder="T... (TRC20)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Upload Proof of Payment</label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleProofUpload}
                  className="w-full file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:bg-[#00A991] file:text-white hover:file:bg-emerald-600"
                />
                {proofFile && (
                  <p className="mt-2 text-sm text-green-600 font-medium">
                    Uploaded: {proofFile.name}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-6 bg-gradient-to-r from-[#00A991] to-emerald-600 text-white font-extrabold text-2xl rounded-3xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Submit Investment
              </button>
            </div>
          </section>

          {/* RIGHT: Results Dashboard */}
          <aside className="lg:col-span-5 space-y-8">

            {/* Final Projection Card */}
            <div className="bg-gradient-to-br from-[#00A991] via-emerald-600 to-teal-700 rounded-3xl shadow-2xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-8 text-center">Your Projected Outcome</h3>
              <div className="space-y-6 text-xl">
                <div className="flex justify-between">
                  <span>Initial Capital</span>
                  <span className="font-bold">{formatCurrency(amount)}</span>
                </div>
                <div className="text-4xl font-extrabold py-4 bg-white/20 rounded-2xl text-center">
                  Final Balance: {formatCurrency(finalBalance)}
                </div>
                <div className="flex justify-between text-2xl">
                  <span>Total Profit</span>
                  <span className="font-extrabold text-yellow-300">
                    {formatCurrency(totalProfit)}
                  </span>
                </div>
                <div className="pt-6 border-t border-white/30 text-center">
                  <p className="text-sm opacity-90">Reinvested: {reinvest}% • Withdrawn: {(100 - reinvest)}%</p>
                </div>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl p-6">
              <h3 className="text-xl font-bold mb-4 text-center">Capital Allocation</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={110}
                    label={({ name, value }) => `${name}: ${formatCurrency(value)}`}
                    labelLine={false}
                  >
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => formatCurrency(v)} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Progress */}
            <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl p-6">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-bold text-lg">Investment Progress</h4>
                <span className="text-3xl font-extrabold text-[#00A991]">{progressPercent}%</span>
              </div>
              <div className="w-full h-10 bg-gray-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                <div
                  style={{ width: `${progressPercent}%` }}
                  className="h-full bg-gradient-to-r from-[#00A991] to-emerald-500 transition-all duration-1000 ease-out"
                />
              </div>
            </div>
          </aside>
        </form>

        {/* Footer */}
        <div className="text-center mt-16 text-sm text-gray-500 dark:text-gray-400">
          <p>VeloXCapitalMarkets • {new Date().getFullYear()} • High-Performance Algorithmic Trading</p>
        </div>
      </div>
    </div>
  );
}