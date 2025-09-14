import { Question } from '../types/quiz';

export const dragDropQuestions: Question[] = [
  {
    id: 'az900_dd_1',
    question: 'Arrange the steps to deploy an application to Azure in the correct order:',
    type: 'drag-drop',
    options: [
      'Create Azure resource group',
      'Configure application settings',
      'Deploy application code',
      'Test the deployed application'
    ],
    correct_answer: [
      'Create Azure resource group',
      'Configure application settings',
      'Deploy application code',
      'Test the deployed application'
    ],
    explanation: 'The correct deployment order ensures proper resource organization and configuration before deployment.',
    category: 'Deployment',
    difficulty: 'medium',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_dd_2',
    question: 'Arrange the Azure security layers from outermost to innermost:',
    type: 'drag-drop',
    options: [
      'Physical security',
      'Identity and access',
      'Perimeter security',
      'Network security',
      'Compute security',
      'Application security',
      'Data security'
    ],
    correct_answer: [
      'Physical security',
      'Identity and access',
      'Perimeter security',
      'Network security',
      'Compute security',
      'Application security',
      'Data security'
    ],
    explanation: 'Azure security follows a defense-in-depth approach with multiple layers of protection.',
    category: 'Security',
    difficulty: 'hard',
    exam_type: 'AZ-900'
  },
  {
    id: 'az900_dd_3',
    question: 'Order the steps to create a virtual machine in Azure:',
    type: 'drag-drop',
    options: [
      'Select VM size and configuration',
      'Create or select resource group',
      'Configure networking settings',
      'Choose operating system image',
      'Set administrator credentials',
      'Review and create VM'
    ],
    correct_answer: [
      'Create or select resource group',
      'Choose operating system image',
      'Select VM size and configuration',
      'Configure networking settings',
      'Set administrator credentials',
      'Review and create VM'
    ],
    explanation: 'VM creation follows a logical sequence from basic setup to final configuration.',
    category: 'Compute Services',
    difficulty: 'medium',
    exam_type: 'AZ-900'
  },
  {
    id: 'ai900_dd_1',
    question: 'Arrange the machine learning workflow steps in the correct order:',
    type: 'drag-drop',
    options: [
      'Data collection',
      'Data preprocessing',
      'Model training',
      'Model evaluation',
      'Model deployment',
      'Model monitoring'
    ],
    correct_answer: [
      'Data collection',
      'Data preprocessing',
      'Model training',
      'Model evaluation',
      'Model deployment',
      'Model monitoring'
    ],
    explanation: 'The ML workflow follows a systematic approach from data to production monitoring.',
    category: 'Machine Learning Fundamentals',
    difficulty: 'medium',
    exam_type: 'AI-900'
  },
  {
    id: 'ai900_dd_2',
    question: 'Order the steps to implement a computer vision solution:',
    type: 'drag-drop',
    options: [
      'Collect and label training images',
      'Choose appropriate AI service',
      'Train the model',
      'Test model accuracy',
      'Deploy to production',
      'Monitor performance'
    ],
    correct_answer: [
      'Choose appropriate AI service',
      'Collect and label training images',
      'Train the model',
      'Test model accuracy',
      'Deploy to production',
      'Monitor performance'
    ],
    explanation: 'Computer vision implementation requires careful planning and systematic execution.',
  category: 'Computer Vision Workloads',
    difficulty: 'medium',
    exam_type: 'AI-900'
  },
  {
    id: 'ai900_dd_3',
    question: 'Arrange the Natural Language Processing pipeline steps:',
    type: 'drag-drop',
    options: [
      'Text tokenization',
      'Text preprocessing',
      'Feature extraction',
      'Model application',
      'Result interpretation',
      'Raw text input'
    ],
    correct_answer: [
      'Raw text input',
      'Text preprocessing',
      'Text tokenization',
      'Feature extraction',
      'Model application',
      'Result interpretation'
    ],
    explanation: 'NLP processing follows a structured pipeline from raw text to meaningful insights.',
  category: 'Natural Language Processing Workloads',
    difficulty: 'medium',
    exam_type: 'AI-900'
  },
  {
    id: 'ai900_dd_4',
    question: 'Order the steps for implementing Responsible AI practices:',
    type: 'drag-drop',
    options: [
      'Identify potential biases',
      'Define AI ethics guidelines',
      'Implement fairness measures',
      'Test for transparency',
      'Monitor model behavior',
      'Document decisions'
    ],
    correct_answer: [
      'Define AI ethics guidelines',
      'Identify potential biases',
      'Implement fairness measures',
      'Test for transparency',
      'Document decisions',
      'Monitor model behavior'
    ],
    explanation: 'Responsible AI requires proactive planning and continuous monitoring.',
  category: 'AI Workloads and Considerations',
    difficulty: 'hard',
    exam_type: 'AI-900'
  },
  {
    id: 'az900_dd_4',
    question: 'Arrange the Azure cost optimization steps in priority order:',
    type: 'drag-drop',
    options: [
      'Monitor resource usage',
      'Right-size resources',
      'Implement automation',
      'Use reserved instances',
      'Remove unused resources',
      'Set up cost alerts'
    ],
    correct_answer: [
      'Monitor resource usage',
      'Set up cost alerts',
      'Remove unused resources',
      'Right-size resources',
      'Use reserved instances',
      'Implement automation'
    ],
    explanation: 'Cost optimization starts with visibility and progresses to advanced optimization techniques.',
    category: 'Cost Management',
    difficulty: 'medium',
    exam_type: 'AZ-900'
  },
  {
    id: 'ai900_tf_1',
    question: 'Evaluate the following statements about Azure Cognitive Services:',
    type: 'true-false-table',
    options: [
      'Azure Cognitive Services provides pre-built AI models that can be used without machine learning expertise',
      'Custom Vision requires you to write code for image classification',
      'Text Analytics API can detect sentiment in text',
      'Speech Service only supports English language',
      'Form Recognizer can extract data from structured documents like invoices'
    ],
    correct_answer: JSON.stringify({
      "0": true,   // Azure Cognitive Services provides pre-built AI models - TRUE
      "1": false,  // Custom Vision requires you to write code - FALSE (it's no-code)
      "2": true,   // Text Analytics can detect sentiment - TRUE
      "3": false,  // Speech Service only supports English - FALSE (supports many languages)
      "4": true    // Form Recognizer can extract data from documents - TRUE
    }),
    explanation: 'Azure Cognitive Services are designed to be easy-to-use pre-built AI capabilities. Custom Vision is a no-code solution, Text Analytics includes sentiment analysis, Speech Service supports multiple languages, and Form Recognizer excels at document data extraction.',
    category: 'AI Services',
    difficulty: 'medium',
    exam_type: 'AI-900'
  },
  {
    id: 'az900_tf_1',
    question: 'Evaluate the following statements about Azure Storage Services:',
    type: 'true-false-table',
    options: [
      'Azure Blob Storage is optimized for storing large amounts of unstructured data',
      'Azure File Storage cannot be accessed via SMB protocol',
      'Table Storage is a NoSQL key-value store',
      'Queue Storage is used for storing relational data',
      'Disk Storage provides persistent storage for Azure Virtual Machines'
    ],
    correct_answer: JSON.stringify({
      "0": true,   // Blob Storage for unstructured data - TRUE
      "1": false,  // File Storage cannot use SMB - FALSE (it supports SMB)
      "2": true,   // Table Storage is NoSQL - TRUE
      "3": false,  // Queue Storage for relational data - FALSE (it's for messaging)
      "4": true    // Disk Storage for VMs - TRUE
    }),
    explanation: 'Azure Blob Storage handles unstructured data like images and documents. File Storage supports SMB protocol for network file shares. Table Storage is indeed a NoSQL service. Queue Storage is for message queuing, not relational data. Disk Storage provides persistent disks for VMs.',
    category: 'Storage Services',
    difficulty: 'medium',
    exam_type: 'AZ-900'
  }
];
