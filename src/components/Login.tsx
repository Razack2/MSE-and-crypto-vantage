import { useState } from 'react';
import { TrendingUp, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

interface LoginProps {
  onLogin: (email: string, password: string) => boolean;
  onSwitchToRegister: () => void;
  onBackToHome?: () => void;
}

export function Login({ onLogin, onSwitchToRegister, onBackToHome }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      // Admin credentials
      if (email === 'admin@mse-vantage.com' && password === 'razack123') {
        const adminUser = {
          id: 'admin',
          name: 'Admin User',
          email,
          role: 'admin',
          subscription: 'premium', // full access
          progress: {
            completedLessons: Array.from({ length: 24 }, (_, i) => i + 1), // mark all lessons complete
            quizScores: Array.from({ length: 24 }, () => 100),
            currentLevel: 3
          },
          portfolio: { cash: 1000000, positions: [], history: [] },
          watchlist: [],
          alerts: []
        };

        localStorage.setItem('stocklearn_user', JSON.stringify(adminUser));
        localStorage.setItem('stocklearn_session', Date.now().toString());
        toast.success('Welcome Admin! Full access granted.');
        onLogin(email, password); // triggers parent state update
      } else {
        // Normal login
        const success = onLogin(email, password);
        if (success) toast.success('Welcome back!');
        else toast.error('Invalid email or password');
      }

      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      {onBackToHome && (
        <button
          onClick={onBackToHome}
          className="fixed top-4 left-4 flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>
      )}

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-gray-900 mb-2">Welcome to StockLearn</h1>
          <p className="text-gray-600">Learn, trade, and analyze stocks with confidence</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
                <span className="ml-2 text-gray-700">Remember me</span>
              </label>
              <button type="button" className="text-blue-600 hover:text-blue-700">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button onClick={onSwitchToRegister} className="text-blue-600 hover:text-blue-700">
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
