const { QuestionStorage } = require('../lib/storage.ts');

async function testQuestionLoading() {
  console.log('Testing question loading...');
  
  try {
    const questions = await QuestionStorage.getQuestions();
    console.log(`Loaded ${questions.length} questions`);
    
    const ai900Questions = await QuestionStorage.getQuestionsByExamType('AI-900');
    console.log(`AI-900 questions: ${ai900Questions.length}`);
    
    const az900Questions = await QuestionStorage.getQuestionsByExamType('AZ-900');
    console.log(`AZ-900 questions: ${az900Questions.length}`);
    
    // Test filtering operation that might cause the error
    const testFilter = questions.filter(q => q.exam_type === 'AI-900');
    console.log(`Filter test successful: ${testFilter.length} AI-900 questions`);
    
  } catch (error) {
    console.error('Error during test:', error.message);
  }
}

testQuestionLoading();
