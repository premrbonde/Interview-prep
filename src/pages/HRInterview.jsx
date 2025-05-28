// src/pages/HRInterview.jsx
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { callGeminiAPI } from '../utils/api';
import { jsPDF } from 'jspdf';
const TechnicalStyles = `/* HR Interview Page Styles - Combines Technical Base with HR Enhancements */
:root {
  /* Base Technical Colors */
  --bg-light: #f9fafb;
  --bg-dark: #111827;
  --text-light: #111827;
  --text-dark: #f3f4f6;
  --primary-light: #2563eb;
  --primary-dark: #60a5fa;
  --card-light: #ffffff;
  --card-dark: #1f2937;
  --border-light: #e5e7eb;
  --border-dark: #374151;
  --success-light: #10b981;
  --success-dark: #34d399;
  --error-light: #ef4444;
  --error-dark: #f87171;
  --warning-light: #f59e0b;
  --warning-dark: #fbbf24;
  
  /* HR-Specific Colors */
  --behavioral-light: #8b5cf6;
  --behavioral-dark: #a78bfa;
  --situational-light: #10b981;
  --situational-dark: #34d399;
  --company-light: #ec4899;
  --company-dark: #f472b6;
  --general-light: #3b82f6;
  --general-dark: #60a5fa;
}
.fade-in {
  animation: fadeIn 0.2s ease-in forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
#hr-interview-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
  animation: fadeInUp 0.8s ease forwards 0.2s;
}

/* Card Styles */
#hr-interview-page .card {
  background-color: var(--card-light);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.dark #hr-interview-page .card {
  background-color: var(--card-dark);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

#hr-interview-page .card-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--primary-light);
  text-align: center;
}

.dark #hr-interview-page .card-title {
  color: var(--primary-dark);
}

/* Form Elements */
#hr-interview-page .form-control {
  width: 96%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border-light);
  background-color: var(--card-light);
  color: var(--text-light);
  font-family: inherit;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.dark #hr-interview-page .form-control {
  border-color: var(--border-dark);
  background-color: var(--card-dark);
  color: var(--text-dark);
}

#hr-interview-page .form-control:focus {
  outline: none;
  border-color: var(--primary-light);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}

.dark #hr-interview-page .form-control:focus {
  border-color: var(--primary-dark);
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2);
}

#hr-interview-page .form-select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
}

/* Buttons */
#hr-interview-page .btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  text-decoration: none;
}

#hr-interview-page .btn-primary {
  background-color: var(--primary-light);
  color: white;
}

.dark #hr-interview-page .btn-primary {
  background-color: var(--primary-dark);
}

#hr-interview-page .btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

#hr-interview-page .btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

#hr-interview-page .btn-secondary {
  background-color: var(--card-light);
  color: var(--text-light);
  border: 1px solid var(--border-light);
}

.dark #hr-interview-page .btn-secondary {
  background-color: var(--card-dark);
  color: var(--text-dark);
  border: 1px solid var(--border-dark);
}

/* Question Cards */
#hr-interview-page .question-card {
  background-color: var(--card-light);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-left: 4px solid var(--primary-light);
  transition: all 0.3s ease;
  animation: fadeIn 0.5s ease forwards;
}

.dark #hr-interview-page .question-card {
  background-color: var(--card-dark);
  border-left-color: var(--primary-dark);
}

#hr-interview-page .question-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.dark #hr-interview-page .question-card:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

#hr-interview-page .question-text {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-light);
  line-height: 1.5;
}

.dark #hr-interview-page .question-text {
  color: var(--text-dark);
}

#hr-interview-page .question-meta {
  font-size: 0.85rem;
  opacity: 0.7;
}

/* Answer Input */
#hr-interview-page .answer-input {
  width: 98%;
  min-height: 150px;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border-light);
  background-color: var(--card-light);
  color: var(--text-light);
  font-family: inherit;
  font-size: 0.95rem;
  line-height: 1.6;
  resize: vertical;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.dark #hr-interview-page .answer-input {
  border-color: var(--border-dark);
  background-color: var(--card-dark);
  color: var(--text-dark);
}

#hr-interview-page .answer-input:focus {
  outline: none;
  border-color: var(--primary-light);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}

.dark #hr-interview-page .answer-input:focus {
  border-color: var(--primary-dark);
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2);
}

/* Feedback Section */
#hr-interview-page .feedback-card {
  background-color: var(--card-light);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-top: 2rem;
  border-left: 4px solid var(--success-light);
  transition: all 0.3s ease;
}

.dark #hr-interview-page .feedback-card {
  background-color: var(--card-dark);
  border-left-color: var(--success-dark);
}

#hr-interview-page .feedback-score {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--success-light);
  text-align: center;
}

.dark #hr-interview-page .feedback-score {
  color: var(--success-dark);
}

#hr-interview-page .feedback-text {
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 500;
  font-size: 1.1rem;
}

#hr-interview-page .feedback-section {
  margin-bottom: 1.5rem;
}

#hr-interview-page .feedback-section-title {
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-light);
  font-size: 1.2rem;
}

.dark #hr-interview-page .feedback-section-title {
  color: var(--primary-dark);
}

/* Answer Display */
#hr-interview-page .answer-display {
  background-color: rgba(0, 0, 0, 0.05);
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin: 0.5rem 0;
  white-space: pre-wrap;
  line-height: 1.6;
}

.dark #hr-interview-page .answer-display {
  background-color: rgba(255, 255, 255, 0.05);
}

/* Category-specific colors */
#hr-interview-page .question-card[data-category="General"] {
  border-left-color: var(--general-light);
}
.dark #hr-interview-page .question-card[data-category="General"] {
  border-left-color: var(--general-dark);
}

#hr-interview-page .question-card[data-category="Behavioral"] {
  border-left-color: var(--behavioral-light);
}
.dark #hr-interview-page .question-card[data-category="Behavioral"] {
  border-left-color: var(--behavioral-dark);
}

#hr-interview-page .question-card[data-category="Situational"] {
  border-left-color: var(--situational-light);
}
.dark #hr-interview-page .question-card[data-category="Situational"] {
  border-left-color: var(--situational-dark);
}

#hr-interview-page .question-card[data-category="Company Specific"] {
  border-left-color: var(--company-light);
}
.dark #hr-interview-page .question-card[data-category="Company Specific"] {
  border-left-color: var(--company-dark);
}

/* Improvement Suggestions */
#hr-interview-page .improvement-box {
  background-color: rgba(96, 165, 250, 0.1);
  border-radius: 0.5rem;
  padding: 0.75rem;
  margin-top: 0.5rem;
}

.dark #hr-interview-page .improvement-box {
  background-color: rgba(96, 165, 250, 0.2);
}

/* STAR Method */
#hr-interview-page .star-method {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin: 1rem 0;
}

#hr-interview-page .star-method-item {
  padding: 0.5rem;
  text-align: center;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.85rem;
}

#hr-interview-page .star-method-item:nth-child(1) {
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--error-light);
}
#hr-interview-page .star-method-item:nth-child(2) {
  background-color: rgba(245, 158, 11, 0.1);
  color: var(--warning-light);
}
#hr-interview-page .star-method-item:nth-child(3) {
  background-color: rgba(16, 185, 129, 0.1);
  color: var(--success-light);
}
#hr-interview-page .star-method-item:nth-child(4) {
  background-color: rgba(59, 130, 246, 0.1);
  color: var(--primary-light);
}

.dark #hr-interview-page .star-method-item {
  opacity: 0.9;
}

/* Utility Classes */
#hr-interview-page .text-green-600 {
  color: var(--success-light);
}
.dark #hr-interview-page .text-green-600 {
  color: var(--success-dark);
}

#hr-interview-page .text-red-600 {
  color: var(--error-light);
}
.dark #hr-interview-page .text-red-600 {
  color: var(--error-dark);
}

#hr-interview-page .text-blue-500 {
  color: var(--primary-light);
}
.dark #hr-interview-page .text-blue-500 {
  color: var(--primary-dark);
}

#hr-interview-page .flex {
  display: flex;
}
#hr-interview-page .flex-col {
  flex-direction: column;
}
#hr-interview-page .md\:flex-row {
  flex-direction: row;
}
#hr-interview-page .justify-between {
  justify-content: space-between;
}
#hr-interview-page .justify-end {
  justify-content: flex-end;
}
#hr-interview-page .items-center {
  align-items: center;
}
#hr-interview-page .gap-4 {
  gap: 1rem;
}
#hr-interview-page .space-y-6 > * + * {
  margin-top: 1.5rem;
}

/* Spinner */
#hr-interview-page .spinner {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: currentColor;
  animation: spin 1s linear infinite;
  margin-right: 0.5rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  #hr-interview-page {
    padding: 1rem 0.5rem;
  }
  
  #hr-interview-page .question-card {
    padding: 1rem;
  }
  
  #hr-interview-page .feedback-card {
    padding: 1rem;
  }
  
  #hr-interview-page .answer-input {
    min-height: 120px;
  }
  
  #hr-interview-page .card-title {
    font-size: 1.3rem;
  }
  
  #hr-interview-page .star-method {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  #hr-interview-page .flex-col,
  #hr-interview-page .md\:flex-row {
    flex-direction: column;
  }
}`
export default function HRInterview() {
  const { t } = useLanguage();
  const [category, setCategory] = useState('Behavioral');
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  const generateQuestions = async () => {
    setIsLoading(true);
    setError('');
    try {
      const fullTopic = topic ? `${category} (${topic})` : category;
      const prompt = `Generate 5 HR interview questions about ${fullTopic}.
        Include a mix of common and challenging questions.
        Format each question exactly as follows:
        
        Question: [question text]
        Expected Answer: [detailed expected answer]
        
        ---`;
      
      const response = await callGeminiAPI(prompt, 'questions');
      const parsedQuestions = parseQuestions(response);
      setQuestions(parsedQuestions);
      setAnswers(Array(parsedQuestions.length).fill(''));
      setFeedback([]);
      setShowFeedback(false);
    } catch (err) {
      setError(t('Failed to generate questions. Please try again.'));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const parseQuestions = (text) => {
    const questionBlocks = text.split('---').filter(block => block.trim() !== '');
    return questionBlocks.map((block, index) => {
      const lines = block.split('\n').filter(line => line.trim() !== '');
      if (lines.length < 2) return null;
      
      const question = {
        id: `hr-${Date.now()}-${index}`,
        question: lines[0].replace('Question:', '').trim(),
        correctAnswer: '',
        category,
        topic: topic || category
      };

      const answerLines = [];
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].startsWith('Expected Answer:')) {
          answerLines.push(lines[i].replace('Expected Answer:', '').trim());
        } else {
          answerLines.push(lines[i].trim());
        }
      }
      question.correctAnswer = answerLines.join('\n');

      return question;
    }).filter(q => q !== null);
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const submitAnswers = async () => {
    setIsLoading(true);
    try {
      const newFeedback = [];
      let totalScore = 0;

      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const userAnswer = answers[i];

        const prompt = `Evaluate this HR interview answer on a scale of 1-10:
          Question: ${question.question}
          Expected Answer: ${question.correctAnswer}
          User Answer: ${userAnswer || t('No answer provided')}
          
          Provide feedback in this format:
          Score: [score]/10
          Feedback: [2-3 line feedback]
          Improvement Suggestions: [2-3 suggestions]`;

        const response = await callGeminiAPI(prompt, 'feedback');
        const parsedFeedback = parseFeedback(response);
        newFeedback.push(parsedFeedback);
        totalScore += parsedFeedback.score;
      }

      setFeedback(newFeedback);
      setShowFeedback(true);
    } catch (err) {
      setError(t('Failed to evaluate answers. Please try again.'));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const parseFeedback = (text) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const feedback = {
      score: 0,
      feedback: '',
      improvementSuggestions: ''
    };

    let currentSection = '';
    lines.forEach(line => {
      if (line.startsWith('Score:')) {
        feedback.score = parseInt(line.match(/\d+/)?.[0] || 0);
      } else if (line.startsWith('Feedback:')) {
        currentSection = 'feedback';
        feedback.feedback = line.replace('Feedback:', '').trim();
      } else if (line.startsWith('Improvement Suggestions:')) {
        currentSection = 'improvementSuggestions';
        feedback.improvementSuggestions = line.replace('Improvement Suggestions:', '').trim();
      } else {
        if (currentSection === 'feedback') {
          feedback.feedback += '\n' + line.trim();
        } else if (currentSection === 'improvementSuggestions') {
          feedback.improvementSuggestions += '\n' + line.trim();
        }
      }
    });

    return feedback;
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setProperties({
      title: `HR Interview Questions - ${category}`,
      subject: 'HR Interview Practice',
      author: 'Interview Prep App'
    });

    doc.setFontSize(18);
    doc.text(`HR Interview Questions: ${category}${topic ? ` (${topic})` : ''}`, 105, 15, { align: 'center' });
    doc.setFontSize(10);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 105, 22, { align: 'center' });

    let yPosition = 30;
    const margin = 15;
    const maxWidth = doc.internal.pageSize.getWidth() - margin * 2;

    questions.forEach((q, i) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      const questionLines = doc.splitTextToSize(`${i+1}. ${q.question}`, maxWidth);
      doc.text(questionLines, margin, yPosition);
      yPosition += questionLines.length * 7;

      doc.setFont(undefined, 'normal');
      const answerLines = doc.splitTextToSize(
        `Your answer: ${answers[i] || t('No answer')}`,
        maxWidth - 10
      );
      doc.text(answerLines, margin + 5, yPosition);
      yPosition += answerLines.length * 7;

      if (showFeedback && feedback[i]) {
        doc.setFont(undefined, 'italic');
        doc.setTextColor(0, 100, 0);
        const feedbackText = doc.splitTextToSize(
          `Score: ${feedback[i].score}/10\n` +
          `Feedback: ${feedback[i].feedback}\n` +
          `Improvement Suggestions: ${feedback[i].improvementSuggestions}\n` +
          `Expected Answer: ${q.correctAnswer}`,
          maxWidth - 10
        );
        doc.text(feedbackText, margin + 5, yPosition);
        doc.setTextColor(0, 0, 0);
        yPosition += feedbackText.length * 7;
      }

      yPosition += 10;
    });

    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(150);
      doc.text(`Page ${i} of ${pageCount}`, 105, 287, { align: 'center' });
    }

    doc.save(`hr-questions-${new Date().toISOString().slice(0,10)}.pdf`);
  };

  return (
    <><style dangerouslySetInnerHTML={{ __html: TechnicalStyles }} />
    <div id="hr-interview-page" className="page fade-in">
      <div className="card">
        <h1 className="card-title">{t('HR Interview Preparation')}</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <select 
            id="hr-category" 
            className="form-control form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="General">{t('General HR')}</option>
            <option value="Behavioral">{t('Behavioral')}</option>
            <option value="Situational">{t('Situational')}</option>
            <option value="Company Specific">{t('Company Specific')}</option>
          </select>
          
          <input 
            type="text" 
            id="hr-topic" 
            className="form-control"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={t('Enter specific focus area...')}
          />
          
          <button 
            id="generate-hr-questions" 
            className="btn btn-primary"
            onClick={generateQuestions}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="spinner"></span>
            ) : (
              t('Generate Questions')
            )}
          </button>
        </div>
      </div>
    
      {error && <div className="text-red-500 mb-4">{error}</div>}
    
      {questions.length > 0 && (
        <div id="hr-questions-container">
          <div id="hr-questions-list" className="space-y-6">
            {questions.map((question, index) => (
              <div key={question.id} className="question-card">
                <div className="question-header">
                  <h3 className="question-text">
                    {t('Question')} {index + 1}: {question.question}
                  </h3>
                </div>

                <div className="input-group mt-4">
                  <textarea 
                    className="answer-input w-full"
                    value={answers[index] || ''}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    placeholder={t('Enter your answer...')}
                    rows="5"
                  />
                </div>

                <div className="question-meta mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {question.category} • {question.topic}
                </div>
              </div>
            ))}
          </div>
          
          <button 
            id="submit-all-hr-answers" 
            className="btn btn-primary w-full mt-6"
            onClick={submitAnswers}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="spinner"></span>
            ) : (
              t('Submit All Answers')
            )}
          </button>
          
          {showFeedback && (
            <div id="hr-overall-feedback" className="feedback-card mt-6">
              <div className="feedback-score">
                {t('Overall Score')}: {Math.round(
                  feedback.reduce((sum, fb) => sum + fb.score, 0) / questions.length
                )}/10
              </div>
              <div className="feedback-text">
                {feedback[0]?.score >= 8 ? t('Excellent! Your answers demonstrate strong communication skills and preparation.') :
                 feedback[0]?.score >= 5 ? t('Good job! You have solid answers but could improve in some areas.') :
                 t('Keep practicing! Review the feedback to improve your interview skills.')}
              </div>
              
              <div className="feedback-section mt-6">
                <div className="feedback-section-title">
                  <i className="fas fa-lightbulb text-blue-500"></i>
                  <span>{t('Detailed Feedback')}</span>
                </div>

                {questions.map((question, index) => (
                  <div key={index} className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="font-semibold">
                      {t('Question')} {index + 1}: {question.question}
                    </p>
                    <div className="answer-display mt-2">
                      {t('Your answer')}: {answers[index] || t('No answer provided')}
                    </div>
                    <p className={`mt-1 text-sm ${
                      feedback[index].score > 5 ? 
                      'text-green-600 dark:text-green-400' : 
                      'text-red-600 dark:text-red-400'
                    }`}>
                      {t('Score')}: {feedback[index].score}/10
                    </p>
                    <p className="mt-1">{feedback[index].feedback}</p>
                    {feedback[index].improvementSuggestions && (
                      <div className="mt-2 p-2 bg-blue-50 dark:bg-gray-800 rounded">
                        <p className="text-sm font-semibold">{t('Improvement Suggestions')}:</p>
                        <p>{feedback[index].improvementSuggestions}</p>
                      </div>
                    )}
                    <div className="mt-2 p-2 bg-green-50 dark:bg-gray-800 rounded">
                      <p className="text-sm font-semibold">{t('Expected Answer')}:</p>
                      <p>{question.correctAnswer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showFeedback && (
            <div className="flex justify-end gap-4 mt-6">
              <button 
                className="btn btn-secondary export-pdf"
                onClick={exportToPDF}
              >
                <i className="fas fa-file-pdf mr-2"></i> 
                <span>{t('Export to PDF')}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div></>
  );
}