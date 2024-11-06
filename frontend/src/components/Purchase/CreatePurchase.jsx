import React, { useEffect, useState } from 'react';
import { axios } from '../../axiosConfig'; 
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const endpoint = 'http://localhost:8000/api';
const apiKey = '714d38fbfd9f5571b55beb25514722fb';

const CreatePurchase = () => {
  const [tables, setTables] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedTable, setSelectedTable] = useState(0)
  const [totalCost, setTotalCost] = useState(0);
  const [payMethod, setPayMethod] = useState('');
  const [clientPay, setClientPay] = useState(0);
  const [currency, setCurrency] = useState('ARS');
  const navigate = useNavigate();

  const showErrorAlert = (title, text) => {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
    });
  };

  const store = async (e) => {
    e.preventDefault();
    if(isNaN(clientPay) || clientPay <= 0){
      showErrorAlert('Error', 'Debes ingresar un monto valido')
    } else if(selectedTable <= 0 || isNaN(selectedTable)){
      showErrorAlert('Error', 'Debes seleccionar una mesa')
    } else {
    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor espera',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    setPayMethod('cash');
    
    try {
      let exchangedAmount = clientPay;

      if (currency !== 'ARS') {
        try {
          const exchangeRate = await axios.get(`https://cors-anywhere.herokuapp.com
            /https://api.exchangeratesapi.io/v1/latest
            ?access_key=${apiKey}
            &base=${currency}
            &symbols=ARS`, 
            {
            withCredentials: false,
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
          }
          });
          exchangedAmount = clientPay * exchangeRate.data.rates.ARS;
        } catch (error) {
          showErrorAlert('Error', 'Error al obtener la tasa de cambio');
          console.error('Error al obtener la tasa de cambio:', error);
          return;
        }
      }
      if (exchangedAmount >= totalCost) {
        try {
          await axios.get('/sanctum/csrf-cookie');
          const response = await axios.post(`${endpoint}/purchase`, {
            orders: orders,
            totalCost: totalCost,
            payMethod: 'cash',
            clientPay: exchangedAmount,
            changePay: exchangedAmount - totalCost
          });
          
          for (const order of orders) {
            await axios.patch(`${endpoint}/order/${order.id}`, {
              table: order.table,
              price: order.price,
              status: order.status,
              purchase_id: response.data.id
            });
          }

          Swal.close();
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: `Compra registrada correctamente. El cambio es de: $${exchangedAmount - totalCost}.`,
          });

          navigate('/');
        } catch (error) {
          showErrorAlert('Error', 'No se pudo registrar la compra');
          console.error('Error al registrar la compra:', error);
        }
      } else {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: `El pago realizado por el cliente es menor al coste total. Pago: ${exchangedAmount} ARS.`,
        });
      }
    } catch (error) {
      showErrorAlert('Error', 'Ocurrió un problema durante el proceso');
      console.error('Error general:', error);
    }
  }
  };

  const fetchTables = async () => {
    try {
      const response = await axios.get(`${endpoint}/tables`);
      setTables(response.data);
    } catch (error) {
      showErrorAlert('Error', 'No se pudieron obtener las mesas');
      console.error('Error al obtener las mesas:', error);
    }
  };

  const fetchOrdersByTable = async (tableId) => {
    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor espera',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    if (tableId && tableId !== ''){
      try {
        const response = await axios.get(`${endpoint}/order/table/${tableId}`, {
          withCredentials: false
      });
        setOrders(response.data);
        calculateTotalCost(response.data);
      } catch (error) {
        showErrorAlert('Error', 'No se pudieron obtener los pedidos');
        console.error('Error al obtener los pedidos:', error);
      }
    } else{
      setOrders([])
      setTotalCost(0)
    }
    Swal.close()
  };

  const calculateTotalCost = (orders) => {
    const total = orders.reduce((sum, order) => sum + order.price, 0);
    setTotalCost(total);
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const handleTableChange = (e) => {
    const tableId = e.target.value;
    setSelectedTable(tableId)
    fetchOrdersByTable(tableId);
  };

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
          <p>Moneda:</p>
          <select onChange={(e) => setCurrency(e.target.value)}>
            <option default value='ARS'>ARS</option>
            <option value='EUR'>EUR</option>
          </select>
          <br/>
        </div>

        <button type='submit' className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 w-full">
          Registrar Pago
        </button>
      </form>
    </div>
  );
};

export default CreatePurchase;
