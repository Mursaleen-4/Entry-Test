import React, { useState } from 'react';
import '../../styles/login.css'; 
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Hardcoded admin credentials
  const adminName = 'Khoso';
  const adminPassword = 'admin123'; // Set your desired admin password

  const handleLogin = (e) => {
    e.preventDefault();

    // Check credentials
    if (name === adminName && password === adminPassword) {
      navigate('/admin/dashboard');
    } else {
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLoginPage;