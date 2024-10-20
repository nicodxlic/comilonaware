import React, { useEffect, useState } from 'react'
import {axios} from '../../axiosConfig.js'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
const endpoint = 'http://localhost:8000/api'

const ListOrders = (role) => {

    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])
    
    useEffect ( () => {
      getAllOrders()
    }, [])

    const handleStatusChange = async (e, id) => {
      Swal.fire({
        title: 'Cargando...',
        text: 'Por favor espera',
        allowOutsideClick: false, // Evita que el usuario cierre el loader clickeando fuera del modal
        didOpen: () => {
          Swal.showLoading(); // Activa el spinner
        }
      })
      let status = e.target.value
      await axios.get('/sanctum/csrf-cookie');
      const response = await axios.put(`${endpoint}/order/status/` + id, {status: status})
      Swal.close()
      Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Producto creado correctamente',
      })
      getAllOrders()
    }

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

    const deleteOrder = async (orderId) => {
      Swal.fire({
          title: 'Cargando...',
          text: 'Por favor espera',
          allowOutsideClick: false, // Evita que el usuario cierre el loader clickeando fuera del modal
          didOpen: () => {
            Swal.showLoading(); // Activa el spinner
          }
      })
      await axios.get('/sanctum/csrf-cookie');
      const response = await axios.put(`${endpoint}/order/status/` + orderId, {status: 'deleted'})
      Swal.close()
      Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Producto creado correctamente',
      })
      getAllOrders()
  }

    const getOrderProducts = async (id) => {
      const response = await axios.get(`${endpoint}/orders_products/` + id)
      let productosHTML = '';
      for(let i = 0; i < response.data.length; i++){
        for(let j = 0; j < products.length; j++){
          if(response.data[i].product_id === products[j].id){
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
          {role.role.role == 'admin' ? (<th>Acciones</th>) : ('')}
        </tr>
      </thead>
      <tbody className='text-center'>
        { orders.map ((order) => (
          order.status == 'deleted' && role.role.role !== 'admin' ? ('') : 
          (
          <tr key={order.id}>
            <td> {order.table} </td>
            <td> {'$' + order.price} </td>
            <td>
              <select
              value={order.status} 
              onChange={(e) => handleStatusChange(e, order.id)}
              >
                <option value="pending">Pendiente</option>
                <option value="in process">En proceso</option>
                <option value="ready">Listo para entregar</option>
                <option value="delivered">Entregado</option>
                <option value="canceled">Cancelado</option>
                {role.role.role == 'admin' ? (
                  <option value="deleted">Eliminado</option>
                ) : 
                ('')
                }
              </select>
            </td>
            <td>
              <button
              type='button'
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={() => getOrderProducts(order.id)}
              >
                Ver productos
              </button> 
            </td>
            {role.role.role == 'admin' ? (
              <td>
                <button
                type='button'
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={() => deleteOrder(order.id)}
                >
                  Eliminar pedido
                </button> 
              </td>
            ) : ('')}
          </tr>
        )))}
      </tbody>
    </table>
    <br/>
    <Link to="/create-order" className='btn btn-success mt-2 ml-2 text-white'>Agregar nuevo pedido</Link>
    </div>
  )
}

export default ListOrders