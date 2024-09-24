import React, { useEffect, useState } from 'react'
import {axios} from '../../axiosConfig.js'

import {Link} from 'react-router-dom'

/**Hice una prueba para ver si traia los items de la BD
 * Posiblemente la funcionalidad de este componente cambie
 */
const endpoint = 'http://localhost:8000/api'

const Products = () => {

    const [products, setProducts] = useState([])
    
    useEffect ( () => {
        getAllProducts()
    }, [])

    const getAllProducts = async () => {
       const response = await axios.get(`${endpoint}/products`)
       setProducts(response.data)
    }

    const deleteProduct = async (id) => {
      const response = await axios.post(`${endpoint}/product/delete`, {id: id})
      console.log(response)
      getAllProducts()
   }

   /* const deleteProduct = async (id) => {
      axios.delete(`${endpoint}/product/${id}`)
      getAllProducts()
    } */

  return (
    <div>
      <h3>Productos</h3>
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
        { products.map ((product) => (
          <tr key={product.id}>
            <td> {product.name} </td>
            <td> {product.price} </td>
            <td> {product.stock} </td>
            <td>
              <Link to={`/edit/${product.id}`} className='btn btn-warning'>Editar</Link>
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