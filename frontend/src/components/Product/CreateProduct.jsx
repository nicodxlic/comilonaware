import React, {useState, useEffect} from 'react'
import {axios} from '../../axiosConfig.js'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Header from '../Header/Header.jsx'

const endpoint = 'http://localhost:8000/api/product'

const CreateProduct = () => {
    const navigate = useNavigate()
    const role = localStorage.getItem('role')
    if(role !== 'Admin' && role !== 'Chef'){
        Swal.fire({
            icon: 'error',
            title: '¡No tienes los permisos!',
            text: 'debes tener el rol correspondiente a esta pantalla',
          })
        navigate('/')
    }
    const [name, setName] = useState('')
    const [categories, setCategories] = useState([])
    const [price, setPrice] = useState(1)
    const [description, setDescription] = useState([])
    const [image, setImage] = useState('')
    const [productCategory, setProductCategory] = useState([])

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
        if(name === '' || 
        price === '' || 
        image === '' ||
        description === '' || 
        isNaN(productCategory))
        {
            Swal.fire({
                icon: 'error',
                title: '¡No completaste todos los campos!',
                text: 'para registrar un producto, debes completar todos los campos',
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
            e.preventDefault()
            try{
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
            } catch(error){
                Swal.close()
                Swal.fire('Error', 
                'Ocurrió un error al guardar el pedido.', 'error')
            }
        }
    }
    return (
        <div>
            <Header />
            <div className="p-4">
                <div className="ml-4 mt-4 w-full flex justify-start mb-10">
                <button
                className="bg-blue-500 text-white px-8 py-6 rounded-lg hover:bg-gray-400 transition duration-300"
                onClick={() => navigate('/products')}>
                Atrás
                </button>
            </div>
            <div className="relative max-w-4xl mx-auto mt-10 p-8 bg-white rounded-xl border-4 border-double shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Agregar nuevo producto</h1>
                <form onSubmit={store} className="space-y-6">
                <div>
                    <label className="form-label block text-gray-700 text-xl font-bold mb-2">Nombre:</label>
                    <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-300 border border-gray-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"/>
                </div>
                <div>
                    <label className="form-label block text-gray-700 text-xl font-bold mb-2">Precio:</label>
                    <input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-gray-300 border border-gray-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"/>
                </div>
    
                <div>
                <label className="form-label block text-gray-700 text-xl font-bold mb-2">URL de la imagen:</label>
                <input
                    id="image"
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full bg-gray-300 border border-gray-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"/>
                </div>
    
                <div>
                <label className="form-label block text-gray-700 text-xl font-bold mb-2">Descripción:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-gray-300 border border-gray-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    rows={4}/>
                </div>
    
                <div>
                    <label className="form-label block text-gray-700 text-xl font-bold mb-2">Selecciona una categoría:</label>
                    <select
                    id="category"
                    onChange={(e) => handleCategoryChange(e)}
                    className="w-full bg-gray-300 border border-gray-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200">
                    <option value=''>Seleccione una categoría</option>
                    {categories.map(category => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                    ))}
                </select>
                </div>
    
                <button
                type="submit"
                className='btn btn-primary py-3 px-4 w-full'
                disabled={name === '' || price === '' || image === '' || description === '' || productCategory.length === 0}>
                Guardar
                </button>
            </form>
            </div>
            </div>
        </div>
    )
}

export default CreateProduct