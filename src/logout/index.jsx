import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles.css"
import { IoMdLogOut } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
const Logout = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <button className='button--logout' onClick={handleLogout}><IoMdLogOut size={30}  /></button>
    );
};

export default Logout;
