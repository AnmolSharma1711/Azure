import React, { useState, useEffect } from 'react';
import { BookOpen, Play } from 'lucide-react';
import { QuestionStorage } from '../lib/storage';

interface QuizSetupProps {
  onStartQuiz: (examType: 'AZ-900' | 'AI-900', questionCount: number) => void;
}

export function QuizSetup({ onStartQuiz }: QuizSetupProps) {
  const [examType, setExamType] = useState<'AZ-900' | 'AI-900'>('AZ-900');
  const [questionCount, setQuestionCount] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeQuestions = async () => {
      try {
        // Initialize questions (this will load CSV data on first run)
        await QuestionStorage.initializeQuestions();
      } catch (error) {
        console.error('Error initializing questions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeQuestions();
  }, []);
  
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading questions from CSV files...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center transition-colors duration-300">
            <BookOpen className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-300">
          Azure Certification Quiz
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 transition-colors duration-300">
          Test your knowledge and prepare for Azure certification exams
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Quiz Setup */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-2xl p-8 transition-all duration-300 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-6 flex items-center space-x-2 text-gray-800 dark:text-white transition-colors duration-300">
            <Play className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <span>Start Quiz</span>
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
                Select Exam Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setExamType('AZ-900')}
                  className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                    examType === 'AZ-900'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                      : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  <div className="font-semibold">AZ-900</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Azure Fundamentals
                  </div>
                </button>
                <button
                  onClick={() => setExamType('AI-900')}
                  className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                    examType === 'AI-900'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                      : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  <div className="font-semibold">AI-900</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    AI Fundamentals
                  </div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
                Number of Questions
              </label>
              <select
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-300"
              >
                <option value={5}>5 Questions (Quick)</option>
                <option value={10}>10 Questions (Standard)</option>
                <option value={20}>20 Questions (Extended)</option>
                <option value={50}>50 Questions (Full Practice)</option>
              </select>
            </div>

            <button
              onClick={() => onStartQuiz(examType, questionCount)}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>Start Quiz</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}