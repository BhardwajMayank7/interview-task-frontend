import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    mobile: "",
    age: "",
    contact: "",
    website: "",
    interests: "",
    hobbies: "",
  });

  const navigate = useNavigate();

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
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Registration successful, navigate to login page
        navigate("/login"); // Navigate to the login page
      } else {
        // Registration failed, handle error
        console.error("Registration failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
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
        <div className="mb-3">
          <label htmlFor="mobile" className="form-label">
            Mobile
          </label>
          <input
            type="text"
            className="form-control"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            type="number"
            className="form-control"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contact" className="form-label">
            Contact
          </label>
          <input
            type="text"
            className="form-control"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="website" className="form-label">
            Website
          </label>
          <input
            type="text"
            className="form-control"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="interests" className="form-label">
            Interests
          </label>
          <input
            type="text"
            className="form-control"
            id="interests"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="hobbies" className="form-label">
            Hobbies
          </label>
          <input
            type="text"
            className="form-control"
            id="hobbies"
            name="hobbies"
            value={formData.hobbies}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
      <div className="mt-3">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default RegistrationForm;
