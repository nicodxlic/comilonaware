import React from "react"
import {axios} from '../../axiosConfig.js'
import Swal from "sweetalert2"

const endpoint = 'http://localhost:8000/api'

const ProductsCard = ({product, getAllProducts}) => {

  const deleteProduct = async (id) => {
    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor espera',
      allowOutsideClick: false, // Evita que el usuario cierre el loader clickeando fuera del modal
      didOpen: () => {
        Swal.showLoading(); // Activa el spinner
      }
    })
    const response = await axios.put(`${endpoint}/product/delete/` + id)
    Swal.close()
    Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Producto eliminado correctamente',
    })
    getAllProducts()
   }
  const disableProduct = async (id) => {
    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor espera',
      allowOutsideClick: false, // Evita que el usuario cierre el loader clickeando fuera del modal
      didOpen: () => {
        Swal.showLoading(); // Activa el spinner
      }
    })
    await axios.get('/sanctum/csrf-cookie');
    const response = await axios.patch(`${endpoint}/product/disable/` + id)
    getAllProducts()
    Swal.close()
    if(response.data.enabled == 0){
        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Producto deshabilitado correctamente',
        })
    } else {
        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Producto habilitado correctamente',
        })
    }
  }
  if (product.enabled == 0) {
      return (
        <div key={product.id} className="bg-red-500 shadow-lg rounded-lg p-4">
          <p className="text-yellow-300 font-bold mb-4">Deshabilitado</p>
          <h4 className="font-bold text-lg mb-2 text-white">{product.name}</h4>
          {/* Imagen del producto */}
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-48 object-cover mb-4 rounded-lg"
          />
          <p className="text-white mb-2">Precio: ${product.price}</p>
          <p className="text-white mb-4">Stock: {product.stock}</p>
          
          <button
            onClick={() => deleteProduct(product.id)}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg mr-2"
          >
            Eliminar
          </button>
          <button
            onClick={() => disableProduct(product.id)}
            className="bg-green-500 text-white px-3 py-2 rounded-lg"
          >
            Habilitar
          </button>
        </div>
      );
  } else {
    return (
      <div key={product.id} className="bg-white shadow-lg rounded-lg p-4">
        <h4 className="font-bold text-lg mb-2">{product.name}</h4>
        {/* Imagen del producto */}
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover mb-4 rounded-lg"
        />
        <p className="text-gray-700 mb-2">Precio: ${product.price}</p>
        <p className="text-gray-700 mb-4">Stock: {product.stock}</p>
        <button
          onClick={() => deleteProduct(product.id)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg mr-2"
        >
          Eliminar
        </button>
        <button
          onClick={() => disableProduct(product.id)}
          className="bg-yellow-500 text-white px-3 py-2 rounded-lg"
        >
          Deshabilitar
        </button>
      </div>
    );
  }
    
}

export default ProductsCard
