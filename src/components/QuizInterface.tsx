import React from 'react';
import { Question, QuizConfig } from '../types/quiz';
import { MCQQuestion } from './questions/MCQQuestion';
import { DragDropQuestion } from './questions/DragDropQuestion';
import { TrueFalseTableQuestion } from './questions/TrueFalseTableQuestion';
import { ChevronRight, Clock, Target, GraduationCap } from 'lucide-react';

interface QuizInterfaceProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  userAnswer?: any;
  onAnswer: (answer: any) => void;
  onNext: () => void;
  timeElapsed: number;
  config?: QuizConfig;
}

export function QuizInterface({
  question,
  questionIndex,
  totalQuestions,
  userAnswer,
  onAnswer,
  onNext,
  timeElapsed,
  config,
}: QuizInterfaceProps) {
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30';
      case 'hard': return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/30';
    }
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
            <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
              Question {questionIndex + 1} of {totalQuestions}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 transition-colors duration-300">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{formatTime(timeElapsed)}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Quiz Mode Indicator */}
          {config && (
            <span className={`px-3 py-1 text-sm rounded-full font-medium transition-colors duration-300 ${
              config.mode === 'practice' 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                : 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
            }`}>
              {config.mode === 'practice' ? '🎯 Practice' : '🎓 Exam'}
              {config.mode === 'practice' && config.difficulty && ` (${config.difficulty})`}
            </span>
          )}
          
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm rounded-full font-medium transition-colors duration-300">
            {question.exam_type}
          </span>
          {/* Only show difficulty badge in Examination mode since Practice mode already shows it */}
          {config?.mode === 'examination' && (
            <span className={`px-3 py-1 text-sm rounded-full font-medium transition-colors duration-300 ${getDifficultyColor(question.difficulty)}`}>
              {question.difficulty}
            </span>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Progress</span>
          <span className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
            {Math.round(((questionIndex + 1) / totalQuestions) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 transition-colors duration-300">
          <div
            className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-2xl p-8 mb-6 transition-all duration-300 border border-gray-200 dark:border-gray-700">
        {renderQuestion()}
      </div>

      {/* Category */}
      <div className="text-center mb-6">
        <span className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm transition-colors duration-300">
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
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          }`}
        >
          <span>{questionIndex + 1 === totalQuestions ? 'Finish Quiz' : 'Next Question'}</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}