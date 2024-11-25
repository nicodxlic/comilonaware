import React, {useState, useEffect} from 'react'
import {axios} from '../../axiosConfig.js'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Header from '../Header/Header.jsx'

const endpoint = 'http://localhost:8000/api/product'

const CreateProduct = () => {
    const [name, setName] = useState('')
    const [categories, setCategories] = useState([])
    const [price, setPrice] = useState(1)
    const [description, setDescription] = useState([])
    const [image, setImage] = useState('')
    const [productCategory, setProductCategory] = useState([])
    const navigate = useNavigate()

    const getAllCategories = async () => {
        Swal.fire({
            title: 'Cargando...',
            text: 'Por favor espera',
            allowOutsideClick: false, // Evita que el usuario cierre el loader clickeando fuera del modal
            didOpen: () => {
              Swal.showLoading(); // Activa el spinner
            }
        })
        const response = await axios.get('http://localhost:8000/api/categories')
        setCategories(response.data)
        Swal.close()
    }

    useEffect ( () => {
        getAllCategories()
    }, [])

    const handleCategoryChange = (e) => {
        e.preventDefault()
        setProductCategory(e.target.value)
    }
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
        await axios.post(endpoint, {name: name,
            price: price,
            image: image,
            description: description,
            deleted: false,
            enabled: true,
            category_id: productCategory
        })
        Swal.close()
        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Producto creado correctamente',
        })
        navigate('/products')
    }
    return (
    <div> <Header/>
    <div className="p-6">
        <div className="w-full flex justify-start mb-6">
            <button
                className="bg-blue-500 text-white px-8 py-6 rounded-lg hover:bg-gray-400"
                onClick={() => navigate('/products')}
            >
                Atrás
            </button>
        </div>
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
            <div className='mb-3'>
                <label className='form-label'>Descripcion</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className='form-control'
                    rows="4"
                />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Selecciona una categoria</label>
                <br/>
                <select
                onChange={(e) => handleCategoryChange(e)}
                >
                    <option default value=''>Seleccione una categoria</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                        {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <br/>
            <button 
            type='submit' 
            className='btn btn-primary'
            disabled={name === '' || 
            price === '' || 
            image === '' ||
            description === '' || 
            productCategory.length === 0}
            >Guardar</button>
        </form>
    </div>
    </div>
    )
}

export default CreateProduct
