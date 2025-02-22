import React, { useState } from 'react';
import { Card } from './ui/Card';
import ChatInput from './ChatInput';

const GeneralAIChat = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello! I'm your AI health assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    setIsLoading(true);
    setMessages(prev => [...prev, { sender: 'user', text: input }]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: "I understand you're not feeling well. Let me help you identify your symptoms. Can you describe what you're experiencing?" 
      }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="general-chat-card">
      <div className="chat-card-header">
        <h2 className="chat-title">AI Health Assistant</h2>
        <button onClick={onClose} className="close-chat-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <ChatInput
        value={input}
        onChange={setInput}
        onSend={handleSend}
        disabled={isLoading}
        placeholder="Describe how you're feeling..."
      />
    </Card>
  );
};

export default GeneralAIChat; 