import React from 'react';

const Header = ({ onProfile, onSOS }) => {
  return (
    <header className="app-header">
      <div className="header-left">
        <h1>Med<span className="text-gradient">AI</span></h1>
      </div>
      <div className="header-right">
        <button className="profile-button" onClick={onProfile}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Profile
        </button>
        <button className="sos-button" onClick={onSOS}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          SOS
        </button>
      </div>
    </header>
  );
};

export default Header; 