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
console.log('- window.debugQuiz.testStorage() - Test localStorage availability');
console.log('- window.debugQuiz.clearDebug() - Clear debug data');
