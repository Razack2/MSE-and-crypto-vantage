import { useState } from 'react';
import { Plus, TrendingUp, TrendingDown, Bell, Star, Trash2 } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';

interface AnalyticsModeProps {
  user: any;
}

const chartData = [
  { date: 'Day 1', open: 113.50, high: 114.20, low: 113.00, close: 113.98, volume: 15297 },
  { date: 'Day 2', open: 590, high: 600, low: 589, close: 593.96, volume: 109679 },
  { date: 'Day 3', open: 2790, high: 2800, low: 2780, close: 2794.99, volume: 773 },
  { date: 'Day 4', open: 1690, high: 1700, low: 1680, close: 1694.57, volume: 9913 },
  { date: 'Day 5', open: 30.90, high: 31.50, low: 30.50, close: 31.23, volume: 26766 },
];

const watchlistStocks = [

  { symbol: 'AIRTEL', name: 'Airtel Malawi', price: 113.98, change: 0, changePercent: 0, volume: 15297 },

  { symbol: 'FDHB', name: 'FDH Bank', price: 593.96, change: -0.01, changePercent: -0.01, volume: 109679 },

  { symbol: 'FMBCH', name: 'FMB Capital Holdings', price: 2794.99, change: -0.18, changePercent: -0.18, volume: 773 },

  { symbol: 'NBM', name: 'National Bank of Malawi', price: 11719.27, change: 0, changePercent: 0, volume: 4170 },

  { symbol: 'NBS', name: 'NBS Bank', price: 858.93, change: 0, changePercent: 0, volume: 52501 },

  { symbol: 'NICO', name: 'NICO Holdings', price: 1694.57, change: -0.19, changePercent: -0.19, volume: 9913 },

  { symbol: 'STANDARD', name: 'Standard Bank Malawi', price: 4238.68, change: 0, changePercent: 0, volume: 4900 },

  { symbol: 'TNM', name: 'Telekom Networks Malawi', price: 31.23, change: -0.03, changePercent: -0.03, volume: 26766 },

];

const indicators = [
  { name: 'MSE Index RSI', value: '54.2', status: 'neutral' },
  { name: 'Market Momentum', value: 'Moderate', status: 'bullish' },
  { name: 'Volume Strength', value: 'Stable', status: 'neutral' },
  { name: 'Trend Direction', value: 'Uptrend', status: 'bullish' },
];

export function AnalyticsMode({ user }: AnalyticsModeProps) {

  const [selectedStock, setSelectedStock] = useState('AIRTEL');

  const [chartType, setChartType] = useState<'line' | 'candle' | 'volume'>('line');

  const [timeframe, setTimeframe] = useState('1W');

  const [showAddAlert, setShowAddAlert] = useState(false);

  const handleAddToWatchlist = () => {
    toast.success('Stock added to watchlist');
  };

  const handleRemoveFromWatchlist = (symbol: string) => {
    toast.success(`${symbol} removed from watchlist`);
  };

  const handleCreateAlert = () => {
    toast.success('Price alert created successfully');
    setShowAddAlert(false);
  };

  return (

<div className="p-8">

{/* Market Summary */}

<div className="grid grid-cols-4 gap-6 mb-8">

<div className="bg-white rounded-xl p-6 border">

<span>MSE Index</span>

<div>245,678.32</div>

<div className="text-green-600">+0.12%</div>

</div>

<div className="bg-white rounded-xl p-6 border">

<span>Total Volume</span>

<div>242,000</div>

<div className="text-blue-600">Shares</div>

</div>

<div className="bg-white rounded-xl p-6 border">

<span>Top Gainer</span>

<div>AIRTEL</div>

<div className="text-green-600">MK113.98</div>

</div>

<div className="bg-white rounded-xl p-6 border">

<span>Top Loser</span>

<div>NICO</div>

<div className="text-red-600">-0.19%</div>

</div>

</div>

<div className="grid grid-cols-3 gap-6">

{/* Chart */}

<div className="col-span-2 bg-white p-6 rounded-xl border">

<h2>{selectedStock}</h2>

<button onClick={handleAddToWatchlist}><Star /> Add </button>

<ResponsiveContainer width="100%" height={300}>

{chartType === 'volume' ? (

<BarChart data={chartData}>

<XAxis dataKey="date"/>

<YAxis/>

<Tooltip/>

<Bar dataKey="volume"/>

</BarChart>

) : (

<LineChart data={chartData}>

<XAxis dataKey="date"/>

<YAxis/>

<Tooltip/>

<Line dataKey="close"/>

</LineChart>

)}

</ResponsiveContainer>

</div>

{/* Watchlist */}

<div className="bg-white p-6 rounded-xl border">

<h3>MSE Watchlist</h3>

{watchlistStocks.map(stock => (

<div key={stock.symbol}>

<div>{stock.symbol}</div>

<div>MK {stock.price}</div>

<div>

{stock.change >= 0 ? <TrendingUp/> : <TrendingDown/>}

{stock.changePercent}%

</div>

<button onClick={() => handleRemoveFromWatchlist(stock.symbol)}>

<Trash2/>

</button>

</div>

))}

</div>

</div>

</div>

  );

}
