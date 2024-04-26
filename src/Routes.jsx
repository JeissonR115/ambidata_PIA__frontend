import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import Calendar from './calendar/index';
import Login from './login/';

const AppRoutes = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Estado para controlar si el usuario está autenticado

    // Componente de ruta privada
    const PrivateRoute = ({ element, ...rest }) => {
        return isLoggedIn ? element : <Navigate to="/login" />;
    };

    return (
        <BrowserRouter basename='/ambidata_PIA__frontend/'>
            <Routes>
                {/* Rutas públicas */}
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

                {/* Rutas protegidas */}
                <Route path="/App/*" element={<PrivateRoute element={<App setIsLoggedIn={setIsLoggedIn} />} />} />
                <Route path="/calendar" element={<PrivateRoute element={<Calendar />} />} />
                
                {/* Redireccionamiento por defecto */}
                <Route path="/*" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
