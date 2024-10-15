import React, {useState} from 'react'
import {axios} from '../../axiosConfig.js'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const endpoint = 'http://localhost:8000/api/product'

const CreateProduct = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(1)
    const [stock, setStock] = useState(1)
    const [image, setImage] = useState('')
    const navigate = useNavigate()

    const store = async (e) => {
        Swal.fire({
            title: 'Cargando...',
            text: 'Por favor espera',
            allowOutsideClick: false, // Evita que el usuario cierre el loader clickeando fuera del modal
            didOpen: () => {
              Swal.showLoading(); // Activa el spinner
            }
          })
        e.preventDefault()
        await axios.get('/sanctum/csrf-cookie');
        await axios.post(endpoint, {name: name, price: price, image: image, deleted: false, enabled: true})
        Swal.close()
        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Producto creado correctamente',
        })
        navigate('/')
    }
    return (
    <div>
        <h3>Agregar nuevo producto</h3>
        <form onSubmit={store}>
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
                <label className='form-label'>Precio</label>
                <input
                    value={price}
                    onChange={ (e)=> setPrice(e.target.value)}
                    type='number'
                    className='form-control'
                />
            </div>
            <div className='mb-3'>
                <label className='form-label'>URL de la imagen</label>
                <input
                    value={image}
                    onChange={ (e)=> setImage(e.target.value)}
                    type='text'
                    className='form-control'
                />
            </div>
            <br/>
            <button type='submit' className='btn btn-primary'>Guardar</button>
        </form>
    </div>
    )
}

export default CreateProduct
