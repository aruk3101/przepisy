import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import RecipeDetails from './components/recipes/RecipeDetails';
import RecipeForm from './components/recipes/RecipeForm';
import RecipeCard from './components/recipes/RecipeCard';
import useLocalStorage from './hooks/useLocalStorage';
import Favourites from './components/recipes/Favourites';

function App() {
  const [recipes, setRecipes] = useLocalStorage('recipes', []);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('');


  const handleSaveRecipe = (recipe) => {
    if (recipe.id) {
      setRecipes(
        recipes.map((r) => (r.id === recipe.id ? { ...recipe } : r))
      );
      toast.success('Przepis został zaktualizowany!');
    } else {
      setRecipes([...recipes, { ...recipe, id: Date.now() }]);
      toast.success('Przepis został dodany!');
    }
    setShowForm(false);
    setCurrentRecipe(null);
  };

  // Funkcja usuwania przepisu
  const handleDeleteRecipe = (id) => {
    setRecipes(recipes.filter((r) => r.id !== id));
    toast.error('Przepis został usunięty!');
  };

  // Funkcja zmiany stanu ulubionych
  const toggleFavorite = (id) => {
    setRecipes(
      recipes.map((r) =>
        r.id === id ? { ...r, isFavorite: !r.isFavorite } : r
      )
    );
  };

  // Filtrowanie przepisów
  const filteredRecipes = filter
    ? recipes.filter(
        (r) =>
          r.category.toLowerCase().includes(filter.toLowerCase()) ||
          r.time.toString().includes(filter)
      )
    : recipes;

  // Pobieranie ulubionych przepisów
  const favoriteRecipes = recipes.filter((r) => r.isFavorite);

  return (
    <Router>
      <div className="container mt-5">
        <Navbar />
        <h1 className="text-center">Kreator Przepisów Kulinarnych</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <button
                  className="btn btn-primary my-3"
                  onClick={() => {
                    setShowForm(true);
                    setCurrentRecipe(null);
                  }}
                >
                  Dodaj Przepis
                </button>
                <input
                  type="text"
                  className="form-control my-3"
                  placeholder="Filtruj według kategorii lub czasu przygotowania..."
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />

                <div className="row">
                  {filteredRecipes.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      onEdit={() => {
                        setCurrentRecipe(recipe);
                        setShowForm(true);
                      }}
                      onDelete={handleDeleteRecipe}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>

                {showForm && (
                  <RecipeForm
                    recipe={currentRecipe}
                    onSave={handleSaveRecipe}
                    onCancel={() => setShowForm(false)}
                  />
                )}

                <ToastContainer />
              </>
            }
          />
          <Route
            path="/favorites"
            element={<Favourites
              favoriteRecipes = {favoriteRecipes}
              handleDeleteRecipe = {handleDeleteRecipe}
              toggleFavorite = {toggleFavorite}
              setCurrentRecipe = {setCurrentRecipe}
              setShowForm = {setShowForm}
            />}
          />
          <Route path="/recipe/:id" element={<RecipeDetails recipes={recipes} />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
