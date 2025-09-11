import React, { useState, useEffect } from 'react';
import { ArrowLeft, Move3D, Edit3, Trash2, Plus } from 'lucide-react';
import { DragDropStorage } from '../lib/dragDropStorage';
import { Question } from '../types/quiz';

interface DragDropManagerProps {
  onBack: () => void;
}

export function DragDropManager({ onBack }: DragDropManagerProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedExamType, setSelectedExamType] = useState<'AZ-900' | 'AI-900' | 'ALL'>('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = () => {
    setLoading(true);
    try {
      const allQuestions = DragDropStorage.getDragDropQuestions();
      setQuestions(allQuestions);
    } catch (error) {
      console.error('Error loading drag-drop questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredQuestions = selectedExamType === 'ALL' 
    ? questions 
    : questions.filter(q => q.exam_type === selectedExamType);

  const handleDeleteQuestion = (questionId: string) => {
    if (confirm('Are you sure you want to delete this question?')) {
      const updatedQuestions = questions.filter(q => q.id !== questionId);
      DragDropStorage.saveDragDropQuestions(updatedQuestions);
      setQuestions(updatedQuestions);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Deployment': 'bg-blue-100 text-blue-800',
      'Security': 'bg-red-100 text-red-800',
      'Compute Services': 'bg-green-100 text-green-800',
      'Machine Learning Fundamentals': 'bg-purple-100 text-purple-800',
      'Computer Vision': 'bg-orange-100 text-orange-800',
      'Natural Language Processing': 'bg-teal-100 text-teal-800',
      'Responsible AI': 'bg-pink-100 text-pink-800',
      'Cost Management': 'bg-yellow-100 text-yellow-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors: Record<string, string> = {
      'easy': 'bg-green-100 text-green-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'hard': 'bg-red-100 text-red-800'
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading drag-drop questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Quiz Setup</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 flex items-center space-x-2">
          <Move3D className="w-6 h-6 text-purple-600" />
          <span>Drag-Drop Questions Manager</span>
        </h2>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{questions.length}</div>
            <div className="text-sm text-purple-700">Total Questions</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {questions.filter(q => q.exam_type === 'AZ-900').length}
            </div>
            <div className="text-sm text-blue-700">AZ-900 Questions</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {questions.filter(q => q.exam_type === 'AI-900').length}
            </div>
            <div className="text-sm text-green-700">AI-900 Questions</div>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Exam Type
          </label>
          <select
            value={selectedExamType}
            onChange={(e) => setSelectedExamType(e.target.value as 'AZ-900' | 'AI-900' | 'ALL')}
            className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="ALL">All Questions</option>
            <option value="AZ-900">AZ-900 Only</option>
            <option value="AI-900">AI-900 Only</option>
          </select>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No drag-drop questions found for the selected filter.
            </div>
          ) : (
            filteredQuestions.map((question) => (
              <div key={question.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {question.question}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(question.category)}`}>
                        {question.category}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty}
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {question.exam_type}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDeleteQuestion(question.id)}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete question"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Available Options */}
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Available Options:</h4>
                    <div className="space-y-1">
                      {question.options?.map((option, index) => (
                        <div key={index} className="px-3 py-2 bg-blue-50 text-blue-800 rounded text-sm">
                          {option}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Correct Order */}
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Correct Order:</h4>
                    <div className="space-y-1">
                      {(question.correct_answer as string[])?.map((answer, index) => (
                        <div key={index} className="px-3 py-2 bg-green-50 text-green-800 rounded text-sm flex items-center">
                          <span className="font-medium mr-2">{index + 1}.</span>
                          {answer}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {question.explanation && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-1">Explanation:</h4>
                    <p className="text-sm text-gray-600">{question.explanation}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => {
              if (confirm('This will reset all drag-drop questions to default. Continue?')) {
                DragDropStorage.clearDragDropQuestions();
                loadQuestions();
              }
            }}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
          >
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  );
}
