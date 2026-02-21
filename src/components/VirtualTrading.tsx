import { useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Search, DollarSign } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface VirtualTradingProps {
  user: any;
  onBack: () => void;
}

const mockStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 178.45, change: 2.34, changePercent: 1.33 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 141.80, change: -1.20, changePercent: -0.84 },
  { symbol: 'MSFT', name: 'Microsoft Corporation', price: 378.91, change: 5.67, changePercent: 1.52 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 156.78, change: 3.21, changePercent: 2.09 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 242.84, change: -4.32, changePercent: -1.75 },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 495.22, change: 8.91, changePercent: 1.83 },
];

export function VirtualTrading({ user, onBack }: VirtualTradingProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStock, setSelectedStock] = useState<any>(null);
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [quantity, setQuantity] = useState(1);
  const [orderMode, setOrderMode] = useState<'market' | 'limit'>('market');
  const [limitPrice, setLimitPrice] = useState('');

  const filteredStocks = mockStocks.filter(stock => 
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTrade = () => {
    if (!selectedStock) return;

    const totalCost = selectedStock.price * quantity;
    
    if (orderType === 'buy' && totalCost > user.portfolio.cash) {
      toast.error('Insufficient funds for this trade');
      return;
    }

    toast.success(`${orderType === 'buy' ? 'Bought' : 'Sold'} ${quantity} shares of ${selectedStock.symbol}`);
    setSelectedStock(null);
    setQuantity(1);
  };

  return (
    <div className="p-8">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Beginner Mode
      </button>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="text-gray-600 mb-2">Available Cash</div>
          <div className="text-gray-900">${user.portfolio.cash.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="text-gray-600 mb-2">Portfolio Value</div>
          <div className="text-gray-900">$112,450</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="text-gray-600 mb-2">Total Return</div>
          <div className="text-green-600">+$12,450 (12.45%)</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Stock List */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Available Stocks</h3>
          
          <div className="mb-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search stocks..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredStocks.map((stock) => (
              <button
                key={stock.symbol}
                onClick={() => setSelectedStock(stock)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  selectedStock?.symbol === stock.symbol
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <div className="text-gray-900">{stock.symbol}</div>
                    <div className="text-gray-600">{stock.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-900">${stock.price}</div>
                    <div className={`flex items-center gap-1 ${
                      stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stock.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span>{stock.changePercent.toFixed(2)}%</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Trading Panel */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Place Order</h3>
          
          {selectedStock ? (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-gray-900 mb-1">{selectedStock.symbol}</div>
                <div className="text-gray-600 mb-2">{selectedStock.name}</div>
                <div className="text-gray-900">${selectedStock.price}</div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Order Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setOrderType('buy')}
                    className={`py-2 rounded-lg border-2 transition-all ${
                      orderType === 'buy'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 text-gray-700'
                    }`}
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => setOrderType('sell')}
                    className={`py-2 rounded-lg border-2 transition-all ${
                      orderType === 'sell'
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-200 text-gray-700'
                    }`}
                  >
                    Sell
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Order Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setOrderMode('market')}
                    className={`py-2 rounded-lg border-2 transition-all ${
                      orderMode === 'market'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 text-gray-700'
                    }`}
                  >
                    Market
                  </button>
                  <button
                    onClick={() => setOrderMode('limit')}
                    className={`py-2 rounded-lg border-2 transition-all ${
                      orderMode === 'limit'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 text-gray-700'
                    }`}
                  >
                    Limit
                  </button>
                </div>
              </div>

              {orderMode === 'limit' && (
                <div>
                  <label className="block text-gray-700 mb-2">Limit Price</label>
                  <input
                    type="number"
                    value={limitPrice}
                    onChange={(e) => setLimitPrice(e.target.value)}
                    placeholder="Enter price"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-gray-700 mb-2">Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Total Cost</span>
                  <span className="text-gray-900">${(selectedStock.price * quantity).toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Available Cash</span>
                  <span className="text-gray-900">${user.portfolio.cash.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleTrade}
                className={`w-full py-3 rounded-lg text-white transition-colors ${
                  orderType === 'buy'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {orderType === 'buy' ? 'Buy' : 'Sell'} {quantity} {quantity === 1 ? 'Share' : 'Shares'}
              </button>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              Select a stock to start trading
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
