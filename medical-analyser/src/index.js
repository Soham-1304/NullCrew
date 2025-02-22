import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { Card } from './components/ui/Card';

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const images = {
  // Main categories
  physicalIcon: "https://cdn-icons-png.flaticon.com/512/4006/4006511.png",
  mentalIcon: "https://cdn-icons-png.flaticon.com/512/4207/4207247.png",
  pediatricIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373178.png",
  emergencyIcon: "https://cdn-icons-png.flaticon.com/512/2091/2091441.png",
  
  // Physical subcategories
  heartIcon: "https://cdn-icons-png.flaticon.com/512/1818/1818145.png",
  lungsIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373210.png",
  bloodVesselsIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373211.png",
  bloodIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373212.png",
  bonesIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373185.png",
  jointsIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373213.png",
  spineIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373214.png",
  musclesIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373215.png",
  tendonsIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373216.png",
  ligamentsIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373217.png",
  brainIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373218.png",
  nervesIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373219.png",
  skinIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373183.png",
  hairIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373220.png",
  nailsIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373221.png",
  eyesIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373188.png",
  earsIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373222.png",
  teethIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373223.png",
  gumsIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373224.png",
  digestiveSystemIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373225.png",
  liverIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373226.png",
  kidneysIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373227.png",
  bladderIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373228.png",
  pancreasIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373229.png",
  thyroidIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373230.png",
  lymphaticSystemIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373231.png",
  immuneSystemIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373232.png",
  reproductiveSystemIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373233.png",
  
  // Mental subcategories
  anxietyIcon: "https://cdn-icons-png.flaticon.com/512/2839/2839020.png",
  stressIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373190.png",
  depressionIcon: "https://cdn-icons-png.flaticon.com/512/3590/3590601.png",
  addictionIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373195.png",
  sleepIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373198.png",
  ptsdIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373203.png",
  ocdIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373204.png",
  bipolarIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373205.png",
  schizophreniaIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373206.png",
  eatingDisorderIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373207.png",
  adhdIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373208.png",
  autismIcon: "https://cdn-icons-png.flaticon.com/512/3373/3373209.png",
};

const MedicalRiskAnalyzer = () => {
  const categories = {
    Physical: {
      icon: images.physicalIcon,
      description: "For physical health concerns and symptoms",
      subcategories: [
        { name: "Lung Issues", icon: images.lungsIcon },
        { name: "Blood Disorders", icon: images.bloodIcon },
        { name: "Muscle Pain", icon: images.musclesIcon },
        // Add other subcategories here
      ]
    }
  };

  return (
    <div className="categories-container">
      {Object.entries(categories).map(([categoryName, category]) => (
        <Card key={categoryName} className="category-card">
          <h2>{categoryName}</h2>
          <div className="subcategories">
            {category.subcategories.map(({ name, icon }) => (
              <div key={name} className="subcategory-item">
                <img src={icon} alt={name} className="subcategory-icon" />
                <span className="subcategory-name">{name}</span>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MedicalRiskAnalyzer;