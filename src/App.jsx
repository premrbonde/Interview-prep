import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Welcome from './pages/Welcome';
import Aptitude from './pages/Aptitude';
import Technical from './pages/Technical';
import HRInterview from './pages/HRInterview';
import GroupDiscussion from './pages/GroupDiscussion';
import Bookmarks from './pages/Bookmarks';
import Coding from './pages/Coding';
import Dashboard from './pages/Dashboard';
import ChatWidget from './components/ChatWidget';
import './style.css';
function App() {
  return (
    <Router>
      <ThemeProvider>
        <LanguageProvider>
          <div className="container">
            <Navbar />
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/aptitude" element={<Aptitude />} />
              <Route path="/technical" element={<Technical />} />
              <Route path="/hr-interview" element={<HRInterview />} />
              <Route path="/group-discussion" element={<GroupDiscussion />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/coding" element={<Coding />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
            <ChatWidget />
          </div>
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;