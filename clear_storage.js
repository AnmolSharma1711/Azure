// Clear localStorage script
// Copy and paste this into browser console to fix the issue

console.log('Clearing localStorage...');
localStorage.removeItem('azure_quiz_questions');
console.log('localStorage cleared. Refresh the page to load fresh questions.');

// Or if you want to see what was in localStorage:
// const old = localStorage.getItem('azure_quiz_questions');
// console.log('Old localStorage data:', old ? JSON.parse(old).length + ' questions' : 'No data');
