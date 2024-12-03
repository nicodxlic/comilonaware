import React, { useEffect, useState } from 'react';
import { axios } from '../../axiosConfig'; 
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import Header from '../Header/Header.jsx'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

const endpoint = 'http://localhost:8000/api'

const CreatePayment = () => {
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
    const [totalPaid, setTotalPaid] = useState(0);
    const [remaining, setRemaining] = useState(0);
    const [purchase, setPurchase] = useState([])
    const {id} = useParams()
    const [purchaseId, setPurchaseId] = useState(id)
    const [totalCost, setTotalCost] = useState(0)
    let [amount, setAmount] = useState(0)
    const [paymentMethod, setPaymentMethod] = useState('')
    const [change, setChange] = useState(0)
    const [preferenceId, setPreferenceId] = useState(null)

    initMercadoPago('APP_USR-8eb91d75-4003-46d1-be2c-c00c36509677', {locale: 'es-AR'});

    const store = async (e) => {
      var alertText = 'Pago registrado exitosamente. En unos momentos podrá proceder en MercadoPago.'
      e.preventDefault()
      if (amount > totalCost) {
        let cambio = amount - totalCost
        setChange(cambio)
        alertText = alertText + ' El cambio es de: $' + cambio
      }

        if (amount <= 0 || amount > 999999) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Indique un monto válido.',
        })
        return
      } else if (paymentMethod === '') {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Seleccione un método de pago.',
        })
        return
      } else if (paymentMethod === 'mercadopago' && amount > remaining) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'En este método de pago, el monto no puede ser mayor al restante a pagar.',
        })
        return
      }
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
      let response = await axios.post(`${endpoint}/payment/${purchaseId}`, {
        amount : amount, 
        paymentMethod : paymentMethod, 
        change : change, 
        purchase_id : purchaseId })
        //Revisar por qué solo redirecciona, seguro tiene que ver con el if de abajo
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: alertText
    })

      if (paymentMethod === 'efectivo') {
      navigate('/purchases')
    } else {
      handleBuy()
    }
  }
  
  const fetchPaymentsByPurchase = async () => {
    try {
        Swal.fire({
            title: 'Cargando...',
            text: 'Obteniendo pedidos asociados...',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading(),
        });
        const response = await axios.get(`${endpoint}/purchase/${purchaseId}`)
        const { purchase, totalPaid, remaining } = response.data

        setPurchase(purchase)
        setTotalCost(purchase.totalCost)
        setTotalPaid(totalPaid)
        setRemaining(remaining)

        Swal.close();
    } catch (error) {
        Swal.close();
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron cargar los pedidos.',
        });
        console.error(error);
    }
};
  
    useEffect(() => {
      fetchPaymentsByPurchase()
    }, [])

    const CreatePreference = async () => {
      try {
        const response = await axios.post(`${endpoint}/create-preference`, {
          unit_price: remaining,
          purchase_id : purchaseId,
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
        <div className="relative">
        <button 
          onClick={() => navigate('/purchases')}
          className="absolute top-2 left-4 px-8 py-6 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-200 z-10 ml-8"
          aria-label="Volver">
          Volver
        </button>
        <div className="max-w-4xl mx-auto mt-20 p-8 bg-white rounded-xl border-2 shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
          <h3 className="text-3xl font-bold mb-8 text-center text-gray-800">Registrar Pago</h3>
          <form onSubmit={store} className="space-y-8">
            <div className="grid grid-cols-3 gap-1 p-4 bg-gray-300 rounded-lg">
            <div className="text-center">
                <p className="text-lg font-semibold text-gray-700">Total restante</p>
                <p className="text-2xl font-bold text-red-600">${remaining}</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-700">Total pagado</p>
                <p className="text-2xl font-bold text-green-600">${totalPaid}</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-700">Total de la compra</p>
                <p className="text-2xl font-bold">${totalCost}</p>
              </div>
            </div>
    
            <div>
              <label className="block text-gray-700 text-xl font-bold mb-2 mt-10" htmlFor="clientPayment">
                Pago del cliente:
              </label>
              <input
                id="clientPayment"
                onChange={(e) => setAmount(e.target.value)} 
                type="number" 
                className="w-2/3 mx-auto block bg-gray-300 border border-gray-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" 
                placeholder="Ingrese el monto"
              />
            </div>
    
            <div>
              <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="paymentMethod">
                Método de Pago:
              </label>
              <select
                id="paymentMethod"
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-2/3 mx-auto block bg-gray-300 border border-gray-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              >
                <option value="">Seleccione un método</option>
                <option value="efectivo">Efectivo</option>
                <option value="mercadopago">MercadoPago</option>
              </select>
            </div>
    
            <button 
              type='submit' 
              className="w-2/3 mx-auto block bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-100 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Registrar Pago
            </button>
          </form>
    
          {preferenceId && (
            <div className='w-2/3 mx-auto block mt-8 p-6 bg-gray-100 rounded-lg'>
              <Wallet initialization={{ preferenceId }} />
            </div>
          )}
        </div>
        </div>
      );
  };
  
  export default CreatePayment