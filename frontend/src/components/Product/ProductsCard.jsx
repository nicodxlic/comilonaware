import React from "react"

const ProductsCard = ({product, deleteProduct}) => {
    return (
    <div key={product.id} className="bg-white shadow-lg rounded-lg p-4">
        <h4 className="font-bold text-lg mb-2">{product.name}</h4>
        <p className="text-gray-700 mb-2">Precio: ${product.price}</p>
        <p className="text-gray-700 mb-4">Stock: {product.stock}</p>
        <button 
            onClick={() => deleteProduct(product.id)} 
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
            Eliminar
        </button>
    </div>
    )
}

export default ProductsCard