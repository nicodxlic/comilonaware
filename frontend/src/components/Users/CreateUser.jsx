import React, {useEffect, useState} from 'react';
import {axios} from '../../axiosConfig.js';
import FooterAdmin from '../Footer/FooterAdmin.jsx';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';

const CreateUser = () => {
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
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [roles, setRoles] = useState([])
    const [selectedRole, setSelectedRole] = useState(0)

    const handleRoleChange = (e) => {
        e.preventDefault()
        setSelectedRole(e.target.value)
    }

    const store = async () => {
        if(name === '' || password === '' || 
        email === '' || selectedRole === 0){
            Swal.fire({
              icon: 'error',
              title: '¡No completaste todos los campos!',
              text: 'debes completar todos los campos para poder continuar',
            })
        } else{
            Swal.fire({
                title: 'Cargando...',
                text: 'Por favor espera',
                allowOutsideClick: false, // Evita que el usuario cierre el loader clickeando fuera del modal
                didOpen: () => {
                  Swal.showLoading(); // Activa el spinner
                }
            })
            try{
                const response = ''
            } catch(error){
                Swal.close()
                Swal.fire('Error', 
                'Ocurrió un error al guardar el pedido.', 'error')
            }
        }
    }

    return(
        <div>
            <div className="ml-4 mt-4 w-full flex justify-start mb-6">
            <button
                className="bg-blue-500 text-white px-8 py-6 rounded-lg hover:bg-gray-400"
                onClick={() => navigate('/products')}
            >
                Atrás
            </button>
            </div>
            <form onSubmit={store} className='ml-12 mr-12'>
            <div className='mb-3'>
                <label className='form-label'>Nombre</label>
                <input
                    value={name}
                    onChange={ (e)=> setName(e.target.value)}
                    type='text'
                    className='form-control'
                />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Email</label>
                <input
                    value={email}
                    onChange={ (e)=> setEmail(e.target.value)}
                    type='text'
                    className='form-control'
                />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Contraseña</label>
                <input
                    value={password}
                    onChange={ (e)=> setPassword(e.target.value)}
                    type='password'
                    className='form-control'
                />
            </div>
            {/* SELECT CON LOS ROLES */}
            <div>
                <label className='form-label'>Rol</label>
                <br/>
                <select
                value={"Admin"}
                onChange={(e) => handleRoleChange(e)}
                className="text-center"
                >
                    <option value="Admin">Admin</option>
                    <option value="Mozo">Mozo</option>
                    <option value="Chef">Chef</option>
                </select>
            </div>
            <button 
            type='submit' 
            className='mt-4 btn btn-primary'
            disabled={name === '' || 
            email === '' || 
            password === '' ||
            selectedRole === ''}
            >Guardar</button>
            </form>
        </div>
    )
}

export default CreateUser