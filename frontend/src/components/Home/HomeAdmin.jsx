import Products from '../Product/Products.jsx'
import ListOrders from '../Order/ListOrders'
import PurchaseList from '../Purchase/PurchaseList.jsx'
import {Link} from 'react-router-dom'
import EditTable from '../Table/EditTables.jsx'

import React, { /*useEffect,*/ useState } from 'react'

const HomeAdmin = (role) => {
    const [screen, setScreen] = useState('orders')
    return(
        <div className="pb-44">
            {screen === 'orders' && <ListOrders role={role}/>}
            {screen === 'products' && <Products role={'admin'}/>}
            {screen === 'purchases' && <PurchaseList/>}
            {screen === 'tables' && <EditTable/>}

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
                <button 
                className="bg-yellow-500 text-white px-24 py-6 rounded-lg hover:bg-yellow-600"
                onClick={() => setScreen('purchases')}
                >
                    Compras
                </button>
            </div>
            <br/>
            <div className='mt-8'>
            <Link to="/edit-table" className='btn btn-success mt-2 ml-2 text-white'>
                Editar mesas disponibles
            </Link>
            </div>
        </div>
    )
}

export default HomeAdmin