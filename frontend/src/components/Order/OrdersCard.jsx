import React, { useEffect, useState } from 'react'
import {axios} from '../../axiosConfig.js'
import Swal from 'sweetalert2'

const endpoint = 'http://localhost:8000/api'

const OrdersCard = ({order, getAllOrders, getOrderProducts}) => {
    const statusColors = {
        'pending': 'white',
        'in process': 'yellow',
        'ready': 'green',
        'delivered': 'Cyan',
        'canceled': 'red'
      };
      
      const [colorCard, setColorCard] = useState(statusColors[order.status] || 'white');

    const handleStatusChange = async (e) => {
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
        const response = await axios.put(`${endpoint}/order/status/` + order.id, {status: status})
        Swal.close()
        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Producto creado correctamente',
        })
        setColorCard(statusColors[status])
        getAllOrders()
    }

    const deleteorder = async (orderId) => {
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

    if(order.status === 'deleted'){
        return null
    } else{
        return (
            <div key={order.id} className={"shadow-lg rounded-lg p-4"} style={{ backgroundColor: colorCard }}>
                <h4 className="font-bold text-lg mb-2">Pedido N° {order.id}</h4>
                <p className="text-gray-700 mb-2">mesa: {order.table}</p>
                <p className="text-gray-700 mb-4">Estado: {order.status}</p>

                <select className="mb-4" value={order.status} onChange={handleStatusChange}>
                    <option value="pending">Pendiente</option>
                    <option value="in process">En proceso</option>
                    <option value="ready">Listo para entregar</option>
                    <option value="delivered">Entregado</option>
                    <option value="canceled">Cancelado</option>
                </select>

                <br/>
                <button
                onClick={() => deleteorder(order.id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg mr-2"
                >
                    Eliminar
                </button>
                <button 
                type='button' 
                className="bg-blue-500 text-white px-4 py-2 rounded-lg" 
                onClick={() => getOrderProducts(order)}
                >
                    Ver productos
                </button>
            </div>
        )
    }
}

export default OrdersCard