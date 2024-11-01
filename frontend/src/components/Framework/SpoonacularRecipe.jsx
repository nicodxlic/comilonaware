import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const SpoonacularRecipe = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            Swal.fire({
                title: 'Cargando receta...',
                text: 'Por favor espera',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            try {
                const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=3c4b2111c77f42be863ef43cb23a14ea&`);
                setRecipe(response.data);
            } catch (error) {
                console.error("Error al obtener los detalles de la receta:", error);
            }

            Swal.close();
        };

        fetchRecipe();
    }, [id]);

    if (!recipe) {
        return <p className="text-center">Cargando receta...</p>;
    }

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">{recipe.title}</h2>
            <img 
                src={recipe.image} 
                alt={recipe.title} 
                className="w-full h-80 object-cover mb-6 rounded-lg shadow-md"
            />
            <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-2xl text-gray-700 mb-4">
                    <span dangerouslySetInnerHTML={{ __html: recipe.summary }}></span>
                </p>
                <div className="grid grid-cols-2 gap-6 mb-6 mt-20">
                    <p className="text-gray-600"><strong>Time:</strong> {recipe.readyInMinutes} minutes</p>
                    <p className="text-gray-600"><strong>Portions:</strong> {recipe.servings}</p>
                </div>
                <div>
                    <p className="text-2xl font-semibold text-gray-800 mb-4">Ingredients:</p>
                    <ul className="list-disc list-inside text-gray-700 text-left mt-4">
                        {recipe.extendedIngredients.map((ingredient) => (
                            <li key={ingredient.id}>{ingredient.original}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SpoonacularRecipe;