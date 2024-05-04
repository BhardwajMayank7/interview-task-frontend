import React, { useState, useEffect } from "react";

function LoginForm({ handleLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [selectedFile, setSelectedFile] = useState(null); // State to store selected file
  const [loggedIn, setLoggedIn] = useState(false); // State to track if user is logged in
  const [userData, setUserData] = useState(null); // State to store user data

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        // Login successful
        console.log("Login successful:", data.message);
        setLoggedIn(true); // Update loggedIn state
        fetchUserProfile(data.token, formData.email); // Fetch user profile data
      } else {
        // Login failed, handle error
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // Function to fetch user profile data
  const fetchUserProfile = async (token, email) => {
    try {
      const response = await fetch(
        `http://localhost:3000/profile?email=${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userData = await response.json();
      if (response.ok) {
        // User profile fetched successfully
        console.log("User profile:", userData);
        setUserData(userData); // Update userData state
      } else {
        // Error fetching user profile
        console.error("Error fetching user profile:", userData.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // Function to handle file selection
  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            {!loggedIn && (
              <div>
                <h2 className="mb-4 text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Login
                  </button>
                </form>
              </div>
            )}
            {loggedIn && userData && (
              <div>
                <h2 className="mb-4 text-center">Profile</h2>
                <div className="text-center mb-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="form-control mb-3 w-50 mx-auto"
                  />
                  {selectedFile && (
                    <div>
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Selected"
                        className="img-fluid mb-3"
                        style={{ maxWidth: "200px" }}
                      />
                    </div>
                  )}
                </div>
                <div className="text-left">
                  <p>
                    <strong>Username:</strong> {userData.username}
                  </p>
                  <p>
                    <strong>Email:</strong> {userData.email}
                  </p>
                  <p>
                    <strong>Mobile:</strong> {userData.mobile}
                  </p>
                  <p>
                    <strong>Age:</strong> {userData.age}
                  </p>
                  <p>
                    <strong>Contact:</strong> {userData.contact}
                  </p>
                  <p>
                    <strong>Website:</strong> {userData.website}
                  </p>
                  <p>
                    <strong>Interests:</strong> {userData.interests}
                  </p>
                  <p>
                    <strong>Hobbies:</strong> {userData.hobbies}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
