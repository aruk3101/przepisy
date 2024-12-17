import React from 'react';
import { useParams } from 'react-router-dom';

function RecipeDetails({ recipes }) {
  const { id } = useParams();
  const recipe = recipes.find((r) => r.id === parseInt(id));

  if (!recipe) {
    return <p>Przepis nie został znaleziony.</p>;
  }

  return (
    <div className="container mt-4">
      <h2>{recipe.title}</h2>
      {recipe.image && <img src={recipe.image} className="img-fluid" alt={recipe.title} />}
      <p><strong>Czas przygotowania:</strong> {recipe.time} minut</p>
      <p><strong>Kategoria:</strong> {recipe.category}</p>
      <p><strong>Składniki:</strong></p>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <p><strong>Kroki przygotowania:</strong></p>
      <ol>
        {recipe.preparationSteps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
}

export default RecipeDetails;