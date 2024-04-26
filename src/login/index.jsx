import React, { Component } from 'react';
import axios from 'axios';
import './styles.css';
import arbolitoSVG from '/arbolito.svg';
import Redirect from 'react-dom/client'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: ''
        };
    }

    handleUsernameChange = (e) => {
        this.setState({ username: e.target.value });
    }

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }

    handleLogin = async () => {
        const { username, password } = this.state;
        try {
            const response = await axios.post('http://localhost:3000/login', {
                username: username,
                password: password
            });
            this.setState({ error: null, redirectToRoot: true });
            console.log(response.data); // Manejar la respuesta del servidor según sea necesario
        } catch (error) {
            this.setState({ error: 'Credenciales inválidas' });
            console.error('Error en la solicitud de inicio de sesión:', error);
        }
    };

    render() {
        const { username, password, error,redirectToRoot} = this.state;
        if (redirectToRoot) {
            return <Redirect to="/ambidata_PIA__frontend" />;
        }
        return (
        <div className='fondo'>
            {/*<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"></link>*/}
            <div className='login-container'>
                <div className="login-box">
                    <div className="flex-container">
                        <div className="arbolito-container">
                            {/* <img src={arbolitoSVG} alt="Árbol Genealógico" className="arbolito-svg" /> */}
                            <img className='imagen' src="/ambidata_PIA__frontend/public/6229893x2.jpg"></img>
                        </div>
                        <div className="form-container">
                            <h1 className='form-title'>User Login</h1>
                            <form className='form'>
                                <div className="input-group">
                                    <input type="text" placeholder="Username" value={username} onChange={this.handleUsernameChange} />
                                    <span className="input-icon"><i className="fas fa-user"></i></span>
                                </div>
                                <div className="input-group">
                                    <input type="password" placeholder="Password" value={password} onChange={this.handlePasswordChange} />
                                    <span className="input-icon"><i className="fas fa-lock"></i></span>
                                </div>
                                {error && <div className="error-message">{error}</div>}
                                <button className='form-button' type="button" onClick={this.handleLogin}>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default Login;
