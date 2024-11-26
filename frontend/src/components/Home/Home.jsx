import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div>
            <div className="ml-4 mt-4 w-full flex justify-start mb-6">
            </div>
            <h1>Bienvenido a ComilonaWare</h1>
            <button className='bg-blue-500 text-white px-8 py-6 rounded-lg hover:bg-gray-400' onClick={handleLogin}>Iniciar Sesión</button>
            <br/>
            <button className='bg-green-500 mt-8 text-white px-8 py-6 rounded-lg hover:bg-gray-400' onClick={() => navigate('/menu')}>Ver menu</button>
        </div>
    );
};

export default Home;