import React from "react";
import RecipeCard from "./RecipeCard";

function Favourites({
  favoriteRecipes,
  handleDeleteRecipe,
  toggleFavorite,
  setCurrentRecipe,
  setShowForm,
}) {
  console.log(favoriteRecipes);
  return (
    <>
      <h2>Twoje Ulubione Przepisy</h2>
      <div className="row">
        {favoriteRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onEdit={() => {
              setCurrentRecipe(recipe);
              setShowForm(true);
            }}
            onDelete={handleDeleteRecipe}
            onToggleFavorite={toggleFavorite}
            isFavorite={true}
          />
        ))}
      </div>
    </>
  );
}

export default Favourites;
