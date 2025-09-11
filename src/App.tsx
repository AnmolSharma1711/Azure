import React, { useState, useEffect } from 'react';
import { QuizSetup } from './components/QuizSetup';
import { QuizInterface } from './components/QuizInterface';
import { QuizResults } from './components/QuizResults';
import { ThemeToggle } from './components/ThemeToggle';
import { useQuiz } from './hooks/useQuiz';
import { ThemeProvider } from './contexts/ThemeContext';

type AppState = 'setup' | 'quiz' | 'results';

function App() {
  const [appState, setAppState] = useState<AppState>('setup');
  const [examType, setExamType] = useState<'AZ-900' | 'AI-900'>('AZ-900');
  const [questionCount, setQuestionCount] = useState(10);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const { quizState, loading, error, answerQuestion, nextQuestion, completeQuiz, restartQuiz } = useQuiz(
    appState === 'quiz' ? examType : 'AZ-900',
    appState === 'quiz' ? questionCount : 0
  );

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (appState === 'quiz' && !quizState.isCompleted) {
      interval = setInterval(() => {
        setTimeElapsed(Date.now() - quizState.startTime);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [appState, quizState.startTime, quizState.isCompleted]);

  const handleStartQuiz = (selectedExamType: 'AZ-900' | 'AI-900', selectedQuestionCount: number) => {
    setExamType(selectedExamType);
    setQuestionCount(selectedQuestionCount);
    setAppState('quiz');
  };

  const handleAnswer = (answer: any) => {
    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
    console.log('Handling answer for question:', currentQuestion.id, 'Answer:', answer);
    answerQuestion(currentQuestion.id, answer);
  };

  const handleNext = () => {
    if (quizState.currentQuestionIndex + 1 >= quizState.questions.length) {
      completeQuiz();
      setAppState('results');
    } else {
      nextQuestion();
    }
  };

  const handleRestart = () => {
    restartQuiz();
    setTimeElapsed(0);
    setAppState('setup');
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full mx-4 transition-colors duration-300">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">Connection Error</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (appState === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle />
        </div>
        <QuizSetup onStartQuiz={handleStartQuiz} />
      </div>
    );
  }

  if (appState === 'quiz') {
    if (loading) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center transition-colors duration-300">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading questions...</p>
          </div>
        </div>
      );
    }

    if (quizState.questions.length === 0) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center transition-colors duration-300">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full mx-4 text-center transition-colors duration-300">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">No Questions Found</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              No questions are available for {examType}. Please try reloading the application.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              Reload App
            </button>
            <button
              onClick={() => setAppState('setup')}
              className="ml-3 px-6 py-2 bg-gray-600 dark:bg-gray-500 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
            >
              Back to Setup
            </button>
          </div>
        </div>
      );
    }

    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
    const userAnswer = quizState.answers[currentQuestion.id];

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle />
        </div>
        <QuizInterface
          question={currentQuestion}
          questionIndex={quizState.currentQuestionIndex}
          totalQuestions={quizState.questions.length}
          userAnswer={userAnswer}
          onAnswer={handleAnswer}
          onNext={handleNext}
          timeElapsed={timeElapsed}
        />
      </div>
    );
  }

  if (appState === 'results' && quizState.result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle />
        </div>
        <QuizResults
          result={quizState.result}
          onRestart={handleRestart}
        />
      </div>
    );
  }

  return null;
}

function AppWithTheme() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

export default AppWithTheme;