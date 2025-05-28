import { useState } from 'react';
import { callGeminiAPI } from '../utils/api';
import { useLanguage } from '../hooks/useLanguage';

const CodingStyles = `
/* Coding Practice Page Styles */
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
  
  /* Coding-Specific Colors */
  --javascript-light: #f7df1e;
  --javascript-dark: #f0db4f;
  --python-light: #3776ab;
  --python-dark: #4b8bbe;
  --java-light: #007396;
  --java-dark: #5382a1;
  --cpp-light: #00599c;
  --cpp-dark: #659ad2;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.coding-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
  animation: fadeIn 0.5s ease forwards;
}

.dark .coding-page {
  background-color: var(--bg-dark);
  color: var(--text-dark);
}

/* Card Styles */
.coding-card {
  background-color: var(--card-light);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.dark .coding-card {
  background-color: var(--card-dark);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.coding-card-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--primary-light);
  text-align: center;
}

.dark .coding-card-title {
  color: var(--primary-dark);
}

/* Form Elements */
.coding-form-control {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border-light);
  background-color: var(--card-light);
  color: var(--text-light);
  font-family: inherit;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.dark .coding-form-control {
  border-color: var(--border-dark);
  background-color: var(--card-dark);
  color: var(--text-dark);
}

.coding-form-select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
}

/* Buttons */
.coding-btn {
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

.coding-btn-primary {
  background-color: var(--primary-light);
  color: white;
}

.dark .coding-btn-primary {
  background-color: var(--primary-dark);
}

.coding-btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

/* Problem Cards */
.coding-problem-card {
  background-color: var(--card-light);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-left: 4px solid var(--primary-light);
  transition: all 0.3s ease;
}

.dark .coding-problem-card {
  background-color: var(--card-dark);
  border-left-color: var(--primary-dark);
}

.coding-problem-text {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-light);
  line-height: 1.5;
  white-space: pre-wrap;
}

.dark .coding-problem-text {
  color: var(--text-dark);
}

/* Test Cases */
.coding-test-case {
  background-color: rgba(0, 0, 0, 0.05);
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin: 0.5rem 0;
}

.dark .coding-test-case {
  background-color: rgba(255, 255, 255, 0.05);
}

/* Code Editor */
.coding-editor {
  width: 100%;
  min-height: 200px;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border-light);
  background-color: var(--card-light);
  color: var(--text-light);
  font-family: 'Courier New', monospace;
  font-size: 0.95rem;
  line-height: 1.6;
  resize: vertical;
}

.dark .coding-editor {
  border-color: var(--border-dark);
  background-color: var(--card-dark);
  color: var(--text-dark);
}

/* Feedback */
.coding-feedback-card {
  background-color: var(--card-light);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-top: 1rem;
  border-left: 4px solid var(--success-light);
}

.dark .coding-feedback-card {
  background-color: var(--card-dark);
  border-left-color: var(--success-dark);
}

.coding-feedback-score {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--success-light);
}

.dark .coding-feedback-score {
  color: var(--success-dark);
}

/* Language-specific colors */
.coding-lang-javascript {
  border-left-color: var(--javascript-light) !important;
}
.dark .coding-lang-javascript {
  border-left-color: var(--javascript-dark) !important;
}

.coding-lang-python {
  border-left-color: var(--python-light) !important;
}
.dark .coding-lang-python {
  border-left-color: var(--python-dark) !important;
}

.coding-lang-java {
  border-left-color: var(--java-light) !important;
}
.dark .coding-lang-java {
  border-left-color: var(--java-dark) !important;
}

.coding-lang-cpp {
  border-left-color: var(--cpp-light) !important;
}
.dark .coding-lang-cpp {
  border-left-color: var(--cpp-dark) !important;
}

/* Responsive */
@media (max-width: 768px) {
  .coding-page {
    padding: 1rem 0.5rem;
  }
  
  .coding-problem-card {
    padding: 1rem;
  }
  
  .coding-editor {
    min-height: 150px;
  }
}
`;

