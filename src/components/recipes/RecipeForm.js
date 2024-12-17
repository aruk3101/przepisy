import React, { useState, useEffect } from 'react';

function RecipeForm({ recipe, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'sniadanie',
    time: '',
    ingredients: [''],
    preparationSteps: [''],
    image: ''
  });

  // Ustawienie wartości formularza przy edytowaniu przepisu
  useEffect(() => {
    if (recipe) {
      setFormData({
        title: recipe.title || '',
        category: recipe.category || 'sniadanie',
        time: recipe.time || '',
        ingredients: recipe.ingredients || [''],
        preparationSteps: recipe.preparationSteps || [''],
        image: recipe.image || ''
      });
    }
  }, [recipe]);

  // Funkcja do zmiany wartości w formularzu
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Funkcja do dodawania nowego składnika lub kroku
  const handleAddField = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], '']
    });
  };

  // Funkcja do usuwania składnika lub kroku
  const handleRemoveField = (field, index) => {
    const updatedFields = formData[field].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [field]: updatedFields
    });
  };

  // Funkcja do zmiany składników lub kroków
  const handleFieldChange = (e, field, index) => {
    const updatedFields = formData[field].map((item, i) => (i === index ? e.target.value : item));
    setFormData({
      ...formData,
      [field]: updatedFields
    });
  };

  // Funkcja do zapisania przepisu
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="container">
      <h2>{recipe ? 'Edytuj Przepis' : 'Dodaj Przepis'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Tytuł przepisu</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">Kategoria</label>
          <select
            type="text"
            className="form-control"
            name='category'
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="śniadanie">śniadanie</option>
            <option value="obiad">obiad</option>
            <option value="kolacja">kolacja</option>
          </select>

        </div>

        <div className="mb-3">
          <label htmlFor="time" className="form-label">Czas przygotowania (minuty)</label>
          <input
            type="number"
            className="form-control"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="ingredients" className="form-label">Składniki</label>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="d-flex mb-2">
              <input
                type="text"
                className="form-control me-2"
                value={ingredient}
                onChange={(e) => handleFieldChange(e, 'ingredients', index)}
                required
              />
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleRemoveField('ingredients', index)}
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleAddField('ingredients')}
          >
            Dodaj składnik
          </button>
        </div>

        <div className="mb-3">
          <label htmlFor="preparationSteps" className="form-label">Kroki przygotowania</label>
          {formData.preparationSteps.map((step, index) => (
            <div key={index} className="d-flex mb-2">
              <input
                type="text"
                className="form-control me-2"
                value={step}
                onChange={(e) => handleFieldChange(e, 'preparationSteps', index)}
                required
              />
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleRemoveField('preparationSteps', index)}
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleAddField('preparationSteps')}
          >
            Dodaj krok
          </button>
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">Link do zdjęcia (opcjonalnie)</label>
          <input
            type="url"
            className="form-control"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="btn btn-success">
          {recipe ? 'Zapisz zmiany' : 'Dodaj przepis'}
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={onCancel}
        >
          Anuluj
        </button>
      </form>
    </div>
  );
}

export default RecipeForm;
