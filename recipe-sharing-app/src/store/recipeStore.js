import { create } from 'zustand';

export const useRecipeStore = create((set) => ({
  recipes: [],
  filteredRecipes: [],
  searchTerm: '',

  favorites: [],
  recommendations: [],

  addRecipe: (newRecipe) =>
    set((state) => {
      const updated = [...state.recipes, newRecipe];
      return {
        recipes: updated,
        filteredRecipes: filterList(updated, state.searchTerm),
      };
    }),

  deleteRecipe: (id) =>
    set((state) => {
      const updated = state.recipes.filter((r) => r.id !== id);
      return {
        recipes: updated,
        filteredRecipes: filterList(updated, state.searchTerm),
        favorites: state.favorites.filter((fid) => fid !== id),
      };
    }),

  updateRecipe: (updatedRecipe) =>
    set((state) => {
      const updated = state.recipes.map((r) =>
        r.id === updatedRecipe.id ? updatedRecipe : r
      );
      return {
        recipes: updated,
        filteredRecipes: filterList(updated, state.searchTerm),
      };
    }),

  setSearchTerm: (term) =>
    set((state) => ({
      searchTerm: term,
      filteredRecipes: filterList(state.recipes, term),
    })),

  setRecipes: (recipes) =>
    set((state) => ({
      recipes,
      filteredRecipes: filterList(recipes, state.searchTerm),
    })),

  // ⭐ Favorites
  addFavorite: (id) =>
    set((state) =>
      state.favorites.includes(id)
        ? {}
        : { favorites: [...state.favorites, id] }
    ),

  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((fid) => fid !== id),
    })),

  // 🤖 Recommendations (mocked: suggest favorite-based recipes randomly)
  generateRecommendations: () =>
    set((state) => {
      const rec = state.recipes.filter(
        (recipe) =>
          state.favorites.includes(recipe.id) && Math.random() > 0.3
      );
      return { recommendations: rec };
    }),
}));

const filterList = (recipes, term) =>
  !term
    ? recipes
    : recipes.filter((r) =>
        r.title.toLowerCase().includes(term.toLowerCase())
      );
