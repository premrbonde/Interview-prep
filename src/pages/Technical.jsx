// src/pages/Technical.jsx
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { callGeminiAPI } from '../utils/api';
import { jsPDF } from 'jspdf';
const TechnicalStyles = `/* Technical Page Specific Styles */
:root {
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
    --code-bg-light: #f3f4f6;
    --code-bg-dark: #1f2937;
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
#technical-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

#technical-page .card {
  background-color: var(--card-light);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.dark #technical-page .card {
  background-color: var(--card-dark);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

#technical-page .card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.dark #technical-page .card:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

/* Form Layout */
.flex-col {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .md\:flex-row {
    flex-direction: row;
  }
}

/* Form Elements */
.form-control {
  width: 96%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border-light);
  background-color: var(--card-light);
  color: var(--text-light);
  font-family: inherit;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.dark .form-control {
  border-color: var(--border-dark);
  background-color: var(--card-dark);
  color: var(--text-dark);
}

.form-control:focus {
  outline: none;
  border-color: var(--primary-light);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}

.dark .form-control:focus {
  border-color: var(--primary-dark);
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2);
}

.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
}

/* Buttons */
.btn {
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

.btn-primary {
  background-color: var(--primary-light);
  color: white;
}

.dark .btn-primary {
  background-color: var(--primary-dark);
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.btn-secondary {
  background-color: var(--card-light);
  color: var(--text-light);
  border: 1px solid var(--border-light);
}

.dark .btn-secondary {
  background-color: var(--card-dark);
  color: var(--text-dark);
  border: 1px solid var(--border-dark);
}

.btn-secondary:hover {
  background-color: rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}

.dark .btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.w-full {
  width: 100%;
}

/* Question Cards */
.question-card {
  background-color: var(--card-light);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-left: 4px solid var(--primary-light);
  transition: all 0.3s ease;
}

.dark .question-card {
  background-color: var(--card-dark);
  border-left-color: var(--primary-dark);
}

.question-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.dark .question-card:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.question-text {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-light);
}

.dark .question-text {
  color: var(--text-dark);
}

.question-meta {
  font-size: 0.85rem;
  opacity: 0.7;
}

/* Answer Input - Larger for technical answers */
.answer-input {
  width: 98%;
  min-height: 150px;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border-light);
  background-color: var(--card-light);
  color: var(--text-light);
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  resize: vertical;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.dark .answer-input {
  border-color: var(--border-dark);
  background-color: var(--card-dark);
  color: var(--text-dark);
}

.answer-input:focus {
  outline: none;
  border-color: var(--primary-light);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}

.dark .answer-input:focus {
  border-color: var(--primary-dark);
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2);
}

/* Code Block Styling */
.code-block {
  background-color: var(--code-bg-light);
  border-radius: 0.5rem;
  padding: 1rem;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.85rem;
  line-height: 1.5;
  overflow-x: auto;
  margin: 0.5rem 0;
}

.dark .code-block {
  background-color: var(--code-bg-dark);
}

/* Feedback Section */
.feedback-card {
  background-color: var(--card-light);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-top: 2rem;
  border-left: 4px solid var(--success-light);
  transition: all 0.3s ease;
}

.dark .feedback-card {
  background-color: var(--card-dark);
  border-left-color: var(--success-dark);
}

.feedback-score {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--success-light);
  text-align: center;
}

.dark .feedback-score {
  color: var(--success-dark);
}

.feedback-text {
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.feedback-section {
  margin-bottom: 1.5rem;
}

.feedback-section-title {
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-light);
}

.dark .feedback-section-title {
  color: var(--primary-dark);
}

/* Question-wise Feedback */
.question-wise-feedback {
  background-color: rgba(0, 0, 0, 0.03);
  border-radius: 0.75rem;
  padding: 1.25rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.dark .question-wise-feedback {
  background-color: rgba(255, 255, 255, 0.03);
}

.answer-display {
  background-color: rgba(0, 0, 0, 0.05);
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin: 0.5rem 0;
  white-space: pre-wrap;
}

.dark .answer-display {
  background-color: rgba(255, 255, 255, 0.05);
}

.text-green-600 {
  color: var(--success-light);
}

.dark .text-green-600 {
  color: var(--success-dark);
}

.text-red-600 {
  color: var(--error-light);
}

.dark .text-red-600 {
  color: var(--error-dark);
}

.text-blue-500 {
  color: var(--primary-light);
}

.dark .text-blue-500 {
  color: var(--primary-dark);
}

/* Spinner */
.spinner {
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

/* Utility Classes */
.space-y-6 > * + * {
  margin-top: 1.5rem;
}

.mt-1 { margin-top: 0.25rem; }
.mt-2 { margin-top: 0.5rem; }
.mt-3 { margin-top: 0.75rem; }
.mt-4 { margin-top: 1rem; }
.mt-5 { margin-top: 1.25rem; }
.mt-6 { margin-top: 1.5rem; }

.mb-1 { margin-bottom: 0.25rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-3 { margin-bottom: 0.75rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-5 { margin-bottom: 1.25rem; }
.mb-6 { margin-bottom: 1.5rem; }

.text-sm { font-size: 0.875rem; }
.text-red-500 { color: var(--error-light); }
.dark .text-red-500 { color: var(--error-dark); }

.flex { display: flex; }
.justify-between { justify-content: space-between; }
.justify-end { justify-content: flex-end; }
.items-center { align-items: center; }
.gap-4 { gap: 1rem; }

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.question-card {
  animation: fadeIn 0.5s ease forwards;
}

/* Responsive Adjustments */
@media (max-width: 640px) {
  #technical-page {
    padding: 1rem 0.5rem;
  }
  
  .question-card {
    padding: 1rem;
  }
  
  .feedback-card {
    padding: 1rem;
  }
  
  .answer-input {
    min-height: 120px;
  }
}

/* Enhanced PDF Export Button */
.export-pdf {
  position: relative;
  overflow: hidden;
}

.export-pdf::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0)
  );
  transform: rotate(30deg);
  transition: all 0.3s ease;
}

.export-pdf:hover::after {
  left: 100%;
}

.dark .export-pdf::after {
  background: linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0)
  );
}

/* Category-specific colors */
#technical-page .question-card[data-category="Programming"] {
  border-left-color: #3b82f6;
}

#technical-page .question-card[data-category="System Design"] {
  border-left-color: #8b5cf6;
}

#technical-page .question-card[data-category="Data Structures"] {
  border-left-color: #10b981;
}

#technical-page .question-card[data-category="Algorithms"] {
  border-left-color: #ef4444;
}

#technical-page .question-card[data-category="Database"] {
  border-left-color: #f59e0b;
}

#technical-page .question-card[data-category="Web Development"] {
  border-left-color: #ec4899;
}

#technical-page .question-card[data-category="DevOps"] {
  border-left-color: #14b8a6;
}

#technical-page .question-card[data-category="Cloud Computing"] {
  border-left-color: #6366f1;
}`;
export default function Technical() {
  const { t } = useLanguage();
  const [category, setCategory] = useState('Programming');
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
      const prompt = `Generate 5 technical interview questions about ${fullTopic}.
        Include a mix of conceptual and practical questions.
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
        id: `tech-${Date.now()}-${index}`,
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

        const prompt = `Evaluate this technical interview answer on a scale of 1-10:
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
      title: `Technical Questions - ${category}`,
      subject: 'Technical Interview Practice',
      author: 'Interview Prep App'
    });

    doc.setFontSize(18);
    doc.text(`Technical Questions: ${category}${topic ? ` (${topic})` : ''}`, 105, 15, { align: 'center' });
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

    doc.save(`technical-questions-${new Date().toISOString().slice(0,10)}.pdf`);
  };

  return (
    <><style dangerouslySetInnerHTML={{ __html: TechnicalStyles }} />
    <div id="technical-page" className="page fade-in">
      <div className="card">
        <h1 className="card-title">{t('Technical Interview')}</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <select 
            id="technical-category" 
            className="form-control form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Programming">{t('Programming')}</option>
            <option value="System Design">{t('System Design')}</option>
            <option value="Data Structures">{t('Data Structures')}</option>
            <option value="Algorithms">{t('Algorithms')}</option>
            <option value="Database">{t('Database')}</option>
            <option value="Web Development">{t('Web Development')}</option>
            <option value="DevOps">{t('DevOps')}</option>
            <option value="Cloud Computing">{t('Cloud Computing')}</option>
          </select>
          
          <input 
            type="text" 
            id="technical-topic" 
            className="form-control"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={t('Enter specific topic...')}
          />
          
          <button 
            id="generate-technical-questions" 
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
        <div id="technical-questions-container">
          <div id="technical-questions-list" className="space-y-6">
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
            id="submit-all-technical-answers" 
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
            <div id="technical-overall-feedback" className="feedback-card mt-6">
              <div className="feedback-score">
                {t('Overall Score')}: {Math.round(
                  feedback.reduce((sum, fb) => sum + fb.score, 0) / questions.length
                )}/10
              </div>
              <div className="feedback-text">
                {feedback[0]?.score >= 8 ? t('Excellent! You demonstrated strong technical knowledge.') :
                 feedback[0]?.score >= 5 ? t('Good job! You have a solid understanding but room for improvement.') :
                 t('Keep practicing! Review the feedback to identify areas to focus on.')}
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