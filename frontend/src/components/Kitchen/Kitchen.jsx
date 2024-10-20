import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

import OrdersCard from '../Order/OrdersCard'

const endpoint = 'http://localhost:8000/api'

const Kitchen = () => {
    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])
    const [orderMesage, setOrderMesage] = useState('Cargando pedidos...')

    const getAllOrders = async () => {
        let response = await axios.get(`${endpoint}/orders`)
        if(response.data.length === 0){
            setOrderMesage('No se han encontrado pedidos')
        } else{
            setOrders(response.data)
            response = await axios.get(`${endpoint}/products`)
            setProducts(response.data)
        }
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

    useEffect ( () => {
        getAllOrders()
      }, [])

    return (
        <div>
            <h3 className="text-2xl text-center font-bold mb-4">Pedidos</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {orders.length > 0 ? (
                    orders.map(order => (
                        <OrdersCard 
                        order = {order}
                        getAllOrders={getAllOrders}
                        getOrderProducts={getOrderProducts}/>
                    ))
                ) : (
                    <p className="text-center col-span-full">{orderMesage}</p>
                )}
            </div>
        </div>
    )
}

export default Kitchen