import React, { useEffect, useState } from 'react';
import { axios } from '../../axiosConfig'; 
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

const endpoint = 'http://localhost:8000/api'

const CreatePayment = () => {
    const [totalPaid, setTotalPaid] = useState(0);
    const [remaining, setRemaining] = useState(0);
    const [purchase, setPurchase] = useState([])
    const {id} = useParams()
    const [purchaseId, setPurchaseId] = useState(id)
    const [totalCost, setTotalCost] = useState(0)
    const [amount, setAmount] = useState(0)
    const [paymentMethod, setPaymentMethod] = useState('')
    const [change, setChange] = useState(0)
    const [preferenceId, setPreferenceId] = useState(null)

    initMercadoPago('TEST-08637446-f73c-43b3-a3e2-c02b3a8ccc84', {locale: 'es-AR'});
    const navigate = useNavigate()

    const store = async (e) => {
      var alertText = 'Pago registrado exitosamente.'
      e.preventDefault()
      if (amount > totalCost) {
        const cambio = amount - totalCost
        setChange(cambio)
        alertText = alertText + ' El cambio es de: $' + cambio
      }
      console.log(amount)
      console.log(paymentMethod)
        if (amount === 0) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Indique el monto pagado por el cliente.',
        })
        return
      } else if (paymentMethod === '') {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Seleccione un método de pago.',
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
      let response = await axios.post(`${endpoint}/payment/${purchaseId}`, {amount : amount, paymentMethod : paymentMethod, change : change, purchase_id : purchaseId})
      console.log(response.data)
      Swal.close()
      Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: alertText
      })
      navigate('/')
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
        console.log(response.data)

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
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-6 text-center">Registrar Pago</h3>
      <form onSubmit={store}>
      <div className="mb-4">
    <p className="text-xl font-bold">Total de la compra: ${totalCost}</p>
    <p className="text-xl text-green-600">Total pagado: ${totalPaid}</p>
    <p className="text-xl text-red-600">Total restante: ${remaining}</p>
</div>

      <div className="mb-4">
        <label className="block text-gray-700 text-xl font-bold mb-2">Pago del cliente:</label>
        <input
          onChange={(e) => setAmount(e.target.value)} 
          type="number" 
          className="block w-full bg-gray-200 border border-gray-300 rounded-lg py-2 px-3" 
          placeholder="$:"
          
        />
      </div>
      <div className="mb-4">
                    <label className="block text-gray-700 text-xl font-bold mb-2">Método de Pago:</label>
                    <select
                        
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="block w-full bg-gray-200 border border-gray-300 rounded-lg py-2 px-3"
                    >
                        <option value="">Seleccione un método</option>
                        <option value="efectivo">Efectivo</option>
                        <option value="mercadopago">MercadoPago</option>
                    </select>
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
    </div>
    );
  };
  
  export default CreatePayment