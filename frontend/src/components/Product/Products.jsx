import React, { useEffect, useState } from 'react'
import {axios} from '../../axiosConfig.js'
import {Link} from 'react-router-dom'
import ProductsCard from './ProductsCard.jsx'
import Swal from "sweetalert2"

const endpoint = 'http://localhost:8000/api'

const Products = (role) => {
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [shownProducts, setShownProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [productMesage, setProductMesage] = useState('Cargando productos...')
//
    const getAllProducts = async () => {
        Swal.fire({
            title: 'Cargando...',
            text: 'Por favor espera',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            }
          })
        let response = await axios.get(`${endpoint}/products`)
        
        if(role.role === 'admin'){
            if(response.data.length === 0){
                setProductMesage('No se han encontrado productos')
            } else {
                setProducts(response.data)
                setShownProducts(response.data) // Inicializar shownProducts
                response = await axios.get(`${endpoint}/categories`)
                setCategories(response.data)
                Swal.close()
            }
        } else {
            let sortedOrders = response.data.filter(product => product.deleted !== 1)
            if(sortedOrders.length === 0){
                setProductMesage('No se han encontrado productos')
            } else{
                sortedOrders = sortedOrders.sort((a, b) => {
                    return a.enabled === b.enabled ? 0 : a.enabled ? -1 : 1;
                });
                response = await axios.get(`${endpoint}/categories`)
                setCategories(response.data)
                setProducts(sortedOrders)
                setShownProducts(sortedOrders) // Inicializar shownProducts
                Swal.close()
           }
       }
    }    
    
    useEffect(() => {
        getAllProducts()
    }, [])

    useEffect(() => {
        // Filtrar productos según el término de búsqueda y la categoría seleccionada
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory === '' || product.category_id === parseInt(selectedCategory))
        )
        setShownProducts(filtered)
    }, [searchTerm, selectedCategory, products])

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value) // Actualiza la categoría seleccionada
    }

    return (
        <div className="container mx-auto p-4">
            <h3 className="text-2xl font-bold mb-4">Productos</h3>
            <div className='flex justify-center mt-6 mb-6'>
                <Link to="/create-product" className='bg-green-500 text-white px-4 py-2 rounded-lg'>
                    Agregar nuevo producto
                </Link>
            </div>
            <div className="mb-6 flex justify-start items-center space-x-4">
                <input 
                    type='text' 
                    placeholder='Buscar productos'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-1/3 p-3 border border-gray-300 rounded-md"
                />
                <div className="flex items-center pl-12">
                    <p className="mr-2">Filtrar categorías:</p>
                    <select 
                        onChange={(e) => handleCategoryChange(e)}
                        className="p-2 border border-gray-300 rounded-md"
                    >
                        <option value="">Seleccionar una categoria</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Grid layout para las cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {shownProducts.length > 0 ? (
                    shownProducts.map(product => (
                        <ProductsCard 
                            key={product.id}
                            product={product}
                            getAllProducts={getAllProducts}
                            categories={categories}
                        />
                    ))
                ) : (
                    <p className="text-center col-span-full">{productMesage}</p>
                )}
            </div>
        </div>
    )
}

export default Products