export default function Coding() {
  const { currentLanguage, t } = useLanguage();
  const [language, setLanguage] = useState('javascript');
  const [difficulty, setDifficulty] = useState('easy');
  const [problems, setProblems] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateProblems = async () => {
    setIsLoading(true);
    try {
      const prompt = `Generate 3 coding problems in ${language} at ${difficulty} level.
        Each problem should include:
        - Problem statement (2-3 paragraphs)
        - 2-3 sample test cases with inputs and expected outputs
        - Constraints
        
        Format exactly as:
        Problem 1:
        [problem statement]
        Sample Input 1: [input]
        Expected Output 1: [output]
        Sample Input 2: [input]
        Expected Output 2: [output]
        Constraints: [constraints]
        ---`;
      
      const response = await callGeminiAPI(prompt);
      const parsedProblems = parseProblems(response);
      setProblems(parsedProblems);
      setSolutions(Array(parsedProblems.length).fill(''));
      setFeedback([]);
    } catch (error) {
      console.error('Error generating problems:', error);
      alert(t('Failed to generate problems'));
    } finally {
      setIsLoading(false);
    }
  };

  const parseProblems = (text) => {
    return text.split('---')
      .filter(block => block.trim() !== '')
      .map((block, index) => {
        const lines = block.split('\n').filter(line => line.trim() !== '');
        const problem = {
          id: `code-${Date.now()}-${index}`,
          statement: '',
          testCases: [],
          constraints: ''
        };

        let currentSection = 'statement';
        lines.forEach(line => {
          if (line.startsWith('Sample Input')) {
            currentSection = 'testCases';
            const caseNum = line.match(/\d+/)[0];
            const input = line.replace(`Sample Input ${caseNum}:`, '').trim();
            problem.testCases.push({ input, output: '' });
          } else if (line.startsWith('Expected Output')) {
            const caseNum = line.match(/\d+/)[0];
            problem.testCases[caseNum - 1].output = line.replace(`Expected Output ${caseNum}:`, '').trim();
          } else if (line.startsWith('Constraints:')) {
            currentSection = 'constraints';
            problem.constraints = line.replace('Constraints:', '').trim();
          } else {
            if (currentSection === 'statement') {
              problem.statement += line + '\n';
            } else if (currentSection === 'constraints') {
              problem.constraints += line + '\n';
            }
          }
        });

        return problem;
      });
  };

  const handleSolutionChange = (index, value) => {
    const newSolutions = [...solutions];
    newSolutions[index] = value;
    setSolutions(newSolutions);
  };

  const submitSolution = async (index) => {
    if (!solutions[index]) {
      alert(t('Please write a solution before submitting'));
      return;
    }

    setIsLoading(true);
    try {
      const problem = problems[index];
      const prompt = `Evaluate this ${language} solution:
        Problem: ${problem.statement}
        Solution: ${solutions[index]}
        
        Provide feedback in this format:
        Score: [score]/10
        Feedback: [detailed feedback]
        Expected Solution: [well-formatted code solution]`;

      const response = await callGeminiAPI(prompt);
      const parsedFeedback = parseFeedback(response);
      
      const newFeedback = [...feedback];
      newFeedback[index] = parsedFeedback;
      setFeedback(newFeedback);
    } catch (error) {
      console.error('Error evaluating solution:', error);
      alert(t('Failed to evaluate solution'));
    } finally {
      setIsLoading(false);
    }
  };

  const parseFeedback = (text) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const feedback = {
      score: 0,
      feedback: '',
      expectedSolution: ''
    };

    let currentSection = '';
    lines.forEach(line => {
      if (line.startsWith('Score:')) {
        feedback.score = parseInt(line.match(/\d+/)?.[0] || 0);
      } else if (line.startsWith('Feedback:')) {
        currentSection = 'feedback';
        feedback.feedback = line.replace('Feedback:', '').trim();
      } else if (line.startsWith('Expected Solution:')) {
        currentSection = 'expectedSolution';
        feedback.expectedSolution = line.replace('Expected Solution:', '').trim();
      } else {
        if (currentSection === 'feedback') {
          feedback.feedback += '\n' + line.trim();
        } else if (currentSection === 'expectedSolution') {
          feedback.expectedSolution += '\n' + line.trim();
        }
      }
    });

    return feedback;
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CodingStyles }} />
      <div className="coding-page fade-in">
        <div className="coding-card">
          <h1 className="coding-card-title">{t('Coding Practice')}</h1>
          
          <div className="coding-flex coding-flex-col md:coding-flex-row coding-gap-4 coding-mb-6">
            <div className="coding-card">
              <h2 className="coding-form-label">{t('Select Language')}</h2>
              <select 
                className="coding-form-control coding-form-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="c++">C++</option>
              </select>
            </div>

            <div className="coding-card">
              <h2 className="coding-form-label">{t('Select Difficulty')}</h2>
              <select 
                className="coding-form-control coding-form-select"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="easy">{t('Easy')}</option>
                <option value="medium">{t('Medium')}</option>
                <option value="hard">{t('Hard')}</option>
              </select>
            </div>
          </div>

          <button 
            className="coding-btn coding-btn-primary coding-w-full"
            onClick={generateProblems}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="coding-spinner"></span>
            ) : (
              t('Generate Problems')
            )}
          </button>
        </div>

        {problems.length > 0 && (
          <div className="coding-space-y-6">
            {problems.map((problem, index) => (
              <div 
                key={problem.id} 
                className={`coding-problem-card coding-lang-${language.toLowerCase().replace('+', '')}`}
              >
                <div className="coding-problem-header">
                  <h3 className="coding-problem-text">
                    {t('Problem')} {index + 1}:\n{problem.statement}
                  </h3>
                </div>

                {problem.testCases.length > 0 && (
                  <div className="coding-mt-4">
                    <h4 className="coding-font-semibold">{t('Test Cases')}</h4>
                    {problem.testCases.map((testCase, i) => (
                      <div key={i} className="coding-test-case coding-mt-2">
                        <p>Input: {testCase.input}</p>
                        <p>Output: {testCase.output}</p>
                      </div>
                    ))}
                  </div>
                )}

                {problem.constraints && (
                  <div className="coding-mt-4">
                    <h4 className="coding-font-semibold">{t('Constraints')}</h4>
                    <p className="coding-whitespace-pre-wrap">{problem.constraints}</p>
                  </div>
                )}

                <div className="coding-input-group coding-mt-4">
                  <textarea
                    className="coding-editor"
                    value={solutions[index]}
                    onChange={(e) => handleSolutionChange(index, e.target.value)}
                    placeholder={t('Write your solution here...')}
                    rows={10}
                  />
                </div>

                <button
                  className="coding-btn coding-btn-primary coding-mt-4"
                  onClick={() => submitSolution(index)}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="coding-spinner"></span>
                  ) : (
                    t('Submit Solution')
                  )}
                </button>

                {feedback[index] && (
                  <div className="coding-feedback-card coding-mt-4">
                    <div className="coding-feedback-score">
                      {t('Score')}: {feedback[index].score}/10
                    </div>
                    <div className="coding-feedback-text coding-whitespace-pre-wrap">
                      {feedback[index].feedback}
                    </div>
                    <div className="coding-mt-4">
                      <h4 className="coding-font-semibold">
                        {t('Expected Solution')}
                      </h4>
                      <pre className="coding-editor coding-mt-2">
                        {feedback[index].expectedSolution}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}