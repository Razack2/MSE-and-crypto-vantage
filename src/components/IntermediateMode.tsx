import { useState } from 'react';
import { 
  BookOpen, 
  PlayCircle, 
  CheckCircle, 
  Trophy,
  Target,
  TrendingUp,
  Clock,
  BarChart3,
  LineChart,
  Activity
} from 'lucide-react';
import { LessonViewer } from './LessonViewer';
import { QuizViewer } from './QuizViewer';
import { VirtualTrading } from './VirtualTrading';

interface IntermediateModeProps {
  user: any;
}

const intermediateLessons = [
  {
    id: 7,
    title: 'Advanced Chart Patterns',
    description: 'Master complex patterns like head and shoulders, triangles, and flags',
    duration: '30 min',
    level: 'Intermediate',
    completed: false,
    locked: false
  },
  {
    id: 8,
    title: 'Technical Indicators Deep Dive',
    description: 'RSI, MACD, Bollinger Bands, and how to use them effectively',
    duration: '35 min',
    level: 'Intermediate',
    completed: false,
    locked: false
  },
  {
    id: 9,
    title: 'Support & Resistance Strategies',
    description: 'Identify key levels and trade bounces and breakouts',
    duration: '28 min',
    level: 'Intermediate',
    completed: false,
    locked: false
  },
  {
    id: 10,
    title: 'Trend Analysis & Trading',
    description: 'Ride trends with confidence using multiple timeframes',
    duration: '32 min',
    level: 'Intermediate',
    completed: false,
    locked: false
  },
  {
    id: 11,
    title: 'Volume Analysis',
    description: 'Use volume to confirm trends and spot reversals',
    duration: '25 min',
    level: 'Intermediate',
    completed: false,
    locked: false
  },
  {
    id: 12,
    title: 'Trading Psychology',
    description: 'Master your emotions and develop a winning mindset',
    duration: '40 min',
    level: 'Intermediate',
    completed: false,
    locked: false
  },
  {
    id: 13,
    title: 'Options Basics',
    description: 'Introduction to calls, puts, and basic options strategies',
    duration: '45 min',
    level: 'Intermediate',
    completed: false,
    locked: false
  },
  {
    id: 14,
    title: 'Swing Trading Strategies',
    description: 'Hold positions for days or weeks to maximize profits',
    duration: '35 min',
    level: 'Intermediate',
    completed: false,
    locked: false
  }
];

export function IntermediateMode({ user }: IntermediateModeProps) {
  const [currentTab, setCurrentTab] = useState<'overview' | 'lessons' | 'quiz' | 'practice'>('overview');
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);

  const completedLessons = intermediateLessons.filter(l => {
    return user.progress?.completedLessons?.includes(l.id);
  }).length;
  const totalLessons = intermediateLessons.length;
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
                <div className="text-gray-600">Learning Progress</div>
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-gray-900 mb-2">{Math.round(progress)}%</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-gray-600 mt-2">{completedLessons} of {totalLessons} lessons completed</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="text-gray-600">Technical Skills</div>
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-gray-900 mb-2">Advanced</div>
              <p className="text-gray-600">Chart patterns & indicators mastery</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="text-gray-600">Strategy Level</div>
                <Activity className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-gray-900 mb-2">Intermediate</div>
              <p className="text-green-600">Multi-timeframe analysis ready</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <button 
              onClick={() => setCurrentTab('lessons')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-6 text-left hover:from-blue-700 hover:to-blue-800 transition-all"
            >
              <BookOpen className="w-8 h-8 mb-3" />
              <div className="mb-1">Continue Learning</div>
              <p className="text-blue-100">Advanced strategies await</p>
            </button>

            <button 
              onClick={() => setCurrentTab('quiz')}
              className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl p-6 text-left hover:from-purple-700 hover:to-purple-800 transition-all"
            >
              <Trophy className="w-8 h-8 mb-3" />
              <div className="mb-1">Take a Quiz</div>
              <p className="text-purple-100">Test advanced concepts</p>
            </button>

            <button 
              onClick={() => setCurrentTab('practice')}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-6 text-left hover:from-green-700 hover:to-green-800 transition-all"
            >
              <TrendingUp className="w-8 h-8 mb-3" />
              <div className="mb-1">Practice Trading</div>
              <p className="text-green-100">Apply your strategies</p>
            </button>
          </div>

          {/* What You'll Learn */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <h2 className="text-gray-900 mb-4">What You'll Master</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <LineChart className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <div className="text-gray-900 mb-1">Advanced Technical Analysis</div>
                  <p className="text-gray-600">Complex chart patterns and indicator combinations</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BarChart3 className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <div className="text-gray-900 mb-1">Volume Analysis</div>
                  <p className="text-gray-600">Use volume to confirm trends and spot opportunities</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <div className="text-gray-900 mb-1">Swing Trading</div>
                  <p className="text-gray-600">Hold positions for optimal profit maximization</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Activity className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <div className="text-gray-900 mb-1">Trading Psychology</div>
                  <p className="text-gray-600">Develop emotional control and discipline</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="text-gray-900">Started Intermediate Level</div>
                  <p className="text-gray-600">Begin your journey to advanced trading</p>
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
            <h2 className="text-gray-900">Intermediate Lessons</h2>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {intermediateLessons.map((lesson) => (
              <div 
                key={lesson.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg cursor-pointer transition-all"
                onClick={() => setSelectedLesson(lesson.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-700">
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
                  <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
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
            <h2 className="text-gray-900">Test Your Intermediate Knowledge</h2>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {intermediateLessons.map((lesson) => (
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
                    <p className="text-gray-600">10 questions</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Challenge yourself</span>
                  <button className="text-blue-600 hover:text-blue-700">
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
