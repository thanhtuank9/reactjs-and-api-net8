import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import '../assets/Dashboard.css';
import ProductList from '../components/ProductList';
import CreateProductPage from '../components/CreateProductPage';



const Dashboard: React.FC = () => {

  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log('handleLogout called');
    try {
      // Call api logout if needed ...
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      console.log('Tokens removed, navigating to login');
      navigate('/login');
    } catch (err) {
      console.log('Logout error:', err);
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="sidebar">
        <ul>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/products/create">Create Product</Link></li>
          <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
        </ul>
      </nav>
      <div className="main-content">
        <header className="header">
          <h1>Admin Dashboard</h1>
        </header>
        <div className="content">
          <Routes>
            <Route path="/" element={<h2>Home</h2>} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/create" element={<CreateProductPage/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
