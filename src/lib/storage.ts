import { Question } from '../types/quiz';
import { predefinedQuestions } from '../data/questions';
import { dragDropQuestions } from '../data/dragDropQuestions';

// Debug imports immediately
console.log('[Storage] Import verification:', {
  predefinedQuestionsLoaded: Array.isArray(predefinedQuestions),
  predefinedCount: predefinedQuestions ? predefinedQuestions.length : 0,
  dragDropQuestionsLoaded: Array.isArray(dragDropQuestions),
  dragDropCount: dragDropQuestions ? dragDropQuestions.length : 0,
  predefinedAI900: predefinedQuestions ? predefinedQuestions.filter(q => q.exam_type === 'AI-900').length : 0,
  predefinedAZ900: predefinedQuestions ? predefinedQuestions.filter(q => q.exam_type === 'AZ-900').length : 0,
  dragDropAI900: dragDropQuestions ? dragDropQuestions.filter(q => q.exam_type === 'AI-900').length : 0,
  dragDropAZ900: dragDropQuestions ? dragDropQuestions.filter(q => q.exam_type === 'AZ-900').length : 0
});

// Local storage key
const QUESTIONS_STORAGE_KEY = 'azure_quiz_questions';

export class QuestionStorage {
  static async initializeQuestions(): Promise<void> {
    // In production environments, we might not have localStorage
    // So we'll just use the static data directly
    if (typeof window === 'undefined') return;
    
    try {
      const stored = localStorage.getItem(QUESTIONS_STORAGE_KEY);
      if (!stored) {
        // Combine all question types on first load
        console.log('Initializing with all question types...');
        const allQuestions = [...predefinedQuestions, ...dragDropQuestions];
        this.saveQuestions(allQuestions);
        console.log(`Initialized ${allQuestions.length} total questions (${predefinedQuestions.length} MCQ + ${dragDropQuestions.length} drag-drop)`);
      }
    } catch (error) {
      console.warn('localStorage not available, using static data:', error);
    }
  }

  static async getQuestions(): Promise<Question[]> {
    // Always return static data in production to avoid localStorage issues
    if (typeof window === 'undefined') {
      const combinedQuestions = [...predefinedQuestions, ...dragDropQuestions];
      console.log('[Storage] Server-side getQuestions:', {
        predefined: predefinedQuestions.length,
        dragDrop: dragDropQuestions.length,
        total: combinedQuestions.length
      });
      return combinedQuestions;
    }
    
    try {
      // Ensure questions are initialized
      await this.initializeQuestions();
      
      const stored = localStorage.getItem(QUESTIONS_STORAGE_KEY);
      if (stored) {
        const parsedQuestions = JSON.parse(stored);
        // Ensure we have the latest questions by merging with static data
        const allQuestions = [...predefinedQuestions, ...dragDropQuestions];
        
        console.log('[Storage] getQuestions from localStorage:', {
          stored: parsedQuestions.length,
          static: allQuestions.length,
          predefined: predefinedQuestions.length,
          dragDrop: dragDropQuestions.length,
          usingStatic: allQuestions.length > parsedQuestions.length
        });
        
        return allQuestions.length > parsedQuestions.length ? allQuestions : parsedQuestions;
      }
    } catch (error) {
      console.warn('Error accessing localStorage, using static data:', error);
    }
    
    // Fallback to static data
    const safePredefinedQuestions = predefinedQuestions || [];
    const safeDragDropQuestions = dragDropQuestions || [];
    const fallbackQuestions = [...safePredefinedQuestions, ...safeDragDropQuestions];
    
    console.log('[Storage] getQuestions fallback:', {
      predefined: safePredefinedQuestions.length,
      dragDrop: safeDragDropQuestions.length,
      total: fallbackQuestions.length,
      ai900Count: fallbackQuestions.filter(q => q.exam_type === 'AI-900').length,
      az900Count: fallbackQuestions.filter(q => q.exam_type === 'AZ-900').length
    });
    
    // If we still have no questions, there's a serious import issue
    if (fallbackQuestions.length === 0) {
      console.error('[Storage] CRITICAL: No questions available - import failure!');
      // Return a minimal test question to prevent app crash
      return [{
        id: 'emergency-test',
        question: 'Emergency test question - data loading failed',
        type: 'mcq',
        options: ['Option A', 'Option B'],
        correct_answer: 'Option A',
        explanation: 'This is an emergency fallback question',
        category: 'Test',
        difficulty: 'easy',
        exam_type: 'AI-900'
      }];
    }
    
    return fallbackQuestions;
  }

  static getQuestionsSync(): Question[] {
    // Always return combined static data for reliability
    if (typeof window === 'undefined') {
      return [...predefinedQuestions, ...dragDropQuestions];
    }
    
    try {
      const stored = localStorage.getItem(QUESTIONS_STORAGE_KEY);
      if (stored) {
        const parsedQuestions = JSON.parse(stored);
        // Ensure we have the latest questions by merging with static data
        const allQuestions = [...predefinedQuestions, ...dragDropQuestions];
        return allQuestions.length > parsedQuestions.length ? allQuestions : parsedQuestions;
      }
    } catch (error) {
      console.warn('Error accessing localStorage, using static data:', error);
    }
    
    // Fallback to static data
    return [...predefinedQuestions, ...dragDropQuestions];
  }

