import { axios } from '../../axiosConfig.js';
import Swal from "sweetalert2"

const UserCard = ({name, email, id}) => {

    const deleteUser = async () => {
        console.log('eliminar usuario', id)
        // const response = axios.delete('ruta para eliminar')
        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Usuario eliminado correctamente',
        })
    }

    const editRole = async () => {
        console.log('editar rol', id)
    }

    return (
        <div className="border-2 border-black rounded-lg p-4 max-w-sm mx-auto shadow-md text-center">
          <h3 className="text-lg font-bold mb-2">{name}</h3>
          <p className="text-sm text-gray-600">{email}</p>
          <button
            onClick={() => deleteUser()}
            className="bg-red-700 text-white px-4 py-2 rounded-lg mr-2"
          >
            Eliminar
          </button>
          <button
            onClick={() => editRole()}
            className="bg-yellow-700 text-white px-4 py-2 rounded-lg mr-2"
          >
            Asignar rol
          </button>
        </div>
      );

}

export default UserCard