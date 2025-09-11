import React from 'react';
import { Question } from '../../types/quiz';

interface MCQQuestionProps {
  question: Question;
  userAnswer?: string;
  onAnswer: (answer: string) => void;
}

export function MCQQuestion({ question, userAnswer, onAnswer }: MCQQuestionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 transition-colors duration-300">
        {question.question}
      </h3>
      
      <div className="space-y-3">
        {question.options?.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
              userAnswer === option
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 shadow-md'
                : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-25 dark:hover:bg-blue-900/20 text-gray-800 dark:text-gray-200 hover:shadow-md'
            }`}
          >
            <div className="flex items-start space-x-3">
              <span className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                userAnswer === option
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-current'
              }`}>
                {String.fromCharCode(65 + index)}
              </span>
              <span className="flex-1">{option}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}