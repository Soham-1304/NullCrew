import React from 'react';

const ChatMessage = ({ message, isUser }) => {
  return (
    <div 
      className={`mb-2 ${isUser ? 'text-right' : 'text-left'}`}
      role="log"
      aria-label={`${isUser ? 'Your' : 'AI'} message`}
    >
      <p className={`inline-block p-2 rounded-lg ${
        isUser ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
      }`}>
        {message.text}
      </p>
    </div>
  );
}; 