import { useState, useEffect, useCallback } from 'react';
import { Question, QuizState, QuizResult } from '../types/quiz';
import { QuestionStorage } from '../lib/storage';

export function useQuiz(examType: 'AZ-900' | 'AI-900', questionCount: number = 10) {
  const [quizState, setQuizState] = useState<QuizState>({
    questions: [],
    currentQuestionIndex: 0,
    answers: {},
    startTime: 0,
    isCompleted: false,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomQuestions = useCallback(async () => {
    try {
      setLoading(true);
      // Use the new method that includes drag-drop questions
      const questions = await QuestionStorage.getRandomAllQuestions(examType, questionCount, true);
      
      setQuizState(prev => ({
        ...prev,
        questions,
        startTime: Date.now(),
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load questions');
    } finally {
      setLoading(false);
    }
  }, [examType, questionCount]);

  useEffect(() => {
    fetchRandomQuestions();
  }, [fetchRandomQuestions]);

  const answerQuestion = (questionId: string, answer: any) => {
    setQuizState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answer,
      },
    }));
  };

  const nextQuestion = () => {
    setQuizState(prev => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex + 1,
    }));
  };

  const completeQuiz = () => {
    const result = calculateResult();
    setQuizState(prev => ({
      ...prev,
      isCompleted: true,
      result,
    }));
  };

  const calculateResult = (): QuizResult => {
    const { questions, answers, startTime } = quizState;
    let correctAnswers = 0;
    const categoryBreakdown: Record<string, { correct: number; total: number }> = {};
    const difficultyBreakdown: Record<string, { correct: number; total: number }> = {};

    questions.forEach(question => {
      const userAnswer = answers[question.id];
      const isCorrect = checkAnswer(question, userAnswer);
      
      if (isCorrect) correctAnswers++;

      // Category breakdown
      if (!categoryBreakdown[question.category]) {
        categoryBreakdown[question.category] = { correct: 0, total: 0 };
      }
      categoryBreakdown[question.category].total++;
      if (isCorrect) categoryBreakdown[question.category].correct++;

      // Difficulty breakdown
      if (!difficultyBreakdown[question.difficulty]) {
        difficultyBreakdown[question.difficulty] = { correct: 0, total: 0 };
      }
      difficultyBreakdown[question.difficulty].total++;
      if (isCorrect) difficultyBreakdown[question.difficulty].correct++;
    });

    return {
      totalQuestions: questions.length,
      correctAnswers,
      score: Math.round((correctAnswers / questions.length) * 100),
      timeSpent: Date.now() - startTime,
      categoryBreakdown,
      difficultyBreakdown,
    };
  };

  const checkAnswer = (question: Question, userAnswer: any): boolean => {
    if (!userAnswer) return false;
    
    switch (question.type) {
      case 'mcq':
        return userAnswer === question.correct_answer;
      case 'drag-drop':
        // For drag-drop, compare arrays
        return JSON.stringify(userAnswer) === JSON.stringify(question.correct_answer);
      case 'matching':
        // For matching, compare objects
        return JSON.stringify(userAnswer) === JSON.stringify(question.correct_answer);
      default:
        return false;
    }
  };

  const restartQuiz = () => {
    setQuizState({
      questions: [],
      currentQuestionIndex: 0,
      answers: {},
      startTime: 0,
      isCompleted: false,
    });
    fetchRandomQuestions();
  };

  return {
    quizState,
    loading,
    error,
    answerQuestion,
    nextQuestion,
    completeQuiz,
    restartQuiz,
  };
}