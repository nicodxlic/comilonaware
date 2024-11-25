import React, { /*useEffect,*/ useState } from 'react'
import { useNavigate } from 'react-router-dom'

const FooterAdmin = () => {
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
                onClick={() => navigate('/products')}
                >
                    Productos
                </button>
                <button 
                className="bg-yellow-500 text-white px-24 py-6 rounded-lg hover:bg-yellow-600"
                onClick={() => navigate('/purchases')}
                >
                    Compras
                </button>
            </div>
        </div>
    )
}

export default FooterAdmin