export interface Question {
  id: string;
  question: string;
  type: 'mcq' | 'drag-drop' | 'matching';
  options?: string[];
  correct_answer: string | string[];
  explanation?: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  exam_type: 'AZ-900' | 'AI-900';
  created_at?: string;
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  timeSpent: number;
  categoryBreakdown: Record<string, { correct: number; total: number }>;
  difficultyBreakdown: Record<string, { correct: number; total: number }>;
}

export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, any>;
  startTime: number;
  isCompleted: boolean;
  result?: QuizResult;
}