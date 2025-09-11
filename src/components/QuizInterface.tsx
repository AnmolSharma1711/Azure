import React from 'react';
import { Question } from '../types/quiz';
import { MCQQuestion } from './questions/MCQQuestion';
import { DragDropQuestion } from './questions/DragDropQuestion';
import { TrueFalseTableQuestion } from './questions/TrueFalseTableQuestion';
import { ChevronRight, Clock, Target } from 'lucide-react';

interface QuizInterfaceProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  userAnswer?: any;
  onAnswer: (answer: any) => void;
  onNext: () => void;
  timeElapsed: number;
}

export function QuizInterface({
  question,
  questionIndex,
  totalQuestions,
  userAnswer,
  onAnswer,
  onNext,
  timeElapsed,
}: QuizInterfaceProps) {
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  const renderQuestion = () => {
    switch (question.type) {
      case 'mcq':
        return (
          <MCQQuestion
            question={question}
            userAnswer={userAnswer}
            onAnswer={onAnswer}
          />
        );
      case 'drag-drop':
        return (
          <DragDropQuestion
            question={question}
            userAnswer={userAnswer}
            onAnswer={onAnswer}
          />
        );
      case 'true-false-table':
        return (
          <TrueFalseTableQuestion
            question={question}
            userAnswer={userAnswer}
            onAnswer={onAnswer}
          />
        );
      default:
        return <div>Unsupported question type</div>;
    }
  };

  const isAnswered = () => {
    if (question.type === 'mcq') return !!userAnswer;
    if (question.type === 'drag-drop') {
      // Check if any items have been placed (handle sparse arrays)
      return Array.isArray(userAnswer) && userAnswer.some(item => item !== undefined && item !== null);
    }
    if (question.type === 'true-false-table') {
      // Check if all statements have been answered
      const statements = question.options || [];
      if (!userAnswer || typeof userAnswer !== 'object') return false;
      return statements.every((_, index) => 
        userAnswer.hasOwnProperty(index.toString()) && 
        typeof userAnswer[index.toString()] === 'boolean'
      );
    }
    return false;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-gray-700">
              Question {questionIndex + 1} of {totalQuestions}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{formatTime(timeElapsed)}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
            {question.exam_type}
          </span>
          <span className={`px-3 py-1 text-sm rounded-full font-medium ${
            question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
            question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {question.difficulty}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Progress</span>
          <span className="text-sm text-gray-600">
            {Math.round(((questionIndex + 1) / totalQuestions) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        {renderQuestion()}
      </div>

      {/* Category */}
      <div className="text-center mb-6">
        <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
          Category: {question.category}
        </span>
      </div>

      {/* Next Button */}
      <div className="text-center">
        <button
          onClick={onNext}
          disabled={!isAnswered()}
          className={`px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 mx-auto transition-all duration-200 ${
            isAnswered()
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <span>{questionIndex + 1 === totalQuestions ? 'Finish Quiz' : 'Next Question'}</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}