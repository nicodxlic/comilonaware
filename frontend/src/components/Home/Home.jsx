import React from 'react';
import { useNavigate } from 'react-router-dom';
import { axios } from '../../axiosConfig.js';
import Swal from 'sweetalert2';

const Home = () => {
    const role = localStorage.getItem('role')
    const navigate = useNavigate();

    const handleEnter = () => {
        if(role === 'Admin'){
            navigate('/users');
        }
        if(role === 'Chef'){
            navigate('kitchen')
        }
        if(role === 'Mozo'){
            navigate('orders')
        }
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogout = async () => {
        Swal.fire({
            title: 'Cargando...',
            text: 'Por favor espera',
            allowOutsideClick: false, // Evita que el usuario cierre el loader clickeando fuera del modal
            didOpen: () => {
              Swal.showLoading(); // Activa el spinner
            }
        })
        try {
            await axios.post('http://localhost:8000/api/logout'); 
            let emptyuser = localStorage.getItem('user')
            let emptyrole = localStorage.getItem('role')
            if (emptyrole === null || emptyuser === null) {
              alert('Error: No se ha iniciado sesión.')
              navigate('/login')
              return
            }
            localStorage.removeItem('user');
            localStorage.removeItem('role');
            Swal.fire({
                icon: 'success',
                title: '¡Sesión cerrada con éxito!',
                text: 'Para volver a tener acceso, debes iniciar sesión',
              })
            navigate('/');
          } catch (error) {
            console.error('Error al cerrar sesión:', error.response?.data || error.message);
          }
    };

    return (
        <div>
            <div className="ml-4 mt-4 w-full flex justify-start mb-6">
            </div>
            <h1>Bienvenido a ComilonaWare</h1>
            <button className='bg-green-500 mt-8 text-white px-8 py-6 rounded-lg hover:bg-gray-400' onClick={() => navigate('/menu')}>Ver menu</button>
            <br/>
            {role ? (
                    <button className='bg-blue-500 text-white px-8 py-6 rounded-lg hover:bg-gray-400 mt-4' onClick={handleEnter}>Entrar al sitio</button>
                ) : (
                    <button className='bg-blue-500 text-white px-8 py-6 rounded-lg hover:bg-gray-400 mt-4' onClick={handleLogin}>Iniciar Sesión</button>
                )}
            <br/>
            {role ? (<button className='bg-red-500 text-white px-8 py-6 rounded-lg hover:bg-gray-400 mt-4' onClick={handleLogout}>Cerrar sesión</button>) : ('')}
        </div>
    );
};

export default Home;