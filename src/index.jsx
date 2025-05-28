// src/index.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { LanguageProvider } from './hooks/useLanguage';
import './style.css';// import 'font-awesome/css/font-awesome.min.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
       <LanguageProvider>
      <App />
    </LanguageProvider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found!");
}