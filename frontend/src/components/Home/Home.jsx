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

    const handleMenu = () => {
        navigate('/menu');
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

    function FeatureIcon({ text }) {
        return (
          <div className="flex flex-col items-center">
            <span className="text-2xl font-semibold text-white">{text}</span>
          </div>
        )
      }


    return (
        <div className="min-h-screen bg-cyan-600 flex flex-col items-center justify-center p-4 font-sans">
        <main className="text-center mt-4">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-4">
            ComilonaWare
          </h1>
          <p className="text-xl md:text-3xl text-white max-w-2xl mx-auto mb-16 mt-10">
            Sistema para la gestión interna de su restaurante.
          </p>
          <div className="flex justify-center space-x-16 mb-18">
          {role ? (
                    <button className='bg-green-600 text-white px-8 py-6 rounded-lg hover:bg-green-700 mt-4 font-bold transition duration-300' onClick={handleEnter}>Entrar al sitio</button>
                ) : (
                    <button className='bg-blue-900 text-white px-8 py-6 rounded-lg hover:bg-blue-950 mt-4 font-bold transition duration-300' onClick={handleLogin}>Iniciar Sesión</button>
                )}
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 mt-4 rounded-lg transition duration-300" onClick={handleMenu}>
              Menú
            </button>
            {role ? (<button className='bg-red-500 text-white px-8 py-6 rounded-lg hover:bg-red-700 mt-4 font-bold transition duration-300' onClick={handleLogout}>Cerrar sesión</button>) : ('')}
          </div>
          
          <div className="flex justify-center space-x-16 mt-20">
            <div className="flex flex-col items-center">
              <img src="table.png" alt="tableIcon" className="w-40 h-40 mb-4" />
              <FeatureIcon text="Gestión de Mesas" />
            </div>
            <div className="flex flex-col items-center">
              <img src="currency.png" alt="currencyIcon" className="w-40 h-40 mb-4" />
              <FeatureIcon text="Registro de Pagos" />
            </div>
            <div className="flex flex-col items-center">
              <img src="user.png" alt="userIcon" className="w-40 h-40 mb-4" />
              <FeatureIcon text="Administración de usuarios" />
            </div>
          </div>

        </main>
        <footer className="mt-96 text-white">
          © 2024 ComilonaWare.
        </footer>
      </div>
    );
};

export default Home;