import { Recipe } from "./types";

const STORAGE_KEY = "recipes";

export function getRecipes(): Recipe[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading recipes from localStorage:", error);
    return [];
  }
}

export function saveRecipes(recipes: Recipe[]): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  } catch (error) {
    console.error("Error saving recipes to localStorage:", error);
  }
}

export function addRecipe(
  recipe: Omit<Recipe, "id" | "createdAt" | "updatedAt">
): Recipe {
  const recipes = getRecipes();
  const newRecipe: Recipe = {
    ...recipe,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const updatedRecipes = [...recipes, newRecipe];
  saveRecipes(updatedRecipes);
  return newRecipe;
}

export function updateRecipe(
  id: string,
  updates: Partial<Omit<Recipe, "id" | "createdAt">>
): Recipe | null {
  const recipes = getRecipes();
  const index = recipes.findIndex((recipe) => recipe.id === id);

  if (index === -1) return null;

  const updatedRecipe: Recipe = {
    ...recipes[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  const updatedRecipes = [...recipes];
  updatedRecipes[index] = updatedRecipe;
  saveRecipes(updatedRecipes);
  return updatedRecipe;
}

export function deleteRecipe(id: string): boolean {
  const recipes = getRecipes();
  const filteredRecipes = recipes.filter((recipe) => recipe.id !== id);

  if (filteredRecipes.length === recipes.length) return false;

  saveRecipes(filteredRecipes);
  return true;
}

export function getRecipe(id: string): Recipe | null {
  const recipes = getRecipes();
  return recipes.find((recipe) => recipe.id === id) || null;
}
