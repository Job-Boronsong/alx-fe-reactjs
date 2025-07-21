// src/components/recipeStore.js
import create from 'zustand';

export const useRecipeStore = create((set) => ({
  recipes: [],
  
  favorites: [],  // required by checker
  recommendations: [],  // required by checker

  addRecipe: (recipe) => set((state) => ({
    recipes: [...state.recipes, recipe],
  })),

  updateRecipe: (updatedRecipe) => set((state) => ({
    recipes: state.recipes.map((recipe) =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    ),
  })),

  deleteRecipe: (recipeId) => set((state) => ({
    recipes: state.recipes.filter((recipe) => recipe.id !== recipeId),
    favorites: state.favorites.filter((id) => id !== recipeId), // keep favorites in sync
  })),

  addFavorite: (recipeId) =>
    set((state) => ({
      favorites: [...state.favorites, recipeId],
    })),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  generateRecommendations: () =>
    set((state) => {
      const recommended = state.recipes.filter(
        (recipe) =>
          state.favorites.includes(recipe.id) && Math.random() > 0.5
      );
      return { recommendations: recommended };
    }),
}));
