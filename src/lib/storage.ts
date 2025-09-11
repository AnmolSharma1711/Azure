import { Question } from '../types/quiz';
import { predefinedQuestions } from '../data/questions';
import { DragDropStorage } from './dragDropStorage';

// Local storage key
const QUESTIONS_STORAGE_KEY = 'azure_quiz_questions';

export class QuestionStorage {
  static async initializeQuestions(): Promise<void> {
    const stored = localStorage.getItem(QUESTIONS_STORAGE_KEY);
    if (!stored) {
      // Initialize with predefined questions on first load
      console.log('Initializing with predefined questions...');
      this.saveQuestions(predefinedQuestions);
      console.log(`Initialized ${predefinedQuestions.length} predefined questions`);
    }
    
    // Also initialize drag-drop questions
    DragDropStorage.initializeDragDropQuestions();
  }

  static async getQuestions(): Promise<Question[]> {
    // Ensure questions are initialized
    await this.initializeQuestions();
    
    const stored = localStorage.getItem(QUESTIONS_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Error parsing stored questions:', error);
      }
    }
    
    // Fallback to predefined questions
    return predefinedQuestions;
  }

  static getQuestionsSync(): Question[] {
    // Synchronous version for when questions are already loaded
    const stored = localStorage.getItem(QUESTIONS_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Error parsing stored questions:', error);
      }
    }
    
    // Fallback to predefined questions
    return predefinedQuestions;
  }

  static saveQuestions(questions: Question[]): void {
    localStorage.setItem(QUESTIONS_STORAGE_KEY, JSON.stringify(questions));
  }

  static async getQuestionsByExamType(examType: 'AZ-900' | 'AI-900'): Promise<Question[]> {
    const questions = await this.getQuestions();
    return questions.filter(q => q.exam_type === examType);
  }

  static getQuestionsByExamTypeSync(examType: 'AZ-900' | 'AI-900'): Question[] {
    const questions = this.getQuestionsSync();
    return questions.filter(q => q.exam_type === examType);
  }

  // Get all questions including drag-drop questions
  static getAllQuestionsSync(): Question[] {
    const mcqQuestions = this.getQuestionsSync();
    const dragDropQuestions = DragDropStorage.getDragDropQuestions();
    return [...mcqQuestions, ...dragDropQuestions];
  }

  static getAllQuestionsByExamTypeSync(examType: 'AZ-900' | 'AI-900'): Question[] {
    const allQuestions = this.getAllQuestionsSync();
    return allQuestions.filter(q => q.exam_type === examType);
  }

  static getAllQuestionCounts(): { total: number; az900: number; ai900: number; dragDrop: { total: number; az900: number; ai900: number } } {
    const mcqQuestions = this.getQuestionsSync();
    const mcqAz900 = mcqQuestions.filter(q => q.exam_type === 'AZ-900').length;
    const mcqAi900 = mcqQuestions.filter(q => q.exam_type === 'AI-900').length;
    
    const dragDropCounts = DragDropStorage.getDragDropQuestionCounts();
    
    return {
      total: mcqQuestions.length + dragDropCounts.total,
      az900: mcqAz900 + dragDropCounts.az900,
      ai900: mcqAi900 + dragDropCounts.ai900,
      dragDrop: dragDropCounts
    };
  }

  static async getRandomQuestions(examType: 'AZ-900' | 'AI-900', count: number): Promise<Question[]> {
    const questions = await this.getQuestionsByExamType(examType);
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }

  // Get random questions including drag-drop questions
  static async getRandomAllQuestions(examType: 'AZ-900' | 'AI-900', count: number, includeDragDrop: boolean = true): Promise<Question[]> {
    let allQuestions: Question[];
    
    if (includeDragDrop) {
      const mcqQuestions = await this.getQuestionsByExamType(examType);
      const dragDropQuestions = DragDropStorage.getDragDropQuestionsByExamType(examType);
      allQuestions = [...mcqQuestions, ...dragDropQuestions];
    } else {
      allQuestions = await this.getQuestionsByExamType(examType);
    }
    
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }

  static async clearQuestions(): Promise<void> {
    localStorage.removeItem(QUESTIONS_STORAGE_KEY);
    // Reinitialize with predefined questions
    await this.initializeQuestions();
  }
}