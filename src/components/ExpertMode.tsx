import { useState } from 'react';
import { 
  BookOpen, 
  PlayCircle, 
  CheckCircle, 
  Trophy,
  Crown,
  TrendingUp,
  Clock,
  Zap,
  Brain,
  Cpu,
  Award
} from 'lucide-react';
import { LessonViewer } from './LessonViewer';
import { QuizViewer } from './QuizViewer';
import { VirtualTrading } from './VirtualTrading';

interface ExpertModeProps {
  user: any;
}

const expertLessons = [
  {
    id: 15,
    title: 'Advanced Options Strategies',
    description: 'Iron condors, butterflies, and complex multi-leg strategies',
    duration: '50 min',
    level: 'Expert',
    completed: false,
    locked: false
  },
  {
    id: 16,
    title: 'Algorithmic Trading Introduction',
    description: 'Basics of automated trading systems and strategy coding',
    duration: '60 min',
    level: 'Expert',
    completed: false,
    locked: false
  },
  {
    id: 17,
    title: 'Market Microstructure',
    description: 'Order flow, market makers, and institutional trading',
    duration: '45 min',
    level: 'Expert',
    completed: false,
    locked: false
  },
  {
    id: 18,
    title: 'Advanced Risk Management',
    description: 'Portfolio hedging, correlation analysis, and stress testing',
    duration: '55 min',
    level: 'Expert',
    completed: false,
    locked: false
  },
  {
    id: 19,
    title: 'Portfolio Optimization',
    description: 'Modern portfolio theory and efficient frontier analysis',
    duration: '50 min',
    level: 'Expert',
    completed: false,
    locked: false
  },
  {
    id: 20,
    title: 'Derivatives Trading',
    description: 'Futures, forwards, and advanced derivative instruments',
    duration: '55 min',
    level: 'Expert',
    completed: false,
    locked: false
  },
  {
    id: 21,
    title: 'Quantitative Analysis',
    description: 'Statistical models and quantitative trading strategies',
    duration: '60 min',
    level: 'Expert',
    completed: false,
    locked: false
  },
  {
    id: 22,
    title: 'Trading Systems Development',
    description: 'Build, backtest, and optimize your own trading systems',
    duration: '65 min',
    level: 'Expert',
    completed: false,
    locked: false
  },
  {
    id: 23,
    title: 'Market Psychology & Manipulation',
    description: 'Identify market manipulation and crowd psychology',
    duration: '40 min',
    level: 'Expert',
    completed: false,
    locked: false
  },
  {
    id: 24,
    title: 'Professional Trading Setup',
    description: 'Tools, platforms, and workflows used by professional traders',
    duration: '45 min',
    level: 'Expert',
    completed: false,
    locked: false
  }
];

