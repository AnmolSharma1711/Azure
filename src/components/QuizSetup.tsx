import React, { useState, useEffect } from 'react';
import { BookOpen, Play, Database, BarChart3, Move3D } from 'lucide-react';
import { QuestionStorage } from '../lib/storage';

interface QuizSetupProps {
  onStartQuiz: (examType: 'AZ-900' | 'AI-900', questionCount: number) => void;
  onShowDragDropManager?: () => void;
}

export function QuizSetup({ onStartQuiz, onShowDragDropManager }: QuizSetupProps) {
  const [examType, setExamType] = useState<'AZ-900' | 'AI-900'>('AZ-900');
  const [questionCount, setQuestionCount] = useState(10);
  const [questionCounts, setQuestionCounts] = useState({
    az900: 0,
    ai900: 0,
    total: 0,
    dragDrop: { total: 0, az900: 0, ai900: 0 }
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeQuestions = async () => {
      try {
        // Initialize questions (this will load CSV data on first run)
        await QuestionStorage.initializeQuestions();
        
        // Get question counts
        const questionCounts = QuestionStorage.getAllQuestionCounts();
        
        setQuestionCounts({
          az900: questionCounts.az900,
          ai900: questionCounts.ai900,
          total: questionCounts.total,
          dragDrop: questionCounts.dragDrop
        });
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading questions from CSV files...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-blue-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Azure Certification Quiz
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Test your knowledge and prepare for Azure certification exams
        </p>
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>{questionCounts.total} Total Questions</span>
          </div>
          <div>AZ-900: {questionCounts.az900} questions</div>
          <div>AI-900: {questionCounts.ai900} questions</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quiz Setup */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center space-x-2">
            <Play className="w-6 h-6 text-blue-600" />
            <span>Start Quiz</span>
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Exam Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setExamType('AZ-900')}
                  className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                    examType === 'AZ-900'
                      ? 'border-blue-500 bg-blue-50 text-blue-800'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="font-semibold">AZ-900</div>
                  <div className="text-sm text-gray-600">
                    Azure Fundamentals ({questionCounts.az900} questions)
                    <br />
                    <span className="text-xs">Includes {questionCounts.dragDrop.az900} drag-drop questions</span>
                  </div>
                </button>
                <button
                  onClick={() => setExamType('AI-900')}
                  className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                    examType === 'AI-900'
                      ? 'border-blue-500 bg-blue-50 text-blue-800'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="font-semibold">AI-900</div>
                  <div className="text-sm text-gray-600">
                    AI Fundamentals ({questionCounts.ai900} questions)
                    <br />
                    <span className="text-xs">Includes {questionCounts.dragDrop.ai900} drag-drop questions</span>
                  </div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Number of Questions
              </label>
              <select
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={5}>5 Questions (Quick)</option>
                <option value={10}>10 Questions (Standard)</option>
                <option value={20}>20 Questions (Extended)</option>
                <option value={50}>50 Questions (Full Practice)</option>
              </select>
            </div>

            <button
              onClick={() => onStartQuiz(examType, questionCount)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>Start Quiz</span>
            </button>
          </div>
        </div>

        {/* Question Database Info */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center space-x-2">
            <Database className="w-6 h-6 text-blue-600" />
            <span>Question Database</span>
          </h2>
          
          <div className="space-y-6">
            <div className="text-gray-600">
              Complete database of Azure certification questions with multiple question types.
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Current Database:</h4>
              <div className="text-sm text-blue-700">
                <div>• {questionCounts.total} total questions loaded</div>
                <div>• AZ-900: {questionCounts.az900} questions ({questionCounts.dragDrop.az900} drag-drop)</div>
                <div>• AI-900: {questionCounts.ai900} questions ({questionCounts.dragDrop.ai900} drag-drop)</div>
                <div>• Multiple question types supported (MCQ + Drag-Drop)</div>
              </div>
            </div>

            {onShowDragDropManager && (
              <button
                onClick={onShowDragDropManager}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <Move3D className="w-5 h-5" />
                <span>View Drag-Drop Questions</span>
              </button>
            )}

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-700 mb-2">Features:</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>• Multiple choice questions from CSV database</div>
                <div>• Interactive drag-and-drop sequence questions</div>
                <div>• Real-world scenarios and case studies</div>
                <div>• Categorized by topics and difficulty levels</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}