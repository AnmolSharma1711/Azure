import React, { useState } from 'react';
import { Question } from '../../types/quiz';

interface DragDropQuestionProps {
  question: Question;
  userAnswer?: string[];
  onAnswer: (answer: string[]) => void;
}

export function DragDropQuestion({ question, userAnswer = [], onAnswer }: DragDropQuestionProps) {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  
  // Parse question data for drag-drop format
  // Expected format: question.options contains draggable items
  // question.correct_answer contains the correct order
  const items = question.options || [];
  
  const handleDragStart = (e: React.DragEvent, item: string) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (!draggedItem) return;

    const newAnswer = [...userAnswer];
    const draggedIndex = userAnswer.indexOf(draggedItem);
    
    if (draggedIndex > -1) {
      newAnswer.splice(draggedIndex, 1);
    }
    
    newAnswer.splice(targetIndex, 0, draggedItem);
    onAnswer(newAnswer.slice(0, items.length));
    setDraggedItem(null);
  };

  const addItem = (item: string) => {
    if (!userAnswer.includes(item)) {
      onAnswer([...userAnswer, item]);
    }
  };

  const removeItem = (index: number) => {
    const newAnswer = [...userAnswer];
    newAnswer.splice(index, 1);
    onAnswer(newAnswer);
  };

  const availableItems = items.filter(item => !userAnswer.includes(item));

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        {question.question}
      </h3>
      
      <div className="text-sm text-gray-600 mb-4">
        Drag and drop items to arrange them in the correct order:
      </div>

      {/* Available Items */}
      <div className="space-y-2">
        <h4 className="font-medium text-gray-700">Available Items:</h4>
        <div className="flex flex-wrap gap-2">
          {availableItems.map((item, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              onClick={() => addItem(item)}
              className="px-3 py-2 bg-blue-100 text-blue-800 rounded-lg cursor-move hover:bg-blue-200 transition-colors select-none"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Drop Zone */}
      <div className="space-y-2">
        <h4 className="font-medium text-gray-700">Your Answer (in order):</h4>
        <div className="min-h-[120px] border-2 border-dashed border-gray-300 rounded-lg p-4 space-y-2">
          {userAnswer.length === 0 && (
            <div className="text-gray-500 text-center py-8">
              Drop items here or click on them above
            </div>
          )}
          {userAnswer.map((item, index) => (
            <div
              key={index}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className="flex items-center justify-between p-3 bg-green-100 text-green-800 rounded-lg"
            >
              <span className="flex items-center space-x-2">
                <span className="font-medium">{index + 1}.</span>
                <span>{item}</span>
              </span>
              <button
                onClick={() => removeItem(index)}
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                ×
              </button>
            </div>
          ))}
          {userAnswer.length > 0 && (
            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, userAnswer.length)}
              className="h-8 border-2 border-dashed border-transparent hover:border-gray-400 transition-colors rounded"
            />
          )}
        </div>
      </div>
    </div>
  );
}