import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => { // Recibe setIsLoggedIn como una prop
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/login', {
                username: username,
                password: password
            });
            setError(null);
            setIsLoggedIn(true); // Marcar al usuario como autenticado
            navigate('/App');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Credenciales inválidas');
            } else {
                console.error('Error en la solicitud de inicio de sesión:', error);
            }
        }
    };

    return (
        <div className='fondo'>
            <div className='login-container'>
                <div className="login-box">
                    <div className="flex-container">
                        <div className="img-container">
                            <img className='imagen' src="/ambidata_PIA__frontend/public/6229893x2.jpg" alt="Login" />
                        </div>
                        <div className="form-container">
                            <h1 className='form-title'>User Login</h1>
                            <form className='form'>
                                <div className="input-group">
                                    <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
                                    <span className="input-icon"><i className="fas fa-user"></i></span>
                                </div>
                                <div className="input-group">
                                    <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                                    <span className="input-icon"><i className="fas fa-lock"></i></span>
                                </div>
                                {error && <div className="error-message">{error}</div>}
                                <button className='form-button' type="button" onClick={handleLogin}>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
