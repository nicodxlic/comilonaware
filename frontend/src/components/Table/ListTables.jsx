import React, { useState, useEffect } from 'react'
import { axios } from '../../axiosConfig.js'

const ListTables = ({ table, setTable }) => {
    const [tables, setTables] = useState([])

    useEffect(() => {
    const getTables = async () => {
        const response = await axios.get('http://localhost:8000/api/tables')
        const enabledTables = response.data.filter(t => t.enabled);
        setTables(enabledTables)
    }
    getTables()
    }, [])

    return (
    <div className="mb-3">
        <label className="form-label">Número de mesa</label>
        <select 
        value={table} 
        onChange={(e) => setTable(e.target.value)} 
        className="form-control">
        <option value="">Seleccionar mesa</option>
        {tables.map(t => (
            <option key={t.id} value={t.number}>
            {t.number}
        </option>
        ))}
        </select>
    </div>
)
}

export default ListTables