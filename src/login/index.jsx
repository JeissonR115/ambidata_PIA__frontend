// crea una interfas de login en react que utilize el postimport React, { useState } from 'react';
import React, { useState } from 'react';
import axios from 'axios';
import './styles.css'
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        username: username,
        password: password
      });
      setError(null)
      alert("inicio de sesión correcto")
      console.log(response.data); // Manejar la respuesta del servidor según sea necesario
    } catch (error) {
      setError('Credenciales inválidas');
      console.error('Error en la solicitud de inicio de sesión:', error);
    }
  };

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
