import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/adminDashboard.css";

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if no token
    }

    const fetchPendingEmployees = async () => {
      try {
        const res = await axios.get("/api/auth/employees/pending", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployees(res.data);
      } catch (error) {
        console.error("Error fetching pending employees:", error);
        navigate("/login"); // Redirect to login if not authorized
      }
    };
    fetchPendingEmployees();
  }, [navigate]);

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `/api/auth/approve-employee/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEmployees(employees.filter((emp) => emp._id !== id));
    } catch (error) {
      console.error("Error approving employee:", error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <h2>Pending Employee Registrations</h2>
      <ul>
        {employees.map((emp) => (
          <li key={emp._id}>
            {emp.username} ({emp.email}) - {emp.position}
            <button onClick={() => handleApprove(emp._id)}>Approve</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
