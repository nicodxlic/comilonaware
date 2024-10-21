import React, { useEffect, useState } from 'react'
import {axios} from '../../axiosConfig.js'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const endpoint = 'http://localhost:8000/api/'

const EditTable = () => {
    const [tables, setTables] = useState([])
    const [number, setNumber] = useState('')
    const [enabled, setEnabled] = useState(true)
    const [selectedTable, setSelectedTable] = useState(null)
    const navigate = useNavigate()

    useEffect(() =>{
        const getTables = async () => {
            const response = await axios.get(`${endpoint}tables`)
            console.log(response.data)
            setTables(response.data)
        }
        getTables()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleEditTable = async (id) => {
        await axios.put(`${endpoint}table/${id}`, { enabled });
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Mesa actualizada correctamente.',
        })
        navigate('/')
      }

      return (
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">Editar mesas</h3>
          <ul className="space-y-4 grid grid-cols-4 gap-2">
            {tables.map((table) => (
              <li key={table.id} className="flex justify-between items-center bg-gray-200 p-4 rounded-lg shadow">
                <span className="text-lg font-bold">Mesa {table.number} - {table.enabled ? 'Habilitada' : 'Deshabilitada'}</span>
                <button
                  className={`px-4 py-2 rounded-lg ${
                    table.enabled ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                  } text-white`}
                  onClick={() => setSelectedTable(table)}
                >
                  {table.enabled ? 'Deshabilitar' : 'Habilitar'}
                </button>
              </li>
            ))}
          </ul>
          {selectedTable && (
            <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-bold mb-4">Editando mesa {selectedTable.number}</h4>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEditTable(selectedTable.id);
                }}
                className="space-y-4"
              >
                <div className="flex items-center">
                  <label className="mr-3 text-lg">Deshabilitar mesa:</label>
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => setEnabled(e.target.checked)}
                    className="w-6 h-6"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                >
                  Guardar cambios
                </button>
              </form>
            </div>
        )}
      </div>
            )
          }

export default EditTable