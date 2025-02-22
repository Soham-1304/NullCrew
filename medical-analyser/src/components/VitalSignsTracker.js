import React, { useState } from 'react';
import { Card } from './ui/Card';

const VitalSignsTracker = ({ onClose }) => {
  const [vitals, setVitals] = useState({
    bloodPressure: '',
    heartRate: '',
    temperature: '',
    oxygenLevel: ''
  });

  const handleSubmit = () => {
    // Save vitals logic here
    console.log('Vitals recorded:', vitals);
  };

  return (
    <Card className="vitals-tracker-card">
      <div className="vitals-header">
        <h2>Track Your Vital Signs</h2>
        <button onClick={onClose} className="close-button">×</button>
      </div>

      <div className="vitals-form">
        <div className="vital-input">
          <label>Blood Pressure</label>
          <input
            type="text"
            placeholder="120/80"
            value={vitals.bloodPressure}
            onChange={(e) => setVitals({...vitals, bloodPressure: e.target.value})}
          />
        </div>

        <div className="vital-input">
          <label>Heart Rate (BPM)</label>
          <input
            type="number"
            placeholder="72"
            value={vitals.heartRate}
            onChange={(e) => setVitals({...vitals, heartRate: e.target.value})}
          />
        </div>

        <div className="vital-input">
          <label>Temperature (°F)</label>
          <input
            type="number"
            step="0.1"
            placeholder="98.6"
            value={vitals.temperature}
            onChange={(e) => setVitals({...vitals, temperature: e.target.value})}
          />
        </div>

        <div className="vital-input">
          <label>Oxygen Level (%)</label>
          <input
            type="number"
            placeholder="98"
            value={vitals.oxygenLevel}
            onChange={(e) => setVitals({...vitals, oxygenLevel: e.target.value})}
          />
        </div>

        <button onClick={handleSubmit} className="record-vitals-button">
          Record Vitals
        </button>
      </div>

      <div className="vitals-chart">
        {/* Add chart visualization here */}
      </div>
    </Card>
  );
};

export default VitalSignsTracker; 