import React, { useEffect, useState } from 'react'
import {axios} from '../../axiosConfig.js'

import {Link} from 'react-router-dom'

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
    <div>
      <h3>Productos</h3>
      <div>
        <input 
        type='text' 
        placeholder='buscar productos'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    <table className='table table-striped'>
      <thead className='bg-primary text-white text-center'>
        <tr>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody className='text-center'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => ( //meter los tr y td dentro de una card
            <tr key={product.id}>
              <td> {product.name} </td>
              <td> {product.price} </td>
              <td> {product.stock} </td>
              <td>
                <button onClick={() => deleteProduct(product.id)} className='btn btn-danger'>Eliminar</button>
              </td>
            </tr>
          ))
        ) : products.map ((product) => (
          <tr key={product.id}>
            <td> {product.name} </td>
            <td> {product.price} </td>
            <td> {product.stock} </td>
            <td>
              <button onClick={() => deleteProduct(product.id)} className='btn btn-danger'>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className='d-grip gap-2'>
      <Link to="/create-product" className='btn btn-success mt-2 ml-2 text-white'>Agregar nuevo producto</Link>
    </div>
    </div>
  )
}

export default Products