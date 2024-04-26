import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles.css"
const Logout = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <button className='button--logout' onClick={handleLogout}>Logout</button>
    );
};

export default Logout;
