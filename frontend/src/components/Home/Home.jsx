import HomeCheff from './HomeCheff.jsx';
import ListOrders from '../Order/ListOrders.jsx';

import React, { /*useEffect,*/ useState } from 'react'


const Home = () => {

    const [role, setRole] = useState('cheff')

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    }

    return (
        <div>
            <h2>Rol</h2>
            <select value={role} onChange={handleRoleChange}>
                <option default value="cheff">Cheff</option>
                <option value="waiter">Mozo</option>
            </select>

            {role === 'cheff' && <HomeCheff />}
            {role === 'waiter' && <ListOrders />}
        </div>
    )
}

export default Home