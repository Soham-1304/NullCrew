import React, { useState } from 'react';
import { Card } from './ui/Card';
import { useUser } from "@clerk/clerk-react";

const Profile = ({ onClose }) => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('personal');

  // Mock medical history data
  const medicalHistory = [
    { date: '2024-01-15', type: 'Consultation', details: 'General checkup' },
    { date: '2024-01-10', type: 'Vital Signs', details: 'BP: 120/80, HR: 72' },
    { date: '2024-01-05', type: 'Medication', details: 'Prescribed antihistamines' },
  ];

  if (!user) {
    return null; // Don't render if user isn't loaded
  }

  return (
    <div className="profile-overlay">
      <Card className="profile-card">
        <div className="profile-header">
          <h2>Profile & Medical Records</h2>
          <button onClick={onClose} className="close-button">×</button>
        </div>

        <div className="profile-tabs">
          <button 
            className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            Personal Info
          </button>
          <button 
            className={`tab-button ${activeTab === 'medical' ? 'active' : ''}`}
            onClick={() => setActiveTab('medical')}
          >
            Medical History
          </button>
        </div>

        <div className="profile-content">
          {activeTab === 'personal' ? (
            <div className="personal-info">
              <div className="user-avatar">
                <img 
                  src={user.imageUrl || 'https://via.placeholder.com/100'} 
                  alt="Profile" 
                />
              </div>
              <div className="user-details">
                <h3>{user.fullName}</h3>
                <p>Email: {user.primaryEmailAddress?.emailAddress}</p>
                <p>Member since: {new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ) : (
            <div className="medical-history">
              {medicalHistory.map((record, index) => (
                <div key={index} className="medical-record">
                  <div className="record-date">{record.date}</div>
                  <div className="record-type">{record.type}</div>
                  <div className="record-details">{record.details}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Profile; 