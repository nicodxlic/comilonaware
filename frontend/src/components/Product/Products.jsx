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
    const [productMesage, setProductMesage] = useState('Cargando productos...')

    const getAllProducts = async () => {
       const response = await axios.get(`${endpoint}/products`)
       let sortedOrders = response.data.filter(product => product.deleted !== 1)
       if(sortedOrders.length === 0){
        setProductMesage('No se han encontrado productos')
       } else{
        sortedOrders = sortedOrders.sort((a, b) => {
        return a.enabled === b.enabled ? 0 : a.enabled ? -1 : 1;
      });

        setProducts(sortedOrders)
        setFilteredProducts(sortedOrders)
       }
    }    
    
    useEffect ( () => {
        getAllProducts()
    }, [])

  useEffect(() => {
    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredProducts(filtered)
  }, [searchTerm, products])

  return (
    <div className="container mx-auto p-4">
        <h3 className="text-2xl font-bold mb-4">Productos</h3>
        <div className='flex justify-center mt-6 mb-6'>
            <Link to="/create-product" className='bg-green-500 text-white px-4 py-2 rounded-lg'>
                Agregar nuevo producto
            </Link>
        </div>
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
                    <ProductsCard 
                    product = {product}
                    getAllProducts={getAllProducts}/>
                ))
            ) : (
                <p className="text-center col-span-full">{productMesage}</p>
            )}
        </div>
        <br/>
        <Link to="/edit-table" className='bg-green-500 text-white p-4 rounded-lg'>
                Editar cantidad de mesas
            </Link>
    </div>
)
}

export default Products