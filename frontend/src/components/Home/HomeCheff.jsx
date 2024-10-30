import Products from '../Product/Products.jsx';
import Kitchen from '../Kitchen/Kitchen.jsx';
import { useNavigate } from 'react-router-dom'

import React, { /*useEffect,*/ useState } from 'react'

const HomeCheff = () => {
    const [screen, setScreen] = useState('kitchen')

    const navigate = useNavigate()

    return (
        <div className="container pb-44">
            {screen === 'kitchen' && <Kitchen/>}
            {screen === 'products' && <Products role={'cheff'}/>}

            <div className="fixed inset-x-0 bottom-0 bg-gray-800 p-10 flex justify-center space-x-24">
                <button 
                className="bg-blue-500 text-white px-24 py-6 rounded-lg hover:bg-blue-600"
                onClick={() => setScreen('kitchen')}
                >
                    Cocina
                </button>
                <button 
                className="bg-green-500 text-white px-24 py-6 rounded-lg hover:bg-green-600"
                onClick={() => setScreen('products')}
                >
                    Productos
                </button>
                <button 
                className="bg-green-500 text-white px-24 py-6 rounded-lg hover:bg-green-600"
                onClick={() => navigate('/spoonacular')}
                >
                    Spoonacular
                </button>
            </div>
    </div>
    )

}

export default HomeCheff