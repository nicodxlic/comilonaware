import React, { useEffect, useState } from 'react'
import { axios } from '../../axiosConfig.js'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const endpoint = 'http://localhost:8000/api'

const CreateProduct = () => {
  const [table, setTable] = useState(0)
  const [price, setPrice] = useState(0)
  const [status] = useState('Pendiente')
  const [products, setProducts] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
  const navigate = useNavigate()

  const addProductToOrder = (product) => {
    setSelectedProducts([...selectedProducts, product])
    setPrice(price + product.price)
  }

  const removeProductFromOrder = (product, index) => {
    setSelectedProducts(selectedProducts.filter((p, i) => i !== index))
    setPrice(price - product.price)
  }

  const getAllProducts = async () => {
    const response = await axios.get(`${endpoint}/products`)
    setProducts(response.data)
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  const store = async (e) => {
    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor espera',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    })
    e.preventDefault()
    await axios.get('/sanctum/csrf-cookie')
    await axios.post(`${endpoint}/order`, {
      table: table,
      price: price,
      status: status,
      products: selectedProducts
    })
    Swal.close()
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Pedido creado correctamente',
    })
    navigate('/')
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Número de mesa arriba */}
      <div className="p-6 bg-gray-100">
        <h3 className="text-xl font-bold mb-4">Agregar nuevo pedido</h3>
        <div className="mb-3">
          <label className="form-label">Número de mesa</label>
          <input
            value={table}
            onChange={(e) => setTable(e.target.value)}
            type="number"
            className="form-control border rounded p-2 w-full"
          />
        </div>
      </div>

      {/* Contenedor principal con dos columnas */}
      <div className="flex flex-1 overflow-hidden">
        {/* Lista de productos (izquierda) */}
        <div className="w-1/2 p-4 bg-gray-50 overflow-y-auto">
          <h4 className="text-lg font-bold mb-4">Productos</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.length > 0 ? (
              products.map(product => (
                product.deleted == 0 && product.enabled == 1 ? (
                  <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden border-2">
                    <div className="relative">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-48 object-cover" 
                      />
                      <div className="absolute top-0 left-0 bg-gray-900 bg-opacity-50 text-white px-3 py-1 rounded-br-lg">
                        ${product.price}
                      </div>
                    </div>
                    <div className="p-4">
                      <h5 className="font-bold text-xl mb-2">{product.name}</h5>
                      <button
                        className="bg-green-500 text-white w-full py-2 rounded-lg hover:bg-green-600"
                        onClick={() => addProductToOrder(product)}
                      >
                        Agregar
                      </button>
                    </div>
                  </div>
                ) : (
                  ''
                )
              ))
            ) : (
              <p>No hay productos disponibles</p>
            )}
          </div>
        </div>

        {/* Lista de productos seleccionados (derecha) */}
        <div className="w-1/2 p-4 bg-white overflow-y-auto">
          <div className="flex flex-col h-full">
            <h4 className="text-lg font-bold mb-2">Productos seleccionados</h4>
            <div className="flex-1 overflow-y-auto mb-4">
              {selectedProducts.length > 0 ? (
                selectedProducts.map((selectedProduct, index) => (
                  <div key={selectedProduct.id} className="border p-4 rounded mb-4 flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{selectedProduct.name}</p>
                      <p className="text-gray-600">${selectedProduct.price}</p>
                    </div>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => removeProductFromOrder(selectedProduct, index)}
                    >
                      Eliminar
                    </button>
                  </div>
                ))
              ) : (
                <p>No hay productos seleccionados</p>
              )}
            </div>
            <div className="border-t pt-4">
                <p className="text-xl font-bold">Total: ${price}</p>
                <button
                  type="submit"
                  disabled={selectedProducts.length === 0} // Deshabilitar si no hay productos seleccionados
                  className={`px-6 py-2 rounded mt-4 text-white ${
                    selectedProducts.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                  }`} 
                  onClick={store}
                >
                  Guardar pedido
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateProduct
