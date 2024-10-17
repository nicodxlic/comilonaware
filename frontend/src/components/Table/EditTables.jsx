import React, { useEffect, useState } from 'react'
import {axios} from '../../axiosConfig.js'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const endpoint = 'http://localhost:8000/api/table/'

const EditTable = () => {
    const [number, setNumber] = useState('')
    const navigate = useNavigate()
    const id = 1

    const update = async (e) => {
        e.preventDefault();
        if (number > 0 && number <= 15) {
            try {
                await axios.put(`${endpoint}${id}`, { number });
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'Cantidad de mesas editada.',
                });
                navigate('/');
            } catch (error) {
                console.error('Error al actualizar', error);
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El número de mesas debe estar entre 1 y 15.',
            });
        }
    };

    useEffect(() =>{
        const getTableInfo = async () => {
            const response = await axios.get(`${endpoint}${id}`)
            console.log(response.data)
            setNumber(response.data.number)
        }
        getTableInfo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='size-3/12 ml-40'>
            <h3>Cambiar número de mesas</h3>
            <form onSubmit={update}>
                <div className="mb-12">
                    <label className='form-label mb-4'>Número</label>
                    <input 
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        type='number'
                        className='form-control'
                        required
                        min='1'
                        max='15'
                    />
                    <div className="invalid-feedback">
                        El número de mesas debe ser entre 1 y 15.
                    </div>
                </div>
                
                <button type='submit' className='btn btn-primary'>Cambiar</button>
            </form>
        </div>
    )
}

export default EditTable