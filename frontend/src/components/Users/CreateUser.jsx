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
        <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
            onClick={() => navigate('/users')}
          >
            Atrás
          </button>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-10 text-gray-800">Crear Usuario</h2>
          <form onSubmit={store} className="space-y-6">
            <div>
              <label className="form-label block text-xl font-semibold text-gray-700 mb-1">
                Nombre
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="form-control"
                required
              />
            </div>
            <div>
              <label className="form-label block text-xl font-semibold text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="form-control"
                required
              />
            </div>
            <div>
              <label className="form-label block text-xl font-semibold text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
                required
              />
            </div>
            <div>
              <label className="form-label block text-xl font-semibold text-gray-700 mb-1">
                Rol
              </label>
              <select
                id="role"
                value={selectedRole}
                onChange={handleRoleChange}
                className="form-control"
                required
              >
                <option value="">Selecciona un rol</option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div>
            <button
                    type="submit"
                    className="mt-4 btn btn-primary"
                    disabled={name === '' || email === '' || password === '' || selectedRole === ''}
                >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default CreateUser;

/**
 *         <div>
            <div className="ml-4 mt-4 w-full flex justify-start mb-6">
                <button
                    className="bg-blue-500 text-white px-8 py-6 rounded-lg hover:bg-gray-400"
                    onClick={() => navigate('/users')}
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
 */

/**
 *         <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
            onClick={() => navigate('/users')}
          >
            Atrás
          </button>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-10 text-gray-800">Crear Usuario</h2>
          <form onSubmit={store} className="space-y-6">
            <div>
              <label className="form-label block text-xl font-semibold text-gray-700 mb-1">
                Nombre
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="w-full px-4 py-2 border bg-gray-300 border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xl font-semibold text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="w-full px-4 py-2 border bg-gray-300 border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xl font-semibold text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="w-full px-4 py-2 border bg-gray-300 border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                required
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-xl font-semibold text-gray-700 mb-1">
                Rol
              </label>
              <select
                id="role"
                value={selectedRole}
                onChange={handleRoleChange}
                className="w-full px-4 py-2 border bg-gray-300 border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                required
              >
                <option value="">Selecciona un rol</option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 px-4 mt-10 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                disabled={name === '' || email === '' || password === '' || selectedRole === ''}
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
 */