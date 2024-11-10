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
            text: 'Producto eliminado correctamente',
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

                {order.status === 'pending' ? (
                    <button
                    type='button'
                    value='in process'
                    onClick={(e) => handleStatusChange(e)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg mb-2"
                    >
                        en proceso
                    </button>
                ) : (
                    ''
                )}
                {order.status === 'in process' ? (
                    <button
                    type='button'
                    value='ready'
                    onClick={(e) => handleStatusChange(e)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mb-2"
                    >
                        Listo para entregar
                    </button>
                ) : (
                    ''
                )}

                <br/>
                <button
                onClick={() => deleteOrder(order.id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg mr-2"
                >
                    Eliminar
                </button>
                <button 
                type='button' 
                className="bg-blue-500 text-white px-4 py-2 rounded-lg" 
                onClick={() => getOrderProducts(order.id)}
                >
                    Ver productos
                </button>
            </div>
        )
    }
}

export default OrdersCard