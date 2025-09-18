// Production debugging utility
// Add this to your browser console in production to debug the quiz state

window.debugQuiz = {
  // Get current quiz state from sessionStorage
  getDebugData: () => {
    const keys = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && key.startsWith('quiz_debug_')) {
        keys.push(key);
      }
    }
    
    const debugData = {};
    keys.forEach(key => {
      try {
        debugData[key] = JSON.parse(sessionStorage.getItem(key));
      } catch (e) {
        debugData[key] = sessionStorage.getItem(key);
      }
    });
    
    return debugData;
  },
  
  // Analyze the zero score issue specifically
  analyzeZeroScore: () => {
    const debugData = window.debugQuiz.getDebugData();
    const analysis = {
      hasAnswers: false,
      answerCount: 0,
      hasQuestions: false,
      questionCount: 0,
      hasResult: false,
      score: null,
      issues: []
    };
    
    // Check final answers
    if (debugData['quiz_debug_final_answers']) {
      const answers = debugData['quiz_debug_final_answers'];
      analysis.hasAnswers = Object.keys(answers).length > 0;
      analysis.answerCount = Object.keys(answers).length;
      if (!analysis.hasAnswers) {
        analysis.issues.push('No answers were stored');
      }
    }
    
    // Check questions
    if (debugData['quiz_debug_final_questions']) {
      const questions = debugData['quiz_debug_final_questions'];
      analysis.hasQuestions = questions.length > 0;
      analysis.questionCount = questions.length;
      if (!analysis.hasQuestions) {
        analysis.issues.push('No questions were loaded');
      }
    }
    
    // Check result
    if (debugData['quiz_debug_final_result']) {
      const result = debugData['quiz_debug_final_result'];
      analysis.hasResult = true;
      analysis.score = result.score;
      if (result.score === 0 && analysis.hasAnswers) {
        analysis.issues.push('Zero score despite having answers - calculation issue');
      }
    }
    
    // Check answer results
    if (debugData['quiz_debug_answer_results']) {
      const answerResults = debugData['quiz_debug_answer_results'];
      analysis.detailedResults = answerResults;
      const correctCount = answerResults.filter(r => r.correct).length;
      const totalCount = answerResults.length;
      analysis.calculatedScore = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
      
      if (analysis.calculatedScore !== analysis.score) {
        analysis.issues.push(`Score mismatch: calculated ${analysis.calculatedScore}% vs reported ${analysis.score}%`);
      }
    }
    
    return analysis;
  },
  
  // Check if localStorage is working
  testStorage: () => {
    try {
      localStorage.setItem('test', 'working');
      const result = localStorage.getItem('test');
      localStorage.removeItem('test');
      return { localStorage: result === 'working' };
    } catch (e) {
      return { localStorage: false, error: e.message };
    }
  },
  
  // Get current questions from static data
  getStaticQuestions: () => {
    // This will need to be updated based on your actual import structure
    return 'Check network tab for questions.js bundle to see if questions are loaded';
  },
  
  // Clear all debug data
  clearDebug: () => {
    const keys = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && key.startsWith('quiz_debug_')) {
        keys.push(key);
      }
    }
    keys.forEach(key => sessionStorage.removeItem(key));
    console.log('Cleared debug data:', keys);
  }
};

console.log('Quiz debugging utility loaded. Use window.debugQuiz in console.');
console.log('Available methods:');
console.log('- window.debugQuiz.getDebugData() - Get all debug information');
console.log('- window.debugQuiz.analyzeZeroScore() - Analyze zero score issue');
console.log('- window.debugQuiz.testStorage() - Test localStorage availability');
console.log('- window.debugQuiz.clearDebug() - Clear debug data');
