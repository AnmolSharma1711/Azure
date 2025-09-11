import { Question } from '../types/quiz';
import { dragDropQuestions } from '../data/dragDropQuestions';

// Local storage key for drag-drop questions
const DRAGDROP_STORAGE_KEY = 'azure_quiz_dragdrop_questions';

export class DragDropStorage {
  static initializeDragDropQuestions(): void {
    const stored = localStorage.getItem(DRAGDROP_STORAGE_KEY);
    if (!stored) {
      // Initialize with predefined drag-drop questions on first load
      this.saveDragDropQuestions(dragDropQuestions);
    }
  }

  static getDragDropQuestions(): Question[] {
    // Ensure questions are initialized
    this.initializeDragDropQuestions();
    
    const stored = localStorage.getItem(DRAGDROP_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Error parsing stored drag-drop questions:', error);
      }
    }
    
    // Fallback to predefined questions
    return dragDropQuestions;
  }

  static saveDragDropQuestions(questions: Question[]): void {
    localStorage.setItem(DRAGDROP_STORAGE_KEY, JSON.stringify(questions));
  }

  static addDragDropQuestions(newQuestions: Question[]): void {
    const existingQuestions = this.getDragDropQuestions();
    const allQuestions = [...existingQuestions, ...newQuestions];
    this.saveDragDropQuestions(allQuestions);
  }

  static getDragDropQuestionsByExamType(examType: 'AZ-900' | 'AI-900'): Question[] {
    return this.getDragDropQuestions().filter(q => q.exam_type === examType);
  }

  static getRandomDragDropQuestions(examType: 'AZ-900' | 'AI-900', count: number): Question[] {
    const questions = this.getDragDropQuestionsByExamType(examType);
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }

  static clearDragDropQuestions(): void {
    localStorage.removeItem(DRAGDROP_STORAGE_KEY);
    // Reinitialize with predefined questions
    this.initializeDragDropQuestions();
  }

  static getDragDropQuestionCounts(): { total: number; az900: number; ai900: number } {
    const questions = this.getDragDropQuestions();
    const az900Count = questions.filter(q => q.exam_type === 'AZ-900').length;
    const ai900Count = questions.filter(q => q.exam_type === 'AI-900').length;
    
    return {
      total: questions.length,
      az900: az900Count,
      ai900: ai900Count
    };
  }
}
