import React, { useEffect, useState } from 'react';
import { axios } from '../../axiosConfig.js';
import FooterAdmin from '../Footer/FooterAdmin.jsx';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const endpoint = 'http://localhost:8000/api';

const CreateUser = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [roles, setRoles] = useState(['Admin', 'Mozo', 'Chef']);
    const [selectedRole, setSelectedRole] = useState('');

    useEffect(() => {
        const role = localStorage.getItem('role');
        if (role !== 'Admin') {
            Swal.fire({
                icon: 'error',
                title: '¡No tienes los permisos!',
                text: 'Debes tener el rol correspondiente para acceder a esta pantalla.',
            });
            navigate('/');
        }
    }, [navigate]);

    const handleRoleChange = (e) => {
        e.preventDefault()
        setSelectedRole(e.target.value);
    };

    const store = async (e) => {
        e.preventDefault()
        if (name === '' || password === '' || email === '' || selectedRole === 0) {
            Swal.fire({
                icon: 'error',
                title: '¡No completaste todos los campos!',
                text: 'Debes completar todos los campos para poder continuar',
            });
        } else {
            Swal.fire({
                title: 'Cargando...',
                text: 'Por favor espera',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });
            try {
                const response = await axios.post(`${endpoint}/user`, {
                    name,
                    email,
                    password,
                    role: selectedRole,
                });
    
                console.log('Respuesta del servidor:', response);
    
                if (response.status === 201 && response.data.success) {
                    Swal.close();
                    Swal.fire({
                        icon: 'success',
                        title: 'Usuario creado',
                        text: 'El usuario se creó correctamente.',
                    });
                    navigate('/users');
                } else {
                    throw new Error('La creación del usuario no fue exitosa.');
                }
            } catch (error) {
                Swal.close();
                console.error('Error al crear el usuario:', error);
    
                if (error.response && error.response.data) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al crear el usuario',
                        text: error.response.data.message || 'Ocurrió un error desconocido. Verifica los datos enviados.',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error de red',
                        text: 'No se pudo conectar con el servidor. Verifica tu conexión o el endpoint.',
                    });
                }
            }
        }
    };
    

    return (
        <div>
            <div className="ml-4 mt-4 w-full flex justify-start mb-6">
                <button
                    className="bg-blue-500 text-white px-8 py-6 rounded-lg hover:bg-gray-400"
                    onClick={() => navigate('/products')}
                >
                    Atrás
                </button>
            </div>
            <form onSubmit={store} className="ml-12 mr-12">
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Rol</label>
                    <select
                        value={selectedRole}
                        onChange={handleRoleChange}
                        className="form-control"
                    >
                        <option value="">Selecciona un rol</option>
                        {roles.map((role) => (
                            <option key={role} value={role}>
                                {role}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="mt-4 btn btn-primary"
                    disabled={name === '' || email === '' || password === '' || selectedRole === ''}
                >
                    Guardar
                </button>
            </form>
        </div>
    );
};

export default CreateUser;