import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const FooterWaiter = () => {
    const navigate = useNavigate()
    return(
        <div className="pb-44">

            <div className="fixed inset-x-0 bottom-0 bg-gray-800 p-10 flex justify-center space-x-24">
                <button 
                className="bg-blue-500 text-white px-24 py-6 rounded-lg hover:bg-blue-600"
                onClick={() => navigate('/orders')}
                >
                    Pedidos
                </button>
                <button 
                className="bg-green-500 text-white px-24 py-6 rounded-lg hover:bg-green-600"
                onClick={() => navigate('/create-purchase')}
                >
                    Realizar pago
                </button>
            </div>
        </div>
    )
}

export default FooterWaiter