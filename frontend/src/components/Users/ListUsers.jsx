import React, { useEffect, useState } from 'react';
import { axios } from '../../axiosConfig.js';
import UserCard from './UserCard.jsx';
import { useNavigate } from 'react-router-dom';
import FooterAdmin from '../Footer/FooterAdmin.jsx';
import Swal from "sweetalert2";
import Header from '../Header/Header.jsx';

const endpoint = 'http://localhost:8000/api';

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el buscador
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  if (role !== 'Admin') {
    Swal.fire({
      icon: 'error',
      title: '¡No tienes los permisos!',
      text: 'Debes tener el rol correspondiente a esta pantalla',
    });
    navigate('/');
  }

  const getAllUsers = async () => {
    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor espera',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    await axios.get('/sanctum/csrf-cookie');
    const response = await axios.get(`${endpoint}/users`);
    setUsers(response.data);
    Swal.close();
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // Filtrar usuarios según el término de búsqueda
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mb-20"> {/* Contenedor relativo para posicionar el buscador */}
      <Header />
      <div className="absolute top-24 right-0 mt-4 mr-8"> {/* Posicionar buscador */}
        <input
          type="text"
          placeholder="Buscar usuarios"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64 p-3 border border-gray-300 rounded-md"
        />
      </div>
      <h1 className="text-center text-4xl font-bold mt-8">Lista de usuarios</h1>
      <button
        onClick={() => navigate('/create-user')}
        className="mt-4 mb-8 bg-green-600 text-white px-8 py-4 rounded-lg mr-2 hover:bg-green-700"
      >
        Crear usuario
      </button>
      <div className="grid lg:grid-cols-5 gap-y-6"> {/* div de usuarios */}
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserCard
              key={user.id} // Añadir key única
              name={user.name}
              email={user.email}
              id={user.id}
              role={user.roles[0].name}
              getAllUsers={getAllUsers}
            />
          ))
        ) : (
          <p>No se han encontrado usuarios</p>
        )}
      </div>
      <FooterAdmin />
    </div>
  );
};

export default ListUsers;
