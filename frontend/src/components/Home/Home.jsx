import Products from '../Product/Products.jsx';
import ListOrders from '../Order/ListOrders.jsx';

import React, { useEffect, useState } from 'react'


const Home = () => {

    const [role, setRole] = useState('restocker')

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    }

    return (
        <div>
            <h2>Rol</h2>
            <select value={role} onChange={handleRoleChange}>
                <option default value="restocker">Repositor</option>
                <option value="waiter">Mozo</option>
            </select>

            {role === 'restocker' && <Products />}
            {role === 'waiter' && <ListOrders />}
        </div>
    )
}

export default Home