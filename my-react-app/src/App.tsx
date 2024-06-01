import React from 'react';
import { BrowserRouter as Router, Routes, Route , Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import { isAuthenticated } from './utils/auth';

const App: React.FC = () => (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/" element={<Navigate to={isAuthenticated() ? "/products" : "/login"} replace />} />
      </Routes>
);

export default App;
