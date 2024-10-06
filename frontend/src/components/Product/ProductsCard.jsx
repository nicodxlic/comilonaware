import React from "react"
import {axios} from '../../axiosConfig.js'
import Swal from "sweetalert2"

const endpoint = 'http://localhost:8000/api'

const ProductsCard = ({product, getAllProducts}) => {

    const deleteProduct = async (id) => {
        const response = await axios.post(`${endpoint}/product/delete`, {id: id})
        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'producto eliminado correctamente',
        })
        getAllProducts()
     }

    const disableProduct = async (id) => {
        await axios.get('/sanctum/csrf-cookie');
        const response = await axios.patch(`${endpoint}/product/disable/` + id)
        getAllProducts()
        console.log()
        if(response.data.enabled == 0){
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'producto deshabilitado correctamente',
            })
        } else {
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'producto habilitado correctamente',
            })
        }
        
    }

    if (product.enabled == 0) {
        return (
          <div key={product.id} className="bg-red-500 shadow-lg rounded-lg p-4">
            <p className="text-yellow-300 font-bold mb-4">Deshabilitado</p>
            <h4 className="font-bold text-lg mb-2 text-white">{product.name}</h4>
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