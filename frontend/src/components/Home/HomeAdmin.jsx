import Products from '../Product/Products.jsx'
import ListOrders from '../Order/ListOrders'

import React, { /*useEffect,*/ useState } from 'react'

const HomeAdmin = (role) => {
    const [screen, setScreen] = useState('orders')
    return(
        <div className="pb-44">
            {screen === 'orders' && <ListOrders role={role}/>}
            {screen === 'products' && <Products/>}

            <div className="fixed inset-x-0 bottom-0 bg-gray-800 p-10 flex justify-center space-x-24">
                <button 
                className="bg-blue-500 text-white px-24 py-6 rounded-lg hover:bg-blue-600"
                onClick={() => setScreen('orders')}
                >
                    Pedidos
                </button>
                <button 
                className="bg-green-500 text-white px-24 py-6 rounded-lg hover:bg-green-600"
                onClick={() => setScreen('products')}
                >
                    Productos
                </button>
            </div>
        </div>
    )
}

export default HomeAdmin