import React, { useEffect, useState } from 'react';
import { axios } from '../../axiosConfig.js';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from '../Header/Header.jsx';
import FooterAdmin from '../Footer/FooterAdmin.jsx';

const endpoint = 'http://localhost:8000/api/';

const EditTable = () => {
  const navigate = useNavigate()
  const role = localStorage.getItem('role')
  if(role !== 'Admin'){
      Swal.fire({
          icon: 'error',
          title: '¡No tienes los permisos!',
          text: 'debes tener el rol correspondiente a esta pantalla',
        })
      navigate('/')
  }
  const [tables, setTables] = useState([]);
  const [selectedTables, setSelectedTables] = useState([]);

  const getTables = async () => {
    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor espera',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    })
    const response = await axios.get(`${endpoint}tables`);
    setTables(response.data);
    Swal.close()
  };

  useEffect(() => {
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

      navigate('/edit-table');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al editar las mesas.',
      })
    }
  }

  const addTable = async () => {
    if (tables.length >= 20) {
        Swal.fire('Límite alcanzado', 'No se pueden añadir más de 20 mesas.', 'error');
        return;
    }
    Swal.fire({
        title: '¿Añadir una nueva mesa?',
        text: 'Se agregará una mesa.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Añadir',
        cancelButtonText: 'Cancelar',
    }).then(async (result) => {
        if (result.isConfirmed) {
            const newNumber = tables.length ? tables[tables.length - 1].number + 1 : 1;
            const response = await axios.post(`${endpoint}tables`, { number: newNumber, enabled: true });
            setTables([...tables, response.data]);
            Swal.fire('Mesa añadida', 'La nueva mesa ha sido añadida correctamente.', 'success');
            await getTables()
        }
    });
};


  const removeTable = async () => {
    if (tables.length <= 5) {
        Swal.fire('Límite alcanzado', 'No se pueden tener menos de 5 mesas.', 'error');
        return;
    }
    Swal.fire({
        title: '¿Eliminar la última mesa?',
        text: 'Se eliminará la última mesa del listado.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
    }).then(async (result) => {
        if (result.isConfirmed) {
            const lastTable = tables[tables.length - 1];
            await axios.delete(`${endpoint}table/${lastTable.id}`);
            setTables(tables.slice(0, -1));
            Swal.fire('Mesa eliminada', 'La última mesa ha sido eliminada correctamente.', 'success');
        }
    })
}

  return (
    <div> <Header/>
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
      <div className="mt-6 flex space-x-4">
                <button
                    onClick={addTable}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                >
                    Añadir una mesa
                </button>
                <button
                    onClick={removeTable}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
                >
                    Eliminar una mesa
                </button>
            </div>
    </div> <FooterAdmin/>
    </div>
  );
};

export default EditTable;