import { predefinedQuestions } from './src/data/questions.js';
import { dragDropQuestions } from './src/data/dragDropQuestions.js';

console.log('=== Static Data Validation ===');

console.log('Predefined questions:', predefinedQuestions ? predefinedQuestions.length : 'undefined');
console.log('Drag drop questions:', dragDropQuestions ? dragDropQuestions.length : 'undefined');

if (predefinedQuestions) {
  const invalidPredefined = predefinedQuestions.filter(q => !q || !q.exam_type);
  console.log('Invalid predefined questions:', invalidPredefined.length);
  if (invalidPredefined.length > 0) {
    console.log('First invalid predefined:', invalidPredefined[0]);
  }
}

if (dragDropQuestions) {
  const invalidDragDrop = dragDropQuestions.filter(q => !q || !q.exam_type);
  console.log('Invalid drag drop questions:', invalidDragDrop.length);
  if (invalidDragDrop.length > 0) {
    console.log('First invalid drag drop:', invalidDragDrop[0]);
  }
}
