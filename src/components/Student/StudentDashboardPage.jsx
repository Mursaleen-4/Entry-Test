import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import '../../styles/dashboard.css';

const DashboardPage = () => {
  const navigate = useNavigate();

  const startTest = (testName) => {
    console.log('Starting test:', testName);
    try {
      navigate(`/student/dashboard/test/${testName}`);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const handleLogout = async () => {
    console.log('Logging out...');
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log('Sign out successful');
      navigate('/student/signup');
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome to your Dashboard</h2>
      <div className="button-container">
        <button type="button" onClick={() => startTest('maths')}>Start Math Test</button>
        <button type="button" onClick={() => startTest('history')}>Start History Test</button>
        <button type="button" onClick={() => startTest('physics')}>Start Physics Test</button>
        <button type="button" onClick={() => startTest('computer')}>Start Computer Test</button>
        <button type="button" className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default DashboardPage;