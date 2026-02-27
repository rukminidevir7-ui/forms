// App.jsx
import React, { useState } from 'react';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import './App.css';

function App() {
  // Simple authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="app-container">
      {isAuthenticated ? (
        <HomePage onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;