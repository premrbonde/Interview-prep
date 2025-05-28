// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
const navbarStyles = `
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
}
  /* Navbar Styles */
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: var(--card-light);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

.dark .nav {
  background-color: var(--card-dark);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-light);
  text-decoration: none;
  transition: all 0.3s ease;
  transform-origin: left center;
}

.dark .nav-brand {
  color: var(--primary-dark);
}

.nav-brand:hover {
  transform: scale(1.05);
  opacity: 0.9;
}

.nav-links {
  display: flex;
  gap: 0.5rem;
  margin: 0 auto;
}

.nav-link {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  text-decoration: none;
  color: var(--text-light);
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.dark .nav-link {
  color: var(--text-dark);
}

.nav-link::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background-color: var(--primary-light);
  transition: all 0.3s ease;
}

.dark .nav-link::before {
  background-color: var(--primary-dark);
}

.nav-link:hover::before {
  width: 80%;
}

.nav-link:hover {
  color: var(--primary-light);
  transform: translateY(-2px);
}

.dark .nav-link:hover {
  color: var(--primary-dark);
}

.nav-link.active {
  background-color: var(--primary-light);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);
}

.dark .nav-link.active {
  background-color: var(--primary-dark);
  box-shadow: 0 4px 6px rgba(96, 165, 250, 0.2);
}

.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  color: var(--text-light);
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}

.dark .theme-toggle {
  color: var(--text-dark);
}

.theme-toggle:hover {
  background-color: rgba(37, 99, 235, 0.1);
  transform: rotate(15deg) scale(1.1);
}

.dark .theme-toggle:hover {
  background-color: rgba(96, 165, 250, 0.1);
}

.language-selector {
  margin-left: 1rem;
}

.language-selector select {
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border-light);
  background-color: var(--card-light);
  color: var(--text-light);
  transition: all 0.3s ease;
}

.dark .language-selector select {
  border-color: var(--border-dark);
  background-color: var(--card-dark);
  color: var(--text-dark);
}

.language-selector select:focus {
  outline: none;
  border-color: var(--primary-light);
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
}

.dark .language-selector select:focus {
  border-color: var(--primary-dark);
  box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.2);
}

/* Animation for navbar items */
.nav-link {
  opacity: 0;
  transform: translateY(-10px);
  animation: fadeInDown 0.5s ease forwards;
}

@keyframes fadeInDown {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Create staggered animation for nav links */
.nav-link:nth-child(1) { animation-delay: 0.1s; }
.nav-link:nth-child(2) { animation-delay: 0.2s; }
.nav-link:nth-child(3) { animation-delay: 0.3s; }
.nav-link:nth-child(4) { animation-delay: 0.4s; }
.nav-link:nth-child(5) { animation-delay: 0.5s; }
.nav-link:nth-child(6) { animation-delay: 0.6s; }
.nav-link:nth-child(7) { animation-delay: 0.7s; }

/* Responsive adjustments */
@media (max-width: 1024px) {
  .nav {
    flex-wrap: wrap;
    padding: 1rem;
  }
  
  .nav-links {
    order: 3;
    width: 100%;
    margin-top: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }
}

@media (max-width: 768px) {
  .nav-brand {
    font-size: 1.25rem;
  }
  
  .nav-links {
    gap: 0.25rem;
  }
  
  .nav-link {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
  
  .theme-toggle {
    font-size: 1rem;
    width: 32px;
    height: 32px;
  }
}

@media (max-width: 480px) {
  .nav {
    padding: 0.75rem;
  }
  
  .nav-brand {
    font-size: 1.1rem;
  }
  
  .nav-link {
    font-size: 0.8rem;
    padding: 0.4rem;
  }
  
  .language-selector select {
    padding: 0.3rem;
    font-size: 0.8rem;
  }
}
`;
export default function Navbar() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { currentLanguage, changeLanguage, t } = useLanguage();

  return (
    <>
    <style dangerouslySetInnerHTML={{ __html: navbarStyles }} />
    <nav className="nav">
      <Link to="/" className="nav-brand">
        {t('Interview Prep')}
      </Link>
      <div className="nav-links">
        <Link to="/" className="nav-link" data-page="welcome">
          {t('Home')}
        </Link>
        <Link to="/aptitude" className="nav-link" data-page="aptitude">
          {t('Aptitude')}
        </Link>
        <Link to="/technical" className="nav-link" data-page="technical">
          {t('Technical')}
        </Link>
        <Link to="/hr-interview" className="nav-link" data-page="hr-interview">
          {t('HR Interview')}
        </Link>
        <Link to="/group-discussion" className="nav-link" data-page="group-discussion">
          {t('Group Discussion')}
        </Link>
        <Link to="/coding" className="nav-link" data-page="coding">
          {t('Coding')}
        </Link>
        <Link to="/dashboard" className="nav-link" data-page="dashboard">
          {t('Dashboard')}
        </Link>
      </div>
      <button 
        className="theme-toggle"
        onClick={() => toggleDarkMode(!isDarkMode)}
      >
        <i className={isDarkMode ? 'fas fa-sun' : 'fas fa-moon'}></i>
      </button>
      <div className="language-selector">
        <select 
          className="form-control form-select"
          value={currentLanguage}
          onChange={(e) => changeLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="mr">Marathi</option>
          <option value="ta">Tamil</option>
        </select>
      </div>
    </nav></>
  );
}