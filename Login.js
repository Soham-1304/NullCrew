import React from 'react';
import { SignIn } from "@clerk/clerk-react";
import { Card, CardContent } from './ui/Card.jsx';

const Login = () => {
  return (
    <div className="login-container">
      <Card className="login-card">
        <CardContent>
          <div className="login-header">
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Sign in to access your health dashboard</p>
          </div>
          
          <SignIn 
            appearance={{
              elements: {
                formButtonPrimary: 'login-button',
                card: 'clerk-card',
                rootBox: 'clerk-root',
                socialButtonsBlockButton: 'social-button'
              },
              variables: {
                colorPrimary: '#2563eb',
                colorTextOnPrimaryBackground: 'white',
              }
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;