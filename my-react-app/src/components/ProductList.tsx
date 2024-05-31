import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  productName: string;
  quantity: number;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts('', 10, 1);
        setProducts(data.products);
      } catch (err) {
        setError(err.errorMessages);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <Link to="/create-product">Create New Product</Link>
      <h2>Product List</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table className='styled-table'>
        <tbody>
        {products.map(product => (
          <tr className='{product.id}'>
            <td>{product.productName}</td>
            <td>{product.quantity}</td>
          </tr>
          // <li key={product.id}>{product.productName} - {product.quantity}</li>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
