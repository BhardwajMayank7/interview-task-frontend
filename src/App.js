import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Import components
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import Profile from "./components/Profile";
import UploadPhoto from "./components/UploadPhoto";

function App() {
  // Define state for user authentication
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // Function to handle user login
  const handleLogin = (userData) => {
    // Set user data and login status
    setUserData(userData);
    setIsLoggedIn(true);
  };

  // Function to handle user logout
  const handleLogout = () => {
    // Clear user data and logout
    setUserData(null);
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route
            path="/login"
            element={<LoginForm handleLogin={handleLogin} />}
          />
          <Route
            path="/profile"
            element={
              isLoggedIn ? (
                <Profile userData={userData} handleLogout={handleLogout} />
              ) : (
                <LoginForm handleLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/upload-photo"
            element={
              isLoggedIn ? (
                <UploadPhoto />
              ) : (
                <LoginForm handleLogin={handleLogin} />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
