import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/admin.css';

const AdminDashboardPage = () => {
  const navigate = useNavigate();

  const viewStudentDetails = (email) => {
    navigate(`/admin/student-details/${email}`);
  };

  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard</h2>
      <button onClick={() => viewStudentDetails('student@example.com')}>View Results</button>
    </div>
  );
};

export default AdminDashboardPage;