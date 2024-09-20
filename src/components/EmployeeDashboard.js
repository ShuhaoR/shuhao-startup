import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/employeeDashboard.css";

const EmployeeDashboard = () => {
  const [workHours, setWorkHours] = useState([]);
  const [hours, setHours] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchWorkHours = async () => {
      const employeeId = localStorage.getItem("employeeId");
      try {
        const response = await axios.get(`/api/employee/hours/${employeeId}`);
        setWorkHours(response.data);
      } catch (error) {
        console.error("Error fetching work hours:", error);
      }
    };

    fetchWorkHours();
  }, []);

  const handleLogHours = async () => {
    const employeeId = localStorage.getItem("employeeId");

    if (!hours || hours <= 0) {
      setError("Please enter valid hours");
      return;
    }

    try {
      await axios.post("/api/employee/log-hours", {
        employeeId,
        date: new Date(),
        hours,
      });
      setSuccess("Work hours logged successfully");
      setHours("");
    } catch (error) {
      setError("Failed to log work hours");
      console.error(error);
    }
  };

  return (
    <div className="employee-dashboard">
      <h1>Employee Dashboard</h1>
      <div>
        <h2>Log Work Hours</h2>
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          placeholder="Hours worked"
        />
        <button onClick={handleLogHours}>Log Hours</button>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
      <div>
        <h2>This Week's Work Hours</h2>
        <ul>
          {workHours.map((wh, index) => (
            <li key={index}>
              {new Date(wh.date).toLocaleDateString()}: {wh.hours} hours
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
