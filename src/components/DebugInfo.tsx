import React from 'react';
import { useQuiz } from '../hooks/useQuiz';

interface DebugInfoProps {
  examType: 'AZ-900' | 'AI-900';
  questionCount: number;
}

export function DebugInfo({ examType, questionCount }: DebugInfoProps) {
  const { quizState } = useQuiz(examType, questionCount);

  if (process.env.NODE_ENV === 'production') {
    return null; // Don't show debug info in production
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white p-4 rounded-lg text-xs max-w-sm">
      <h4 className="font-bold mb-2">Debug Info</h4>
      <div>Questions: {quizState.questions.length}</div>
      <div>Current Index: {quizState.currentQuestionIndex}</div>
      <div>Answers: {Object.keys(quizState.answers).length}</div>
      <div>Completed: {quizState.isCompleted ? 'Yes' : 'No'}</div>
      {quizState.result && (
        <div>Score: {quizState.result.score}%</div>
      )}
      <details className="mt-2">
        <summary>Answers</summary>
        <pre className="text-xs mt-1 overflow-auto max-h-32">
          {JSON.stringify(quizState.answers, null, 2)}
        </pre>
      </details>
    </div>
  );
}