  static saveQuestions(questions: Question[]): void {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(QUESTIONS_STORAGE_KEY, JSON.stringify(questions));
      }
    } catch (error) {
      console.warn('Could not save to localStorage:', error);
    }
  }

  static async getQuestionsByExamType(examType: 'AZ-900' | 'AI-900'): Promise<Question[]> {
    const questions = await this.getQuestions();
    const filtered = questions.filter(q => q.exam_type === examType);
    
    console.log(`[Storage] getQuestionsByExamType(${examType}):`, {
      totalQuestions: questions.length,
      filteredQuestions: filtered.length,
      examTypes: [...new Set(questions.map(q => q.exam_type))],
      sampleFiltered: filtered.slice(0, 3).map(q => ({ id: q.id, type: q.type, exam_type: q.exam_type }))
    });
    
    return filtered;
  }

  static getQuestionsByExamTypeSync(examType: 'AZ-900' | 'AI-900'): Question[] {
    const questions = this.getQuestionsSync();
    const filtered = questions.filter(q => q.exam_type === examType);
    
    console.log(`[Storage] getQuestionsByExamTypeSync(${examType}):`, {
      totalQuestions: questions.length,
      filteredQuestions: filtered.length,
      examTypes: [...new Set(questions.map(q => q.exam_type))],
      sampleFiltered: filtered.slice(0, 3).map(q => ({ id: q.id, type: q.type, exam_type: q.exam_type }))
    });
    
    return filtered;
  }

  // Get all questions including drag-drop questions
  static getAllQuestionsSync(): Question[] {
    // Use the improved getQuestionsSync that already includes drag-drop questions
    return this.getQuestionsSync();
  }

  static getAllQuestionsByExamTypeSync(examType: 'AZ-900' | 'AI-900'): Question[] {
    const allQuestions = this.getAllQuestionsSync();
    return allQuestions.filter(q => q.exam_type === examType);
  }

  static getAllQuestionCounts(): { total: number; az900: number; ai900: number; dragDrop: { total: number; az900: number; ai900: number } } {
    const allQuestions = this.getQuestionsSync();
    const mcqQuestions = allQuestions.filter(q => q.type === 'mcq');
    const dragDropQuestionsFiltered = allQuestions.filter(q => q.type === 'drag-drop');
    
    const mcqAz900 = mcqQuestions.filter(q => q.exam_type === 'AZ-900').length;
    const mcqAi900 = mcqQuestions.filter(q => q.exam_type === 'AI-900').length;
    
    const dragDropAz900 = dragDropQuestionsFiltered.filter(q => q.exam_type === 'AZ-900').length;
    const dragDropAi900 = dragDropQuestionsFiltered.filter(q => q.exam_type === 'AI-900').length;
    
    return {
      total: allQuestions.length,
      az900: mcqAz900 + dragDropAz900,
      ai900: mcqAi900 + dragDropAi900,
      dragDrop: {
        total: dragDropQuestionsFiltered.length,
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
    
    console.log('[Storage] getRandomAllQuestions called with:', { examType, count, includeDragDrop });
    
    // Safety check for imports
    if (!predefinedQuestions || !Array.isArray(predefinedQuestions)) {
      console.error('[Storage] predefinedQuestions not properly loaded!', predefinedQuestions);
      return [];
    }
    
    if (!dragDropQuestions || !Array.isArray(dragDropQuestions)) {
      console.error('[Storage] dragDropQuestions not properly loaded!', dragDropQuestions);
      // Continue with just predefined questions
    }
    
    if (includeDragDrop && dragDropQuestions && Array.isArray(dragDropQuestions)) {
      const mcqQuestions = await this.getQuestionsByExamType(examType);
      const examDragDropQuestions = dragDropQuestions.filter(q => q.exam_type === examType);
      allQuestions = [...mcqQuestions, ...examDragDropQuestions];
      console.log('[Storage] Combined questions:', { 
        mcq: mcqQuestions.length, 
        dragDrop: examDragDropQuestions.length, 
        total: allQuestions.length 
      });
    } else {
      allQuestions = await this.getQuestionsByExamType(examType);
      console.log('[Storage] MCQ questions only:', allQuestions.length);
    }
    
    if (allQuestions.length === 0) {
      console.error(`[Storage] No questions found for exam type: ${examType}`);
      console.log('[Storage] Available exam types in data:', {
        predefinedTypes: predefinedQuestions ? [...new Set(predefinedQuestions.map(q => q.exam_type))] : [],
        dragDropTypes: dragDropQuestions ? [...new Set(dragDropQuestions.map(q => q.exam_type))] : []
      });
      return [];
    }
    
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    const result = shuffled.slice(0, Math.min(count, shuffled.length));
    console.log('[Storage] Final random questions selected:', result.length);
    return result;
  }

  static async clearQuestions(): Promise<void> {
    localStorage.removeItem(QUESTIONS_STORAGE_KEY);
    // Reinitialize with predefined questions
    await this.initializeQuestions();
  }
}