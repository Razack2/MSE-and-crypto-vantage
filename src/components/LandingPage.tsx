import { TrendingUp, BookOpen, LineChart, Trophy, Shield, Zap, CheckCircle, ArrowRight, Users, Star, BarChart3 } from 'lucide-react';

interface LandingPageProps {
  onNavigateToLogin: () => void;
  onNavigateToRegister: () => void;
}

export function LandingPage({ onNavigateToLogin, onNavigateToRegister}: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-gray-900">MSE Vantage</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={onNavigateToLogin}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={onNavigateToRegister}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6">
              <Star className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600">Trusted by 50,000+ traders</span>
            </div>
            <h1 className="text-gray-900 mb-6">
              Master Stock Trading with
              <span className="block text-blue-600">AI-Powered Learning</span>
            </h1>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Transform from beginner to expert trader with our comprehensive platform featuring guided lessons, 
              virtual trading simulator, and real-time analytics powered by advanced AI insights.
            </p>
            <div className="flex items-center justify-center gap-4 mb-12">
              <button
                onClick={onNavigateToRegister}
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={onNavigateToLogin}
                className="px-8 py-4 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors"
              >
                Watch Demo
              </button>
            </div>
            <div className="flex items-center justify-center gap-8 text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-gray-900 mb-4">Everything You Need to Succeed</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform combines education, practice, and real-time analytics in one powerful suite
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BookOpen className="w-8 h-8 text-blue-600" />}
              title="Beginner Mode"
              description="Step-by-step lessons designed for complete beginners. Learn trading fundamentals with interactive modules and quizzes."
              features={['20+ Guided Lessons', 'Interactive Quizzes', 'Progress Tracking', 'Certificate of Completion']}
            />
            <FeatureCard
              icon={<Trophy className="w-8 h-8 text-purple-600" />}
              title="Virtual Trading"
              description="Practice with $100,000 virtual cash. Learn risk-free trading with real market data and track your performance."
              features={['$100K Virtual Money', 'Real-time Market Data', 'P&L Tracking', 'Trade History']}
            />
            <FeatureCard
              icon={<LineChart className="w-8 h-8 text-green-600" />}
              title="Analytics Mode"
              description="Professional-grade tools for market analysis. Access advanced charts, technical indicators, and custom watchlists."
              features={['Candlestick Charts', 'Technical Indicators', 'Custom Watchlists', 'Price Alerts']}
            />
            <FeatureCard
              icon={<BarChart3 className="w-8 h-8 text-orange-600" />}
              title="Real-time Data"
              description="Stay ahead with live market updates. Get instant access to stock prices, volume, and market movements."
              features={['Live Price Updates', 'Market News', 'Volume Analysis', 'Daily Summaries']}
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-red-600" />}
              title="Risk Management"
              description="Learn to protect your capital with proven risk management strategies and portfolio optimization tools."
              features={['Position Sizing', 'Stop Loss Calculator', 'Risk/Reward Ratio', 'Portfolio Balance']}
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8 text-yellow-600" />}
              title="Advanced Analytics"
              description="Unlock premium features with Pro subscription. Get AI-powered insights and advanced technical analysis."
              features={['AI Predictions', 'Pattern Recognition', 'Backtesting Tools', 'Custom Indicators']}
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Start your trading journey in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <StepCard
              number="1"
              title="Sign Up & Choose Your Path"
              description="Create your free account and select between Beginner Mode for guided learning or Analytics Mode for immediate market access."
            />
            <StepCard
              number="2"
              title="Learn & Practice"
              description="Complete interactive lessons, take quizzes, and practice trading with virtual money in a risk-free environment."
            />
            <StepCard
              number="3"
              title="Analyze & Trade"
              description="Use professional analytics tools, set up watchlists, and apply your knowledge with confidence in real markets."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <StatCard number="50,000+" label="Active Traders" />
            <StatCard number="1M+" label="Trades Executed" />
            <StatCard number="95%" label="Success Rate" />
            <StatCard number="4.9/5" label="User Rating" />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the plan that's right for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              name="Free"
              price="Mwk 0"
              period="forever"
              features={[
                'Access to Beginner Mode',
                '5 Guided Lessons',
                'Basic Virtual Trading',
                'Community Support'
              ]}
              buttonText="Get Started"
              onClick={onNavigateToRegister}
            />
            <PricingCard
              name="Pro"
              price="Mwk 29,000"
              period="per month"
              features={[
                'All Free features',
                'Full Analytics Mode',
                'Unlimited Virtual Trading',
                'Advanced Charts & Indicators',
                'Price Alerts',
                'Priority Support'
              ]}
              buttonText="Start Free Trial"
              onClick={onNavigateToRegister}
              highlighted
            />
            <PricingCard
              name="Premium"
              price="Mwk 59,000"
              period="per month"
              features={[
                'All Pro features',
                'AI-Powered Insights',
                'Custom Indicators',
                'Backtesting Tools',
                'Dedicated Account Manager',
                '1-on-1 Coaching Sessions'
              ]}
              buttonText="Contact Sales"
              onClick={onNavigateToRegister}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white mb-4">Ready to Start Your Trading Journey?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful traders who have transformed their financial future with StockLearn Pro
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={onNavigateToRegister}
              className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Start Free Trial
            </button>
            <button
              onClick={onNavigateToLogin}
              className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-white">MSE Vantage</span>
              </div>
              <p className="text-gray-400">
                Master stock trading with AI-powered learning and analytics.
              </p>
            </div>
            <div>
              <h4 className="text-white mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2026 MSE Vantage. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

function FeatureCard({ icon, title, description, features }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
      <div className="mb-4">{icon}</div>
      <h3 className="text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-gray-700">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface StepCardProps {
  number: string;
  title: string;
  description: string;
}

function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
        <span className="text-blue-600">{number}</span>
      </div>
      <h3 className="text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

interface StatCardProps {
  number: string;
  label: string;
}

function StatCard({ number, label }: StatCardProps) {
  return (
    <div>
      <div className="mb-2">{number}</div>
      <p className="text-blue-100">{label}</p>
    </div>
  );
}

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  onClick: () => void;
  highlighted?: boolean;
}

function PricingCard({ name, price, period, features, buttonText, onClick, highlighted }: PricingCardProps) {
  return (
    <div className={`rounded-2xl p-8 ${highlighted ? 'bg-blue-600 text-white border-2 border-blue-600 transform scale-105' : 'bg-white border border-gray-200'}`}>
      <h3 className={`mb-2 ${highlighted ? 'text-white' : 'text-gray-900'}`}>{name}</h3>
      <div className="mb-6">
        <span className={`text-4xl ${highlighted ? 'text-white' : 'text-gray-900'}`}>{price}</span>
        <span className={highlighted ? 'text-blue-100' : 'text-gray-600'}> / {period}</span>
      </div>
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${highlighted ? 'text-blue-200' : 'text-green-600'}`} />
            <span className={highlighted ? 'text-blue-50' : 'text-gray-700'}>{feature}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={onClick}
        className={`w-full py-3 rounded-lg transition-colors ${
          highlighted
            ? 'bg-white text-blue-600 hover:bg-gray-100'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
}
