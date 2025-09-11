export interface Question {
  id: string;
  question: string;
  type: 'mcq' | 'drag-drop' | 'matching' | 'true-false-table';
  options?: string[];
  correct_answer: string | string[];
  explanation?: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  exam_type: 'AZ-900' | 'AI-900';
  created_at?: string;
}

export type QuizMode = 'practice' | 'examination';

export interface QuizConfig {
  mode: QuizMode;
  examType: 'AZ-900' | 'AI-900';
  questionCount: number;
  difficulty?: 'easy' | 'medium' | 'hard'; // Only for practice mode
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
  config?: QuizConfig;
}