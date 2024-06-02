import React, { useState } from 'react';
import { createProduct } from '../services/api';

const CreateProductForm: React.FC = () => {
  const [productName, setProductName] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await createProduct(productName, quantity);
      if (data.status === 0 ) { // TODO : check more statuses  here ....
        console.log('Log: ' + data.data);
        setMessage('Product created successfully');
      } else if(data.status == -1){
        // Do something ...
        setMessage(data.detail);
      } else if(data.status == -2){
        // Do something ...
        setMessage(data.detail);
      } else {
        setMessage(data.detail);
      }
    } catch (err) {
      setMessage(err.detail);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Product</h2>
      {message && <p style={{ color: message.startsWith('Product') ? 'green' : 'red' }}>{message}</p>}
      <div>
        <label>Product Name:</label>
        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
      </div>
      <div>
        <label>Quantity:</label>
        <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateProductForm;
