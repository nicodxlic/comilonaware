import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
const endpoint = 'http://localhost:8000/api'

const ListOrders = () => {

    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])
    
    useEffect ( () => {
      getAllOrders()
    }, [])

    /*const showProducts = (products) => {
      let productList = products.map(product => `${product.name}`).join('\n')
      alert(`Productos:\n${productList}`)
    } */

    const getAllOrders = async () => {
      let response = await axios.get(`${endpoint}/orders`)
      setOrders(response.data)
      response = await axios.get(`${endpoint}/products`)
      setProducts(response.data)
    }

    const getOrderProducts = async (order) => {
      const response = await axios.get(`${endpoint}/orders_products/` + order.id)
      let productosHTML = '';
      for(let i = 0; i < response.data.length; i++){
        for(let j = 0; j < products.length; j++){
          if(response.data[i].product_id == products[j].id){
            productosHTML = productosHTML + products[j].name + '<br/>'
            break;
          }
        }
      }
      Swal.fire({
        title: 'Productos en el pedido',
        html: productosHTML,
        icon: 'info',
        confirmButtonText: 'Cerrar'
    });
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
            <td> <button type='button' className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={() => getOrderProducts(order)}>Ver productos</button> </td>
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