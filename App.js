import React from "react";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import MedicalRiskAnalyzer from "./pages/MedicalRiskAnalyzer";
import Login from "./components/Login";
import ErrorBoundary from './components/ErrorBoundary';
import './styles/index.css';

const App = () => {
  const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

  if (!clerkPubKey) {
    throw new Error("Missing Publishable Key");
  }

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <ErrorBoundary>
        <div className="app-container">
          <SignedOut>
            <Login />
          </SignedOut>
          <SignedIn>
            <MedicalRiskAnalyzer />
          </SignedIn>
        </div>
      </ErrorBoundary>
    </ClerkProvider>
  );
};

export default App;