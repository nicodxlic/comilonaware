import React, { useEffect, useState } from 'react';
import { axios } from '../../axiosConfig'; 
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import FooterWaiter from '../Footer/FooterWaiter';
import FooterAdmin from '../Footer/FooterAdmin';

const endpoint = 'http://localhost:8000/api'

const CreatePurchase = () => {
  const navigate = useNavigate()
  const role = localStorage.getItem('role')
  if(role !== 'Admin' && role !== 'Mozo'){
      Swal.fire({
          icon: 'error',
          title: '¡No tienes los permisos!',
          text: 'debes tener el rol correspondiente a esta pantalla',
        })
      navigate('/')
  }
    const [tables, setTables] = useState([])
    const [selectedTable, setSelectedTable] = useState('')
    const [orders, setOrders] = useState([])
    const [totalCost, setTotalCost] = useState(0)
    const [payMethod, setPayMethod] = useState('')
    const [clientPay, setClientPay] = useState(0)
    const [changePay, setChangePay] = useState(0)
    const [preferenceId, setPreferenceId] = useState(null)

    initMercadoPago('TEST-08637446-f73c-43b3-a3e2-c02b3a8ccc84', {locale: 'es-AR'});

    const store = async (e) => {
      e.preventDefault()
      if(selectedTable === ''){
        Swal.fire({
          icon: 'error',
          title: '¡Te falta un paso!',
          text: 'para registrar un pago, debes seleccionar una mesa',
        })
      } else if(orders.length === 0) {
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'La mesa seleccionada no contiene ninguna orden que se deba pagar',
        })
      } else {
      setChangePay(clientPay-totalCost)
      Swal.fire({
          title: 'Cargando...',
          text: 'Por favor espera',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        })
      e.preventDefault()
      try{
        await axios.get('/sanctum/csrf-cookie');
        let response = await axios.post(`${endpoint}/purchase`, {orders: orders, totalCost: totalCost, payMethod : 'cash', clientPay: clientPay, changePay: clientPay-totalCost})
        for (let i = 0; i < orders.length; i++) {
          await axios.patch(`${endpoint}/order/${orders[i].id}`, {table : orders[i].table, price : orders[i].price, status: orders[i].status, purchase_id : response.data.id})
        }
        Swal.close()
        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Pago registradao correctamente, El cambio es de: $' + clientPay-totalCost + '.',
        })
        navigate('/orders')
      } catch(error){
        Swal.close()
        Swal.fire('Error', 
        'Ocurrió un error al guardar el pedido.', 'error')
      }
    }
  }
  
    const fetchTables = async () => {
      const response = await axios.get(`${endpoint}/tables`)
      setTables(response.data)
    }
  
    const fetchOrdersByTable = async (tableId) => {
      if (!tableId) return
      const response = await axios.get(`${endpoint}/order/table/${tableId}`)
      //antes de setear, controlar que las ordenes no contengan un purchaseId
      setOrders(response.data)
      calculateTotalCost(response.data)
    }
  
    const calculateTotalCost = (orders) => {
      const total = orders.reduce((sum, order) => sum + order.price, 0)
      setTotalCost(total)
    }
  
    useEffect(() => {
      fetchTables()
    }, [])
  
    const handleTableChange = (e) => {
      const tableId = e.target.value
      setSelectedTable(tableId)
      fetchOrdersByTable(tableId)
    }

    const CreatePreference = async () => {
      try {
        const response = await axios.post(`${endpoint}/create-preference`, {
          items: orders,
          unit_price: totalCost,
          table: selectedTable,
        });
        const { id } = response.data
        return id
        } catch (error) {
          console.log(error);
        }
      }
      const handleBuy = async () => {
        const id = await CreatePreference()
        if (id) {
          setPreferenceId(id)
        }
      }
  
    return (
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-6 text-center">Registrar Pago</h3>
      <form onSubmit={store}>
      <div className="mb-4">
        <label className="block text-gray-700 text-xl font-bold mb-2">Mesa:</label>
        <select 
          onChange={handleTableChange} 
          className="block w-full bg-gray-200 border border-gray-300 rounded-lg py-2 px-3"
        >
          <option value="">Seleccione una mesa</option>
          {tables.map((table) => (
            <option key={table.id} value={table.id}>
              Mesa {table.number}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">Pedidos:</h4>
        <ul className="list-disc pl-5 mb-2">
          {orders.map((order) => (
            <li key={order.id}>Pedido {order.id} - Total: ${order.price}</li>
          ))}
        </ul>
        <p className="text-xl font-bold">Total a pagar: ${totalCost}</p>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-xl font-bold mb-2">Pago del cliente:</label>
        <input
          onChange={(e) => setClientPay(e.target.value)} 
          type="number" 
          className="block w-full bg-gray-200 border border-gray-300 rounded-lg py-2 px-3" 
          placeholder="$:"
        />
      </div>
      <button type='submit' className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 w-full mt-4">
        Registrar Pago
      </button>
      <button type="button" className='bg-blue-500 text-white mt-8 rounded-md p-4' onClick={handleBuy}>
        Pagar con MercadoPago
        </button>
      </form>
      <div className='mt-10'>
        {preferenceId && <Wallet initialization={{ preferenceId }} />}
      </div>
      {role === 'Admin' ? (
                    <FooterAdmin/>
                ) : (
                    <FooterWaiter/>
                )}
    </div>
    );
  };
  
  export default CreatePurchase