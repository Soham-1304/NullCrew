import React from 'react';

const NavBar = ({ step, onBack, onHome }) => {
  return (
    <nav className="nav-bar">
      {step !== "start" && (
        <button onClick={onBack} className="nav-button">
          ← Back
        </button>
      )}
      {step !== "start" && (
        <button onClick={onHome} className="nav-button">
          🏠 Home
        </button>
      )}
    </nav>
  );
};

export default NavBar; 