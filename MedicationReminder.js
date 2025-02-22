import React, { useState } from 'react';
import { Card } from './ui/Card';

const MedicationReminder = ({ onClose }) => {
  const [medications, setMedications] = useState([]);
  const [newMed, setNewMed] = useState({ name: '', time: '', dosage: '' });

  const addMedication = () => {
    if (newMed.name && newMed.time && newMed.dosage) {
      setMedications([...medications, { ...newMed, id: Date.now() }]);
      setNewMed({ name: '', time: '', dosage: '' });
    }
  };

  return (
    <Card className="medication-reminder-card">
      <div className="reminder-header">
        <h2>Medication Reminder</h2>
        <button onClick={onClose} className="close-button">×</button>
      </div>

      <div className="add-medication-form">
        <input
          type="text"
          placeholder="Medication Name"
          value={newMed.name}
          onChange={(e) => setNewMed({...newMed, name: e.target.value})}
        />
        <input
          type="time"
          value={newMed.time}
          onChange={(e) => setNewMed({...newMed, time: e.target.value})}
        />
        <input
          type="text"
          placeholder="Dosage"
          value={newMed.dosage}
          onChange={(e) => setNewMed({...newMed, dosage: e.target.value})}
        />
        <button onClick={addMedication} className="add-med-button">
          Add Reminder
        </button>
      </div>

      <div className="medications-list">
        {medications.map(med => (
          <div key={med.id} className="medication-item">
            <div className="med-info">
              <h3>{med.name}</h3>
              <p>Time: {med.time}</p>
              <p>Dosage: {med.dosage}</p>
            </div>
            <div className="med-actions">
              <button className="snooze-button">Snooze</button>
              <button className="taken-button">Mark as Taken</button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default MedicationReminder; 