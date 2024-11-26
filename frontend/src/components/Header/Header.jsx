import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import comilonawarelogo from '../../comilonawarelogo.png';
import { axios } from '../../axiosConfig.js';
const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
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
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error.response?.data || error.message);
    }
  };


  return (
    <header className="bg-primary flex justify-center items-center py-4">
      <button
        onClick={() => navigate('/profile')}
        className="bg-transparent text-white px-4 py-2 mr-96 text-2xl">
        Editar perfil
      </button>
      <img
        src={comilonawarelogo}
        alt="Comilonaware Logo"
        className="h-16 cursor-pointer"
        onClick={() => navigate('/')}
      />
      <button
        onClick={handleLogout}
        className="bg-transparent text-white px-4 py-2 ml-96 text-2xl">
        Cerrar sesión
      </button>
      
    </header>
  );
}

export default Header;