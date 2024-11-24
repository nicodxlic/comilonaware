import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div>
            <h1>Bienvenido a ComilonaWare</h1>
            <button onClick={handleLogin}>Iniciar Sesión</button>
        </div>
    );
};

export default Home;