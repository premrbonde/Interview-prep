// src/pages/Welcome.jsx
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
const navbarStyles = `
/* Welcome Page Styles */
#welcome-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  color: var(--text-light);
}

.dark #welcome-page {
  background-color: var(--bg-dark);
  color: var(--text-dark);
}

.welcome-header {
  text-align: center;
  margin-bottom: 3rem;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s ease forwards 0.2s;
}

.welcome-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-light);
}

.dark .welcome-title {
  color: var(--text-dark);
}

.welcome-title span {
  color: var(--primary-light);
}

.dark .welcome-title span {
  color: var(--primary-dark);
}

.welcome-subtitle {
  font-size: 1.25rem;
  opacity: 0.8;
  margin-bottom: 2rem;
  color: var(--text-light);
}

.dark .welcome-subtitle {
  color: var(--text-dark);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.feature-card {
  position: relative;
  background-color: var(--card-light);
  border-radius: 1rem;
  padding: 2rem 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  border: 1px solid var(--border-light);
  color: var(--text-light);
  text-decoration: none;
}

.dark .feature-card {
  background-color: var(--card-dark);
  border-color: var(--border-dark);
  color: var(--text-dark);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.dark .feature-card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.feature-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: white;
  background-color: var(--primary-light);
  transition: all 0.3s ease;
}

.dark .feature-icon {
  background-color: var(--primary-dark);
}

.feature-card:hover .feature-icon {
  transform: scale(1.1);
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--text-light);
}

.dark .feature-title {
  color: var(--text-dark);
}

.feature-desc {
  font-size: 0.95rem;
  opacity: 0.8;
  margin-bottom: 1.5rem;
  color: var(--text-light);
}

.dark .feature-desc {
  color: var(--text-dark);
}

.feature-arrow {
  position: absolute;
  right: 1.5rem;
  bottom: 1.5rem;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
  color: var(--primary-light);
}

.dark .feature-arrow {
  color: var(--primary-dark);
}

.feature-card:hover .feature-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* Animations */
@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .welcome-title {
    font-size: 2rem;
  }
  
  .welcome-subtitle {
    font-size: 1.1rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .feature-card {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  #welcome-page {
    padding: 1.5rem 1rem;
  }
  
  .welcome-title {
    font-size: 1.75rem;
  }
  
  .feature-icon {
    width: 50px;
    height: 50px;
    font-size: 1.25rem;
  }
  
  .feature-title {
    font-size: 1.1rem;
  }
  
  .feature-desc {
    font-size: 0.9rem;
  }
}
`
export default function Welcome() {
  const { t } = useLanguage();

  return (
    <>
    <style dangerouslySetInnerHTML={{ __html: navbarStyles }} />
    <div id="welcome-page" className="page active">
      <header className="welcome-header">
        <h1 className="welcome-title">
          {t('Welcome to')} <span className="text-blue-600 dark:text-blue-400">{t('Interview Prep')}</span>
        </h1>
        <p className="welcome-subtitle">{t('Your personal interview preparation assistant')}</p>
      </header>

      <div className="features-grid">
        <Link to="/aptitude" className="feature-card" style={{ animation: 'fadeInUp 1s ease forwards 0.1s' }}>
          <div className="feature-icon">
            <i className="fas fa-brain"></i>
          </div>
          <h3 className="feature-title">{t('Aptitude Questions')}</h3>
          <p className="feature-desc">{t('Practice numerical, logical, and verbal reasoning')}</p>
          <i className="fas fa-arrow-right feature-arrow"></i>
        </Link>

        <Link to="/technical" className="feature-card" style={{ animation: 'fadeInUp 1s ease forwards 0.2s' }}>
          <div className="feature-icon">
            <i className="fas fa-laptop-code"></i>
          </div>
          <h3 className="feature-title">{t('Technical Interview')}</h3>
          <p className="feature-desc">{t('Prepare for coding and system design interviews')}</p>
          <i className="fas fa-arrow-right feature-arrow"></i>
        </Link>

        <Link to="/group-discussion" className="feature-card" style={{ animation: 'fadeInUp 1s ease forwards 0.3s' }}>
          <div className="feature-icon">
            <i className="fas fa-users"></i>
          </div>
          <h3 className="feature-title">{t('Group Discussion')}</h3>
          <p className="feature-desc">{t('Practice with discussion topics and timer')}</p>
          <i className="fas fa-arrow-right feature-arrow"></i>
        </Link>

        <Link to="/hr-interview" className="feature-card" style={{ animation: 'fadeInUp 1s ease forwards 0.5s' }}>
          <div className="feature-icon">
            <i className="fas fa-user-tie"></i>
          </div>
          <h3 className="feature-title">{t('HR Interview')}</h3>
          <p className="feature-desc">{t('Prepare for common HR interview questions')}</p>
          <i className="fas fa-arrow-right feature-arrow"></i>
        </Link>

        <Link to="/coding" className="feature-card" style={{ animation: 'fadeInUp 1s ease forwards 0.6s' }}>
          <div className="feature-icon">
            <i className="fas fa-code"></i>
          </div>
          <h3 className="feature-title">{t('Coding Challenges')}</h3>
          <p className="feature-desc">{t('Solve coding problems with feedback')}</p>
          <i className="fas fa-arrow-right feature-arrow"></i>
        </Link>

        <Link to="/bookmarks" className="feature-card" style={{ animation: 'fadeInUp 1s ease forwards 0.4s' }}>
          <div className="feature-icon">
            <i className="fas fa-bookmark"></i>
          </div>
          <h3 className="feature-title">{t('Bookmarked Questions')}</h3>
          <p className="feature-desc">{t('Review your saved questions')}</p>
          <i className="fas fa-arrow-right feature-arrow"></i>
        </Link>
      </div>
    </div>
    </>
  );
}