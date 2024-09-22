import Order from '../Order/Order.jsx';
import Products from '../Product/Products.jsx';

import React, { useEffect, useState } from 'react'


const Home = () => {

    const [role, setRole] = useState('')

    const handleRoleChange = (event) => {
      setRole(event.target.value);
    }

    return (
        <div>
            <h2>Rol</h2>
            <select value={role} onChange={handleRoleChange}>
                <option value="">Seleccionar Rol</option>
                <option value="restocker">Repositor</option>
                <option value="waiter">Mozo</option>
            </select>

            {role === 'restocker' && <Products />}
            {role === 'waiter' && <Order />}
        </div>
    )
}

export default Home