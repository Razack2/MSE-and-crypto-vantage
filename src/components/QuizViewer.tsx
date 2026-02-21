import { useState } from 'react';
import { CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface QuizViewerProps {
  quizId: number;
  onClose: () => void;
}

const quizQuestions = [
  {
    question: 'What does owning a stock represent?',
    options: [
      'Lending money to a company',
      'Ownership in a company',
      'A guaranteed return on investment',
      'A contract to buy goods'
    ],
    correctAnswer: 1
  },
  {
    question: 'Which of the following is NOT a major stock exchange?',
    options: ['NYSE', 'NASDAQ', 'FOREX', 'LSE'],
    correctAnswer: 2
  },
  {
    question: 'What is a dividend?',
    options: [
      'The difference between buying and selling price',
      'A payment made to shareholders from company profits',
      'The fee charged by brokers',
      'The initial stock price'
    ],
    correctAnswer: 1
  },
  {
    question: 'What does IPO stand for?',
    options: [
      'Internal Profit Optimization',
      'Initial Public Offering',
      'Investment Portfolio Option',
      'International Price Order'
    ],
    correctAnswer: 1
  },
  {
    question: 'What is the main factor that determines stock prices?',
    options: [
      'Government regulations',
      'Supply and demand',
      'Company age',
      'Number of employees'
    ],
    correctAnswer: 1
  }
];

export function QuizViewer({ quizId, onClose }: QuizViewerProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 500);
    } else {
      setTimeout(() => {
        setShowResults(true);
      }, 500);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === quizQuestions[index].correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / quizQuestions.length) * 100);
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="p-8 max-w-2xl mx-auto">
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
            score >= 70 ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {score >= 70 ? (
              <CheckCircle className="w-12 h-12 text-green-600" />
            ) : (
              <XCircle className="w-12 h-12 text-red-600" />
            )}
          </div>
          
          <h2 className="text-gray-900 mb-4">Quiz Complete!</h2>
          <div className="text-gray-900 mb-2">Your Score</div>
          <div className={`mb-6 ${score >= 70 ? 'text-green-600' : 'text-red-600'}`}>
            {score}%
          </div>
          
          <p className="text-gray-600 mb-8">
            {score >= 70 
              ? 'Great job! You have a solid understanding of the material.'
              : 'Keep learning! Review the lesson and try again.'}
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                setCurrentQuestion(0);
                setSelectedAnswers([]);
                setShowResults(false);
              }}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Retake Quiz
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Continue Learning
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <button 
        onClick={onClose}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      <div className="bg-white rounded-xl border border-gray-200 p-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Question {currentQuestion + 1} of {quizQuestions.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <h3 className="text-gray-900 mb-6">{quizQuestions[currentQuestion].question}</h3>

        {/* Options */}
        <div className="space-y-3">
          {quizQuestions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedAnswers[currentQuestion] === index
                  ? index === quizQuestions[currentQuestion].correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswers[currentQuestion] === index
                    ? index === quizQuestions[currentQuestion].correctAnswer
                      ? 'border-green-500 bg-green-500'
                      : 'border-red-500 bg-red-500'
                    : 'border-gray-300'
                }`}>
                  {selectedAnswers[currentQuestion] === index && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <span className="text-gray-900">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
