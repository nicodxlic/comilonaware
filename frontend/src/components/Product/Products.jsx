import React, { useEffect, useState } from 'react'
import {axios} from '../../axiosConfig.js'

import {Link} from 'react-router-dom'
import ProductsCard from './ProductsCard.jsx'

/**Hice una prueba para ver si traia los items de la BD
 * Posiblemente la funcionalidad de este componente cambie
 */
const endpoint = 'http://localhost:8000/api'

const Products = () => {

    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    
    useEffect ( () => {
        getAllProducts()
    }, [])

    const getAllProducts = async () => {
       const response = await axios.get(`${endpoint}/products`)
       setProducts(response.data)
       setFilteredProducts(response.data)
    }

    const deleteProduct = async (id) => {
      const response = await axios.post(`${endpoint}/product/delete`, {id: id})
      console.log(response)
      getAllProducts()
   }

  useEffect(() => {
    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredProducts(filtered)
  }, [searchTerm, products])

  return (
    <div className="container mx-auto p-4">
        <h3 className="text-2xl font-bold mb-4">Productos</h3>
        <div className="mb-6">
            <input 
                type='text' 
                placeholder='Buscar productos'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
            />
        </div>

        {/* Grid layout para las cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                    <ProductsCard product = {product} deleteProduct={deleteProduct}/>
                ))
            ) : (
                <p className="text-center col-span-full">Cargando productos...</p>
            )}
        </div>

        <div className='flex justify-center mt-6'>
            <Link to="/create-product" className='bg-green-500 text-white px-4 py-2 rounded-lg'>
                Agregar nuevo producto
            </Link>
        </div>
    </div>
)
}

export default Products