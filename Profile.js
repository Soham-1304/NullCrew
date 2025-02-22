import React from 'react';

const Profile = ({ user, history, onClose }) => {
  return (
    <div className="profile-modal">
      <div className="profile-content">
        <h2 className="profile-title">Health Profile</h2>
        
        <div className="profile-section">
          <h3>Personal Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Name:</label>
              <p>{user.name}</p>
            </div>
            <div className="info-item">
              <label>Age:</label>
              <p>{user.age}</p>
            </div>
            <div className="info-item">
              <label>Blood Type:</label>
              <p>{user.bloodType}</p>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h3>Health History</h3>
          <div className="history-timeline">
            {history.map((item, index) => (
              <div key={index} className="history-item">
                <div className="history-date">{item.date}</div>
                <div className="history-content">
                  <h4>{item.condition}</h4>
                  <p>{item.description}</p>
                  <p className="history-doctor">Dr. {item.doctor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="profile-section">
          <h3>Current Medications</h3>
          <div className="medications-list">
            {user.medications?.map((med, index) => (
              <div key={index} className="medication-item">
                <h4>{med.name}</h4>
                <p>{med.dosage}</p>
                <p>{med.frequency}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="profile-section">
          <h3>Emergency Contacts</h3>
          <div className="emergency-contacts">
            {user.emergencyContacts?.map((contact, index) => (
              <div key={index} className="emergency-contact-item">
                <h4>{contact.name}</h4>
                <p>Relationship: {contact.relationship}</p>
                <p>Phone: {contact.phone}</p>
                <button className="call-button">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                    />
                  </svg>
                  Call Now
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="profile-section">
          <h3>Allergies & Conditions</h3>
          <div className="tags-container">
            {user.allergies?.map((allergy, index) => (
              <span key={index} className="medical-tag allergy">{allergy}</span>
            ))}
            {user.conditions?.map((condition, index) => (
              <span key={index} className="medical-tag condition">{condition}</span>
            ))}
          </div>
        </div>

        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Profile; 