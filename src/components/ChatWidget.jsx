// src/components/ChatWidget.jsx
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext'; // Add this import
import { callGeminiAPI } from '../utils/api';
const ChatWidgetStyles = `/* Chat Widget Container */
.chat-widget {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  transition: all 0.3s ease;
}
/* Add these to your existing ChatWidgetStyles */
.dark .chat-modal {
  background-color: #1f2937;
  border: 1px solid #374151;
}

.dark .chat-header {
  background: linear-gradient(135deg, #4338ca, #5b21b6);
}

.dark .chat-body {
  background-color: #111827;
}

.dark .bot-message {
  background-color: #374151;
  color: #f3f4f6;
  border-color: #4b5563;
}

.dark .chat-footer {
  background-color: #1f2937;
  border-top-color: #374151;
}

.dark .chat-input {
  background-color: #1f2937;
  color: #f3f4f6;
  border-color: #4b5563;
}

.dark .mic-btn:hover {
  background-color: #374151;
  color: #818cf8;
}

.dark .typing-indicator {
  background-color: #374151;
}

.dark .typing-dot {
  background-color: #9ca3af;
}

.dark .chat-body::-webkit-scrollbar-track {
  background: #1f2937;
}

.dark .chat-body::-webkit-scrollbar-thumb {
  background: #4b5563;
}
/* Chat Toggle Button */
.chat-toggle {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  border: none;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.chat-toggle:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.chat-toggle i {
  font-size: 24px;
}

/* Chat Modal */
.chat-modal {
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 350px;
  max-height: 500px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.chat-widget.active .chat-modal {
  opacity: 1;
  transform: translateY(0);
}

/* Chat Header */
.chat-header {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.close-chat {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
}

/* Chat Body */
.chat-body {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background-color: #f9fafb;
}

.chat-messages {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Message Bubbles */
.message {
  max-width: 80%;
  padding: 10px 14px;
  border-radius: 18px;
  font-size: 14px;
  line-height: 1.4;
  position: relative;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.user-message {
  align-self: flex-end;
  background-color: #4f46e5;
  color: white;
  border-bottom-right-radius: 4px;
}

.bot-message {
  align-self: flex-start;
  background-color: white;
  color: #1f2937;
  border: 1px solid #e5e7eb;
  border-bottom-left-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.message-time {
  display: block;
  font-size: 10px;
  opacity: 0.7;
  margin-top: 4px;
  text-align: right;
}

.bot-message .message-time {
  color: #6b7280;
}

.user-message .message-time {
  color: rgba(255, 255, 255, 0.7);
}

/* Typing Indicator */
.typing-indicator {
  display: flex;
  align-items: center;
  padding: 10px 14px;
  background-color: white;
  border-radius: 18px;
  width: fit-content;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  margin-bottom: 5px;
}

.typing-dot {
  width: 8px;
  height: 8px;
  background-color: #9ca3af;
  border-radius: 50%;
  margin: 0 2px;
  animation: typingAnimation 1.4s infinite ease-in-out;
}

.typing-dot:nth-child(1) {
  animation-delay: 0s;
}
.typing-dot:nth-child(2) {
  animation-delay: 0.2s;
}
.typing-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typingAnimation {
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-5px);
  }
}

/* Chat Footer */
.chat-footer {
  padding: 12px;
  border-top: 1px solid #e5e7eb;
  background-color: white;
  display: flex;
}

.chat-input-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.chat-input {
  flex: 1;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  padding: 10px 15px;
  font-size: 14px;
  resize: none;
  max-height: 100px;
  width: 250px;
  outline: none;
  transition: border-color 0.2s;
}

.chat-input:focus {
  border-color: #4f46e5;
}

.send-btn {
  background-color: #4f46e5;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.send-btn:hover {
  background-color: #4338ca;
  transform: scale(1.05);
}

/* Scrollbar styling */
.chat-body::-webkit-scrollbar {
  width: 6px;
}

.chat-body::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.chat-body::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 10px;
}

.chat-body::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
/* Microphone Button */
.mic-btn {
  background: transparent;
  border: none;
  color: #6b7280;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.mic-btn:hover {
  background-color: #f3f4f6;
  color: #4f46e5;
}

.mic-btn.active {
  color: #ef4444;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
  }
}

/* Adjust input container */
.chat-input-container {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 87%;
}

.chat-input {
  flex: 1;
  margin-right: 8px;
}  
`
export default function ChatWidget() {
  const { t, currentLanguage } = useLanguage();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const { isDarkMode } = useTheme();
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(prev => prev ? `${prev} ${transcript}` : transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        setMessages(prev => [...prev, {
          text: t('speech_recognition_error'),
          sender: 'bot',
          time: new Date()
        }]);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      console.warn('Speech recognition not supported');
      setIsSpeechSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [currentLanguage, t]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const toggleListening = () => {
    if (!isSpeechSupported) {
      setMessages(prev => [...prev, {
        text: t('voice_not_supported'),
        sender: 'bot',
        time: new Date()
      }]);
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Error starting recognition:', error);
        setIsListening(false);
        setMessages(prev => [...prev, {
          text: t('microphone_error'),
          sender: 'bot',
          time: new Date()
        }]);
      }
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      text: inputMessage,
      sender: 'user',
      time: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await callGeminiAPI(
        `You are an interview preparation assistant. The user asked: "${inputMessage}". 
        Provide a helpful response in 2-3 sentences. Respond in ${currentLanguage === 'hi' ? 'Hindi' : 'English'}.`,
        'questions'
      );

      const botMessage = {
        text: response,
        sender: 'bot',
        time: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        text: t('chat_error'),
        sender: 'bot',
        time: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <><style dangerouslySetInnerHTML={{ __html: ChatWidgetStyles }} />
    <div className={`chat-widget ${isChatOpen ? 'active' : ''} ${isDarkMode ? 'dark' : ''}`}></div>
    <div className={`chat-widget ${isChatOpen ? 'active' : ''}`}>
      <button className="chat-toggle" onClick={toggleChat}>
        <i className="fas fa-comment-dots"></i>
      </button>
      
      <div className="chat-modal">
        <div className="chat-header">
          <h3>{t('interview_assistant')}</h3>
          <button className="close-chat" onClick={toggleChat}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="chat-body">
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}-message`}>
                <div>{msg.text}</div>
                <span className="message-time">
                  {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            {isTyping && (
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <div className="chat-footer">
          <div className="chat-input-container">
            <textarea
              className="chat-input"
              placeholder={t('type_message')}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              rows="1"
            />
            <button 
              className={`mic-btn ${isListening ? 'active' : ''}`}
              onClick={toggleListening}
              title={t('voice_input')}
              disabled={!isSpeechSupported}
            >
              <i className={`fas ${isListening ? 'fa-microphone-slash' : 'fa-microphone'}`}></i>
            </button>
          </div>
          <button className="send-btn" onClick={sendMessage}>
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
    </>
  );
}