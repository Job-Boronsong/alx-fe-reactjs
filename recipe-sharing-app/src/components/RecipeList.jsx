import { Link } from 'react-router-dom';
import { useRecipeStore } from '../store/recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.filteredRecipes);
  const favorites = useRecipeStore((state) => state.favorites);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  const isFavorite = (id) => favorites.includes(id);

  return (
    <div>
      <h2>Recipe List</h2>
      {recipes.length === 0 && <p>No recipes yet!</p>}
      {recipes.map((recipe) => (
        <div key={recipe.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          <Link to={`/recipe/${recipe.id}`}>View Details</Link>
          <br />
          {isFavorite(recipe.id) ? (
            <button onClick={() => removeFavorite(recipe.id)}>💔 Unfavorite</button>
          ) : (
            <button onClick={() => addFavorite(recipe.id)}>❤️ Favorite</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
