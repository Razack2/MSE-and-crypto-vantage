import { useState } from 'react';
import { CheckCircle, Lock, ArrowRight, GraduationCap, Target, Crown } from 'lucide-react';
import { BeginnerMode } from './BeginnerMode';
import { IntermediateMode } from './IntermediateMode';
import { ExpertMode } from './ExpertMode';
import { toast } from 'sonner';

interface LearningHubProps {
  user: any;
  onUpgrade: () => void;
}

type LevelKey = 'beginner' | 'intermediate' | 'expert';

// Color mapping - defined outside to avoid recreation
const COLOR_CLASSES = {
  green: { card: 'border-green-200 bg-green-50 hover:border-green-400', progress: 'bg-green-600', button: 'bg-green-600 hover:bg-green-700' },
  blue: { card: 'border-blue-200 bg-blue-50 hover:border-blue-400', progress: 'bg-blue-600', button: 'bg-blue-600 hover:bg-blue-700' },
  purple: { card: 'border-purple-200 bg-purple-50 hover:border-purple-400', progress: 'bg-purple-600', button: 'bg-purple-600 hover:bg-purple-700' },
} as const;

export function LearningHub({ user, onUpgrade }: LearningHubProps) {
  const [currentLevel, setCurrentLevel] = useState<'hub' | LevelKey>('hub');

  const isAdmin = user.role?.toLowerCase() === 'admin';
  const isProOrPremium = isAdmin || user.subscription === 'pro' || user.subscription === 'premium';
  const isPremium = isAdmin || user.subscription === 'premium';

  // Progress
  const progress: Record<LevelKey, number> = {
    beginner: calculateLevelProgress('beginner', user),
    intermediate: calculateLevelProgress('intermediate', user),
    expert: calculateLevelProgress('expert', user),
  };

  // Level metadata
  const levels: Record<LevelKey, any> = {
    beginner: {
      title: 'Beginner Level',
      description: 'Master the fundamentals of stock trading',
      icon: <GraduationCap className="w-10 h-10 text-green-600" />,
      lessonsCount: 6,
      features: [
        'What are Stocks?',
        'Understanding Market Orders',
        'Reading Stock Charts Basics',
        'Portfolio Building 101',
        'Risk Management Basics',
        'Virtual Trading Practice',
      ],
      tierRequired: 'Free',
      colorScheme: 'green',
      locked: false,
      component: BeginnerMode,
    },
    intermediate: {
      title: 'Intermediate Level',
      description: 'Advanced strategies and technical analysis',
      icon: <Target className="w-10 h-10 text-blue-600" />,
      lessonsCount: 8,
      features: [
        'Advanced Chart Patterns',
        'Technical Indicators (RSI, MACD)',
        'Support & Resistance',
        'Trend Analysis',
        'Volume Analysis',
        'Trading Psychology',
        'Options Basics',
        'Swing Trading Strategies',
      ],
      tierRequired: 'Pro',
      colorScheme: 'blue',
      locked: !isProOrPremium,
      component: IntermediateMode,
    },
    expert: {
      title: 'Expert Level',
      description: 'Professional trading mastery',
      icon: <Crown className="w-10 h-10 text-purple-600" />,
      lessonsCount: 10,
      features: [
        'Advanced Options Strategies',
        'Algorithmic Trading Intro',
        'Market Microstructure',
        'Advanced Risk Management',
        'Portfolio Optimization',
        'Derivatives Trading',
        'Quantitative Analysis',
        'Trading Systems Development',
        'Market Psychology',
        'Professional Trading Setup',
      ],
      tierRequired: 'Premium',
      colorScheme: 'purple',
      locked: !isPremium,
      component: ExpertMode,
    },
  };

  // Handle level selection
  const handleLevelAccess = (level: LevelKey) => {
    if (!levels[level].locked) {
      setCurrentLevel(level);
    } else {
      toast.error(`Upgrade to ${levels[level].tierRequired} to unlock ${levels[level].title}`);
      onUpgrade();
    }
  };

  // If a level is selected, render only that level
  if (currentLevel !== 'hub') {
    const lvl = levels[currentLevel as LevelKey];
    const Component = lvl.component;
    return (
      <div>
        <LevelHeader
          title={lvl.title}
          description={lvl.description}
          icon={lvl.icon}
          onBack={() => setCurrentLevel('hub')}
        />
        <Component user={user} />
      </div>
    );
  }

  // HUB VIEW - rendered only once
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Hub</h1>
        <p className="text-gray-600">Progress your trading skills through structured learning paths</p>
      </div>

      {/* Learning Path */}
      <div className="mb-8">
        <h2 className="text-gray-900 mb-6">Your Learning Path</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {Object.entries(levels).map(([key, lvl]) => {
            const levelKey = key as LevelKey;

            return (
              <LevelCard
                key={key}
                icon={lvl.icon}
                title={lvl.title}
                description={lvl.description}
                progress={progress[levelKey]}
                lessonsCount={lvl.lessonsCount}
                locked={lvl.locked}
                tierRequired={lvl.tierRequired}
                colorClasses={COLOR_CLASSES[lvl.colorScheme as keyof typeof COLOR_CLASSES]}
                features={lvl.features}
                onClick={() => handleLevelAccess(levelKey)}
                onUpgrade={onUpgrade}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Reusable LevelCard
function LevelCard({ icon, title, description, progress, lessonsCount, locked, tierRequired, colorClasses, features, onClick, onUpgrade }: any) {
  return (
    <div
      onClick={() => !locked && onClick()}
      className={`rounded-lg border-2 p-6 cursor-pointer transition-all ${locked ? 'border-gray-200 bg-gray-50 opacity-60' : colorClasses.card}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">{icon}</div>
        {locked && <Lock className="w-5 h-5 text-gray-400" />}
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium text-gray-700">{lessonsCount} lessons</span>
          <span className="text-xs font-medium text-gray-700">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className={`${colorClasses.progress} h-2 rounded-full transition-all`} style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="mb-4 max-h-24 overflow-y-auto">
        <ul className="text-xs text-gray-600 space-y-1">
          {features.map((feature: string, idx: number) => (
            <li key={idx} className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-gray-400" /> {feature}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          if (locked) onUpgrade();
          else onClick();
        }}
        className={`w-full py-2 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all ${locked ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : `text-white ${colorClasses.button}`}`}
      >
        {locked ? (
          <>
            <Lock className="w-4 h-4" /> Upgrade to {tierRequired}
          </>
        ) : (
          <>
            Start Learning <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
}

// Level Header
function LevelHeader({ title, description, icon, onBack }: any) {
  return (
    <div className="p-8 border-b border-gray-200">
      <button onClick={onBack} className="text-blue-600 hover:text-blue-700 mb-4 flex items-center gap-2">
        ← Back to Learning Hub
      </button>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">{icon}</div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
}

// Progress helper
function calculateLevelProgress(level: LevelKey, user: any): number {
  const completed = user.progress?.completedLessons || [];
  if (level === 'beginner') return (completed.filter((id: number) => id >= 1 && id <= 6).length / 6) * 100;
  if (level === 'intermediate') return (completed.filter((id: number) => id >= 7 && id <= 14).length / 8) * 100;
  if (level === 'expert') return (completed.filter((id: number) => id >= 15 && id <= 24).length / 10) * 100;
  return 0;
}