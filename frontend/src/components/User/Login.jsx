import React, { useState } from 'react';
import { axios } from '../../axiosConfig.js';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = ({ setAuthenticated }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        Swal.fire({
            title: 'Cargando...',
            text: 'Por favor espera',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            }
          })
        try {
            await axios.get('/sanctum/csrf-cookie');
            const response = await axios.post('http://localhost:8000/api/login', {
                email: email,
                password: password
            });
            console.log('Respuesta recibida:', response.data);
            const role = response.data.role
            localStorage.setItem('user', JSON.stringify({email: email, password: password}))
            localStorage.setItem('id', response.data.user.id)
            localStorage.setItem('role', role)
            Swal.close()
            if (role === 'Admin') {
                navigate('/orders')
            } else if (role === 'Chef') { 
                navigate('/kitchen')
            } else if (role === 'Mozo') {
                navigate('/orders')
            }

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error. Por favor, verifique si las credenciales son correctas.',
            });
            console.error('Error en la solicitud:', error.response?.data || error.message);
            return
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white to-gray-400">
        <div className="bg-white shadow-2xl rounded-xl p-10 max-w-md w-full">
          <h2 className="text-3xl font-extrabold text-center mb-14 text-gray-800">Iniciar Sesión</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-xl font-semibold text-gray-700 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-transparent transition duration-200"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
  
            <div>
              <label htmlFor="password" className="block text-xl font-semibold text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-transparent transition duration-200 mb-4"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
  
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-100 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Ingresar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default Login;

/**
 *         <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">Iniciar Sesión</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    
                    <div>
                        <label htmlFor="email" className="block text-xl font-medium text-gray-600">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none"
                            placeholder="ejemplo@correo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required/>
                    </div>

            
                    <div>
                        <label htmlFor="password" className="block text-xl font-medium text-gray-600 mt-8">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required/>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
                            Ingresar
                        </button>
                    </div>
                </form>
            </div>
        </div>
 */