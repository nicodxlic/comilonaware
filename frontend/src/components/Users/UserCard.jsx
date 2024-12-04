import { axios } from '../../axiosConfig.js';
import Swal from "sweetalert2"

const endpoint = 'http://localhost:8000/api'

const UserCard = ({name, email, id, role, getAllUsers}) => {
  const idUsuario = localStorage.getItem('id')

    const deleteUser = async () => {
        console.log('eliminar usuario', id)
        const response = axios.delete(`${endpoint}/user/${id}`)
        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Usuario eliminado correctamente',
        })
        getAllUsers()
    }

    const handleRoleChange = async (e) => {
      if(idUsuario == id){
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'No puedes modificar tu propio rol',
        })
      } else{
      Swal.fire({
        title: 'Cargando...',
        text: 'Por favor espera',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      })
      let selectedRole = 0
      if(e.target.value === 'Admin') selectedRole = 1
      if(e.target.value === 'Mozo') selectedRole = 2
      if(e.target.value === 'Chef') selectedRole = 3
      try{
        await axios.get('/sanctum/csrf-cookie');
        await axios.post(`${endpoint}/users/change-role/${id}`, {
            role: selectedRole
        });
        getAllUsers()
      } catch(error){
        Swal.close()
        Swal.fire('Error', 
        'Ocurrió un error al guardar el pedido.', 'error')
      }
    }}

    return (
        <div className="border-2 border-black rounded-lg p-8 max-w-sm mx-auto shadow-md text-center">
          <h3 className="text-3xl font-bold mb-2">{name}</h3>
          <p className="text-lg text-gray-600">{email}</p>
          <select
            value={role}
            onChange={(e) => handleRoleChange(e)}
            className="text-center"
          >
            <option value="Admin">Admin</option>
            <option value="Mozo">Mozo</option>
            <option value="Chef">Chef</option>
          </select>
          <br/>
          <button
            onClick={() => deleteUser()}
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg mr-2 hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      );

}

export default UserCard