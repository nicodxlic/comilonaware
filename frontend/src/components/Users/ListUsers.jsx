import React, { useEffect, useState } from 'react';
import { axios } from '../../axiosConfig.js';
import UserCard from './UserCard.jsx';
import { useNavigate } from 'react-router-dom';
import FooterAdmin from '../Footer/FooterAdmin.jsx';
import Swal from "sweetalert2"

const endpoint = 'http://localhost:8000/api'

const ListUsers = () => {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    const role = localStorage.getItem('role')
    if(role !== 'Admin'){
        Swal.fire({
            icon: 'error',
            title: '¡No tienes los permisos!',
            text: 'debes tener el rol correspondiente a esta pantalla',
          })
        navigate('/')
    }

    const getAllUsers = async () => {
        Swal.fire({
            title: 'Cargando...',
            text: 'Por favor espera',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            }
          })
        await axios.get('/sanctum/csrf-cookie');
        const response = await axios.get(`${endpoint}/users`)
        setUsers(response.data)
        Swal.close()
    }
    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <div>
            <h1>Lista de usuarios</h1>
            <button
              onClick={() => navigate('/create-user')}
              className="mt-4 mb-8 bg-green-700 text-white px-8 py-4 rounded-lg mr-2"
            >
              Crear usuario
            </button>
            <div className="grid lg:grid-cols-5"> {/* div de usuarios */}
                {users.length > 0 ? (
                    users.map(user => (
                        <UserCard
                        name = {user.name}
                        email = {user.email}
                        id = {user.id}
                        role = {user.roles[0].name}
                        getAllUsers={getAllUsers}
                        />
                    ))
                ) : (
                    <p>No se han encontrado usuarios</p>
                )}
            </div>
            <FooterAdmin/>
        </div>
    )
}

export default ListUsers