import React from 'react';
import { FaEdit, FaTrash, FaHeart, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe, onEdit, onDelete, onToggleFavorite, isFavorite }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        {recipe.image && (
          <img src={recipe.image} className="card-img-top" alt={recipe.title} />
        )}
        <div className="card-body">
          <h5 className="card-title">{recipe.title}</h5>
          <p>Czas przygotowania: {recipe.time} minut</p>
          <p>Kategoria: {recipe.category}</p>
          
          {isFavorite == true ? "" : (<>
            <button className="btn btn-warning m-1" onClick={onEdit}>
            <FaEdit /> Edytuj
            </button>
            </>)}
            {isFavorite == true ? "" : (<>
              <button className="btn btn-danger m-1" onClick={() => onDelete(recipe.id)}>
          <FaTrash /> Usuń
          </button>
              </>)}
          
          <button
            className={`btn m-1 ${recipe.isFavorite ? 'btn-success' : 'btn-outline-success'}`}
            onClick={() => onToggleFavorite(recipe.id)}
          >
            <FaHeart /> {recipe.isFavorite ? 'Ulubione' : 'Dodaj do ulubionych'}
          </button>
          <Link to={`/recipe/${recipe.id}`} className="btn btn-info m-1 ">
            <FaEye /> Szczegóły
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
