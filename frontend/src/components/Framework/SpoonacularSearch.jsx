import React, { useState } from "react";
import { axios } from '../../axiosConfig.js';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const endpoint = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=3c4b2111c77f42be863ef43cb23a14ea&';

const SpoonacularSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [message, setMessage] = useState('Debes hacer una búsqueda');
    const navigate = useNavigate();

    const getRecipes = async (e) => {
        e.preventDefault();
        if (searchTerm === '') {
            setMessage('Debes hacer una búsqueda');
        } else {
            Swal.fire({
                title: 'Cargando...',
                text: 'Por favor espera',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            try {
                const response = await axios.get(`${endpoint}query=${searchTerm}&number=28`, {
                    withCredentials: false
                });

                if (response.data.totalResults === 0) {
                    setMessage('No se han encontrado resultados');
                    setRecipes([])
                } else {
                    setRecipes(response.data.results);
                }
            } catch (error) {
                setMessage('Hubo un error al obtener las recetas');
            }

            Swal.close();
        }
    };

    return (
        <div className="container mx-auto p-6">
            <form onSubmit={getRecipes} className="flex items-center space-x-4 mb-6">
                <input
                    type="text"
                    className="w-1/3 p-3 border border-gray-300 rounded-md"
                    placeholder="Buscar recetas"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button 
                    type='submit' 
                    className='bg-blue-500 text-white px-4 py-2 rounded-lg'
                    disabled={searchTerm === ''}
                >
                    Buscar
                </button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {recipes.length === 0 ? (
                    <p className="text-center col-span-full">{message}</p>
                ) : (
                    recipes.map((recipe) => (
                        <div 
                            key={recipe.id} 
                            className="bg-white shadow-lg rounded-lg p-4 cursor-pointer transform transition-transform hover:scale-105"
                            onClick={() => navigate(`/spoonacular/${recipe.id}`)}
                        >
                            <h4 className="font-bold text-lg mb-2">{recipe.title}</h4>
                            <img 
                                src={recipe.image} 
                                alt={recipe.title} 
                                className="w-full h-48 object-cover mb-4 rounded-lg"
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SpoonacularSearch;
