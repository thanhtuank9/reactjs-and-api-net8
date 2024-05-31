import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import CreateProductPage from './components/CreateProductPage';

const App: React.FC = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/products" element={<ProductsPage />} />
    <Route path="/create-product" element={<CreateProductPage />} />
  </Routes>
);

export default App;
