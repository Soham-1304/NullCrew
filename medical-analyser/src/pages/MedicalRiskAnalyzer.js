import React, { useState } from "react";
import { Card } from '../components/ui/Card';
import ChatInput from '../components/ChatInput';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import Profile from '../components/Profile';
import GeneralAIChat from '../components/GeneralAIChat';
import SymptomChecker from '../components/SymptomChecker';
import MedicationReminder from '../components/MedicationReminder';
import VitalSignsTracker from '../components/VitalSignsTracker';
import Footer from '../components/Footer';
import { useClerk } from "@clerk/clerk-react";
// Import images
const images = {
  // Main categories
  physicalIcon: "https://cdn-icons-png.flaticon.com/512/4006/4006511.png",
  mentalIcon: "https://cdn-icons-png.flaticon.com/512/4207/4207247.png",
  pediatricIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373178.png",
  emergencyIcon: "https://cdn-icons-png.flaticon.com/512/2091/2091441.png",
  
  // Physical subcategories
  lungsIcon: "https://cdn-icons-png.flaticon.com/512/1041/1041916.png",
  bloodIcon: "https://cdn-icons-png.flaticon.com/512/1358/1358717.png",
  musclesIcon: "https://cdn-icons-png.flaticon.com/512/1995/1995450.png",
  nervesIcon: "https://cdn-icons-png.flaticon.com/512/1368/1368666.png",
  digestiveSystemIcon: "https://cdn-icons-png.flaticon.com/512/1250/1250635.png",
  liverIcon: "https://cdn-icons-png.flaticon.com/512/1250/1250667.png",
  kidneysIcon: "https://cdn-icons-png.flaticon.com/512/1250/1250671.png",
  thyroidIcon: "https://cdn-icons-png.flaticon.com/512/1250/1250683.png",
  immuneSystemIcon: "https://cdn-icons-png.flaticon.com/512/1250/1250689.png",
  reproductiveSystemIcon: "https://cdn-icons-png.flaticon.com/512/1250/1250692.png",
  
  // Mental subcategories
  anxietyIcon: "https://cdn-icons-png.flaticon.com/512/2839/2839020.png",
  stressIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373190.png",
  depressionIcon: "https://cdn-icons-png.flaticon.com/512/3590/3590601.png",
  addictionIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373195.png",
  sleepIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373198.png",
  
  // Pediatric subcategories
  childFeverIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373200.png",
  growthIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373202.png",
  vaccinationIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373204.png",
};

const categories = {
  Physical: {
    icon: images.physicalIcon,
    description: "For physical health concerns and symptoms",
    subcategories: [
      { name: "Lung Issues", icon: images.lungsIcon },
      { name: "Blood Disorders", icon: images.bloodIcon },
      { name: "Muscle Pain", icon: images.musclesIcon },
      { name: "Nerve Issues", icon: images.nervesIcon },
      { name: "Digestive Problems", icon: images.digestiveSystemIcon },
      { name: "Liver Conditions", icon: images.liverIcon },
      { name: "Kidney Issues", icon: images.kidneysIcon },
      { name: "Thyroid Problems", icon: images.thyroidIcon },
      { name: "Immune System", icon: images.immuneSystemIcon },
      { name: "Reproductive Health", icon: images.reproductiveSystemIcon }
    ]
  },
  Mental: {
    icon: images.mentalIcon,
    description: "For mental health and emotional well-being",
    subcategories: [
      { name: "Anxiety", icon: images.anxietyIcon },
      { name: "Stress", icon: images.stressIcon },
      { name: "Depression", icon: images.depressionIcon },
      { name: "Addiction", icon: images.addictionIcon },
      { name: "Sleep Issues", icon: images.sleepIcon },
    ]
  },
  Pediatric: {
    icon: images.pediatricIcon,
    description: "Specialized care for children",
    subcategories: [
      { name: "Child Fever", icon: images.childFeverIcon },
      { name: "Growth & Development", icon: images.growthIcon },
      { name: "Vaccination", icon: images.vaccinationIcon },
    ]
  }
};

