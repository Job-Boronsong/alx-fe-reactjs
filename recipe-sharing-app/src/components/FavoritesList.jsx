import { useRecipeStore } from '../store/recipeStore';

const FavoritesList = () => {
  const favorites = useRecipeStore((state) =>
    state.favorites.map((id) => state.recipes.find((r) => r.id === id))
  );
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  return (
    <div>
      <h2>My Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        favorites.map((recipe) =>
          recipe ? (
            <div key={recipe.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              <button onClick={() => removeFavorite(recipe.id)}>Remove Favorite</button>
            </div>
          ) : null
        )
      )}
    </div>
  );
};

export default FavoritesList;
