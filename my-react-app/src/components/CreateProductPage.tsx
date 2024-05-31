import React from 'react';
import CreateProductForm from './CreateProductForm';
import { Link } from 'react-router-dom';

const CreateProductPage: React.FC = () => (
  <div>
    <h1>Create Product Page</h1>
    <Link to="/products">List Products</Link>
    <CreateProductForm />
  </div>
);

export default CreateProductPage;
