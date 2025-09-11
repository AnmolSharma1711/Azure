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
      questions: questions.map(q => ({ id: q.id, type: q.type, correct_answer: q.correct_answer }))
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

    // Detailed answer checking with individual results
    const answerResults: Array<{questionId: string, userAnswer: any, correct: boolean, reason?: string}> = [];

    questions.forEach(question => {
      const userAnswer = answers[question.id];
      
      // Log each answer check in detail
      logger.log(`Checking question ${question.id}:`, {
        questionType: question.type,
        hasUserAnswer: userAnswer !== undefined && userAnswer !== null,
        userAnswer: userAnswer,
        correctAnswer: question.correct_answer
      });
      
      const isCorrect = checkAnswer(question, userAnswer);
      
      answerResults.push({
        questionId: question.id,
        userAnswer: userAnswer,
        correct: isCorrect,
        reason: !userAnswer ? 'No answer provided' : (isCorrect ? 'Correct' : 'Incorrect')
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
    
    logger.log('Detailed answer results:', answerResults);
    logger.log('Final result calculation:', {
      totalQuestions: questions.length,
      correctAnswers,
      score,
      answersProvided: Object.keys(answers).length,
      unansweredQuestions: questions.filter(q => !answers[q.id]).map(q => q.id)
    });

    // Store detailed results for debugging
    debugStore.set('answer_results', answerResults);
    debugStore.set('final_calculation', {
      totalQuestions: questions.length,
      correctAnswers,
      score,
      answersProvided: Object.keys(answers).length
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
    // Enhanced logging for debugging - especially for AI-900
    const isAI900 = question.id && question.id.startsWith('ai900');
    const logPrefix = isAI900 ? '[AI-900 DEBUG]' : '[checkAnswer]';
    
    if (isAI900) {
      logger.log(`${logPrefix} DETAILED AI-900 CHECK for ${question.id}:`, {
        questionType: question.type,
        questionExamType: question.exam_type,
        userAnswer: userAnswer,
        userAnswerType: typeof userAnswer,
        userAnswerLength: typeof userAnswer === 'string' ? userAnswer.length : 'N/A',
        userAnswerString: JSON.stringify(userAnswer),
        correctAnswer: question.correct_answer,
        correctAnswerType: typeof question.correct_answer,
        correctAnswerLength: typeof question.correct_answer === 'string' ? question.correct_answer.length : 'N/A',
        correctAnswerString: JSON.stringify(question.correct_answer),
        options: question.options
      });
    } else {
      logger.log(`${logPrefix} Starting check for question ${question.id}:`, {
        questionType: question.type,
        userAnswer: userAnswer,
        userAnswerType: typeof userAnswer,
        correctAnswer: question.correct_answer,
        correctAnswerType: typeof question.correct_answer
      });
    }
    
    // Check for completely missing answers (null, undefined, empty string)
    if (userAnswer === null || userAnswer === undefined || userAnswer === '') {
      logger.log(`${logPrefix} No valid answer for question ${question.id}`);
      return false;
    }
    
    // For arrays, check if empty
    if (Array.isArray(userAnswer) && userAnswer.length === 0) {
      logger.log(`${logPrefix} Empty array answer for question ${question.id}`);
      return false;
    }
    
    // For objects, check if empty
    if (typeof userAnswer === 'object' && !Array.isArray(userAnswer) && Object.keys(userAnswer).length === 0) {
      logger.log(`${logPrefix} Empty object answer for question ${question.id}`);
      return false;
    }
    
    try {
      switch (question.type) {
        case 'mcq':
          // Enhanced comparison for AI-900 questions
          const userStr = String(userAnswer).trim();
          const correctStr = String(question.correct_answer).trim();
          
          if (isAI900) {
            logger.log(`${logPrefix} AI-900 MCQ comparison details:`, {
              userStr: userStr,
              correctStr: correctStr,
              userStrLength: userStr.length,
              correctStrLength: correctStr.length,
              exactMatch: userStr === correctStr,
              caseInsensitiveMatch: userStr.toLowerCase() === correctStr.toLowerCase(),
              charByCharComparison: userStr.split('').map((char, i) => ({
                index: i,
                userChar: char,
                correctChar: correctStr[i] || 'undefined',
                charCode: char.charCodeAt(0),
                correctCharCode: correctStr[i] ? correctStr[i].charCodeAt(0) : 'undefined',
                match: char === (correctStr[i] || 'undefined')
              }))
            });
          }
          
          const mcqResult = userStr === correctStr;
          logger.log(`${logPrefix} MCQ ${question.id}:`, { 
            userAnswerStr: userStr, 
            correctStr: correctStr, 
            result: mcqResult 
          });
          return mcqResult;
          
        case 'drag-drop':
          // For drag-drop, handle sparse arrays and compare sequences
          let compactUserAnswer: string[] = [];
          
          if (Array.isArray(userAnswer)) {
            // Filter out undefined, null, empty strings, and maintain order
            compactUserAnswer = userAnswer
              .filter(item => item !== undefined && item !== null && item !== '')
              .map(item => String(item).trim());
          } else {
            logger.warn(`${logPrefix} Invalid user answer format for drag-drop question ${question.id}:`, userAnswer);
            return false;
          }
          
          let correctAnswer: string[] = [];
          if (Array.isArray(question.correct_answer)) {
            correctAnswer = question.correct_answer.map(item => String(item).trim());
          } else {
            logger.warn(`${logPrefix} Invalid correct answer format for drag-drop question ${question.id}:`, question.correct_answer);
            return false;
          }
          
          // Compare arrays exactly
          const dragDropResult = compactUserAnswer.length === correctAnswer.length && 
                                compactUserAnswer.every((item, index) => item === correctAnswer[index]);
          
          logger.log(`${logPrefix} Drag-drop ${question.id}:`, { 
            userAnswerCompact: compactUserAnswer, 
            correctAnswer: correctAnswer, 
            lengthMatch: compactUserAnswer.length === correctAnswer.length,
            contentMatch: compactUserAnswer.every((item, index) => item === correctAnswer[index]),
            result: dragDropResult,
            originalUserAnswer: userAnswer
          });
          return dragDropResult;
          
        case 'matching':
          // For matching, compare objects
          const userString = JSON.stringify(userAnswer);
          const correctString = JSON.stringify(question.correct_answer);
          const matchingResult = userString === correctString;
          logger.log(`${logPrefix} Matching ${question.id}:`, { 
            userString, 
            correctString, 
            result: matchingResult 
          });
          return matchingResult;
          
        case 'true-false-table':
          // For true-false-table, parse correct answer if string and compare
          let correctAnswers;
          try {
            correctAnswers = typeof question.correct_answer === 'string' 
              ? JSON.parse(question.correct_answer) 
              : question.correct_answer;
          } catch (parseError) {
            logger.error(`${logPrefix} Error parsing correct answer for true-false-table question ${question.id}:`, parseError);
            return false;
          }
          
          const userString2 = JSON.stringify(userAnswer);
          const correctString2 = JSON.stringify(correctAnswers);
          const tfResult = userString2 === correctString2;
          logger.log(`${logPrefix} True-false-table ${question.id}:`, { 
            userAnswer, 
            correctAnswers, 
            userString: userString2,
            correctString: correctString2,
            result: tfResult 
          });
          return tfResult;
          
        default:
          logger.warn(`${logPrefix} Unknown question type: ${question.type} for question ${question.id}`);
          return false;
      }
    } catch (error) {
      logger.error(`${logPrefix} Error checking answer for question ${question.id}:`, error);
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