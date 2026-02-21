import { useState } from 'react';
import { CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface LessonViewerProps {
  lessonId: number;
  user: any; // pass user to check admin role
  onClose: () => void;
}

/*
Professional Lesson Structure
Lesson → Pages
*/
const lessons: Record<number, { title: string; content: string }[]> = {
  1: [
    {
      title: 'Introduction to Financial Markets',
      content: `Financial markets are places where buyers and sellers trade financial assets.

Examples include:

• Stocks
• Bonds
• Forex

Purpose:

• Help companies raise money
• Help investors grow money`
    },
    {
      title: 'Why Financial Markets Exist',
      content: `Financial markets help:

• Businesses raise capital
• Investors earn profit
• Economies grow

Without markets, investing would not exist.`
    }
  ],
  2: [
    {
      title: 'What is a Stock?',
      content: `A stock represents ownership in a company.

When you buy stock, you own part of that company.

Example:

Buying Apple stock means owning part of Apple.`
    },
    {
      title: 'Why Stock Prices Change',
      content: `Stock prices move because of:

• Supply and demand
• News
• Company performance
• Investor emotion`
    }
  ],
  3: [
    {
      title: 'Stock Market Participants',
      content: `Participants include:

• Traders
• Investors
• Institutions
• Brokers`
    }
  ],
  4: [
    {
      title: 'How Money is Made',
      content: `Two main ways:

1. Buy low sell high
2. Dividends`
    }
  ]
};

export function LessonViewer({ lessonId, user, onClose }: LessonViewerProps) {
  // Admin users have access to all lessons
  const lessonPages = user.role === 'admin' ? Object.values(lessons).flat() : lessons[lessonId];

  if (!lessonPages) {
    return (
      <div className="p-8">
        Lesson not found
      </div>
    );
  }

  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = lessonPages.length;

  const handleNext = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
  };

  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(prev - 1, 0));
  };

  const handleComplete = () => {
    toast.success('Lesson Completed');
    onClose();
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">

      {/* Back */}
      <button
        onClick={onClose}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      {/* Card */}
      <div className="bg-white rounded-xl border p-8">

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between">
            <span>Progress</span>
            <span>{currentPage + 1} / {totalPages}</span>
          </div>

          <div className="w-full bg-gray-200 h-2 rounded">
            <div
              className="bg-blue-600 h-2 rounded"
              style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl mb-4">{lessonPages[currentPage].title}</h1>

        {/* Content */}
        <p className="whitespace-pre-line">{lessonPages[currentPage].content}</p>

        {/* Navigation */}
        <div className="flex justify-between mt-8">

          <button
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className="flex items-center gap-2 disabled:opacity-40"
          >
            <ArrowLeft className="w-5 h-5" />
            Previous
          </button>

          {currentPage === totalPages - 1 ? (
            <button
              onClick={handleComplete}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded"
            >
              <CheckCircle className="w-5 h-5" />
              Complete
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 text-blue-600"
            >
              Next
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
