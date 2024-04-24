import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Calendar from './calendar/index'
import Login from './login/'

const AppRoutes = () => {
    return (
        <BrowserRouter basename='/ambidata_PIA__frontend/'>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/Login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;



