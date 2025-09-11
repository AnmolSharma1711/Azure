// Simple test to validate questions structure
const fs = require('fs');

try {
  // Read the questions file
  let content = fs.readFileSync('questions.ts', 'utf8');
  
  // Remove TypeScript-specific syntax to make it valid JavaScript
  content = content.replace(/import.*from.*\n/g, '');
  content = content.replace(/export const predefinedQuestions: Question\[\] = /, 'const predefinedQuestions = ');
  
  // Evaluate the JavaScript
  eval(content);
  
  console.log(`Total questions loaded: ${predefinedQuestions.length}`);
  
  // Check each question for required properties
  const issues = [];
  predefinedQuestions.forEach((q, index) => {
    if (!q) {
      issues.push(`Question ${index}: is null/undefined`);
    } else if (!q.exam_type) {
      issues.push(`Question ${index} (${q.id || 'no id'}): missing exam_type`);
    } else if (!q.id) {
      issues.push(`Question ${index}: missing id`);
    }
  });
  
  if (issues.length > 0) {
    console.log('Issues found:');
    issues.forEach(issue => console.log('  -', issue));
  } else {
    console.log('All questions have required properties!');
  }
  
  // Count by exam type
  const ai900Count = predefinedQuestions.filter(q => q && q.exam_type === 'AI-900').length;
  const az900Count = predefinedQuestions.filter(q => q && q.exam_type === 'AZ-900').length;
  
  console.log(`AI-900 questions: ${ai900Count}`);
  console.log(`AZ-900 questions: ${az900Count}`);
  
} catch (error) {
  console.error('Error loading questions:', error.message);
}
