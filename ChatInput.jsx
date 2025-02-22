import React from 'react';

const ChatInput = ({ value, onChange, onSend, disabled, placeholder }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="chat-input-container">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder || "Type your message..."}
        disabled={disabled}
        className="chat-input"
      />
      <button onClick={onSend} disabled={disabled} className="send-button">
        Send
      </button>
    </div>
  );
};

export default ChatInput; 