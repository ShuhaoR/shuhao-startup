// frontend/src/components/AdminReviewHours.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminReviewHours = () => {
  const [workHours, setWorkHours] = useState([]);
  const [hours, setHours] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchWorkHours = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("/api/admin/review-hours", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWorkHours(response.data);
      } catch (error) {
        console.error("Error fetching work hours:", error);
      }
    };

    fetchWorkHours();
  }, []);

  const handleModifyHours = async (employeeId, workHourId) => {
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `/api/admin/modify-hours/${employeeId}`,
        { workHourId, hours },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess("Work hours modified successfully");
    } catch (error) {
      setError("Failed to modify work hours");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Admin Review and Modify Work Hours</h1>
      <ul>
        {workHours.map((employee) => (
          <li key={employee.employeeId}>
            <h3>{employee.username}</h3>
            <ul>
              {employee.workHours.map((wh) => (
                <li key={wh._id}>
                  {new Date(wh.date).toLocaleDateString()}: {wh.hours} hours
                  <input
                    type="number"
                    placeholder="Modify hours"
                    onChange={(e) => setHours(e.target.value)}
                  />
                  <button
                    onClick={() =>
                      handleModifyHours(employee.employeeId, wh._id)
                    }
                  >
                    Modify
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default AdminReviewHours;
