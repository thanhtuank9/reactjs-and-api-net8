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
      <h2>Product List</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table className='styled-table'>
        <tbody>
          <tr>
          <td className='text-bold'>Product Name</td>
            <td className='text-bold'>Quantity</td>
          </tr>
        {products.map(product => (
          <tr key={product.id} className='{product.id}'>
            <td>{product.productName}</td>
            <td>{product.quantity}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
