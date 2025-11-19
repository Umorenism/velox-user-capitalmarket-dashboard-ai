import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const data = [
  { name: "1", deposit: 200, usd: 180, ib: 160, mt5: 140 },
  { name: "2", deposit: 220, usd: 190, ib: 150, mt5: 130 },
  { name: "3", deposit: 210, usd: 200, ib: 170, mt5: 140 },
  { name: "4", deposit: 230, usd: 190, ib: 160, mt5: 120 },
  { name: "5", deposit: 210, usd: 200, ib: 180, mt5: 130 },
  { name: "6", deposit: 215, usd: 195, ib: 170, mt5: 140 },
  { name: "7", deposit: 220, usd: 185, ib: 175, mt5: 130 },
  { name: "8", deposit: 205, usd: 190, ib: 165, mt5: 140 },
  { name: "9", deposit: 210, usd: 180, ib: 170, mt5: 130 },
  { name: "10", deposit: 215, usd: 185, ib: 160, mt5: 140 },
  { name: "11", deposit: 225, usd: 195, ib: 170, mt5: 130 },
  { name: "12", deposit: 210, usd: 190, ib: 175, mt5: 140 },
]

export default function PortfolioOverview() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
      <h2 className="text-lg font-semibold mb-4">Portfolio Overview</h2>
      <hr />

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={8}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip cursor={{ fill: "rgba(0,0,0,0.03)" }} />
            <Legend verticalAlign="top" align="center" iconType="circle" />
            <Bar dataKey="deposit" stackId="a" fill="#0B8A6E" name="Deposit Wallet" />
            <Bar dataKey="usd" stackId="a" fill="#63C2A3" name="USD Wallet" />
            <Bar dataKey="ib" stackId="a" fill="#9ADCC7" name="IB Wallet" />
            <Bar dataKey="mt5" stackId="a" fill="#C6EFE1" name="MT5 Total Balance" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
