import React, { useEffect, useState } from 'react'
import {axios} from '../../axiosConfig.js'
import Swal from 'sweetalert2'

const endpoint = 'http://localhost:8000/api'

const Menu = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('all')

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
        setProducts(response.data)
        response = await axios.get(`${endpoint}/categories`)
        setCategories(response.data)
        Swal.close()
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    // Función para manejar el cambio de categoría seleccionada
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value)
    }

    // Función para mostrar información del producto con SweetAlert
    const showProductInfo = (product) => {
        Swal.fire({
            title: product.name,
            html: `
                <img src="${product.image}" alt="${product.name}" style="width: 100%; height: auto; border-radius: 8px; margin-bottom: 10px;" />
                <p><strong>Precio:</strong> $${product.price}</p>
                <p>${product.description || 'Sin descripción disponible'}</p>
            `,
            confirmButtonText: 'Cerrar'
        })
    }

    return (
        <div className="container mx-auto px-4 py-8 rounded-lg">
            <div className="mb-6">
                <label htmlFor="categoryFilter" className="font-semibold mr-2">Filtrar por categoría:</label>
                <select 
                    id="categoryFilter" 
                    className="p-2 border rounded"
                    value={selectedCategory} 
                    onChange={handleCategoryChange}
                >
                    <option value="all">Todas</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>

            {categories
                .filter(category => selectedCategory === 'all' || category.id === parseInt(selectedCategory))
                .map(category => (
                    <div key={category.id} className="mb-6">
                        <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {products
                                .filter(product => product.category_id === category.id)
                                .map(product => (
                                    <div 
                                        key={product.id} 
                                        className="border rounded-lg p-4 shadow-lg  cursor-pointer transform transition-transform hover:scale-105" 
                                        onClick={() => showProductInfo(product)}
                                    >
                                        <img 
                                            src={product.image} 
                                            alt={product.name} 
                                            className="w-full h-48 object-cover rounded-md mb-4" 
                                        />
                                        <h3 className="text-lg font-semibold">{product.name}</h3>
                                        <p className="text-gray-700 mb-2">Precio: ${product.price}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Menu