const MedicalRiskAnalyzer = () => {
  const { signOut } = useClerk();
  const [step, setStep] = useState("start");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showGeneralChat, setShowGeneralChat] = useState(false);
  const [showSymptomChecker, setShowSymptomChecker] = useState(false);
  const [showMedReminder, setShowMedReminder] = useState(false);
  const [showVitalsTracker, setShowVitalsTracker] = useState(false);

  const handleCategorySelect = (type) => {
    setCategory(type);
    setStep("subCategory");
  };

  const handleSubCategorySelect = (sub) => {
    setSubCategory(sub);
    setStep("chat");
    setChat([{ sender: "user", text: `I am having a problem with my ${sub}` }]);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    setIsLoading(true);
    
    try {
      setChat(prev => [...prev, { sender: "user", text: input }]);
      setInput("");
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setChat(prev => [...prev, { 
        sender: "bot", 
        text: "Tell me more about your symptoms." 
      }]);
    } catch (err) {
      console.error("Failed to send message. Please try again.", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (step === "chat") {
      setStep("subCategory");
      setChat([]);
    } else if (step === "subCategory") {
      setStep("start");
      setCategory("");
    }
  };

  const handleHome = () => {
    setStep("start");
    setCategory("");
    setSubCategory("");
    setChat([]);
    setInput("");
  };

  const handleSOS = () => {
    // Show emergency contact dialog
    alert("Emergency services have been notified. Stay calm, help is on the way.");
  };

  return (
    <div className="container">
      <Header 
        onProfile={() => setShowProfile(true)}
        onSOS={handleSOS}
      />
      <NavBar 
        step={step}
        onBack={handleBack}
        onHome={handleHome}
      />
      
      <button onClick={signOut} className="sign-out-button">
        Sign Out
      </button>

      {showProfile && (
        <Profile onClose={() => setShowProfile(false)} />
      )}

      {step === "start" && (
        <>
          <Card className="welcome-card">
            <h1 className="main-title">AI-Powered Medical Risk Analyzer</h1>
            <p className="main-subtitle">Choose your health concern type or chat with our AI</p>
            <button 
              className="general-chat-button"
              onClick={() => setShowGeneralChat(true)}
            >
              Not sure? Chat with our AI
            </button>
            <button 
              className="symptom-checker-button"
              onClick={() => setShowSymptomChecker(true)}
            >
              Quick Symptom Check
            </button>
            <div className="quick-actions">
              <button 
                className="med-reminder-button"
                onClick={() => setShowMedReminder(true)}
              >
                Medication Reminder
              </button>
              <button 
                className="vitals-tracker-button"
                onClick={() => setShowVitalsTracker(true)}
              >
                Track Vitals
              </button>
            </div>
            <div className="category-container">
              {Object.entries(categories).map(([name, { icon, description }], index) => (
                <div 
                  key={name} 
                  className="category-card" 
                  onClick={() => handleCategorySelect(name)}
                  style={{"--animation-order": index}}
                >
                  <img src={icon} alt={name} className="category-icon" />
                  <h2 className="category-title">{name}</h2>
                  <p className="category-description">{description}</p>
                </div>
              ))}
            </div>
          </Card>
          
          {showGeneralChat && (
            <GeneralAIChat onClose={() => setShowGeneralChat(false)} />
          )}

          {showSymptomChecker && (
            <SymptomChecker onClose={() => setShowSymptomChecker(false)} />
          )}

          {showMedReminder && (
            <MedicationReminder onClose={() => setShowMedReminder(false)} />
          )}

          {showVitalsTracker && (
            <VitalSignsTracker onClose={() => setShowVitalsTracker(false)} />
          )}
        </>
      )}
      
      {step === "subCategory" && (
        <Card className="subcategory-card">
          <h2 className="title">Select your specific issue</h2>
          <div className="subcategory-grid">
            {categories[category].subcategories.map(({ name, icon }) => (
              <div 
                key={name} 
                className="subcategory-item"
                onClick={() => handleSubCategorySelect(name)}
              >
                <img src={icon} alt={name} className="subcategory-icon" />
                <span className="subcategory-name">{name}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
      
      {step === "chat" && (
        <Card className="chat-card">
          <div className="chat-header">
            <img 
              src={categories[category].subcategories.find(s => s.name === subCategory)?.icon} 
              alt={subCategory} 
              className="chat-icon"
            />
            <h2 className="chat-title">Chat with AI about {subCategory}</h2>
          </div>
          <div className="messages-container">
            {chat.map((message, index) => (
              <div 
                key={index} 
                className={`message-wrapper ${message.sender === "user" ? "user" : "bot"}`}
              >
                <div className="message-content">
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
          </div>
          <ChatInput
            value={input}
            onChange={setInput}
            onSend={handleSendMessage}
            disabled={isLoading}
          />
        </Card>
      )}
      <Footer />
    </div>
  );
};

export default MedicalRiskAnalyzer;
