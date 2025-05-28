// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useProgress } from '../hooks/useProgress'; 
const DashboardStyles = `/* Dashboard Page Styles */
:root {
  /* Dashboard-specific colors */
  --aptitude-light: #6366f1;
  --aptitude-dark: #818cf8;
  --technical-light: #10b981;
  --technical-dark: #34d399;
  --hr-light: #ec4899;
  --hr-dark: #f472b6;
  --coding-light: #f59e0b;
  --coding-dark: #fbbf24;
  --gd-light: #8b5cf6;
  --gd-dark: #a78bfa;
}

#dashboard-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  animation: fadeIn 0.5s ease forwards;
}

.dashboard-card {
  background-color: var(--card-light);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.dark .dashboard-card {
  background-color: var(--card-dark);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
}

.dashboard-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--primary-light);
  text-align: center;
  position: relative;
}

.dark .dashboard-title {
  color: var(--primary-dark);
}

.dashboard-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-light), var(--success-light));
  border-radius: 2px;
}

.dark .dashboard-title::after {
  background: linear-gradient(90deg, var(--primary-dark), var(--success-dark));
}

/* Progress Grid */
.progress-grid {
  margin-top: 2rem;
}

.progress-card {
  background-color: var(--card-light);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border-left: 4px solid var(--primary-light);
  margin: 0 0 2rem 0;
}

.dark .progress-card {
  background-color: var(--card-dark);
  border-left-color: var(--primary-dark);
}

.progress-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.dark .progress-card:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

/* Category-specific colors */
.progress-card[data-category="aptitude"] {
  border-left-color: var(--aptitude-light);
}
.dark .progress-card[data-category="aptitude"] {
  border-left-color: var(--aptitude-dark);
}

.progress-card[data-category="technical"] {
  border-left-color: var(--technical-light);
}
.dark .progress-card[data-category="technical"] {
  border-left-color: var(--technical-dark);
}

.progress-card[data-category="hr"] {
  border-left-color: var(--hr-light);
}
.dark .progress-card[data-category="hr"] {
  border-left-color: var(--hr-dark);
}

.progress-card[data-category="coding"] {
  border-left-color: var(--coding-light);
}
.dark .progress-card[data-category="coding"] {
  border-left-color: var(--coding-dark);
}

.progress-card[data-category="gd"] {
  border-left-color: var(--gd-light);
}
.dark .progress-card[data-category="gd"] {
  border-left-color: var(--gd-dark);
}

/* Progress Bars */
.progress-bar {
  height: 8px;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  margin-top: 1rem;
  overflow: hidden;
}

.dark .progress-bar {
  background-color: rgba(255, 255, 255, 0.05);
}

.progress-fill {
  height: 100%;
  border-radius: 4px;
  background: linear-gradient(90deg, var(--primary-light), var(--success-light));
  transition: width 0.8s cubic-bezier(0.65, 0, 0.35, 1);
}

.dark .progress-fill {
  background: linear-gradient(90deg, var(--primary-dark), var(--success-dark));
}

/* Stats Cards */
.stat-card {
  background-color: var(--card-light);
  border-radius: 1rem;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.dark .stat-card {
  background-color: var(--card-dark);
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-light), var(--success-light));
}

.dark .stat-card::before {
  background: linear-gradient(90deg, var(--primary-dark), var(--success-dark));
}

.stat-card h4 {
  color: var(--text-light);
  font-weight: 600;
}

.dark .stat-card h4 {
  color: var(--text-dark);
}

.stat-card p {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-light);
  margin-top: 0.5rem;
}

.dark .stat-card p {
  color: var(--primary-dark);
}

/* Pie Chart Container */
.pie-chart-container {
  margin-top: 2rem;
  background-color: var(--card-light);
  border-radius: 1rem;
  padding: 1.5rem;
  height: 300px;
  display: flex;
  gap: 5rem;
  align-items: center;
  justify-content: center;
  position: relative;
}

.dark .pie-chart-container {
  background-color: var(--card-dark);
}

.pie-chart {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  position: relative;
  background: conic-gradient(
    var(--aptitude-light) 0% 20%,
    var(--technical-light) 20% 40%,
    var(--hr-light) 40% 60%,
    var(--coding-light) 60% 80%,
    var(--gd-light) 80% 100%
  );
  animation: rotatePie 2s ease-in-out;
}

.dark .pie-chart {
  background: conic-gradient(
    var(--aptitude-dark) 0% 20%,
    var(--technical-dark) 20% 40%,
    var(--hr-dark) 40% 60%,
    var(--coding-dark) 60% 80%,
    var(--gd-dark) 80% 100%
  );
}

@keyframes rotatePie {
  from { transform: rotate(0deg) scale(0.8); opacity: 0; }
  to { transform: rotate(360deg) scale(1); opacity: 1; }
}

.pie-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.5rem;
  justify-content: center;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsive */
@media (max-width: 768px) {
  #dashboard-page {
    padding: 1rem;
  }
  
  .dashboard-card {
    padding: 1.5rem;
  }
  
  .pie-chart {
    width: 200px;
    height: 200px;
  }
}

@media (max-width: 640px) {
  .progress-grid {
    grid-template-columns: 1fr;
  }
  
  #overall-stats {
    grid-template-columns: 1fr;
  }
}

`
export default function Dashboard() {
  const { t } = useLanguage();
  const { isDarkMode } = useTheme();
  const [userProgress, setUserProgress] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('userProgress')) || {
      aptitude: { 
        categories: {
          Quantitative: { completed: 0, totalScore: 0, sessions: 0 },
          Logical: { completed: 0, totalScore: 0, sessions: 0 },
          Verbal: { completed: 0, totalScore: 0, sessions: 0 },
          'Data Interpretation': { completed: 0, totalScore: 0, sessions: 0 },
          Puzzles: { completed: 0, totalScore: 0, sessions: 0 }
        },
        sessions: []
      }
    };
    return saved;
  });

  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
    setUserProgress(prev => ({
      ...prev,
      ...savedProgress
    }));

    const handleStorageChange = () => {
      const updated = JSON.parse(localStorage.getItem('userProgress') || '{}');
      setUserProgress(prev => ({ ...prev, ...updated }));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const progressData =  userProgress; // Use whichever you're using

  // Calculate overall stats
  const calculateOverallStats = () => {
    const categories = Object.keys(userProgress.aptitude.categories);
    const totalCompleted = categories.reduce(
      (sum, cat) => sum + (userProgress.aptitude.categories[cat]?.completed || 0), 
      0
    );
    const totalSessions = categories.reduce(
      (sum, cat) => sum + (userProgress.aptitude.categories[cat]?.sessions || 0), 
      0
    );
    const totalScore = categories.reduce(
      (sum, cat) => sum + (userProgress.aptitude.categories[cat]?.totalScore || 0), 
      0
    );
    const overallAvg = totalSessions > 0 ? Math.round(totalScore / totalSessions) : 0;
    
    return { totalCompleted, totalSessions, overallAvg };
  };

  const { totalCompleted, totalSessions, overallAvg } = calculateOverallStats();

  // Format session history for display
  const formatSessionHistory = () => {
    return userProgress.aptitude.sessions.map(session => ({
      date: new Date(session.date).toLocaleDateString(),
      category: session.category,
      difficulty: session.difficulty,
      score: `${session.score}/10`,
      questions: session.questionsAttempted,
      // Use isDarkMode here if needed
      theme: isDarkMode ? 'dark' : 'light'
    }));
  };

  return (
    <><style dangerouslySetInnerHTML={{ __html: DashboardStyles }} />
    <div id="dashboard-page" className={`page ${isDarkMode ? 'dark' : ''}`}>
    <div id="dashboard-page" className="page">
    <div className="dashboard-card">
        <h1 className="dashboard-title">{t('Your Progress Dashboard')}</h1>
        
        {/* Overall Statistics */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">{t('Overall Statistics')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="stat-card">
              <h4>{t('Total Questions')}</h4>
              <p>{totalCompleted}</p>
            </div>
            <div className="stat-card">
              <h4>{t('Practice Sessions')}</h4>
              <p>{totalSessions}</p>
            </div>
            <div className="stat-card">
              <h4>{t('Overall Average')}</h4>
              <p>{overallAvg}/10</p>
            </div>
          </div>
        </div>

        {/* Category Progress */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">{t('Category Progress')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {Object.entries(userProgress.aptitude.categories).map(([category, data]) => (
              <div key={category} className="progress-card" data-category={category}>
                <h3>{category}</h3>
                <p>{t('Completed')}: {data.completed}</p>
                <p>{t('Sessions')}: {data.sessions}</p>
                <p>{t('Avg Score')}: {data.sessions > 0 ? Math.round(data.totalScore / data.sessions) : 0}/10</p>
              </div>
            ))}
          </div>
        </div>

        {/* Session History */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">{t('Recent Sessions')}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th>{t('Date')}</th>
                  <th>{t('Category')}</th>
                  <th>{t('Difficulty')}</th>
                  <th>{t('Score')}</th>
                  <th>{t('Questions')}</th>
                </tr>
              </thead>
              <tbody>
                {formatSessionHistory().map((session, index) => (
                  <tr key={index}>
                    <td>{session.date}</td>
                    <td>{session.category}</td>
                    <td>{session.difficulty}</td>
                    <td>{session.score}</td>
                    <td>{session.questions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add the Pie Chart section */}
        <div className="pie-chart-container mt-8">
          <div className="pie-chart"></div>
          <div className="pie-legend">
            {['aptitude', 'technical', 'hr', 'coding', 'gd'].map((category) => (
              <div key={category} className="legend-item">
                <div 
                  className="legend-color" 
                  style={{ 
                    backgroundColor: `var(--${category}-${isDarkMode ? 'dark' : 'light'})`
                  }}
                ></div>
                <span>{t(category.charAt(0).toUpperCase() + category.slice(1))}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
}