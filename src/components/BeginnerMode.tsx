import { useState } from 'react';
import {
  BookOpen,
  PlayCircle,
  CheckCircle,
  Lock,
  Trophy,
  Target,
  TrendingUp,
  Clock
} from 'lucide-react';

import { LessonViewer } from './LessonViewer';
import { QuizViewer } from './QuizViewer';
import { VirtualTrading } from './VirtualTrading';

interface BeginnerModeProps {
  user: any;
}

/**
 * Beginner Curriculum Only
 * Structured from absolute beginner → ready for intermediate
 */

const lessons = [
  {
    id: 1,
    title: 'Introduction to Financial Markets',
    description: 'Understand what financial markets are and why they exist',
    duration: '10 min',
    completed: true,
    locked: false
  },
  {
    id: 2,
    title: 'What is a Stock?',
    description: 'Learn what stocks represent and how ownership works',
    duration: '15 min',
    completed: true,
    locked: false
  },
  {
    id: 3,
    title: 'Stock Market Participants',
    description: 'Learn about traders, investors, brokers, and institutions',
    duration: '15 min',
    completed: false,
    locked: false
  },
  {
    id: 4,
    title: 'How Money is Made in Stocks',
    description: 'Capital gains, dividends, and growth explained',
    duration: '15 min',
    completed: false,
    locked: false
  },
  {
    id: 5,
    title: 'Understanding Market Orders',
    description: 'Buy and Sell orders explained',
    duration: '20 min',
    completed: false,
    locked: false
  },
  {
    id: 6,
    title: 'Understanding Bid and Ask Price',
    description: 'Learn how prices move in the market',
    duration: '15 min',
    completed: false,
    locked: false
  },
  {
    id: 7,
    title: 'Introduction to Stock Charts',
    description: 'Basic chart reading skills',
    duration: '20 min',
    completed: false,
    locked: true
  },
  {
    id: 8,
    title: 'Bull Market vs Bear Market',
    description: 'Understand market direction',
    duration: '15 min',
    completed: false,
    locked: true
  },
  {
    id: 9,
    title: 'Basic Risk Management',
    description: 'Protect your money from losses',
    duration: '20 min',
    completed: false,
    locked: true
  },
  {
    id: 10,
    title: 'Beginner Trading Strategy',
    description: 'Your first simple trading approach',
    duration: '25 min',
    completed: false,
    locked: true
  }
];

export function BeginnerMode({ user }: BeginnerModeProps) {

  const [currentTab, setCurrentTab] =
    useState<'overview' | 'lessons' | 'quiz' | 'practice'>('overview');

  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);

  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);


  const completedLessons = lessons.filter(l => l.completed).length;

  const progress =
    Math.round((completedLessons / lessons.length) * 100);



  if (selectedLesson)
    return (
      <LessonViewer
        lessonId={selectedLesson}
        onClose={() => setSelectedLesson(null)} user={user} />
    );
  if (selectedLesson != null) {
    <LessonViewer
      lessonId={selectedLesson}
      onClose={() => setSelectedLesson(null)}
      user={user}
    />
  }

  if (selectedQuiz)
    return (
      <QuizViewer
        quizId={selectedQuiz}
        onClose={() => setSelectedQuiz(null)}
      />
    );


  if (currentTab === 'practice')
    return (
      <VirtualTrading
        user={user}
        onBack={() => setCurrentTab('overview')}
      />
    );



  return (
    <div className="p-8">

      {/* Overview */}

      {currentTab === 'overview' && (

        <>

          {/* Progress */}

          <div className="grid grid-cols-3 gap-6 mb-8">

            <ProgressCard progress={progress} completed={completedLessons} total={lessons.length}/>

            <QuizCard />

            <TradingCard />

          </div>



          {/* Actions */}

          <div className="grid grid-cols-3 gap-6">

            <ActionButton
              icon={<BookOpen className="w-8 h-8 mb-3"/>}
              title="Start Learning"
              subtitle="Beginner lessons"
              onClick={() => setCurrentTab('lessons')}
              color="blue"
            />

            <ActionButton
              icon={<Trophy className="w-8 h-8 mb-3"/>}
              title="Take Quiz"
              subtitle="Test knowledge"
              onClick={() => setCurrentTab('quiz')}
              color="purple"
            />

            <ActionButton
              icon={<TrendingUp className="w-8 h-8 mb-3"/>}
              title="Practice"
              subtitle="Virtual trading"
              onClick={() => setCurrentTab('practice')}
              color="green"
            />

          </div>

        </>
      )}



      {/* Lessons */}

      {currentTab === 'lessons' && (

        <LessonsView
          lessons={lessons}
          onBack={() => setCurrentTab('overview')}
          onSelect={setSelectedLesson}
        />

      )}



      {/* Quiz */}

      {currentTab === 'quiz' && (

        <QuizView
          lessons={lessons}
          onBack={() => setCurrentTab('overview')}
          onSelect={setSelectedQuiz}
        />

      )}


    </div>
  );
}



/* Components */


function ProgressCard({progress,completed,total}:any){

return(

<div className="bg-white rounded-xl p-6 border">

<Target className="w-8 h-8 text-blue-600 mb-3"/>

<h3>{progress}% Complete</h3>

<p>{completed} of {total}</p>

</div>

)

}



function QuizCard(){

return(

<div className="bg-white rounded-xl p-6 border">

<Trophy className="w-8 h-8 text-yellow-500 mb-3"/>

<h3>Quiz Ready</h3>

<p>Test your skills</p>

</div>

)

}



function TradingCard(){

return(

<div className="bg-white rounded-xl p-6 border">

<TrendingUp className="w-8 h-8 text-green-600 mb-3"/>

<h3>Virtual Trading</h3>

<p>Practice safely</p>

</div>

)

}



function ActionButton({icon,title,subtitle,onClick,color}:any){

return(

<button
onClick={onClick}
className={`bg-${color}-600 text-white p-6 rounded-xl`}
>

{icon}

<h3>{title}</h3>

<p>{subtitle}</p>

</button>

)

}



function LessonsView({lessons,onBack,onSelect}:any){

return(

<>

<button onClick={onBack}>Back</button>

<div className="grid grid-cols-2 gap-6">

{lessons.map((lesson:any)=>(

<div key={lesson.id}
onClick={()=>!lesson.locked&&onSelect(lesson.id)}
className="bg-white p-6 rounded-xl border">

<h3>{lesson.title}</h3>

<p>{lesson.description}</p>

</div>

))}

</div>

</>

)

}



function QuizView({lessons,onBack,onSelect}:any){

return(

<>

<button onClick={onBack}>Back</button>

<div className="grid grid-cols-2 gap-6">

{lessons.map((lesson:any)=>(

<div key={lesson.id}
onClick={()=>onSelect(lesson.id)}
className="bg-white p-6 border rounded-xl">

<h3>{lesson.title} Quiz</h3>

</div>

))}

</div>

</>

)

}
