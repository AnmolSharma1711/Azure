import { Question } from '../types/quiz';

export const predefinedQuestions: Question[] = [
  // AI-900 Questions from CSV
  {
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
  },
  {
    id: 'ai900_2',
    question: 'A bank wants to identify unusual credit card transactions that may indicate fraud. The historical dataset has transaction details but no labels indicating "fraud" or "not fraud." Which ML approach is most suitable?',
    type: 'mcq',
    options: [
      'Supervised Learning',
      'Unsupervised Learning',
      'Reinforcement Learning',
      'Computer Vision'
    ],
    correct_answer: 'Unsupervised Learning',
    explanation: 'Unsupervised learning is used when you have data without labels and want to find patterns or anomalies.',
    category: 'Machine Learning Fundamentals',
    difficulty: 'medium',
    exam_type: 'AI-900'
  },
  {
    id: 'ai900_3',
    question: 'An insurance company receives thousands of claim forms every day. They want to automatically extract details like customer name, policy number, and claim amount from scanned forms. Which Azure AI service should they use?',
    type: 'mcq',
    options: [
      'Form Recognizer',
      'Custom Vision',
      'Translator Service',
      'Speech Service'
    ],
    correct_answer: 'Form Recognizer',
    explanation: 'Form Recognizer is specifically designed to extract structured data from forms and documents.',
    category: 'Document Intelligence',
    difficulty: 'easy',
    exam_type: 'AI-900'
  },
  {
    id: 'ai900_4',
    question: 'A travel company wants to build a chatbot that communicates with international travelers in their native languages. The chatbot should be able to translate queries and respond in real-time. Which combination of services is most appropriate?',
    type: 'mcq',
    options: [
      'Azure Bot Service + Translator Service',
      'Computer Vision + Text Analytics',
      'Speech Service + Face API',
      'Azure Cognitive Search + AutoML'
    ],
    correct_answer: 'Azure Bot Service + Translator Service',
    explanation: 'Azure Bot Service provides chatbot functionality while Translator Service enables real-time translation.',
    category: 'Conversational AI',
    difficulty: 'medium',
    exam_type: 'AI-900'
  },
  {
    id: 'ai900_5',
    question: 'A manufacturing company wants to reduce downtime by predicting when machines might fail based on sensor data. Which ML workload is most appropriate?',
    type: 'mcq',
    options: [
      'Classification',
      'Regression',
      'Clustering',
      'Knowledge Mining'
    ],
    correct_answer: 'Regression',
    explanation: 'Regression is used to predict continuous values, such as predicting when a machine might fail.',
    category: 'Machine Learning Workloads',
    difficulty: 'medium',
    exam_type: 'AI-900'
  },
  {
    id: 'ai900_6',
    question: 'A hospital wants to use AI to identify whether X-ray images show signs of pneumonia. They already have a labeled dataset of X-rays classified as "pneumonia" or "normal." Which AI technique should they apply?',
    type: 'mcq',
    options: [
      'Unsupervised Learning',
      'Reinforcement Learning',
      'Supervised Learning',
      'Knowledge Mining'
    ],
    correct_answer: 'Supervised Learning',
    explanation: 'Supervised learning is used when you have labeled training data to train a model for classification.',
    category: 'Machine Learning Fundamentals',
    difficulty: 'easy',
    exam_type: 'AI-900'
  },
  {
    id: 'ai900_7',
    question: 'A bank wants to provide customers with a virtual assistant that can answer frequently asked questions such as "What\'s my account balance?" or "How do I apply for a loan?" Which Azure service is the best choice?',
    type: 'mcq',
    options: [
      'QnA Maker + Azure Bot Service',
      'Custom Vision + Computer Vision OCR',
      'Speech Service + Translator API',
      'Form Recognizer + Azure Data Factory'
    ],
    correct_answer: 'QnA Maker + Azure Bot Service',
    explanation: 'QnA Maker creates knowledge bases for FAQ scenarios, while Bot Service provides the conversational interface.',
    category: 'Conversational AI',
    difficulty: 'medium',
    exam_type: 'AI-900'
  },
  {
    id: 'ai900_8',
    question: 'A company develops an AI system for screening resumes. They want to ensure the system does not unfairly disadvantage candidates based on gender or race. Which Responsible AI principle directly applies here?',
    type: 'mcq',
    options: [
      'Transparency',
      'Fairness',
      'Reliability and Safety',
      'Accountability'
    ],
    correct_answer: 'Fairness',
    explanation: 'Fairness ensures AI systems treat all people fairly and avoid bias based on protected characteristics.',
    category: 'Responsible AI',
    difficulty: 'easy',
    exam_type: 'AI-900'
  },
  {
    id: 'ai900_9',
    question: 'A city government installs cameras to detect traffic violations, such as vehicles crossing red lights. The system must detect vehicles in real-time and record evidence. Which Azure AI service is most suitable?',
    type: 'mcq',
    options: [
      'Face API',
      'Custom Vision',
      'Speech Service',
      'Text Analytics'
    ],
    correct_answer: 'Custom Vision',
    explanation: 'Custom Vision can be trained to detect and classify objects like vehicles in images and video streams.',
    category: 'Computer Vision',
    difficulty: 'medium',
    exam_type: 'AI-900'
  },
  {
    id: 'ai900_10',
    question: 'A law firm has millions of legal documents and wants to quickly search and summarize key clauses across them using AI. Which Azure AI workload is most appropriate?',
    type: 'mcq',
    options: [
      'Natural Language Processing',
      'Knowledge Mining',
      'Computer Vision',
      'Reinforcement Learning'
    ],
    correct_answer: 'Knowledge Mining',
    explanation: 'Knowledge Mining extracts insights and information from large volumes of unstructured content.',
    category: 'Knowledge Mining',
    difficulty: 'medium',
    exam_type: 'AI-900'
  },
  {
    id: 'ai900_11',
    question: 'A university wants to provide automated transcriptions for online classes, so students can get lecture notes in text format. Which Azure service should they use?',
    type: 'mcq',
    options: [
      'Translator API',
      'Speech-to-Text',
      'Text Analytics',
      'QnA Maker'
    ],
    correct_answer: 'Speech-to-Text',
    explanation: 'Speech-to-Text converts spoken audio into written text, perfect for transcribing lectures.',
    category: 'Speech Services',
    difficulty: 'easy',
    exam_type: 'AI-900'
  },
  {
    id: 'ai900_12',
    question: 'A car rental service wants to predict the daily rental price of cars based on type, mileage, and demand. Which ML approach is most appropriate?',
    type: 'mcq',
    options: [
      'Clustering',
      'Regression',
      'Classification',
      'Reinforcement Learning'
    ],
    correct_answer: 'Regression',
    explanation: 'Regression predicts continuous numerical values, such as rental prices.',
    category: 'Machine Learning Workloads',
    difficulty: 'medium',
    exam_type: 'AI-900'
  },
  {
    id: 'ai900_13',
    question: 'A healthcare startup wants to identify tumors in MRI scans using a pre-trained AI service. Which service is best suited?',
    type: 'mcq',
    options: [
      'Custom Vision',
      'Speech-to-Text',
      'Translator Service',
      'Face API'
    ],
    correct_answer: 'Custom Vision',
    explanation: 'Custom Vision can be trained to identify and classify objects in medical images like MRI scans.',
    category: 'Computer Vision',
    difficulty: 'medium',
    exam_type: 'AI-900'
  },
  {
    id: 'ai900_14',
    question: 'A food delivery company wants to recommend dishes to users based on their past orders. Which ML workload applies here?',
    type: 'mcq',
    options: [
      'Recommendation Systems',
      'Clustering',
      'Regression',
      'Classification'
    ],
    correct_answer: 'Recommendation Systems',
    explanation: 'Recommendation systems analyze user behavior to suggest relevant items or content.',
    category: 'Machine Learning Workloads',
    difficulty: 'easy',
    exam_type: 'AI-900'
  },
  {
    id: 'ai900_15',
    question: 'A recruitment agency wants to quickly filter through thousands of CVs to extract skills and job titles. Which AI service should they choose?',
    type: 'mcq',
    options: [
      'Text Analytics',
      'Speech Service',
      'Computer Vision',
      'Form Recognizer'
    ],
    correct_answer: 'Text Analytics',
    explanation: 'Text Analytics can extract key phrases, entities, and information from text documents like CVs.',
    category: 'Natural Language Processing',
    difficulty: 'medium',
    exam_type: 'AI-900'
  },
  // AZ-900 Sample Questions
  {
    id: 'az900_1',
    question: 'What is Microsoft Azure?',
    type: 'mcq',
    options: [
      'A cloud computing platform',
      'A database management system',
      'An operating system',
      'A programming language'
    ],
    correct_answer: 'A cloud computing platform',
    explanation: 'Microsoft Azure is a comprehensive cloud computing platform that provides various services including computing, analytics, storage, and networking.',
    category: 'Cloud Concepts',
    difficulty: 'easy',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_2',
    question: 'Which Azure service is used for hosting web applications?',
    type: 'mcq',
    options: [
      'Azure Virtual Machines',
      'Azure App Service',
      'Azure Storage',
      'Azure SQL Database'
    ],
    correct_answer: 'Azure App Service',
    explanation: 'Azure App Service is a fully managed platform for building, deploying, and scaling web apps.',
    category: 'Azure Services',
    difficulty: 'medium',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_3',
    question: 'Which Azure service provides Infrastructure as a Service (IaaS)?',
    type: 'mcq',
    options: [
      'Azure Functions',
      'Azure App Service',
      'Azure Virtual Machines',
      'Azure SQL Database'
    ],
    correct_answer: 'Azure Virtual Machines',
    explanation: 'Azure Virtual Machines provide Infrastructure as a Service (IaaS) by offering virtualized computing resources.',
    category: 'Cloud Service Types',
    difficulty: 'medium',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_5',
    question: 'What is the benefit of using Azure Resource Groups?',
    type: 'mcq',
    options: [
      'They provide backup services',
      'They organize and manage related Azure resources',
      'They increase application performance',
      'They reduce costs automatically'
    ],
    correct_answer: 'They organize and manage related Azure resources',
    explanation: 'Resource Groups are logical containers that help organize and manage related Azure resources together.',
    category: 'Resource Management',
    difficulty: 'easy',
    exam_type: 'AZ-900'
  }
];