import React, { useState } from 'react';
import { Question } from '../../types/quiz';

interface DragDropQuestionProps {
  question: Question;
  userAnswer?: string[];
  onAnswer: (answer: string[]) => void;
}

export function DragDropQuestion({ question, userAnswer = [], onAnswer }: DragDropQuestionProps) {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [draggedFromSlot, setDraggedFromSlot] = useState<number | null>(null);
  const [touchStartPos, setTouchStartPos] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedElement, setDraggedElement] = useState<HTMLElement | null>(null);
  
  // Parse question data for drag-drop format
  // Expected format: question.options contains draggable items
  // question.correct_answer contains the correct order
  const items = question.options || [];
  
  // Create slots array with the same length as items, preserving positions
  const slots = Array.from({ length: items.length }, (_, i) => userAnswer[i] || null);
  
  const handleDragStart = (e: React.DragEvent, item: string, fromSlot?: number) => {
    setDraggedItem(item);
    setDraggedFromSlot(fromSlot ?? null);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', item);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  // Touch event handlers for mobile
  const handleTouchStart = (e: React.TouchEvent, item: string, fromSlot?: number) => {
    const touch = e.touches[0];
    setTouchStartPos({ x: touch.clientX, y: touch.clientY });
    setDraggedItem(item);
    setDraggedFromSlot(fromSlot ?? null);
    setIsDragging(true);
    setDraggedElement(e.currentTarget as HTMLElement);
    
    // Add dragging class for visual feedback
    (e.currentTarget as HTMLElement).classList.add('dragging');
    
    // Add haptic feedback if available
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    
    // Prevent default to avoid scrolling
    e.preventDefault();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !draggedElement) return;
    
    const touch = e.touches[0];
    const elementUnderTouch = document.elementFromPoint(touch.clientX, touch.clientY);
    
    // Add visual feedback for valid drop zones
    document.querySelectorAll('.drop-zone').forEach(zone => {
      zone.classList.remove('touch-drag-over');
    });
    
    if (elementUnderTouch && elementUnderTouch.closest('.drop-zone')) {
      elementUnderTouch.closest('.drop-zone')?.classList.add('touch-drag-over');
    }
    
    e.preventDefault();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging || !draggedItem) return;
    
    const touch = e.changedTouches[0];
    const elementUnderTouch = document.elementFromPoint(touch.clientX, touch.clientY);
    
    // Clean up visual feedback
    document.querySelectorAll('.drop-zone').forEach(zone => {
      zone.classList.remove('touch-drag-over');
    });
    
    // Remove dragging class
    if (draggedElement) {
      draggedElement.classList.remove('dragging');
    }
    
    // Check if dropped on a valid slot
    const dropZone = elementUnderTouch?.closest('.drop-zone');
    if (dropZone) {
      const slotIndex = parseInt(dropZone.getAttribute('data-slot-index') || '-1');
      if (slotIndex >= 0) {
        handleDropToSlot(e as any, slotIndex);
        // Success haptic feedback
        if ('vibrate' in navigator) {
          navigator.vibrate([30, 10, 30]);
        }
      } else if (dropZone.classList.contains('available-zone')) {
        handleDropToAvailable(e as any);
      }
    }
    
    // Reset touch state
    setIsDragging(false);
    setDraggedItem(null);
    setDraggedFromSlot(null);
    setDraggedElement(null);
    setTouchStartPos(null);
  };

  const handleDropToSlot = (e: React.DragEvent, targetSlot: number) => {
    e.preventDefault();
    if (!draggedItem) return;

    const newAnswer = [...slots];
    
    // If dragged from a slot, clear that slot
    if (draggedFromSlot !== null) {
      newAnswer[draggedFromSlot] = null;
    }
    
    // If target slot is occupied, swap or move the item back
    if (newAnswer[targetSlot]) {
      if (draggedFromSlot !== null) {
        // Swap items
        newAnswer[draggedFromSlot] = newAnswer[targetSlot];
      }
      // If dropping from available items, the occupied item goes back to available
    }
    
    // Place the dragged item in the target slot
    newAnswer[targetSlot] = draggedItem;
    
    // Convert slots array to compact answer array (preserve positions with indices)
    const compactAnswer: string[] = [];
    newAnswer.forEach((item, index) => {
      if (item !== null) {
        compactAnswer[index] = item;
      }
    });
    
    onAnswer(compactAnswer);
    setDraggedItem(null);
    setDraggedFromSlot(null);
  };

  const handleDropToAvailable = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedItem || draggedFromSlot === null) return;

    const newAnswer = [...slots];
    newAnswer[draggedFromSlot] = null;
    
    // Convert slots array to compact answer array (preserve positions with indices)
    const compactAnswer: string[] = [];
    newAnswer.forEach((item, index) => {
      if (item !== null) {
        compactAnswer[index] = item;
      }
    });
    
    onAnswer(compactAnswer);
    setDraggedItem(null);
    setDraggedFromSlot(null);
  };

  const removeFromSlot = (slotIndex: number) => {
    const newAnswer = [...slots];
    newAnswer[slotIndex] = null;
    
    // Convert slots array to compact answer array (preserve positions with indices)
    const compactAnswer: string[] = [];
    newAnswer.forEach((item, index) => {
      if (item !== null) {
        compactAnswer[index] = item;
      }
    });
    
    onAnswer(compactAnswer);
  };

  const availableItems = items.filter(item => !slots.includes(item));

  return (
    <div className="space-y-6 drag-drop-container">{/* Added drag-drop-container class */}
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        {question.question}
      </h3>
      
      <div className="text-sm text-gray-600 mb-4">
        <span className="hidden md:block">
          Drag items from the available list to any numbered slot below. You can drop items in any order you want.
        </span>
        <span className="md:hidden">
          Touch and hold an item, then drag it to any numbered slot below. You can place items in any order you want.
        </span>
      </div>

      {/* Available Items */}
      <div className="space-y-2">
        <h4 className="font-medium text-gray-700">Available Items:</h4>
        <div 
          className="flex flex-wrap gap-2 min-h-[60px] p-3 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50 drop-zone available-zone"
          onDragOver={handleDragOver}
          onDrop={handleDropToAvailable}
        >
          {availableItems.length === 0 && (
            <div className="text-blue-500 text-sm italic w-full text-center py-2">
              All items have been placed
            </div>
          )}
          {availableItems.map((item, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              onTouchStart={(e) => handleTouchStart(e, item)}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className={`px-3 py-2 bg-blue-100 text-blue-800 rounded-lg cursor-move hover:bg-blue-200 transition-colors select-none border border-blue-300 touch-item ${
                isDragging && draggedItem === item ? 'opacity-50' : ''
              }`}
              style={{ userSelect: 'none', touchAction: 'none' }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Numbered Drop Slots */}
      <div className="space-y-2">
        <h4 className="font-medium text-gray-700">Drop Zone (arrange in correct order):</h4>
        <div className="space-y-3">
          {slots.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-3"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-semibold text-gray-700">
                {index + 1}
              </div>
              <div
                onDragOver={handleDragOver}
                onDrop={(e) => handleDropToSlot(e, index)}
                className={`flex-1 min-h-[50px] border-2 border-dashed rounded-lg p-3 transition-all duration-200 drop-zone ${
                  item 
                    ? 'border-green-400 bg-green-50' 
                    : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50'
                }`}
                data-slot-index={index}
              >
                {item ? (
                  <div className="flex items-center justify-between">
                    <span
                      draggable
                      onDragStart={(e) => handleDragStart(e, item, index)}
                      onTouchStart={(e) => handleTouchStart(e, item, index)}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                      className={`text-green-800 cursor-move select-none bg-green-100 px-2 py-1 rounded border border-green-300 touch-item ${
                        isDragging && draggedItem === item ? 'opacity-50' : ''
                      }`}
                      style={{ userSelect: 'none', touchAction: 'none' }}
                    >
                      {item}
                    </span>
                    <button
                      onClick={() => removeFromSlot(index)}
                      className="text-red-600 hover:text-red-800 transition-colors ml-2 text-xl"
                      title="Remove item"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="text-gray-500 text-center text-sm">
                    Drop item here
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {slots.filter(item => item !== null).length > 0 && (
        <div className="text-sm text-gray-600 mt-4">
          <strong>Items placed:</strong> {slots.filter(item => item !== null).length} of {items.length}
        </div>
      )}
    </div>
  );
}