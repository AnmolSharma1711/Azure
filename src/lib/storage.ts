import { Question } from '../types/quiz';
import { predefinedQuestions } from '../data/questions';
import { dragDropQuestions } from '../data/dragDropQuestions';

// Local storage key
const QUESTIONS_STORAGE_KEY = 'azure_quiz_questions';

export class QuestionStorage {
  static async initializeQuestions(): Promise<void> {
    const stored = localStorage.getItem(QUESTIONS_STORAGE_KEY);
    if (!stored) {
      // Combine all question types on first load
      console.log('Initializing with all question types...');
      const allQuestions = [...predefinedQuestions, ...dragDropQuestions];
      this.saveQuestions(allQuestions);
      console.log(`Initialized ${allQuestions.length} total questions (${predefinedQuestions.length} MCQ + ${dragDropQuestions.length} drag-drop)`);
    }
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
    
    const dragDropAz900 = dragDropQuestions.filter(q => q.exam_type === 'AZ-900').length;
    const dragDropAi900 = dragDropQuestions.filter(q => q.exam_type === 'AI-900').length;
    
    return {
      total: mcqQuestions.length + dragDropQuestions.length,
      az900: mcqAz900 + dragDropAz900,
      ai900: mcqAi900 + dragDropAi900,
      dragDrop: {
        total: dragDropQuestions.length,
        az900: dragDropAz900,
        ai900: dragDropAi900
      }
    };
  }

  static getQuestionCounts(): { total: number; az900: number; ai900: number } {
    const questions = this.getQuestionsSync();
    const az900Count = questions.filter(q => q.exam_type === 'AZ-900').length;
    const ai900Count = questions.filter(q => q.exam_type === 'AI-900').length;
    
    return {
      total: questions.length,
      az900: az900Count,
      ai900: ai900Count
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
      const examDragDropQuestions = dragDropQuestions.filter(q => q.exam_type === examType);
      allQuestions = [...mcqQuestions, ...examDragDropQuestions];
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