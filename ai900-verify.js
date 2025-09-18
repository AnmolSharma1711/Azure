// AI-900 Question Verification Script
// Run this in browser console to check AI-900 questions

window.verifyAI900Questions = () => {
  // Sample AI-900 question data
  const sampleAI900 = {
    id: 'ai900_1',
    question: 'A retail company wants to analyze thousands of customer reviews posted online. They want to automatically determine whether the feedback is positive, neutral, or negative. Which Azure AI service should they use?',
    type: 'mcq',
    options: [
      'Custom Vision',
      'Text Analytics API',
      'Translator Text API',
      'Azure Cognitive Search'
    ],
    correct_answer: 'Text Analytics API',
    explanation: 'Text Analytics API provides sentiment analysis capabilities to determine if text is positive, neutral, or negative.',
    category: 'Natural Language Processing',
    difficulty: 'medium',
    exam_type: 'AI-900'
  };
  
  console.log('Sample AI-900 Question Verification:', {
    question: sampleAI900,
    correctAnswerLength: sampleAI900.correct_answer.length,
    correctAnswerCharCodes: sampleAI900.correct_answer.split('').map(char => ({
      char: char,
      charCode: char.charCodeAt(0)
    })),
    optionsContainsCorrect: sampleAI900.options.includes(sampleAI900.correct_answer),
    exactMatch: sampleAI900.options.find(opt => opt === sampleAI900.correct_answer)
  });
  
  // Test answer comparison
  const testUserAnswer = 'Text Analytics API';
  const testCorrectAnswer = sampleAI900.correct_answer;
  
  console.log('Answer Comparison Test:', {
    userAnswer: testUserAnswer,
    correctAnswer: testCorrectAnswer,
    exactMatch: testUserAnswer === testCorrectAnswer,
    trimmedMatch: testUserAnswer.trim() === testCorrectAnswer.trim(),
    lengthComparison: {
      user: testUserAnswer.length,
      correct: testCorrectAnswer.length
    },
    charByChar: testUserAnswer.split('').map((char, i) => ({
      index: i,
      userChar: char,
      correctChar: testCorrectAnswer[i],
      charCode: char.charCodeAt(0),
      correctCharCode: testCorrectAnswer[i] ? testCorrectAnswer[i].charCodeAt(0) : 'undefined',
      match: char === testCorrectAnswer[i]
    }))
  });
  
  return 'Verification complete - check console logs above';
};

console.log('AI-900 verification loaded. Run: window.verifyAI900Questions()');
