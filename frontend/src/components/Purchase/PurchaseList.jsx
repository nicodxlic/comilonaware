import React, { useEffect, useState } from 'react'
import { axios } from '../../axiosConfig.js'
import Swal from "sweetalert2"
import { useNavigate } from 'react-router-dom'
import Header from '../Header/Header.jsx'
import FooterAdmin from '../Footer/FooterAdmin.jsx'

const endpoint = 'http://localhost:8000/api'

const PurchaseList = () => {
    const [purchases, setPurchases] = useState([])
    const navigate = useNavigate()

    const getAllPurchases = async () => {
        try {
            const response = await axios.get(`${endpoint}/purchases`)
            setPurchases(response.data)
        } catch (error) {
            console.error('Error al obtener las compras:', error)
        }
    }

    const showOrders = async (id) => {
        Swal.fire({
            title: 'Cargando...',
            text: 'Por favor espera',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading()
            }
        })

        try {
            const response = await axios.get(`${endpoint}/order/purchase/${id}`)
            const orders = response.data

            let HTML = ''
            const orderPromises = orders.map(async (order) => {
                let orderHTML = `Pedido ${order.id}<br/>`

                // Obtener productos para cada pedido
                const responseOrderProducts = await axios.get(`${endpoint}/orders_products/${order.id}`)
                const productPromises = responseOrderProducts.data.map(async (orderProduct) => {
                    const productResponse = await axios.get(`${endpoint}/product/${orderProduct.product_id}`)
                    return productResponse.data.name
                })

                // Esperar a que se resuelvan todas las promesas de productos
                const products = await Promise.all(productPromises)
                orderHTML += products.join('<br/>') + '<br/>'
                return orderHTML
            })

            // Esperar a que se resuelvan todas las promesas de pedidos
            const ordersHTML = await Promise.all(orderPromises)
            HTML = ordersHTML.join('')

            Swal.close()
            Swal.fire({
                title: 'Pedidos de la compra',
                html: HTML,
                icon: 'info',
                confirmButtonText: 'Cerrar'
            })
        } catch (error) {
            Swal.close()
            Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al cargar los pedidos.',
                icon: 'error',
                confirmButtonText: 'Cerrar'
            })
            console.error('Error al cargar pedidos:', error)
        }
    }

    const handleAddPayment = (id) => {
        navigate(`/create-payment/${id}`);
    };

    const handleCancelPurchase = async (id) => {
        try {
            const response = await axios.patch(`${endpoint}/purchase/${id}/cancel`);
            Swal.fire({
                icon: 'success',
                title: 'Pedido cancelado',
                text: response.data.message,
            });
            getAllPurchases();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'No se pudo cancelar el pedido.',
            });
        }
    };

    const handleShowPayments = async (id) => {
        try {
            const response = await axios.get(`${endpoint}/purchase/${id}/payments`);
            const payments = response.data;
            
            if (payments.length === 0) {
                Swal.fire({
                    title: 'Sin pagos',
                    text: 'No existe ningún pago registrado.',
                    icon: 'info'
                })
                return
            }

            Swal.fire({
                title: 'Pagos asociados',
                html: payments.map(payment => `
                    <div>
                        <p><strong>Método:</strong> ${payment.paymentMethod}</p>
                        <p><strong>Monto:</strong> $${payment.amount}</p>
                    </div>
                    <hr>
                `).join(''),
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudieron obtener los pagos asociados.',
            });
        }
    };

    useEffect(() => {
        getAllPurchases()
    }, [])

    return(
        <div>
            <Header/>
            <table className='table table-striped table-auto w-full text-center'>
                <thead className='bg-primary text-white text-center'>
                    <tr>
                        <th>ID</th>
                        <th>Precio total</th>
                        <th>Pedidos</th>
                        <th>Estado</th>
                        <th>Pagos</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody className='text-center items-center'>
                    {purchases.map ((purchase) => (
                        <tr key={purchase.id}>
                        <td>{purchase.id}</td>
                        <td>${purchase.totalCost}</td>
                        <td>
                            <button type="button" onClick={() => showOrders(purchase.id)} className='btn btn-info'>
                                Ver pedido
                            </button>
                        </td>
                        <td>{purchase.status}</td>
                        <td>
                        <button
                                onClick={() => handleShowPayments(purchase.id)}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                Mostrar pagos
                        </button>
                        </td>
                        <td>
                            <button type="button" onClick={() => handleAddPayment(purchase.id)} className='btn btn-success mr-12'>
                                Añadir pago
                            </button>
                            <button
                                onClick={() => handleCancelPurchase(purchase.id)}
                                className={`px-4 py-2 rounded ${
                                    purchase.status === 'pagado' || purchase.status === 'cancelado'
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-red-500 hover:bg-red-600 text-white'}`}
                                disabled={purchase.status === 'pagado' || purchase.status === 'cancelado'}>
                                Cancelar pedido
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <FooterAdmin/>
        </div>
    )
}

export default PurchaseList