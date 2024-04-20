// index.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';
import arbolitoSVG from '/public/arbolito.svg';

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
            setError(null);
            alert("Inicio de sesión correcto");
            console.log(response.data); // Manejar la respuesta del servidor según sea necesario
        } catch (error) {
            setError('Credenciales inválidas');
            console.error('Error en la solicitud de inicio de sesión:', error);
        }
    };

    return (
        <div className='login-container'>
    <div className="login-box">
        <div className="flex-container">
            <div className="arbolito-container">
                <img src={arbolitoSVG} alt="Árbol Genealógico" className="arbolito-svg" />
            </div>
            <div className="form-container">
                <h2>Login</h2>
                <form>
                    <div className="input-group">
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <span className="input-icon"><i className="fas fa-user"></i></span>
                    </div>
                    <div className="input-group">
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <span className="input-icon"><i className="fas fa-lock"></i></span>
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="button" onClick={handleLogin} style={{ color: 'black' }}>Login</button>

                </form>
            </div>
        </div>
    </div>
</div>

    );
};

export default Login;
