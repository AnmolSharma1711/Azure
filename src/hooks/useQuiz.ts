import { useState, useEffect, useCallback } from 'react';
import { Question, QuizState, QuizResult } from '../types/quiz';
import { QuestionStorage } from '../lib/storage';
import { logger, debugStore } from '../lib/logger';

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
      setError(null);
      
      logger.log('Fetching questions for:', { examType, questionCount });
      
      // Don't fetch questions if questionCount is 0 or negative
      if (questionCount <= 0) {
        logger.log('Skipping question fetch - questionCount is 0 or negative');
        setLoading(false);
        return;
      }
      
      // Use the new method that includes drag-drop questions
      const questions = await QuestionStorage.getRandomAllQuestions(examType, questionCount, true);
      
      logger.log('Fetched questions:', questions.length);
      debugStore.set('questions', questions.map(q => ({ id: q.id, type: q.type, exam_type: q.exam_type })));
      
      if (questions.length === 0) {
        throw new Error(`No questions found for ${examType}. Please check that questions are properly loaded.`);
      }
      
      setQuizState(prev => ({
        ...prev,
        questions,
        startTime: Date.now(),
        answers: {}, // Reset answers
      }));
    } catch (err) {
      logger.error('Error fetching questions:', err);
      setError(err instanceof Error ? err.message : 'Failed to load questions');
    } finally {
      setLoading(false);
    }
  }, [examType, questionCount]);

  useEffect(() => {
    fetchRandomQuestions();
  }, [fetchRandomQuestions]);

  const answerQuestion = (questionId: string, answer: any) => {
    logger.log('Answer submitted:', { questionId, answer, answerType: typeof answer });
    
    setQuizState(prev => {
      const newAnswers = {
        ...prev.answers,
        [questionId]: answer,
      };
      
      logger.log('Updated answers state:', {
        questionId,
        newAnswer: answer,
        totalAnswers: Object.keys(newAnswers).length,
        allAnswers: newAnswers
      });
      
      return {
        ...prev,
        answers: newAnswers,
      };
    });
  };

  const nextQuestion = () => {
    setQuizState(prev => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex + 1,
    }));
  };

  const completeQuiz = () => {
    // Use a callback to ensure we get the latest state
    setQuizState(prev => {
      logger.log('completeQuiz called with state:', {
        questionsLength: prev.questions.length,
        answersCount: Object.keys(prev.answers).length,
        currentIndex: prev.currentQuestionIndex,
        answers: prev.answers
      });
      
      const result = calculateResultWithState(prev);
      logger.log('Completing quiz with result:', result);
      debugStore.set('final_result', result);
      debugStore.set('final_answers', prev.answers);
      debugStore.set('final_questions', prev.questions.map(q => ({ id: q.id, type: q.type, correct_answer: q.correct_answer })));
      
      // Additional verification
      if (result.score === 0 && Object.keys(prev.answers).length > 0) {
        logger.error('Zero score detected despite having answers - potential calculation issue');
        debugStore.set('zero_score_debug', {
          state: prev,
          result: result
        });
      }
      
      return {
        ...prev,
        isCompleted: true,
        result,
      };
    });
  };

  const calculateResultWithState = (state: QuizState): QuizResult => {
    const { questions, answers, startTime } = state;
    let correctAnswers = 0;
    const categoryBreakdown: Record<string, { correct: number; total: number }> = {};
    const difficultyBreakdown: Record<string, { correct: number; total: number }> = {};

    logger.log('Calculating result with state:', { 
      questionsCount: questions.length, 
      answersCount: Object.keys(answers).length,
      answers: answers,
      questions: questions.map(q => ({ id: q.id, type: q.type }))
    });

    if (questions.length === 0) {
      logger.error('No questions available for result calculation');
      return {
        totalQuestions: 0,
        correctAnswers: 0,
        score: 0,
        timeSpent: Date.now() - startTime,
        categoryBreakdown: {},
        difficultyBreakdown: {},
      };
    }

    questions.forEach(question => {
      const userAnswer = answers[question.id];
      const isCorrect = checkAnswer(question, userAnswer);
      
      logger.log(`Question ${question.id}:`, {
        userAnswer,
        correctAnswer: question.correct_answer,
        isCorrect,
        type: question.type
      });
      
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

    const score = questions.length > 0 ? Math.round((correctAnswers / questions.length) * 100) : 0;
    
    logger.log('Final result:', {
      totalQuestions: questions.length,
      correctAnswers,
      score
    });

    return {
      totalQuestions: questions.length,
      correctAnswers,
      score,
      timeSpent: Date.now() - startTime,
      categoryBreakdown,
      difficultyBreakdown,
    };
  };

  const checkAnswer = (question: Question, userAnswer: any): boolean => {
    // Enhanced logging for debugging
    logger.log(`Checking answer for question ${question.id}:`, {
      questionType: question.type,
      userAnswer: userAnswer,
      correctAnswer: question.correct_answer,
      userAnswerType: typeof userAnswer,
      correctAnswerType: typeof question.correct_answer
    });
    
    if (!userAnswer && userAnswer !== 0 && userAnswer !== false) {
      logger.log(`No user answer for question ${question.id}`);
      return false;
    }
    
    try {
      switch (question.type) {
        case 'mcq':
          const mcqResult = userAnswer === question.correct_answer;
          logger.log(`MCQ ${question.id}:`, { userAnswer, correct: question.correct_answer, result: mcqResult });
          return mcqResult;
          
        case 'drag-drop':
          // For drag-drop, compare arrays
          // Convert sparse user answer to compact array for comparison
          let compactUserAnswer;
          if (Array.isArray(userAnswer)) {
            compactUserAnswer = userAnswer.filter(item => item !== undefined && item !== null && item !== '');
          } else {
            logger.warn(`Invalid user answer format for drag-drop question ${question.id}:`, userAnswer);
            return false;
          }
          
          let correctAnswer;
          if (Array.isArray(question.correct_answer)) {
            correctAnswer = question.correct_answer;
          } else {
            logger.warn(`Invalid correct answer format for drag-drop question ${question.id}:`, question.correct_answer);
            return false;
          }
          
          const dragDropResult = JSON.stringify(compactUserAnswer) === JSON.stringify(correctAnswer);
          logger.log(`Drag-drop ${question.id}:`, { 
            userAnswer: compactUserAnswer, 
            correct: correctAnswer, 
            result: dragDropResult,
            originalUserAnswer: userAnswer
          });
          return dragDropResult;
          
        case 'matching':
          // For matching, compare objects
          const matchingResult = JSON.stringify(userAnswer) === JSON.stringify(question.correct_answer);
          logger.log(`Matching ${question.id}:`, { userAnswer, correct: question.correct_answer, result: matchingResult });
          return matchingResult;
          
        case 'true-false-table':
          // For true-false-table, compare the user answers with correct answers
          let correctAnswers;
          try {
            correctAnswers = typeof question.correct_answer === 'string' 
              ? JSON.parse(question.correct_answer) 
              : question.correct_answer;
          } catch (parseError) {
            logger.error(`Error parsing correct answer for true-false-table question ${question.id}:`, parseError);
            return false;
          }
          
          const tfResult = JSON.stringify(userAnswer) === JSON.stringify(correctAnswers);
          logger.log(`True-false-table ${question.id}:`, { 
            userAnswer, 
            correct: correctAnswers, 
            result: tfResult 
          });
          return tfResult;
          
        default:
          logger.warn(`Unknown question type: ${question.type} for question ${question.id}`);
          return false;
      }
    } catch (error) {
      logger.error(`Error checking answer for question ${question.id}:`, error);
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