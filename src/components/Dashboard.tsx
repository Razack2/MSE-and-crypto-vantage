import { useState } from 'react';
import { 
  TrendingUp, 
  BookOpen, 
  BarChart3, 
  Wallet, 
  Bell, 
  Settings, 
  LogOut, 
  User,
  Crown,
  GraduationCap,
  Target
} 
from 'lucide-react';
import { LearningHub } from './LearningHub';
import { AnalyticsMode } from './AnalyticsMode';
import { Portfolio } from './Portfolio';
import { SettingsPanel } from './SettingsPanel';

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [currentView, setCurrentView] = useState<
  'learning' | 'level' | 'lesson' | 'analytics' | 'portfolio' | 'settings'
>('learning');

const [selectedLevel, setSelectedLevel] = useState<any>(null);
const [selectedLesson, setSelectedLesson] = useState<any>(null);

  const [notifications, setNotifications] = useState(3);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const handleUpgrade = () => {
    setShowUpgradeModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-gray-900">MSE</div>
              <div className="text-gray-500">Vantage</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-1">
            <button
              onClick={() => setCurrentView('learning')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentView === 'learning' 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <GraduationCap className="w-5 h-5" />
              <span>Learning Hub</span>
            </button>

            <button
              onClick={() => setCurrentView('analytics')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentView === 'analytics' 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span>Analytics Mode</span>
            </button>

            <button
              onClick={() => setCurrentView('portfolio')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentView === 'portfolio' 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Wallet className="w-5 h-5" />
              <span>Portfolio</span>
            </button>
        </div>
           
        </nav>

        <div className="p-4 border-t border-gray-200">
          {user.subscription !== 'premium' && (
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 mb-4">
              <div className="text-white mb-2">
                {user.subscription === 'free' ? 'Upgrade to Pro' : 'Upgrade to Premium'}
              </div>
              <p className="text-blue-100 mb-3">
                {user.subscription === 'free' 
                  ? 'Unlock advanced analytics & features' 
                  : 'Get full access to Expert level'}
              </p>
              <button 
                onClick={handleUpgrade}
                className="w-full bg-white text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Upgrade Now
              </button>
            </div>
          )}

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-gray-900">{user.name}</div>
              <div className="text-gray-500 capitalize">{user.subscription}</div>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mb-1 ${
              currentView === 'settings' 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-900">
                {currentView === 'learning' && 'Learning Hub'}
                {currentView === 'analytics' && 'Analytics Mode'}
                {currentView === 'portfolio' && 'My Portfolio'}
                {currentView === 'settings' && 'Settings'}
              </h1>
              <p className="text-gray-600">
                {currentView === 'learning' && 'Progress through Beginner, Intermediate, and Expert levels'}
                {currentView === 'analytics' && 'Real-time market analysis and insights'}
                {currentView === 'portfolio' && 'Track your virtual trading performance'}
                {currentView === 'settings' && 'Manage your account and preferences'}
              </p>
            </div>
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <Bell className="w-6 h-6" />
              {notifications > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
          </div>
        </header>

{/* Content Area */}
<main className="flex-1 overflow-auto">
  {currentView === 'learning' && <LearningHub user={user} onUpgrade={handleUpgrade} />}
  {currentView === 'analytics' && <AnalyticsMode user={user} />}
  {currentView === 'portfolio' && <Portfolio user={user} />}

  {currentView === 'settings' && <SettingsPanel user={user} />}
</main>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-gray-900">Choose Your Plan</h2>
                <button 
                  onClick={() => setShowUpgradeModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Free Plan */}
                <div className={`rounded-xl border-2 p-6 ${user.subscription === 'free' ? 'border-blue-600' : 'border-gray-200'}`}>
                  <div className="mb-4">
                    <h3 className="text-gray-900 mb-2">Free</h3>
                    <div className="mb-2">
                      <span className="text-gray-900">$0</span>
                      <span className="text-gray-600"> / forever</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-2 text-gray-700">
                      <BookOpen className="w-4 h-4 text-green-600" />
                      Beginner Level (6 lessons)
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <BookOpen className="w-4 h-4 text-green-600" />
                      Basic Virtual Trading
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <BookOpen className="w-4 h-4 text-green-600" />
                      Community Support
                    </li>
                  </ul>
                  {user.subscription === 'free' && (
                    <div className="text-center text-gray-600">Current Plan</div>
                  )}
                </div>

                {/* Pro Plan */}
                <div className={`rounded-xl border-2 p-6 ${user.subscription === 'pro' ? 'border-blue-600 bg-blue-50' : 'border-blue-600'}`}>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-gray-900">Pro</h3>
                      <span className="px-2 py-1 bg-blue-600 text-white rounded text-sm">Popular</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-gray-900">Mwk29,000</span>
                      <span className="text-gray-600"> / month</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-2 text-gray-700">
                      <BookOpen className="w-4 h-4 text-green-600" />
                      All Free features
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <Target className="w-4 h-4 text-green-600" />
                      Intermediate Level (8 lessons)
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <BarChart3 className="w-4 h-4 text-green-600" />
                      Full Analytics Mode
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <BookOpen className="w-4 h-4 text-green-600" />
                      Advanced Charts & Indicators
                    </li>
                  </ul>
                  {user.subscription === 'pro' ? (
                    <div className="text-center text-gray-600">Current Plan</div>
                  ) : (
                    <button 
                      onClick={() => {
                        // In production, this would trigger payment flow
                        setShowUpgradeModal(false);
                      }}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Upgrade to Pro
                    </button>
                  )}
                </div>

                {/* Premium Plan */}
                <div className={`rounded-xl border-2 p-6 ${user.subscription === 'premium' ? 'border-purple-600 bg-purple-50' : 'border-purple-600'}`}>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-gray-900">Premium</h3>
                      <Crown className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="mb-2">
                      <span className="text-gray-900">Mwk59,000</span>
                      <span className="text-gray-600"> / month</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-2 text-gray-700">
                      <BookOpen className="w-4 h-4 text-green-600" />
                      All Pro features
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <Crown className="w-4 h-4 text-green-600" />
                      Expert Level (10 lessons)
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <BookOpen className="w-4 h-4 text-green-600" />
                      AI-Powered Insights
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <BookOpen className="w-4 h-4 text-green-600" />
                      1-on-1 Coaching Sessions
                    </li>
                  </ul>
                  {user.subscription === 'premium' ? (
                    <div className="text-center text-gray-600">Current Plan</div>
                  ) : (
                    <button 
                      onClick={() => {
                        // In production, this would trigger payment flow
                        setShowUpgradeModal(false);
                      }}
                      className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Upgrade to Premium
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-8 text-center text-gray-600">
                <p>Note: This is a demo. No actual payment will be processed.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}