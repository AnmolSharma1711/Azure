import React from 'react';
import { Question } from '../../types/quiz';

interface TrueFalseTableQuestionProps {
  question: Question;
  userAnswer?: Record<string, boolean>;
  onAnswer: (answer: Record<string, boolean>) => void;
}

export function TrueFalseTableQuestion({ question, userAnswer = {}, onAnswer }: TrueFalseTableQuestionProps) {
  // Parse question data for true-false table format
  // Expected format: question.options contains the statements
  // question.correct_answer is a JSON string with statement: boolean mapping
  const statements = question.options || [];
  
  const handleAnswerChange = (statementIndex: number, value: boolean) => {
    const newAnswer = { ...userAnswer };
    newAnswer[statementIndex.toString()] = value;
    onAnswer(newAnswer);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 transition-colors duration-300">
        {question.question}
      </h3>
      
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 transition-colors duration-300">
        For each statement below, select whether it is True or False:
      </div>

      {/* Table Format */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 rounded-lg transition-colors duration-300">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700 transition-colors duration-300">
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">
                Statement
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center font-semibold text-gray-700 dark:text-gray-300 w-24 transition-colors duration-300">
                True
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center font-semibold text-gray-700 dark:text-gray-300 w-24 transition-colors duration-300">
                False
              </th>
            </tr>
          </thead>
          <tbody>
            {statements.map((statement, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-800 dark:text-gray-200 transition-colors duration-300">
                  <div className="flex items-start space-x-2">
                    <span className="font-medium text-blue-600 dark:text-blue-400 mt-0.5 transition-colors duration-300">{index + 1}.</span>
                    <span>{statement}</span>
                  </div>
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center transition-colors duration-300">
                  <input
                    type="radio"
                    name={`statement-${index}`}
                    value="true"
                    checked={userAnswer[index.toString()] === true}
                    onChange={() => handleAnswerChange(index, true)}
                    className="w-4 h-4 text-green-600 dark:text-green-400 focus:ring-green-500 dark:focus:ring-green-400 focus:ring-2 bg-white dark:bg-gray-700"
                  />
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center transition-colors duration-300">
                  <input
                    type="radio"
                    name={`statement-${index}`}
                    value="false"
                    checked={userAnswer[index.toString()] === false}
                    onChange={() => handleAnswerChange(index, false)}
                    className="w-4 h-4 text-red-600 dark:text-red-400 focus:ring-red-500 dark:focus:ring-red-400 focus:ring-2 bg-white dark:bg-gray-700"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Progress indicator */}
      <div className="text-sm text-gray-500 dark:text-gray-400 text-center transition-colors duration-300">
        Answered: {Object.keys(userAnswer).length} of {statements.length} statements
      </div>
    </div>
  );
}
