import React, { useEffect, useState } from 'react';
import { axios } from '../../axiosConfig.js';
import UserCard from './UserCard.jsx';

const ListUsers = () => {
    const [users, setUsers] = useState([])

    const createUser = () => {
        console.log('crear usuario')
    }

    const getAllUsers = async () => {
        const response = [{/////// LLAMADO A LA API
            email: 'admin@gmail.com',
            name: 'admin',
            id: 1
        },{
            email: 'chef@gmail.com',
            name: 'chef',
            id: 2
        },{
            email: 'waiter@gmail.com',
            name: 'waiter',
            id: 3
        }]
        setUsers(response) //// RESPONSE.DATA
    }
    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <div>
            <h1>Lista de usuarios</h1>
            <div> {/* div de usuarios */}
                {users.length > 0 ? (
                    users.map(user => (
                        <UserCard
                        name = {user.name}
                        email = {user.email}
                        id = {user.id}
                        />
                    ))
                ) : (
                    <p>No se han encontrado usuarios</p>
                )}
                <button
                  onClick={() => createUser()}
                  className="bg-green-700 text-white px-4 py-2 rounded-lg mr-2"
                >
                  Crear usuario
                </button>
            </div>
        </div>
    )
}

export default ListUsers