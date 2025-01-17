import React, { useEffect, useState } from 'react'
import {axios} from '../../axiosConfig.js'
import Swal from "sweetalert2"
import { useNavigate } from 'react-router-dom'
import Header from '../Header/Header.jsx'
import FooterAdmin from '../Footer/FooterAdmin'
import FooterChef from '../Footer/FooterChef'

const endpoint = 'http://localhost:8000/api/categories'

const Categories = () => {
    const navigate = useNavigate()
    const [productMesage, setProductMesage] = useState('Cargando categorias...')

    const role = localStorage.getItem('role')
    if(role !== 'Admin' && role !== 'Chef'){
        Swal.fire({
            icon: 'error',
            title: '¡No tienes los permisos!',
            text: 'debes tener el rol correspondiente a esta pantalla',
          })
        navigate('/')
    }

    const getAllCategories = async () => {
        Swal.fire({
            title: 'Cargando...',
            text: 'Por favor espera',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        })
        let response = await axios.get(`${endpoint}`)
        setCategories(response.data)
        setProductMesage('No se han encontrado productos')
        Swal.close()
    }

    useEffect(() => {
        getAllCategories()
    }, [])

    const [categories, setCategories] = useState([])
    const [name, setName] = useState('')

    const store = async (e) => {
        if(name !== '' && isNaN(name)){
            e.preventDefault()
        let isRepeated = false
        categories.map(category => {
            if(category.name === name){
                isRepeated = true
            }
            return true
        })
        if(isRepeated){
            Swal.close()
            Swal.fire({
                icon: 'error',
                title: '¡Ya existe!',
                text: 'La categoria que intentas crear ya existe.',
            })
        } else{
            try{
                await axios.get('/sanctum/csrf-cookie');
                await axios.post(endpoint, {
                    name: name,
                    deleted: false
                })
                Swal.close()
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'Producto creado correctamente',
                })
            } catch (error){
                Swal.close()
                Swal.fire('Error', 
                'Ocurrió un error al crear la categoria.', 'error')
            }
        }
        } else{
            Swal.close()
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'El nombre de la categoria no es valido.',
            })
        }
    }

    const deleteCategory = async (id) => {
        Swal.fire({
            title: 'Cargando...',
            text: 'Por favor espera',
            allowOutsideClick: false, // Evita que el usuario cierre el loader clickeando fuera del modal
            didOpen: () => {
                Swal.showLoading(); // Activa el spinner
            }
        })
        try{
            await axios.put(`${endpoint}/delete/` + id)
            Swal.close()
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Producto eliminado correctamente',
            })
            getAllCategories()
        } catch (error){
            Swal.close()
            Swal.fire('Error', 
            'Ocurrió un error al crear la categoria.', 'error')
        }

    }

    const editCategory = async (id) => {
        const { value: formValues } = await Swal.fire({
          title: 'Editar producto',
          html: `
              <div style="position: relative;">
                  <button id="close-btn" style="position: absolute; top: 0; right: 0; background: none; border: none; font-size: 18px; cursor: pointer;">&times;</button>
              </div>
              <div style="display: flex; flex-direction: column;">
                  <label for="swal-input1">Nombre de la categoria:</label>
                  <input id="swal-input1" class="swal2-input" placeholder="Nombre de la categoria" value="">
              </div>
          `,
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          focusConfirm: false,
          preConfirm: () => {
              const name = document.getElementById('swal-input1').value;
              // Validación de los campos
              if (!name) {
                  Swal.showValidationMessage('Todos los campos son obligatorios');
                  return false; // Prevenir el cierre del modal si la validación falla
              }
              return { name};
          },
          didOpen: () => {
              // Añadir evento para cerrar con la "X"
              document.getElementById('close-btn').addEventListener('click', () => {
                  Swal.close();
              });
          }
        });
        if (formValues) {
            const name = formValues.name
            Swal.fire({
                title: 'Cargando...',
                text: 'Por favor espera',
                allowOutsideClick: false, // Evita que el usuario cierre el loader clickeando fuera del modal
                didOpen: () => {
                    Swal.showLoading(); // Activa el spinner
                }
            });
            try{
                await axios.get('/sanctum/csrf-cookie');
                await axios.put(`${endpoint}/update/` + id, {
                    name: name
                });
                getAllCategories();
                Swal.close();
                Swal.fire({
                    icon: 'success',
                    title: 'Producto actualizado correctamente',
                });
            } catch(error) {
                Swal.close()
                Swal.fire('Error', 
                'Ocurrió un error al crear la categoria.', 'error')
            }
        }
    }
 
    return(
        <div className='mb-24'> <Header/>
        <div className="container mx-auto p-4">
            <h3 className="text-2xl font-bold mb-4">Categorias</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.length > 0 ? (
                    categories.map(category => (
                        category.deleted === 1 ? (
                            ''
                        ) : (
                            <div className="border-2 border-black rounded-lg p-8 max-w-sm mx-auto shadow-md text-center">
                                <h3 className="text-3xl font-bold mb-2">{category.name}</h3>
                                <button
                                  onClick={() => editCategory(category.id)}
                                  className="mt-2 bg-yellow-600 text-white px-4 py-2 rounded-lg mr-2 hover:bg-yellow-700"
                                >
                                  Editar
                                </button>
                                <button
                                  onClick={() => deleteCategory(category.id)}
                                  className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg mr-2 hover:bg-red-700"
                                >
                                  Eliminar
                                </button>
                            </div>
                        )
                    ))
                ) : (
                    <p className="text-center col-span-full">{productMesage}</p>
                )}
            </div>

            <div>
                <h3 className="text-2xl font-bold mb-4">Crear categoria</h3>
            </div>
            <form onSubmit={store} className="space-y-6">
                <div>
                    <label className="form-label block text-gray-700 text-xl font-bold mb-2">Nombre:</label>
                    <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-48 bg-gray-300 border border-gray-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"/>
                </div>
                <button
                type="submit"
                className='btn btn-primary py-3 px-4 w-64'
                disabled={name === ''}>
                Crear
                </button>
            </form>
            {role === 'Admin' ? (
                    <FooterAdmin/>
                ) : (
                    <FooterChef/>
                )}
        </div>
        </div>
    )
}

export default Categories