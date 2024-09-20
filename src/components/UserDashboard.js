// src/components/UserDashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/userDashboard.css";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setError("User ID not found in local storage.");
        return;
      }

      try {
        const response = await axios.get(`/api/auth/user/profile/${userId}`);
        setUser(response.data);
        setUsername(response.data.username);
        setEmail(response.data.email);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Failed to fetch user profile.");
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async () => {
    const userId = localStorage.getItem("userId");

    try {
      const response = await axios.put(`/api/auth/user/profile/${userId}`, {
        username,
        email,
      });
      setSuccess("Profile updated successfully");
      setUser(response.data.user);
    } catch (error) {
      setError("Failed to update profile");
      console.error("Error updating profile:", error);
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>User Dashboard</h1>
      <div>
        <h2>Profile Information</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <button onClick={handleUpdateProfile}>Update Profile</button>
        {success && <p className="success-message">{success}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
      {/* Add a section here to show past submissions or interactions */}
    </div>
  );
};

export default UserDashboard;
