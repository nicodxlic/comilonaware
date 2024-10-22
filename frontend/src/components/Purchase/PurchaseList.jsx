import React, { useEffect, useState } from 'react'
import {axios} from '../../axiosConfig.js'

const endpoint = 'http://localhost:8000/api'

const PurchaseList = () => {
    const [purchases, setPurchases] = useState([])

    const getAllPurchases = async () => {
        const response = await axios.get(`${endpoint}/purchases`)
        console.log(response.data[0])
        setPurchases(response.data)
    }

    const getOrders = async (id) => {
        console.log('no hago nada')
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
                        <button type="button" onClick={() => getOrders(purchase.id)} className='btn btn-info'>Ver pedidos</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PurchaseList