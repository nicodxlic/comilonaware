import React, { useEffect, useState } from 'react'
import {axios} from '../../axiosConfig.js'
import Swal from "sweetalert2"

const endpoint = 'http://localhost:8000/api'

const PurchaseList = () => {
    const [purchases, setPurchases] = useState([])
    const [ordersPurchase, setOrdersPurchase] = useState([])

    const getAllPurchases = async () => {
        const response = await axios.get(`${endpoint}/purchases`)
        setPurchases(response.data)
    }

    const showOrders = async (id) => {
        Swal.fire({
            title: 'Cargando...',
            text: 'Por favor espera',
            allowOutsideClick: false, // Evita que el usuario cierre el loader clickeando fuera del modal
            didOpen: () => {
              Swal.showLoading(); // Activa el spinner
            }
          })
          let response = await axios.get(`${endpoint}/order/purchase/${id}`);
          let orders = response.data; // Usa directamente la respuesta de axios
          
          let HTML = '';
          
          for(let i = 0; i < orders.length; i++){
              HTML = HTML + 'Pedido ID: ' + orders[i].id + '<br/>';
              
              let responseOrderProducts = await axios.get(`${endpoint}/orders_products/` + orders[i].id);
              
              for(let j = 0; j < responseOrderProducts.data.length; j++){
                  let productResponse = await axios.get(`${endpoint}/product/${responseOrderProducts.data[j].product_id}`);
                  HTML = HTML + productResponse.data.name + '<br/>';
              }
          }
        Swal.close()
        Swal.fire({
          title: 'Pedidos de la compra',
          html: HTML,
          icon: 'info',
          confirmButtonText: 'Cerrar'
        });
    }

    useEffect ( () => {
        getAllPurchases()
    }, [])

    return(
        <div>
            <table className='table table-striped'>
                <thead className='bg-primary text-white text-center'>
                    <tr>
                        <th>Id</th>
                        <th>Precio total</th>
                        <th>Pago del cliente</th>
                        <th>Cambio</th>
                        <th>metodo de pago</th>
                        <th>Pedidos</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {purchases.map ((purchase) => (
                    <tr key={purchase.id}>
                        <td> {purchase.id} </td>
                        <td> {purchase.totalCost} </td>
                        <td> {purchase.clientPay} </td>
                        <td> {purchase.changePay} </td>
                        <td> {purchase.payMethod} </td>
                        <td>
                        <button type="button" onClick={() => showOrders(purchase.id)} className='btn btn-info'>Ver pedidos</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PurchaseList