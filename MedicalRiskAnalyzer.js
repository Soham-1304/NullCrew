import React, { useState } from "react";
import { Card } from "./components/ui/card"; 
import { Button } from "../components/ui/button";  
 
const MedicalRiskAnalyzer = () => {
  const [step, setStep] = useState("start");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");

  const handleCategorySelect = (type) => {
    setCategory(type);
    setStep("subCategory");
  };

  const handleSubCategorySelect = (sub) => {
    setSubCategory(sub);
    setStep("chat");
    setChat([{ sender: "user", text: `I am having a problem with my ${sub}` }]);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    setChat([...chat, { sender: "user", text: input }]);
    setInput("");
    setTimeout(() => {
      setChat((prevChat) => [...prevChat, { sender: "bot", text: "Tell me more about your symptoms." }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-400 p-6">
      {step === "start" && (
        <Card className="p-6 text-center">
          <h1 className="text-3xl font-bold">AI-Powered Medical Risk Analyzer</h1>
          <p className="text-gray-700 mt-2">Choose your health concern type</p>
          <div className="flex gap-4 mt-4">
            <Button onClick={() => handleCategorySelect("Physical")}>Physical</Button>
            <Button onClick={() => handleCategorySelect("Mental")}>Mental</Button>
          </div>
        </Card>
      )}
      {step === "subCategory" && (
        <Card className="p-6 text-center">
          <h2 className="text-2xl font-bold">Select your specific issue</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {(category === "Physical" ? ["Stomach Ache", "Heart Pain", "Fever"] : ["Anxiety", "Stress", "Depression"]).map((item) => (
              <Button key={item} onClick={() => handleSubCategorySelect(item)}>{item}</Button>
            ))}
          </div>
        </Card>
      )}
      {step === "chat" && (
        <Card className="p-6 w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center">Chat with AI</h2>
          <CardContent className="h-80 overflow-auto border p-4 bg-white rounded mt-4">
            {chat.map((message, index) => (
              <p key={index} className={`mb-2 ${message.sender === "user" ? "text-right text-blue-600" : "text-left text-gray-800"}`}>{message.text}</p>
            ))}
          </CardContent>
          <div className="flex gap-2 mt-4">
            <input
              className="flex-1 border p-2 rounded"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default MedicalRiskAnalyzer;
