import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import '../../styles/dashboard.css';

const DashboardPage = () => {
  const navigate = useNavigate();

  const startTest = (testName) => {
    navigate(`test/${testName}`);
  };

  const logout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate('/student/signup'); // Navigate to the sign-up page after logout
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome to your Dashboard</h2>
      <button onClick={() => startTest('maths')}>Start Math Test</button>
      <button onClick={() => startTest('history')}>Start History Test</button>
      <button onClick={() => startTest('physics')}>Start Physics Test</button>
      <button onClick={() => startTest('computer')}>Start Computer Test</button>
      <button className="logout-button" onClick={logout}>Logout</button>
    </div>
  );
};

export default DashboardPage;