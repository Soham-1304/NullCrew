import React, { useState } from 'react';
import { Card } from './ui/Card';

const SymptomChecker = ({ onClose }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const commonSymptoms = [
    "Fever", "Headache", "Cough", "Fatigue", "Nausea",
    "Dizziness", "Chest Pain", "Shortness of Breath", "Body Aches"
  ];

  const handleSymptomToggle = (symptom) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  return (
    <Card className="symptom-checker-card">
      <div className="symptom-checker-header">
        <h2>Symptom Checker</h2>
        <button onClick={onClose} className="close-button">×</button>
      </div>
      
      <div className="symptom-grid">
        {commonSymptoms.map(symptom => (
          <button
            key={symptom}
            className={`symptom-button ${selectedSymptoms.includes(symptom) ? 'selected' : ''}`}
            onClick={() => handleSymptomToggle(symptom)}
          >
            {symptom}
          </button>
        ))}
      </div>

      <div className="severity-slider">
        <label>Symptom Severity</label>
        <input type="range" min="1" max="10" defaultValue="5" />
      </div>

      <button className="analyze-button">
        Analyze Symptoms
      </button>
    </Card>
  );
};

export default SymptomChecker; 