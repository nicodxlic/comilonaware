import React, { useEffect, useState } from 'react'
import axios from 'axios'

import {Link} from 'react-router-dom'

const endpoint = 'http://localhost:8000/api'

const ListProducts = ({ addProductToOrder }) => {

    const [products, setProducts] = useState([])
    
    useEffect ( () => {
        getAllProducts()
    }, [])

    const getAllProducts = async () => {
      const response = await axios.get(`${endpoint}/products`)
      setProducts(response.data)
    }

  return (
    <div>
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
              <button type="button" onClick={() => addProductToOrder(product)} className='btn btn-info'>Agregar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}

export default ListProducts