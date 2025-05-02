import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignupPage from './components/Student/SignupPage';
import LoginPage from './components/Student/StudentLoginPage';
import DashboardPage from './components/Student/StudentDashboardPage';
import TestPage from './components/Student/TestPage';
import AdminLoginPage from './components/Admin/AdminLoginPage';
import AdminDashboardPage from './components/Admin/AdminDashboardPage';
import StudentDetails from './components/Admin/StudentDetails';

function App() {
  return (
    <Routes>
      {/* Redirect default route to signup page */}
      <Route path="/" element={<Navigate to="/student/signup" />} />

      {/* Student Routes */}
      <Route path="/student/signup" element={<SignupPage />} />
      <Route path="/student/login" element={<LoginPage />} />
      <Route path="/student/dashboard" element={<DashboardPage />} />
      <Route path="/student/dashboard/test/:subject" element={<TestPage />} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      <Route path="/admin/student-details/:email" element={<StudentDetails />} />
    </Routes>
  );
}

export default App;