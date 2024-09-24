import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
const endpoint = 'http://localhost:8000/api'

const ListOrders = () => {

    const [orders, setOrders] = useState([])
    
    useEffect ( () => {
      getAllOrders()
    }, [])

    /*const showProducts = (products) => {
      let productList = products.map(product => `${product.name}`).join('\n')
      alert(`Productos:\n${productList}`)
    } */

    const getAllOrders = async () => {
      const response = await axios.get(`${endpoint}/orders`)
      setOrders(response.data)
    }

    // <td><button onClick={() => showProducts(order.products)} className='btn btn-info'> Ver productos</button></td>

  return (
    <div>
    <table className='table table-striped'>
      <thead className='bg-primary text-white text-center'>
        <tr>
          <th>Número de mesa</th>
          <th>Total</th>
          <th>Estado</th>
          <th>Productos</th>
        </tr>
      </thead>
      <tbody className='text-center'>
        { orders.map ((order) => (
          <tr key={order.id}>
            <td> {order.table} </td>
            <td> {order.price} </td>
            <td> {order.status} </td>
            
          </tr>
        ))}
      </tbody>
    </table>
    <br/>
    <Link to="/create-order" className='btn btn-success mt-2 ml-2 text-white'>Agregar nuevo pedido</Link>
    </div>
  )
}

export default ListOrders