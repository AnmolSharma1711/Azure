const fs = require('fs');

console.log('=== Question Structure Analysis ===');

try {
  const content = fs.readFileSync('questions.ts', 'utf8');
  
  // Split into lines for analysis
  const lines = content.split('\n');
  
  // Find question objects by looking for id: patterns
  let questionCount = 0;
  let ai900Count = 0;
  let az900Count = 0;
  let missingExamType = 0;
  let currentQuestionId = '';
  let inQuestion = false;
  let hasExamType = false;
  
  console.log('Analyzing question structure...\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Start of a new question
    if (line.includes('id:') && line.includes("'")) {
      if (inQuestion && !hasExamType) {
        console.log(`❌ Question ${currentQuestionId} is missing exam_type`);
        missingExamType++;
      }
      
      questionCount++;
      const idMatch = line.match(/id:\s*['"]([^'"]+)['"]/);
      currentQuestionId = idMatch ? idMatch[1] : `question_${questionCount}`;
      inQuestion = true;
      hasExamType = false;
    }
    
    // Check for exam_type
    if (line.includes('exam_type:')) {
      hasExamType = true;
      if (line.includes('AI-900')) {
        ai900Count++;
      } else if (line.includes('AZ-900')) {
        az900Count++;
      }
    }
    
    // End of question object
    if (line === '},' || line === '}') {
      if (inQuestion && !hasExamType) {
        console.log(`❌ Question ${currentQuestionId} is missing exam_type`);
        missingExamType++;
      }
      inQuestion = false;
    }
  }
  
  console.log(`\n=== Summary ===`);
  console.log(`Total questions found: ${questionCount}`);
  console.log(`AI-900 questions: ${ai900Count}`);
  console.log(`AZ-900 questions: ${az900Count}`);
  console.log(`Questions with exam_type: ${ai900Count + az900Count}`);
  console.log(`Questions missing exam_type: ${missingExamType}`);
  
  if (missingExamType > 0) {
    console.log(`\n❌ Found ${missingExamType} questions without exam_type - this will cause runtime errors!`);
  } else {
    console.log(`\n✅ All questions have exam_type property`);
  }
  
} catch (error) {
  console.error('Error:', error.message);
}
