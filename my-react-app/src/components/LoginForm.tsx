import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import '../assets/login.css';


const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await login(username, password);
      if(data.status == 0){ 
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        navigate('/products');
      } else if(data.status == -1){
        // Do something ...
        setError(data.detail);
      } else if(data.status == -2){
        // Do something ...
        setError(data.detail);
      }
      else { // TODO : check more statuses  here ....
        setError(data.detail);
      }
    } catch (err) {
      setError(err.detail);
    }
  };

  return (
    <div className='login-container'>
      <form onSubmit={handleLogin}>
        <h2>Login</h2> <i>(admin / admin)</i>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
