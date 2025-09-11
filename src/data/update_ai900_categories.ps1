# AI-900 Category Mapping Script
# This script will update AI-900 questions to have proper exam domain categories

# Official AI-900 Exam Domains:
# 1. Describe Artificial Intelligence workloads and considerations (15-20%)
# 2. Describe fundamental principles of machine learning on Azure (30-35%)  
# 3. Describe features of computer vision workloads on Azure (15-20%)
# 4. Describe features of Natural Language Processing workloads on Azure (15-20%)
# 5. Describe features of conversational AI workloads on Azure (15-20%)

$content = Get-Content "questions.ts" -Raw

# Define category mappings based on question content
$categoryMappings = @{
    # Computer Vision related
    "Custom Vision|computer vision|image|face|vision|visual|object detection|image classification|Face API|OCR|optical character" = "Computer Vision Workloads"
    
    # Natural Language Processing 
    "Text Analytics|sentiment|language|translation|text analysis|NLP|natural language|translator|text processing|text classification" = "Natural Language Processing Workloads"
    
    # Machine Learning Fundamentals
    "machine learning|supervised|unsupervised|regression|classification|clustering|ML|model training|prediction|algorithms" = "Machine Learning Fundamentals"
    
    # Conversational AI
    "bot|chatbot|conversation|QnA|Bot Service|virtual assistant|conversational" = "Conversational AI Workloads"
    
    # AI Workloads & Considerations
    "responsible AI|ethics|bias|fairness|transparency|accountability|privacy|security|AI principles|workload" = "AI Workloads and Considerations"
    
    # Speech Services
    "speech|audio|voice|spoken|Speech-to-Text|speech recognition" = "Speech Services"
    
    # Knowledge Mining
    "search|knowledge mining|cognitive search|document|form recognizer|knowledge" = "Knowledge Mining"
}

Write-Host "AI-900 Category Update Mapping:"
foreach ($pattern in $categoryMappings.Keys) {
    Write-Host "Pattern: $pattern -> Category: $($categoryMappings[$pattern])"
}

Write-Host "`nTo apply these mappings, we need to analyze each question and update the category based on its content."
