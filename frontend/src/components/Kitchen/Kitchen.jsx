import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import Header from '../Header/Header'
import FooterChef from '../Footer/FooterChef'
import { useNavigate } from 'react-router-dom'

import OrdersCard from '../Order/OrdersCard'

const endpoint = 'http://localhost:8000/api'

const Kitchen = () => {
    const navigate = useNavigate()
    const role = localStorage.getItem('role')
    if(role !== 'Admin' && role !== 'Chef'){
        Swal.fire({
            icon: 'error',
            title: '¡No tienes los permisos!',
            text: 'debes tener el rol correspondiente a esta pantalla',
          })
        navigate('/')
    }
    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])
    const [orderMesage, setOrderMesage] = useState('Cargando pedidos...')

    const getAllOrders = async () => {
        let response = await axios.get(`${endpoint}/orders`)
        
        // Filtrar las órdenes con status "delivered" o "canceled"
        const filteredOrders = response.data.filter(order => 
            order.status !== 'delivered' && order.status !== 'canceled'
        );

        // Ordenar las órdenes según el status
        const sortedOrders = filteredOrders.sort((a, b) => {
            const orderPriority = {
                'in process': 1,
                'pending': 2,
                'ready': 3
            };
            return orderPriority[a.status] - orderPriority[b.status];
        });
        if(response.data.length === 0){
            setOrderMesage('No se han encontrado pedidos')
        } else{
            setOrders(sortedOrders)
            response = await axios.get(`${endpoint}/products`)
            setProducts(response.data)
        }
    }

    const getOrderProducts = async (id) => {
        const response = await axios.get(`${endpoint}/orders_products/` + id);
    
        const productosHTML = response.data
            .map(orderProduct => {
                const product = products.find(p => p.id === orderProduct.product_id);
                if (product) {
                    return `${product.name} ${orderProduct.quantity === 1? '' : (`x${orderProduct.quantity}`)} `;
                }
                return null;
            })
            .filter(Boolean) // Elimina valores nulos
            .join('<br/>');
    
        Swal.fire({
            title: 'Productos en el pedido',
            html: productosHTML,
            icon: 'info',
            confirmButtonText: 'Cerrar',
        });
    };

    const handleStatusUpdate = (orderId, newStatus) => {
        setOrders((prevOrders) => {
            // Actualiza el estado de la orden localmente
            const updatedOrders = prevOrders.map((order) =>
                order.id === orderId ? { ...order, status: newStatus } : order
            );
    
            // Reordena las órdenes después de actualizar
            return updatedOrders.sort((a, b) => {
                const orderPriority = { 'in process': 1, 'pending': 2, 'ready': 3 };
                return orderPriority[a.status] - orderPriority[b.status];
            });
        });
    };
    

    useEffect ( () => {
        getAllOrders()
      }, [])

    return (
        <div>
            <Header/>
            <h3 className="text-2xl text-center font-bold mb-4">Pedidos</h3>
            <div className="ml-8 mr-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {orders.length > 0 ? (
                    orders.map(order => (
                        <OrdersCard 
                        order = {order}
                        getAllOrders={getAllOrders}
                        getOrderProducts={getOrderProducts}
                        handleStatusUpdate={handleStatusUpdate}/>
                    ))
                ) : (
                    <p className="text-center col-span-full">{orderMesage}</p>
                )}
            </div>
            <FooterChef/>
        </div>
    )
}

export default Kitchen