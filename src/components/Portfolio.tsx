import { TrendingUp, TrendingDown, DollarSign, PieChart, Activity } from 'lucide-react';
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface PortfolioProps {
  user: any;
}

const positions = [

  { symbol: 'AIRTEL', name: 'Airtel Malawi', shares: 1000, avgPrice: 110.00, currentPrice: 113.98, value: 113980 },

  { symbol: 'FDHB', name: 'FDH Bank', shares: 500, avgPrice: 580.00, currentPrice: 593.96, value: 296980 },

  { symbol: 'NBM', name: 'National Bank of Malawi', shares: 50, avgPrice: 11500.00, currentPrice: 11719.27, value: 585963.5 },

  { symbol: 'NICO', name: 'NICO Holdings', shares: 200, avgPrice: 1650.00, currentPrice: 1694.57, value: 338914 },

];

const portfolioHistory = [

  { date: 'Jan', value: 900000 },

  { date: 'Feb', value: 920000 },

  { date: 'Mar', value: 950000 },

  { date: 'Apr', value: 980000 },

  { date: 'May', value: 1020000 },

  { date: 'Jun', value: 1080000 },

  { date: 'Jul', value: 1130000 },

];

const allocationData = [

  { name: 'AIRTEL', value: 113980, color: '#3b82f6' },

  { name: 'FDHB', value: 296980, color: '#8b5cf6' },

  { name: 'NBM', value: 585963.5, color: '#10b981' },

  { name: 'NICO', value: 338914, color: '#f59e0b' },

  { name: 'Cash', value: 200000, color: '#6b7280' },

];

const recentTrades = [

  { date: 'Today', type: 'buy', symbol: 'AIRTEL', shares: 500, price: 113.98, total: 56990 },

  { date: 'Yesterday', type: 'buy', symbol: 'NBM', shares: 10, price: 11719.27, total: 117192.7 },

  { date: '2 days ago', type: 'sell', symbol: 'FDHB', shares: 100, price: 593.96, total: 59396 },

  { date: '3 days ago', type: 'buy', symbol: 'NICO', shares: 50, price: 1694.57, total: 84728.5 },

];

export function Portfolio({ user }: PortfolioProps) {

  const totalValue = 1537837.5;

  const totalCost = 1400000;

  const totalGain = totalValue - totalCost;

  const totalGainPercent = (totalGain / totalCost) * 100;

  return (

<div className="p-8">

{/* Summary */}

<div className="grid grid-cols-4 gap-6 mb-8">

<div className="bg-white p-6 border rounded-xl">

<span>Total Value</span>

<div>MK {totalValue.toLocaleString()}</div>

<div className="text-green-600">

+{totalGainPercent.toFixed(2)}%

</div>

</div>

<div className="bg-white p-6 border rounded-xl">

<span>Total Gain</span>

<div>MK {totalGain.toLocaleString()}</div>

</div>

<div className="bg-white p-6 border rounded-xl">

<span>Cash</span>

<div>MK {user.portfolio.cash.toLocaleString()}</div>

</div>

<div className="bg-white p-6 border rounded-xl">

<span>Positions</span>

<div>{positions.length}</div>

</div>

</div>

{/* Chart */}

<div className="grid grid-cols-3 gap-6 mb-8">

<div className="col-span-2 bg-white p-6 border rounded-xl">

<h3>Portfolio Performance</h3>

<ResponsiveContainer width="100%" height={300}>

<AreaChart data={portfolioHistory}>

<XAxis dataKey="date"/>

<YAxis/>

<Tooltip/>

<Area dataKey="value"/>

</AreaChart>

</ResponsiveContainer>

</div>

{/* Allocation */}

<div className="bg-white p-6 border rounded-xl">

<h3>Allocation</h3>

<ResponsiveContainer width="100%" height={200}>

<RechartsPie>

<Pie data={allocationData} dataKey="value">

{allocationData.map((entry, index) => (

<Cell key={index} fill={entry.color}/>

))}

</Pie>

</RechartsPie>

</ResponsiveContainer>

</div>

</div>

{/* Holdings */}

<div className="bg-white p-6 border rounded-xl mb-8">

<h3>Holdings</h3>

<table className="w-full">

<thead>

<tr>

<th>Symbol</th>

<th>Shares</th>

<th>Avg Price</th>

<th>Current</th>

<th>Value</th>

<th>Gain</th>

</tr>

</thead>

<tbody>

{positions.map(position => {

const gain = (position.currentPrice-position.avgPrice)*position.shares;

return(

<tr key={position.symbol}>

<td>{position.symbol}</td>

<td>{position.shares}</td>

<td>MK {position.avgPrice}</td>

<td>MK {position.currentPrice}</td>

<td>MK {position.value}</td>

<td className={gain>=0?"text-green-600":"text-red-600"}>

MK {gain.toFixed(2)}

</td>

</tr>

)

})}

</tbody>

</table>

</div>

{/* Trades */}

<div className="bg-white p-6 border rounded-xl">

<h3>Recent Trades</h3>

{recentTrades.map((trade,index)=>(

<div key={index}>

{trade.type.toUpperCase()} {trade.symbol}

MK {trade.total}

</div>

))}

</div>

</div>

);

}
