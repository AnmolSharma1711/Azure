# Comprehensive AI-900 Category Update Script
# Updates AI-900 questions from generic "AI Fundamentals" to specific exam domain categories

$questionsFile = "questions.ts"
$content = Get-Content $questionsFile -Raw

# AI-900 Exam Domain Categories (Official)
# 1. AI Workloads and Considerations (15-20%)
# 2. Machine Learning Fundamentals (30-35%)
# 3. Computer Vision Workloads (15-20%)
# 4. Natural Language Processing Workloads (15-20%)
# 5. Conversational AI Workloads (15-20%)

Write-Host "🔄 Updating AI-900 question categories..."

# Computer Vision Workloads
$content = $content -replace `
    '(?s)(id: ''[^'']*'',\s*question: ''[^'']*(?:Custom Vision|computer vision|image|face|vision|visual|object detection|image classification|Face API|OCR|optical character|MRI|X-ray|photo|camera|detect|identify.*image)[^'']*'',[\s\S]*?)category: ''AI Fundamentals''', `
    '$1category: ''Computer Vision Workloads'''

# Natural Language Processing Workloads  
$content = $content -replace `
    '(?s)(id: ''[^'']*'',\s*question: ''[^'']*(?:Text Analytics|sentiment|language|translation|text analysis|NLP|natural language|translator|text processing|text classification|reviews|CVs|documents|emails)[^'']*'',[\s\S]*?)category: ''AI Fundamentals''', `
    '$1category: ''Natural Language Processing Workloads'''

# Machine Learning Fundamentals
$content = $content -replace `
    '(?s)(id: ''[^'']*'',\s*question: ''[^'']*(?:machine learning|supervised|unsupervised|regression|classification|clustering|ML|model training|prediction|algorithms|fraud|patterns|recommend|forecast)[^'']*'',[\s\S]*?)category: ''AI Fundamentals''', `
    '$1category: ''Machine Learning Fundamentals'''

# Conversational AI Workloads
$content = $content -replace `
    '(?s)(id: ''[^'']*'',\s*question: ''[^'']*(?:bot|chatbot|conversation|QnA|Bot Service|virtual assistant|conversational)[^'']*'',[\s\S]*?)category: ''AI Fundamentals''', `
    '$1category: ''Conversational AI Workloads'''

# AI Workloads and Considerations (Responsible AI)
$content = $content -replace `
    '(?s)(id: ''[^'']*'',\s*question: ''[^'']*(?:responsible AI|ethics|bias|fairness|transparency|accountability|privacy|security|AI principles|workload|principle)[^'']*'',[\s\S]*?)category: ''AI Fundamentals''', `
    '$1category: ''AI Workloads and Considerations'''

# Speech Services  
$content = $content -replace `
    '(?s)(id: ''[^'']*'',\s*question: ''[^'']*(?:speech|audio|voice|spoken|Speech-to-Text|speech recognition|transcription)[^'']*'',[\s\S]*?)category: ''AI Fundamentals''', `
    '$1category: ''Speech Services'''

# Knowledge Mining
$content = $content -replace `
    '(?s)(id: ''[^'']*'',\s*question: ''[^'']*(?:search|knowledge mining|cognitive search|document|form recognizer|knowledge|legal documents|summarize)[^'']*'',[\s\S]*?)category: ''AI Fundamentals''', `
    '$1category: ''Knowledge Mining'''

# Save updated content
$content | Set-Content $questionsFile

Write-Host "✅ Updated AI-900 question categories successfully!"
Write-Host "📊 Verifying categories..."

# Count updated categories
$updatedContent = Get-Content $questionsFile -Raw
$aiWorkloads = ($updatedContent | Select-String -Pattern "category: 'AI Workloads and Considerations'" -AllMatches).Matches.Count
$mlFundamentals = ($updatedContent | Select-String -Pattern "category: 'Machine Learning Fundamentals'" -AllMatches).Matches.Count  
$computerVision = ($updatedContent | Select-String -Pattern "category: 'Computer Vision Workloads'" -AllMatches).Matches.Count
$nlpWorkloads = ($updatedContent | Select-String -Pattern "category: 'Natural Language Processing Workloads'" -AllMatches).Matches.Count
$conversationalAI = ($updatedContent | Select-String -Pattern "category: 'Conversational AI Workloads'" -AllMatches).Matches.Count
$speechServices = ($updatedContent | Select-String -Pattern "category: 'Speech Services'" -AllMatches).Matches.Count
$knowledgeMining = ($updatedContent | Select-String -Pattern "category: 'Knowledge Mining'" -AllMatches).Matches.Count
$remaining = ($updatedContent | Select-String -Pattern "category: 'AI Fundamentals'" -AllMatches).Matches.Count

Write-Host "📈 Updated Category Distribution:"
Write-Host "  • AI Workloads and Considerations: $aiWorkloads"
Write-Host "  • Machine Learning Fundamentals: $mlFundamentals"
Write-Host "  • Computer Vision Workloads: $computerVision"
Write-Host "  • Natural Language Processing Workloads: $nlpWorkloads"
Write-Host "  • Conversational AI Workloads: $conversationalAI"  
Write-Host "  • Speech Services: $speechServices"
Write-Host "  • Knowledge Mining: $knowledgeMining"
Write-Host "  • Remaining 'AI Fundamentals': $remaining"
