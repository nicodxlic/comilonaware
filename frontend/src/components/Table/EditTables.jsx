import React, { useEffect, useState } from 'react';
import { axios } from '../../axiosConfig.js';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const endpoint = 'http://localhost:8000/api/';

const EditTable = () => {
  const [tables, setTables] = useState([]);
  const [selectedTables, setSelectedTables] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getTables = async () => {
      const response = await axios.get(`${endpoint}tables`);
      setTables(response.data);
    };
    getTables();
  }, []);

  const toggleEnabled = (tableId) => {
    const updatedTables = tables.map((table) =>
      table.id === tableId ? { ...table, enabled: !table.enabled } : table
    );
    setTables(updatedTables);

    const editedTable = updatedTables.find((table) => table.id === tableId);
    const isAlreadySelected = selectedTables.some((t) => t.id === tableId);

    if (!isAlreadySelected) {
      setSelectedTables([...selectedTables, editedTable]);
    } else {
      const updatedSelectedTables = selectedTables.map((t) =>
        t.id === tableId ? editedTable : t
      );
      setSelectedTables(updatedSelectedTables);
    }
  };

  const handleSaveChanges = async () => {
    try {
      Swal.fire({
        title: 'Guardando cambios...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      for (const table of selectedTables) {
        await axios.put(`${endpoint}table/${table.id}`, { enabled: table.enabled });
      }

      Swal.fire({
        icon: 'success',
        title: 'Cambios guardados',
        text: 'Mesas editadas correctamente.',
      });

      navigate('/');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al editar las mesas.',
      });
    }
  };

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
              onClick={() => toggleEnabled(table.id)}
            >
              {table.enabled ? 'Deshabilitar' : 'Habilitar'}
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-12">
        <button
          onClick={handleSaveChanges}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          Guardar cambios
        </button>
      </div>
    </div>
  );
};

export default EditTable;