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
  const editProduct = async (product) => {
    // Mostrar el formulario con los valores actuales del producto
    const { value: formValues } = await Swal.fire({
        title: 'Editar producto',
        html: `
            <div style="position: relative;">
                <button id="close-btn" style="position: absolute; top: 0; right: 0; background: none; border: none; font-size: 18px; cursor: pointer;">&times;</button>
            </div>
            <div style="display: flex; flex-direction: column;">
                <label for="swal-input1">Nombre del producto:</label>
                <input id="swal-input1" class="swal2-input" placeholder="Nombre del producto" value="${product?.name || ''}">

                <label for="swal-input2" style="margin-top: 10px;">Precio:</label>
                <input id="swal-input2" class="swal2-input" type="number" placeholder="Precio" value="${product?.price || ''}">

                <label for="swal-input3" style="margin-top: 10px;">URL de la imagen:</label>
                <input id="swal-input3" class="swal2-input" type="text" placeholder="URL de la imagen" value="${product?.image || ''}">
            </div>
        `,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        focusConfirm: false,
        preConfirm: () => {
            const name = document.getElementById('swal-input1').value;
            const price = document.getElementById('swal-input2').value;
            const image = document.getElementById('swal-input3').value; // URL de la imagen

            // Validación de los campos
            if (!name || !price || !image) {
                Swal.showValidationMessage('Todos los campos son obligatorios');
                return false; // Prevenir el cierre del modal si la validación falla
            }

            return { name, price, image };
        },
        didOpen: () => {
            // Añadir evento para cerrar con la "X"
            document.getElementById('close-btn').addEventListener('click', () => {
                Swal.close();
            });
        }
    });

    // Si el usuario confirmó y el formulario es válido, puedes manejar los datos actualizados
    if (formValues) {
        const updatedProduct = {
            ...product,
            name: formValues.name,
            price: formValues.price,
            image: formValues.image, // URL de la imagen
        };
        Swal.fire({
          title: 'Cargando...',
          text: 'Por favor espera',
          allowOutsideClick: false, // Evita que el usuario cierre el loader clickeando fuera del modal
          didOpen: () => {
            Swal.showLoading(); // Activa el spinner
          }
        })
        await axios.get('/sanctum/csrf-cookie');
        let response = await axios.put(`${endpoint}/product/update/` + product.id, {
          name: updatedProduct.name, 
          price: updatedProduct.price, 
          image: updatedProduct.image, 
          deleted: updatedProduct.deleted, 
          enabled: updatedProduct.enabled
        });
        getAllProducts()
        Swal.close()
        Swal.fire({
            icon: 'success',
            title: 'Producto actualizado correctamente',
        });
    }
};
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
          <button
          onClick={() => editProduct(product)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-2"
        >
          Editar
        </button>
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
        <button
          onClick={() => editProduct(product)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-2"
        >
          Editar
        </button>
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

/*
        $product->name = $request->name;
        $product->image = $request->image;
        $product->price = $request->price;
        $product->deleted = $request->deleted;
        $product->enabled = $request->enabled;
*/