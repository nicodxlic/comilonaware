import React, { useEffect, useState } from 'react';
import { axios } from '../../axiosConfig'; 
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const endpoint = 'http://localhost:8000/api'

const CreatePurchase = () => {
    const [tables, setTables] = useState([])
    const [selectedTable, setSelectedTable] = useState(null)
    const [orders, setOrders] = useState([])
    const [totalCost, setTotalCost] = useState(0)
    const [payMethod, setPayMethod] = useState(0)
    const [clientPay, setClientPay] = useState(0)
    const [changePay, setChangePay] = useState(0)
    const navigate = useNavigate()

    const store = async (e) => {
      e.preventDefault()
      console.log(e.target.value)
      Swal.fire({
          title: 'Cargando...',
          text: 'Por favor espera',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        })
      e.preventDefault()
      await axios.get('/sanctum/csrf-cookie');
      let response = await axios.post(`${endpoint}/purchase`, {totalCost: totalCost, payMethod : payMethod, clientPay: clientPay, changePay: changePay})
      for (let i = 0; i < orders.length; i++) {
        await axios.put(`${endpoint}/order/${orders[i].id}`, {table : orders[i].table, price : orders[i].price, status: orders[i].status, purchase_id : response.data.id})
      }
      Swal.close()
      Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Compra registrada correctamente',
      })
      navigate('/')
  }
  
    const fetchTables = async () => {
      const response = await axios.get(`${endpoint}/tables`)
      setTables(response.data)
    }
  
    const fetchOrdersByTable = async (tableId) => {
      if (!tableId) return
      const response = await axios.get(`${endpoint}/order/table/${tableId}`)
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

      <button type='submit' className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 w-full">
        Registrar Pago
      </button>
      </form>
    </div>
    );
  };
  
  export default CreatePurchase