// Simple test to check question data
const fs = require('fs');
const path = require('path');

// Read the questions.ts file
const questionsFile = fs.readFileSync(path.join(__dirname, 'src/data/questions.ts'), 'utf-8');
const dragDropFile = fs.readFileSync(path.join(__dirname, 'src/data/dragDropQuestions.ts'), 'utf-8');

// Extract question counts
const mcqMatches = questionsFile.match(/id:\s*'[^']+'/g) || [];
const dragDropMatches = dragDropFile.match(/id:\s*'[^']+'/g) || [];

console.log('MCQ Questions found:', mcqMatches.length);
console.log('Drag-Drop Questions found:', dragDropMatches.length);

// Check exam types
const az900MCQ = questionsFile.match(/exam_type:\s*'AZ-900'/g) || [];
const ai900MCQ = questionsFile.match(/exam_type:\s*'AI-900'/g) || [];
const az900DD = dragDropFile.match(/exam_type:\s*'AZ-900'/g) || [];
const ai900DD = dragDropFile.match(/exam_type:\s*'AI-900'/g) || [];

console.log('AZ-900 MCQ Questions:', az900MCQ.length);
console.log('AI-900 MCQ Questions:', ai900MCQ.length);
console.log('AZ-900 Drag-Drop Questions:', az900DD.length);
console.log('AI-900 Drag-Drop Questions:', ai900DD.length);

console.log('Total AZ-900 Questions:', az900MCQ.length + az900DD.length);
console.log('Total AI-900 Questions:', ai900MCQ.length + ai900DD.length);
