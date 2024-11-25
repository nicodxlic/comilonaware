import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const FooterChef = () => {
    const navigate = useNavigate()
    return(
        <div className="container pb-44">
            <div className="fixed inset-x-0 bottom-0 bg-gray-800 p-10 flex justify-center space-x-24">
                <button 
                className="bg-blue-500 text-white px-24 py-6 rounded-lg hover:bg-blue-600"
                onClick={() => navigate('/kitchen')}
                >
                    Cocina
                </button>
                <button 
                className="bg-green-500 text-white px-24 py-6 rounded-lg hover:bg-green-600"
                onClick={() => navigate('/products')}
                >
                    Productos
                </button>
            </div>
        </div>
    )
}

export default FooterChef