export function ExpertMode({ user }: ExpertModeProps) {
  const [currentTab, setCurrentTab] = useState<'overview' | 'lessons' | 'quiz' | 'practice'>('overview');
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);

  const completedLessons = expertLessons.filter(l => {
    return user.progress?.completedLessons?.includes(l.id);
  }).length;
  const totalLessons = expertLessons.length;
  const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  if (selectedLesson) {
    return <LessonViewer lessonId={selectedLesson} user={user} onClose={() => setSelectedLesson(null)} />;
  }

  if (selectedQuiz) {
    return <QuizViewer quizId={selectedQuiz} onClose={() => setSelectedQuiz(null)} />;
  }

  if (currentTab === 'practice') {
    return <VirtualTrading user={user} onBack={() => setCurrentTab('overview')} />;
  }

  return (
    <div className="p-8">
      {/* Progress Overview */}
      {currentTab === 'overview' && (
        <>
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="text-gray-600">Expert Progress</div>
                <Crown className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-gray-900 mb-2">{Math.round(progress)}%</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-gray-600 mt-2">{completedLessons} of {totalLessons} lessons completed</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="text-gray-600">Professional Level</div>
                <Zap className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="text-gray-900 mb-2">Master Trader</div>
              <p className="text-gray-600">Advanced strategies & systems</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="text-gray-600">Certification</div>
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-gray-900 mb-2">Expert Badge</div>
              <p className="text-purple-600">Complete to earn certificate</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <button 
              onClick={() => setCurrentTab('lessons')}
              className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl p-6 text-left hover:from-purple-700 hover:to-purple-800 transition-all"
            >
              <BookOpen className="w-8 h-8 mb-3" />
              <div className="mb-1">Continue Learning</div>
              <p className="text-purple-100">Master professional strategies</p>
            </button>

            <button 
              onClick={() => setCurrentTab('quiz')}
              className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl p-6 text-left hover:from-indigo-700 hover:to-indigo-800 transition-all"
            >
              <Trophy className="w-8 h-8 mb-3" />
              <div className="mb-1">Expert Challenges</div>
              <p className="text-indigo-100">Test advanced expertise</p>
            </button>

            <button 
              onClick={() => setCurrentTab('practice')}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-6 text-left hover:from-green-700 hover:to-green-800 transition-all"
            >
              <TrendingUp className="w-8 h-8 mb-3" />
              <div className="mb-1">Advanced Trading</div>
              <p className="text-green-100">Professional simulator</p>
            </button>
          </div>

          {/* Expert Benefits */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border-2 border-purple-200 p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Crown className="w-8 h-8 text-purple-600" />
              <h2 className="text-gray-900">Expert Level Benefits</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Brain className="w-5 h-5 text-purple-600 mt-1" />
                <div>
                  <div className="text-gray-900 mb-1">Professional Strategies</div>
                  <p className="text-gray-600">Institutional-grade trading techniques</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Cpu className="w-5 h-5 text-purple-600 mt-1" />
                <div>
                  <div className="text-gray-900 mb-1">Algorithmic Trading</div>
                  <p className="text-gray-600">Build automated trading systems</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-purple-600 mt-1" />
                <div>
                  <div className="text-gray-900 mb-1">Advanced Risk Management</div>
                  <p className="text-gray-600">Protect capital like a professional</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-purple-600 mt-1" />
                <div>
                  <div className="text-gray-900 mb-1">Expert Certification</div>
                  <p className="text-gray-600">Earn your professional trading certificate</p>
                </div>
              </div>
            </div>
          </div>

          {/* What You'll Master */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <h2 className="text-gray-900 mb-4">What You'll Master</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-gray-900 mb-3">Technical Mastery</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600" />
                    Advanced options strategies
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600" />
                    Algorithmic trading systems
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600" />
                    Quantitative analysis
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-gray-900 mb-3">Professional Skills</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600" />
                    Portfolio optimization
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600" />
                    Market microstructure
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600" />
                    Trading system development
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Crown className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="text-gray-900">Unlocked Expert Level</div>
                  <p className="text-gray-600">Welcome to professional trading mastery</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Lessons Tab */}
      {currentTab === 'lessons' && (
        <>
          <div className="flex items-center gap-4 mb-8">
            <button 
              onClick={() => setCurrentTab('overview')}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back
            </button>
            <h2 className="text-gray-900">Expert Lessons</h2>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {expertLessons.map((lesson) => (
              <div 
                key={lesson.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg cursor-pointer transition-all"
                onClick={() => setSelectedLesson(lesson.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="px-3 py-1 rounded-full bg-purple-100 text-purple-700">
                    {lesson.level}
                  </div>
                  {user.progress?.completedLessons?.includes(lesson.id) && (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  )}
                </div>
                <h3 className="text-gray-900 mb-2">{lesson.title}</h3>
                <p className="text-gray-600 mb-4">{lesson.description}</p>
                <div className="flex items-center gap-4 text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{lesson.duration}</span>
                  </div>
                  <button className="text-purple-600 hover:text-purple-700 flex items-center gap-1">
                    <PlayCircle className="w-4 h-4" />
                    <span>
                      {user.progress?.completedLessons?.includes(lesson.id) ? 'Review' : 'Start'}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Quiz Tab */}
      {currentTab === 'quiz' && (
        <>
          <div className="flex items-center gap-4 mb-8">
            <button 
              onClick={() => setCurrentTab('overview')}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back
            </button>
            <h2 className="text-gray-900">Expert Knowledge Tests</h2>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {expertLessons.map((lesson) => (
              <div 
                key={lesson.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg cursor-pointer transition-all"
                onClick={() => setSelectedQuiz(lesson.id)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-900">{lesson.title} Quiz</h3>
                    <p className="text-gray-600">15 advanced questions</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Expert challenge</span>
                  <button className="text-purple-600 hover:text-purple-700">
                    Start Quiz →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
