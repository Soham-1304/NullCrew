import React from 'react';

const Button = ({ children, onClick, disabled, className = "" }) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`button ${className}`}
    >
      {children}
    </button>
  );
};

export { Button };